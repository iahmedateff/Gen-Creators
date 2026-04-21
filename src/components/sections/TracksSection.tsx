"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Gift, CheckCircle2, Code2, LineChart, Cpu, Layout } from 'lucide-react';
import { useBooking } from '@/providers/BookingProvider';

const tracks = [
  { 
    name: "Marketing Track", 
    price: 3000, 
    icon: <LineChart size={32} />,
    color: "from-orange-500 to-red-600",
    pattern: "radial-gradient(circle at top right, rgba(255, 94, 0, 0.05) 0%, transparent 70%)",
    features: ["أساسيات التسويق", "إدارة الحملات الإعلانية", "تحليل البيانات", "مشروع تخرج متكامل"] 
  },
  { 
    name: "Programming Track", 
    price: 4000, 
    icon: <Code2 size={32} />,
    color: "from-blue-600 to-indigo-700",
    pattern: "linear-gradient(rgba(37, 99, 235, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.03) 1px, transparent 1px)",
    features: ["أساسيات البرمجة", "تطوير واجهات المستخدم", "قواعد البيانات", "بناء تطبيقات كاملة"] 
  },
  { 
    name: "AI Track", 
    price: 5000, 
    icon: <Cpu size={32} />,
    color: "from-purple-600 to-violet-800",
    pattern: "radial-gradient(circle at center, rgba(139, 92, 246, 0.08) 0%, transparent 80%)",
    features: ["مقدمة في الذكاء الاصطناعي", "تعلم الآلة (Machine Learning)", "تطبيقات الذكاء الاصطناعي", "مشاريع عملية"] 
  },
  { 
    name: "Design Track", 
    price: 3200, 
    icon: <Layout size={32} />,
    color: "from-pink-500 to-rose-600",
    pattern: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm10 17L3 10h14l-7 7z' fill='%23ec4899' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E\")",
    features: ["أساسيات التصميم", "UI/UX Design", "تصميم الهوية البصرية", "بناء معرض أعمال (Portfolio)"] 
  }
];

export default function TracksSection() {
  const { openBooking } = useBooking();
  return (
    <section id="tracks" className="py-24 bg-gray-100/50 dark:bg-[#050505] relative overflow-hidden">
      {/* Dynamic Background Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-transparent via-primary/5 to-transparent blur-[120px] pointer-events-none opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 text-sm font-black mb-6 animate-pulse">
            <Gift size={16} />
            <span>🎁 + كورس مجاني متاح حالياً مع أي Track</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-4 text-gray-900 dark:text-white leading-tight">المسارات المتكاملة <span className="text-gradient">Tracks</span></h2>
          <p className="text-gray-600 dark:text-gray-400 text-xl max-w-2xl mx-auto font-medium">
            بنينا لك طريقاً من الصفر حتى تحقق أول مكسـب لك 💵
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {tracks.map((track, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="group bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
              {/* Theme-based Background Pattern */}
              <div 
                className="absolute inset-0 transition-opacity duration-700 opacity-100 dark:opacity-30 group-hover:opacity-100"
                style={{ backgroundImage: track.pattern, backgroundSize: 'window.innerWidth < 768 ? 40px : 60px' }}
              ></div>

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                  <div className="flex items-center gap-5">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${track.color} flex items-center justify-center text-white shadow-xl transform transition-transform group-hover:rotate-12 duration-500`}>
                      {track.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">{track.name}</h3>
                      <div className="h-1.5 w-12 bg-primary/20 rounded-full mt-2"></div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">{track.price}</span>
                      <span className="text-gray-500 font-bold text-sm uppercase">EGP</span>
                    </div>
                    <p className="text-xs text-primary font-bold mt-1">عرض محدود 🔥</p>
                  </div>
                </div>
                
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {track.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 group/item">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${track.color} flex items-center justify-center text-white scale-90 group-hover/item:scale-110 transition-transform`}>
                        <CheckCircle2 size={14} />
                      </div>
                      <span className="font-bold text-sm md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  size="lg"
                  className={`w-full py-6 rounded-2xl text-xl font-black bg-gray-950 dark:bg-white text-white dark:text-black hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all shadow-xl shadow-black/10 group`}
                  onClick={() => openBooking(track.name, track.price)}
                >
                  <span className="group-hover:translate-x-2 transition-transform duration-300">اشترك في المسار الآن</span>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
