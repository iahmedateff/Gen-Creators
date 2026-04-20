"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Menu, X, User } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check initial session
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const navLinks = [
    { name: 'الرئيسية', href: '/' },
    { name: 'الكورسات', href: '/#courses' },
    { name: 'المسارات', href: '/#tracks' },
    { name: 'آراء الطلاب', href: '/#testimonials' },
    { name: 'ليه إحنا؟', href: '/#why-us' },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-[#050505]/90 backdrop-blur-md border-b border-black/5 dark:border-white/10 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center pr-4 lg:pr-0 gap-6">
            <Link href="/" className="text-2xl font-bold flex items-center gap-1.5" dir="ltr">
              <span className="text-gradient">Gen</span>
              <span>Creators</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-3 mr-4">
              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors flex items-center justify-center border border-gray-200 dark:border-white/10"
                  >
                    <User size={18} />
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute top-full mt-2 left-0 w-48 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col z-50">
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#0a0a0a]">
                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                          {user.user_metadata?.full_name || "مستخدم"}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {user.email}
                        </p>
                      </div>
                      <div className="p-2">
                        <button 
                          onClick={() => { handleLogout(); setIsUserMenuOpen(false); }}
                          className="w-full text-right px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors font-medium flex items-center gap-2"
                        >
                          تسجيل الخروج
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="text-sm font-bold">Log In</Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm" className="text-sm">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />

          </div>

          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-50 dark:bg-[#0a0a0a] border-b border-black/5 dark:border-white/10">
          <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </Link>
            ))}
            <div className="px-3 pt-4 flex flex-col gap-2">
              {user ? (
                <>
                  <span className="text-gray-700 dark:text-gray-300 font-medium px-2 py-1 rounded-md text-center items-center justify-center flex border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 mb-2">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                  <Button variant="outline" className="w-full" onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}>تسجيل الخروج</Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                    <Button variant="outline" className="w-full">Log In</Button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
