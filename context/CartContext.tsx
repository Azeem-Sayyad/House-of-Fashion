"use client";

// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Cart Context
// context/CartContext.tsx
//
// Global cart state. Wrap app/layout.tsx body with <CartProvider>.
// Access anywhere with useCart() hook.
// ─────────────────────────────────────────────────────────────

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  useEffect,
  ReactNode,
} from "react";
import { CartItem, BlouseSize } from "@/lib/types";

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

const FREE_SHIPPING_THRESHOLD = 2000;
const STANDARD_SHIPPING = 150;
const STORAGE_KEY = "hof_cart";

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

interface CartState {
  items: CartItem[];
  couponCode: string | null;
  couponDiscount: number;         // Flat INR amount off
  drawerOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "UPDATE_STITCHING"; payload: { id: string; blouseStitching: boolean; blouseSize?: BlouseSize } }
  | { type: "APPLY_COUPON"; payload: { code: string; discount: number } }
  | { type: "REMOVE_COUPON" }
  | { type: "CLEAR_CART" }
  | { type: "OPEN_DRAWER" }
  | { type: "CLOSE_DRAWER" }
  | { type: "HYDRATE"; payload: CartItem[] };

interface CartContextValue {
  // State
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shippingCharge: number;
  discount: number;
  total: number;
  couponCode: string | null;
  drawerOpen: boolean;
  isEmpty: boolean;

  // Actions
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateStitching: (id: string, blouseStitching: boolean, blouseSize?: BlouseSize) => void;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  isInCart: (productId: string, variantId: string) => boolean;
}

// ─────────────────────────────────────────────────────────────
// MOCK COUPONS — replace with API call when backend is ready
// ─────────────────────────────────────────────────────────────

const VALID_COUPONS: Record<string, number> = {
  "HOFTRIAL": 500,
  "BRIDE2024": 2000,
  "FIRST10": 1000,
};

// ─────────────────────────────────────────────────────────────
// REDUCER
// ─────────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {

    case "HYDRATE":
      return { ...state, items: action.payload };

    case "ADD_ITEM": {
      // If exact same product + variant + stitching combo exists, bump quantity
      const existing = state.items.find(
        (i) =>
          i.productId === action.payload.productId &&
          i.variantId === action.payload.variantId &&
          i.blouseStitching === action.payload.blouseStitching &&
          i.blouseSize === action.payload.blouseSize
      );

      if (existing) {
        return {
          ...state,
          drawerOpen: true,
          items: state.items.map((i) =>
            i.id === existing.id
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        };
      }

      return {
        ...state,
        drawerOpen: true,
        items: [...state.items, action.payload],
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload.id),
      };

    case "UPDATE_QUANTITY":
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.id !== action.payload.id),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };

    case "UPDATE_STITCHING":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id
            ? {
                ...i,
                blouseStitching: action.payload.blouseStitching,
                blouseSize: action.payload.blouseSize,
              }
            : i
        ),
      };

    case "APPLY_COUPON":
      return {
        ...state,
        couponCode: action.payload.code,
        couponDiscount: action.payload.discount,
      };

    case "REMOVE_COUPON":
      return { ...state, couponCode: null, couponDiscount: 0 };

    case "CLEAR_CART":
      return { ...state, items: [], couponCode: null, couponDiscount: 0 };

    case "OPEN_DRAWER":
      return { ...state, drawerOpen: true };

    case "CLOSE_DRAWER":
      return { ...state, drawerOpen: false };

    default:
      return state;
  }
}

// ─────────────────────────────────────────────────────────────
// CONTEXT
// ─────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null);

// ─────────────────────────────────────────────────────────────
// PROVIDER
// ─────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    couponCode: null,
    couponDiscount: 0,
    drawerOpen: false,
  });

  // ── Hydrate from localStorage on mount ──
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        dispatch({ type: "HYDRATE", payload: parsed });
      }
    } catch {
      // Corrupted storage — silently ignore
    }
  }, []);

  // ── Persist to localStorage on change ──
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Storage full or unavailable — silently ignore
    }
  }, [state.items]);

  // ── Derived totals ──
  const subtotal = useMemo(
    () => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [state.items]
  );

  const itemCount = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  );

  const shippingCharge = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0
    ? 0
    : STANDARD_SHIPPING;

  const discount = state.couponDiscount;

  const total = Math.max(0, subtotal + shippingCharge - discount);

  // ── Actions ──
  const addItem = useCallback((item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  }, []);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  }, []);

  const updateStitching = useCallback(
    (id: string, blouseStitching: boolean, blouseSize?: BlouseSize) => {
      dispatch({ type: "UPDATE_STITCHING", payload: { id, blouseStitching, blouseSize } });
    },
    []
  );

  const applyCoupon = useCallback(
    async (code: string): Promise<{ success: boolean; message: string }> => {
      const upper = code.trim().toUpperCase();
      const discount = VALID_COUPONS[upper];

      if (!discount) {
        return { success: false, message: "Invalid coupon code. Please try again." };
      }

      if (subtotal < discount) {
        return {
          success: false,
          message: `Minimum order of ${new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(discount)} required for this coupon.`,
        };
      }

      dispatch({ type: "APPLY_COUPON", payload: { code: upper, discount } });
      return { success: true, message: `Coupon applied! You save ₹${discount.toLocaleString("en-IN")}.` };
    },
    [subtotal]
  );

  const removeCoupon = useCallback(() => {
    dispatch({ type: "REMOVE_COUPON" });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const openDrawer = useCallback(() => {
    dispatch({ type: "OPEN_DRAWER" });
  }, []);

  const closeDrawer = useCallback(() => {
    dispatch({ type: "CLOSE_DRAWER" });
  }, []);

  const isInCart = useCallback(
    (productId: string, variantId: string) =>
      state.items.some((i) => i.productId === productId && i.variantId === variantId),
    [state.items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      itemCount,
      subtotal,
      shippingCharge,
      discount,
      total,
      couponCode: state.couponCode,
      drawerOpen: state.drawerOpen,
      isEmpty: state.items.length === 0,
      addItem,
      removeItem,
      updateQuantity,
      updateStitching,
      applyCoupon,
      removeCoupon,
      clearCart,
      openDrawer,
      closeDrawer,
      isInCart,
    }),
    [
      state.items,
      state.couponCode,
      state.drawerOpen,
      itemCount,
      subtotal,
      shippingCharge,
      discount,
      total,
      addItem,
      removeItem,
      updateQuantity,
      updateStitching,
      applyCoupon,
      removeCoupon,
      clearCart,
      openDrawer,
      closeDrawer,
      isInCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ─────────────────────────────────────────────────────────────
// HOOK
// ─────────────────────────────────────────────────────────────

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}