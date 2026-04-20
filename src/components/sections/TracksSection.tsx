"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Gift, CheckCircle2 } from 'lucide-react';

const tracks = [
  { name: "Marketing Track", price: 3000, features: ["أساسيات التسويق", "إدارة الحملات الإعلانية", "تحليل البيانات", "مشروع تخرج متكامل"] },
  { name: "Programming Track", price: 4000, features: ["أساسيات البرمجة", "تطوير واجهات المستخدم", "قواعد البيانات", "بناء تطبيقات كاملة"] },
  { name: "AI Track", price: 5000, features: ["مقدمة في الذكاء الاصطناعي", "تعلم الآلة (Machine Learning)", "تطبيقات الذكاء الاصطناعي", "مشاريع عملية"] },
  { name: "Design Track", price: 3200, features: ["أساسيات التصميم", "UI/UX Design", "تصميم الهوية البصرية", "بناء معرض أعمال (Portfolio)"] }
];

export default function TracksSection() {
  return (
    <section id="tracks" className="py-24 bg-gray-100 dark:bg-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-sm font-bold mb-6">
            <Gift size={16} />
            <span>🎁 + كورس مجاني مع أي Track</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">المسارات المتكاملة <span className="text-gradient-purple">(Tracks)</span></h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            ابني مسارك من الصفر للاحتراف بخصم خاص مع باقات التراكس
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {tracks.map((track, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gradient-to-b dark:from-[#151515] dark:to-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
              
              <h3 className="text-2xl md:text-3xl font-extrabold mb-4 text-gray-900 dark:text-white">{track.name}</h3>
              
              <div className="flex items-baseline gap-2 mb-8 border-b border-gray-100 dark:border-white/5 pb-8">
                <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 dark:from-purple-400 dark:to-pink-600">{track.price}</span>
                <span className="text-gray-500 font-medium">ج.م</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {track.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle2 size={20} className="text-purple-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button variant="secondary" className="w-full text-lg">
                اشترك في المسار
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
