"use client";

// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Wishlist Context
// context/WishlistContext.tsx
//
// Global wishlist state. Wrap app/layout.tsx with <WishlistProvider>.
// Access anywhere with useWishlist() hook.
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
import { WishlistItem } from "@/lib/types";

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

const STORAGE_KEY = "hof_wishlist";

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

interface WishlistState {
  items: WishlistItem[];
}

type WishlistAction =
  | { type: "ADD_ITEM"; payload: WishlistItem }
  | { type: "REMOVE_ITEM"; payload: { productId: string; variantId: string } }
  | { type: "CLEAR_WISHLIST" }
  | { type: "HYDRATE"; payload: WishlistItem[] };

interface WishlistContextValue {
  // State
  items: WishlistItem[];
  itemCount: number;
  isEmpty: boolean;

  // Actions
  addItem: (productId: string, variantId: string) => void;
  removeItem: (productId: string, variantId: string) => void;
  toggleItem: (productId: string, variantId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string, variantId: string) => boolean;
}

// ─────────────────────────────────────────────────────────────
// REDUCER
// ─────────────────────────────────────────────────────────────

function wishlistReducer(
  state: WishlistState,
  action: WishlistAction
): WishlistState {
  switch (action.type) {

    case "HYDRATE":
      return { ...state, items: action.payload };

    case "ADD_ITEM": {
      // Prevent duplicates
      const exists = state.items.some(
        (i) =>
          i.productId === action.payload.productId &&
          i.variantId === action.payload.variantId
      );
      if (exists) return state;
      return { ...state, items: [...state.items, action.payload] };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (i) =>
            !(
              i.productId === action.payload.productId &&
              i.variantId === action.payload.variantId
            )
        ),
      };

    case "CLEAR_WISHLIST":
      return { ...state, items: [] };

    default:
      return state;
  }
}

// ─────────────────────────────────────────────────────────────
// CONTEXT
// ─────────────────────────────────────────────────────────────

const WishlistContext = createContext<WishlistContextValue | null>(null);

// ─────────────────────────────────────────────────────────────
// PROVIDER
// ─────────────────────────────────────────────────────────────

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });

  // ── Hydrate from localStorage on mount ──
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as WishlistItem[];
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

  // ── Actions ──
  const addItem = useCallback((productId: string, variantId: string) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        productId,
        variantId,
        addedAt: new Date().toISOString(),
      },
    });
  }, []);

  const removeItem = useCallback((productId: string, variantId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId, variantId } });
  }, []);

  const toggleItem = useCallback(
    (productId: string, variantId: string) => {
      const exists = state.items.some(
        (i) => i.productId === productId && i.variantId === variantId
      );
      if (exists) {
        dispatch({ type: "REMOVE_ITEM", payload: { productId, variantId } });
      } else {
        dispatch({
          type: "ADD_ITEM",
          payload: { productId, variantId, addedAt: new Date().toISOString() },
        });
      }
    },
    [state.items]
  );

  const clearWishlist = useCallback(() => {
    dispatch({ type: "CLEAR_WISHLIST" });
  }, []);

  const isInWishlist = useCallback(
    (productId: string, variantId: string) =>
      state.items.some(
        (i) => i.productId === productId && i.variantId === variantId
      ),
    [state.items]
  );

  const value = useMemo<WishlistContextValue>(
    () => ({
      items: state.items,
      itemCount: state.items.length,
      isEmpty: state.items.length === 0,
      addItem,
      removeItem,
      toggleItem,
      clearWishlist,
      isInWishlist,
    }),
    [state.items, addItem, removeItem, toggleItem, clearWishlist, isInWishlist]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

// ─────────────────────────────────────────────────────────────
// HOOK
// ─────────────────────────────────────────────────────────────

export function useWishlist(): WishlistContextValue {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}