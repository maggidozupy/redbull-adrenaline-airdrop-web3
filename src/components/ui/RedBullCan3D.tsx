
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const RedBullCan3D = () => {
  const canRef = useRef<HTMLDivElement>(null);
  const orbitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const can = canRef.current;
    const orbits = orbitsRef.current;
    
    if (!can || !orbits) return;

    // Floating animation for the can
    gsap.to(can, {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    // Rotation animation
    gsap.to(can, {
      rotationY: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });

    // Orbiting particles animation
    const particles = orbits.children;
    Array.from(particles).forEach((particle, index) => {
      gsap.to(particle, {
        rotation: 360,
        duration: 8 + index * 2,
        repeat: -1,
        ease: "none",
        transformOrigin: "200px center"
      });
    });

  }, []);

  return (
    <div className="relative w-96 h-96 flex items-center justify-center">
      {/* Orbiting Particles */}
      <div ref={orbitsRef} className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-redbull-red rounded-full shadow-lg"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateX(200px)`,
            }}
          />
        ))}
      </div>

      {/* Energy Rings */}
      <div className="absolute inset-0 border-2 border-redbull-red rounded-full animate-pulse-glow opacity-30" />
      <div className="absolute inset-4 border border-redbull-red rounded-full animate-pulse-glow opacity-20 animation-delay-1000" />

      {/* RedBull Can */}
      <div 
        ref={canRef}
        className="relative w-32 h-48 bg-gradient-to-b from-blue-600 via-blue-800 to-blue-900 rounded-lg shadow-2xl"
        style={{
          background: 'linear-gradient(180deg, #1e40af 0%, #1e3a8a 50%, #1e40af 100%)',
          transform: 'perspective(1000px) rotateX(-10deg)'
        }}
      >
        {/* Can Label */}
        <div className="absolute inset-x-2 top-8 bottom-8 bg-gradient-to-b from-red-500 to-red-700 rounded flex items-center justify-center">
          <div className="text-white font-rajdhani font-bold text-lg text-center leading-tight">
            RED
            <br />
            BULL
            <br />
            <span className="text-xs">ENERGY</span>
          </div>
        </div>

        {/* Can Top */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-gray-300 rounded-full shadow-lg" />
        
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-redbull-red opacity-20 rounded-lg animate-pulse" />
      </div>
    </div>
  );
};

export default RedBullCan3D;
