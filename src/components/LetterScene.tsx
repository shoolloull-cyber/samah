"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Sparkles from "./Sparkles";
import TransparentImage from "./TransparentImage";

export default function LetterScene() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative w-full min-h-screen bg-[#45281a] overflow-hidden flex items-center justify-center py-20">
      {/* Vintage texture overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full paper-texture" />
      </div>

      {/* Parisian Lamp decoration on the right edge */}
      <div className="absolute right-0 top-0 bottom-0 pointer-events-none flex items-end justify-end">
        <TransparentImage
          src="/assets/parisian-lamp.png"
          alt="Parisian Lamp"
          className="h-full w-auto max-w-none transform translate-x-[25%] md:translate-x-[15%]"
        />
      </div>

      <Sparkles count={15} colors={["#D7B36A", "rgba(255,255,255,0.3)"]} />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center px-4 w-full md:gap-16">
        {/* Envelope */}
        <motion.div
          layout
          className={`relative shrink-0 ${!isOpen ? "cursor-pointer" : ""}`}
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", stiffness: 80 }}
          onTap={() => {
            if (!isOpen) setIsOpen(true);
          }}
        >
          {/* Envelope body */}
          <motion.div
            className="relative w-[320px] h-[220px] md:w-[450px] md:h-[300px]"
            whileHover={!isOpen ? { scale: 1.03 } : {}}
            transition={{ duration: 0.3 }}
          >
            {/* Envelope image - realistic PNG */}
            <div className="w-full h-full relative overflow-visible">
              <Image
                src="/assets/envelope-transparent.png"
                alt="Envelope"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>

            {/* Wax seal overlay - disappears/breaks when opened */}
            <AnimatePresence>
              {!isOpen && (
                <motion.div
                  className="absolute bottom-[20%] left-1/2 -translate-x-1/2 z-20"
                  exit={{ scale: 0, opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-14 h-14 md:w-18 md:h-18 rounded-full bg-gradient-to-br from-[#cc0000] to-[#8B0000] shadow-lg flex items-center justify-center border-2 border-[#990000]">
                    <span className="text-[#D7B36A] text-xl font-[family-name:var(--font-playfair)] font-bold">♥</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Click hint */}
            {!isOpen && (
              <motion.p
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-sm font-[family-name:var(--font-inter)] whitespace-nowrap"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                tap to open the letter 💌
              </motion.p>
            )}
          </motion.div>
        </motion.div>

        {/* Letter content - appears when envelope is opened */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              layout
              className="mt-8 md:mt-0 w-[95vw] max-w-[480px] md:max-w-[700px] md:w-[700px] relative shrink-0"
              initial={{ opacity: 0, x: 800, rotate: 15, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, x: -800, rotate: -15, scale: 0.8 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Paper clip */}
              <div className="absolute -top-4 right-8 z-30">
                <svg width="30" height="60" viewBox="0 0 30 60">
                  <path
                    d="M15 0 L15 10 C15 15 25 15 25 22 L25 48 C25 55 5 55 5 48 L5 18 C5 13 15 13 15 18 L15 42"
                    fill="none"
                    stroke="#D7B36A"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Letter paper */}
              <div className="paper-texture rounded-lg p-6 md:p-10 shadow-2xl relative overflow-hidden bg-[#fdfaf5]">
                {/* Subtle fold line */}
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#c9b896]/30" />

                {/* ⬇️ [تعديل اسم الراسل والمستقبل للرسالة] */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex justify-between text-sm md:text-lg text-[#8B6E5A]/70 font-[family-name:var(--font-inter)] mb-6">
                    <span>From: <strong className="text-[#8B6E5A]">Arwa</strong></span>
                    <span>For: <strong className="text-[#8B6E5A]">Samah</strong></span>
                  </div>
                </motion.div>

                {/* ⬇️ [تعديل نص الرسالة بالكامل] */}
                {/* يمكنك تغيير فقرات الرسالة أو إضافة فقرات جديدة بين كود <p> و </p> */}
                <motion.div
                  className="space-y-4 md:space-y-6 text-[#5a4a3a] font-[family-name:var(--font-inter)] text-base md:text-xl leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 1 }}
                >
                  <p className="font-[family-name:var(--font-playfair)] italic text-xl md:text-3xl text-[#8B0A1E]">
                    Happy birthday Samah 🎂❤️
                  </p>
                  <p>Happy Birthday to the most precious one in my life❤️ I don't think I'll ever find enough words to explain how much you truly mean to me but Thank you for being the kind of friend who makes life feel easier without even trying your presence has a way of making everything better. Every time we're together the simplest moments somehow become my favorite memories every laugh feels louder, every conversation feels more meaningful and every place becomes more special just because you're there.</p>

                  <p>Honestly i can't imagine my days without you. No matter what I'm going through knowing that I have you beside me gives me so much comfort you've always been someone I can lean on, someone who listens without judging, supports me without hesitation and reminds me that I'm never alone. Thank you for every memory we've made together, for every time you've made me smile when I needed it the most, for every piece of advice, every laugh, every random conversation, and every moment that reminded me how lucky I am to have you in my life. I hope we never lose what we have, I hope years from now we're still making memories together, laughing over the same silly things, supporting each other through every new chapter, and celebrating every thing side by side.I hope this year brings you endless happiness, success in everything you dream of I love you, always. ❤️</p>
                </motion.div>

                {/* Decorative hearts */}
                <motion.div
                  className="absolute top-4 right-4 text-[#E9A5B5]/30 text-2xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ♥
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
