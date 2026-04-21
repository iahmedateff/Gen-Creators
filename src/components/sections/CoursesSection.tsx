"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useBooking } from '@/providers/BookingProvider';
import { Laptop, Megaphone, Palette, Briefcase, Zap, BrainCircuit } from 'lucide-react';

const courses = [
  {
    title: "Marketing",
    desc: "اتعلم تعمل حملات وإعلانات وتجيب نتايج",
    newPrice: 1200,
    oldPrice: 1700,
    highlight: true,
    icon: <Megaphone size={28} />,
    color: "from-pink-500 to-orange-400",
    pattern: "radial-gradient(circle at 10% 20%, rgba(249, 115, 22, 0.05) 0%, transparent 40%)"
  },
  {
    title: "Programming",
    desc: "ابني مواقع واشتغل كمبرمج من الصفر",
    newPrice: 1800,
    oldPrice: 2500,
    highlight: false,
    icon: <Laptop size={28} />,
    color: "from-blue-500 to-cyan-400",
    pattern: "linear-gradient(45deg, rgba(59, 130, 246, 0.05) 25%, transparent 25%, transparent 50%, rgba(59, 130, 246, 0.05) 50%, rgba(59, 130, 246, 0.05) 75%, transparent 75%, transparent)"
  },
  {
    title: "Artificial Intelligence",
    desc: "ادخل مجال المستقبل واشتغل بالـ AI",
    newPrice: 2200,
    oldPrice: 3000,
    highlight: true,
    icon: <BrainCircuit size={28} />,
    color: "from-purple-500 to-indigo-500",
    pattern: "radial-gradient(circle at 90% 10%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)"
  },
  {
    title: "Business",
    desc: "ابدأ مشروعك واديره صح",
    newPrice: 1000,
    oldPrice: 1500,
    highlight: false,
    icon: <Briefcase size={28} />,
    color: "from-green-400 to-emerald-600",
    pattern: "repeating-linear-gradient(0deg, rgba(16, 185, 129, 0.03) 0px, rgba(16, 185, 129, 0.03) 1px, transparent 1px, transparent 20px)"
  },
  {
    title: "Design",
    desc: "اشتغل جرافيك و UI/UX باحتراف",
    newPrice: 1300,
    oldPrice: 2000,
    highlight: false,
    icon: <Palette size={28} />,
    color: "from-yellow-400 to-orange-500",
    pattern: "radial-gradient(ellipse at center, rgba(251, 191, 36, 0.05) 0%, transparent 70%)"
  }
];

export default function CoursesSection() {
  const { openBooking } = useBooking();
  return (
    <section id="courses" className="py-24 relative bg-gray-50/50 dark:bg-transparent overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 -left-20 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-gray-900 dark:text-white leading-tight">كورسات <span className="text-gradient">Gen Creators</span></h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            اختر المجال اللي بتحبه وابدأ رحلتك للنجاح مع كورسات عملية 100%
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-white/5 rounded-3xl p-8 shadow-xl relative overflow-hidden group flex flex-col`}
            >
              {/* Specialized Background Pattern */}
              <div 
                className="absolute inset-0 opacity-100 dark:opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundImage: course.pattern, backgroundSize: '100% 100%' }}
              ></div>
              
              {/* Inner Glow on Hover */}
              <div className={`absolute -inset-1 blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${course.color} pointer-events-none`}></div>

              {course.highlight && (
                <div className="absolute top-6 left-6 bg-red-500/10 text-red-600 dark:text-red-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 border border-red-500/20 z-10">
                  <Zap size={10} fill="currentColor" /> الأكثر طلبًا
                </div>
              )}
              
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${course.color} mb-8 flex items-center justify-center text-white shadow-2xl relative z-10 transition-transform group-hover:scale-110 duration-500`}>
                {course.icon}
              </div>
              
              <h3 className="text-2xl font-black mb-3 text-gray-900 dark:text-white relative z-10">{course.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 min-h-[48px] text-sm leading-relaxed relative z-10">{course.desc}</p>
              
              <div className="flex items-center justify-between mt-auto pt-8 border-t border-gray-100 dark:border-white/5 relative z-10">
                <div>
                  <div className="text-3xl font-black text-gray-900 dark:text-white">{course.newPrice} <span className="text-xs text-gray-500 font-medium">ج.م</span></div>
                  <div className="text-sm text-gray-400 line-through mt-1 opacity-60">{course.oldPrice} ج.م</div>
                </div>
                <Button 
                  size="sm" 
                  className="px-6 py-5 rounded-2xl font-bold shadow-lg shadow-black/5 dark:shadow-none bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-primary dark:hover:bg-primary dark:hover:text-white"
                  onClick={() => openBooking(course.title, course.newPrice)}
                >
                  احجز الآن
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
