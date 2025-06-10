
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import AirdropMechanics from '@/components/sections/AirdropMechanics';
import TokenomicsChart from '@/components/sections/TokenomicsChart';
import NFTGallery from '@/components/sections/NFTGallery';
import AirdropDashboard from '@/components/sections/AirdropDashboard';
import FOMOTriggerBar from '@/components/ui/FOMOTriggerBar';
import CustomCursor from '@/components/ui/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Initialize GSAP animations
    gsap.set("body", { overflow: "hidden" });
    
    // Page load animation
    const tl = gsap.timeline();
    tl.to("body", { overflow: "auto", duration: 0.1, delay: 0.5 });
    
    // Smooth scrolling setup
    ScrollTrigger.normalizeScroll(true);
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-redbull-navy text-redbull-white custom-cursor overflow-x-hidden">
      <CustomCursor />
      <FOMOTriggerBar />
      
      <main>
        <HeroSection />
        <AboutSection />
        <AirdropMechanics />
        <TokenomicsChart />
        <NFTGallery />
        <AirdropDashboard />
      </main>
    </div>
  );
};

export default Index;
