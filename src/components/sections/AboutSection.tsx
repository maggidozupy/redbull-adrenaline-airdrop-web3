
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const visual = visualRef.current;

    if (!section || !content || !visual) return;

    // Scroll-triggered animation
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        gsap.fromTo(content.children, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            stagger: 0.2,
            ease: "power3.out"
          }
        );

        gsap.fromTo(visual,
          { opacity: 0, x: 100 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 1,
            ease: "power3.out"
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const stats = [
    { label: "Total Supply", value: "1B RBL", icon: "🪙" },
    { label: "Airdrop Allocation", value: "15%", icon: "🎁" },
    { label: "Community Rewards", value: "25%", icon: "👥" },
    { label: "Staking APY", value: "150%", icon: "⚡" }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-redbull-navy circuit-pattern relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-rajdhani font-bold text-redbull-white mb-4">
                POWER YOUR
                <span className="text-redbull-red block">WEB3 JOURNEY</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                RedBull Energy Token (RBL) is more than just a cryptocurrency. 
                It's your gateway to an ecosystem of extreme sports, gaming, 
                and Web3 experiences that push the boundaries of what's possible.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-redbull-navy/50 backdrop-blur-sm border border-redbull-red/30 rounded-lg p-4 hover:border-redbull-red/60 transition-all duration-300 group animate-pulse-glow"
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="font-orbitron font-bold text-2xl text-redbull-red group-hover:text-redbull-white transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-rajdhani font-bold text-redbull-red">
                🚀 Exclusive Benefits
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-redbull-red rounded-full"></span>
                  VIP access to RedBull events worldwide
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-redbull-red rounded-full"></span>
                  Exclusive NFT collectibles and merchandise
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-redbull-red rounded-full"></span>
                  Staking rewards up to 150% APY
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-redbull-red rounded-full"></span>
                  Governance voting on future initiatives
                </li>
              </ul>
            </div>
          </div>

          {/* Visual */}
          <div ref={visualRef} className="flex justify-center">
            <div className="relative w-80 h-80">
              {/* Morphing Animation Container */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 relative">
                  {/* RedBull Can Image */}
                  <div className="absolute inset-0 flex items-center justify-center animate-float">
                    <img 
                      src="/lovable-uploads/d77756ee-49fb-4cfb-b2b7-81b64d16386d.png"
                      alt="Red Bull Energy Drink with Crypto Coins"
                      className="w-32 h-auto object-contain transform rotate-12"
                    />
                  </div>
                  
                  {/* Token Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-redbull-red to-red-700 rounded-full opacity-30 animate-pulse-glow">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-orbitron font-bold text-2xl">RBL</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Orbiting Elements */}
              <div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-4 h-4 bg-redbull-red rounded-full animate-rotate-slow"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateX(120px)`,
                      animationDelay: `${i * 0.5}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
