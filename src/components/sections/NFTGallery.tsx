
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';

const NFTGallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const nfts = [
    {
      id: 1,
      name: "Adrenaline Rush",
      rarity: "Legendary",
      image: "photo-1581090464777-f3220bbe1b8b",
      description: "Exclusive access to VIP events",
      available: 50
    },
    {
      id: 2,
      name: "Energy Burst",
      rarity: "Rare",
      image: "photo-1470813740244-df37b8c1edcb",
      description: "Enhanced staking rewards",
      available: 200
    },
    {
      id: 3,
      name: "Power Surge",
      rarity: "Common",
      image: "photo-1518770660439-4636190af475",
      description: "Community governance voting",
      available: 1000
    },
    {
      id: 4,
      name: "Lightning Strike",
      rarity: "Rare",
      image: "photo-1526374965328-7f61d4dc18c5",
      description: "Merchandise discounts",
      available: 300
    },
    {
      id: 5,
      name: "Thunder Bolt",
      rarity: "Legendary",
      image: "photo-1500673922987-e212871fec22",
      description: "Athlete meet & greets",
      available: 75
    },
    {
      id: 6,
      name: "Velocity Core",
      rarity: "Common",
      image: "photo-1581090464777-f3220bbe1b8b",
      description: "Early access to drops",
      available: 800
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'text-yellow-400 border-yellow-400';
      case 'Rare': return 'text-purple-400 border-purple-400';
      case 'Common': return 'text-gray-400 border-gray-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const gallery = galleryRef.current;

    if (!section || !gallery) return;

    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(gallery.children,
          { opacity: 0, y: 100, rotationX: 45 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
          }
        );
      }
    });

    // Add hover animations
    const nftCards = gallery.children;
    Array.from(nftCards).forEach((card) => {
      const cardElement = card as HTMLElement;
      
      cardElement.addEventListener('mouseenter', () => {
        gsap.to(cardElement, {
          y: -10,
          rotationY: 5,
          rotationX: 5,
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      cardElement.addEventListener('mouseleave', () => {
        gsap.to(cardElement, {
          y: 0,
          rotationY: 0,
          rotationX: 0,
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

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-black to-redbull-navy relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-rajdhani font-bold text-redbull-white mb-6">
            NFT REWARDS
            <span className="text-redbull-red block">GALLERY</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Exclusive RedBull Adrenaline collectibles with real-world utility and benefits
          </p>
        </div>

        <div ref={galleryRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nfts.map((nft) => (
            <div
              key={nft.id}
              className="group relative bg-redbull-navy/40 backdrop-blur-sm border border-redbull-red/30 rounded-2xl overflow-hidden hover:border-redbull-red transition-all duration-300 cursor-pointer"
              style={{ perspective: '1000px' }}
            >
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 z-10" />
              
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={`https://images.unsplash.com/${nft.image}?w=400&h=300&fit=crop`}
                  alt={nft.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Rarity Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full border backdrop-blur-sm ${getRarityColor(nft.rarity)}`}>
                  <span className="text-xs font-bold">{nft.rarity}</span>
                </div>

                {/* Glare Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-rajdhani font-bold text-redbull-white mb-2">
                  {nft.name}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4">
                  {nft.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xs text-gray-400">Available</div>
                    <div className="font-orbitron font-bold text-redbull-red">
                      {nft.available.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Mint Price</div>
                    <div className="font-orbitron font-bold text-redbull-white">
                      Free
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-redbull-red hover:bg-redbull-red/90 text-white font-rajdhani font-bold transition-all duration-300 hover:shadow-lg hover:shadow-redbull-red/30">
                  CLAIM NFT
                </Button>
              </div>

              {/* 3D Tilt Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-redbull-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NFTGallery;
