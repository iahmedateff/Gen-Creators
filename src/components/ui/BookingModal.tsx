"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Loader2, CreditCard, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: string;
  price: number;
}

const initialFormState = {
  fullName: '',
  phone: '',
  email: '',
  message: ''
};

export default function BookingModal({ isOpen, onClose, selectedItem, price }: BookingModalProps) {
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setError(null);
      
      // Pre-fill user data if logged in
      const fetchUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setFormData(prev => ({
            ...prev,
            email: session.user.email || '',
            fullName: session.user.user_metadata?.full_name || prev.fullName
          }));
        }
      };
      fetchUser();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: dbError } = await supabase
        .from('enrollments')
        .insert([
          {
            full_name: formData.fullName,
            phone: formData.phone,
            email: formData.email,
            course_or_track: selectedItem,
            price: price,
            details: formData.message,
          }
        ]);

      if (dbError) throw dbError;

      // SUCCESS: Clear everything immediately
      setFormData(initialFormState);
      setIsSuccess(true);
      
      // Close automatically after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2500);
    } catch (err: any) {
      console.error('Error submitting form:', err);
      setError('حدث خطأ أثناء إرسال البيانات. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] p-6 md:p-8 overflow-hidden"
          dir="rtl"
        >
          {/* Success Overlay */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-50 bg-white dark:bg-[#0a0a0a] flex flex-col items-center justify-center text-center p-6"
              >
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={48} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-black mb-2 text-gray-900 dark:text-white">تم إرسال طلبك بنجاح!</h3>
                <p className="text-gray-600 dark:text-gray-400">تابع حالة طلبك من صفحة "طلباتي". سيتواصل معك فريقنا قريباً.</p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 transition-colors z-10"
          >
            <X size={20} />
          </button>

          <div className="mb-8">
            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4">طلب اشتراك جديد</h3>
            
            <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5 flex flex-col gap-2">
               <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <BookOpen size={18} className="text-primary" />
                  <span className="font-bold line-clamp-1">{selectedItem}</span>
               </div>
               <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <CreditCard size={18} className="text-green-500" />
                  <span className="text-lg font-black text-green-600 dark:text-green-400">{price} ج.م</span>
               </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 mr-1">
                  الاسم بالكامل
                </label>
                <input
                  required
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-300 dark:border-white/10 bg-white dark:bg-[#111] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="اسمك الثلاثي"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 mr-1">
                  رقم الواتساب
                </label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-300 dark:border-white/10 bg-white dark:bg-[#111] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="01xxxxxxxxx"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 mr-1">
                البريد الإلكتروني المسجل
              </label>
              <input
                required
                type="email"
                value={formData.email}
                readOnly
                className="w-full px-4 py-3 rounded-2xl border border-gray-300 dark:border-white/10 bg-gray-100 dark:bg-[#050505] text-gray-500 dark:text-gray-400 outline-none cursor-not-allowed"
                placeholder="example@mail.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 mr-1">
                هل لديك استفسار؟
              </label>
              <textarea
                rows={2}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border border-gray-300 dark:border-white/10 bg-white dark:bg-[#111] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                placeholder="اكتب رسالتك للمدرب هنا..."
              />
            </div>

            {error && <p className="text-red-500 text-xs text-center font-bold px-2">{error}</p>}

            <Button
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl text-lg font-black mt-4 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin ml-2" />
                  جاري الإرسال...
                </>
              ) : (
                'تأكيد الاشتراك الآن'
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
