
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const FOMOTriggerBar = () => {
  const [claimedPercentage, setClaimedPercentage] = useState(42);
  const [totalClaimed, setTotalClaimed] = useState(2100000);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setClaimedPercentage(prev => Math.min(prev + Math.random() * 0.1, 100));
      setTotalClaimed(prev => prev + Math.floor(Math.random() * 1000));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-redbull-navy/95 backdrop-blur-sm border-b border-redbull-red/30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-redbull-red rounded-full animate-pulse" />
              <span className="font-orbitron font-bold text-redbull-red">
                {claimedPercentage.toFixed(1)}% CLAIMED
              </span>
            </div>
            
            <div className="text-gray-300">
              <span className="font-orbitron">{totalClaimed.toLocaleString()}</span> tokens distributed
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-gray-300">
              ⚡ Limited time: <span className="text-redbull-red font-bold">48h remaining</span>
            </div>
            
            <Button 
              size="sm"
              className="bg-redbull-red hover:bg-redbull-red/90 text-white font-rajdhani font-bold px-6 neon-glow animate-pulse-glow"
            >
              CLAIM NOW
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FOMOTriggerBar;
