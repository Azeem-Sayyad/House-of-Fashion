"use client";

// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — About Page
// app/about/page.tsx
//
// Layout: Editorial long-form — hero statement, brand story,
//         values, weaver partnerships, team, CTA.
// Vibe: Warm, specific, human. Not corporate. Not generic.
//       The kind of About page that makes someone trust you.
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// ─────────────────────────────────────────────────────────────
// SCROLL REVEAL HOOK
// ─────────────────────────────────────────────────────────────

function useVisible() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────

const values = [
  {
    number: "01",
    title: "Handpicked, not catalogued",
    body:
      "We stock fewer sarees than most platforms. Every single piece is chosen by us personally — if we wouldn't wear it, it doesn't make the cut. That's not a marketing line. That's how we've run this from day one.",
  },
  {
    number: "02",
    title: "Weavers first, always",
    body:
      "We source directly from artisan cooperatives and registered master weavers — no agents, no middlemen. The money you spend goes to the hands that created it. Every time.",
  },
  {
    number: "03",
    title: "Craft over convenience",
    body:
      "A Banarasi katan silk saree takes weeks to weave. We refuse to rush it, replicate it cheaply, or compromise on the zari. Some things are worth the wait.",
  },
  {
    number: "04",
    title: "Honest about what we are",
    body:
      "We're a boutique. Not a marketplace, not a fast fashion platform. We're small by design, and we think that's exactly the point.",
  },
];

const weavingRegions = [
  {
    region: "Varanasi, Uttar Pradesh",
    craft: "Banarasi Silk",
    detail: "Katan, Organza, Georgette — woven with real gold & silver zari",
  },
  {
    region: "Kanchipuram, Tamil Nadu",
    craft: "Kanjeevaram Silk",
    detail: "Pure mulberry silk, interlocked borders, temple motifs",
  },
  {
    region: "Yeola, Maharashtra",
    craft: "Paithani Silk",
    detail: "Peacock and lotus motifs, hand-interlocked in pure zari",
  },
  {
    region: "Chanderi, Madhya Pradesh",
    craft: "Chanderi Silk-Cotton",
    detail: "Sheer, lightweight, delicate gold bootis on every drape",
  },
  {
    region: "Pochampally, Telangana",
    craft: "Pochampally Ikat",
    detail: "Resist-dye geometric patterns, UNESCO-recognised craft",
  },
  {
    region: "Bhagalpur, Bihar",
    craft: "Tussar Silk",
    detail: "Matte, textured, wild silk — the quiet luxury of everyday wear",
  },
];

const stats = [
  { value: "500+", label: "Sarees curated" },
  { value: "12+", label: "Weave traditions" },
  { value: "1,000+", label: "Happy customers" },
  { value: "6+", label: "Weaving regions" },
];

// ─────────────────────────────────────────────────────────────
// ARROW ICON
// ─────────────────────────────────────────────────────────────

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

// ─────────────────────────────────────────────────────────────
// SECTION — HERO
// ─────────────────────────────────────────────────────────────

