// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Supabase Client
// lib/supabase.ts
// ─────────────────────────────────────────────────────────────

import { createClient } from "@supabase/supabase-js";

// ── Browser client — for use in Client Components ──
// Uses the anon key, respects Row Level Security
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ── Server client — for use in API routes and Server Components ──
// Uses the service role key, bypasses Row Level Security
// Never expose this to the browser
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);