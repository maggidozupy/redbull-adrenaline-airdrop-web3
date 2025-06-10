
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const trails = trailRefs.current;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Move main cursor
      gsap.to(cursor, {
        x: mouseX - 10,
        y: mouseY - 10,
        duration: 0.1,
        ease: "power2.out"
      });

      // Animate trail particles
      trails.forEach((trail, index) => {
        gsap.to(trail, {
          x: mouseX - 5,
          y: mouseY - 5,
          duration: 0.3 + index * 0.1,
          ease: "power2.out"
        });
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, {
        scale: 1.5,
        backgroundColor: "rgb(214, 4, 8)",
        duration: 0.2
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: "rgba(214, 4, 8, 0.6)",
        duration: 0.2
      });
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 hidden lg:block">
      {/* Main Cursor */}
      <div
        ref={cursorRef}
        className="absolute w-5 h-5 bg-redbull-red/60 rounded-full shadow-lg"
        style={{ transform: 'translate(-50%, -50%)' }}
      />

      {/* Trail Particles */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          ref={el => el && (trailRefs.current[i] = el)}
          className="absolute w-2 h-2 bg-redbull-red rounded-full opacity-30"
          style={{ 
            transform: 'translate(-50%, -50%)',
            animationDelay: `${i * 100}ms`
          }}
        />
      ))}
    </div>
  );
};

export default CustomCursor;
