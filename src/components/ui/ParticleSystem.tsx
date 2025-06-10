
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ParticleSystem = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create particles
    const particleCount = 50;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 bg-redbull-red rounded-full opacity-30';
      
      // Random initial position
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      
      container.appendChild(particle);
      particles.push(particle);

      // Animate particle
      gsap.to(particle, {
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
        opacity: Math.random() * 0.8 + 0.2,
        scale: Math.random() * 2 + 0.5,
        duration: Math.random() * 10 + 5,
        repeat: -1,
        yoyo: true,
        ease: "none"
      });
    }

    return () => {
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default ParticleSystem;
