import React from "react";

export function RealisticFlower({ size = 50, id = 0 }: { size?: number; id?: number }) {
  // We have a sprite sheet or a collection of flowers.
  // We'll use CSS to just show a random crop of the flowers-collection.png
  // Assuming a grid of 3x3 or similar in the collection. Let's just pick random background positions.
  const rows = 3;
  const cols = 3;
  const x = (id % cols) * 100;
  const y = (Math.floor(id / cols) % rows) * 100;

  return (
    <div 
      style={{
        width: size,
        height: size,
        backgroundImage: 'url(/assets/flowers-collection.png)',
        backgroundSize: '300% 300%', // Assuming 3x3 grid
        backgroundPosition: `${x}% ${y}%`,
        backgroundRepeat: 'no-repeat',
        filter: 'drop-shadow(0px 5px 10px rgba(0,0,0,0.3))'
      }}
      className="rounded-full"
    />
  );
}
