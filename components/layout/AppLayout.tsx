"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/CartDrawer";
import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <main className="flex-1 flex flex-col w-full h-screen overflow-auto">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col p-4 sm:p-8 gap-6 max-w-7xl mx-auto w-full">
        {children}
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
