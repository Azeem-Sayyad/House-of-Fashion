import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─────────────────────────────────────────
      // BRAND COLOURS — extracted from logo
      // ─────────────────────────────────────────
      colors: {
        brand: {
          pink: {
            DEFAULT: "#F2A7BC", // Rose pink — primary accent (the roof)
            light: "#FAD4E0",   // Lighter blush — hover states, backgrounds
            dark: "#D97A97",    // Deeper rose — active states, borders
          },
          blue: {
            DEFAULT: "#E8F4F8", // Icy powder blue — page background
            light: "#F4F9FB",   // Near white blue — card surfaces
            dark: "#C8DFE9",    // Slightly deeper — dividers, subtle UI
          },
          charcoal: {
            DEFAULT: "#1E1E1E", // Near black — primary text, headings
            soft: "#3A3A3A",    // Softer dark — subheadings
          },
          gray: {
            DEFAULT: "#8A8A8A", // Mid gray — secondary text, captions
            light: "#D4D4D4",   // Light gray — borders, disabled states
            faint: "#F7F7F7",   // Almost white — alternate section bg
          },
          white: "#FFFFFF",     // Pure white — cards, overlays
        },
      },

      // ─────────────────────────────────────────
      // TYPOGRAPHY
      // Primary: Cormorant Garamond — elegant serif for headings
      // Secondary: DM Sans — clean, modern for body
      // Accent: Great Vibes — script for decorative use (like "Boutique")
      // ─────────────────────────────────────────
      fontFamily: {
        heading: ["Cormorant Garamond", "Georgia", "serif"],
        body: ["DM Sans", "sans-serif"],
        script: ["Great Vibes", "cursive"],
      },

      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["3.5rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-md": ["2.75rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "display-sm": ["2rem", { lineHeight: "1.25" }],
        "body-xl": ["1.25rem", { lineHeight: "1.75" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        "body-md": ["1rem", { lineHeight: "1.65" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        "label": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.08em" }],
      },

      // ─────────────────────────────────────────
      // SPACING — generous whitespace is luxury
      // ─────────────────────────────────────────
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "section": "6rem",      // Standard section padding
        "section-lg": "9rem",   // Hero / featured sections
      },

      // ─────────────────────────────────────────
      // BORDER RADIUS
      // ─────────────────────────────────────────
      borderRadius: {
        "card": "1rem",
        "pill": "9999px",
        "soft": "0.5rem",
      },

      // ─────────────────────────────────────────
      // BOX SHADOWS — soft and premium
      // ─────────────────────────────────────────
      boxShadow: {
        "card": "0 4px 24px rgba(30, 30, 30, 0.06)",
        "card-hover": "0 12px 40px rgba(30, 30, 30, 0.12)",
        "pink-glow": "0 8px 32px rgba(242, 167, 188, 0.35)",
        "navbar": "0 2px 20px rgba(30, 30, 30, 0.06)",
        "product": "0 2px 16px rgba(30, 30, 30, 0.08)",
        "product-hover": "0 16px 48px rgba(30, 30, 30, 0.15)",
      },

      // ─────────────────────────────────────────
      // TRANSITIONS
      // ─────────────────────────────────────────
      transitionDuration: {
        "250": "250ms",
        "350": "350ms",
        "450": "450ms",
      },

      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
        "bounce-soft": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },

      // ─────────────────────────────────────────
      // ANIMATIONS
      // ─────────────────────────────────────────
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },

      animation: {
        "fade-up": "fade-up 0.5s ease forwards",
        "fade-up-delay-1": "fade-up 0.5s 0.1s ease forwards",
        "fade-up-delay-2": "fade-up 0.5s 0.2s ease forwards",
        "fade-up-delay-3": "fade-up 0.5s 0.3s ease forwards",
        "fade-in": "fade-in 0.4s ease forwards",
        "slide-in-right": "slide-in-right 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "shimmer": "shimmer 2s infinite linear",
      },

      // ─────────────────────────────────────────
      // SCREENS — standard breakpoints
      // ─────────────────────────────────────────
      screens: {
        "xs": "375px",
        "sm": "640px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1280px",
        "2xl": "1536px",
      },

      // ─────────────────────────────────────────
      // MAX WIDTH — container control
      // ─────────────────────────────────────────
      maxWidth: {
        "site": "1320px",      // Max site width
        "content": "780px",    // Readable text columns
        "product": "1100px",   // Product detail pages
      },

      // ─────────────────────────────────────────
      // ASPECT RATIOS — product images
      // ─────────────────────────────────────────
      aspectRatio: {
        "product": "3 / 4",     // Portrait — standard saree product image
        "hero": "16 / 7",       // Wide cinematic hero
        "card": "4 / 5",        // Collection cards
      },
    },
  },
  plugins: [],
};

export default config;