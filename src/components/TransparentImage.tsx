"use client";
import React, { useEffect, useState } from "react";

interface TransparentImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

const imageCache = new Map<string, string>();

export default function TransparentImage({ src, alt, className, style }: TransparentImageProps) {
  const [dataUrl, setDataUrl] = useState<string>(() => imageCache.get(src) || src);

  useEffect(() => {
    if (imageCache.has(src)) {
      setDataUrl(imageCache.get(src)!);
      return;
    }

    let isMounted = true;

    const processImage = () => {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        if (!isMounted) return;
        const canvas = document.createElement("canvas");
        
        // Scale down large images for fast canvas processing
        const maxDim = 600;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        
        ctx.drawImage(img, 0, 0, width, height);
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          // Remove pure white or near-white pixels
          if (r > 240 && g > 240 && b > 240) {
            data[i + 3] = 0; // Make transparent
          } else if (r > 210 && g > 210 && b > 210 && Math.abs(r - g) < 15 && Math.abs(r - b) < 15) {
            // Semi-transparent for soft edges
            data[i + 3] = Math.max(0, data[i + 3] * 0.5);
          }
        }
        
        ctx.putImageData(imageData, 0, 0);
        const result = canvas.toDataURL("image/png");
        imageCache.set(src, result);
        if (isMounted) {
          setDataUrl(result);
        }
      };
      img.src = src;
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      (window as any).requestIdleCallback(processImage);
    } else {
      setTimeout(processImage, 10);
    }

    return () => {
      isMounted = false;
    };
  }, [src]);

  return <img src={dataUrl} alt={alt} className={className} style={style} decoding="async" loading="lazy" />;
}

