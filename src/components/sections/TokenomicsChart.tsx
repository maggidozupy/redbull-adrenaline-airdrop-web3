
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TokenomicsChart = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  const tokenomics = [
    { label: "Community", percentage: 40, color: "#d60408", description: "Airdrops, rewards, and community incentives" },
    { label: "Team", percentage: 20, color: "#001629", description: "Core team allocation with vesting schedule" },
    { label: "Marketing", percentage: 15, color: "#ffffff", description: "Marketing campaigns and partnerships" },
    { label: "Reserves", percentage: 25, color: "#d6040850", description: "Treasury and future development" }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const chart = chartRef.current;

    if (!section || !chart) return;

    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      onEnter: () => {
        // Animate chart segments
        const segments = chart.querySelectorAll('.chart-segment');
        segments.forEach((segment, index) => {
          gsap.fromTo(segment,
            { strokeDasharray: "0 100" },
            {
              strokeDasharray: `${tokenomics[index].percentage} 100`,
              duration: 1.5,
              delay: index * 0.2,
              ease: "power2.out"
            }
          );
        });

        // Animate percentage counters
        tokenomics.forEach((item, index) => {
          const counter = document.querySelector(`#counter-${index}`);
          if (counter) {
            gsap.fromTo({ value: 0 },
              { value: item.percentage },
              {
                duration: 1.5,
                delay: index * 0.2,
                onUpdate: function() {
                  counter.textContent = Math.round(this.targets()[0].value) + '%';
                }
              }
            );
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-rajdhani font-bold text-redbull-white mb-6">
            TOKENOMICS
            <span className="text-redbull-red block">BREAKDOWN</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transparent allocation ensuring sustainable growth and community rewards
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Chart */}
          <div className="flex justify-center">
            <div ref={chartRef} className="relative w-80 h-80">
              <svg viewBox="0 0 42 42" className="w-full h-full transform -rotate-90">
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#001629" strokeWidth="3" />
                
                {tokenomics.map((item, index) => {
                  const offset = tokenomics.slice(0, index).reduce((sum, prev) => sum + prev.percentage, 0);
                  return (
                    <circle
                      key={index}
                      className="chart-segment"
                      cx="21"
                      cy="21"
                      r="15.915"
                      fill="transparent"
                      stroke={item.color}
                      strokeWidth="3"
                      strokeDasharray="0 100"
                      strokeDashoffset={-offset}
                      style={{ transition: 'stroke-dasharray 1s ease-in-out' }}
                    />
                  );
                })}
              </svg>
              
              {/* Center Label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-orbitron font-bold text-redbull-red">1B</div>
                  <div className="text-sm text-gray-300">RBL TOKENS</div>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-6">
            {tokenomics.map((item, index) => (
              <div key={index} className="bg-redbull-navy/30 backdrop-blur-sm border border-redbull-red/30 rounded-lg p-6 hover:border-redbull-red/60 transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-3">
                  <div 
                    className="w-6 h-6 rounded-full border-2"
                    style={{ backgroundColor: item.color, borderColor: item.color }}
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-rajdhani font-bold text-redbull-white">
                      {item.label}
                    </h3>
                    <div 
                      id={`counter-${index}`}
                      className="text-2xl font-orbitron font-bold text-redbull-red group-hover:text-redbull-white transition-colors"
                    >
                      0%
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenomicsChart;
