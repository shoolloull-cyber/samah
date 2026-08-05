"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ClosingScene() {
  return (
    <section className="relative w-full min-h-screen bg-[#f7f5f0] flex flex-col items-center justify-center py-20 px-4 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/assets/white-plaid-bg.jpg"
          alt="White plaid background"
          fill
          className="object-cover opacity-50"
        />
      </div>

      {/* Nick on the left edge */}
      <motion.div
        className="absolute left-0 bottom-0 w-[40vw] md:w-[25vw] max-w-[350px] z-10 pointer-events-none"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Image src="/assets/nick-left.png" alt="Nick" width={400} height={600} className="w-full h-auto object-contain drop-shadow-xl" />
      </motion.div>

      {/* Judy on the right edge */}
      <motion.div
        className="absolute right-0 bottom-0 w-[40vw] md:w-[25vw] max-w-[350px] z-10 pointer-events-none"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      >
        <Image src="/assets/judy-right.png" alt="Judy" width={400} height={600} className="w-full h-auto object-contain drop-shadow-xl" />
      </motion.div>

      {/* Main content */}
      <div className="relative z-20 w-full max-w-5xl flex flex-col items-center pb-20">
        {/* Main text */}
        <motion.div
          className="text-center mt-8 md:mt-12 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-playfair)] italic text-[#b92b3a]">
            Partners in Laughter, Best Friends Forever
          </h2>
        </motion.div>
      </div>


    </section>
  );
}
