"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export default function FinalCTASection() {
  const whatsappNumber = "201012345678"; // Replace with your actual WhatsApp number
  const message = encodeURIComponent("أهلاً Gen Creators، حابب أنضم للمنصة وأستفسر أكثر عن الكورسات والمسارات المتاحة.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  const handleJoinClick = () => {
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-32 relative bg-gray-50/30 dark:bg-transparent">
      <div className="absolute inset-0 bg-[#ff5e00] opacity-[0.01] dark:opacity-[0.03] pattern-grid-lg pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="bg-white dark:bg-gradient-to-b dark:from-[#111] dark:to-[#050505] border border-gray-200 dark:border-[#ff5e00]/20 rounded-3xl md:rounded-[3rem] p-6 md:p-16 shadow-2xl relative overflow-hidden"
        >
          {/* Glowing Background Blob */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#ff5e00] blur-[128px] opacity-10 dark:opacity-20 pointer-events-none"></div>

          <h2 className="text-2xl md:text-4xl font-extrabold mb-6 leading-tight relative z-10 text-gray-900 dark:text-white">
            📩 متستناش… ابدأ دلوقتي وخلي عندك مهارة <span className="text-gradient">تجيب فلوس 👌</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 relative z-10">
            تواصل معنا مباشرة عبر الواتساب لتحديد مستواك والبدء فوراً في رحلتك الجديدة
          </p>
          
          <div className="relative z-10 flex justify-center">
            <Button 
              size="lg" 
              onClick={handleJoinClick}
              className="px-8 md:px-12 py-4 md:py-5 text-lg md:text-xl w-full sm:w-auto hover:bg-[#25D366] hover:text-white transition-all duration-300 shadow-[0_4px_20px_rgba(255,94,0,0.15)] dark:shadow-[0_0_40px_rgba(255,94,0,0.3)] group flex items-center gap-3"
            >
              <span>انضم إلينا عبر واتساب</span>
              <svg 
                viewBox="0 0 24 24" 
                width="24" 
                height="24" 
                stroke="currentColor" 
                strokeWidth="2" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="group-hover:scale-110 transition-transform"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
