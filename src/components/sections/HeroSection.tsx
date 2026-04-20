"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';


export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Gradients */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#ff5e00] rounded-full mix-blend-multiply opacity-30 dark:opacity-20 filter blur-[128px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#7000ff] rounded-full mix-blend-multiply opacity-30 dark:opacity-20 filter blur-[128px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >

          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-snug md:leading-tight text-gray-900 dark:text-white">
            ابدأ شغلك <br />
            <span className="text-gradient">مش بس اتعلم!</span>
          </h1>
          
          <p className="mt-6 text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed">
            مع Gen Creators هتتعلم مهارة مطلوبة وتبدأ تكسب منها فعليًا 💰
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => document.getElementById('tracks')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto text-lg hover:scale-105 transition-transform duration-300"
            >
              ابدأ دلوقتي
            </Button>
            <Button 
              size="lg" 
              variant="ghost" 
              onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto text-lg text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
            >
              استكشف الكورسات
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Graphic element at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-0 pointer-events-none"></div>
    </section>
  );
}
