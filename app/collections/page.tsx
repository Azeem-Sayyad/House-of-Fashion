"use client";

// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — All Collections / Catalogue
// app/collections/page.tsx
//
// Full product catalogue with filtering, sorting, result count.
// Filters live in sidebar (desktop) and drawer (mobile).
// ─────────────────────────────────────────────────────────────

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { collections } from "@/data/products";
import { Product, SortOption, FilterState } from "@/lib/types";
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

const GridIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <rect x="3" y="3" width="6" height="6" rx="1" />
    <rect x="11" y="3" width="6" height="6" rx="1" />
    <rect x="3" y="11" width="6" height="6" rx="1" />
    <rect x="11" y="11" width="6" height="6" rx="1" />
  </svg>
);

const ListIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <rect x="3" y="3" width="6" height="6" rx="1" />
    <path d="M12 5h5M12 10h5M12 15h5" />
    <rect x="3" y="11" width="6" height="6" rx="1" />
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
// APPLY FILTERS — pure function, no side effects
// ─────────────────────────────────────────────────────────────

function applyFilters(
  products: Product[],
  filters: FilterState,
  sort: SortOption,
): Product[] {
  let result = [...products];

  if (filters.fabric.length)
    result = result.filter((p) => filters.fabric.includes(p.fabric));

  if (filters.weave.length)
    result = result.filter((p) => filters.weave.includes(p.weave));

  if (filters.occasion.length)
    result = result.filter((p) =>
      p.occasion.some((o) => filters.occasion.includes(o)),
    );

  result = result.filter(
    (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1],
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
}

// ─────────────────────────────────────────────────────────────
// EMPTY STATE
// ─────────────────────────────────────────────────────────────

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
        style={{ background: "var(--color-pink-light)" }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          stroke="var(--color-pink-dark)"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <circle cx="14" cy="14" r="11" />
          <path d="M10 14h8M14 10v8" />
        </svg>
      </div>
      <h3 className="font-heading font-medium text-brand-charcoal text-2xl mb-2">
        No sarees found
      </h3>
      <p className="text-brand-gray font-body text-sm mb-6 max-w-xs">
        Try adjusting or clearing your filters — we have 500+ sarees waiting.
      </p>
      <button onClick={onReset} className="btn btn-primary text-sm px-6 py-2.5">
        Clear Filters
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// COLLECTION QUICK FILTER PILLS — top of page
// ─────────────────────────────────────────────────────────────

function CollectionPills({
  activeSlug,
  onSelect,
}: {
  activeSlug: string | null;
  onSelect: (slug: string | null) => void;
}) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
      <button
        onClick={() => onSelect(null)}
        className={`
          px-4 py-2 rounded-pill text-xs font-body font-medium shrink-0
          border transition-all duration-200
          ${
            !activeSlug
              ? "bg-brand-charcoal text-white border-brand-charcoal"
              : "border-brand-blue-dark text-brand-gray hover:border-brand-charcoal hover:text-brand-charcoal"
          }
        `}
      >
        All Sarees
      </button>
      {collections.map((col) => (
        <button
          key={col.slug}
          onClick={() => onSelect(col.slug)}
          className={`
            px-4 py-2 rounded-pill text-xs font-body font-medium shrink-0
            border transition-all duration-200
            ${
              activeSlug === col.slug
                ? "bg-brand-pink text-white border-brand-pink"
                : "border-brand-blue-dark text-brand-gray hover:border-brand-pink hover:text-brand-charcoal"
            }
          `}
        >
          {col.name}
        </button>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────

export default function CollectionsPage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilterState);
  const [sort, setSort] = useState<SortOption>("newest");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [gridCols, setGridCols] = useState<2 | 3>(3);
  const [activeCollectionSlug, setActiveCollectionSlug] = useState<
    string | null
  >(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const activeFilterCount = getActiveFilterCount(filters);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((res) => {
        console.log("API response:", res);
        setAllProducts(res.data);
        setLoading(false);
      });
  }, []);

  // Base product pool — filtered by collection pill first
  const baseProducts = useMemo(() => {
    if (!activeCollectionSlug) return allProducts;
    const col = collections.find((c) => c.slug === activeCollectionSlug);
    if (!col) return allProducts;
    return allProducts.filter((p) => col.productIds.includes(p.id));
  }, [activeCollectionSlug]);

  // Then apply full filter + sort
  const filtered = useMemo(
    () => applyFilters(baseProducts, filters, sort),
    [baseProducts, filters, sort],
  );

  const handleReset = () => {
    setFilters(defaultFilterState);
    setActiveCollectionSlug(null);
  };

  return (
    <div className="bg-brand-blue min-h-screen">
      <div className="container-site py-10 lg:py-14">
        {/* ── Page Header ── */}
        <div className="mb-8">
          <p className="section-label mb-2">Browse Our Range</p>
          <h1
            className="font-heading font-medium text-brand-charcoal mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            All <span className="text-gradient-pink italic">Sarees</span>
          </h1>
          <p className="text-brand-gray font-body text-sm max-w-xl">
            Handwoven, handpicked — every saree in our boutique is sourced
            directly from master weavers across India.
          </p>
        </div>

        {/* ── Collection Pills ── */}
        <div className="mb-6">
          <CollectionPills
            activeSlug={activeCollectionSlug}
            onSelect={setActiveCollectionSlug}
          />
        </div>

        {/* ── Toolbar ── */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-6 border-b border-brand-blue-dark">
          {/* Left: filter toggle (mobile) + result count */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDrawerOpen(true)}
              className="
                lg:hidden flex items-center gap-2
                btn btn-outline py-2 px-4 text-xs
              "
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
              sarees
            </p>
          </div>

          {/* Right: sort + grid toggle */}
          <div className="flex items-center gap-3">
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

            {/* Grid density toggle */}
            <div className="hidden sm:flex items-center gap-1 border border-brand-blue-dark rounded-soft p-1">
              <button
                onClick={() => setGridCols(3)}
                aria-label="3 column grid"
                className={`p-1.5 rounded transition-all duration-150 ${
                  gridCols === 3
                    ? "bg-brand-pink text-white"
                    : "text-brand-gray hover:text-brand-charcoal"
                }`}
              >
                <GridIcon />
              </button>
              <button
                onClick={() => setGridCols(2)}
                aria-label="2 column grid"
                className={`p-1.5 rounded transition-all duration-150 ${
                  gridCols === 2
                    ? "bg-brand-pink text-white"
                    : "text-brand-gray hover:text-brand-charcoal"
                }`}
              >
                <ListIcon />
              </button>
            </div>
          </div>
        </div>

        {/* ── Main Layout: sidebar + grid ── */}
        <div className="flex gap-8 items-start">
          {/* Desktop sidebar */}
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={handleReset}
          />

          {/* Product grid */}
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <div className="w-8 h-8 rounded-full border-2 border-brand-pink border-t-transparent animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState onReset={handleReset} />
          ) : (
            <div className={`grid gap-5 ...`}>
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
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
