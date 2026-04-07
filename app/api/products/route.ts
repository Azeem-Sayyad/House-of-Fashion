// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Products API
// app/api/products/route.ts
// ─────────────────────────────────────────────────────────────

import { NextResponse } from "next/server";
import { getAllProducts } from "@/lib/db/products";

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json({ success: true, data: products });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}