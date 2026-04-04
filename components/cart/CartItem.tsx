"use client";

// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Cart Item
// components/cart/CartItem.tsx
// ─────────────────────────────────────────────────────────────

import Image from "next/image";
import Link from "next/link";
import { CartItem as CartItemType } from "@/lib/types";
import { formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";

// ─────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────

const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 5h14M8 5V3h4v2M6 5l1 12h6l1-12" />
  </svg>
);

const MinusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M2 6h8" />
  </svg>
);

const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M6 2v8M2 6h8" />
  </svg>
);

// ─────────────────────────────────────────────────────────────
// FIND PRODUCT SLUG from productId — used for product link
// In a real app this would come from the cart item itself
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function CartItemRow({
  item,
  compact = false,
}: {
  item: CartItemType;
  compact?: boolean;   // compact = drawer view, full = cart page
}) {
  const { removeItem, updateQuantity } = useCart();

  const lineTotal = item.price * item.quantity;

  if (compact) {
    // ── Compact version for drawer ──
    return (
      <div className="flex gap-3 py-4 border-b border-brand-blue-dark last:border-0">
        {/* Image */}
        <div className="relative w-16 h-20 rounded-soft overflow-hidden bg-brand-blue-light shrink-0">
          <Image
            src={item.image || "/images/placeholder-saree.jpg"}
            alt={item.name}
            fill
            sizes="64px"
            className="object-cover object-top"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-[0.65rem] text-brand-gray font-body tracking-wide uppercase mb-0.5">
            {item.colour}
          </p>
          <h4 className="font-heading font-medium text-brand-charcoal text-sm leading-snug line-clamp-2 mb-1">
            {item.name}
          </h4>
          {item.blouseStitching && (
            <p className="text-[0.6rem] text-brand-pink font-body">
              ✂ Stitching · {item.blouseSize ?? "Custom"}
            </p>
          )}
          <div className="flex items-center justify-between mt-2">
            <span className="font-heading font-medium text-brand-charcoal text-sm">
              {formatPrice(lineTotal)}
            </span>
            <button
              onClick={() => removeItem(item.id)}
              aria-label="Remove item"
              className="text-brand-gray hover:text-red-400 transition-colors duration-200"
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Full version for cart page ──
  return (
    <div className="flex gap-5 py-6 border-b border-brand-blue-dark last:border-0">

      {/* ── Product Image ── */}
      <Link
        href={`/product/${item.productId}`}
        className="relative w-24 h-32 rounded-card overflow-hidden bg-brand-blue-light shrink-0 shadow-product hover:shadow-product-hover transition-shadow duration-300"
      >
        <Image
          src={item.image || "/images/placeholder-saree.jpg"}
          alt={item.name}
          fill
          sizes="96px"
          className="object-cover object-top"
        />
      </Link>

      {/* ── Item Details ── */}
      <div className="flex-1 min-w-0 flex flex-col gap-2">

        {/* Region / colour meta */}
        <p className="text-[0.65rem] text-brand-gray font-body tracking-widest uppercase">
          {item.colour}
        </p>

        {/* Product name */}
        <Link href={`/product/${item.productId}`}>
          <h3 className="font-heading font-medium text-brand-charcoal text-lg leading-snug hover:text-brand-pink transition-colors duration-200">
            {item.name}
          </h3>
        </Link>

        {/* Blouse stitching info */}
        {item.blouseStitching && (
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-soft text-[0.65rem] font-body self-start"
            style={{ background: "var(--color-pink-light)", color: "var(--color-pink-dark)" }}
          >
            ✂ Blouse stitching included
            {item.blouseSize && (
              <span className="font-medium">· Size {item.blouseSize}</span>
            )}
          </div>
        )}

        {/* Bottom row: quantity + price + remove */}
        <div className="flex items-center justify-between mt-auto pt-2 flex-wrap gap-3">

          {/* Quantity stepper */}
          <div className="flex items-center gap-0 border border-brand-blue-dark rounded-soft overflow-hidden">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              aria-label="Decrease quantity"
              className="
                w-8 h-8 flex items-center justify-center
                text-brand-gray hover:text-brand-charcoal
                hover:bg-brand-blue-light
                transition-all duration-150
                disabled:opacity-30
              "
              disabled={item.quantity <= 1}
            >
              <MinusIcon />
            </button>

            <span className="w-10 text-center text-sm font-medium text-brand-charcoal font-body border-x border-brand-blue-dark">
              {item.quantity}
            </span>

            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              aria-label="Increase quantity"
              className="
                w-8 h-8 flex items-center justify-center
                text-brand-gray hover:text-brand-charcoal
                hover:bg-brand-blue-light
                transition-all duration-150
              "
            >
              <PlusIcon />
            </button>
          </div>

          {/* Line total */}
          <span className="font-heading font-medium text-brand-charcoal text-lg">
            {formatPrice(lineTotal)}
          </span>

          {/* Remove */}
          <button
            onClick={() => removeItem(item.id)}
            aria-label={`Remove ${item.name} from cart`}
            className="
              flex items-center gap-1.5 text-[0.7rem] font-body
              text-brand-gray hover:text-red-400
              transition-colors duration-200
            "
          >
            <TrashIcon />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}