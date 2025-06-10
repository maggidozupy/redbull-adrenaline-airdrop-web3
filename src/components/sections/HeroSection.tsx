import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import CountdownTimer from '@/components/ui/CountdownTimer';
import ParticleSystem from '@/components/ui/ParticleSystem';
import RedBullCan3D from '@/components/ui/RedBullCan3D';

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subline = sublineRef.current;
    const cta = ctaRef.current;

    if (!section || !headline || !subline || !cta) return;

    // Initial states
    gsap.set([headline, subline, cta], { 
      opacity: 0, 
      y: 50 
    });

    // Hero entrance animation
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.to(headline, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    })
    .to(subline, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.5")
    .to(cta, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4");

    // Parallax effect on scroll
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(section, {
          y: progress * -100,
          duration: 0.3,
          ease: "none"
        });
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('/lovable-uploads/90331457-dada-4ee5-b4ee-c72d0395cabc.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgb(0, 22, 43)'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-redbull-navy/20 z-0"></div>
      
      <ParticleSystem />
      
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center z-10 relative">
        {/* Left Column - Content */}
        <div className="text-center lg:text-left space-y-8">
          <h1 
            ref={headlineRef}
            className="text-5xl md:text-7xl lg:text-8xl font-rajdhani font-bold leading-tight text-white opacity-80"
          >
            FUEL
            <br />
            YOUR
            <br />
            FUTURE
          </h1>
          
          <p 
            ref={sublineRef}
            className="text-xl md:text-2xl font-inter text-gray-300 max-w-lg mx-auto lg:mx-0"
          >
            Claim exclusive crypto rewards, NFTs, and much more digital adrenaline experiences — only with Red Bull.
          </p>

          <div ref={ctaRef} className="space-y-6">
            <CountdownTimer />
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg"
                className="bg-redbull-red hover:bg-redbull-red/90 text-white font-rajdhani font-bold text-lg px-8 py-4 transition-all duration-300 hover:scale-105"
              >
                CLAIM YOUR AIRDROP
              </Button>
              
              <Button 
                size="lg"
                className="bg-redbull-red hover:bg-redbull-red/90 text-white font-rajdhani font-bold text-lg px-8 py-4 transition-all duration-300"
              >
                LEARN MORE
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column - 3D Can (hidden on smaller screens to avoid overlap with background image) */}
        <div className="hidden xl:flex justify-center">
          <RedBullCan3D />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-redbull-red rounded-full flex justify-center">
          <div className="w-1 h-3 bg-redbull-red rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
