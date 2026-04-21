"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import BookingModal from '@/components/ui/BookingModal';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface BookingContextType {
  openBooking: (itemTitle: string, price: number) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const openBooking = (itemTitle: string, price: number) => {
    if (!user) {
      router.push('/login');
      return;
    }
    setSelectedItem(itemTitle);
    setSelectedPrice(price);
    setIsOpen(true);
  };

  const closeBooking = () => setIsOpen(false);

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}
      <BookingModal 
        isOpen={isOpen} 
        onClose={closeBooking} 
        selectedItem={selectedItem} 
        price={selectedPrice}
      />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
