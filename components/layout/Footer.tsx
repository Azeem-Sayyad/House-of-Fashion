// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Footer
// components/layout/Footer.tsx
// ─────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────

const footerLinks = {
  collections: [
    { label: "All Sarees", href: "/collections" },
    { label: "Bridal Edit", href: "/collections/bridal-edit" },
    { label: "Festive Picks", href: "/collections/festive-picks" },
    { label: "Everyday Silks", href: "/collections/everyday-silks" },
    { label: "Office Drapes", href: "/collections/office-drapes" },
    { label: "New Arrivals", href: "/collections/new-arrivals" },
  ],
  services: [
    { label: "Custom Blouse Stitching", href: "/customise" },
    { label: "Request Customisation", href: "/customise" },
    { label: "Bridal Consultation", href: "/bridal" },
    { label: "Styling Advice", href: "https://wa.me/919999999999" },
  ],
  info: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Shipping Policy", href: "/shipping" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "Size Guide", href: "/size-guide" },
    { label: "Care Instructions", href: "/care" },
  ],
};

const paymentMethods = [
  { name: "UPI", label: "UPI" },
  { name: "Visa", label: "Visa" },
  { name: "Mastercard", label: "MC" },
  { name: "RuPay", label: "RuPay" },
  { name: "Net Banking", label: "NetBanking" },
  { name: "COD", label: "COD" },
];

// ─────────────────────────────────────────────────────────────
// INSTAGRAM ICON
// ─────────────────────────────────────────────────────────────

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.139.566 4.148 1.55 5.888L0 24l6.304-1.524A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.034-1.388l-.36-.214-3.742.904.944-3.641-.235-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────
// NEWSLETTER FORM
// ─────────────────────────────────────────────────────────────

function NewsletterForm() {
  return (
    <div>
      <p className="text-sm text-brand-gray mb-3 font-body">
        New arrivals, exclusive offers, styling inspiration — straight to your inbox.
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Your email address"
          className="
            input-field flex-1 py-2.5 px-4 text-sm
            bg-brand-charcoal-soft border-brand-charcoal-soft
            text-white placeholder:text-brand-gray
            focus:border-brand-pink
          "
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
        <button className="btn btn-primary py-2.5 px-5 text-xs shrink-0">
          Subscribe
        </button>
      </div>
      <p className="text-[0.7rem] text-brand-gray mt-2 font-body">
        No spam. Unsubscribe anytime. We promise.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FOOTER COLUMN
// ─────────────────────────────────────────────────────────────

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="
        text-white text-xs font-medium tracking-widest uppercase
        font-body mb-4
      ">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              target={link.href.startsWith("https") ? "_blank" : undefined}
              rel={link.href.startsWith("https") ? "noopener noreferrer" : undefined}
              className="
                text-brand-gray hover:text-brand-pink
                text-sm font-body transition-colors duration-200
              "
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN FOOTER COMPONENT
// ─────────────────────────────────────────────────────────────

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-charcoal text-brand-gray">

      {/* ── Top Strip — Social proof ── */}
      <div className="border-b border-white/10">
        <div className="container-site py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "500+", label: "Handwoven Sarees" },
              { value: "12+", label: "Weave Traditions" },
              { value: "1000+", label: "Happy Customers" },
              { value: "5★", label: "Average Rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-heading font-medium text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-body tracking-wide text-brand-gray">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Footer Content ── */}
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* ── Brand Column ── */}
          <div className="lg:col-span-2">
            <Link href="/" aria-label="House of Fashion Boutique — Home">
              <Image
                src="/logo.png"
                alt="House of Fashion Boutique"
                width={140}
                height={48}
                className="h-12 w-auto object-contain brightness-0 invert mb-6"
              />
            </Link>

            <p className="text-sm text-brand-gray font-body leading-relaxed mb-6 max-w-xs">
              Handcrafted sarees from master weavers across India — Banarasi,
              Kanjeevaram, Paithani, and more. Every saree tells a story worth
              wearing.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 mb-8">
              <a
                href="https://www.instagram.com/house_of_fashion_boutique121"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="House of Fashion on Instagram"
                className="
                  w-9 h-9 rounded-full flex items-center justify-center
                  bg-white/8 text-brand-gray
                  hover:bg-brand-pink hover:text-white
                  transition-all duration-250
                "
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <InstagramIcon />
              </a>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="
                  w-9 h-9 rounded-full flex items-center justify-center
                  text-brand-gray
                  hover:bg-[#25D366] hover:text-white
                  transition-all duration-250
                "
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <WhatsAppIcon />
              </a>
            </div>

            {/* Newsletter */}
            <NewsletterForm />
          </div>

          {/* ── Link Columns ── */}
          <FooterColumn title="Collections" links={footerLinks.collections} />
          <FooterColumn title="Services" links={footerLinks.services} />
          <FooterColumn title="Information" links={footerLinks.info} />
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/10">
        <div className="container-site py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* Copyright */}
            <p className="text-xs text-brand-gray font-body text-center sm:text-left">
              © {currentYear} House of Fashion Boutique. All rights reserved.
              <span className="mx-2 opacity-30">·</span>
              <Link href="/privacy" className="hover:text-brand-pink transition-colors">
                Privacy Policy
              </Link>
              <span className="mx-2 opacity-30">·</span>
              <Link href="/terms" className="hover:text-brand-pink transition-colors">
                Terms of Service
              </Link>
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="text-[0.65rem] text-brand-gray uppercase tracking-widest mr-1">
                We accept
              </span>
              {paymentMethods.map((method) => (
                <span
                  key={method.name}
                  className="
                    px-2.5 py-1 rounded text-[0.65rem] font-medium
                    text-brand-gray border border-white/10
                    font-body tracking-wide
                  "
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  {method.label}
                </span>
              ))}
            </div>

          </div>
        </div>
      </div>

    </footer>
  );
}