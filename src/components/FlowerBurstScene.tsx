"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function FlowerBurstScene() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const stringY = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* Crumpled red paper background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/red-paper-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for better readability */}
        <div className="absolute inset-0 bg-black/15" />
      </div>

      {/* Subtle radial glow overlays */}
      <div className="absolute inset-0 z-[1]"
        style={{
          background: "radial-gradient(circle at 20% 50%, rgba(215,179,106,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(233,165,181,0.06) 0%, transparent 50%)"
        }}
      />

      {/* Decorative Cherries - Left side */}
      <motion.div
        className="absolute top-[40%] left-[2%] md:top-[30%] md:left-[5%] z-[3] pointer-events-none"
        initial={{ opacity: 0, scale: 0, rotate: -10 }}
        whileInView={{ opacity: 1, scale: 1, rotate: [-5, 5, -5] }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4, rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
      >
        <Image
          src="/assets/cherries.png"
          alt="Cherries decoration"
          width={160}
          height={160}
          className="w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] md:w-[160px] md:h-[160px] lg:w-[200px] lg:h-[200px] object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
        />
      </motion.div>

      {/* Decorative Flower Bouquet - Right side */}
      <motion.div
        className="absolute top-[45%] right-[2%] md:top-[35%] md:right-[5%] z-[3] pointer-events-none"
        initial={{ opacity: 0, scale: 0, rotate: 15 }}
        whileInView={{ opacity: 1, scale: 1, rotate: [10, -2, 10] }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6, rotate: { duration: 6.5, repeat: Infinity, ease: "easeInOut" } }}
      >
        <Image
          src="/assets/flower-bouquet-deco.png"
          alt="Flower Bouquet decoration"
          width={170}
          height={170}
          className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[170px] md:h-[170px] lg:w-[210px] lg:h-[210px] object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
        />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 w-full min-h-screen py-24 flex flex-col justify-center items-center">

        {/* Header and Camera Container */}
        <div className="relative w-full px-4 md:px-20 pt-16 md:pt-20 flex flex-col md:flex-row items-center justify-center md:justify-around gap-10 z-20">
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] italic text-white/90"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
              Our beautiful moments
            </h2>
            <p className="text-[#D7B36A] font-[family-name:var(--font-inter)] mt-2 tracking-widest text-sm uppercase">
              Captured forever
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.div
              className="relative w-[200px] h-[200px] md:w-[280px] md:h-[280px]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/assets/flower-camera.png"
                alt="Vintage Camera with Flowers"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Clothesline Container */}
        <motion.div
          className="relative w-full max-w-[1400px] mx-auto min-h-[950px] md:min-h-[750px] mt-16 md:mt-32 pb-20"
          style={{ y: stringY }}
        >
          {/* Desktop Rope (Single continuous line across all 4 photos) */}
          <svg className="absolute top-0 left-0 w-full h-32 hidden md:block pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1000 120">
            <path d="M -20 20 Q 250 85 500 95 Q 750 85 1020 20" fill="none" stroke="#D7B36A" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
            <path d="M -20 22 Q 250 87 500 97 Q 750 87 1020 22" fill="none" stroke="#c9a050" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
          </svg>

          {/* Mobile Top Row Rope (Row 1: Photos 1 & 2) */}
          <svg className="absolute top-[6px] left-0 w-full h-16 md:hidden pointer-events-none" preserveAspectRatio="none" viewBox="0 0 500 60">
            <path d="M -10 15 Q 125 38 250 42 Q 375 38 510 15" fill="none" stroke="#D7B36A" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
            <path d="M -10 17 Q 125 40 250 44 Q 375 40 510 17" fill="none" stroke="#c9a050" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
          </svg>

          {/* Mobile Bottom Row Rope (Row 2: Photos 3 & 4) */}
          <svg className="absolute top-[430px] left-0 w-full h-16 md:hidden pointer-events-none" preserveAspectRatio="none" viewBox="0 0 500 60">
            <path d="M -10 15 Q 125 38 250 42 Q 375 38 510 15" fill="none" stroke="#D7B36A" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
            <path d="M -10 17 Q 125 40 250 44 Q 375 40 510 17" fill="none" stroke="#c9a050" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
          </svg>

          {/* Photos hanging from string */}
          <div className="absolute top-0 w-full grid grid-cols-2 md:flex md:flex-nowrap justify-center md:justify-around px-3 md:px-8 gap-x-4 md:gap-x-8 gap-y-[150px] md:gap-y-0 place-items-center">

            {/* Photo 1 */}
            <motion.div
              className="relative w-[155px] h-[260px] sm:w-[170px] sm:h-[290px] md:w-[240px] md:h-[420px] mt-2 md:mt-4"
              style={{ transformOrigin: "top center" }}
              initial={{ rotate: -5, opacity: 0, y: -30 }}
              whileInView={{ rotate: [-2, 2, -2], opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
            >
              {/* Wooden clothespin aligned with rope */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 scale-110 md:scale-125">
                <svg width="24" height="32" viewBox="0 0 24 32">
                  <rect x="3" y="0" width="7" height="28" rx="2" fill="#c4a06a" />
                  <rect x="14" y="0" width="7" height="28" rx="2" fill="#c4a06a" />
                  <rect x="3" y="8" width="18" height="6" rx="1" fill="#a88050" />
                  <circle cx="12" cy="11" r="2" fill="#8a6030" />
                </svg>
              </div>

              {/* Polaroid frame */}
              <div className="w-full h-full bg-white p-2 pb-8 md:p-3 md:pb-14 shadow-2xl rounded-sm border border-gray-100 flex flex-col">
                <div className="w-full flex-1 rounded-sm overflow-hidden relative">
                  <Image
                    src="/assets/farida_photo1.jpg"
                    alt="Memory 1"
                    fill
                    className="object-cover object-center"
                    unoptimized
                  />
                </div>
                <p className="mt-1 md:mt-2 w-full text-center text-[#8B6E5A] font-[family-name:var(--font-inter)] text-xs md:text-base font-medium">
                  Shining bright together ✨🌙
                </p>
              </div>
            </motion.div>

            {/* Photo 2 */}
            <motion.div
              className="relative w-[155px] h-[260px] sm:w-[170px] sm:h-[290px] md:w-[240px] md:h-[420px] mt-6 md:mt-24"
              style={{ transformOrigin: "top center" }}
              initial={{ rotate: 4, opacity: 0, y: -30 }}
              whileInView={{ rotate: [2, -2, 2], opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, rotate: { duration: 4.5, repeat: Infinity, ease: "easeInOut" } }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 scale-110 md:scale-125">
                <svg width="24" height="32" viewBox="0 0 24 32">
                  <rect x="3" y="0" width="7" height="28" rx="2" fill="#c4a06a" />
                  <rect x="14" y="0" width="7" height="28" rx="2" fill="#c4a06a" />
                  <rect x="3" y="8" width="18" height="6" rx="1" fill="#a88050" />
                  <circle cx="12" cy="11" r="2" fill="#8a6030" />
                </svg>
              </div>

              <div className="w-full h-full bg-white p-2 pb-8 md:p-3 md:pb-14 shadow-2xl rounded-sm border border-gray-100 flex flex-col">
                <div className="w-full flex-1 rounded-sm overflow-hidden relative">
                  <Image
                    src="/assets/farida_photo2.jpg"
                    alt="Memory 2"
                    fill
                    className="object-cover object-center"
                    unoptimized
                  />
                </div>
                <p className="mt-1 md:mt-2 w-full text-center text-[#8B6E5A] font-[family-name:var(--font-inter)] text-xs md:text-base font-medium">
                  Best teammate ever! ⚽️❤️                </p>
              </div>
            </motion.div>

            {/* Photo 3 */}
            <motion.div
              className="relative w-[155px] h-[260px] sm:w-[170px] sm:h-[290px] md:w-[240px] md:h-[420px] mt-2 md:mt-8"
              style={{ transformOrigin: "top center" }}
              initial={{ rotate: -3, opacity: 0, y: -30 }}
              whileInView={{ rotate: [-1, 2, -1], opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6, rotate: { duration: 3.8, repeat: Infinity, ease: "easeInOut" } }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 scale-110 md:scale-125">
                <svg width="24" height="32" viewBox="0 0 24 32">
                  <rect x="3" y="0" width="7" height="28" rx="2" fill="#c4a06a" />
                  <rect x="14" y="0" width="7" height="28" rx="2" fill="#c4a06a" />
                  <rect x="3" y="8" width="18" height="6" rx="1" fill="#a88050" />
                  <circle cx="12" cy="11" r="2" fill="#8a6030" />
                </svg>
              </div>

              <div className="w-full h-full bg-white p-2 pb-8 md:p-3 md:pb-14 shadow-2xl rounded-sm border border-gray-100 flex flex-col">
                <div className="w-full flex-1 rounded-sm overflow-hidden relative">
                  <Image
                    src="/assets/farida_photo3.jpg"
                    alt="Memory 3"
                    fill
                    className="object-cover object-center"
                    unoptimized
                  />
                </div>
                <p className="mt-1 md:mt-2 w-full text-center text-[#8B6E5A] font-[family-name:var(--font-inter)] text-xs md:text-base font-medium">
                  Unplanned & iconically us 🤪📸
                </p>
              </div>
            </motion.div>

            {/* Photo 4 */}
            <motion.div
              className="relative w-[155px] h-[260px] sm:w-[170px] sm:h-[290px] md:w-[240px] md:h-[420px] mt-6 md:mt-16"
              style={{ transformOrigin: "top center" }}
              initial={{ rotate: 4, opacity: 0, y: -30 }}
              whileInView={{ rotate: [3, -1, 3], opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8, rotate: { duration: 4.2, repeat: Infinity, ease: "easeInOut" } }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 scale-110 md:scale-125">
                <svg width="24" height="32" viewBox="0 0 24 32">
                  <rect x="3" y="0" width="7" height="28" rx="2" fill="#c4a06a" />
                  <rect x="14" y="0" width="7" height="28" rx="2" fill="#c4a06a" />
                  <rect x="3" y="8" width="18" height="6" rx="1" fill="#a88050" />
                  <circle cx="12" cy="11" r="2" fill="#8a6030" />
                </svg>
              </div>

              <div className="w-full h-full bg-white p-2 pb-8 md:p-3 md:pb-14 shadow-2xl rounded-sm border border-gray-100 flex flex-col">
                <div className="w-full flex-1 rounded-sm overflow-hidden relative">
                  <Image
                    src="/assets/farida_photo4.jpg"
                    alt="Memory 4"
                    fill
                    className="object-cover object-center"
                    unoptimized
                  />
                </div>
                <p className="mt-1 md:mt-2 w-full text-center text-[#8B6E5A] font-[family-name:var(--font-inter)] text-xs md:text-base font-medium">
                  forever & always 🤍
                </p>
              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
