"use client";

// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Cart Drawer
// components/cart/CartDrawer.tsx
//
// Slide-in from the right — triggered when item added to cart
// or when bag icon in Navbar is clicked.
// ─────────────────────────────────────────────────────────────

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import CartItemRow from "./CartItem";
import { formatPrice } from "@/data/products";

// ─────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────

const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
  >
    <path d="M4 4L16 16M16 4L4 16" />
  </svg>
);

const BagIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 12V9a6 6 0 0 1 12 0v3" />
    <rect x="4" y="12" width="24" height="17" rx="2" />
  </svg>
);

const ArrowRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

// ─────────────────────────────────────────────────────────────
// EMPTY STATE
// ─────────────────────────────────────────────────────────────

function EmptyDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 py-16 px-6 text-center">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6 text-brand-gray"
        style={{ background: "var(--color-blue-light)" }}
      >
        <BagIcon />
      </div>
      <h3 className="font-heading font-medium text-brand-charcoal text-xl mb-2">
        Your bag is empty
      </h3>
      <p className="text-brand-gray font-body text-sm mb-8 max-w-55">
        Time to find something beautiful to wear.
      </p>
      <Link
        href="/collections"
        onClick={onClose}
        className="btn btn-primary text-sm gap-2 px-6 py-3"
      >
        Shop Now
        <ArrowRight />
      </Link>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function CartDrawer() {
  const {
    items,
    isEmpty,
    itemCount,
    subtotal,
    shippingCharge,
    total,
    drawerOpen,
    closeDrawer,
  } = useCart();

  // Lock scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeDrawer]);

  return (
    <>
      {/* ── Backdrop ── */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-overlay"
          style={{ background: "rgba(30, 30, 30, 0.45)" }}
          onClick={closeDrawer}
          aria-hidden="true"
        />
      )}

      {/* ── Drawer Panel ── */}
      <div
        className={`
          fixed inset-y-0 right-0
          w-full max-w-105
          bg-brand-white flex flex-col
          transition-transform duration-350 ease-smooth
          shadow-product-hover
          ${drawerOpen ? "translate-x-0" : "translate-x-full"}
        `}
        style={{ zIndex: 9999 }}
        aria-label="Shopping cart"
        role="dialog"
        aria-modal="true"
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-blue-dark shrink-0">
          <div className="flex items-center gap-2">
            <h2 className="font-heading font-medium text-brand-charcoal text-xl">
              Your Bag
            </h2>
            {itemCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-brand-pink text-white text-[0.65rem] font-medium flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={closeDrawer}
            aria-label="Close cart"
            className="btn-ghost p-2 text-brand-gray hover:text-brand-charcoal"
          >
            <CloseIcon />
          </button>
        </div>

        {/* ── Content ── */}
        {isEmpty ? (
          <EmptyDrawer onClose={closeDrawer} />
        ) : (
          <>
            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-6 py-2">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} compact />
              ))}
            </div>

            {/* ── Footer: totals + CTA ── */}
            <div className="shrink-0 border-t border-brand-blue-dark px-6 py-5">
              {/* Shipping nudge */}
              {subtotal < 2000 && (
                <p className="text-[0.7rem] text-brand-gray font-body text-center mb-4">
                  Add{" "}
                  <span className="font-medium text-brand-pink">
                    {formatPrice(2000 - subtotal)}
                  </span>{" "}
                  more for free shipping
                </p>
              )}

              {/* Totals */}
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-brand-gray font-body">
                  Subtotal
                </span>
                <span className="text-sm font-body text-brand-charcoal">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-brand-gray font-body">
                  Shipping
                </span>
                <span className="text-sm font-body text-brand-charcoal">
                  {shippingCharge === 0 ? "Free" : formatPrice(shippingCharge)}
                </span>
              </div>
              <div className="flex items-center justify-between mb-5 pt-3 border-t border-brand-blue-dark">
                <span className="text-sm font-medium text-brand-charcoal font-body">
                  Total
                </span>
                <span className="font-heading font-medium text-brand-charcoal text-xl">
                  {formatPrice(total)}
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-2">
                <Link
                  href="/checkout"
                  onClick={closeDrawer}
                  className="btn btn-primary w-full py-3.5 text-sm justify-center gap-2"
                >
                  Checkout · {formatPrice(total)}
                  <ArrowRight />
                </Link>
                <Link
                  href="/cart"
                  onClick={closeDrawer}
                  className="btn btn-outline w-full py-2.5 text-xs justify-center"
                >
                  View Full Cart
                </Link>
              </div>

              {/* Payment row */}
              <div className="flex items-center justify-center gap-1.5 mt-4 flex-wrap">
                {["UPI", "Card", "COD", "EMI"].map((m) => (
                  <span
                    key={m}
                    className="text-[0.55rem] text-brand-gray font-body px-2 py-0.5 border border-brand-blue-dark rounded"
                    style={{ background: "var(--color-blue-light)" }}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
