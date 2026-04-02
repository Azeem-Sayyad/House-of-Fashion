"use client";

// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Bridal Banner
// components/home/BridalBanner.tsx
//
// Layout: Full-width cinematic banner — parallax-style image,
//         left-anchored editorial text, floating saree details,
//         split CTA row. The emotional peak of the homepage.
//         If someone is here for a wedding saree, this seals it.
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.139.566 4.148 1.55 5.888L0 24l6.304-1.524A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.034-1.388l-.36-.214-3.742.904.944-3.641-.235-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
  </svg>
);

// ─────────────────────────────────────────────────────────────
// BRIDAL FEATURES — the selling points rendered as a list
// ─────────────────────────────────────────────────────────────

const bridalFeatures = [
  { label: "Pure Silk Weaves", detail: "Katan, Organza, Kanjeevaram" },
  { label: "Zari Embellishment", detail: "Real gold & silver zari" },
  { label: "Custom Blouse Stitching", detail: "To your exact measurements" },
  { label: "Personalised Consultation", detail: "WhatsApp us anytime" },
];

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function BridalBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

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

  // Subtle parallax on scroll
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ minHeight: "85vh" }}
      aria-labelledby="bridal-heading"
    >
      {/* ── Full-bleed background image ── */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translateY(${scrollY * 0.08}px)`,
          top: "-8%",
          bottom: "-8%",
        }}
      >
        <Image
          src="/images/bridal-banner.jpg"
          alt="Bridal saree collection — House of Fashion Boutique"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority={false}
        />
      </div>

      {/* ── Multi-layer overlay system ── */}
      {/* Dark base */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(18, 12, 8, 0.55)" }}
        aria-hidden="true"
      />

      {/* Left-to-right fade — gives text column a readable surface */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(18, 12, 8, 0.85) 0%, rgba(18, 12, 8, 0.55) 45%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      {/* Bottom vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(18, 12, 8, 0.6) 0%, transparent 40%)",
        }}
        aria-hidden="true"
      />

      {/* ── Decorative pink orb glow ── */}
      <div
        className="absolute top-0 left-0 w-125 h-125 pointer-events-none opacity-15"
        style={{
          background:
            "radial-gradient(circle, var(--color-pink) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* ── Main content ── */}
      <div className="container-site relative z-10 h-full flex items-center">
        <div
          className="grid lg:grid-cols-[1.1fr_1fr] gap-16 w-full py-24 lg:py-32 items-center"
        >

          {/* ──────────────────────────────────────────
              LEFT — Editorial text block
          ────────────────────────────────────────── */}
          <div>

            {/* ── Eyebrow ── */}
            <div
              className={`
                flex items-center gap-3 mb-8
                transition-all duration-700
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
              `}
              style={{ transitionDelay: "100ms" }}
            >
              <div className="w-8 h-px bg-brand-pink opacity-80" />
              <span
                className="section-label"
                style={{ color: "var(--color-pink-light)" }}
              >
                The Bridal Edit
              </span>
            </div>

            {/* ── Headline ── */}
            <div
              className={`
                mb-6
                transition-all duration-700
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
              style={{ transitionDelay: "200ms" }}
            >
              <h2
                id="bridal-heading"
                className="font-heading font-medium text-white leading-[1.05]"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
              >
                Dressed for
                <br />
                <span
                  className="italic"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-pink-light) 0%, var(--color-pink) 60%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Your Forever
                </span>
                <br />
                Moment
              </h2>
            </div>

            {/* ── Script line ── */}
            <div
              className={`
                mb-8
                transition-all duration-700
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
              `}
              style={{ transitionDelay: "300ms" }}
            >
              <span
                className="font-script"
                style={{
                  fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                  color: "var(--color-pink-light)",
                  opacity: 0.9,
                }}
              >
                — every bride deserves a saree with a story
              </span>
            </div>

            {/* ── Description ── */}
            <p
              className={`
                font-body leading-relaxed mb-10 max-w-sm
                transition-all duration-700
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
              `}
              style={{
                transitionDelay: "400ms",
                color: "rgba(255,255,255,0.72)",
                fontSize: "clamp(0.9rem, 1.4vw, 1.0625rem)",
              }}
            >
              Each bridal saree is handpicked for quality, craftsmanship,
              and the weight of the moment. Blouse stitching, personalised
              styling advice, and white-glove packaging — included.
            </p>

            {/* ── Feature list ── */}
            <ul
              className={`
                space-y-3 mb-12
                transition-all duration-700
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
              `}
              style={{ transitionDelay: "500ms" }}
            >
              {bridalFeatures.map((feature, i) => (
                <li
                  key={feature.label}
                  className={`
                    flex items-center gap-3
                    transition-all duration-500
                    ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
                  `}
                  style={{ transitionDelay: `${500 + i * 80}ms` }}
                >
                  {/* Pink checkmark dot */}
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "rgba(242, 167, 188, 0.2)", border: "1px solid var(--color-pink)" }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5l2.5 2.5L8 3"
                        stroke="var(--color-pink)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="text-sm font-medium font-body text-white">
                      {feature.label}
                    </span>
                    <span
                      className="text-sm font-body ml-2"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      — {feature.detail}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            {/* ── CTAs ── */}
            <div
              className={`
                flex flex-wrap items-center gap-4
                transition-all duration-700
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
              `}
              style={{ transitionDelay: "700ms" }}
            >
              <Link
                href="/collections/bridal-edit"
                className="btn btn-primary group gap-2.5 px-7 py-3.5 text-sm"
              >
                Shop Bridal Edit
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  <ArrowRight />
                </span>
              </Link>

              <a
                href="https://wa.me/919999999999?text=Hi!%20I%27m%20looking%20for%20a%20bridal%20saree%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="
                  btn gap-2.5 px-7 py-3.5 text-sm
                  border border-white/30 text-white
                  hover:bg-white/10 hover:border-white/60
                  transition-all duration-200
                  rounded-pill
                "
              >
                <WhatsAppIcon />
                Book Consultation
              </a>
            </div>
          </div>

          {/* ──────────────────────────────────────────
              RIGHT — Floating detail cards
          ────────────────────────────────────────── */}
          <div
            className={`
              hidden lg:flex flex-col gap-4 items-end
              transition-all duration-1000
              ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}
            `}
            style={{ transitionDelay: "400ms" }}
          >

            {/* ── Card 1: Weave spotlight ── */}
            <div
              className="
                bg-white/10 backdrop-blur-md rounded-card
                border border-white/15 p-6 max-w-70 w-full
              "
              style={{
                animation: visible ? "float 5s ease-in-out infinite" : "none",
                animationDelay: "0s",
              }}
            >
              <p
                className="text-[0.65rem] font-body uppercase tracking-widest mb-3"
                style={{ color: "var(--color-pink-light)" }}
              >
                Featured Weave
              </p>
              <h4 className="font-heading font-medium text-white text-xl mb-1">
                Banarasi Katan Silk
              </h4>
              <p
                className="text-xs font-body leading-relaxed mb-4"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Woven by 3rd-generation artisans in Varanasi. Pure gold zari,
                hand-knotted booti work.
              </p>
              <div className="flex items-center justify-between">
                <span
                  className="font-heading font-medium text-white"
                  style={{ fontSize: "1.25rem" }}
                >
                  From ₹28,500
                </span>
                <Link
                  href="/product/crimson-banarasi-katan-silk"
                  className="
                    text-xs font-body font-medium
                    flex items-center gap-1
                    transition-colors duration-200
                  "
                  style={{ color: "var(--color-pink-light)" }}
                >
                  View <ArrowRight />
                </Link>
              </div>
            </div>

            {/* ── Card 2: Packaging promise ── */}
            <div
              className="
                bg-brand-charcoal/80 backdrop-blur-md rounded-card
                border border-white/10 p-5 max-w-60 w-full
              "
              style={{
                animation: visible ? "float 6s ease-in-out infinite" : "none",
                animationDelay: "1.5s",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "rgba(242,167,188,0.15)" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-pink)" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                    <path d="M16 3l-4 4-4-4" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-xs font-medium font-body">
                    Luxury Packaging
                  </p>
                  <p
                    className="text-[0.65rem] font-body"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    Gift-ready, always
                  </p>
                </div>
              </div>
              <p
                className="text-xs font-body leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                Every bridal order arrives in a handcrafted box with
                a personalised card and a muslin saree bag.
              </p>
            </div>

            {/* ── Card 3: Delivery timeline ── */}
            <div
              className="
                bg-white/10 backdrop-blur-md rounded-card
                border border-white/15 p-5 max-w-65 w-full
              "
              style={{
                animation: visible ? "float 4.5s ease-in-out infinite" : "none",
                animationDelay: "1.5s",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-white text-xs font-medium font-body">
                  Delivery Timeline
                </p>
                <span
                  className="badge text-[0.6rem] px-2 py-0.5"
                  style={{
                    background: "rgba(242,167,188,0.2)",
                    color: "var(--color-pink-light)",
                    borderRadius: "9999px",
                  }}
                >
                  In Stock
                </span>
              </div>
              {[
                { label: "Ready to ship", time: "3–5 days" },
                { label: "Made to order", time: "3–4 weeks" },
                { label: "Custom weave", time: "6–8 weeks" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <span
                    className="text-xs font-body"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {row.label}
                  </span>
                  <span className="text-xs font-medium font-body text-white">
                    {row.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom strip — collection stats ── */}
      <div
        className={`
          absolute bottom-0 left-0 right-0
          border-t border-white/10
          transition-all duration-700
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        `}
        style={{
          background: "rgba(18, 12, 8, 0.6)",
          backdropFilter: "blur(8px)",
          transitionDelay: "800ms",
        }}
      >
        <div className="container-site py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-8 flex-wrap">
              {[
                { value: "50+", label: "Bridal Weaves" },
                { value: "100%", label: "Pure Silk Options" },
                { value: "₹15K–₹2L", label: "Price Range" },
                { value: "Free", label: "Blouse Piece Included" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-8">
                  <div>
                    <div
                      className="font-heading font-medium text-white text-lg leading-none mb-0.5"
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-[0.65rem] font-body uppercase tracking-wide"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                  {i < 3 && (
                    <div
                      className="w-px h-7 hidden sm:block"
                      style={{ background: "rgba(255,255,255,0.12)" }}
                    />
                  )}
                </div>
              ))}
            </div>
            <Link
              href="/collections/bridal-edit"
              className="
                text-xs font-body font-medium
                flex items-center gap-2
                transition-all duration-200
                group
              "
              style={{ color: "var(--color-pink-light)" }}
            >
              View all bridal sarees
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                <ArrowRight />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}