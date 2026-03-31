"use client";

// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Announcement Bar
// components/layout/AnnouncementBar.tsx
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import Link from "next/link";

// ── Rotating messages shown in the bar ──
const messages = [
  { text: "Free shipping on orders above ₹2,000", link: null },
  { text: "New Arrivals — Fresh off the loom ✨", link: "/collections/new-arrivals" },
  { text: "Custom blouse stitching available on all sarees", link: "/customise" },
  { text: "WhatsApp us for personalised styling advice", link: "https://wa.me/919999999999" },
];

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cycle through messages every 4 seconds
  // (use useEffect in a real implementation)
  const current = messages[currentIndex];

  if (!visible) return null;

  return (
    <div className="announcement-bar relative">
      <div className="container-site flex items-center justify-center gap-3">

        {/* ── Left arrow (prev message) ── */}
        <button
          onClick={() =>
            setCurrentIndex((prev) =>
              prev === 0 ? messages.length - 1 : prev - 1
            )
          }
          aria-label="Previous announcement"
          className="
            hidden sm:flex items-center justify-center
            w-5 h-5 rounded-full opacity-50 hover:opacity-100
            transition-opacity duration-200 shrink-0
          "
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M7.5 2L3.5 6L7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* ── Message ── */}
        <p className="text-center text-xs sm:text-[0.8125rem] tracking-[0.04em] font-light">
          {current.link ? (
            <Link
              href={current.link}
              className="hover:underline underline-offset-2 transition-all"
              target={current.link.startsWith("https") ? "_blank" : undefined}
              rel={current.link.startsWith("https") ? "noopener noreferrer" : undefined}
            >
              {current.text}
            </Link>
          ) : (
            <span>{current.text}</span>
          )}
        </p>

        {/* ── Right arrow (next message) ── */}
        <button
          onClick={() =>
            setCurrentIndex((prev) =>
              prev === messages.length - 1 ? 0 : prev + 1
            )
          }
          aria-label="Next announcement"
          className="
            hidden sm:flex items-center justify-center
            w-5 h-5 rounded-full opacity-50 hover:opacity-100
            transition-opacity duration-200 shrink-0
          "
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4.5 2L8.5 6L4.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* ── Dot indicators ── */}
        <div className="hidden sm:flex items-center gap-1 absolute right-16">
          {messages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to announcement ${i + 1}`}
              className={`
                w-1 h-1 rounded-full transition-all duration-200
                ${i === currentIndex ? "bg-white w-3" : "bg-white/40"}
              `}
            />
          ))}
        </div>

        {/* ── Close button ── */}
        <button
          onClick={() => setVisible(false)}
          aria-label="Close announcement bar"
          className="
            absolute right-4 opacity-60 hover:opacity-100
            transition-opacity duration-200
          "
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

      </div>
    </div>
  );
}