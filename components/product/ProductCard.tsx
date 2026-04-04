"use client";

// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Product Card
// components/product/ProductCard.tsx
//
// Reusable card used in collections, search results, related
// products and anywhere else a product grid appears.
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { formatPrice } from "@/data/products";

// ─────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill={filled ? "var(--color-pink)" : "none"}
    stroke={filled ? "var(--color-pink)" : "currentColor"}
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 17s-7-4.35-7-9a4 4 0 0 1 7-2.67A4 4 0 0 1 17 8c0 4.65-7 9-7 9z" />
  </svg>
);

const BagIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 7V5a4 4 0 0 1 8 0v2" />
    <rect x="2" y="7" width="16" height="12" rx="2" />
  </svg>
);

// ─────────────────────────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────────────────────────

export default function ProductCard({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [hovering, setHovering] = useState(false);

  const defaultVariant =
    product.variants.find((v) => v.id === product.defaultVariantId) ??
    product.variants[0];

  const primaryImage =
    defaultVariant.images.find((img) => img.isPrimary) ??
    defaultVariant.images[0];
  const secondaryImage = defaultVariant.images[1] ?? null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
    // TODO: dispatch to cart context
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setWishlisted((prev) => !prev);
  };

  return (
    <div
      className="group relative bg-brand-white rounded-card shadow-product hover:shadow-product-hover transition-all duration-350 overflow-hidden flex flex-col"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* ── Image Section ── */}
      <Link
        href={`/product/${product.slug}`}
        className="block relative product-image-wrapper flex-shrink-0"
        tabIndex={-1}
        aria-hidden="true"
      >
        {/* Primary image */}
        <Image
          src={primaryImage?.url ?? "/images/placeholder-saree.jpg"}
          alt={primaryImage?.alt ?? product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`
            object-cover object-top absolute inset-0
            transition-opacity duration-500
            ${hovering && secondaryImage ? "opacity-0" : "opacity-100"}
          `}
        />

        {/* Secondary image swap on hover */}
        {secondaryImage && (
          <Image
            src={secondaryImage.url}
            alt={secondaryImage.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`
              object-cover object-top absolute inset-0
              transition-opacity duration-500
              ${hovering ? "opacity-100" : "opacity-0"}
            `}
          />
        )}

        {/* ── Badges ── */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="badge badge-dark text-[0.6rem] py-1 px-2.5">New</span>
          )}
          {product.isBestseller && (
            <span className="badge badge-pink text-[0.6rem] py-1 px-2.5">Bestseller</span>
          )}
          {product.discount && (
            <span
              className="badge text-[0.6rem] py-1 px-2.5 text-white"
              style={{ background: "var(--color-pink-dark)" }}
            >
              {product.discount}% off
            </span>
          )}
          {product.isMadeToOrder && (
            <span className="badge badge-outline text-[0.6rem] py-1 px-2.5 bg-white/80">
              MTO
            </span>
          )}
        </div>

        {/* ── Wishlist button ── */}
        <button
          onClick={handleWishlist}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="
            absolute top-3 right-3 z-10
            w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm
            flex items-center justify-center
            shadow-card transition-all duration-200
            hover:scale-110 hover:bg-white
          "
        >
          <HeartIcon filled={wishlisted} />
        </button>

        {/* ── Quick add — slides up on hover ── */}
        <div
          className={`
            absolute bottom-0 left-0 right-0 z-10
            transition-transform duration-300
            ${hovering ? "translate-y-0" : "translate-y-full"}
          `}
        >
          <button
            onClick={handleAddToCart}
            className="
              w-full flex items-center justify-center gap-2
              py-3 font-body text-xs font-medium tracking-wide
              transition-all duration-200
            "
            style={{
              background: addedToCart
                ? "var(--color-pink-dark)"
                : "var(--color-charcoal)",
              color: "white",
            }}
          >
            <BagIcon />
            {addedToCart ? "Added to Bag ✓" : "Quick Add"}
          </button>
        </div>
      </Link>

      {/* ── Product Info ── */}
      <Link href={`/product/${product.slug}`} className="flex flex-col flex-1 p-4">
        {/* Region + fabric */}
        <p className="text-[0.6rem] text-brand-gray font-body tracking-widest uppercase mb-1">
          {product.region} · {product.fabric}
        </p>

        {/* Name */}
        <h3 className="font-heading font-medium text-brand-charcoal text-lg leading-snug mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Colour variant dots */}
        {product.variants.length > 1 && (
          <div className="flex items-center gap-1.5 mb-3">
            {product.variants.slice(0, 5).map((variant) => (
              <div
                key={variant.id}
                title={variant.colour}
                className="w-3.5 h-3.5 rounded-full border border-brand-gray-light hover:ring-2 hover:ring-brand-pink ring-offset-1 transition-all duration-150 cursor-pointer"
                style={{ backgroundColor: variant.colourHex }}
              />
            ))}
            {product.variants.length > 5 && (
              <span className="text-[0.6rem] text-brand-gray font-body">
                +{product.variants.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mt-auto pt-1">
          <span className="font-heading font-medium text-brand-charcoal text-lg">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-brand-gray text-sm font-body line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Blouse stitching callout */}
        {product.blouse.stitchingAvailable && (
          <p className="text-[0.65rem] text-brand-pink font-body mt-1.5">
            ✂ Blouse stitching available
          </p>
        )}
      </Link>
    </div>
  );
}