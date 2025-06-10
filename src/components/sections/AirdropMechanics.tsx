
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';

const AirdropMechanics = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards) return;

    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(cards.children,
          { opacity: 0, y: 100, rotationY: 45 },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
          }
        );
      }
    });

    // Add hover animations to cards
    const cardElements = cards.children;
    Array.from(cardElements).forEach((card) => {
      const cardElement = card as HTMLElement;
      
      cardElement.addEventListener('mouseenter', () => {
        gsap.to(cardElement, {
          y: -20,
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      cardElement.addEventListener('mouseleave', () => {
        gsap.to(cardElement, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const mechanics = [
    {
      title: "Product & Event Engagement",
      icon: "🥤",
      description: "Scan QR codes on RedBull products, attend racing events, and engage with our ecosystem",
      activities: ["QR Code Scanning", "Event Attendance", "Product Purchases", "Social Sharing"],
      multiplier: "2x"
    },
    {
      title: "Web3 Activity",
      icon: "🔗",
      description: "Connect your wallet, hold NFTs, stake tokens, and participate in DeFi protocols",
      activities: ["Wallet Connection", "NFT Holding", "Token Staking", "DeFi Participation"],
      multiplier: "3x"
    },
    {
      title: "Partner Ecosystem",
      icon: "🤝",
      description: "Collaborate with RedBull athletes, teams, sponsors, and community partners",
      activities: ["Athlete Collaborations", "Team Partnerships", "Sponsor Activities", "Community Events"],
      multiplier: "5x"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-redbull-navy to-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-rajdhani font-bold text-redbull-white mb-6">
            AIRDROP
            <span className="text-redbull-red block">MECHANICS</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Multiple ways to earn RBL tokens through engagement, Web3 activity, and ecosystem participation
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {mechanics.map((mechanic, index) => (
            <div
              key={index}
              className="group relative bg-redbull-navy/30 backdrop-blur-sm border border-redbull-red/30 rounded-2xl p-8 hover:border-redbull-red transition-all duration-300 cursor-pointer"
              style={{ perspective: '1000px' }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-redbull-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="text-6xl mb-6 text-center">{mechanic.icon}</div>
                
                <h3 className="text-2xl font-rajdhani font-bold text-redbull-white mb-4 text-center">
                  {mechanic.title}
                </h3>
                
                <p className="text-gray-300 mb-6 text-center leading-relaxed">
                  {mechanic.description}
                </p>

                <div className="space-y-3 mb-6">
                  {mechanic.activities.map((activity, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-redbull-red rounded-full animate-pulse" />
                      <span className="text-sm text-gray-300">{activity}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-redbull-red/20 border border-redbull-red/50 rounded-full px-4 py-2 mb-4">
                    <span className="font-orbitron font-bold text-redbull-red">
                      {mechanic.multiplier} MULTIPLIER
                    </span>
                  </div>
                  
                  <Button 
                    className="w-full bg-redbull-red hover:bg-redbull-red/90 text-white font-rajdhani font-bold"
                  >
                    START EARNING
                  </Button>
                </div>
              </div>

              {/* Corner Decoration */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-redbull-red opacity-30 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-redbull-red opacity-30 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AirdropMechanics;
