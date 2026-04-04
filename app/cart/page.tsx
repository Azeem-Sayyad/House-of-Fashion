"use client";

// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Cart Page
// app/cart/page.tsx
// ─────────────────────────────────────────────────────────────

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartItemRow from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";

// ─────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────

const BagIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 20V16a8 8 0 0 1 16 0v4" />
    <rect x="6" y="20" width="36" height="24" rx="2" />
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.139.566 4.148 1.55 5.888L0 24l6.304-1.524A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.034-1.388l-.36-.214-3.742.904.944-3.641-.235-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────
// EMPTY STATE
// ─────────────────────────────────────────────────────────────

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center mb-8 text-brand-gray"
        style={{ background: "var(--color-blue-light)" }}
      >
        <BagIcon />
      </div>

      <h2 className="font-heading font-medium text-brand-charcoal text-3xl mb-3">
        Your bag is empty
      </h2>
      <p className="text-brand-gray font-body text-sm mb-10 max-w-sm">
        Looks like you haven't added any sarees yet. Browse our collections
        and find something worth wearing.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/collections"
          className="btn btn-primary gap-2 px-8 py-3.5 text-sm"
        >
          Browse All Sarees
          <ArrowRight />
        </Link>
        <Link
          href="/collections/bridal-edit"
          className="btn btn-outline gap-2 px-8 py-3.5 text-sm"
        >
          Bridal Edit
        </Link>
      </div>

      {/* WhatsApp assist */}
      <div className="mt-12 pt-8 border-t border-brand-blue-dark w-full max-w-md">
        <p className="text-xs text-brand-gray font-body mb-3">
          Need help choosing? We'll shortlist sarees for you.
        </p>
        <a
          href="https://wa.me/919999999999?text=Hi!%20I%20need%20help%20choosing%20a%20saree."
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline gap-2 text-xs py-2.5 px-5 text-[#25D366] border-[#25D366] hover:bg-[#25D366] hover:text-white"
        >
          <WhatsAppIcon />
          Chat with us on WhatsApp
        </a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────

export default function CartPage() {
  const { items, isEmpty, itemCount, clearCart } = useCart();

  return (
    <div className="bg-brand-blue min-h-screen">
      <div className="container-site py-10 lg:py-16">

        {/* ── Page Header ── */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="section-label mb-1">Your Selection</p>
            <h1
              className="font-heading font-medium text-brand-charcoal"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Shopping{" "}
              <span className="text-gradient-pink italic">Bag</span>
            </h1>
          </div>

          {/* Item count + clear */}
          {!isEmpty && (
            <div className="flex items-center gap-4">
              <p className="text-sm font-body text-brand-gray hidden sm:block">
                {itemCount} item{itemCount !== 1 ? "s" : ""}
              </p>
              <button
                onClick={clearCart}
                className="text-xs font-body text-brand-gray hover:text-red-400 transition-colors underline underline-offset-2"
              >
                Clear bag
              </button>
            </div>
          )}
        </div>

        {isEmpty ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">

            {/* ── LEFT: Cart Items ── */}
            <div className="bg-brand-white rounded-card shadow-card px-6 py-2">

              {/* Column headers — desktop only */}
              <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto] gap-4 pb-3 border-b border-brand-blue-dark text-[0.65rem] text-brand-gray font-body tracking-widest uppercase">
                <span>Product</span>
                <span className="text-center w-24">Quantity</span>
                <span className="text-right w-24">Total</span>
                <span className="w-16" />
              </div>

              {/* Items */}
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} compact={false} />
              ))}

              {/* Bottom: continue shopping */}
              <div className="pt-4 pb-2">
                <Link
                  href="/collections"
                  className="text-xs font-body font-medium text-brand-pink hover:underline underline-offset-2 flex items-center gap-1"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* ── RIGHT: Order Summary ── */}
            <div className="lg:sticky lg:top-28">
              <CartSummary />

              {/* WhatsApp order option */}
              <div
                className="mt-4 p-4 rounded-card border border-brand-blue-dark flex items-start gap-3"
                style={{ background: "var(--color-blue-light)" }}
              >
                <span className="text-[#25D366] mt-0.5 shrink-0">
                  <WhatsAppIcon />
                </span>
                <div>
                  <p className="text-xs font-body font-medium text-brand-charcoal mb-0.5">
                    Prefer to order via WhatsApp?
                  </p>
                  <p className="text-[0.65rem] text-brand-gray font-body mb-2">
                    Our team will confirm your order, assist with stitching, and handle payment personally.
                  </p>
                  <a
                    href="https://wa.me/919999999999?text=Hi!%20I%20want%20to%20place%20an%20order."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.65rem] font-body font-medium text-[#25D366] hover:underline underline-offset-2"
                  >
                    Message us →
                  </a>
                </div>
              </div>

              {/* Trust strip */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                {[
                  { icon: "🔒", text: "Secure checkout" },
                  { icon: "↩️", text: "7-day returns" },
                  { icon: "🚚", text: "Free shipping ₹2K+" },
                  { icon: "✂️", text: "Blouse stitching" },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-2 p-2.5 rounded-soft bg-brand-white shadow-card"
                  >
                    <span className="text-sm">{item.icon}</span>
                    <span className="text-[0.65rem] font-body text-brand-gray">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}