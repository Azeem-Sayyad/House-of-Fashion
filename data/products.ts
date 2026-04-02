// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Mock Data
// data/products.ts
// Replace with API calls when backend is ready.
// ─────────────────────────────────────────────────────────────

import {
  Product,
  Collection,
  Testimonial,
  NavLink,
  FilterOption,
} from "@/lib/types";


// ─────────────────────────────────────────────────────────────
// 1. COLLECTIONS
// ─────────────────────────────────────────────────────────────

export const collections: Collection[] = [
  {
    id: "col-001",
    slug: "bridal-edit",
    name: "Bridal Edit",
    tagline: "For the most important day of your life",
    description:
      "Handpicked silks, heavy zari work, and timeless weaves curated exclusively for brides. Every piece tells a story worth passing down.",
    coverImage: "/images/collections/bridal-edit.jpg",
    occasion: "bridal",
    isFeatured: true,
    productIds: ["prod-001", "prod-002", "prod-003"],
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "col-002",
    slug: "festive-picks",
    name: "Festive Picks",
    tagline: "Celebrate in colour",
    description:
      "From Diwali to Navratri, our festive edit brings together the richest fabrics and most vibrant palettes of the season.",
    coverImage: "/images/collections/festive-picks.jpg",
    occasion: "festive",
    isFeatured: true,
    productIds: ["prod-004", "prod-005", "prod-006"],
    createdAt: "2024-01-05T00:00:00Z",
  },
  {
    id: "col-003",
    slug: "everyday-silks",
    name: "Everyday Silks",
    tagline: "Luxury you can wear every day",
    description:
      "Lighter weaves and breathable fabrics for the woman who refuses to compromise on elegance, even on a Tuesday.",
    coverImage: "/images/collections/everyday-silks.jpg",
    isFeatured: true,
    productIds: ["prod-007", "prod-008", "prod-009"],
    createdAt: "2024-01-10T00:00:00Z",
  },
  {
    id: "col-004",
    slug: "office-drapes",
    name: "Office Drapes",
    tagline: "Power. Poise. Perfect drape.",
    description:
      "Structured cottons, subtle chanderi, and muted georgettes that mean serious business without sacrificing grace.",
    coverImage: "/images/collections/office-drapes.jpg",
    occasion: "office",
    isFeatured: false,
    productIds: ["prod-010", "prod-011", "prod-012"],
    createdAt: "2024-02-01T00:00:00Z",
  },
  {
    id: "col-005",
    slug: "new-arrivals",
    name: "New Arrivals",
    tagline: "Fresh off the loom",
    description:
      "The latest additions to our boutique — handpicked from master weavers across India.",
    coverImage: "/images/collections/new-arrivals.jpg",
    isFeatured: true,
    productIds: ["prod-001", "prod-004", "prod-007", "prod-010"],
    createdAt: "2024-03-01T00:00:00Z",
  },
];


// ─────────────────────────────────────────────────────────────
// 2. PRODUCTS
// ─────────────────────────────────────────────────────────────

