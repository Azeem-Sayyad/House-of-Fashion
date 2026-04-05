"use client";

// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Wishlist Page
// app/wishlist/page.tsx
// ─────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { products, formatPrice } from "@/data/products";
import { Product } from "@/lib/types";

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

const BagIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 7V5a4 4 0 0 1 8 0v2" />
    <rect x="2" y="7" width="16" height="12" rx="2" />
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 5h14M8 5V3h4v2M6 5l1 12h6l1-12" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.139.566 4.148 1.55 5.888L0 24l6.304-1.524A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.034-1.388l-.36-.214-3.742.904.944-3.641-.235-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
  </svg>
);

// ─────────────────────────────────────────────────────────────
// EMPTY STATE
// ─────────────────────────────────────────────────────────────

function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      {/* Animated heart */}
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center mb-8"
        style={{ background: "var(--color-pink-light)" }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 20 20"
          fill="none"
          stroke="var(--color-pink)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 17s-7-4.35-7-9a4 4 0 0 1 7-2.67A4 4 0 0 1 17 8c0 4.65-7 9-7 9z" />
        </svg>
      </div>

      <h2 className="font-heading font-medium text-brand-charcoal text-3xl mb-3">
        Your wishlist is empty
      </h2>
      <p className="text-brand-gray font-body text-sm mb-10 max-w-sm leading-relaxed">
        Save sarees you love and come back to them anytime.
        Because the right saree deserves a second look.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/collections"
          className="btn btn-primary gap-2 px-8 py-3.5 text-sm"
        >
          Browse Collections
          <ArrowRight />
        </Link>
        <Link
          href="/collections/bridal-edit"
          className="btn btn-outline gap-2 px-8 py-3.5 text-sm"
        >
          Bridal Edit
        </Link>
      </div>

      {/* Script accent */}
      <div className="mt-12">
        <span className="font-script text-brand-pink" style={{ fontSize: "1.75rem" }}>
          — something beautiful is waiting
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// WISHLIST PRODUCT CARD
// ─────────────────────────────────────────────────────────────

function WishlistCard({
  product,
  variantId,
}: {
  product: Product;
  variantId: string;
}) {
  const { removeItem } = useWishlist();
  const { addItem, openDrawer } = useCart();

  const variant =
    product.variants.find((v) => v.id === variantId) ??
    product.variants[0];

  const primaryImage =
    variant.images.find((img) => img.isPrimary) ?? variant.images[0];

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${variant.id}-plain`,
      productId: product.id,
      variantId: variant.id,
      name: product.name,
      image: primaryImage?.url ?? "",
      colour: variant.colour,
      price: product.price,
      quantity: 1,
      blouseStitching: false,
    });
    openDrawer();
  };

  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in *${product.name}* in ${variant.colour} (₹${product.price.toLocaleString("en-IN")}). Could you help me with this?`
  );

  return (
    <div className="group bg-brand-white rounded-card shadow-card hover:shadow-card-hover transition-all duration-350 overflow-hidden flex flex-col">

      {/* ── Image ── */}
      <Link
        href={`/product/${product.slug}`}
        className="relative block overflow-hidden bg-brand-blue-light"
        style={{ aspectRatio: "3/4" }}
      >
        <Image
          src={primaryImage?.url ?? "/images/placeholder-saree.jpg"}
          alt={primaryImage?.alt ?? product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badges */}
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
        </div>

        {/* Remove from wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            removeItem(product.id, variant.id);
          }}
          aria-label="Remove from wishlist"
          className="
            absolute top-3 right-3 z-10
            w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm
            flex items-center justify-center
            shadow-card transition-all duration-200
            hover:scale-110 hover:bg-white
          "
        >
          <HeartIcon filled />
        </button>

        {/* Out of stock overlay */}
        {variant.stock === 0 && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(30,30,30,0.5)" }}
          >
            <span className="badge badge-dark text-xs px-4 py-2">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* ── Info ── */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Region + fabric */}
        <p className="text-[0.6rem] text-brand-gray font-body tracking-widest uppercase">
          {product.region} · {product.fabric}
        </p>

        {/* Name */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-heading font-medium text-brand-charcoal text-lg leading-snug line-clamp-2 hover:text-brand-pink transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        {/* Colour being wishlisted */}
        <div className="flex items-center gap-2">
          <div
            className="w-3.5 h-3.5 rounded-full border border-brand-gray-light shrink-0"
            style={{ backgroundColor: variant.colourHex }}
          />
          <span className="text-xs text-brand-gray font-body">{variant.colour}</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-heading font-medium text-brand-charcoal text-lg">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-brand-gray text-sm font-body line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Stock indicator */}
        {variant.stock > 0 && variant.stock <= 3 && (
          <p className="text-[0.65rem] font-body" style={{ color: "var(--color-pink-dark)" }}>
            Only {variant.stock} left
          </p>
        )}

        {/* CTA buttons */}
        <div className="flex flex-col gap-2 mt-auto pt-1">
          <button
            onClick={handleAddToCart}
            disabled={variant.stock === 0}
            className="btn btn-primary w-full py-3 text-xs gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <BagIcon />
            {variant.stock === 0 ? "Out of Stock" : "Add to Bag"}
          </button>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/product/${product.slug}`}
              className="btn btn-outline py-2.5 text-xs justify-center"
            >
              View Details
            </Link>
            <a
              href={`https://wa.me/919999999999?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="
                btn py-2.5 text-xs gap-1.5
                border border-[#25D366] text-[#25D366]
                hover:bg-[#25D366] hover:text-white
                transition-all duration-200 rounded-pill
                flex items-center justify-center
              "
            >
              <WhatsAppIcon />
              Order
            </a>
          </div>
        </div>

        {/* Remove link */}
        <button
          onClick={() => removeItem(product.id, variant.id)}
          className="flex items-center gap-1.5 text-[0.65rem] font-body text-brand-gray hover:text-red-400 transition-colors duration-200 self-start"
        >
          <TrashIcon />
          Remove
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────

export default function WishlistPage() {
  const { items, isEmpty, itemCount, clearWishlist } = useWishlist();
  const { addItem, openDrawer } = useCart();

  // Resolve product objects from wishlist item IDs
  const wishlistProducts = items
    .map((item) => ({
      product: products.find((p) => p.id === item.productId),
      variantId: item.variantId,
      addedAt: item.addedAt,
    }))
    .filter((entry): entry is {
      product: Product;
      variantId: string;
      addedAt: string;
    } => entry.product !== undefined);

  const handleAddAllToCart = () => {
    wishlistProducts.forEach(({ product, variantId }) => {
      const variant =
        product.variants.find((v) => v.id === variantId) ??
        product.variants[0];
      const primaryImage =
        variant.images.find((img) => img.isPrimary) ?? variant.images[0];

      if (variant.stock > 0) {
        addItem({
          id: `${product.id}-${variant.id}-plain`,
          productId: product.id,
          variantId: variant.id,
          name: product.name,
          image: primaryImage?.url ?? "",
          colour: variant.colour,
          price: product.price,
          quantity: 1,
          blouseStitching: false,
        });
      }
    });
    openDrawer();
  };

  return (
    <div className="bg-brand-blue min-h-screen">
      <div className="container-site py-10 lg:py-16">

        {/* ── Page Header ── */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="section-label mb-1">Saved by You</p>
            <h1
              className="font-heading font-medium text-brand-charcoal"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Your{" "}
              <span className="text-gradient-pink italic">Wishlist</span>
            </h1>
          </div>

          {!isEmpty && (
            <div className="flex items-center gap-4">
              <p className="text-sm font-body text-brand-gray hidden sm:block">
                {itemCount} {itemCount === 1 ? "saree" : "sarees"} saved
              </p>
              <button
                onClick={clearWishlist}
                className="text-xs font-body text-brand-gray hover:text-red-400 transition-colors underline underline-offset-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {isEmpty ? (
          <EmptyWishlist />
        ) : (
          <>
            {/* ── Add all to cart strip ── */}
            <div
              className="
                flex flex-col sm:flex-row items-start sm:items-center
                justify-between gap-4 p-5 rounded-card mb-8
              "
              style={{ background: "var(--color-pink-light)" }}
            >
              <div>
                <p className="font-body font-medium text-brand-charcoal text-sm mb-0.5">
                  Ready to order?
                </p>
                <p className="text-[0.75rem] text-brand-gray font-body">
                  Add all available items to your bag in one go.
                </p>
              </div>
              <button
                onClick={handleAddAllToCart}
                className="btn btn-primary gap-2 py-2.5 px-6 text-sm shrink-0"
              >
                <BagIcon />
                Add All to Bag
              </button>
            </div>

            {/* ── Product Grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {wishlistProducts.map(({ product, variantId }) => (
                <WishlistCard
                  key={`${product.id}-${variantId}`}
                  product={product}
                  variantId={variantId}
                />
              ))}
            </div>

            {/* ── Bottom CTA ── */}
            <div className="mt-16 text-center">
              <p className="text-brand-gray font-body text-sm mb-4">
                Looking for something specific?
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/collections"
                  className="btn btn-outline gap-2 px-6 py-3 text-sm group"
                >
                  Continue Browsing
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    <ArrowRight />
                  </span>
                </Link>
                <a
                  href="https://wa.me/919999999999?text=Hi!%20I%20need%20help%20finding%20a%20saree."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline gap-2 px-6 py-3 text-sm text-[#25D366] border-[#25D366] hover:bg-[#25D366] hover:text-white"
                >
                  <WhatsAppIcon />
                  Get Styling Help
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}