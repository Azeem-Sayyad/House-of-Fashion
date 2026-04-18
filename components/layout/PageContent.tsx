"use client";

import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";

export default function PageContent({ children }: { children: React.ReactNode }) {
  const { drawerOpen } = useCart();
  const { mobileMenuOpen } = useUI();

  const shouldBlur = drawerOpen || mobileMenuOpen;

  return (
    <main
      id="main-content"
      className={`transition-all duration-350 ${
        shouldBlur ? "blur-sm brightness-75 pointer-events-none" : ""
      }`}
    >
      {children}
    </main>
  );
}