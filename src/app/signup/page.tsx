"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    // Supabase auth signup
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        }
      }
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="bg-white dark:bg-[#111] p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200 dark:border-white/10 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
            ✓
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">تم إنشاء الحساب بنجاح!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            يرجى مراجعة بريدك الإلكتروني لتفعيل الحساب.
          </p>
          <Link href="/login">
            <Button className="w-full text-lg">الذهاب لتسجيل الدخول</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4 pb-12">
      <div className="bg-white dark:bg-[#111] p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200 dark:border-white/10">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">إنشاء حساب جديد</h1>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">الاسم بالكامل</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#1a1a1a] text-gray-900 dark:text-white outline-none focus:border-[#ff5e00] transition-colors"
              placeholder="أدخل اسمك بالكامل"
            />
          </div>

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
              minLength={6}
              placeholder="أدخل كلمة المرور"
            />
          </div>

          <Button type="submit" className="w-full text-lg" disabled={loading}>
            {loading ? "جاري الإنشاء..." : "إنشاء حساب"}
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
          لديك حساب بالفعل؟ <Link href="/login" className="text-[#ff5e00] font-bold hover:underline">سجل دخولك الآن</Link>
        </p>
      </div>
    </div>
  );
}
