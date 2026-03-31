// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — TypeScript Interfaces
// lib/types.ts
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// 1. ENUMS & UNION TYPES
// ─────────────────────────────────────────────────────────────

export type OccasionType =
  | "bridal"
  | "festive"
  | "casual"
  | "office"
  | "party"
  | "reception"
  | "mehendi"
  | "sangeet";

export type FabricType =
  | "silk"
  | "cotton"
  | "georgette"
  | "chiffon"
  | "linen"
  | "crepe"
  | "organza"
  | "net"
  | "velvet"
  | "chanderi"
  | "tussar";

export type WeaveType =
  | "banarasi"
  | "kanjeevaram"
  | "chanderi"
  | "paithani"
  | "pochampally"
  | "sambalpuri"
  | "tant"
  | "bandhani"
  | "leheriya"
  | "jamdani"
  | "plain";

export type BlouseSize =
  | "XS"
  | "S"
  | "M"
  | "L"
  | "XL"
  | "XXL"
  | "custom";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentMethod =
  | "upi"
  | "card"
  | "net_banking"
  | "emi"
  | "cod"
  | "wallet";

export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded";

export type CustomisationStatus =
  | "submitted"
  | "under_review"
  | "approved"
  | "in_progress"
  | "ready"
  | "delivered";


// ─────────────────────────────────────────────────────────────
// 2. PRODUCT
// ─────────────────────────────────────────────────────────────

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  angle?: "front" | "back" | "drape" | "closeup" | "detail";
}

export interface ProductVariant {
  id: string;
  colour: string;          // e.g. "Midnight Blue"
  colourHex: string;       // e.g. "#1a1a4e"
  stock: number;
  images: ProductImage[];
}

export interface BlouseInfo {
  included: boolean;               // Is unstitched blouse piece included?
  fabricMetres?: number;           // e.g. 0.8
  stitchingAvailable: boolean;     // Can we stitch it?
  stitchingPrice?: number;         // Extra charge for stitching
  availableSizes?: BlouseSize[];
}

export interface Product {
  id: string;
  slug: string;                    // URL-friendly identifier
  name: string;
  description: string;
  shortDescription: string;        // For cards / listing pages

  // Pricing
  price: number;                   // In INR
  originalPrice?: number;          // If on sale
  discount?: number;               // Percentage discount

  // Classification
  fabric: FabricType;
  weave: WeaveType;
  occasion: OccasionType[];
  region: string;                  // e.g. "Varanasi", "Kanchipuram"
  careInstructions: string[];

  // Saree dimensions
  length: number;                  // In metres, typically 5.5 or 6
  width?: number;                  // In cm

  // Blouse
  blouse: BlouseInfo;

  // Variants & images
  variants: ProductVariant[];
  defaultVariantId: string;

  // Status flags
  isNew: boolean;
  isBestseller: boolean;
  isFeatured: boolean;
  isAvailable: boolean;
  isMadeToOrder: boolean;

  // SEO
  metaTitle?: string;
  metaDescription?: string;

  // Relations
  collectionIds: string[];
  relatedProductIds: string[];

  // Timestamps
  createdAt: string;
  updatedAt: string;
}


// ─────────────────────────────────────────────────────────────
// 3. COLLECTION
// ─────────────────────────────────────────────────────────────

export interface Collection {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  coverImage: string;
  occasion?: OccasionType;
  isFeatured: boolean;
  productIds: string[];
  createdAt: string;
}


// ─────────────────────────────────────────────────────────────
// 4. CART
// ─────────────────────────────────────────────────────────────

export interface CartItem {
  id: string;                      // Unique cart line ID
  productId: string;
  variantId: string;
  name: string;
  image: string;
  colour: string;
  price: number;
  quantity: number;                // Usually 1 for sarees
  blouseStitching: boolean;
  blouseSize?: BlouseSize;
  customBlouseMeasurements?: BlouseMeasurements;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shippingCharge: number;
  discount: number;
  couponCode?: string;
  total: number;
}


// ─────────────────────────────────────────────────────────────
// 5. WISHLIST
// ─────────────────────────────────────────────────────────────

export interface WishlistItem {
  productId: string;
  variantId: string;
  addedAt: string;
}

export interface Wishlist {
  items: WishlistItem[];
}


// ─────────────────────────────────────────────────────────────
// 6. USER & ADDRESS
// ─────────────────────────────────────────────────────────────

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  addresses: Address[];
  wishlist: WishlistItem[];
  loyaltyPoints: number;
  createdAt: string;
}


// ─────────────────────────────────────────────────────────────
// 7. ORDER
// ─────────────────────────────────────────────────────────────

export interface OrderItem {
  productId: string;
  variantId: string;
  name: string;
  image: string;
  colour: string;
  price: number;
  quantity: number;
  blouseStitching: boolean;
  blouseSize?: BlouseSize;
}

export interface Order {
  id: string;
  orderNumber: string;             // Human-readable e.g. "HOF-2024-00147"
  userId?: string;                 // Optional — guest checkout
  items: OrderItem[];
  shippingAddress: Address;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  subtotal: number;
  shippingCharge: number;
  discount: number;
  total: number;
  couponCode?: string;
  notes?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}


// ─────────────────────────────────────────────────────────────
// 8. CUSTOMISATION REQUEST
// ─────────────────────────────────────────────────────────────

export interface BlouseMeasurements {
  bust: number;                    // In inches
  waist: number;
  hips: number;
  shoulderWidth: number;
  sleeveLength: number;
  blouseLength: number;
  neckDepthFront: number;
  neckDepthBack: number;
}

export interface CustomisationRequest {
  id: string;
  name: string;
  phone: string;
  email?: string;
  productReference?: string;       // Existing product as base reference
  description: string;             // What they want customised
  fabric?: FabricType;
  occasion?: OccasionType;
  colourPreference?: string;
  budgetRange?: string;            // e.g. "₹5,000 - ₹10,000"
  measurements?: BlouseMeasurements;
  referenceImages?: string[];      // URLs of uploaded reference images
  status: CustomisationStatus;
  adminNotes?: string;
  quotedPrice?: number;
  timeline?: string;               // e.g. "15-20 working days"
  createdAt: string;
  updatedAt: string;
}


// ─────────────────────────────────────────────────────────────
// 9. REVIEW & TESTIMONIAL
// ─────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  productId: string;
  userId?: string;
  authorName: string;
  authorAvatar?: string;
  rating: number;                  // 1-5
  title?: string;
  body: string;
  images?: string[];               // Customer photos
  fabricRating?: number;
  valueRating?: number;
  isVerifiedPurchase: boolean;
  isApproved: boolean;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  authorName: string;
  authorLocation: string;
  authorAvatar?: string;
  quote: string;
  rating: number;
  productId?: string;              // Optional link to product
  isFeatured: boolean;
}


// ─────────────────────────────────────────────────────────────
// 10. FILTER & SORT
// ─────────────────────────────────────────────────────────────

export interface FilterState {
  fabric: FabricType[];
  weave: WeaveType[];
  occasion: OccasionType[];
  priceRange: [number, number];
  colour: string[];
  region: string[];
  isNew: boolean;
  isBestseller: boolean;
  isMadeToOrder: boolean;
}

export type SortOption =
  | "newest"
  | "price_asc"
  | "price_desc"
  | "bestselling"
  | "rating";

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}


// ─────────────────────────────────────────────────────────────
// 11. NAVIGATION
// ─────────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
  badge?: string;                  // e.g. "New"
}


// ─────────────────────────────────────────────────────────────
// 12. API RESPONSE WRAPPERS
// ─────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}