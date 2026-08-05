"use client";

import React from "react";

// Individual SVG flower components with realistic gradients
let roseIdCounter = 0;

export function Rose({ color = "#e74c6f", size = 60 }: { color?: string; size?: number }) {
  const uniqueId = React.useMemo(() => `rose-${++roseIdCounter}-${Math.random().toString(36).slice(2, 7)}`, []);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <radialGradient id={uniqueId} cx="50%" cy="50%">
          <stop offset="0%" stopColor={color} />
          <stop offset="60%" stopColor={color} stopOpacity="0.9" />
          <stop offset="100%" stopColor="#8B0A1E" stopOpacity="0.7" />
        </radialGradient>
      </defs>
      {/* Outer petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="50"
          rx="22"
          ry="35"
          fill={color}
          opacity={0.7 + (i % 3) * 0.1}
          transform={`rotate(${angle} 50 50) translate(0 -10)`}
        />
      ))}
      {/* Middle petals */}
      {[20, 80, 140, 200, 260, 320].map((angle, i) => (
        <ellipse
          key={`m-${i}`}
          cx="50"
          cy="50"
          rx="16"
          ry="26"
          fill={color}
          opacity={0.85}
          transform={`rotate(${angle} 50 50) translate(0 -6)`}
          filter="brightness(1.1)"
        />
      ))}
      {/* Center */}
      <circle cx="50" cy="50" r="12" fill={color} opacity="0.95" />
      <circle cx="50" cy="50" r="6" fill="#D7B36A" opacity="0.6" />
    </svg>
  );
}

export function Daisy({ color = "#fff", size = 50 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="50"
          rx="10"
          ry="28"
          fill={color}
          opacity="0.9"
          transform={`rotate(${angle} 50 50) translate(0 -18)`}
        />
      ))}
      <circle cx="50" cy="50" r="14" fill="#FFD700" />
      <circle cx="50" cy="50" r="10" fill="#DAA520" />
    </svg>
  );
}

export function Peony({ color = "#f4a0b0", size = 65 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Many layered petals for fullness */}
      {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((angle, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="50"
          rx="24"
          ry="36"
          fill={color}
          opacity={0.5 + (i % 3) * 0.15}
          transform={`rotate(${angle} 50 50) translate(0 -12)`}
        />
      ))}
      {[15, 55, 95, 135, 175, 215, 255, 295, 335].map((angle, i) => (
        <ellipse
          key={`inner-${i}`}
          cx="50"
          cy="50"
          rx="18"
          ry="28"
          fill={color}
          opacity={0.7}
          transform={`rotate(${angle} 50 50) translate(0 -8)`}
          style={{ filter: "brightness(1.15)" }}
        />
      ))}
      <circle cx="50" cy="50" r="15" fill={color} opacity="0.9" />
      <circle cx="50" cy="50" r="8" fill="#FFE4B5" opacity="0.5" />
    </svg>
  );
}

export function Tulip({ color = "#ff6b6b", size = 55 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="40" rx="20" ry="32" fill={color} opacity="0.8" />
      <ellipse cx="36" cy="45" rx="16" ry="30" fill={color} opacity="0.7" transform="rotate(-15 36 45)" />
      <ellipse cx="64" cy="45" rx="16" ry="30" fill={color} opacity="0.7" transform="rotate(15 64 45)" />
      <ellipse cx="50" cy="42" rx="14" ry="26" fill={color} opacity="0.9" style={{ filter: "brightness(1.2)" }} />
      {/* Stem */}
      <rect x="48" y="65" width="4" height="30" rx="2" fill="#4a7c59" opacity="0.8" />
      <ellipse cx="42" cy="80" rx="12" ry="6" fill="#5a8c69" opacity="0.6" transform="rotate(-30 42 80)" />
    </svg>
  );
}

export function Sunflower({ size = 55 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {[0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336].map((angle, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="50"
          rx="10"
          ry="24"
          fill="#FFD700"
          opacity="0.85"
          transform={`rotate(${angle} 50 50) translate(0 -22)`}
        />
      ))}
      <circle cx="50" cy="50" r="16" fill="#8B4513" />
      <circle cx="50" cy="50" r="12" fill="#654321" />
      {/* Seeds pattern */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <circle
          key={`seed-${i}`}
          cx="50"
          cy="46"
          r="2"
          fill="#3d2307"
          opacity="0.5"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
    </svg>
  );
}

export function Hydrangea({ color = "#DCC8F0", size = 50 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Cluster of small flowers */}
      {[
        [30, 30], [50, 25], [70, 30],
        [25, 50], [45, 45], [65, 45], [80, 50],
        [30, 65], [50, 60], [70, 65],
        [40, 78], [60, 78],
      ].map(([cx, cy], i) => (
        <g key={i}>
          {[0, 90, 180, 270].map((angle, j) => (
            <ellipse
              key={j}
              cx={cx}
              cy={cy}
              rx="5"
              ry="8"
              fill={color}
              opacity={0.7 + (i % 3) * 0.1}
              transform={`rotate(${angle} ${cx} ${cy}) translate(0 -4)`}
            />
          ))}
          <circle cx={cx} cy={cy} r="2.5" fill="#FFE4B5" opacity="0.6" />
        </g>
      ))}
    </svg>
  );
}

// Flower types array for random selection
export const FlowerComponents = [
  { Component: Rose, colors: ["#e74c6f", "#ff4466", "#c2185b", "#e91e63", "#d81b60", "#ff6b8a"] },
  { Component: Daisy, colors: ["#fff", "#ffe4e1", "#ffc0cb", "#ffb6c1"] },
  { Component: Peony, colors: ["#f4a0b0", "#ff8fa3", "#ffb6c1", "#e88ea0", "#ff7093"] },
  { Component: Tulip, colors: ["#ff6b6b", "#ff4757", "#e74c3c", "#ff6348", "#ff7979"] },
  { Component: Sunflower, colors: ["default"] },
  { Component: Hydrangea, colors: ["#DCC8F0", "#CFE8F6", "#c9b1e8", "#b8d4e8"] },
];

export function getRandomFlower(size?: number) {
  const flowerType = FlowerComponents[Math.floor(Math.random() * FlowerComponents.length)];
  const color = flowerType.colors[Math.floor(Math.random() * flowerType.colors.length)];
  const flowerSize = size || 30 + Math.random() * 50;
  
  if (flowerType.Component === Sunflower) {
    return <Sunflower size={flowerSize} />;
  }
  return <flowerType.Component color={color} size={flowerSize} />;
}
