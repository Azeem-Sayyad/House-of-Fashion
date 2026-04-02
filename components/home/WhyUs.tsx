"use client";

// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Why Us
// components/home/WhyUs.tsx
//
// Layout: Two-part section.
//         Top: Large editorial statement + 3 weave heritage cards
//         Bottom: 4-column differentiator grid with icon + stat
//
// Vibe: This is the brand's manifesto moment — warm, confident,
//        and specific. No generic "quality you can trust" fluff.
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────

const weaveTraditions = [
  {
    name: "Banarasi",
    region: "Varanasi, UP",
    fact: "Some patterns take 3 months to complete on a single saree.",
    image: "/images/weaves/banarasi.jpg",
    href: "/collections?weave=banarasi",
  },
  {
    name: "Kanjeevaram",
    region: "Kanchipuram, TN",
    fact: "Pure mulberry silk, interlocked with the border so it never tears.",
    image: "/images/weaves/kanjeevaram.jpg",
    href: "/collections?weave=kanjeevaram",
  },
  {
    name: "Paithani",
    region: "Yeola, Maharashtra",
    fact: "Each peacock feather motif is hand-interlocked, not printed.",
    image: "/images/weaves/paithani.jpg",
    href: "/collections?weave=paithani",
  },
];

const differentiators = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="var(--color-pink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3C8 3 3 8 3 14s5 11 11 11 11-5 11-11S20 3 14 3z" />
        <path d="M9 14l3.5 3.5L19 10" />
      </svg>
    ),
    stat: "100%",
    label: "Authenticity Guaranteed",
    detail:
      "Every saree is sourced directly from registered weavers and artisan cooperatives. No middlemen, no mass production.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="var(--color-pink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2l3 6 6.5 1-4.7 4.6 1.1 6.4L14 17l-5.9 3 1.1-6.4L4.5 9 11 8z" />
      </svg>
    ),
    stat: "12+",
    label: "Weave Traditions",
    detail:
      "Banarasi, Kanjeevaram, Paithani, Chanderi, Pochampally and more — each with its own story, craft, and region.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="var(--color-pink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 7h18M5 14h12M5 21h8" />
        <circle cx="22" cy="19" r="4" />
        <path d="M20.5 19l1 1 2-2" />
      </svg>
    ),
    stat: "✂",
    label: "Custom Blouse Stitching",
    detail:
      "Expert tailors stitch your blouse to exact measurements. Share your size over WhatsApp or use our measurement guide.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="var(--color-pink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="22" height="18" rx="2" />
        <path d="M3 10h22" />
        <path d="M9 3v4M19 3v4" />
      </svg>
    ),
    stat: "7",
    label: "Day Easy Returns",
    detail:
      "Not quite right? Return or exchange within 7 days — no questions asked, no restocking fees, no headache.",
  },
];

// ─────────────────────────────────────────────────────────────
// WEAVE CARD
// ─────────────────────────────────────────────────────────────