export const products: Product[] = [
  // ── BRIDAL EDIT ──
  {
    id: "prod-001",
    slug: "crimson-banarasi-katan-silk",
    name: "Crimson Banarasi Katan Silk",
    description:
      "Woven in the heart of Varanasi by third-generation weavers, this deep crimson katan silk saree features intricate gold zari bootis across the body and a heavily worked pallu with traditional floral motifs. A timeless bridal statement piece.",
    shortDescription:
      "Deep crimson katan silk with gold zari bootis. Classic Banarasi bridal drape.",
    price: 28500,
    originalPrice: 32000,
    discount: 11,
    fabric: "silk",
    weave: "banarasi",
    occasion: ["bridal", "reception"],
    region: "Varanasi",
    careInstructions: [
      "Dry clean only",
      "Store in muslin cloth",
      "Avoid direct sunlight",
      "Do not wring or twist",
    ],
    length: 6.3,
    width: 120,
    blouse: {
      included: true,
      fabricMetres: 0.8,
      stitchingAvailable: true,
      stitchingPrice: 1200,
      availableSizes: ["XS", "S", "M", "L", "XL", "XXL", "custom"],
    },
    variants: [
      {
        id: "var-001-crimson",
        colour: "Crimson",
        colourHex: "#DC143C",
        stock: 3,
        images: [
          { id: "img-001-a", url: "/images/products/crimson-banarasi-front.jpg", alt: "Crimson Banarasi Katan Silk - Front", isPrimary: true, angle: "front" },
          { id: "img-001-b", url: "/images/products/crimson-banarasi-back.jpg", alt: "Crimson Banarasi Katan Silk - Back", isPrimary: false, angle: "back" },
          { id: "img-001-c", url: "/images/products/crimson-banarasi-pallu.jpg", alt: "Crimson Banarasi Katan Silk - Pallu Detail", isPrimary: false, angle: "detail" },
          { id: "img-001-d", url: "/images/products/crimson-banarasi-drape.jpg", alt: "Crimson Banarasi Katan Silk - Draped", isPrimary: false, angle: "drape" },
        ],
      },
      {
        id: "var-001-royal-blue",
        colour: "Royal Blue",
        colourHex: "#4169E1",
        stock: 2,
        images: [
          { id: "img-001-e", url: "/images/products/royalblue-banarasi-front.jpg", alt: "Royal Blue Banarasi Katan Silk - Front", isPrimary: true, angle: "front" },
        ],
      },
    ],
    defaultVariantId: "var-001-crimson",
    isNew: false,
    isBestseller: true,
    isFeatured: true,
    isAvailable: true,
    isMadeToOrder: false,
    metaTitle: "Crimson Banarasi Katan Silk Saree | House of Fashion Boutique",
    metaDescription: "Buy handwoven Crimson Banarasi Katan Silk Saree with gold zari. Perfect bridal saree from Varanasi weavers.",
    collectionIds: ["col-001", "col-005"],
    relatedProductIds: ["prod-002", "prod-003"],
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
  },
  {
    id: "prod-002",
    slug: "ivory-kanjeevaram-silk",
    name: "Ivory Kanjeevaram Pure Silk",
    description:
      "A stunning ivory Kanjeevaram saree with a deep burgundy contrast border and a pallu adorned with peacock motifs in silver and gold zari. Crafted from pure mulberry silk by Kanchipuram artisans. Ideal for the modern bride who values tradition.",
    shortDescription:
      "Ivory pure silk Kanjeevaram with peacock motif pallu and burgundy contrast border.",
    price: 42000,
    fabric: "silk",
    weave: "kanjeevaram",
    occasion: ["bridal", "reception", "festive"],
    region: "Kanchipuram",
    careInstructions: [
      "Dry clean only",
      "Store with neem leaves to prevent insects",
      "Keep away from moisture",
      "Iron on low heat on reverse side",
    ],
    length: 6.3,
    width: 120,
    blouse: {
      included: true,
      fabricMetres: 1,
      stitchingAvailable: true,
      stitchingPrice: 1500,
      availableSizes: ["XS", "S", "M", "L", "XL", "XXL", "custom"],
    },
    variants: [
      {
        id: "var-002-ivory",
        colour: "Ivory",
        colourHex: "#FFFFF0",
        stock: 2,
        images: [
          { id: "img-002-a", url: "/images/products/ivory-kanjeevaram-front.jpg", alt: "Ivory Kanjeevaram - Front", isPrimary: true, angle: "front" },
          { id: "img-002-b", url: "/images/products/ivory-kanjeevaram-pallu.jpg", alt: "Ivory Kanjeevaram - Pallu", isPrimary: false, angle: "detail" },
          { id: "img-002-c", url: "/images/products/ivory-kanjeevaram-drape.jpg", alt: "Ivory Kanjeevaram - Draped", isPrimary: false, angle: "drape" },
        ],
      },
    ],
    defaultVariantId: "var-002-ivory",
    isNew: true,
    isBestseller: false,
    isFeatured: true,
    isAvailable: true,
    isMadeToOrder: false,
    metaTitle: "Ivory Kanjeevaram Pure Silk Saree | House of Fashion Boutique",
    metaDescription: "Pure mulberry silk Kanjeevaram saree in ivory with peacock motif pallu. Bridal saree from Kanchipuram.",
    collectionIds: ["col-001"],
    relatedProductIds: ["prod-001", "prod-003"],
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
  },
  {
    id: "prod-003",
    slug: "paithani-peacock-green",
    name: "Paithani Peacock Green",
    description:
      "An heirloom-worthy Paithani saree in rich peacock green with the signature lotus and peacock motifs woven in pure gold zari. Made in Yeola, Maharashtra, using the traditional hand-loom technique. A piece that will outlive trends by several generations.",
    shortDescription:
      "Rich peacock green Paithani with lotus and peacock gold zari motifs. Made in Yeola.",
    price: 38000,
    originalPrice: 45000,
    discount: 16,
    fabric: "silk",
    weave: "paithani",
    occasion: ["bridal", "festive", "reception"],
    region: "Yeola, Maharashtra",
    careInstructions: [
      "Dry clean only",
      "Store in airtight saree bags",
      "Avoid perfume contact",
      "Air periodically to prevent zari tarnishing",
    ],
    length: 5.5,
    blouse: {
      included: true,
      fabricMetres: 0.8,
      stitchingAvailable: true,
      stitchingPrice: 1200,
      availableSizes: ["XS", "S", "M", "L", "XL", "XXL", "custom"],
    },
    variants: [
      {
        id: "var-003-peacock",
        colour: "Peacock Green",
        colourHex: "#005F60",
        stock: 1,
        images: [
          { id: "img-003-a", url: "/images/products/paithani-green-front.webp", alt: "Paithani Peacock Green - Front", isPrimary: true, angle: "front" },
          { id: "img-003-b", url: "/images/products/paithani-green-closeup.webp", alt: "Paithani Peacock Green - Close Up", isPrimary: false, angle: "closeup" },
        ],
      },
      {
        id: "var-003-purple",
        colour: "Royal Purple",
        colourHex: "#7B2D8B",
        stock: 2,
        images: [
          { id: "img-003-c", url: "/images/products/paithani-purple-front.jpg", alt: "Paithani Royal Purple - Front", isPrimary: true, angle: "front" },
        ],
      },
    ],
    defaultVariantId: "var-003-peacock",
    isNew: false,
    isBestseller: true,
    isFeatured: false,
    isAvailable: true,
    isMadeToOrder: false,
    collectionIds: ["col-001", "col-002"],
    relatedProductIds: ["prod-001", "prod-002"],
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
  },

  // ── FESTIVE PICKS ──
  {
    id: "prod-004",
    slug: "saffron-chanderi-silk-cotton",
    name: "Saffron Chanderi Silk Cotton",
    description:
      "Lightweight yet luminous, this saffron Chanderi saree weaves together silk and cotton for the perfect festive weight. Delicate gold bootis scattered across the body catch the light beautifully. Effortless to drape, stunning to wear.",
    shortDescription:
      "Saffron Chanderi silk-cotton with scattered gold bootis. Lightweight festive elegance.",
    price: 8500,
    fabric: "chanderi",
    weave: "chanderi",
    occasion: ["festive", "party", "mehendi"],
    region: "Chanderi, Madhya Pradesh",
    careInstructions: [
      "Hand wash in cold water",
      "Use mild detergent",
      "Do not tumble dry",
      "Iron on medium heat",
    ],
    length: 5.5,
    blouse: {
      included: true,
      fabricMetres: 0.8,
      stitchingAvailable: true,
      stitchingPrice: 800,
      availableSizes: ["XS", "S", "M", "L", "XL", "XXL", "custom"],
    },
    variants: [
      {
        id: "var-004-saffron",
        colour: "Saffron",
        colourHex: "#F4A300",
        stock: 8,
        images: [
          { id: "img-004-a", url: "/images/products/saffron-chanderi-front.jpg", alt: "Saffron Chanderi - Front", isPrimary: true, angle: "front" },
          { id: "img-004-b", url: "/images/products/saffron-chanderi-drape.jpg", alt: "Saffron Chanderi - Draped", isPrimary: false, angle: "drape" },
        ],
      },
      {
        id: "var-004-rose",
        colour: "Rose Pink",
        colourHex: "#F2A7BC",
        stock: 6,
        images: [
          { id: "img-004-c", url: "/images/products/rose-chanderi-front.jpg", alt: "Rose Pink Chanderi - Front", isPrimary: true, angle: "front" },
        ],
      },
      {
        id: "var-004-mint",
        colour: "Mint Green",
        colourHex: "#98D8C8",
        stock: 4,
        images: [
          { id: "img-004-d", url: "/images/products/mint-chanderi-front.jpg", alt: "Mint Chanderi - Front", isPrimary: true, angle: "front" },
        ],
      },
    ],
    defaultVariantId: "var-004-saffron",
    isNew: true,
    isBestseller: false,
    isFeatured: true,
    isAvailable: true,
    isMadeToOrder: false,
    collectionIds: ["col-002", "col-005"],
    relatedProductIds: ["prod-005", "prod-006"],
    createdAt: "2024-03-01T00:00:00Z",
    updatedAt: "2024-03-10T00:00:00Z",
  },
  {
    id: "prod-005",
    slug: "emerald-pochampally-ikat",
    name: "Emerald Pochampally Ikat",
    description:
      "The resist-dye technique of Pochampally produces those unmistakable blurred geometric patterns that make ikat so distinctive. This emerald green piece with mustard geometric motifs is handwoven by artisans in Telangana and is a celebration of India's textile heritage.",
    shortDescription:
      "Emerald green Pochampally ikat with mustard geometric resist-dye patterns.",
    price: 12500,
    fabric: "silk",
    weave: "pochampally",
    occasion: ["festive", "casual", "party"],
    region: "Pochampally, Telangana",
    careInstructions: [
      "Dry clean recommended",
      "Hand wash gently if needed",
      "Store folded with tissue paper",
    ],
    length: 5.5,
    blouse: {
      included: true,
      fabricMetres: 0.8,
      stitchingAvailable: true,
      stitchingPrice: 900,
    },
    variants: [
      {
        id: "var-005-emerald",
        colour: "Emerald",
        colourHex: "#008000",
        stock: 5,
        images: [
          { id: "img-005-a", url: "/images/products/emerald-pochampally-front.jpg", alt: "Emerald Pochampally Ikat - Front", isPrimary: true, angle: "front" },
          { id: "img-005-b", url: "/images/products/emerald-pochampally-closeup.jpg", alt: "Emerald Pochampally Ikat - Close Up", isPrimary: false, angle: "closeup" },
        ],
      },
    ],
    defaultVariantId: "var-005-emerald",
    isNew: false,
    isBestseller: true,
    isFeatured: false,
    isAvailable: true,
    isMadeToOrder: false,
    collectionIds: ["col-002"],
    relatedProductIds: ["prod-004", "prod-006"],
    createdAt: "2024-01-25T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
  },
  {
    id: "prod-006",
    slug: "deep-red-bandhani-georgette",
    name: "Deep Red Bandhani Georgette",
    description:
      "The ancient tie-and-dye craft of Bandhani meets lightweight georgette in this stunning deep red saree. Thousands of tiny dots formed by skilled artisan hands create a pattern that shimmers with movement. Perfect for sangeet or mehendi celebrations.",
    shortDescription:
      "Deep red georgette saree with traditional Bandhani tie-and-dye dot pattern.",
    price: 9800,
    originalPrice: 11500,
    discount: 15,
    fabric: "georgette",
    weave: "bandhani",
    occasion: ["festive", "mehendi", "sangeet", "party"],
    region: "Jaipur, Rajasthan",
    careInstructions: [
      "Dry clean only",
      "Do not soak in water",
      "Store in dark place to preserve colour",
    ],
    length: 5.5,
    blouse: {
      included: true,
      fabricMetres: 0.8,
      stitchingAvailable: true,
      stitchingPrice: 800,
    },
    variants: [
      {
        id: "var-006-red",
        colour: "Deep Red",
        colourHex: "#8B0000",
        stock: 7,
        images: [
          { id: "img-006-a", url: "/images/products/red-bandhani-front.jpg", alt: "Deep Red Bandhani - Front", isPrimary: true, angle: "front" },
          { id: "img-006-b", url: "/images/products/red-bandhani-drape.jpg", alt: "Deep Red Bandhani - Draped", isPrimary: false, angle: "drape" },
        ],
      },
      {
        id: "var-006-yellow",
        colour: "Turmeric Yellow",
        colourHex: "#FFC300",
        stock: 5,
        images: [
          { id: "img-006-c", url: "/images/products/yellow-bandhani-front.jpg", alt: "Turmeric Yellow Bandhani - Front", isPrimary: true, angle: "front" },
        ],
      },
    ],
    defaultVariantId: "var-006-red",
    isNew: false,
    isBestseller: false,
    isFeatured: false,
    isAvailable: true,
    isMadeToOrder: false,
    collectionIds: ["col-002"],
    relatedProductIds: ["prod-004", "prod-005"],
    createdAt: "2024-02-10T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
  },

  // ── EVERYDAY SILKS ──
  {
    id: "prod-007",
    slug: "powder-blue-tussar-silk",
    name: "Powder Blue Tussar Silk",
    description:
      "Tussar silk is the quiet luxury of the saree world — matte, textured, and effortlessly sophisticated. This powder blue piece features a minimal tribal-inspired print in deep blue and gold. Goes from office to dinner without skipping a beat.",
    shortDescription:
      "Powder blue Tussar silk with minimal tribal-inspired print. Day to evening effortlessly.",
    price: 7200,
    fabric: "tussar",
    weave: "plain",
    occasion: ["casual", "office", "party"],
    region: "Bhagalpur, Bihar",
    careInstructions: [
      "Dry clean recommended",
      "Hand wash with silk-specific detergent if needed",
      "Iron on low heat",
    ],
    length: 5.5,
    blouse: {
      included: true,
      fabricMetres: 0.8,
      stitchingAvailable: true,
      stitchingPrice: 700,
    },
    variants: [
      {
        id: "var-007-powder-blue",
        colour: "Powder Blue",
        colourHex: "#B0D4E8",
        stock: 10,
        images: [
          { id: "img-007-a", url: "/images/products/powderblue-tussar-front.jpg", alt: "Powder Blue Tussar - Front", isPrimary: true, angle: "front" },
          { id: "img-007-b", url: "/images/products/powderblue-tussar-back.jpg", alt: "Powder Blue Tussar - Back", isPrimary: false, angle: "back" },
        ],
      },
      {
        id: "var-007-blush",
        colour: "Blush Pink",
        colourHex: "#FAD4E0",
        stock: 8,
        images: [
          { id: "img-007-c", url: "/images/products/blush-tussar-front.jpg", alt: "Blush Pink Tussar - Front", isPrimary: true, angle: "front" },
        ],
      },
    ],
    defaultVariantId: "var-007-powder-blue",
    isNew: true,
    isBestseller: false,
    isFeatured: true,
    isAvailable: true,
    isMadeToOrder: false,
    collectionIds: ["col-003", "col-005"],
    relatedProductIds: ["prod-008", "prod-009"],
    createdAt: "2024-03-05T00:00:00Z",
    updatedAt: "2024-03-10T00:00:00Z",
  },
  {
    id: "prod-008",
    slug: "sage-green-linen-handwoven",
    name: "Sage Green Handwoven Linen",
    description:
      "Pure handwoven linen saree in a calming sage green with a fine zari border. Breathable, lightweight, and wrinkle-resistant — linen is the everyday silk for people with taste and a schedule. Pairs beautifully with gold jewellery.",
    shortDescription:
      "Sage green handwoven linen with fine zari border. Breathable everyday luxury.",
    price: 5500,
    fabric: "linen",
    weave: "plain",
    occasion: ["casual", "office"],
    region: "West Bengal",
    careInstructions: [
      "Machine wash on gentle cycle",
      "Use cold water",
      "Tumble dry low",
      "Iron while slightly damp",
    ],
    length: 5.5,
    blouse: {
      included: true,
      fabricMetres: 0.8,
      stitchingAvailable: true,
      stitchingPrice: 600,
    },
    variants: [
      {
        id: "var-008-sage",
        colour: "Sage Green",
        colourHex: "#8FAF8A",
        stock: 15,
        images: [
          { id: "img-008-a", url: "/images/products/sage-linen-front.jpg", alt: "Sage Linen - Front", isPrimary: true, angle: "front" },
        ],
      },
      {
        id: "var-008-white",
        colour: "Off White",
        colourHex: "#FAF9F6",
        stock: 12,
        images: [
          { id: "img-008-b", url: "/images/products/white-linen-front.jpg", alt: "Off White Linen - Front", isPrimary: true, angle: "front" },
        ],
      },
      {
        id: "var-008-terracotta",
        colour: "Terracotta",
        colourHex: "#C0654A",
        stock: 9,
        images: [
          { id: "img-008-c", url: "/images/products/terracotta-linen-front.jpg", alt: "Terracotta Linen - Front", isPrimary: true, angle: "front" },
        ],
      },
    ],
    defaultVariantId: "var-008-sage",
    isNew: false,
    isBestseller: true,
    isFeatured: false,
    isAvailable: true,
    isMadeToOrder: false,
    collectionIds: ["col-003"],
    relatedProductIds: ["prod-007", "prod-009"],
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
  },
  {
    id: "prod-009",
    slug: "navy-jamdani-cotton",
    name: "Navy Jamdani Pure Cotton",
    description:
      "A UNESCO-recognised weave meets modern minimalism in this navy blue Jamdani saree. Featuring fine white floral motifs woven directly into the fabric — no prints, no shortcuts — this is the kind of saree that starts conversations.",
    shortDescription:
      "Navy Jamdani cotton with white floral motifs. UNESCO heritage weave, modern sensibility.",
    price: 11000,
    fabric: "cotton",
    weave: "jamdani",
    occasion: ["casual", "office", "festive"],
    region: "West Bengal",
    careInstructions: [
      "Hand wash separately in cold water",
      "Do not bleach",
      "Dry in shade",
      "Iron on medium heat",
    ],
    length: 5.5,
    blouse: {
      included: true,
      fabricMetres: 0.8,
      stitchingAvailable: true,
      stitchingPrice: 700,
    },
    variants: [
      {
        id: "var-009-navy",
        colour: "Navy Blue",
        colourHex: "#001F5B",
        stock: 6,
        images: [
          { id: "img-009-a", url: "/images/products/navy-jamdani-front.jpg", alt: "Navy Jamdani - Front", isPrimary: true, angle: "front" },
          { id: "img-009-b", url: "/images/products/navy-jamdani-closeup.jpg", alt: "Navy Jamdani - Close Up", isPrimary: false, angle: "closeup" },
        ],
      },
    ],
    defaultVariantId: "var-009-navy",
    isNew: false,
    isBestseller: false,
    isFeatured: false,
    isAvailable: true,
    isMadeToOrder: false,
    collectionIds: ["col-003"],
    relatedProductIds: ["prod-007", "prod-008"],
    createdAt: "2024-02-20T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
  },

  // ── OFFICE DRAPES ──
  {
    id: "prod-010",
    slug: "steel-blue-crepe-silk",
    name: "Steel Blue Crepe Silk",
    description:
      "Structured, elegant, and entirely no-nonsense, this steel blue crepe silk saree is designed for the woman who runs the meeting and still looks effortless doing it. Minimal border, fluid drape, zero fuss.",
    shortDescription:
      "Steel blue crepe silk with minimal border. Structured, professional, effortlessly elegant.",
    price: 6800,
    fabric: "crepe",
    weave: "plain",
    occasion: ["office", "casual"],
    region: "Surat, Gujarat",
    careInstructions: [
      "Dry clean recommended",
      "Hand wash with cold water if needed",
      "Do not wring",
      "Hang to dry",
    ],
    length: 5.5,
    blouse: {
      included: true,
      fabricMetres: 0.8,
      stitchingAvailable: true,
      stitchingPrice: 700,
    },
    variants: [
      {
        id: "var-010-steel-blue",
        colour: "Steel Blue",
        colourHex: "#4682B4",
        stock: 12,
        images: [
          { id: "img-010-a", url: "/images/products/steelblue-crepe-front.jpg", alt: "Steel Blue Crepe - Front", isPrimary: true, angle: "front" },
        ],
      },
      {
        id: "var-010-charcoal",
        colour: "Charcoal",
        colourHex: "#1E1E1E",
        stock: 10,
        images: [
          { id: "img-010-b", url: "/images/products/charcoal-crepe-front.jpg", alt: "Charcoal Crepe - Front", isPrimary: true, angle: "front" },
        ],
      },
      {
        id: "var-010-wine",
        colour: "Wine",
        colourHex: "#722F37",
        stock: 8,
        images: [
          { id: "img-010-c", url: "/images/products/wine-crepe-front.jpg", alt: "Wine Crepe - Front", isPrimary: true, angle: "front" },
        ],
      },
    ],
    defaultVariantId: "var-010-steel-blue",
    isNew: true,
    isBestseller: false,
    isFeatured: true,
    isAvailable: true,
    isMadeToOrder: false,
    collectionIds: ["col-004", "col-005"],
    relatedProductIds: ["prod-011", "prod-012"],
    createdAt: "2024-03-01T00:00:00Z",
    updatedAt: "2024-03-10T00:00:00Z",
  },
  {
    id: "prod-011",
    slug: "ivory-chanderi-silk-office",
    name: "Ivory Chanderi Office Drape",
    description:
      "This ivory chanderi silk saree with fine silver zari stripes is the kind of elegant restraint that commands respect. Sheer yet structured, it drapes beautifully and keeps its shape through long days. The boardroom just got a wardrobe upgrade.",
    shortDescription:
      "Ivory Chanderi silk with silver zari stripes. Sheer, structured, boardroom-ready.",
    price: 7800,
    fabric: "chanderi",
    weave: "chanderi",
    occasion: ["office", "casual"],
    region: "Chanderi, Madhya Pradesh",
    careInstructions: [
      "Dry clean only",
      "Store with blue tissue paper to maintain ivory tone",
      "Iron on low heat",
    ],
    length: 5.5,
    blouse: {
      included: true,
      fabricMetres: 0.8,
      stitchingAvailable: true,
      stitchingPrice: 800,
    },
    variants: [
      {
        id: "var-011-ivory",
        colour: "Ivory",
        colourHex: "#FFFFF0",
        stock: 7,
        images: [
          { id: "img-011-a", url: "/images/products/ivory-chanderi-office-front.jpg", alt: "Ivory Chanderi Office - Front", isPrimary: true, angle: "front" },
          { id: "img-011-b", url: "/images/products/ivory-chanderi-office-back.jpg", alt: "Ivory Chanderi Office - Back", isPrimary: false, angle: "back" },
        ],
      },
    ],
    defaultVariantId: "var-011-ivory",
    isNew: false,
    isBestseller: true,
    isFeatured: false,
    isAvailable: true,
    isMadeToOrder: false,
    collectionIds: ["col-004"],
    relatedProductIds: ["prod-010", "prod-012"],
    createdAt: "2024-01-30T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
  },
  {
    id: "prod-012",
    slug: "made-to-order-banarasi-brocade",
    name: "Made to Order — Banarasi Brocade",
    description:
      "Can't find exactly what you're envisioning? Our made-to-order Banarasi brocade sarees are woven specifically to your colour and motif preferences by our Varanasi weaver partners. Takes 3–4 weeks, but some things are worth the wait.",
    shortDescription:
      "Customised Banarasi brocade woven to your specifications. 3–4 week delivery.",
    price: 35000,
    fabric: "silk",
    weave: "banarasi",
    occasion: ["bridal", "festive", "reception"],
    region: "Varanasi",
    careInstructions: [
      "Dry clean only",
      "Store in muslin cloth",
      "Avoid direct sunlight",
    ],
    length: 6.3,
    blouse: {
      included: true,
      fabricMetres: 1,
      stitchingAvailable: true,
      stitchingPrice: 1500,
      availableSizes: ["XS", "S", "M", "L", "XL", "XXL", "custom"],
    },
    variants: [
      {
        id: "var-012-custom",
        colour: "Custom",
        colourHex: "#F2A7BC",
        stock: 99,
        images: [
          { id: "img-012-a", url: "/images/products/mto-banarasi-sample.jpg", alt: "Made to Order Banarasi - Sample", isPrimary: true, angle: "front" },
        ],
      },
    ],
    defaultVariantId: "var-012-custom",
    isNew: false,
    isBestseller: false,
    isFeatured: false,
    isAvailable: true,
    isMadeToOrder: true,
    collectionIds: ["col-004"],
    relatedProductIds: ["prod-001", "prod-002"],
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
  },
];


