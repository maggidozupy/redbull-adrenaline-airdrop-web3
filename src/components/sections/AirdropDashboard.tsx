
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const AirdropDashboard = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  
  const [userScore, setUserScore] = useState(2840);
  const [adrenalineLevel, setAdrenalineLevel] = useState(75);

  const phases = [
    {
      name: "Launch Rush",
      status: "completed",
      progress: 100,
      reward: "5,000 RBL",
      snapshot: "Completed",
      requirements: "Connect wallet & verify identity"
    },
    {
      name: "Global Boost",
      status: "active",
      progress: 65,
      reward: "15,000 RBL",
      snapshot: "2 days remaining",
      requirements: "Minimum 1,000 Adrenaline Points"
    },
    {
      name: "Adrenaline Apex",
      status: "upcoming",
      progress: 0,
      reward: "50,000 RBL",
      snapshot: "7 days remaining",
      requirements: "Top 10% participants"
    }
  ];

  const challenges = [
    { name: "Share on Twitter", reward: 100, completed: true },
    { name: "Scan RedBull QR Code", reward: 250, completed: true },
    { name: "Stake 1,000 RBL", reward: 500, completed: false },
    { name: "Attend Virtual Event", reward: 1000, completed: false }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const dashboard = dashboardRef.current;

    if (!section || !dashboard) return;

    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(dashboard.children,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const getPhaseColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 border-green-400';
      case 'active': return 'text-redbull-red border-redbull-red';
      case 'upcoming': return 'text-gray-400 border-gray-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-redbull-navy relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-rajdhani font-bold text-redbull-white mb-6">
            AIRDROP
            <span className="text-redbull-red block">DASHBOARD</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Track your progress, complete challenges, and maximize your RBL token allocation
          </p>
        </div>

        <div ref={dashboardRef} className="grid lg:grid-cols-3 gap-8">
          {/* User Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Score Card */}
            <div className="bg-redbull-navy/50 backdrop-blur-sm border border-redbull-red/30 rounded-2xl p-6">
              <h3 className="text-xl font-rajdhani font-bold text-redbull-white mb-4">
                Your Score
              </h3>
              <div className="text-center">
                <div className="text-4xl font-orbitron font-bold text-redbull-red mb-2">
                  {userScore.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">Adrenaline Points</div>
              </div>
            </div>

            {/* Adrenaline Meter */}
            <div className="bg-redbull-navy/50 backdrop-blur-sm border border-redbull-red/30 rounded-2xl p-6">
              <h3 className="text-xl font-rajdhani font-bold text-redbull-white mb-4">
                Adrenaline Meter
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Level Progress</span>
                  <span className="font-orbitron font-bold text-redbull-red">{adrenalineLevel}%</span>
                </div>
                <Progress value={adrenalineLevel} className="h-3" />
                <div className="text-sm text-gray-400 text-center">
                  {100 - adrenalineLevel}% to next level boost
                </div>
              </div>
            </div>

            {/* Challenges */}
            <div className="bg-redbull-navy/50 backdrop-blur-sm border border-redbull-red/30 rounded-2xl p-6">
              <h3 className="text-xl font-rajdhani font-bold text-redbull-white mb-4">
                Daily Challenges
              </h3>
              <div className="space-y-3">
                {challenges.map((challenge, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${challenge.completed ? 'bg-green-500/10 border-green-500/30' : 'bg-redbull-red/10 border-redbull-red/30'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${challenge.completed ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <span className="text-sm text-gray-300">{challenge.name}</span>
                    </div>
                    <span className="font-orbitron font-bold text-xs text-redbull-red">
                      +{challenge.reward}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Phase Tracker */}
          <div className="lg:col-span-2">
            <div className="bg-redbull-navy/50 backdrop-blur-sm border border-redbull-red/30 rounded-2xl p-8">
              <h3 className="text-2xl font-rajdhani font-bold text-redbull-white mb-8 text-center">
                Multi-Phase Airdrop Tracker
              </h3>
              
              <div className="space-y-8">
                {phases.map((phase, index) => (
                  <div key={index} className={`border rounded-xl p-6 transition-all duration-300 ${getPhaseColor(phase.status)}`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <h4 className="text-xl font-rajdhani font-bold text-redbull-white mb-1">
                          Phase {index + 1}: {phase.name}
                        </h4>
                        <p className="text-sm text-gray-400">{phase.requirements}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-orbitron font-bold text-2xl text-redbull-red">
                          {phase.reward}
                        </div>
                        <div className="text-sm text-gray-400">{phase.snapshot}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Progress</span>
                        <span className="font-orbitron font-bold text-sm">{phase.progress}%</span>
                      </div>
                      <Progress value={phase.progress} className="h-2" />
                    </div>

                    {phase.status === 'active' && (
                      <div className="mt-4 flex gap-3">
                        <Button 
                          size="sm" 
                          className="bg-redbull-red hover:bg-redbull-red/90 text-white font-rajdhani font-bold"
                        >
                          Boost Score
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-redbull-red text-redbull-red hover:bg-redbull-red hover:text-white"
                        >
                          View Details
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AirdropDashboard;
