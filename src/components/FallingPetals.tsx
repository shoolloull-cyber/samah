"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PetalProps {
  count?: number;
}

export default function FallingPetals({ count = 20 }: PetalProps) {
  const [petals, setPetals] = useState<any[]>([]);

  useEffect(() => {
    setPetals(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 8,
        size: 8 + Math.random() * 16,
        rotation: Math.random() * 360,
        color: [
          "#F8D7DA",
          "#E9A5B5",
          "#f4a0b0",
          "#ffb6c1",
          "#ff8fa3",
          "#dba4b0",
        ][Math.floor(Math.random() * 6)],
        shape: Math.random() > 0.5 ? "petal" : "round",
      }))
    );
  }, [count]);

  if (petals.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size * (p.shape === "petal" ? 1.4 : 1),
            borderRadius: p.shape === "petal" ? "50% 0 50% 0" : "50%",
            background: p.color,
            opacity: 0.7,
            filter: "blur(0.5px)",
          }}
          initial={{ y: -50, rotate: p.rotation, opacity: 0 }}
          animate={{
            y: ["0vh", "110vh"],
            rotate: [p.rotation, p.rotation + 720],
            x: [0, Math.sin(p.id) * 80, -Math.sin(p.id) * 40, 0],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
