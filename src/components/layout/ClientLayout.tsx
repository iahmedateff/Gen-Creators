"use client";

import { usePathname } from 'next/navigation';
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BookingProvider } from "@/providers/BookingProvider";
import ChatBot from "@/components/ui/ChatBot";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <BookingProvider>
      {!isAdminPage && <Navbar />}
      <main className="min-h-screen">
        {children}
      </main>
      {!isAdminPage && <Footer />}
      {!isAdminPage && <ChatBot />}
    </BookingProvider>
  );
}
