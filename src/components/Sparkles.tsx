"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SparkleProps {
  count?: number;
  colors?: string[];
}

function Sparkle({ delay, color, size, x, y }: { delay: number; color: string; size: number; x: number; y: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: color,
        boxShadow: `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: 2 + Math.random() * 2,
        delay: delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 3,
        ease: "easeInOut",
      }}
    />
  );
}

export default function Sparkles({ count = 16, colors = ["#D7B36A", "#fff", "#F8D7DA", "#E9A5B5"] }: SparkleProps) {
  const [sparkles, setSparkles] = useState<any[]>([]);
  const colorsRef = React.useRef(colors);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const actualCount = isMobile ? Math.min(count, 10) : count;
    const c = colorsRef.current;
    setSparkles(
      Array.from({ length: actualCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 4,
        color: c[Math.floor(Math.random() * c.length)],
      }))
    );
  }, [count]);

  if (sparkles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ transform: "translateZ(0)" }}>
      {sparkles.map((s) => (
        <Sparkle key={s.id} delay={s.delay} color={s.color} size={s.size} x={s.x} y={s.y} />
      ))}
    </div>
  );
}
