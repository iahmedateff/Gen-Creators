"use client";

import { usePathname } from 'next/navigation';
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BookingProvider } from "@/providers/BookingProvider";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <BookingProvider>
      {!isAdminPage && <Navbar />}
      {children}
      {!isAdminPage && <Footer />}
    </BookingProvider>
  );
}
