"use client";

import { motion } from 'framer-motion';
import { Tag, CreditCard, GraduationCap, UsersRound, Timer } from 'lucide-react';

export default function OffersSection() {
  const offers = [
    { icon: Tag, title: "خصومات كبيرة", desc: "أسعار تنافسية لفترة محدودة تبدأ من 1000 ج.م" },
    { icon: CreditCard, title: "تقسيط بدون فوائد", desc: "ادفع على دفعات مريحة تناسب ميزانيتك" },
    { icon: GraduationCap, title: "خصم طلبة", desc: "لو لسة طالب ليك خصم إضافي خاص بيك" },
    { icon: UsersRound, title: "خصم جماعي", desc: "جمع أصحابك واستفيدوا بخصم المجموعات" }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-white dark:bg-transparent">
      <div className="absolute top-0 right-0 w-full h-full bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-[0.02] dark:opacity-5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-[#ff5e00]/10 to-[#7000ff]/10 dark:from-[#ff5e00]/20 dark:to-[#7000ff]/20 rounded-3xl p-1 md:p-12 border border-gray-200 dark:border-white/10 relative overflow-hidden">
          {/* Animated Glow */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff5e00] dark:via-white to-transparent opacity-30 dark:opacity-50 animate-[pulse_3s_ease-in-out_infinite]"></div>

          <div className="text-center mb-12 mt-8 md:mt-0">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400 border border-red-200 dark:border-red-500/30 text-sm font-bold mb-6 animate-[pulse_2s_ease-in-out_infinite]">
              <Timer size={18} />
              <span>عرض لفترة محدودة</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">عروض <span className="text-gradient">ما تتفوتش</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 pb-8 md:px-0 md:pb-0">
            {offers.map((offer, index) => {
              const Icon = offer.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 dark:bg-[#111]/80 backdrop-blur-sm border border-gray-200 dark:border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors shadow-sm dark:shadow-none"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ff5e00] to-[#ff8c00] flex items-center justify-center mb-4 shadow-lg shadow-[#ff5e00]/20">
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{offer.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{offer.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
