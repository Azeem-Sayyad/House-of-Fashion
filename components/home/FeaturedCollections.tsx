"use client";

// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Featured Collections
// components/home/FeaturedCollections.tsx
//
// Layout: Asymmetric magazine grid — one tall hero card left,
//         three stacked cards right. Breaks the boring 4-equal
//         grid that every other site uses.
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getFeaturedCollections } from "@/data/products";
import { Collection } from "@/lib/types";

// ─────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────

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
// COLLECTION CARD — HERO (large left card)
// ─────────────────────────────────────────────────────────────

function HeroCollectionCard({ collection }: { collection: Collection }) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group relative rounded-card overflow-hidden shadow-product h-full min-h-130 flex flex-col justify-end"
      aria-label={`Shop ${collection.name}`}
    >
      {/* ── Background Image ── */}
      <div className="absolute inset-0">
        <Image
          src={collection.coverImage}
          alt={collection.name}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradient overlay — bottom heavy */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(30,30,30,0.85) 0%, rgba(30,30,30,0.3) 50%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 p-8">
        {/* Occasion badge */}
        {collection.occasion && (
          <span className="badge badge-pink mb-4 inline-flex">
            {collection.occasion}
          </span>
        )}

        <h3
          className="font-heading font-medium text-white mb-2 leading-tight"
          style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
        >
          {collection.name}
        </h3>

        <p className="text-white/70 font-body text-sm mb-6 leading-relaxed max-w-xs">
          {collection.tagline}
        </p>

        {/* CTA */}
        <div className="flex items-center gap-2 text-white text-sm font-body font-medium group/btn">
          <span className="border-b border-white/40 group-hover/btn:border-white pb-0.5 transition-colors duration-200">
            Explore Collection
          </span>
          <span className="transition-transform duration-200 group-hover/btn:translate-x-1">
            <ArrowRight />
          </span>
        </div>
      </div>

      {/* ── Hover pink tint overlay ── */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
        style={{ background: "var(--color-pink)" }}
      />
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────
// COLLECTION CARD — SMALL (right column cards)
// ─────────────────────────────────────────────────────────────

function SmallCollectionCard({
  collection,
  index,
}: {
  collection: Collection;
  index: number;
}) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group relative rounded-card overflow-hidden shadow-product flex items-end"
      style={{ minHeight: "160px" }}
      aria-label={`Shop ${collection.name}`}
    >
      {/* ── Background Image ── */}
      <div className="absolute inset-0">
        <Image
          src={collection.coverImage}
          alt={collection.name}
          fill
          sizes="(max-width: 1024px) 100vw, 25vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(30,30,30,0.78) 0%, rgba(30,30,30,0.15) 60%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 p-5 w-full flex items-end justify-between">
        <div>
          <p className="text-white/60 font-body text-[0.65rem] uppercase tracking-widest mb-1">
            {collection.occasion ?? "All occasions"}
          </p>
          <h3 className="font-heading font-medium text-white text-xl leading-tight">
            {collection.name}
          </h3>
        </div>

        {/* Arrow circle */}
        <div
          className="
            w-9 h-9 rounded-full border border-white/30 flex items-center justify-center
            text-white shrink-0 ml-3
            group-hover:bg-brand-pink group-hover:border-brand-pink
            transition-all duration-300
          "
        >
          <ArrowRight />
        </div>
      </div>

      {/* ── Index watermark ── */}
      <div
        className="
          absolute top-4 right-4 font-heading text-white/10 font-medium
          select-none pointer-events-none
        "
        style={{ fontSize: "3.5rem", lineHeight: 1 }}
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function FeaturedCollections() {
  const featured = getFeaturedCollections().slice(0, 4);
  const [heroCollection, ...smallCollections] = featured;

  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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

  return (
    <section
      ref={sectionRef}
      className="section-pad bg-brand-blue"
      aria-labelledby="collections-heading"
    >
      <div className="container-site">

        {/* ── Section Header ── */}
        <div
          className={`
            flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12
            transition-all duration-700
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          <div>
            <p className="section-label mb-3">Curated For You</p>
            <h2 className="section-heading">
              Shop by{" "}
              <span className="text-gradient-pink italic">Collection</span>
            </h2>
          </div>

          <Link
            href="/collections"
            className="
              btn btn-outline group gap-2 py-2.5 px-6 text-sm shrink-0
              self-start sm:self-auto
            "
          >
            View All Collections
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              <ArrowRight />
            </span>
          </Link>
        </div>

        {/* ── Asymmetric Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* ── Left: Hero card — tall ── */}
          <div
            className={`
              transition-all duration-700
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
            `}
            style={{ transitionDelay: "100ms" }}
          >
            {heroCollection && (
              <HeroCollectionCard collection={heroCollection} />
            )}
          </div>

          {/* ── Right: 3 stacked small cards ── */}
          <div className="flex flex-col gap-4">
            {smallCollections.slice(0, 3).map((collection, i) => (
              <div
                key={collection.id}
                className={`
                  flex-1 transition-all duration-700
                  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                `}
                style={{ transitionDelay: `${(i + 2) * 100}ms` }}
              >
                <SmallCollectionCard collection={collection} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom strip — mobile scroll hint ── */}
        <div
          className={`
            mt-10 flex items-center justify-center gap-3
            transition-all duration-700
            ${visible ? "opacity-100" : "opacity-0"}
          `}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="h-px flex-1 bg-brand-blue-dark max-w-20" />
          <span className="text-[0.7rem] text-brand-gray font-body tracking-[0.12em] uppercase">
            5 Collections Available
          </span>
          <div className="h-px flex-1 bg-brand-blue-dark max-w-20" />
        </div>

      </div>
    </section>
  );
}