// ─────────────────────────────────────────────────────────────
// 3. TESTIMONIALS
// ─────────────────────────────────────────────────────────────

export const testimonials: Testimonial[] = [
  {
    id: "test-001",
    authorName: "Priya Sharma",
    authorLocation: "Mumbai",
    authorAvatar: "/images/avatars/priya.jpg",
    quote:
      "I wore the Crimson Banarasi for my reception and the compliments haven't stopped. The quality is absolutely unmatched — you can feel the craftsmanship in every thread.",
    rating: 5,
    productId: "prod-001",
    isFeatured: true,
  },
  {
    id: "test-002",
    authorName: "Lakshmi Venkat",
    authorLocation: "Bangalore",
    authorAvatar: "/images/avatars/lakshmi.jpg",
    quote:
      "Ordered the Ivory Kanjeevaram for my daughter's wedding. House of Fashion got the blouse stitched perfectly to her measurements. Absolutely gorgeous. Will definitely order again.",
    rating: 5,
    productId: "prod-002",
    isFeatured: true,
  },
  {
    id: "test-003",
    authorName: "Ritu Agarwal",
    authorLocation: "Delhi",
    authorAvatar: "/images/avatars/ritu.jpg",
    quote:
      "The sage linen is my go-to office saree now. It's so easy to drape and looks incredibly polished. I've worn it four times already and it still looks brand new.",
    rating: 5,
    productId: "prod-008",
    isFeatured: true,
  },
  {
    id: "test-004",
    authorName: "Anjali Nair",
    authorLocation: "Kochi",
    authorAvatar: "/images/avatars/anjali.jpg",
    quote:
      "The customisation service is a game changer. I described exactly what I wanted and they delivered something even better than I imagined. The WhatsApp updates throughout the process were a lovely touch.",
    rating: 5,
    isFeatured: true,
  },
  {
    id: "test-005",
    authorName: "Meera Iyer",
    authorLocation: "Chennai",
    quote:
      "Bought the Paithani for Diwali and received so many compliments. Packaging was beautiful — felt like opening a gift. Shipping was faster than expected too.",
    rating: 4,
    productId: "prod-003",
    isFeatured: false,
  },
];


