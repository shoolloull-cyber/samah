"use client";

import React, { useState, useEffect } from 'react';

interface BalloonProps {
  id: number;
  left: string;
  delay: string;
  duration: string;
  scale: number;
  color: string;
  wiggleDuration: string;
}

export default function Balloons({ count = 10 }: { count?: number }) {
  const [balloons, setBalloons] = useState<BalloonProps[]>([]);

  useEffect(() => {
    setBalloons(Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${10 + Math.random() * 15}s`,
      scale: 0.6 + Math.random() * 0.6,
      color: ["#ff9999", "#ff8080", "#ff6666", "#ffb3b3"][Math.floor(Math.random() * 4)],
      wiggleDuration: `${2 + Math.random() * 3}s`,
    })));
  }, [count]);

  if (balloons.length === 0) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(150px) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-120vh) translateX(0); opacity: 0; }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-8deg) translateX(-15px); }
          50% { transform: rotate(8deg) translateX(15px); }
        }
        .balloon-container {
          position: absolute;
          bottom: -150px;
          animation-name: floatUp;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .balloon-wiggle {
          animation-name: wiggle;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
      `}</style>
      
      {balloons.map((b) => (
        <div
          key={b.id}
          className="balloon-container"
          style={{ 
            left: b.left,
            animationDuration: b.duration,
            animationDelay: b.delay
          }}
        >
          <div 
            className="balloon-wiggle w-[60px] h-[75px] md:w-[80px] md:h-[100px] rounded-[50%] relative"
            style={{ 
              backgroundColor: b.color,
              transform: `scale(${b.scale})`,
              boxShadow: "inset -10px -10px 15px rgba(0,0,0,0.1), inset 5px 5px 10px rgba(255,255,255,0.4)",
              animationDuration: b.wiggleDuration,
              animationDelay: b.delay
            }}
          >
            {/* Balloon string */}
            <svg className="absolute -bottom-12 left-1/2 -translate-x-1/2 overflow-visible" width="20" height="60" viewBox="0 0 20 60">
              <path d="M10,0 C15,15 5,30 10,45 C15,55 10,60 10,60" fill="transparent" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
              <polygon points="5,0 15,0 10,5" fill={b.color} />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