function WeaveCard({
  weave,
  index,
  visible,
}: {
  weave: (typeof weaveTraditions)[0];
  index: number;
  visible: boolean;
}) {
  return (
    <Link
      href={weave.href}
      className="
        group relative rounded-card overflow-hidden
        bg-brand-white shadow-card hover:shadow-card-hover
        transition-all duration-350
        flex flex-col
      "
      style={{
        transitionDelay: `${index * 120}ms`,
      }}
    >
      {/* ── Image ── */}
      <div className="relative aspect-4/3 overflow-hidden bg-brand-blue-light">
        <Image
          src={weave.image}
          alt={`${weave.name} weave`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        {/* Number watermark */}
        <div
          className="absolute top-3 left-4 font-heading text-white/20 font-medium select-none pointer-events-none"
          style={{ fontSize: "3rem", lineHeight: 1 }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* ── Info ── */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-heading font-medium text-brand-charcoal text-xl leading-tight">
              {weave.name}
            </h3>
            <p className="text-[0.65rem] text-brand-gray font-body tracking-widest uppercase mt-0.5">
              {weave.region}
            </p>
          </div>
          {/* Arrow circle */}
          <div
            className="
              w-8 h-8 rounded-full border border-brand-blue-dark
              flex items-center justify-center shrink-0 ml-3 mt-0.5
              group-hover:bg-brand-pink group-hover:border-brand-pink
              group-hover:text-white
              transition-all duration-300
            "
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </div>
        </div>

        {/* Divider */}
        <div className="w-8 h-px bg-brand-pink mb-3" />

        <p className="text-sm text-brand-gray font-body leading-relaxed italic">
          "{weave.fact}"
        </p>
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────
// DIFFERENTIATOR CARD
// ─────────────────────────────────────────────────────────────

function DifferentiatorCard({
  item,
  index,
  visible,
}: {
  item: (typeof differentiators)[0];
  index: number;
  visible: boolean;
}) {
  return (
    <div
      className={`
        flex flex-col p-6 rounded-card bg-brand-white shadow-card
        border border-transparent hover:border-brand-pink-light
        transition-all duration-500
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Icon container */}
      <div
        className="w-12 h-12 rounded-soft flex items-center justify-center mb-4 shrink-0"
        style={{ background: "var(--color-pink-light)" }}
      >
        {item.icon}
      </div>

      {/* Stat */}
      <div
        className="font-heading font-medium text-brand-charcoal mb-1"
        style={{ fontSize: "2rem", lineHeight: 1 }}
      >
        {item.stat}
      </div>

      {/* Label */}
      <h4 className="font-body font-medium text-brand-charcoal text-sm mb-2 leading-snug">
        {item.label}
      </h4>

      {/* Divider */}
      <div className="w-6 h-px bg-brand-pink mb-3" />

      {/* Detail */}
      <p className="text-[0.8rem] text-brand-gray font-body leading-relaxed">
        {item.detail}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pad bg-brand-blue"
      aria-labelledby="why-us-heading"
    >
      <div className="container-site">

        {/* ──────────────────────────────────────────
            TOP — Editorial statement + weave cards
        ────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 items-start mb-20">

          {/* Left: Statement copy */}
          <div
            className={`
              transition-all duration-700
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}
          >
            <p className="section-label mb-4">Why House of Fashion</p>
            <h2
              id="why-us-heading"
              className="section-heading mb-6 leading-tight"
            >
              Not a warehouse.
              <br />
              <span className="text-gradient-pink italic">A curation.</span>
            </h2>

            <div className="w-10 h-px bg-brand-pink mb-6" />

            <p className="text-brand-gray font-body leading-relaxed mb-6"
              style={{ fontSize: "1.0625rem" }}
            >
              We don't list ten thousand sarees and hope you find one you love.
              We handpick each piece from master weavers who've inherited their
              craft across generations — and we only stock it if we'd wear it
              ourselves.
            </p>

            <p className="text-brand-gray font-body leading-relaxed mb-10"
              style={{ fontSize: "1.0625rem" }}
            >
              That means fewer options, better quality, and a shopping
              experience that feels like having a knowledgeable friend who
              just happens to know every weaver in India.
            </p>

            {/* Script flourish */}
            <div className="mb-10">
              <span
                className="font-script text-brand-pink"
                style={{ fontSize: "2rem" }}
              >
                — handpicked, always
              </span>
            </div>

            <Link
              href="/about"
              className="btn btn-outline group gap-2 py-2.5 px-6 text-sm"
            >
              Our Story
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Right: Weave tradition cards */}
          <div
            className={`
              grid grid-cols-1 sm:grid-cols-3 gap-4
              transition-all duration-700
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}
            style={{ transitionDelay: "200ms" }}
          >
            {weaveTraditions.map((weave, i) => (
              <WeaveCard
                key={weave.name}
                weave={weave}
                index={i}
                visible={visible}
              />
            ))}
          </div>
        </div>

        {/* ──────────────────────────────────────────
            DIVIDER
        ────────────────────────────────────────── */}
        <div
          className={`
            flex items-center gap-4 mb-16
            transition-all duration-700
            ${visible ? "opacity-100" : "opacity-0"}
          `}
          style={{ transitionDelay: "400ms" }}
        >
          <div className="flex-1 h-px bg-brand-blue-dark" />
          <span className="font-script text-brand-pink text-xl px-2">
            our promise
          </span>
          <div className="flex-1 h-px bg-brand-blue-dark" />
        </div>

        {/* ──────────────────────────────────────────
            BOTTOM — 4-column differentiator grid
        ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {differentiators.map((item, i) => (
            <DifferentiatorCard
              key={item.label}
              item={item}
              index={i}
              visible={visible}
            />
          ))}
        </div>

        {/* ──────────────────────────────────────────
            BOTTOM CTA STRIP
        ────────────────────────────────────────── */}
        <div
          className={`
            mt-14 flex flex-col sm:flex-row items-center justify-between
            gap-6 p-8 rounded-card
            transition-all duration-700
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
          style={{
            transitionDelay: "500ms",
            background: "linear-gradient(135deg, var(--color-pink-light) 0%, var(--color-blue-dark) 100%)",
          }}
        >
          <div>
            <h3 className="font-heading font-medium text-brand-charcoal text-2xl mb-1">
              Still not sure? Let us help.
            </h3>
            <p className="text-brand-gray font-body text-sm">
              WhatsApp us your occasion, budget, and vibe — we'll shortlist sarees for you personally.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/919999999999?text=Hi!%20I%20need%20help%20choosing%20a%20saree."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary gap-2 px-6 py-3 text-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.139.566 4.148 1.55 5.888L0 24l6.304-1.524A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.034-1.388l-.36-.214-3.742.904.944-3.641-.235-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
              </svg>
              Chat with Us
            </a>
            <Link
              href="/collections"
              className="btn btn-outline gap-2 px-6 py-3 text-sm"
            >
              Browse All
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}