function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, var(--color-blue) 0%, var(--color-pink-light) 100%)",
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Decorative orbs */}
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none opacity-25"
        style={{ background: "radial-gradient(circle, var(--color-pink) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, var(--color-blue-dark) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="container-site relative z-10 py-24">
        <div className="max-w-[680px]">

          {/* Eyebrow */}
          <div
            className={`flex items-center gap-3 mb-8 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "100ms" }}
          >
            <div className="w-8 h-px bg-brand-pink" />
            <span className="section-label">Our Story</span>
          </div>

          {/* Headline */}
          <h1
            className={`font-heading font-medium text-brand-charcoal leading-[1.05] mb-6 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", transitionDelay: "200ms" }}
          >
            We started because we
            couldn't find{" "}
            <span className="text-gradient-pink italic">what we were looking for.</span>
          </h1>

          {/* Script accent */}
          <div
            className={`mb-8 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "350ms" }}
          >
            <span className="font-script text-brand-pink" style={{ fontSize: "2rem" }}>
              — and so we built it
            </span>
          </div>

          {/* Intro */}
          <p
            className={`text-brand-gray font-body leading-relaxed transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ fontSize: "1.0625rem", transitionDelay: "450ms", maxWidth: "560px" }}
          >
            House of Fashion Boutique was born from a simple frustration —
            the best Indian sarees were either impossible to find online,
            buried under thousands of mediocre listings, or sold through
            platforms that didn't care about craft. We decided to do it
            differently.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION — BRAND STORY
// ─────────────────────────────────────────────────────────────

function StorySection() {
  const { ref, visible } = useVisible();

  return (
    <section ref={ref} className="section-pad bg-brand-white">
      <div className="container-site">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: image */}
          <div
            className={`relative transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            {/* Offset decorative border */}
            <div
              className="absolute inset-0 rounded-card border-2 border-brand-pink-light -translate-x-4 -translate-y-4"
              aria-hidden="true"
            />
            <div className="relative rounded-card overflow-hidden shadow-product-hover bg-brand-blue-light" style={{ aspectRatio: "4/5" }}>
              <Image
                src="/images/about/boutique-story.jpg"
                alt="House of Fashion Boutique — Our story"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Right: copy */}
          <div
            className={`transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            style={{ transitionDelay: "150ms" }}
          >
            <p className="section-label mb-4">How It Began</p>
            <h2 className="font-heading font-medium text-brand-charcoal leading-tight mb-6" style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)" }}>
              A boutique built on{" "}
              <span className="text-gradient-pink italic">obsession</span>,
              not scale.
            </h2>

            <div className="w-10 h-px bg-brand-pink mb-6" />

            <div className="space-y-5 text-brand-gray font-body leading-relaxed" style={{ fontSize: "1.0625rem" }}>
              <p>
                It started with a saree hunt that went nowhere. Scrolling
                through platforms with thousands of listings, synthetic
                fabrics passed off as silk, machine prints sold as handwoven —
                we were exhausted before we found a single thing worth buying.
              </p>
              <p>
                So we went directly to the source. We travelled to Varanasi,
                Kanchipuram, Chanderi, and Yeola — sat with weavers in their
                homes, watched them work, and understood for the first time
                what it actually takes to make a saree worth passing down.
              </p>
              <p>
                House of Fashion Boutique is the result of that journey.
                A carefully curated selection of handwoven sarees, sourced
                directly from the artisans who make them, brought to you
                without the noise.
              </p>
            </div>

            {/* Script flourish */}
            <div className="mt-8 mb-10">
              <span className="font-script text-brand-pink" style={{ fontSize: "1.75rem" }}>
                — crafted with intention
              </span>
            </div>

            <Link
              href="/collections"
              className="btn btn-outline group gap-2 py-3 px-6 text-sm"
            >
              Shop the Collection
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

// ─────────────────────────────────────────────────────────────
// SECTION — STATS
// ─────────────────────────────────────────────────────────────

function StatsSection() {
  const { ref, visible } = useVisible();

  return (
    <section ref={ref} className="py-20 bg-brand-charcoal">
      <div className="container-site">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className="font-heading font-medium text-white mb-2"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                {stat.value}
              </div>
              <div className="text-xs font-body text-brand-gray tracking-widest uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION — VALUES
// ─────────────────────────────────────────────────────────────

function ValuesSection() {
  const { ref, visible } = useVisible();

  return (
    <section ref={ref} className="section-pad bg-brand-blue" aria-labelledby="values-heading">
      <div className="container-site">

        {/* Header */}
        <div
          className={`max-w-xl mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="section-label mb-4">What We Stand For</p>
          <h2 id="values-heading" className="section-heading leading-tight">
            Our four{" "}
            <span className="text-gradient-pink italic">non-negotiables.</span>
          </h2>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, i) => (
            <div
              key={value.number}
              className={`
                p-8 rounded-card bg-brand-white shadow-card
                border border-transparent hover:border-brand-pink-light
                transition-all duration-500
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
              `}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Number */}
              <div
                className="font-heading font-medium text-brand-pink mb-4"
                style={{ fontSize: "3rem", lineHeight: 1, opacity: 0.3 }}
              >
                {value.number}
              </div>

              <h3 className="font-heading font-medium text-brand-charcoal text-xl mb-3 leading-snug">
                {value.title}
              </h3>

              <div className="w-8 h-px bg-brand-pink mb-4" />

              <p className="text-brand-gray font-body leading-relaxed text-sm">
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION — WEAVING REGIONS
// ─────────────────────────────────────────────────────────────

function WeaversSection() {
  const { ref, visible } = useVisible();

  return (
    <section ref={ref} className="section-pad bg-brand-white" aria-labelledby="weavers-heading">
      <div className="container-site">

        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="section-label mb-4">Where Every Saree Comes From</p>
          <h2 id="weavers-heading" className="section-heading leading-tight">
            Six regions.{" "}
            <span className="text-gradient-pink italic">Centuries of craft.</span>
          </h2>
          <p className="text-brand-gray font-body text-sm leading-relaxed mt-5 max-w-lg mx-auto">
            Every weave tradition in our boutique has its own geography,
            its own technique, and its own story. Here's where our sarees
            actually come from.
          </p>
        </div>

        {/* Regions grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {weavingRegions.map((item, i) => (
            <div
              key={item.region}
              className={`
                group p-6 rounded-card border border-brand-blue-dark
                hover:border-brand-pink hover:shadow-card
                transition-all duration-300
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
              `}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Craft name */}
              <p className="text-[0.65rem] font-body text-brand-pink uppercase tracking-widest mb-2">
                {item.craft}
              </p>

              {/* Region */}
              <h3 className="font-heading font-medium text-brand-charcoal text-lg leading-snug mb-3">
                {item.region}
              </h3>

              <div className="w-6 h-px bg-brand-pink mb-3 group-hover:w-10 transition-all duration-300" />

              {/* Detail */}
              <p className="text-[0.8rem] text-brand-gray font-body leading-relaxed italic">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div
          className={`mt-12 text-center transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "600ms" }}
        >
          <p className="text-xs text-brand-gray font-body">
            We visit our weaver partners regularly and never source through intermediaries.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION — PROMISE
// ─────────────────────────────────────────────────────────────

function PromiseSection() {
  const { ref, visible } = useVisible();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden section-pad"
      style={{ background: "var(--color-charcoal)" }}
    >
      {/* Pink orb */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-10"
        style={{ background: "radial-gradient(circle, var(--color-pink) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="container-site relative z-10">
        <div className="max-w-2xl mx-auto text-center">

          <div
            className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {/* Large quote mark */}
            <div
              className="font-heading text-brand-pink select-none mb-4"
              style={{ fontSize: "6rem", lineHeight: 1, opacity: 0.2 }}
              aria-hidden="true"
            >
              "
            </div>

            <blockquote
              className="font-heading font-medium text-white leading-snug mb-8"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
            >
              Every saree in our boutique exists because someone made it
              by hand, over days or weeks, with a skill that took years to learn.
              We think that deserves more than a listing on a marketplace.
            </blockquote>

            <div className="w-12 h-px bg-brand-pink mx-auto mb-6" />

            <p className="text-brand-gray font-body text-sm tracking-wide">
              House of Fashion Boutique
            </p>

            <span className="font-script text-brand-pink mt-4 block" style={{ fontSize: "1.75rem" }}>
              — Ichalkaranji, Maharashtra
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION — CTA
// ─────────────────────────────────────────────────────────────

function CTASection() {
  const { ref, visible } = useVisible();

  return (
    <section ref={ref} className="section-pad bg-brand-blue">
      <div className="container-site">
        <div
          className={`
            flex flex-col lg:flex-row items-center justify-between
            gap-8 p-10 rounded-card
            transition-all duration-700
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
          style={{
            background: "linear-gradient(135deg, var(--color-pink-light) 0%, var(--color-blue-dark) 100%)",
          }}
        >
          <div>
            <h2 className="font-heading font-medium text-brand-charcoal text-3xl mb-2 leading-tight">
              Ready to find your saree?
            </h2>
            <p className="text-brand-gray font-body text-sm max-w-md">
              Browse our full collection — or WhatsApp us your occasion and
              budget and we'll personally shortlist the best options for you.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/collections"
              className="btn btn-primary gap-2 px-7 py-3.5 text-sm group"
            >
              Browse Collections
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                <ArrowRight />
              </span>
            </Link>
            <a
              href="https://wa.me/919999999999?text=Hi!%20I%20saw%20your%20About%20page%20and%20I%27d%20love%20help%20finding%20a%20saree."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline gap-2 px-7 py-3.5 text-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.139.566 4.148 1.55 5.888L0 24l6.304-1.524A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.034-1.388l-.36-.214-3.742.904.944-3.641-.235-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
              </svg>
              Chat with Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="bg-brand-blue">
      <HeroSection />
      <StorySection />
      <StatsSection />
      <ValuesSection />
      <WeaversSection />
      <PromiseSection />
      <CTASection />
    </div>
  );
}