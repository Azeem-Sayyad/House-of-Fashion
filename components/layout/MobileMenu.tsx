"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/data/products";
import { useUI } from "@/context/UIContext";

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M4 4L18 18M18 4L4 18" />
  </svg>
);

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M3 5l4 4 4-4" />
  </svg>
);

export default function MobileMenu() {
  const { mobileMenuOpen, setMobileMenuOpen } = useUI();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const onClose = () => setMobileMenuOpen(false);

  useEffect(() => {
    if (!mobileMenuOpen) setExpandedItem(null);
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 lg:hidden"
          style={{ background: "rgba(30, 30, 30, 0.45)", zIndex: 9998 }}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Slide-in panel */}
      <div
        className={`
          fixed inset-y-0 left-0 w-[85vw] max-w-sm
          bg-brand-white flex flex-col
          transition-transform duration-350
          lg:hidden
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{ zIndex: 9999 }}
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-blue-dark">
          <Link href="/" onClick={onClose}>
            <Image
              src="/logo.png"
              alt="House of Fashion Boutique"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
            />
          </Link>
          <button onClick={onClose} aria-label="Close menu" className="btn-ghost p-2">
            <CloseIcon />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {navLinks.map((link) => (
            <div key={link.href}>
              {link.children ? (
                <>
                  <button
                    onClick={() =>
                      setExpandedItem(expandedItem === link.label ? null : link.label)
                    }
                    className="
                      w-full flex items-center justify-between
                      px-4 py-3.5 rounded-soft
                      text-brand-charcoal font-medium font-body text-sm
                      hover:bg-brand-blue-light hover:text-brand-pink
                      transition-all duration-200
                    "
                  >
                    <span>{link.label}</span>
                    <span className={`transition-transform duration-200 ${expandedItem === link.label ? "rotate-180" : ""}`}>
                      <ChevronDown />
                    </span>
                  </button>
                  {expandedItem === link.label && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-brand-pink-light pl-4">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className="flex items-center gap-2 px-3 py-2.5 text-sm text-brand-charcoal-soft hover:text-brand-pink transition-colors duration-200"
                        >
                          {child.label}
                          {child.badge && (
                            <span className="badge badge-pink text-[0.6rem] py-0.5 px-2">{child.badge}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center gap-2 px-4 py-3.5 rounded-soft text-brand-charcoal font-medium font-body text-sm hover:bg-brand-blue-light hover:text-brand-pink transition-all duration-200"
                >
                  {link.label}
                  {link.badge && (
                    <span className="badge badge-pink text-[0.6rem] py-0.5 px-2">{link.badge}</span>
                  )}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div className="px-6 py-6 border-t border-brand-blue-dark space-y-3">
          <Link href="/customise" onClick={onClose} className="btn btn-primary w-full justify-center">
            Request Customisation
          </Link>
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline w-full justify-center"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}