// ─────────────────────────────────────────────────────────────
// 4. NAVIGATION LINKS
// ─────────────────────────────────────────────────────────────

export const navLinks: NavLink[] = [
  {
    label: "Collections",
    href: "/collections",
    children: [
      { label: "All Sarees", href: "/collections" },
      { label: "Bridal Edit", href: "/collections/bridal-edit" },
      { label: "Festive Picks", href: "/collections/festive-picks" },
      { label: "Everyday Silks", href: "/collections/everyday-silks" },
      { label: "Office Drapes", href: "/collections/office-drapes" },
    ],
  },
  {
    label: "New Arrivals",
    href: "/collections/new-arrivals",
    badge: "New",
  },
  {
    label: "Bridal",
    href: "/bridal",
  },
  {
    label: "Customise",
    href: "/customise",
  },
  {
    label: "About",
    href: "/about",
  },
];


// ─────────────────────────────────────────────────────────────
// 5. FILTER OPTIONS
// ─────────────────────────────────────────────────────────────

export const fabricFilterOptions: FilterOption[] = [
  { label: "Silk", value: "silk", count: 5 },
  { label: "Cotton", value: "cotton", count: 1 },
  { label: "Chanderi", value: "chanderi", count: 2 },
  { label: "Georgette", value: "georgette", count: 1 },
  { label: "Crepe", value: "crepe", count: 1 },
  { label: "Linen", value: "linen", count: 1 },
  { label: "Tussar", value: "tussar", count: 1 },
];

