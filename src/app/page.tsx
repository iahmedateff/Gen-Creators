import HeroSection from '@/components/sections/HeroSection';
import CoursesSection from '@/components/sections/CoursesSection';
import TracksSection from '@/components/sections/TracksSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import OffersSection from '@/components/sections/OffersSection';
import FinalCTASection from '@/components/sections/FinalCTASection';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <CoursesSection />
      <TracksSection />
      <WhyUsSection />
      <TestimonialsSection />
      <OffersSection />
      <FinalCTASection />
    </main>
  );
}
