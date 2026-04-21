"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Loader2, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: string;
  price: number;
}

export default function BookingModal({ isOpen, onClose, selectedItem, price }: BookingModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    message: ''
  });
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
            fullName: session.user.user_metadata?.full_name || ''
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

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setFormData({ fullName: '', phone: '', email: '', message: '' });
      }, 3000);
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
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden"
          dir="rtl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 transition-colors"
          >
            <X size={20} />
          </button>

          {isSuccess ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">تم استلام طلبك بنجاح!</h3>
              <p className="text-gray-600 dark:text-gray-400">سنتواصل معك في أقرب وقت ممكن.</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">طلب اشتراك</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      الدورة: <span className="text-primary font-bold">{selectedItem}</span>
                    </p>
                  </div>
                  <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl flex items-center gap-2 border border-primary/20">
                    <CreditCard size={18} />
                    <span className="font-bold text-lg">{price} ج.م</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    الاسم بالكامل
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="أدخل اسمك"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    رقم الهاتف (واتساب)
                  </label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="مثال: 01012345678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    البريد الإلكتروني
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-[#0a0a0a] text-gray-500 dark:text-gray-400 outline-none cursor-not-allowed"
                    placeholder="example@mail.com"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">يجب أن يتطابق البريد الإلكتروني مع حسابك لسهولة المتابعة.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    تفاصيل إضافية (اختياري)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                    placeholder="أي حاجة حابب تضيفها؟"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}

                <Button
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl text-lg font-bold mt-4"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin ml-2" />
                      جاري الإرسال...
                    </>
                  ) : (
                    'تأكيد الطلب'
                  )}
                </Button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
