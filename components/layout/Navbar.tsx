"use client";

// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Navbar
// components/layout/Navbar.tsx
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/data/products";
import { NavLink } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

// ─────────────────────────────────────────────────────────────
// ICONS — inline SVG to avoid icon library dependency
// ─────────────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
  >
    <circle cx="8.5" cy="8.5" r="5.5" />
    <path d="M15 15L18 18" />
  </svg>
);

const HeartIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 17s-7-4.35-7-9a4 4 0 0 1 7-2.67A4 4 0 0 1 17 8c0 4.65-7 9-7 9z" />
  </svg>
);

const BagIcon = () => (
  <svg
    width="20"
    height="20"
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

const MenuIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
  >
    <path d="M3 6h16M3 11h16M3 16h16" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
  >
    <path d="M4 4L18 18M18 4L4 18" />
  </svg>
);

const ChevronDown = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
  >
    <path d="M3 5l4 4 4-4" />
  </svg>
);

// ─────────────────────────────────────────────────────────────
// DESKTOP DROPDOWN — appears on hover for nav items with children
// ─────────────────────────────────────────────────────────────

function NavDropdown({ items }: { items: NavLink[] }) {
  return (
    <div
      className="
        absolute top-full left-1/2 -translate-x-1/2 pt-3
        opacity-0 invisible group-hover:opacity-100 group-hover:visible
        transition-all duration-250 z-dropdown
      "
    >
      <div
        className="
          bg-brand-white rounded-card shadow-card-hover
          border border-brand-blue-dark
          py-2 min-w-50 overflow-hidden
        "
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="
              flex items-center gap-2 px-5 py-3
              text-sm text-brand-charcoal-soft
              hover:text-brand-pink hover:bg-brand-blue-light
              transition-all duration-200 font-body
            "
          >
            {item.label}
            {item.badge && (
              <span className="badge badge-pink text-[0.6rem] py-0.5 px-2">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MOBILE MENU — full-screen slide-in panel
// ─────────────────────────────────────────────────────────────

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* ── Backdrop ── */}
      {open && (
        <div
          className="overlay lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* ── Slide-in Panel ── */}
      <div
        className={`
          fixed inset-y-0 left-0 z-modal w-[85vw] max-w-sm
          bg-brand-white flex flex-col
          transition-transform duration-350 ease-smooth
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:hidden
        `}
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-blue-dark">
          <Link href="/" onClick={onClose}>
            <Image
              src="/logo.png"
              alt="House of Fashion Boutique"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
            />
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="btn-ghost p-2"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {navLinks.map((link) => (
            <div key={link.href}>
              {link.children ? (
                <>
                  <button
                    onClick={() =>
                      setExpandedItem(
                        expandedItem === link.label ? null : link.label,
                      )
                    }
                    className="
                      w-full flex items-center justify-between
                      px-4 py-3.5 rounded-soft
                      text-brand-charcoal font-medium font-body text-sm
                      hover:bg-brand-blue-light hover:text-brand-pink
                      transition-all duration-200
                    "
                  >
                    <span>{link.label}</span>
                    <span
                      className={`transition-transform duration-200 ${
                        expandedItem === link.label ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown />
                    </span>
                  </button>

                  {/* Nested children */}
                  {expandedItem === link.label && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-brand-pink-light pl-4">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className="
                            flex items-center gap-2 px-3 py-2.5
                            text-sm text-brand-charcoal-soft
                            hover:text-brand-pink
                            transition-colors duration-200
                          "
                        >
                          {child.label}
                          {child.badge && (
                            <span className="badge badge-pink text-[0.6rem] py-0.5 px-2">
                              {child.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="
                    flex items-center gap-2 px-4 py-3.5 rounded-soft
                    text-brand-charcoal font-medium font-body text-sm
                    hover:bg-brand-blue-light hover:text-brand-pink
                    transition-all duration-200
                  "
                >
                  {link.label}
                  {link.badge && (
                    <span className="badge badge-pink text-[0.6rem] py-0.5 px-2">
                      {link.badge}
                    </span>
                  )}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div className="px-6 py-6 border-t border-brand-blue-dark space-y-3">
          <Link
            href="/customise"
            onClick={onClose}
            className="btn btn-primary w-full justify-center"
          >
            Request Customisation
          </Link>
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="btn btn-outline w-full justify-center"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.139.566 4.148 1.55 5.888L0 24l6.304-1.524A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.034-1.388l-.36-.214-3.742.904.944-3.641-.235-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// SEARCH BAR — expandable inline search
// ─────────────────────────────────────────────────────────────

function SearchBar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div className="absolute inset-0 bg-brand-white z-raised flex items-center px-6 gap-4">
      <SearchIcon />
      <input
        ref={inputRef}
        type="search"
        placeholder="Search sarees, fabrics, occasions..."
        className="
          flex-1 bg-transparent font-body text-brand-charcoal
          text-sm placeholder:text-brand-gray
          focus:outline-none
        "
        onKeyDown={(e) => e.key === "Escape" && onClose()}
      />
      <button
        onClick={onClose}
        aria-label="Close search"
        className="text-brand-gray hover:text-brand-charcoal transition-colors"
      >
        <CloseIcon />
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN NAVBAR COMPONENT
// ─────────────────────────────────────────────────────────────

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { itemCount, openDrawer } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        navbar transition-shadow duration-250
        ${scrolled ? "shadow-navbar" : "shadow-none"}
      `}
    >
      <div className="container-site relative">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* ── Mobile: Hamburger ── */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            className="btn-ghost p-2 lg:hidden"
          >
            <MenuIcon />
          </button>

          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center shrink-0 mx-auto lg:mx-0"
            aria-label="House of Fashion Boutique — Home"
          >
            <Image
              src="/logo.jpeg"
              alt="House of Fashion Boutique"
              width={140}
              height={48}
              priority
              className="h-10 lg:h-12 w-auto object-contain"
            />
          </Link>

          {/* ── Desktop Navigation ── */}
          <nav className="hidden lg:flex items-center gap-1 mx-8 flex-1 justify-center">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className="
                    flex items-center gap-1 px-4 py-2 rounded-soft
                    text-sm font-medium font-body
                    text-brand-charcoal-soft
                    hover:text-brand-pink
                    transition-colors duration-200
                  "
                >
                  {link.label}
                  {link.badge && (
                    <span className="badge badge-pink text-[0.6rem] py-0.5 px-2 ml-1">
                      {link.badge}
                    </span>
                  )}
                  {link.children && (
                    <span className="opacity-50 group-hover:opacity-100 transition-opacity">
                      <ChevronDown />
                    </span>
                  )}
                </Link>

                {/* Dropdown */}
                {link.children && <NavDropdown items={link.children} />}
              </div>
            ))}
          </nav>

          {/* ── Right Icons ── */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="btn-ghost p-2 text-brand-charcoal-soft hover:text-brand-pink"
            >
              <SearchIcon />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              aria-label={`Wishlist${wishlistCount > 0 ? ` (${wishlistCount} items)` : ""}`}
              className="btn-ghost p-2 relative text-brand-charcoal-soft hover:text-brand-pink hidden sm:flex"
            >
              <HeartIcon />
              {wishlistCount > 0 && (
                <span
                  className="
                  absolute -top-0.5 -right-0.5
                  w-4 h-4 rounded-full bg-brand-pink
                  text-white text-[0.6rem] font-medium
                  flex items-center justify-center
                "
                >
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={openDrawer}
              aria-label={`Cart${itemCount > 0 ? ` (${itemCount} items)` : ""}`}
              className="btn-ghost p-2 relative text-brand-charcoal-soft hover:text-brand-pink"
            >
              <BagIcon />
              {itemCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-brand-pink text-white text-[0.6rem] font-medium flex items-center justify-center"
                >
                  {itemCount}
                </span>
              )}
            </button>

            {/* Desktop CTA */}
            <Link
              href="/customise"
              className="btn btn-primary hidden lg:inline-flex ml-2 py-2 px-5 text-xs"
            >
              Customise
            </Link>
          </div>
        </div>

        {/* ── Expandable Search Bar ── */}
        <SearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />
      </div>

      {/* ── Mobile Menu ── */}
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
