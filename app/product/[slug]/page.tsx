// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Product Detail Page
// app/product/[slug]/page.tsx
// ─────────────────────────────────────────────────────────────

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getProductBySlug, getRelatedProducts } from "@/lib/db/products";
import { products } from "@/data/products"; // keep only for generateStaticParams for now
import { Product } from "@/lib/types";
import ProductImageGalleryWrapper from "@/components/product/ProductImageGalleryWrapper";
import RelatedProducts from "@/components/product/RelatedProducts";
import ProductInfo from "@/components/product/ProductInfo";

// ─────────────────────────────────────────────────────────────
// STATIC PARAMS — pre-render all product pages at build time
// ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

// ─────────────────────────────────────────────────────────────
// DYNAMIC METADATA — per-product SEO
// ─────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.metaTitle ?? product.name,
    description: product.metaDescription ?? product.shortDescription,
    openGraph: {
      title: product.metaTitle ?? product.name,
      description: product.metaDescription ?? product.shortDescription,
      images: [
        {
          url: product.variants[0]?.images.find((i) => i.isPrimary)?.url ?? "/images/og-cover.jpg",
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

// ─────────────────────────────────────────────────────────────
// BREADCRUMB — server component, no state needed
// ─────────────────────────────────────────────────────────────

function Breadcrumb({ productName }: { productName: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 text-xs font-body text-brand-gray flex-wrap">
        <li>
          <Link href="/" className="hover:text-brand-pink transition-colors">
            Home
          </Link>
        </li>
        <li aria-hidden="true" className="opacity-40">/</li>
        <li>
          <Link href="/collections" className="hover:text-brand-pink transition-colors">
            Collections
          </Link>
        </li>
        <li aria-hidden="true" className="opacity-40">/</li>
        <li className="text-brand-charcoal font-medium truncate max-w-50">
          {productName}
        </li>
      </ol>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────
// JSON-LD — Product structured data for Google Shopping
// ─────────────────────────────────────────────────────────────

function ProductStructuredData({ product }: { product: Product | null }) {
  if (!product) return null;

  const primaryImage = product.variants[0]?.images.find((i) => i.isPrimary)?.url;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: primaryImage ? [`https://houseoffashionboutique.com${primaryImage}`] : [],
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "House of Fashion Boutique",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability: product.isAvailable
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "House of Fashion Boutique",
      },
    },
    ...(product.isBestseller && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "47",
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const relatedProducts = await getRelatedProducts(product.relatedProductIds);

  return (
    <>
      {/* Structured data in head */}
      <ProductStructuredData product={product} />

      <div className="bg-brand-blue min-h-screen">
        <div className="container-site py-10 lg:py-16">

          {/* ── Breadcrumb ── */}
          <Breadcrumb productName={product.name} />

          {/* ── Main Product Layout ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 xl:gap-20 items-start">

            {/* ── LEFT: Image Gallery ── */}
            {/* Client wrapper handles variant state */}
            <div className="lg:sticky lg:top-28">
              <ProductImageGalleryWrapper product={product} />
            </div>

            {/* ── RIGHT: Info + Add to Cart ── */}
            <div className="flex flex-col gap-8">
              <ProductInfo product={product} />
              {/* AddToCart is embedded in ProductImageGalleryWrapper
                  to share variant state — see wrapper component */}
            </div>
          </div>

          {/* ── Related Products ── */}
          <RelatedProducts products={relatedProducts} />

        </div>
      </div>
    </>
  );
}