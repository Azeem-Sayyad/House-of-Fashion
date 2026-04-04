"use client";

// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Cart Summary
// components/cart/CartSummary.tsx
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";

// ─────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="7" width="10" height="8" rx="1.5" />
    <path d="M5 7V5a3 3 0 0 1 6 0v2" />
  </svg>
);

const TagIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 2h5l7 7-5 5-7-7V2z" />
    <circle cx="5.5" cy="5.5" r="1" fill="currentColor" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M2.5 7l3.5 3.5L11.5 4" />
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

// ─────────────────────────────────────────────────────────────
// SUMMARY ROW — label + value pair
// ─────────────────────────────────────────────────────────────

function SummaryRow({
  label,
  value,
  highlight = false,
  strikethrough = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  strikethrough?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between py-2.5 ${highlight ? "border-t border-brand-blue-dark mt-1 pt-4" : ""}`}>
      <span
        className={`font-body text-sm ${highlight ? "font-medium text-brand-charcoal" : "text-brand-gray"}`}
      >
        {label}
      </span>
      <span
        className={`font-body text-sm ${
          highlight
            ? "font-heading font-medium text-brand-charcoal text-lg"
            : strikethrough
            ? "line-through text-brand-gray"
            : "text-brand-charcoal"
        }`}
        style={strikethrough ? { color: "var(--color-pink-dark)" } : undefined}
      >
        {value}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// COUPON INPUT
// ─────────────────────────────────────────────────────────────

function CouponInput() {
  const { applyCoupon, removeCoupon, couponCode } = useCart();
  const [inputCode, setInputCode] = useState("");
  const [status, setStatus] = useState<{ message: string; success: boolean } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    if (!inputCode.trim()) return;
    setLoading(true);
    setStatus(null);
    const result = await applyCoupon(inputCode);
    setStatus(result);
    setLoading(false);
    if (result.success) setInputCode("");
  };

  if (couponCode) {
    return (
      <div
        className="flex items-center justify-between p-3 rounded-soft"
        style={{ background: "var(--color-pink-light)" }}
      >
        <div className="flex items-center gap-2">
          <span style={{ color: "var(--color-pink-dark)" }}>
            <CheckIcon />
          </span>
          <span className="text-sm font-body font-medium" style={{ color: "var(--color-pink-dark)" }}>
            {couponCode} applied
          </span>
        </div>
        <button
          onClick={removeCoupon}
          className="text-[0.65rem] font-body text-brand-gray hover:text-red-400 transition-colors underline underline-offset-2"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray">
            <TagIcon />
          </span>
          <input
            type="text"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && handleApply()}
            placeholder="Enter coupon code"
            className="input-field pl-9 py-2.5 text-xs uppercase tracking-widest"
          />
        </div>
        <button
          onClick={handleApply}
          disabled={loading || !inputCode.trim()}
          className="btn btn-outline py-2.5 px-4 text-xs shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "..." : "Apply"}
        </button>
      </div>

      {/* Status message */}
      {status && (
        <p
          className="text-[0.7rem] font-body mt-2"
          style={{ color: status.success ? "var(--color-pink-dark)" : "#ef4444" }}
        >
          {status.message}
        </p>
      )}

      {/* Hint */}
      <p className="text-[0.65rem] text-brand-gray font-body mt-1.5">
        Try: HOFTRIAL · BRIDE2024 · FIRST10
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function CartSummary() {
  const {
    subtotal,
    shippingCharge,
    discount,
    total,
    itemCount,
    isEmpty,
  } = useCart();

  const FREE_SHIPPING_THRESHOLD = 2000;
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div className="bg-brand-white rounded-card shadow-card p-6 flex flex-col gap-5">

      {/* ── Heading ── */}
      <h2 className="font-heading font-medium text-brand-charcoal text-xl">
        Order Summary
      </h2>

      {/* ── Free shipping progress ── */}
      {!isEmpty && subtotal < FREE_SHIPPING_THRESHOLD && (
        <div
          className="p-3 rounded-soft text-xs font-body"
          style={{ background: "var(--color-blue-light)" }}
        >
          <p className="text-brand-charcoal mb-2">
            Add{" "}
            <span className="font-medium text-brand-pink">
              {formatPrice(remainingForFreeShipping)}
            </span>{" "}
            more for free shipping!
          </p>
          <div className="w-full h-1.5 rounded-full bg-brand-blue-dark overflow-hidden">
            <div
              className="h-full rounded-full bg-brand-pink transition-all duration-500"
              style={{ width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      {subtotal >= FREE_SHIPPING_THRESHOLD && !isEmpty && (
        <div
          className="flex items-center gap-2 p-3 rounded-soft text-xs font-body"
          style={{ background: "var(--color-pink-light)", color: "var(--color-pink-dark)" }}
        >
          <CheckIcon />
          <span className="font-medium">You've unlocked free shipping! 🎉</span>
        </div>
      )}

      {/* ── Price breakdown ── */}
      <div>
        <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
        <SummaryRow
          label="Shipping"
          value={shippingCharge === 0 ? (isEmpty ? "—" : "Free") : formatPrice(shippingCharge)}
        />
        {discount > 0 && (
          <SummaryRow
            label={`Discount (${useCart().couponCode})`}
            value={`− ${formatPrice(discount)}`}
            strikethrough
          />
        )}
        <SummaryRow
          label={`Total (${itemCount} item${itemCount !== 1 ? "s" : ""})`}
          value={formatPrice(total)}
          highlight
        />
      </div>

      {/* ── Coupon ── */}
      <div>
        <p className="text-xs font-body font-medium text-brand-charcoal mb-3 tracking-wide uppercase">
          Have a coupon?
        </p>
        <CouponInput />
      </div>

      {/* ── Checkout CTA ── */}
      <div className="flex flex-col gap-3">
        <Link
          href="/checkout"
          className={`
            btn btn-primary w-full py-4 text-sm gap-2 justify-center
            ${isEmpty ? "opacity-50 pointer-events-none" : ""}
          `}
        >
          <LockIcon />
          Proceed to Checkout
          <ArrowRight />
        </Link>

        <Link
          href="/collections"
          className="btn btn-ghost w-full py-2.5 text-xs text-brand-gray justify-center"
        >
          ← Continue Shopping
        </Link>
      </div>

      {/* ── Payment methods ── */}
      <div className="pt-2 border-t border-brand-blue-dark">
        <p className="text-[0.65rem] text-brand-gray font-body text-center mb-3 uppercase tracking-widest">
          Secure Payment
        </p>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {["UPI", "Visa", "MC", "RuPay", "NetBanking", "COD", "EMI"].map((method) => (
            <span
              key={method}
              className="px-2 py-1 rounded text-[0.6rem] font-body text-brand-gray border border-brand-blue-dark"
              style={{ background: "var(--color-blue-light)" }}
            >
              {method}
            </span>
          ))}
        </div>
      </div>

      {/* ── Trust note ── */}
      <div className="flex items-center justify-center gap-1.5 text-[0.65rem] text-brand-gray font-body">
        <LockIcon />
        <span>256-bit SSL encrypted checkout</span>
      </div>
    </div>
  );
}