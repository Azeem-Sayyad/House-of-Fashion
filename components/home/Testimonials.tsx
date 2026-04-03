"use client";

// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Testimonials
// components/home/Testimonials.tsx
//
// Layout: Large featured quote centre-stage, customer cards
//         in a scrollable row below. Star ratings, avatars,
//         product links, city tags. Social proof done right.
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { testimonials } from "@/data/products";
import { Testimonial } from "@/lib/types";

// ─────────────────────────────────────────────────────────────
// STAR RATING
// ─────────────────────────────────────────────────────────────

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width={size}
          height={size}
          viewBox="0 0 14 14"
          fill={
            star <= rating ? "var(--color-pink)" : "var(--color-gray-light)"
          }
        >
          <path d="M7 1l1.6 3.2 3.5.5-2.5 2.5.6 3.5L7 9 3.8 10.7l.6-3.5L2 4.7l3.5-.5L7 1z" />
        </svg>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// AVATAR — initials fallback if no image
// ─────────────────────────────────────────────────────────────

function Avatar({
  name,
  src,
  size = 48,
}: {
  name: string;
  src?: string;
  size?: number;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (src) {
    return (
      <div
        className="rounded-full overflow-hidden shrink-0 border-2 border-brand-pink-light"
        style={{ width: size, height: size }}
      >
        <Image
          src={src}
          alt={name}
          width={size}
          height={size}
          className="object-cover w-full h-full"
        />
      </div>
    );
  }

  return (
    <div
      className="rounded-full shrink-0 flex items-center justify-center border-2 border-brand-pink-light"
      style={{
        width: size,
        height: size,
        background:
          "linear-gradient(135deg, var(--color-pink-light), var(--color-pink))",
      }}
    >
      <span
        className="font-heading font-medium text-white"
        style={{ fontSize: size * 0.35 }}
      >
        {initials}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FEATURED TESTIMONIAL — large centred display
// ─────────────────────────────────────────────────────────────

function FeaturedTestimonial({
  testimonial,
  visible,
}: {
  testimonial: Testimonial;
  visible: boolean;
}) {
  return (
    <div
      className={`
        relative max-w-3xl mx-auto text-center mb-16
        transition-all duration-700
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      style={{ transitionDelay: "200ms" }}
    >
      {/* ── Giant decorative quote mark ── */}
      <div
        className="absolute -top-12 left-1/2 -translate-x-1/2 font-heading font-medium text-brand-pink-light select-none pointer-events-none"
        style={{ fontSize: "8rem", lineHeight: 1, opacity: 0.4 }}
        aria-hidden="true"
      >
        "
      </div>

      {/* Stars */}
      <div className="relative z-10 flex justify-center mb-6 pt-4">
        <StarRating rating={testimonial.rating} size={18} />
      </div>

      {/* Quote */}
      <blockquote
        className="font-heading font-medium text-brand-charcoal leading-snug mb-8 relative z-10"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
      >
        {testimonial.quote}
      </blockquote>

      {/* Author */}
      <div className="flex items-center justify-center gap-3">
        <Avatar
          name={testimonial.authorName}
          src={testimonial.authorAvatar}
          size={48}
        />
        <div className="text-left">
          <p className="font-body font-medium text-brand-charcoal text-sm">
            {testimonial.authorName}
          </p>
          <p className="font-body text-brand-gray text-xs tracking-wide">
            {testimonial.authorLocation}
          </p>
        </div>
      </div>

      {/* Product link — if attached */}
      {testimonial.productId && (
        <div className="mt-4">
          <Link
            href={`/product/${testimonial.productId}`}
            className="text-[0.7rem] text-brand-pink font-body tracking-[0.08em] uppercase hover:underline underline-offset-2 transition-all"
          >
            View product →
          </Link>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TESTIMONIAL CARD — compact scroll row cards
// ─────────────────────────────────────────────────────────────

function TestimonialCard({
  testimonial,
  isActive,
  onClick,
}: {
  testimonial: Testimonial;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        shrink-0 text-left rounded-card p-5 w-70
        transition-all duration-300 cursor-pointer
        border-2
        ${
          isActive
            ? "bg-brand-white shadow-card-hover border-brand-pink scale-[1.02]"
            : "bg-brand-white shadow-card border-transparent hover:border-brand-pink-light hover:shadow-card-hover"
        }
      `}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-3">
        <Avatar
          name={testimonial.authorName}
          src={testimonial.authorAvatar}
          size={40}
        />
        <StarRating rating={testimonial.rating} size={12} />
      </div>

      {/* Quote — truncated */}
      <p className="text-sm text-brand-charcoal-soft font-body leading-relaxed line-clamp-3 mb-3 font-heading italic">
        "{testimonial.quote}"
      </p>

      {/* Author info */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-brand-charcoal font-body">
            {testimonial.authorName}
          </p>
          <p className="text-[0.65rem] text-brand-gray font-body tracking-wide">
            {testimonial.authorLocation}
          </p>
        </div>
        {/* Active indicator dot */}
        {isActive && (
          <div className="w-2 h-2 rounded-full bg-brand-pink shrink-0" />
        )}
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function Testimonials() {
  const featured = testimonials.filter((t) => t.isFeatured);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Scroll-triggered entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Autoplay — cycle featured testimonials every 5s
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featured.length);
    }, 5000);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [featured.length]);

  // Scroll the card row to keep active card visible
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const activeCard = container.children[activeIndex] as HTMLElement;
    if (activeCard) {
      // 1. Get the horizontal center of the scroll container
      const containerCenter = container.offsetWidth / 2;

      // 2. Get the center point of the active card
      const cardCenter = activeCard.offsetLeft + activeCard.offsetWidth / 2;

      // 3. Scroll the container so the card center aligns with the container center
      container.scrollTo({
        left: cardCenter - containerCenter,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    // Reset autoplay timer on manual interaction
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featured.length);
    }, 5000);
  };

  return (
    <section
      ref={sectionRef}
      className="section-pad overflow-hidden"
      style={{ background: "var(--bg-subtle)" }}
      aria-labelledby="testimonials-heading"
    >
      <div className="container-site">
        {/* ── Section Header ── */}
        <div
          className={`
            text-center mb-14
            transition-all duration-700
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          <p className="section-label mb-3">Real Customers, Real Love</p>
          <h2 id="testimonials-heading" className="section-heading">
            What Our{" "}
            <span className="text-gradient-pink italic">Customers Say</span>
          </h2>

          {/* Aggregate rating strip */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <StarRating rating={5} size={16} />
            <span className="text-sm font-body text-brand-gray">
              <span className="font-medium text-brand-charcoal">4.9 / 5</span>{" "}
              from 200+ verified reviews
            </span>
          </div>
        </div>

        {/* ── Featured large quote ── */}
        <FeaturedTestimonial
          testimonial={featured[activeIndex]}
          visible={visible}
        />

        {/* ── Card scroll row ── */}
        <div
          className={`
            transition-all duration-700
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="relative">
            <div
              ref={scrollRef}
              className="scroll-row gap-4 pb-2 justify-start lg:justify-center"
            >
              {featured.map((testimonial, i) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  isActive={i === activeIndex}
                  onClick={() => handleCardClick(i)}
                />
              ))}
            </div>

            {/* Edge fades */}
            <div
              className="absolute top-0 left-0 w-12 h-full pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, var(--bg-subtle), transparent)",
              }}
              aria-hidden="true"
            />
            <div
              className="absolute top-0 right-0 w-12 h-full pointer-events-none"
              style={{
                background:
                  "linear-gradient(to left, var(--bg-subtle), transparent)",
              }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* ── Progress dots ── */}
        <div
          className={`
            flex items-center justify-center gap-2 mt-8
            transition-all duration-700
            ${visible ? "opacity-100" : "opacity-0"}
          `}
          style={{ transitionDelay: "400ms" }}
        >
          {featured.map((_, i) => (
            <button
              key={i}
              onClick={() => handleCardClick(i)}
              aria-label={`View testimonial ${i + 1}`}
              className={`
                rounded-full transition-all duration-300
                ${
                  i === activeIndex
                    ? "bg-brand-pink w-6 h-2"
                    : "bg-brand-gray-light w-2 h-2 hover:bg-brand-pink-light"
                }
              `}
            />
          ))}
        </div>

        {/* ── Bottom trust badge row ── */}
        <div
          className={`
            mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4
            transition-all duration-700
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
          style={{ transitionDelay: "500ms" }}
        >
          {[
            { icon: "✅", label: "Verified Purchases Only" },
            { icon: "📦", label: "Real Customer Photos" },
            { icon: "🔒", label: "Secure Payments" },
            { icon: "🇮🇳", label: "Proudly Indian, Ships Nationwide" },
          ].map((badge) => (
            <div key={badge.label} className="flex items-center gap-2">
              <span className="text-base">{badge.icon}</span>
              <span className="text-xs font-body text-brand-gray tracking-wide">
                {badge.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── CTA — leave a review ── */}
        <div
          className={`
            mt-10 text-center
            transition-all duration-700
            ${visible ? "opacity-100" : "opacity-0"}
          `}
          style={{ transitionDelay: "600ms" }}
        >
          <p className="text-xs text-brand-gray font-body mb-2">
            Ordered from us? We'd love to hear your story.
          </p>
          <Link
            href="/reviews"
            className="text-xs font-body font-medium text-brand-pink hover:underline underline-offset-2 tracking-wide"
          >
            Write a Review →
          </Link>
        </div>
      </div>
    </section>
  );
}
