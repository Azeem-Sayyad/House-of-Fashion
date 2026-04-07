// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Variant Stock API
// app/api/variants/[id]/stock/route.ts
//
// PATCH — set stock to a specific number (for admin edits)
// ─────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { stock } = body;

    // Validate
    if (typeof stock !== "number" || stock < 0 || !Number.isInteger(stock)) {
      return NextResponse.json(
        { success: false, message: "Stock must be a non-negative integer" },
        { status: 400 }
      );
    }

    // Use admin client to bypass RLS for writes
    const { data, error } = await supabaseAdmin
      .from("product_variants")
      .update({ stock })
      .eq("id", params.id)
      .select("id, stock, colour, product_id")
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Variant not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// GET — check current stock for a variant
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabaseAdmin
      .from("product_variants")
      .select("id, stock, colour, product_id")
      .eq("id", params.id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { success: false, message: "Variant not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}