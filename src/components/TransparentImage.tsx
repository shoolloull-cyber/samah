"use client";
import React, { useEffect, useState } from "react";

interface TransparentImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function TransparentImage({ src, alt, className }: TransparentImageProps) {
  const [dataUrl, setDataUrl] = useState<string>(src);

  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        
        // Remove pure white or near-white pixels
        if (r > 240 && g > 240 && b > 240) {
          data[i + 3] = 0; // Make transparent
        } else if (r > 210 && g > 210 && b > 210 && Math.abs(r - g) < 15 && Math.abs(r - b) < 15) {
          // Semi-transparent for soft edges
          data[i + 3] = Math.max(0, a * 0.5);
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
      setDataUrl(canvas.toDataURL("image/png"));
    };
    img.src = src;
  }, [src]);

  return <img src={dataUrl} alt={alt} className={className} />;
}
