
import { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date (7 days from now for demo)
    const targetDate = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center lg:justify-start">
      <div className="grid grid-cols-4 gap-4 text-center">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="bg-redbull-navy/50 backdrop-blur-sm border border-redbull-red/30 rounded-lg p-4 animate-pulse-glow">
            <div className="text-3xl md:text-4xl font-orbitron font-bold text-redbull-red">
              {value.toString().padStart(2, '0')}
            </div>
            <div className="text-sm font-inter uppercase text-gray-300">
              {unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
