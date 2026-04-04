"use client";

// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Product Image Gallery
// components/product/ProductImageGallery.tsx
//
// Layout: Large main image left, thumbnail strip below.
//         Hover zoom, angle labels, fullscreen lightbox.
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import Image from "next/image";
import { ProductImage, ProductVariant } from "@/lib/types";

// ─────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────

const ZoomIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="8.5" cy="8.5" r="5.5" />
    <path d="M15 15L18 18" />
    <path d="M6.5 8.5h4M8.5 6.5v4" />
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M4 4L18 18M18 4L4 18" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M13 4L7 10l6 6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M7 4l6 6-6 6" />
  </svg>
);

// ─────────────────────────────────────────────────────────────
// ANGLE LABEL MAP
// ─────────────────────────────────────────────────────────────

const angleLabels: Record<string, string> = {
  front: "Front",
  back: "Back",
  drape: "Draped",
  closeup: "Close-up",
  detail: "Detail",
};

// ─────────────────────────────────────────────────────────────
// LIGHTBOX — fullscreen image overlay
// ─────────────────────────────────────────────────────────────

function Lightbox({
  images,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: ProductImage[];
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const image = images[activeIndex];

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center"
      style={{ background: "rgba(10, 8, 6, 0.96)" }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        className="
          absolute top-6 right-6 z-10
          w-10 h-10 rounded-full bg-white/10
          flex items-center justify-center text-white
          hover:bg-white/20 transition-all duration-200
        "
      >
        <CloseIcon />
      </button>

      {/* Prev */}
      {activeIndex > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous image"
          className="
            absolute left-6 z-10
            w-10 h-10 rounded-full bg-white/10
            flex items-center justify-center text-white
            hover:bg-white/20 transition-all duration-200
          "
        >
          <ChevronLeft />
        </button>
      )}

      {/* Image */}
      <div
        className="relative w-full max-w-3xl max-h-[85vh] mx-16"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-3/4 rounded-card overflow-hidden">
          <Image
            src={image.url}
            alt={image.alt}
            fill
            sizes="80vw"
            className="object-contain"
            priority
          />
        </div>

        {/* Caption */}
        {image.angle && (
          <p className="text-white/50 text-xs font-body text-center mt-4 tracking-widest uppercase">
            {angleLabels[image.angle] ?? image.angle}
            {" · "}
            {activeIndex + 1} / {images.length}
          </p>
        )}
      </div>

      {/* Next */}
      {activeIndex < images.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next image"
          className="
            absolute right-6 z-10
            w-10 h-10 rounded-full bg-white/10
            flex items-center justify-center text-white
            hover:bg-white/20 transition-all duration-200
          "
        >
          <ChevronRight />
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN GALLERY COMPONENT
// ─────────────────────────────────────────────────────────────

export default function ProductImageGallery({
  variant,
}: {
  variant: ProductVariant;
}) {
  const images = variant.images;
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const activeImage = images[activeIndex];

  // Mouse move zoom effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handlePrev = () =>
    setActiveIndex((prev) => Math.max(0, prev - 1));

  const handleNext = () =>
    setActiveIndex((prev) => Math.min(images.length - 1, prev + 1));

  // Keyboard navigation in lightbox
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "Escape") setLightboxOpen(false);
  };

  return (
    <div className="flex flex-col gap-4" onKeyDown={handleKeyDown} tabIndex={-1}>

      {/* ── Main Image ── */}
      <div
        className="relative rounded-card overflow-hidden bg-brand-blue-light cursor-zoom-in shadow-product"
        style={{ aspectRatio: "3/4" }}
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setLightboxOpen(true)}
      >
        <Image
          src={activeImage?.url ?? "/images/placeholder-saree.jpg"}
          alt={activeImage?.alt ?? "Product image"}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top transition-transform duration-500"
          style={{
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
            transform: zoomed ? "scale(1.6)" : "scale(1)",
          }}
        />

        {/* ── Angle label badge ── */}
        {activeImage?.angle && (
          <div className="absolute top-4 left-4">
            <span className="badge badge-dark text-[0.6rem] py-1 px-2.5 backdrop-blur-sm bg-brand-charcoal/80">
              {angleLabels[activeImage.angle] ?? activeImage.angle}
            </span>
          </div>
        )}

        {/* ── Zoom hint ── */}
        <div
          className={`
            absolute bottom-4 right-4
            flex items-center gap-1.5
            bg-white/80 backdrop-blur-sm
            text-brand-charcoal text-[0.65rem] font-body
            px-3 py-1.5 rounded-pill shadow-card
            transition-opacity duration-300
            ${zoomed ? "opacity-0" : "opacity-100"}
          `}
        >
          <ZoomIcon />
          <span>Hover to zoom</span>
        </div>

        {/* ── Arrow navigation ── */}
        {images.length > 1 && (
          <>
            {activeIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                aria-label="Previous image"
                className="
                  absolute left-3 top-1/2 -translate-y-1/2
                  w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm
                  flex items-center justify-center
                  shadow-card hover:bg-white
                  transition-all duration-200
                  text-brand-charcoal
                "
              >
                <ChevronLeft />
              </button>
            )}
            {activeIndex < images.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                aria-label="Next image"
                className="
                  absolute right-3 top-1/2 -translate-y-1/2
                  w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm
                  flex items-center justify-center
                  shadow-card hover:bg-white
                  transition-all duration-200
                  text-brand-charcoal
                "
              >
                <ChevronRight />
              </button>
            )}
          </>
        )}

        {/* ── Fullscreen button ── */}
        <button
          onClick={(e) => { e.stopPropagation(); setLightboxOpen(true); }}
          aria-label="View fullscreen"
          className="
            absolute top-4 right-4
            w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm
            flex items-center justify-center
            shadow-card hover:bg-white
            transition-all duration-200
            text-brand-charcoal
          "
        >
          <ZoomIcon />
        </button>
      </div>

      {/* ── Thumbnail Strip ── */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {images.map((image, i) => (
            <button
              key={image.id}
              onClick={() => setActiveIndex(i)}
              aria-label={`View ${image.angle ? angleLabels[image.angle] : `image ${i + 1}`}`}
              className={`
                relative shrink-0 rounded-soft overflow-hidden
                transition-all duration-200
                ${
                  i === activeIndex
                    ? "ring-2 ring-brand-pink ring-offset-2 opacity-100"
                    : "opacity-60 hover:opacity-90 hover:ring-1 hover:ring-brand-pink-light hover:ring-offset-1"
                }
              `}
              style={{ width: "72px", height: "96px" }}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="72px"
                className="object-cover object-top"
              />
              {/* Angle micro-label */}
              {image.angle && (
                <div
                  className="absolute bottom-0 left-0 right-0 py-0.5 text-center"
                  style={{ background: "rgba(30,30,30,0.55)" }}
                >
                  <span className="text-white text-[0.5rem] font-body tracking-wide uppercase">
                    {angleLabels[image.angle]}
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* ── Image counter ── */}
      <p className="text-[0.65rem] text-brand-gray font-body text-center tracking-widest uppercase">
        {activeIndex + 1} / {images.length} · Click to enlarge
      </p>

      {/* ── Lightbox ── */}
      {lightboxOpen && (
        <Lightbox
          images={images}
          activeIndex={activeIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}