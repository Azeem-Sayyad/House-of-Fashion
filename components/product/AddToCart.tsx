"use client";

// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Add to Cart
// components/product/AddToCart.tsx
//
// Features: Colour variant selector, blouse stitching toggle,
//           size selector, measurements CTA, stock indicator,
//           add to cart + wishlist + WhatsApp order buttons
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import Link from "next/link";
import { Product, ProductVariant, BlouseSize } from "@/lib/types";
import { formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";

// ─────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg
    width="20"
    height="20"
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

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.139.566 4.148 1.55 5.888L0 24l6.304-1.524A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.034-1.388l-.36-.214-3.742.904.944-3.641-.235-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M2.5 7l3.5 3.5L11.5 4" />
  </svg>
);

// ─────────────────────────────────────────────────────────────
// BLOUSE SIZES
// ─────────────────────────────────────────────────────────────

const blouseSizes: BlouseSize[] = ["XS", "S", "M", "L", "XL", "XXL", "custom"];

// ─────────────────────────────────────────────────────────────
// STOCK INDICATOR
// ─────────────────────────────────────────────────────────────

function StockIndicator({ stock }: { stock: number }) {
  if (stock === 0) {
    return (
      <span
        className="flex items-center gap-1.5 text-xs font-body"
        style={{ color: "var(--color-gray)" }}
      >
        <span className="w-2 h-2 rounded-full bg-brand-gray-light" />
        Out of stock
      </span>
    );
  }
  if (stock <= 3) {
    return (
      <span
        className="flex items-center gap-1.5 text-xs font-body"
        style={{ color: "#D97A97" }}
      >
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: "#D97A97" }}
        />
        Only {stock} left — order soon
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 text-xs font-body text-green-600">
      <span className="w-2 h-2 rounded-full bg-green-500" />
      In stock
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function AddToCart({
  product,
  selectedVariant,
  onVariantChange,
}: {
  product: Product;
  selectedVariant: ProductVariant;
  onVariantChange: (variant: ProductVariant) => void;
}) {
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [wantsStitching, setWantsStitching] = useState(false);
  const [selectedSize, setSelectedSize] = useState<BlouseSize | null>(null);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!product.isAvailable || selectedVariant.stock === 0) return;

    addItem({
      id: `${product.id}-${selectedVariant.id}-${wantsStitching ? "stitched" : "plain"}`,
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      image:
        selectedVariant.images.find((img) => img.isPrimary)?.url ??
        selectedVariant.images[0]?.url ??
        "",
      colour: selectedVariant.colour,
      price:
        product.price +
        (wantsStitching && product.blouse.stitchingPrice
          ? product.blouse.stitchingPrice
          : 0),
      quantity: 1,
      blouseStitching: wantsStitching,
      blouseSize: wantsStitching ? (selectedSize ?? undefined) : undefined,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in ordering the *${product.name}* in ${selectedVariant.colour}.\n\nProduct: ${product.name}\nColour: ${selectedVariant.colour}\nPrice: ${formatPrice(product.price)}${wantsStitching ? `\nBlouse stitching: Yes (Size: ${selectedSize ?? "to be confirmed"})` : ""}\n\nCould you help me place the order?`,
  );

  const totalPrice =
    product.price +
    (wantsStitching && product.blouse.stitchingPrice
      ? product.blouse.stitchingPrice
      : 0);

  return (
    <div className="flex flex-col gap-6">
      {/* ── Colour Selector ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-brand-charcoal font-body">
            Colour
          </p>
          <p className="text-sm text-brand-gray font-body">
            {selectedVariant.colour}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {product.variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => onVariantChange(variant)}
              disabled={variant.stock === 0}
              aria-label={`Select ${variant.colour}${variant.stock === 0 ? " (out of stock)" : ""}`}
              title={variant.colour}
              className={`
                relative w-9 h-9 rounded-full
                transition-all duration-200
                disabled:opacity-40 disabled:cursor-not-allowed
                ${
                  selectedVariant.id === variant.id
                    ? "ring-2 ring-brand-pink ring-offset-2 scale-110"
                    : "ring-1 ring-brand-gray-light hover:ring-brand-pink hover:ring-offset-1 hover:scale-105"
                }
              `}
              style={{ backgroundColor: variant.colourHex }}
            >
              {/* Selected checkmark */}
              {selectedVariant.id === variant.id && (
                <span
                  className="absolute inset-0 flex items-center justify-center rounded-full text-white"
                  style={{
                    background: "rgba(0,0,0,0.2)",
                    backdropFilter: "blur(1px)",
                  }}
                >
                  <CheckIcon />
                </span>
              )}
              {/* Out of stock slash */}
              {variant.stock === 0 && (
                <span
                  className="absolute inset-0 flex items-center justify-center rounded-full"
                  style={{ background: "rgba(255,255,255,0.5)" }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    stroke="rgba(0,0,0,0.4)"
                    strokeWidth="1.5"
                  >
                    <line x1="4" y1="4" x2="16" y2="16" />
                  </svg>
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Stock Indicator ── */}
      <StockIndicator stock={selectedVariant.stock} />

      {/* ── Blouse Stitching Toggle ── */}
      {product.blouse.stitchingAvailable && (
        <div
          className={`
            rounded-card border-2 p-4 transition-all duration-300 cursor-pointer
            ${wantsStitching ? "border-brand-pink bg-brand-blue-light" : "border-brand-blue-dark bg-brand-white"}
          `}
          onClick={() => {
            setWantsStitching((prev) => !prev);
            if (wantsStitching) setSelectedSize(null);
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              {/* Custom checkbox */}
              <div
                className={`
                  w-5 h-5 rounded shrink-0 mt-0.5
                  flex items-center justify-center
                  transition-all duration-200
                  ${wantsStitching ? "bg-brand-pink" : "border-2 border-brand-gray-light"}
                `}
              >
                {wantsStitching && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M2 6l3 3 5-5" />
                  </svg>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-brand-charcoal font-body">
                  Add Blouse Stitching
                </p>
                <p className="text-xs text-brand-gray font-body mt-0.5">
                  Expert stitching to your exact measurements
                </p>
              </div>
            </div>
            <span
              className="text-sm font-medium font-body shrink-0"
              style={{ color: "var(--color-pink-dark)" }}
            >
              +{formatPrice(product.blouse.stitchingPrice ?? 0)}
            </span>
          </div>

          {/* Size selector — shown when stitching selected */}
          {wantsStitching && (
            <div
              className="mt-4 pt-4 border-t border-brand-blue-dark"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-xs font-medium text-brand-charcoal font-body mb-3">
                Select Blouse Size
              </p>
              <div className="flex flex-wrap gap-2">
                {(product.blouse.availableSizes ?? blouseSizes).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      px-3 py-1.5 rounded-soft text-xs font-body font-medium
                      transition-all duration-200 capitalize
                      ${
                        selectedSize === size
                          ? "bg-brand-pink text-white shadow-pink-glow"
                          : "bg-brand-white border border-brand-blue-dark text-brand-charcoal-soft hover:border-brand-pink"
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* Custom size CTA */}
              {selectedSize === "custom" && (
                <Link
                  href="/customise"
                  className="
                    inline-flex items-center gap-1.5 mt-3
                    text-xs font-body font-medium text-brand-pink
                    hover:underline underline-offset-2
                  "
                >
                  Share your measurements →
                </Link>
              )}

              {/* Size guide link */}
              <Link
                href="/size-guide"
                className="block text-[0.65rem] text-brand-gray font-body mt-2 hover:text-brand-pink transition-colors"
              >
                View Size Guide →
              </Link>
            </div>
          )}
        </div>
      )}

      {/* ── Total Price ── */}
      {wantsStitching && product.blouse.stitchingPrice && (
        <div className="flex items-center justify-between py-3 border-t border-brand-blue-dark">
          <span className="text-sm font-body text-brand-gray">Total</span>
          <span className="font-heading font-medium text-brand-charcoal text-xl">
            {formatPrice(totalPrice)}
          </span>
        </div>
      )}

      {/* ── CTA Buttons ── */}
      <div className="flex flex-col gap-3">
        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={!product.isAvailable || selectedVariant.stock === 0}
          className={`
            btn w-full py-4 text-sm gap-2
            transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
            ${addedToCart ? "btn-outline" : "btn-primary"}
          `}
        >
          {addedToCart ? (
            <>
              <CheckIcon />
              Added to Bag
            </>
          ) : selectedVariant.stock === 0 ? (
            "Out of Stock"
          ) : (
            "Add to Bag"
          )}
        </button>

        {/* Bottom row: Wishlist + WhatsApp */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setWishlisted((prev) => !prev)}
            className="btn btn-outline py-3 text-sm gap-2"
            aria-label={
              wishlisted ? "Remove from wishlist" : "Save to wishlist"
            }
          >
            <HeartIcon filled={wishlisted} />
            {wishlisted ? "Saved" : "Wishlist"}
          </button>

          <a
            href={`https://wa.me/919999999999?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              btn py-3 text-sm gap-2
              border border-[#25D366] text-[#25D366]
              hover:bg-[#25D366] hover:text-white
              transition-all duration-200 rounded-pill
              flex items-center justify-center
            "
          >
            <WhatsAppIcon />
            Order via WhatsApp
          </a>
        </div>
      </div>

      {/* ── Delivery & Returns info strip ── */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        {[
          { icon: "🚚", label: "Free Shipping", sub: "On orders above ₹2,000" },
          { icon: "↩️", label: "Easy Returns", sub: "7-day return policy" },
          { icon: "🔒", label: "Secure Payment", sub: "UPI, Card, COD, EMI" },
          {
            icon: "📦",
            label: "Packed with Care",
            sub: "Luxury gift packaging",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-start gap-2 p-3 rounded-soft bg-brand-blue-light"
          >
            <span className="text-base shrink-0">{item.icon}</span>
            <div>
              <p className="text-[0.65rem] font-medium text-brand-charcoal font-body">
                {item.label}
              </p>
              <p className="text-[0.6rem] text-brand-gray font-body">
                {item.sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
