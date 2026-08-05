"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import TransparentImage from "./TransparentImage";
import Balloons from "./Balloons";
import Sparkles from "./Sparkles";

export default function ScrapbookScene() {
  const ref = useRef(null);

  const slideIn = (direction: "left" | "right" | "top" | "bottom", delay: number = 0) => ({
    initial: {
      opacity: 0,
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
      y: direction === "top" ? -50 : direction === "bottom" ? 50 : 0,
      scale: 0.8,
      rotate: direction === "left" ? -10 : direction === "right" ? 10 : 0,
    },
    whileInView: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: direction === "left" ? -5 : direction === "right" ? 5 : 0,
    },
    viewport: { once: true, amount: 0.2 },
    transition: {
      duration: 0.8,
      delay,
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  });

  return (
    <section ref={ref} className="relative w-full min-h-screen overflow-hidden flex flex-col justify-center py-20 px-4 md:px-8">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/assets/pink-plaid-bg.jpg"
          alt="Pink plaid background"
          fill
          className="object-cover opacity-90"
        />
        {/* Subtle white overlay to soften the plaid */}
        <div className="absolute inset-0 bg-white/40" />
      </div>

      {/* Background decoration */}
      <Balloons count={8} />

      <Sparkles count={25} colors={["#D7B36A", "#fff", "rgba(255,255,255,0.5)"]} />

      <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col items-center gap-16 md:gap-24">
        
        {/* Section Heading */}
        <motion.div
          className="w-full text-center mt-4 md:mt-8 mb-8 md:mb-12 relative z-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-playfair)] italic text-[#b92b3a] drop-shadow-sm">
            The Soundtrack of Us
          </h2>
          <p className="text-[#5A3E2B] mt-5 text-base md:text-xl font-[family-name:var(--font-playfair)] italic max-w-3xl mx-auto px-4 font-medium leading-relaxed drop-shadow-sm">
            Every beautiful memory we have has its own special melody. This is the one that always reminds me of your beautiful smile and the warmth of your heart.
          </p>
        </motion.div>

        {/* Top Section: Music Player & Bear */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 relative">
          
          {/* Spotify Icon Decoration */}
          <motion.div
            className="absolute top-[-15%] left-[-5%] md:top-[5%] md:left-[-120px] lg:left-[-220px] z-0 pointer-events-none"
            animate={{ y: [-15, 15, -15], rotate: [-8, 4, -8] }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
          >
            <div className="w-[180px] md:w-[280px]">
              <Image
                src="/assets/spotify-icon.png"
                alt="Spotify Icon"
                width={280}
                height={280}
                className="w-full h-auto object-contain opacity-70 drop-shadow-[0_15px_25px_rgba(255,100,150,0.4)]"
                style={{ mixBlendMode: "multiply" }}
              />
            </div>
          </motion.div>

          {/* Cassette Tape Decoration */}
          <motion.div
            className="absolute bottom-[-20%] right-[-10%] md:top-[10%] md:right-[-200px] lg:right-[-320px] z-0 pointer-events-none"
            animate={{ y: [-20, 20, -20], rotate: [12, -2, 12] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, delay: 1 }}
          >
            <div className="w-[240px] md:w-[420px]">
              <Image
                src="/assets/cassette.png"
                alt="Vintage Cassette Tape"
                width={420}
                height={280}
                className="w-full h-auto object-contain opacity-60 drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)]"
                style={{ mixBlendMode: "multiply" }}
              />
            </div>
          </motion.div>

          {/* Realistic Spotify Music Player */}
          <motion.div
            {...slideIn("left", 0.2)}
            className="w-[280px] sm:w-[320px] relative z-30 drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)] rotate-[-2deg]"
          >
            <Image 
              src="/assets/spotify-frame.jpg"
              alt="Music Player Frame"
              width={468}
              height={638}
              className="w-full h-auto object-contain rounded-xl"
              priority
            />
            
            {/* ⬇️ [تعديل رابط فيديو يوتيوب / الأغنية داخل مشغل الموسيقى] */}
            {/* لتغيير الأغنية: انسخ الـ ID الخاص بالفيديو من رابط يوتيوب وضعه مكان MrmPDUvKyLs */}
            <div className="absolute top-[8%] left-[8%] right-[8%] bottom-[32%] overflow-hidden rounded-[2px] bg-black">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/MrmPDUvKyLs?autoplay=0&controls=1&rel=0&showinfo=0" 
                title="Special Birthday Song" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="absolute inset-0 w-full h-full pointer-events-auto"
              ></iframe>
            </div>

            {/* ⬇️ [تعديل اسم الأغنية واسم المغني المعروض تحت مشغل الموسيقى] */}
            <div className="absolute top-[71.5%] left-0 right-0 text-center px-4 pointer-events-none">
              <h3 className="text-[#202020] font-bold text-lg leading-tight mb-[1px]" style={{ fontFamily: "var(--font-playfair)" }}>Favorite Song</h3>
              <p className="text-[#505050] text-xs font-medium">For Farida</p>
            </div>
          </motion.div>

          {/* Teddy Bear / Snoopy */}
          <motion.div {...slideIn("right", 0.4)} className="relative z-20">
            <motion.div
              className="relative w-[340px] h-[340px] md:w-[520px] md:h-[520px]"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <TransparentImage
                src="/assets/snoopy.png"
                alt="Snoopy with headphones"
                className="w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)]"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
