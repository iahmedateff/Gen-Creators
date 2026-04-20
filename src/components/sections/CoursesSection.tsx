"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

const courses = [
  {
    title: "Marketing",
    desc: "اتعلم تعمل حملات وإعلانات وتجيب نتايج",
    newPrice: 1200,
    oldPrice: 1700,
    highlight: true,
    color: "from-pink-500 to-orange-400"
  },
  {
    title: "Programming",
    desc: "ابني مواقع واشتغل كمبرمج من الصفر",
    newPrice: 1800,
    oldPrice: 2500,
    highlight: false,
    color: "from-blue-500 to-cyan-400"
  },
  {
    title: "Artificial Intelligence",
    desc: "ادخل مجال المستقبل واشتغل بالـ AI",
    newPrice: 2200,
    oldPrice: 3000,
    highlight: true,
    color: "from-purple-500 to-indigo-500"
  },
  {
    title: "Business",
    desc: "ابدأ مشروعك واديره صح",
    newPrice: 1000,
    oldPrice: 1500,
    highlight: false,
    color: "from-green-400 to-emerald-600"
  },
  {
    title: "Design",
    desc: "اشتغل جرافيك و UI/UX باحتراف",
    newPrice: 1300,
    oldPrice: 2000,
    highlight: false,
    color: "from-yellow-400 to-orange-500"
  }
];

export default function CoursesSection() {
  return (
    <section id="courses" className="py-24 relative bg-gray-50/50 dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">كورسات <span className="text-gradient">Gen Creators</span></h2>
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
              whileHover={{ y: -10 }}
              className={`bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] rounded-2xl p-6 shadow-xl relative overflow-hidden group`}
            >
              {course.highlight && (
                <div className="absolute top-4 left-4 bg-red-500/10 text-red-600 dark:text-red-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-red-500/20">
                  <span>🔥</span> الأكثر طلبًا
                </div>
              )}
              
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${course.color} mb-6 flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                {course.title.charAt(0)}
              </div>
              
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{course.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 min-h-[48px]">{course.desc}</p>
              
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100 dark:border-white/5">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{course.newPrice} <span className="text-sm text-gray-500">ج.م</span></div>
                  <div className="text-sm text-gray-500 line-through">{course.oldPrice} ج.م</div>
                </div>
                <Button variant="outline" size="sm" className="group-hover:bg-[#ff5e00] group-hover:text-white transition-colors">
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
