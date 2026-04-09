"use client";

// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Individual Collection Page
// app/collections/[slug]/page.tsx
//
// Shows all products in a specific collection.
// Has a hero banner, collection description, filtered grid.
// ─────────────────────────────────────────────────────────────

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { collections } from "@/data/products";
import { Collection, FilterState, Product, SortOption } from "@/lib/types";
import ProductCard from "@/components/product/ProductCard";
import {
  FilterSidebar,
  FilterDrawer,
  defaultFilterState,
  getActiveFilterCount,
} from "@/components/filters/FilterSidebar";

// ─────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────

const FilterIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
  >
    <path d="M3 5h14M6 10h8M9 15h2" />
  </svg>
);

const ArrowRight = () => (
  <svg
    width="14"
    height="14"
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
// SORT OPTIONS
// ─────────────────────────────────────────────────────────────

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "bestselling", label: "Bestselling" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

// ─────────────────────────────────────────────────────────────
// COLLECTION HERO BANNER
// ─────────────────────────────────────────────────────────────

function CollectionHero({
  name,
  tagline,
  description,
  coverImage,
  occasion,
  productCount,
}: {
  name: string;
  tagline: string;
  description: string;
  coverImage: string;
  occasion?: string;
  productCount: number;
}) {
  return (
    <div
      className="relative rounded-card overflow-hidden mb-12"
      style={{ minHeight: "320px" }}
    >
      {/* Background image */}
      <Image
        src={coverImage}
        alt={name}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(18,12,8,0.85) 0%, rgba(18,12,8,0.4) 60%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col justify-end h-full p-8 lg:p-12"
        style={{ minHeight: "320px" }}
      >
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-2 text-[0.7rem] font-body text-white/50">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/collections"
                className="hover:text-white transition-colors"
              >
                Collections
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-white/80">{name}</li>
          </ol>
        </nav>

        {/* Occasion badge */}
        {occasion && (
          <span className="badge badge-pink mb-3 self-start">{occasion}</span>
        )}

        {/* Name */}
        <h1
          className="font-heading font-medium text-white leading-tight mb-2"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          {name}
        </h1>

        {/* Tagline */}
        <p className="font-body text-white/70 text-sm mb-4 max-w-md">
          {tagline}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-xs font-body text-white/50">
            {productCount} sarees
          </span>
          <div className="w-px h-4 bg-white/20" />
          <span className="text-xs font-body text-white/50">
            Free shipping above ₹2,000
          </span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// OTHER COLLECTIONS STRIP
// ─────────────────────────────────────────────────────────────

function OtherCollections({ currentSlug }: { currentSlug: string }) {
  const others = collections.filter((c) => c.slug !== currentSlug).slice(0, 4);

  return (
    <div className="mt-20 pt-16 border-t border-brand-blue-dark">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="section-label mb-2">Explore More</p>
          <h2
            className="font-heading font-medium text-brand-charcoal"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
          >
            Other <span className="text-gradient-pink italic">Collections</span>
          </h2>
        </div>
        <Link
          href="/collections"
          className="text-xs font-body font-medium text-brand-pink hover:underline underline-offset-2 hidden sm:block"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {others.map((col) => (
          <Link
            key={col.slug}
            href={`/collections/${col.slug}`}
            className="group relative rounded-card overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-350"
            style={{ minHeight: "160px" }}
          >
            <Image
              src={col.coverImage}
              alt={col.name}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(30,30,30,0.75) 0%, transparent 60%)",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
              <h3 className="font-heading font-medium text-white text-base leading-snug">
                {col.name}
              </h3>
              <div className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-brand-pink group-hover:border-brand-pink transition-all duration-300 shrink-0 ml-2">
                <ArrowRight />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE PARAMS TYPE
// ─────────────────────────────────────────────────────────────

export default function CollectionPage({
  params,
}: {
  params: { slug: string };
}) {
  const [collection, setCollection] = useState<Collection | null>(null);
  const [collectionProducts, setCollectionProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterState>(defaultFilterState);
  const [sort, setSort] = useState<SortOption>("newest");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const activeFilterCount = getActiveFilterCount(filters);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((res) => {
        const all: Product[] = res.data;
        const col = collections.find((c) => c.slug === params.slug);
        if (!col) return;
        setCollection(col as Collection);
        setCollectionProducts(all.filter((p) => col.productIds.includes(p.id)));
        setLoading(false);
      });
  }, [params.slug]);

  // Apply filters to this collection's products
  const filtered = useMemo(() => {
    let result = [...collectionProducts];

    if (filters.fabric.length)
      result = result.filter((p) => filters.fabric.includes(p.fabric));
    if (filters.weave.length)
      result = result.filter((p) => filters.weave.includes(p.weave));
    if (filters.occasion.length)
      result = result.filter((p) =>
        p.occasion.some((o) => filters.occasion.includes(o)),
      );
    result = result.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1],
    );
    if (filters.isNew) result = result.filter((p) => p.isNew);
    if (filters.isBestseller) result = result.filter((p) => p.isBestseller);
    if (filters.isMadeToOrder) result = result.filter((p) => p.isMadeToOrder);

    switch (sort) {
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "bestselling":
        result.sort(
          (a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0),
        );
        break;
    }

    return result;
  }, [collectionProducts, filters, sort]);

  const handleReset = () => setFilters(defaultFilterState);

  if (loading) {
    return (
      <div className="bg-brand-blue min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-brand-pink border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="bg-brand-blue min-h-screen flex items-center justify-center text-center">
        <div>
          <h2 className="font-heading font-medium text-brand-charcoal text-2xl mb-3">
            Collection not found
          </h2>
          <Link
            href="/collections"
            className="btn btn-primary text-sm px-6 py-3"
          >
            Browse All Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-blue min-h-screen">
      <div className="container-site py-10 lg:py-14">
        {/* ── Collection Hero ── */}
        <CollectionHero
          name={collection.name}
          tagline={collection.tagline}
          description={collection.description}
          coverImage={collection.coverImage}
          occasion={collection.occasion}
          productCount={collectionProducts.length}
        />

        {/* ── Toolbar ── */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-5 border-b border-brand-blue-dark">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden flex items-center gap-2 btn btn-outline py-2 px-4 text-xs"
            >
              <FilterIcon />
              Filters
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-brand-pink text-white text-[0.6rem] flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <p className="text-sm font-body text-brand-gray">
              <span className="font-medium text-brand-charcoal">
                {filtered.length}
              </span>{" "}
              of {collectionProducts.length} sarees
            </p>
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="
              text-xs font-body text-brand-charcoal
              bg-brand-white border border-brand-blue-dark rounded-soft
              px-3 py-2 cursor-pointer
              focus:border-brand-pink focus:outline-none
            "
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* ── Layout: sidebar + grid ── */}
        <div className="flex gap-8 items-start">
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={handleReset}
          />

          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="font-heading font-medium text-brand-charcoal text-2xl mb-2">
                  No sarees match
                </p>
                <p className="text-brand-gray font-body text-sm mb-6">
                  Try clearing some filters.
                </p>
                <button
                  onClick={handleReset}
                  className="btn btn-primary text-sm px-6 py-2.5"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Other collections ── */}
        <OtherCollections currentSlug={params.slug} />
      </div>

      {/* Mobile filter drawer */}
      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onChange={setFilters}
        onReset={handleReset}
      />
    </div>
  );
}