export const occasionFilterOptions: FilterOption[] = [
  { label: "Bridal", value: "bridal", count: 4 },
  { label: "Festive", value: "festive", count: 6 },
  { label: "Casual", value: "casual", count: 5 },
  { label: "Office", value: "office", count: 4 },
  { label: "Party", value: "party", count: 3 },
  { label: "Mehendi", value: "mehendi", count: 2 },
  { label: "Sangeet", value: "sangeet", count: 1 },
];

export const weaveFilterOptions: FilterOption[] = [
  { label: "Banarasi", value: "banarasi", count: 3 },
  { label: "Kanjeevaram", value: "kanjeevaram", count: 1 },
  { label: "Chanderi", value: "chanderi", count: 2 },
  { label: "Paithani", value: "paithani", count: 1 },
  { label: "Pochampally", value: "pochampally", count: 1 },
  { label: "Bandhani", value: "bandhani", count: 1 },
  { label: "Jamdani", value: "jamdani", count: 1 },
  { label: "Plain / Other", value: "plain", count: 3 },
];


// ─────────────────────────────────────────────────────────────
// 6. HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────

/** Get a single product by slug */
export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

/** Get a single collection by slug */
export const getCollectionBySlug = (slug: string): Collection | undefined =>
  collections.find((c) => c.slug === slug);

/** Get all products in a collection */
export const getProductsByCollection = (collectionId: string): Product[] =>
  products.filter((p) => p.collectionIds.includes(collectionId));

/** Get featured collections */
export const getFeaturedCollections = (): Collection[] =>
  collections.filter((c) => c.isFeatured);

/** Get bestseller products */
export const getBestsellers = (): Product[] =>
  products.filter((p) => p.isBestseller);

/** Get new arrival products */
export const getNewArrivals = (): Product[] =>
  products.filter((p) => p.isNew);

/** Get featured products */
export const getFeaturedProducts = (): Product[] =>
  products.filter((p) => p.isFeatured);

/** Get related products for a given product */
export const getRelatedProducts = (product: Product): Product[] =>
  products.filter((p) => product.relatedProductIds.includes(p.id));

/** Format price in INR */
export const formatPrice = (price: number): string =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);