// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Product Info
// components/product/ProductInfo.tsx
//
// Displays: name, price, badges, short description,
//           fabric/weave/occasion metadata, care instructions
// ─────────────────────────────────────────────────────────────

import { Product } from "@/lib/types";
import { formatPrice } from "@/data/products";

// ─────────────────────────────────────────────────────────────
// ICON
// ─────────────────────────────────────────────────────────────

const InfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="8" cy="8" r="6" />
    <path d="M8 7v4M8 5.5v.5" />
  </svg>
);

// ─────────────────────────────────────────────────────────────
// DETAIL ROW — reusable label + value pair
// ─────────────────────────────────────────────────────────────

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-brand-blue-dark last:border-0">
      <span className="text-[0.7rem] text-brand-gray font-body tracking-widest uppercase w-28 shrink-0 mt-0.5">
        {label}
      </span>
      <span className="text-sm text-brand-charcoal font-body leading-relaxed">
        {value}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function ProductInfo({ product }: { product: Product }) {
  const discountAmount = product.originalPrice
    ? product.originalPrice - product.price
    : null;

  return (
    <div className="flex flex-col gap-6">

      {/* ── Breadcrumb hint ── */}
      <p className="text-[0.65rem] text-brand-gray font-body tracking-widest uppercase">
        {product.region} · {product.fabric} · {product.weave}
      </p>

      {/* ── Product Name ── */}
      <div>
        <h1
          className="font-heading font-medium text-brand-charcoal leading-tight mb-3"
          style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
        >
          {product.name}
        </h1>

        {/* ── Status Badges ── */}
        <div className="flex flex-wrap items-center gap-2">
          {product.isNew && (
            <span className="badge badge-dark text-[0.6rem] py-1 px-3">
              New Arrival
            </span>
          )}
          {product.isBestseller && (
            <span className="badge badge-pink text-[0.6rem] py-1 px-3">
              Bestseller
            </span>
          )}
          {product.isMadeToOrder && (
            <span className="badge badge-outline text-[0.6rem] py-1 px-3">
              Made to Order
            </span>
          )}
          {!product.isAvailable && (
            <span
              className="badge text-[0.6rem] py-1 px-3 text-white"
              style={{ background: "var(--color-gray)" }}
            >
              Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* ── Pricing ── */}
      <div className="flex items-end gap-4 pb-6 border-b border-brand-blue-dark">
        <div>
          <span
            className="font-heading font-medium text-brand-charcoal"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}
          >
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-brand-gray font-body line-through text-lg ml-3">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Savings callout */}
        {discountAmount && (
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-soft mb-1"
            style={{ background: "var(--color-pink-light)" }}
          >
            <span className="text-xs font-medium font-body" style={{ color: "var(--color-pink-dark)" }}>
              Save {formatPrice(discountAmount)}
            </span>
            <span
              className="text-[0.6rem] font-body px-1.5 py-0.5 rounded"
              style={{ background: "var(--color-pink-dark)", color: "white" }}
            >
              {product.discount}% off
            </span>
          </div>
        )}
      </div>

      {/* ── Taxes note ── */}
      <p className="text-[0.7rem] text-brand-gray font-body -mt-4">
        Inclusive of all taxes. Free shipping on orders above ₹2,000.
      </p>

      {/* ── Short Description ── */}
      <p className="text-brand-gray font-body leading-relaxed" style={{ fontSize: "0.9375rem" }}>
        {product.shortDescription}
      </p>

      {/* ── Product Metadata ── */}
      <div className="rounded-card bg-brand-blue-light p-5">
        <DetailRow
          label="Fabric"
          value={product.fabric.charAt(0).toUpperCase() + product.fabric.slice(1)}
        />
        <DetailRow
          label="Weave"
          value={product.weave.charAt(0).toUpperCase() + product.weave.slice(1)}
        />
        <DetailRow
          label="Region"
          value={product.region}
        />
        <DetailRow
          label="Length"
          value={`${product.length} metres${product.width ? ` × ${product.width} cm` : ""}`}
        />
        <DetailRow
          label="Occasion"
          value={product.occasion
            .map((o) => o.charAt(0).toUpperCase() + o.slice(1))
            .join(", ")}
        />
        <DetailRow
          label="Blouse"
          value={
            product.blouse.included
              ? `Unstitched piece included (${product.blouse.fabricMetres ?? 0.8}m)`
              : "Blouse piece not included"
          }
        />
      </div>

      {/* ── Full Description — expandable ── */}
      <details className="group">
        <summary className="
          flex items-center justify-between cursor-pointer
          text-sm font-medium text-brand-charcoal font-body
          py-3 border-b border-brand-blue-dark
          list-none
        ">
          <span>Full Description</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            className="transition-transform duration-200 group-open:rotate-180"
          >
            <path d="M3 6l5 5 5-5" />
          </svg>
        </summary>
        <p className="text-brand-gray font-body leading-relaxed text-sm pt-4 pb-2">
          {product.description}
        </p>
      </details>

      {/* ── Care Instructions — expandable ── */}
      <details className="group">
        <summary className="
          flex items-center justify-between cursor-pointer
          text-sm font-medium text-brand-charcoal font-body
          py-3 border-b border-brand-blue-dark
          list-none
        ">
          <span>Care Instructions</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            className="transition-transform duration-200 group-open:rotate-180"
          >
            <path d="M3 6l5 5 5-5" />
          </svg>
        </summary>
        <ul className="pt-4 pb-2 space-y-2">
          {product.careInstructions.map((instruction, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <div
                className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                style={{ background: "var(--color-pink)" }}
              />
              <span className="text-sm text-brand-gray font-body leading-relaxed">
                {instruction}
              </span>
            </li>
          ))}
        </ul>
      </details>

      {/* ── Authenticity note ── */}
      <div
        className="flex items-start gap-3 p-4 rounded-soft"
        style={{ background: "var(--color-pink-light)" }}
      >
        <div className="shrink-0 mt-0.5 text-brand-pink-dark">
          <InfoIcon />
        </div>
        <p className="text-xs font-body leading-relaxed" style={{ color: "var(--color-pink-dark)" }}>
          <strong>Authenticity Guarantee</strong> — Every saree is sourced directly from
          registered weavers and artisan cooperatives. Handwoven, never mass-produced.
        </p>
      </div>

    </div>
  );
}