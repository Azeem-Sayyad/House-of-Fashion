// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Single Product API
// app/api/products/[slug]/route.ts
// ─────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/db/products";

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const product = await getProductBySlug(params.slug);

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}