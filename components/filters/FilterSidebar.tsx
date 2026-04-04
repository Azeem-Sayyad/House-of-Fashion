"use client";

// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Filter Sidebar + Drawer
// components/filters/FilterSidebar.tsx
//
// FilterSidebar: sticky desktop left panel
// FilterDrawer:  slide-up mobile drawer
// Both share the same FilterPanel internals
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import {
  fabricFilterOptions,
  occasionFilterOptions,
  weaveFilterOptions,
} from "@/data/products";
import { FilterState, FabricType, OccasionType, WeaveType } from "@/lib/types";

// ─────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M4 4L16 16M16 4L4 16" />
  </svg>
);

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M3 5l4 4 4-4" />
  </svg>
);

// ─────────────────────────────────────────────────────────────
// DEFAULT FILTER STATE
// ─────────────────────────────────────────────────────────────

export const defaultFilterState: FilterState = {
  fabric: [],
  weave: [],
  occasion: [],
  priceRange: [0, 200000],
  colour: [],
  region: [],
  isNew: false,
  isBestseller: false,
  isMadeToOrder: false,
};

// ─────────────────────────────────────────────────────────────
// FILTER GROUP — collapsible section
// ─────────────────────────────────────────────────────────────

function FilterGroup({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-brand-blue-dark pb-5 mb-5 last:border-0 last:mb-0 last:pb-0">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center justify-between w-full mb-4 group"
      >
        <span className="text-xs font-medium text-brand-charcoal font-body tracking-widest uppercase">
          {title}
        </span>
        <span
          className={`text-brand-gray transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <ChevronDown />
        </span>
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CHECKBOX OPTION
// ─────────────────────────────────────────────────────────────

function CheckboxOption({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count?: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 py-1.5 cursor-pointer group">
      <div className="flex items-center gap-2.5">
        {/* Custom checkbox */}
        <div
          onClick={onChange}
          className={`
            w-4 h-4 rounded shrink-0 border
            flex items-center justify-center
            transition-all duration-150
            ${checked
              ? "bg-brand-pink border-brand-pink"
              : "border-brand-gray-light group-hover:border-brand-pink"
            }
          `}
        >
          {checked && (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <path d="M2 5l2.5 2.5L8 3" />
            </svg>
          )}
        </div>
        <span
          className={`text-sm font-body transition-colors duration-150 ${
            checked ? "text-brand-charcoal font-medium" : "text-brand-gray group-hover:text-brand-charcoal"
          }`}
          onClick={onChange}
        >
          {label}
        </span>
      </div>
      {count !== undefined && (
        <span className="text-[0.65rem] text-brand-gray font-body shrink-0">
          {count}
        </span>
      )}
    </label>
  );
}

// ─────────────────────────────────────────────────────────────
// PRICE RANGE SLIDER
// ─────────────────────────────────────────────────────────────

function PriceRange({
  value,
  onChange,
}: {
  value: [number, number];
  onChange: (range: [number, number]) => void;
}) {
  const formatINR = (n: number) =>
    n >= 100000
      ? `₹${(n / 100000).toFixed(1)}L`
      : n >= 1000
      ? `₹${(n / 1000).toFixed(0)}K`
      : `₹${n}`;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-body text-brand-gray">{formatINR(value[0])}</span>
        <span className="text-xs font-body text-brand-gray">{formatINR(value[1])}</span>
      </div>
      <input
        type="range"
        min={0}
        max={200000}
        step={1000}
        value={value[1]}
        onChange={(e) => onChange([value[0], Number(e.target.value)])}
        className="w-full accent-brand-pink cursor-pointer"
        style={{ accentColor: "var(--color-pink)" }}
      />
      <div className="flex items-center justify-between mt-2">
        <span className="text-[0.65rem] text-brand-gray font-body">₹0</span>
        <span className="text-[0.65rem] text-brand-gray font-body">₹2L+</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TOGGLE PILL — for boolean filters (New, Bestseller etc.)
// ─────────────────────────────────────────────────────────────

function TogglePill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-1.5 rounded-pill text-xs font-body font-medium
        border transition-all duration-200
        ${
          active
            ? "bg-brand-pink border-brand-pink text-white shadow-pink-glow"
            : "border-brand-blue-dark text-brand-gray hover:border-brand-pink hover:text-brand-charcoal"
        }
      `}
    >
      {label}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// ACTIVE FILTER COUNT BADGE
// ─────────────────────────────────────────────────────────────

export function getActiveFilterCount(filters: FilterState): number {
  return (
    filters.fabric.length +
    filters.weave.length +
    filters.occasion.length +
    filters.colour.length +
    filters.region.length +
    (filters.isNew ? 1 : 0) +
    (filters.isBestseller ? 1 : 0) +
    (filters.isMadeToOrder ? 1 : 0) +
    (filters.priceRange[1] < 200000 ? 1 : 0)
  );
}

// ─────────────────────────────────────────────────────────────
// FILTER PANEL — shared inner content
// ─────────────────────────────────────────────────────────────

function FilterPanel({
  filters,
  onChange,
  onReset,
}: {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
}) {
  const toggle = <T extends string>(arr: T[], val: T): T[] =>
    arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];

  const activeCount = getActiveFilterCount(filters);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-brand-charcoal font-body">
            Filters
          </span>
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-brand-pink text-white text-[0.6rem] font-medium flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="text-xs font-body text-brand-pink hover:underline underline-offset-2"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Quick toggles */}
      <FilterGroup title="Quick Filters" defaultOpen>
        <div className="flex flex-wrap gap-2">
          <TogglePill
            label="New Arrivals"
            active={filters.isNew}
            onClick={() => onChange({ ...filters, isNew: !filters.isNew })}
          />
          <TogglePill
            label="Bestsellers"
            active={filters.isBestseller}
            onClick={() => onChange({ ...filters, isBestseller: !filters.isBestseller })}
          />
          <TogglePill
            label="Made to Order"
            active={filters.isMadeToOrder}
            onClick={() => onChange({ ...filters, isMadeToOrder: !filters.isMadeToOrder })}
          />
        </div>
      </FilterGroup>

      {/* Price range */}
      <FilterGroup title="Price Range" defaultOpen>
        <PriceRange
          value={filters.priceRange}
          onChange={(range) => onChange({ ...filters, priceRange: range })}
        />
      </FilterGroup>

      {/* Occasion */}
      <FilterGroup title="Occasion" defaultOpen>
        <div className="space-y-0.5">
          {occasionFilterOptions.map((opt) => (
            <CheckboxOption
              key={opt.value}
              label={opt.label}
              count={opt.count}
              checked={filters.occasion.includes(opt.value as OccasionType)}
              onChange={() =>
                onChange({
                  ...filters,
                  occasion: toggle(filters.occasion, opt.value as OccasionType),
                })
              }
            />
          ))}
        </div>
      </FilterGroup>

      {/* Fabric */}
      <FilterGroup title="Fabric" defaultOpen>
        <div className="space-y-0.5">
          {fabricFilterOptions.map((opt) => (
            <CheckboxOption
              key={opt.value}
              label={opt.label}
              count={opt.count}
              checked={filters.fabric.includes(opt.value as FabricType)}
              onChange={() =>
                onChange({
                  ...filters,
                  fabric: toggle(filters.fabric, opt.value as FabricType),
                })
              }
            />
          ))}
        </div>
      </FilterGroup>

      {/* Weave */}
      <FilterGroup title="Weave / Craft" defaultOpen={false}>
        <div className="space-y-0.5">
          {weaveFilterOptions.map((opt) => (
            <CheckboxOption
              key={opt.value}
              label={opt.label}
              count={opt.count}
              checked={filters.weave.includes(opt.value as WeaveType)}
              onChange={() =>
                onChange({
                  ...filters,
                  weave: toggle(filters.weave, opt.value as WeaveType),
                })
              }
            />
          ))}
        </div>
      </FilterGroup>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FILTER SIDEBAR — desktop sticky panel
// ─────────────────────────────────────────────────────────────

export function FilterSidebar({
  filters,
  onChange,
  onReset,
}: {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
}) {
  return (
    <aside
      className="hidden lg:block w-64 shrink-0 sticky top-28 self-start"
      aria-label="Product filters"
    >
      <div className="bg-brand-white rounded-card shadow-card p-6">
        <FilterPanel filters={filters} onChange={onChange} onReset={onReset} />
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────
// FILTER DRAWER — mobile slide-up panel
// ─────────────────────────────────────────────────────────────

export function FilterDrawer({
  open,
  onClose,
  filters,
  onChange,
  onReset,
}: {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-overlay"
          style={{ background: "rgba(30, 30, 30, 0.45)" }}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer panel */}
      <div
        className={`
          fixed bottom-0 left-0 right-0 z-modal
          bg-brand-white rounded-t-3xl
          max-h-[85vh] overflow-y-auto
          transition-transform duration-350 ease-smooth
          lg:hidden
          ${open ? "translate-y-0" : "translate-y-full"}
        `}
        aria-label="Product filters"
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-brand-gray-light" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-blue-dark">
          <span className="font-heading font-medium text-brand-charcoal text-xl">
            Filter Sarees
          </span>
          <button
            onClick={onClose}
            aria-label="Close filters"
            className="btn-ghost p-1 text-brand-gray"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Panel content */}
        <div className="px-6 py-6">
          <FilterPanel filters={filters} onChange={onChange} onReset={onReset} />
        </div>

        {/* Apply CTA */}
        <div className="sticky bottom-0 px-6 py-4 bg-brand-white border-t border-brand-blue-dark">
          <button
            onClick={onClose}
            className="btn btn-primary w-full py-3.5 text-sm"
          >
            Show Results
          </button>
        </div>
      </div>
    </>
  );
}