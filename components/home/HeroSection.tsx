"use client";

// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Hero Section
// components/home/HeroSection.tsx
//
// Layout: Editorial split — typography left, image right
// Vibe: Luxury Indian fashion editorial — Vogue India meets
//        modern boutique. Staggered entrance, floating accents,
//        layered depth. Unforgettable in 3 seconds.
// ─────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// ─────────────────────────────────────────────────────────────
// ROTATING HEADLINES — cycles through on interval
// ─────────────────────────────────────────────────────────────

const headlines = [
  { line1: "Where Every", line2: "Thread Tells", line3: "a Story" },
  { line1: "Handwoven", line2: "With Soul,", line3: "Worn With Grace" },
  { line1: "Crafted by", line2: "Master", line3: "Weavers" },
];

// ─────────────────────────────────────────────────────────────
// HERO STATS — social proof baked into the hero
// ─────────────────────────────────────────────────────────────

const stats = [
  { value: "500+", label: "Sarees" },
  { value: "12+", label: "Weave Traditions" },
  { value: "1000+", label: "Happy Brides" },
];

// ─────────────────────────────────────────────────────────────
// ARROW ICON
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

const ArrowDown = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 4v12M4 10l6 6 6-6" />
  </svg>
);

// ─────────────────────────────────────────────────────────────
// MAIN HERO COMPONENT
// ─────────────────────────────────────────────────────────────

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Trigger entrance animations after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Rotate headlines every 4s with a fade transition
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setHeadlineIndex((prev) => (prev + 1) % headlines.length);
        setIsTransitioning(false);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const headline = headlines[headlineIndex];

  return (
    <section
      className="hero-section relative overflow-hidden"
      aria-label="Welcome to House of Fashion Boutique"
    >
      {/* ── Background gradient mesh ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Base gradient */}
        <div className="absolute inset-0 bg-hero-gradient" />

        {/* Soft pink orb — top right */}
        <div
          className="absolute -top-32 -right-32 w-150 h-150 rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, var(--color-pink-light) 0%, transparent 70%)",
          }}
        />

        {/* Blue orb — bottom left */}
        <div
          className="absolute -bottom-24 -left-24 w-125 h-125 rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, var(--color-blue-dark) 0%, transparent 70%)",
          }}
        />

        {/* Subtle grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
          }}
        />
      </div>

      {/* ── Decorative diagonal line ── */}
      <div
        className="absolute top-0 right-[42%] w-px h-full opacity-10 hidden lg:block pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--color-pink), transparent)",
        }}
        aria-hidden="true"
      />

      {/* ── Main Content Grid ── */}
      <div className="container-site relative z-10 w-full">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-0 min-h-[90vh] items-center">

          {/* ──────────────────────────────────────────
              LEFT COLUMN — Typography & CTAs
          ────────────────────────────────────────── */}
          <div className="py-20 lg:py-32 pr-0 lg:pr-16 flex flex-col justify-center">

            {/* ── Eyebrow label ── */}
            <div
              className={`
                flex items-center gap-3 mb-8
                transition-all duration-700
                ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
              `}
              style={{ transitionDelay: "100ms" }}
            >
              <div className="w-8 h-px bg-brand-pink" />
              <span className="section-label">
                Handcrafted Indian Sarees
              </span>
            </div>

            {/* ── Main Headline ── */}
            <div
              className={`
                mb-6
                transition-all duration-700
                ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
              style={{ transitionDelay: "200ms" }}
            >
              <h1
                className={`
                  font-heading font-medium text-brand-charcoal leading-[1.05]
                  transition-opacity duration-400
                  ${isTransitioning ? "opacity-0" : "opacity-100"}
                `}
                style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
              >
                {headline.line1}
                <br />
                <span className="text-gradient-pink italic">
                  {headline.line2}
                </span>
                <br />
                {headline.line3}
              </h1>
            </div>

            {/* ── Script accent ── */}
            <div
              className={`
                mb-8
                transition-all duration-700
                ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
              `}
              style={{ transitionDelay: "350ms" }}
            >
              <span
                className="text-script text-brand-pink"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                — with love from House of Fashion
              </span>
            </div>

            {/* ── Description ── */}
            <p
              className={`
                text-brand-gray font-body leading-relaxed mb-10 max-w-md
                transition-all duration-700
                ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
              `}
              style={{
                transitionDelay: "450ms",
                fontSize: "clamp(0.9375rem, 1.5vw, 1.0625rem)",
              }}
            >
              Banarasi, Kanjeevaram, Paithani, Chanderi — each piece
              handpicked from master weavers across India. For the bride,
              the celebration, and the everyday woman who refuses to
              compromise on elegance.
            </p>

            {/* ── CTAs ── */}
            <div
              className={`
                flex flex-wrap items-center gap-4 mb-14
                transition-all duration-700
                ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
              `}
              style={{ transitionDelay: "550ms" }}
            >
              <Link
                href="/collections"
                className="btn btn-primary group gap-2.5 px-7 py-3.5 text-sm"
              >
                Explore Collections
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  <ArrowRight />
                </span>
              </Link>
              <Link
                href="/bridal"
                className="btn btn-outline group gap-2.5 px-7 py-3.5 text-sm"
              >
                Bridal Edit
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  <ArrowRight />
                </span>
              </Link>
            </div>

            {/* ── Stats row ── */}
            <div
              className={`
                flex items-center gap-8
                transition-all duration-700
                ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
              `}
              style={{ transitionDelay: "650ms" }}
            >
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-8">
                  <div>
                    <div
                      className="font-heading font-medium text-brand-charcoal leading-none mb-0.5"
                      style={{ fontSize: "clamp(1.25rem, 2vw, 1.625rem)" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[0.7rem] text-brand-gray font-body tracking-wide uppercase">
                      {stat.label}
                    </div>
                  </div>
                  {/* Divider between stats */}
                  {i < stats.length - 1 && (
                    <div className="w-px h-8 bg-brand-gray-light" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ──────────────────────────────────────────
              RIGHT COLUMN — Hero Image
          ────────────────────────────────────────── */}
          <div
            className={`
              relative hidden lg:flex items-center justify-center
              h-full min-h-[90vh] py-12
              transition-all duration-1000
              ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}
            `}
            style={{ transitionDelay: "200ms" }}
          >
            {/* ── Floating decorative card — top left ── */}
            <div
              className={`
                absolute top-20 -left-6 z-20
                bg-brand-white rounded-card shadow-card
                px-4 py-3 flex items-center gap-3
                transition-all duration-1000
                ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
              style={{
                transitionDelay: "800ms",
                animation: mounted ? "float 4s ease-in-out infinite" : "none",
                animationDelay: "1s",
              }}
            >
              <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1l1.8 3.6L14 5.5l-3 2.9.7 4.1L8 10.4 4.3 12.5l.7-4.1-3-2.9 4.2-.9L8 1z" fill="var(--color-pink)" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-medium text-brand-charcoal font-body leading-none mb-0.5">
                  New Arrival
                </div>
                <div className="text-[0.65rem] text-brand-gray font-body">
                  Crimson Banarasi Silk
                </div>
              </div>
            </div>

            {/* ── Main image frame ── */}
            <div className="relative w-full max-w-130 mx-auto">

              {/* Offset decorative border */}
              <div
                className="absolute inset-0 rounded-card border-2 border-brand-pink-light translate-x-4 translate-y-4"
                aria-hidden="true"
              />

              {/* Image container */}
              <div className="relative rounded-card overflow-hidden shadow-product-hover aspect-3/4 bg-brand-blue-light">
                <Image
                  src="/images/hero-saree.jpg"
                  alt="Handwoven Indian saree — House of Fashion Boutique"
                  fill
                  priority
                  sizes="(max-width: 1024px) 0px, 520px"
                  className="object-cover object-top"
                />

                {/* Subtle gradient overlay at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(30,30,30,0.4) 0%, transparent 100%)",
                  }}
                />

                {/* ── Price tag overlay ── */}
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <p className="text-white/70 text-xs font-body mb-0.5 tracking-wide">
                      Starting from
                    </p>
                    <p className="text-white font-heading font-medium" style={{ fontSize: "1.5rem" }}>
                      ₹5,500
                    </p>
                  </div>
                  <Link
                    href="/collections"
                    className="
                      flex items-center gap-2 bg-white/15 backdrop-blur-sm
                      text-white text-xs font-body font-medium
                      px-4 py-2.5 rounded-pill border border-white/20
                      hover:bg-white/25 transition-all duration-200
                    "
                  >
                    Shop Now
                    <ArrowRight />
                  </Link>
                </div>
              </div>
            </div>

            {/* ── Floating badge — bottom right ── */}
            <div
              className={`
                absolute bottom-24 -right-4 z-20
                bg-brand-charcoal rounded-card
                px-4 py-3 shadow-card-hover
                transition-all duration-1000
                ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
              style={{
                transitionDelay: "1000ms",
                animation: mounted ? "float 5s ease-in-out infinite" : "none",
                animationDelay: "2s",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} width="10" height="10" viewBox="0 0 10 10" fill="var(--color-pink)">
                    <path d="M5 0.5l1.1 2.2 2.5.4-1.8 1.7.4 2.5L5 6.2 2.8 7.3l.4-2.5L1.4 3.1l2.5-.4L5 .5z" />
                  </svg>
                ))}
              </div>
              <p className="text-white text-[0.7rem] font-body leading-snug max-w-30">
                "Craftsmanship that<br />speaks for itself"
              </p>
              <p className="text-brand-gray text-[0.6rem] font-body mt-1">
                — Priya S., Mumbai
              </p>
            </div>

            {/* ── Floating collection tag — mid right ── */}
            <div
              className={`
                absolute top-1/2 -right-6 z-20 -translate-y-1/2
                transition-all duration-1000
                ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}
              `}
              style={{ transitionDelay: "900ms" }}
            >
              <div className="flex flex-col gap-2">
                {["Bridal", "Festive", "Everyday"].map((tag, i) => (
                  <Link
                    key={tag}
                    href={`/collections/${tag.toLowerCase()}`}
                    className="
                      badge badge-pink text-[0.6rem] py-1.5 px-3
                      hover:bg-brand-pink hover:text-white
                      transition-all duration-200 cursor-pointer
                      shadow-card
                    "
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className={`
          absolute bottom-8 left-1/2 -translate-x-1/2
          flex flex-col items-center gap-2
          transition-all duration-700
          ${mounted ? "opacity-100" : "opacity-0"}
        `}
        style={{ transitionDelay: "1200ms" }}
        aria-hidden="true"
      >
        <span className="text-[0.65rem] text-brand-gray font-body tracking-[0.15em] uppercase">
          Scroll
        </span>
        <div
          className="text-brand-gray"
          style={{ animation: "float 2s ease-in-out infinite" }}
        >
          <ArrowDown />
        </div>
      </div>

      {/* ── Mobile image strip — shown below text on mobile ── */}
      <div className="lg:hidden w-full px-6 pb-16">
        <div className="relative rounded-card overflow-hidden shadow-product aspect-4/3 bg-brand-blue-light">
          <Image
            src="/images/hero-saree.jpg"
            alt="Handwoven Indian saree — House of Fashion Boutique"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 0px"
            className="object-cover object-top"
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(30,30,30,0.5) 0%, transparent 100%)",
            }}
          />
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <p className="text-white/70 text-xs font-body mb-0.5">Starting from</p>
              <p className="text-white font-heading font-medium text-xl">₹5,500</p>
            </div>
            <Link
              href="/collections"
              className="
                flex items-center gap-1.5 bg-white/15 backdrop-blur-sm
                text-white text-xs font-body font-medium
                px-3 py-2 rounded-pill border border-white/20
                hover:bg-white/25 transition-all duration-200
              "
            >
              Shop Now <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}