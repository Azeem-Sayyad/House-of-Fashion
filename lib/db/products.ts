// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Database Query Functions
// lib/db/products.ts
//
// Replaces the static helper functions in data/products.ts.
// All functions fetch from Supabase instead of the mock array.
// ─────────────────────────────────────────────────────────────

import { supabase } from "@/lib/supabase";
import { Product, Collection, ProductVariant, ProductImage } from "@/lib/types";

// ─────────────────────────────────────────────────────────────
// SHAPE HELPERS
// Supabase returns snake_case rows — map back to our camelCase types
// ─────────────────────────────────────────────────────────────

function shapeVariant(row: any, images: any[]): ProductVariant {
  return {
    id: row.id,
    colour: row.colour,
    colourHex: row.colour_hex,
    stock: row.stock,
    images: images
      .filter((img) => img.variant_id === row.id)
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((img) => ({
        id: img.id,
        url: img.url,
        alt: img.alt,
        isPrimary: img.is_primary,
        angle: img.angle,
      })),
  };
}

function shapeProduct(row: any, variants: ProductVariant[]): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    shortDescription: row.short_description,
    price: row.price,
    originalPrice: row.original_price ?? undefined,
    discount: row.discount ?? undefined,
    fabric: row.fabric,
    weave: row.weave,
    occasion: row.occasion ?? [],
    region: row.region,
    careInstructions: row.care_instructions ?? [],
    length: row.length,
    width: row.width ?? undefined,
    blouse: {
      included: row.blouse_included,
      fabricMetres: row.blouse_fabric_metres ?? undefined,
      stitchingAvailable: row.blouse_stitching_available,
      stitchingPrice: row.blouse_stitching_price ?? undefined,
      availableSizes: row.blouse_available_sizes ?? undefined,
    },
    variants,
    defaultVariantId: row.default_variant_id,
    isNew: row.is_new,
    isBestseller: row.is_bestseller,
    isFeatured: row.is_featured,
    isAvailable: row.is_available,
    isMadeToOrder: row.is_made_to_order,
    metaTitle: row.meta_title ?? undefined,
    metaDescription: row.meta_description ?? undefined,
    collectionIds: row.collection_ids ?? [],
    relatedProductIds: row.related_product_ids ?? [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function shapeCollection(row: any): Collection {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    coverImage: row.cover_image,
    occasion: row.occasion ?? undefined,
    isFeatured: row.is_featured,
    productIds: row.product_ids ?? [],
    createdAt: row.created_at,
  };
}

// ─────────────────────────────────────────────────────────────
// FETCH HELPERS — used internally to build full product objects
// ─────────────────────────────────────────────────────────────

async function fetchVariantsAndImages(productIds: string[]): Promise<{
  variantsByProduct: Record<string, ProductVariant[]>;
}> {
  // Fetch all variants for given product IDs
  const { data: variantRows, error: variantError } = await supabase
    .from("product_variants")
    .select("*")
    .in("product_id", productIds);

  if (variantError) throw variantError;
  if (!variantRows?.length) return { variantsByProduct: {} };

  const variantIds = variantRows.map((v) => v.id);

  // Fetch all images for those variants
  const { data: imageRows, error: imageError } = await supabase
    .from("product_images")
    .select("*")
    .in("variant_id", variantIds)
    .order("sort_order");

  if (imageError) throw imageError;

  // Group variants by product, attach images
  const variantsByProduct: Record<string, ProductVariant[]> = {};

  for (const varRow of variantRows) {
    const shaped = shapeVariant(varRow, imageRows ?? []);
    if (!variantsByProduct[varRow.product_id]) {
      variantsByProduct[varRow.product_id] = [];
    }
    variantsByProduct[varRow.product_id].push(shaped);
  }

  return { variantsByProduct };
}

// ─────────────────────────────────────────────────────────────
// PUBLIC QUERY FUNCTIONS
// ─────────────────────────────────────────────────────────────

/** Get all products */
export async function getAllProducts(): Promise<Product[]> {
  const { data: productRows, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  if (!productRows?.length) return [];

  const { variantsByProduct } = await fetchVariantsAndImages(
    productRows.map((p) => p.id)
  );

  return productRows.map((row) =>
    shapeProduct(row, variantsByProduct[row.id] ?? [])
  );
}

/** Get a single product by slug */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data: row, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !row) return null;

  const { variantsByProduct } = await fetchVariantsAndImages([row.id]);
  return shapeProduct(row, variantsByProduct[row.id] ?? []);
}

