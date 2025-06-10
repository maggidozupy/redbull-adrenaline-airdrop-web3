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
  return <div className="relative w-96 h-96 flex items-center justify-center">
      {/* Orbiting Particles */}
      

      {/* Energy Rings */}
      
      

      {/* RedBull Can */}
      
    </div>;
};
export default RedBullCan3D;