"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="bg-white dark:bg-[#111] p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200 dark:border-white/10">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">تسجيل الدخول</h1>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">البريد الإلكتروني</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#1a1a1a] text-gray-900 dark:text-white outline-none focus:border-[#ff5e00] transition-colors"
              placeholder="أدخل بريدك الإلكتروني"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">كلمة المرور</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#1a1a1a] text-gray-900 dark:text-white outline-none focus:border-[#ff5e00] transition-colors"
              placeholder="أدخل كلمة المرور"
            />
          </div>

          <Button type="submit" className="w-full text-lg" disabled={loading}>
            {loading ? "جاري الدخول..." : "دخول"}
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
          ليس لديك حساب؟ <Link href="/signup" className="text-[#ff5e00] font-bold hover:underline">أنشئ حسابك الآن</Link>
        </p>
      </div>
    </div>
  );
}