/** Get products by collection ID */
export async function getProductsByCollection(
  collectionId: string
): Promise<Product[]> {
  // Get the collection to find its product IDs
  const { data: col } = await supabase
    .from("collections")
    .select("product_ids")
    .eq("id", collectionId)
    .single();

  if (!col?.product_ids?.length) return [];

  const { data: productRows, error } = await supabase
    .from("products")
    .select("*")
    .in("id", col.product_ids);

  if (error || !productRows?.length) return [];

  const { variantsByProduct } = await fetchVariantsAndImages(
    productRows.map((p) => p.id)
  );

  return productRows.map((row) =>
    shapeProduct(row, variantsByProduct[row.id] ?? [])
  );
}

/** Get related products */
export async function getRelatedProducts(
  relatedIds: string[]
): Promise<Product[]> {
  if (!relatedIds.length) return [];

  const { data: productRows, error } = await supabase
    .from("products")
    .select("*")
    .in("id", relatedIds);

  if (error || !productRows?.length) return [];

  const { variantsByProduct } = await fetchVariantsAndImages(
    productRows.map((p) => p.id)
  );

  return productRows.map((row) =>
    shapeProduct(row, variantsByProduct[row.id] ?? [])
  );
}

/** Get featured products */
export async function getFeaturedProducts(): Promise<Product[]> {
  const { data: productRows, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true);

  if (error || !productRows?.length) return [];

  const { variantsByProduct } = await fetchVariantsAndImages(
    productRows.map((p) => p.id)
  );

  return productRows.map((row) =>
    shapeProduct(row, variantsByProduct[row.id] ?? [])
  );
}

/** Get bestseller products */
export async function getBestsellers(): Promise<Product[]> {
  const { data: productRows, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_bestseller", true);

  if (error || !productRows?.length) return [];

  const { variantsByProduct } = await fetchVariantsAndImages(
    productRows.map((p) => p.id)
  );

  return productRows.map((row) =>
    shapeProduct(row, variantsByProduct[row.id] ?? [])
  );
}

/** Get new arrival products */
export async function getNewArrivals(): Promise<Product[]> {
  const { data: productRows, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_new", true);

  if (error || !productRows?.length) return [];

  const { variantsByProduct } = await fetchVariantsAndImages(
    productRows.map((p) => p.id)
  );

  return productRows.map((row) =>
    shapeProduct(row, variantsByProduct[row.id] ?? [])
  );
}

/** Get all collections */
export async function getAllCollections(): Promise<Collection[]> {
  const { data, error } = await supabase
    .from("collections")
    .select("*")
    .order("created_at");

  if (error) throw error;
  return (data ?? []).map(shapeCollection);
}

/** Get featured collections */
export async function getFeaturedCollections(): Promise<Collection[]> {
  const { data, error } = await supabase
    .from("collections")
    .select("*")
    .eq("is_featured", true)
    .order("created_at");

  if (error) throw error;
  return (data ?? []).map(shapeCollection);
}

/** Get a single collection by slug */
export async function getCollectionBySlug(
  slug: string
): Promise<Collection | null> {
  const { data, error } = await supabase
    .from("collections")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return shapeCollection(data);
}

// ─────────────────────────────────────────────────────────────
// STOCK MANAGEMENT
// ─────────────────────────────────────────────────────────────

/** Update stock for a single variant */
export async function updateVariantStock(
  variantId: string,
  newStock: number
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from("product_variants")
    .update({ stock: newStock })
    .eq("id", variantId);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

/** Decrement stock by quantity — used when an order is placed */
export async function decrementStock(
  variantId: string,
  quantity: number
): Promise<{ success: boolean; error?: string }> {
  // Fetch current stock first
  const { data, error: fetchError } = await supabase
    .from("product_variants")
    .select("stock")
    .eq("id", variantId)
    .single();

  if (fetchError || !data) {
    return { success: false, error: "Variant not found" };
  }

  const newStock = Math.max(0, data.stock - quantity);

  const { error } = await supabase
    .from("product_variants")
    .update({ stock: newStock })
    .eq("id", variantId);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

/** Get current stock for a variant */
export async function getVariantStock(
  variantId: string
): Promise<number | null> {
  const { data, error } = await supabase
    .from("product_variants")
    .select("stock")
    .eq("id", variantId)
    .single();

  if (error || !data) return null;
  return data.stock;
}