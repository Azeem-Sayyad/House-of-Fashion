"use client";

import { useCart } from "@/context/CartContext";

export default function PageContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { drawerOpen } = useCart();

  return (
    <main
      id="main-content"
      className={`transition-all duration-350 ${
        drawerOpen ? "blur-sm brightness-75 pointer-events-none" : ""
      }`}
    >
      {children}
    </main>
  );
}