"use client";

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  { text: "الكورس فرق معايا جدًا وبدأت أشتغل Freelance", author: "أحمد محمود", role: "UI/UX Designer" },
  { text: "أول مرة أفهم المجال بالشكل البسيط ده وأطبق بإيدي", author: "سارة خالد", role: "Frontend Developer" },
  { text: "عملت Portfolio وقدرت أقدم على شغل فعلاً", author: "عمر طارق", role: "Digital Marketer" },
  { text: "الدعم والمتابعة كانوا السبب إني مكملتش بس… بدأت أشتغل", author: "نورهان هشام", role: "Backend Developer" }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-gray-50/50 dark:bg-transparent">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#ff5e00] rounded-full mix-blend-multiply opacity-5 dark:opacity-10 filter blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="text-yellow-400 fill-yellow-400" size={24} />
            ))}
          </div>
          <div className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">تقييم 4.7 / 5 بناءً على آراء المئات</div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">قصص نجاح <span className="text-gradient">أبطالنا</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((test, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 p-6 rounded-2xl hover:border-[#ff5e00]/50 dark:hover:border-[#ff5e00]/30 transition-colors shadow-sm dark:shadow-none"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-500 fill-yellow-500" size={16} />
                ))}
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-200 mb-6 font-medium leading-relaxed">"{test.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-gray-900 dark:text-white font-bold">
                  {test.author.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">{test.author}</div>
                  <div className="text-sm text-gray-500">{test.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
