"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroScene from "@/components/HeroScene";
import FlowerBurstScene from "@/components/FlowerBurstScene";
import ScrapbookScene from "@/components/ScrapbookScene";
import LetterScene from "@/components/LetterScene";
import ClosingScene from "@/components/ClosingScene";

export default function Home() {
  const [giftOpened, setGiftOpened] = useState(false);
  const [showScenes, setShowScenes] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Force scroll to top on refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Preload critical first-screen images for fast initial loader
    const criticalImages = [
      "/assets/gift-box-before.png",
      "/assets/gift-box-after.png",
      "/assets/birthday-cat-hat.png",
      "/assets/white-plaid-bg.jpg",
    ];

    // Preload remaining scene assets in background so scrolling is 100% instant
    const secondaryImages = [
      "/assets/flower1.png",
      "/assets/flower2.png",
      "/assets/flower3.png",
      "/assets/red-paper-bg.jpg",
      "/assets/cherries.png",
      "/assets/flower-bouquet-deco.png",
      "/assets/flower-camera.png",
      "/assets/farida_photo1.jpg",
      "/assets/farida_photo2.jpg",
      "/assets/farida_photo3.jpg",
      "/assets/farida_photo4.jpg",
      "/assets/pink-plaid-bg.jpg",
      "/assets/spotify-icon.png",
      "/assets/cassette.png",
      "/assets/spotify-frame.jpg",
      "/assets/snoopy.png",
      "/assets/parisian-lamp.png",
      "/assets/envelope-transparent.png",
      "/assets/nick-left.png",
      "/assets/judy-right.png",
    ];

    let loaded = 0;
    const checkDone = () => {
      loaded++;
      if (loaded >= criticalImages.length) {
        setTimeout(() => setIsLoading(false), 200);
        // Trigger background preloading of secondary assets
        setTimeout(() => {
          secondaryImages.forEach((src) => {
            const img = new window.Image();
            img.src = src;
          });
        }, 100);
      }
    };

    criticalImages.forEach((src) => {
      const img = new window.Image();
      img.onload = checkDone;
      img.onerror = checkDone;
      img.src = src;
    });

    // Fallback timeout - don't wait longer than 1.5s
    setTimeout(() => {
      setIsLoading(false);
      secondaryImages.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    }, 1500);
  }, []);

  const handleGiftOpened = () => {
    setGiftOpened(true);
    setTimeout(() => setShowScenes(true), 500);
  };

  return (
    <main className={`relative w-full ${!giftOpened ? 'h-screen overflow-hidden' : ''}`}>
      {/* Loading screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-[100] bg-[#0B2046] flex flex-col items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] italic text-[#D7B36A]">
                Made with Love...
              </h2>
            </motion.div>
            <motion.p
              className="mt-4 text-white/60 text-xs md:text-sm font-[family-name:var(--font-inter)] tracking-[0.2em]"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              preparing something special
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 1: Hero with gift box */}
      <HeroScene onGiftOpened={handleGiftOpened} />

      {/* Remaining scenes - Always fully rendered in the DOM to guarantee 100% smooth auto-scroll without stutter */}
      <div className="w-full">
        {/* Scene 2: Flower burst wall */}
        <FlowerBurstScene />

        {/* Scene 3: Scrapbook collage */}
        <ScrapbookScene />

        {/* Scene 4: Letter reveal */}
        <LetterScene />

        {/* Scene 5: Closing with cats */}
        <ClosingScene />
      </div>
    </main>
  );
}
