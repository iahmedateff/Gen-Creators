"use client";

import { motion } from 'framer-motion';
import { Briefcase, FolderOpen, HeadphonesIcon, Award, Users } from 'lucide-react';

const reasons = [
  { icon: Briefcase, title: "مشاريع حقيقية مش كلام نظري", desc: "هتطبق اللي بتتعلمه في مشاريع بتشبه الشغل الحقيقي" },
  { icon: FolderOpen, title: "Portfolio جاهز تشتغل بيه", desc: "هتخرج من الكورس وعندك سابقة أعمال قوية" },
  { icon: HeadphonesIcon, title: "دعم مباشر لحد ما تشتغل", desc: "مش بنسيبك، إحنا معاك خطوة بخطوة" },
  { icon: Award, title: "شهادة معتمدة", desc: "تثبت بيها كفاءتك وتضيفها في الـ CV" },
  { icon: Users, title: "Community وفرص شغل", desc: "هتكون وسط مجتمع بيساعدك ويوفرلك فرص حقيقية" }
];

export default function WhyUsSection() {
  return (
    <section id="why-us" className="py-24 bg-white dark:bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white text-center">ليه تختار <span className="text-gradient">Gen Creators</span>؟</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-12 leading-relaxed text-center">
              إحنا مش بس بنقدم محتوى تعليمي، إحنا بنوفرلك بيئة متكاملة تضمنلك تبني مهارة بجد وتلاقي فرصة شغل في أسرع وقت.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reasons.map((reason, index) => {
                const Icon = reason.icon;
                return (
                  <div key={index} className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-[#ff5e00]/30 transition-colors">
                    <div className="w-16 h-16 rounded-2xl bg-[#ff5e00]/10 flex items-center justify-center flex-shrink-0 mb-4">
                      <Icon className="text-[#ff5e00]" size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{reason.title}</h3>
                      <p className="text-gray-600 dark:text-gray-500">{reason.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
