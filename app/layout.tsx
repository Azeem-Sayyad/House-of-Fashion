// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Root Layout
// app/layout.tsx
// ─────────────────────────────────────────────────────────────

import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Great_Vibes } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import BestSellers from "@/components/home/BestSellers";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import BridalBanner from "@/components/home/BridalBanner";
import WhyUs from "@/components/home/WhyUs";
import Testimonials from "@/components/home/Testimonials";

// ─────────────────────────────────────────────────────────────
// 1. FONT CONFIGURATION
// next/font handles loading, subsetting, and self-hosting.
// No layout shift, no external font requests at runtime.
// ─────────────────────────────────────────────────────────────

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});


// ─────────────────────────────────────────────────────────────
// 2. SITE METADATA
// Drives SEO, OG tags, and browser tab appearance.
// Override per-page using generateMetadata() in each page.tsx
// ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  // ── Core ──
  title: {
    default: "House of Fashion Boutique — Handcrafted Indian Sarees",
    template: "%s | House of Fashion Boutique",
  },
  description:
    "Discover handwoven Indian sarees — Banarasi, Kanjeevaram, Paithani, Chanderi and more. Curated bridal, festive, and everyday collections. Custom blouse stitching available.",

  // ── Open Graph ──
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://houseoffashionboutique.com",
    siteName: "House of Fashion Boutique",
    title: "House of Fashion Boutique — Handcrafted Indian Sarees",
    description:
      "Handwoven sarees from master weavers across India. Bridal, festive, and everyday collections with custom blouse stitching.",
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "House of Fashion Boutique — Handcrafted Indian Sarees",
      },
    ],
  },

  // ── Twitter / X ──
  twitter: {
    card: "summary_large_image",
    title: "House of Fashion Boutique",
    description:
      "Handwoven sarees from master weavers across India.",
    images: ["/images/og-cover.jpg"],
  },

  // ── Icons ──
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180" },
    ],
    shortcut: "/favicon.ico",
  },

  // ── Manifest ──
  manifest: "/site.webmanifest",

  // ── Robots ──
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Verification (add keys when ready) ──
  verification: {
    google: "REPLACE_WITH_GOOGLE_VERIFICATION_CODE",
  },

  // ── Canonical ──
  alternates: {
    canonical: "https://houseoffashionboutique.com",
  },
};


// ─────────────────────────────────────────────────────────────
// 3. VIEWPORT CONFIGURATION
// Separated from metadata as required by Next.js 14+
// ─────────────────────────────────────────────────────────────

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,         // Allow pinch-zoom for accessibility
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#E8F4F8" },
    { media: "(prefers-color-scheme: dark)",  color: "#1E1E1E" },
  ],
};


// ─────────────────────────────────────────────────────────────
// 4. JSON-LD STRUCTURED DATA
// Helps Google understand this is a boutique e-commerce site.
// Renders as a <script> tag in <head> — invisible to users.
// ─────────────────────────────────────────────────────────────

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: "House of Fashion Boutique",
  description:
    "Handwoven Indian sarees — Banarasi, Kanjeevaram, Paithani, Chanderi and more. Bridal, festive, and everyday collections.",
  url: "https://houseoffashionboutique.com",
  logo: "https://houseoffashionboutique.com/logo.png",
  image: "https://houseoffashionboutique.com/images/og-cover.jpg",
  priceRange: "₹₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "UPI, Credit Card, Debit Card, Net Banking, Cash on Delivery",
  areaServed: "IN",
  sameAs: [
    "https://www.instagram.com/house_of_fashion_boutique121",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
  },
};


// ─────────────────────────────────────────────────────────────
// 5. ROOT LAYOUT COMPONENT
// ─────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`
        ${cormorantGaramond.variable}
        ${dmSans.variable}
        ${greatVibes.variable}
      `}
    >
      <head>
        {/* ── JSON-LD Structured Data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* ── Preconnect for performance ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>

      <body className="bg-brand-blue font-body text-brand-charcoal antialiased">

        {/* ── Skip to content — accessibility ── */}
        <a
          href="#main-content"
          className="
            sr-only focus:not-sr-only
            focus:fixed focus:top-4 focus:left-4
            focus:z-9999 focus:px-4 focus:py-2
            focus:bg-brand-pink focus:text-white
            focus:rounded-soft focus:text-sm focus:font-medium
            focus:shadow-pink-glow
          "
        >
          Skip to main content
        </a>

        {/* ── Announcement Bar ── */}
        <AnnouncementBar />

        {/* ── Navbar ── */}
        <Navbar />

        {/* ── Main Content ── */}
        <main id="main-content">
          {children}
        </main>

        {/* ── Footer ── */}
        <Footer />

        {/* ── WhatsApp Floating Button ── */}
        {/* <WhatsAppButton /> */}
        {/* Uncomment once WhatsAppButton component is built */}

      </body>
    </html>
  );
}