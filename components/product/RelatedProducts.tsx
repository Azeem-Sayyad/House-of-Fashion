"use client";

// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Related Products
// components/product/RelatedProducts.tsx
// ─────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { formatPrice } from "@/data/products";

// ─────────────────────────────────────────────────────────────
// MINI PRODUCT CARD
// ─────────────────────────────────────────────────────────────

function RelatedProductCard({ product }: { product: Product }) {
  const defaultVariant =
    product.variants.find((v) => v.id === product.defaultVariantId) ??
    product.variants[0];
  const primaryImage =
    defaultVariant.images.find((img) => img.isPrimary) ??
    defaultVariant.images[0];

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col bg-brand-white rounded-card shadow-card hover:shadow-card-hover transition-all duration-350 overflow-hidden"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-brand-blue-light" style={{ aspectRatio: "3/4" }}>
        <Image
          src={primaryImage?.url ?? "/images/placeholder-saree.jpg"}
          alt={primaryImage?.alt ?? product.name}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="badge badge-dark text-[0.55rem] py-0.5 px-2">New</span>
          )}
          {product.discount && (
            <span
              className="badge text-[0.55rem] py-0.5 px-2 text-white"
              style={{ background: "var(--color-pink-dark)" }}
            >
              {product.discount}% off
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-1.5">
        <p className="text-[0.6rem] text-brand-gray font-body tracking-widest uppercase">
          {product.region}
        </p>
        <h3 className="font-heading font-medium text-brand-charcoal text-base leading-snug line-clamp-2">
          {product.name}
        </h3>

        {/* Colour dots */}
        {product.variants.length > 1 && (
          <div className="flex gap-1 mt-1">
            {product.variants.slice(0, 4).map((v) => (
              <div
                key={v.id}
                className="w-3 h-3 rounded-full border border-brand-gray-light"
                style={{ backgroundColor: v.colourHex }}
                title={v.colour}
              />
            ))}
            {product.variants.length > 4 && (
              <span className="text-[0.55rem] text-brand-gray font-body self-center">
                +{product.variants.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          <span className="font-heading font-medium text-brand-charcoal">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-brand-gray text-xs font-body line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function RelatedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null;

  return (
    <section className="mt-20 pt-16 border-t border-brand-blue-dark" aria-label="Related products">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="section-label mb-2">You May Also Love</p>
          <h2 className="font-heading font-medium text-brand-charcoal" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}>
            Similar <span className="text-gradient-pink italic">Sarees</span>
          </h2>
        </div>
        <Link
          href="/collections"
          className="text-xs font-body font-medium text-brand-pink hover:underline underline-offset-2 hidden sm:block"
        >
          Browse All →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <RelatedProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}