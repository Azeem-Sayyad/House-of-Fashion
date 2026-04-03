"use client";

// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Product Gallery Wrapper
// components/product/ProductImageGalleryWrapper.tsx
//
// Why this exists: The page.tsx is a Server Component (for SEO
// and generateMetadata). But ProductImageGallery and AddToCart
// both need shared variant state. This wrapper is the single
// "use client" boundary that owns that state and passes it down.
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { Product, ProductVariant } from "@/lib/types";
import ProductImageGallery from "./ProductImageGallery";
import AddToCart from "./AddToCart";

export default function ProductImageGalleryWrapper({
  product,
}: {
  product: Product;
}) {
  const defaultVariant =
    product.variants.find((v) => v.id === product.defaultVariantId) ??
    product.variants[0];

  const [selectedVariant, setSelectedVariant] =
    useState<ProductVariant>(defaultVariant);

  return (
    <div className="flex flex-col gap-10">
      {/* Gallery — driven by selected variant's images */}
      <ProductImageGallery variant={selectedVariant} />

      {/* Add to Cart — controls variant selection */}
      <AddToCart
        product={product}
        selectedVariant={selectedVariant}
        onVariantChange={setSelectedVariant}
      />
    </div>
  );
}