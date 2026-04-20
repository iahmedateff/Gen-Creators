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
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">ليه تختار <span className="text-gradient">Gen Creators</span>؟</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
              إحنا مش بس بنقدم محتوى تعليمي، إحنا بنوفرلك بيئة متكاملة تضمنلك تبني مهارة بجد وتلاقي فرصة شغل في أسرع وقت.
            </p>
            
            <div className="space-y-6">
              {reasons.map((reason, index) => {
                const Icon = reason.icon;
                return (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-[#ff5e00]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon className="text-[#ff5e00]" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{reason.title}</h3>
                      <p className="text-gray-600 dark:text-gray-500">{reason.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ff5e00]/20 to-[#7000ff]/20 rounded-[3rem] transform rotate-3 scale-105 filter blur-xl"></div>
            <div className="bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-[3rem] p-8 relative overflow-hidden h-[600px] flex items-center justify-center shadow-2xl">
              {/* Decorative Mockup Area */}
              <div className="absolute inset-0 opacity-10 dark:opacity-30 bg-[url('https://transparenttextures.com/patterns/carbon-fibre.png')]"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white dark:bg-gradient-to-br dark:from-[#1a1a1a] dark:to-[#0d0d0d] rounded-2xl border border-gray-200 dark:border-white/5 shadow-2xl flex flex-col overflow-hidden group">
                <div className="h-8 bg-gray-100 dark:bg-[#222] border-b border-gray-200 dark:border-white/5 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="flex-1 p-6 relative">
                  <div className="w-3/4 h-4 bg-gray-200 dark:bg-white/10 rounded mb-4"></div>
                  <div className="w-1/2 h-4 bg-gray-200 dark:bg-white/10 rounded mb-8"></div>
                  <div className="w-full h-32 bg-[#ff5e00]/10 dark:bg-[#ff5e00]/20 rounded-lg border border-[#ff5e00]/20 dark:border-[#ff5e00]/30 group-hover:bg-[#ff5e00]/20 dark:group-hover:bg-[#ff5e00]/30 transition-colors"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
