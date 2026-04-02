"use client";

// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Best Sellers
// components/home/BestSellers.tsx
//
// Layout: Horizontal scroll row on mobile, 4-col grid on desktop
// Features: Wishlist toggle, quick-add, discount badge,
//           colour variant dots, hover second image swap
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getBestsellers, formatPrice } from "@/data/products";
import { Product } from "@/lib/types";

// ─────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg
    width="18"
    height="18"
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
    width="16"
    height="16"
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

const ArrowLeft = () => (
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
    <path d="M13 8H3M7 12l-4-4 4-4" />
  </svg>
);

// ─────────────────────────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [hovering, setHovering] = useState(false);

  const defaultVariant = product.variants.find(
    (v) => v.id === product.defaultVariantId
  ) ?? product.variants[0];

  const primaryImage = defaultVariant.images.find((img) => img.isPrimary) ?? defaultVariant.images[0];
  const secondaryImage = defaultVariant.images[1] ?? null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setWishlisted((prev) => !prev);
  };

  return (
    <div
      className="group relative bg-brand-white rounded-card shadow-product hover:shadow-product-hover transition-all duration-350 overflow-hidden flex flex-col"
      style={{ minWidth: "260px", maxWidth: "300px" }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* ── Image Section ── */}
      <Link
        href={`/product/${product.slug}`}
        className="block relative product-image-wrapper shrink-0"
        tabIndex={-1}
        aria-hidden="true"
      >
        {/* Primary image */}
        <Image
          src={primaryImage?.url ?? "/images/placeholder-saree.jpg"}
          alt={primaryImage?.alt ?? product.name}
          fill
          sizes="(max-width: 640px) 260px, 300px"
          className={`
            object-cover object-top absolute inset-0
            transition-opacity duration-500
            ${hovering && secondaryImage ? "opacity-0" : "opacity-100"}
          `}
        />

        {/* Secondary image — swap on hover */}
        {secondaryImage && (
          <Image
            src={secondaryImage.url}
            alt={secondaryImage.alt}
            fill
            sizes="(max-width: 640px) 260px, 300px"
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
            <span className="badge badge-dark text-[0.6rem] py-1 px-2.5">
              New
            </span>
          )}
          {product.isBestseller && (
            <span className="badge badge-pink text-[0.6rem] py-1 px-2.5">
              Bestseller
            </span>
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
              Made to Order
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
      <Link
        href={`/product/${product.slug}`}
        className="flex flex-col flex-1 p-4"
      >
        {/* Region tag */}
        <p className="text-[0.65rem] text-brand-gray font-body tracking-widest uppercase mb-1">
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
                className="w-3.5 h-3.5 rounded-full border border-brand-gray-light ring-offset-1 hover:ring-2 hover:ring-brand-pink transition-all duration-150 cursor-pointer"
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

        {/* Price row */}
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

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function BestSellers() {
  const bestsellers = getBestsellers();
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Scroll-triggered entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Update scroll arrow visibility
  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 300 : -300, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="section-pad"
      style={{ background: "var(--bg-surface)" }}
      aria-labelledby="bestsellers-heading"
    >
      <div className="container-site">

        {/* ── Section Header ── */}
        <div
          className={`
            flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10
            transition-all duration-700
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          <div>
            <p className="section-label mb-3">Customer Favourites</p>
            <h2 id="bestsellers-heading" className="section-heading">
              Our{" "}
              <span className="text-gradient-pink italic">Bestsellers</span>
            </h2>
          </div>

          {/* Desktop scroll controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className="
                w-10 h-10 rounded-full border border-brand-blue-dark
                flex items-center justify-center
                text-brand-charcoal-soft
                hover:border-brand-pink hover:text-brand-pink
                disabled:opacity-30 disabled:cursor-not-allowed
                transition-all duration-200
              "
            >
              <ArrowLeft />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className="
                w-10 h-10 rounded-full border border-brand-blue-dark
                flex items-center justify-center
                text-brand-charcoal-soft
                hover:border-brand-pink hover:text-brand-pink
                disabled:opacity-30 disabled:cursor-not-allowed
                transition-all duration-200
              "
            >
              <ArrowRight />
            </button>

            <Link
              href="/collections"
              className="btn btn-outline gap-2 py-2 px-5 text-sm ml-2 group"
            >
              View All
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                <ArrowRight />
              </span>
            </Link>
          </div>
        </div>

        {/* ── Scroll Row ── */}
        <div
          className={`
            transition-all duration-700
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
          style={{ transitionDelay: "200ms" }}
        >
          {/* Fade-out edge effect on right */}
          <div className="relative">
            <div
              ref={scrollRef}
              onScroll={updateScrollState}
              className="scroll-row gap-5 pb-4"
            >
              {bestsellers.map((product, i) => (
                <div
                  key={product.id}
                  className={`
                    transition-all duration-500
                    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                  `}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}

              {/* ── End card: See all CTA ── */}
              <div
                className="
                  shrink-0 rounded-card border-2 border-dashed border-brand-blue-dark
                  flex flex-col items-center justify-center gap-4 p-8
                  hover:border-brand-pink transition-colors duration-300
                "
                style={{ minWidth: "220px" }}
              >
                <div className="w-12 h-12 rounded-full bg-brand-blue flex items-center justify-center">
                  <ArrowRight />
                </div>
                <div className="text-center">
                  <p className="font-heading font-medium text-brand-charcoal text-lg mb-1">
                    See All
                  </p>
                  <p className="text-brand-gray font-body text-xs">
                    500+ sarees waiting
                  </p>
                </div>
                <Link
                  href="/collections"
                  className="btn btn-primary text-xs py-2 px-5"
                >
                  Browse All
                </Link>
              </div>
            </div>

            {/* Right edge fade */}
            <div
              className="absolute top-0 right-0 w-16 h-full pointer-events-none"
              style={{
                background: "linear-gradient(to left, var(--bg-surface), transparent)",
              }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* ── Trust strip ── */}
        <div
          className={`
            mt-12 grid grid-cols-2 md:grid-cols-4 gap-4
            transition-all duration-700
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
          style={{ transitionDelay: "400ms" }}
        >
          {[
            { icon: "🚚", title: "Free Shipping", sub: "On orders above ₹2,000" },
            { icon: "✂️", title: "Blouse Stitching", sub: "Expert tailoring on all sarees" },
            { icon: "↩️", title: "Easy Returns", sub: "7-day hassle-free returns" },
            { icon: "💬", title: "WhatsApp Support", sub: "Styling advice, anytime" },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 p-4 rounded-soft bg-brand-white shadow-card"
            >
              <span className="text-xl shrink-0">{item.icon}</span>
              <div>
                <p className="text-xs font-medium text-brand-charcoal font-body mb-0.5">
                  {item.title}
                </p>
                <p className="text-[0.65rem] text-brand-gray font-body leading-snug">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}