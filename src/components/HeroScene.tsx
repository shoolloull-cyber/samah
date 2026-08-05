"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sparkles from "./Sparkles";

interface HeroSceneProps {
  onGiftOpened: () => void;
}

// ===================== FLOWER PARTICLES =====================
interface FlowerParticle {
  x: number;
  y: number;
  delay: number;
  active: boolean;
  imageIndex: number;
  targetX: number;
  targetY: number;
  ease: number;
  size: number;
  targetSize: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  vy: number;
}

function createFlowerParticle(
  x: number, y: number, delay: number, screenW: number, screenH: number
): FlowerParticle {
  return {
    x, y, delay, active: false,
    imageIndex: Math.floor(Math.random() * 3),
    targetX: (Math.random() - 0.5) * (screenW * 1.6) + screenW * 0.5,
    targetY: (Math.random() - 0.5) * (screenH * 1.6) + screenH * 0.5,
    ease: Math.random() * 0.03 + 0.02,
    size: 0,
    targetSize: Math.random() * 180 + 100,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.1,
    opacity: 0,
    vy: 0,
  };
}

function updateFlowerParticle(p: FlowerParticle) {
  if (p.delay > 0) { p.delay--; return; }
  p.active = true;
  p.x += (p.targetX - p.x) * p.ease;
  p.y += (p.targetY - p.y) * p.ease;
  p.size += (p.targetSize - p.size) * 0.05;
  p.rotation += p.rotationSpeed;
  if (p.opacity < 1) p.opacity += 0.08;
}

// ===================== CONFETTI PARTICLES =====================
interface ConfettiPiece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  gravity: number;
  drag: number;
  opacity: number;
  type: "ribbon" | "circle" | "star" | "streamer";
  wobble: number;
  wobbleSpeed: number;
  life: number;
  maxLife: number;
  scaleX: number; // for 3D ribbon twisting
  twistSpeed: number;
}

const CONFETTI_COLORS = [
  "#FF6B8A", "#FFD700", "#FF69B4", "#00CED1", "#FF4500",
  "#7B68EE", "#FF1493", "#32CD32", "#FF8C00", "#E6E6FA",
  "#F8E5B6", "#D7B36A", "#FF6347", "#87CEEB", "#FFB6C1",
  "#FFA07A", "#98FB98", "#DDA0DD", "#F0E68C", "#ADD8E6",
];

function createConfettiPiece(centerX: number, centerY: number): ConfettiPiece {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const speedMultiplier = isMobile ? 0.5 : 1.0;

  const angle = Math.random() * Math.PI * 2;
  const speed = (8 + Math.random() * 18) * speedMultiplier;
  const types: ConfettiPiece["type"][] = ["ribbon", "ribbon", "ribbon", "circle", "star", "streamer"];

  return {
    x: centerX + (Math.random() - 0.5) * 60,
    y: centerY + (Math.random() - 0.5) * 40,
    vx: Math.cos(angle) * speed * (0.6 + Math.random() * 0.8),
    vy: Math.sin(angle) * speed - (6 + Math.random() * 10) * speedMultiplier,
    width: 4 + Math.random() * 10,
    height: 8 + Math.random() * 18,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.3,
    gravity: (0.12 + Math.random() * 0.08) * speedMultiplier,
    drag: 0.98 + Math.random() * 0.015,
    opacity: 1,
    type: types[Math.floor(Math.random() * types.length)],
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.05 + Math.random() * 0.1,
    life: 0,
    maxLife: 180 + Math.random() * 120, // 3-5 seconds at 60fps
    scaleX: 1,
    twistSpeed: 0.08 + Math.random() * 0.12,
  };
}

function updateConfettiPiece(p: ConfettiPiece): boolean {
  p.life++;
  if (p.life > p.maxLife) return false;

  p.vy += p.gravity;
  p.vx *= p.drag;
  p.vy *= p.drag;

  // Wobble for realistic floating
  p.wobble += p.wobbleSpeed;
  p.x += p.vx + Math.sin(p.wobble) * 1.5;
  p.y += p.vy;

  p.rotation += p.rotationSpeed;

  // 3D ribbon twisting
  p.scaleX = Math.sin(p.life * p.twistSpeed);

  // Fade out near end of life
  if (p.life > p.maxLife * 0.7) {
    p.opacity = 1 - ((p.life - p.maxLife * 0.7) / (p.maxLife * 0.3));
  }

  return true;
}

function drawConfettiPiece(ctx: CanvasRenderingContext2D, p: ConfettiPiece) {
  ctx.save();
  ctx.globalAlpha = Math.max(0, p.opacity);
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.scale(p.scaleX, 1);

  switch (p.type) {
    case "ribbon":
      // Gradient ribbon
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.roundRect(-p.width / 2, -p.height / 2, p.width, p.height, 2);
      ctx.fill();
      // Shine highlight
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.fillRect(-p.width / 2, -p.height / 2, p.width * 0.4, p.height);
      break;

    case "circle":
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(0, 0, p.width / 2, 0, Math.PI * 2);
      ctx.fill();
      // Shine
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.beginPath();
      ctx.arc(-p.width * 0.15, -p.width * 0.15, p.width * 0.2, 0, Math.PI * 2);
      ctx.fill();
      break;

    case "star": {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      const spikes = 5;
      const outerR = p.width * 0.6;
      const innerR = p.width * 0.25;
      for (let i = 0; i < spikes * 2; i++) {
        const r = i % 2 === 0 ? outerR : innerR;
        const a = (i * Math.PI) / spikes - Math.PI / 2;
        if (i === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
        else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      }
      ctx.closePath();
      ctx.fill();
      break;
    }

    case "streamer":
      // Long curling streamer
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(0, -p.height);
      ctx.quadraticCurveTo(p.width * 2, -p.height * 0.3, 0, p.height * 0.5);
      ctx.quadraticCurveTo(-p.width * 1.5, p.height, 0, p.height * 1.5);
      ctx.stroke();
      break;
  }

  ctx.restore();
}

// ===================== COMPONENT =====================
export default function HeroScene({ onGiftOpened }: HeroSceneProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showHappyBirthday, setShowHappyBirthday] = useState(false);
  const [showCat, setShowCat] = useState(false);
  const [boxFading, setBoxFading] = useState(false);
  const [boxHidden, setBoxHidden] = useState(false);

  // Flower refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flowerParticlesRef = useRef<FlowerParticle[]>([]);
  const flowerAnimRef = useRef<number>(0);
  const flowerImagesRef = useRef<HTMLImageElement[]>([]);
  const isFallingRef = useRef(false);

  // Confetti refs
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);
  const confettiRef = useRef<ConfettiPiece[]>([]);
  const confettiAnimRef = useRef<number>(0);
  const confettiFiredRef = useRef(false);

  // Timing constants (responsive)
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const slowFactor = isMobile ? 1.5 : 1.0;
  const delayFactor = isMobile ? 1.2 : 1.0;

  // ⬇️ [تعديل حساب توقيت التأثير عند تغيير الكلمة السطر الثاني]
  const TYPING_LINE1 = "happy birthday".length * 0.1 * slowFactor;
  const TYPING_PAUSE = 0.4 * slowFactor;
  const TYPING_LINE2 = "favorite".length * 0.15 * slowFactor;
  const CAT_DELAY_AFTER_TYPING = 0.5 * slowFactor;
  const TOTAL_TYPING_TIME = (TYPING_LINE1 + TYPING_PAUSE + TYPING_LINE2 + CAT_DELAY_AFTER_TYPING) * 1000;

  // Show "For Ahmed" text after a delay
  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Preload flower images
  useEffect(() => {
    const srcs = ["/assets/flower1.png", "/assets/flower2.png", "/assets/flower3.png"];
    const loaded: HTMLImageElement[] = [];
    srcs.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      loaded.push(img);
    });
    flowerImagesRef.current = loaded;
  }, []);

  // Canvas resize for flowers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Canvas resize for confetti
  useEffect(() => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Flower animation loop
  const animateFlowers = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const particles = flowerParticlesRef.current;
    const images = flowerImagesRef.current;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      updateFlowerParticle(p);
      if (isFallingRef.current) {
        p.vy += 0.8 + Math.random() * 0.5; // Add slightly randomized gravity
        p.y += p.vy;
      }
      if (!p.active) continue;
      ctx.save();
      ctx.globalAlpha = Math.min(p.opacity, 1);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      const img = images[p.imageIndex];
      if (img && img.complete) ctx.drawImage(img, -p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    }
    flowerAnimRef.current = requestAnimationFrame(animateFlowers);
  }, []);

  // Confetti animation loop
  const animateConfetti = useCallback(() => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const pieces = confettiRef.current;
    confettiRef.current = pieces.filter((p) => updateConfettiPiece(p));

    for (const p of confettiRef.current) {
      drawConfettiPiece(ctx, p);
    }

    if (confettiRef.current.length > 0) {
      confettiAnimRef.current = requestAnimationFrame(animateConfetti);
    }
  }, []);

  // Fire confetti burst
  const fireConfetti = useCallback(() => {
    if (confettiFiredRef.current) return;
    confettiFiredRef.current = true;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight * 0.55; // below text, near cat

    const pieces: ConfettiPiece[] = [];
    // Main burst from center
    for (let i = 0; i < 150; i++) {
      pieces.push(createConfettiPiece(centerX, centerY));
    }
    // Left burst
    for (let i = 0; i < 60; i++) {
      const p = createConfettiPiece(centerX * 0.3, centerY * 0.6);
      p.vx = Math.abs(p.vx) * 1.2; // push right
      pieces.push(p);
    }
    // Right burst
    for (let i = 0; i < 60; i++) {
      const p = createConfettiPiece(centerX * 1.7, centerY * 0.6);
      p.vx = -Math.abs(p.vx) * 1.2; // push left
      pieces.push(p);
    }
    // Top shower
    for (let i = 0; i < 80; i++) {
      const p = createConfettiPiece(Math.random() * window.innerWidth, -20);
      p.vy = 2 + Math.random() * 4;
      p.vx = (Math.random() - 0.5) * 6;
      pieces.push(p);
    }

    confettiRef.current = pieces;
    animateConfetti();

    // Second wave after 300ms
    setTimeout(() => {
      const wave2: ConfettiPiece[] = [];
      for (let i = 0; i < 80; i++) {
        wave2.push(createConfettiPiece(centerX, centerY - 50));
      }
      for (let i = 0; i < 50; i++) {
        const p = createConfettiPiece(Math.random() * window.innerWidth, -10);
        p.vy = 3 + Math.random() * 5;
        p.vx = (Math.random() - 0.5) * 8;
        wave2.push(p);
      }
      confettiRef.current = [...confettiRef.current, ...wave2];
    }, 300);

    // Third smaller wave
    setTimeout(() => {
      const wave3: ConfettiPiece[] = [];
      for (let i = 0; i < 50; i++) {
        wave3.push(createConfettiPiece(centerX + (Math.random() - 0.5) * 400, centerY));
      }
      confettiRef.current = [...confettiRef.current, ...wave3];
    }, 700);
  }, [animateConfetti]);

  // Trigger confetti when cat appears
  useEffect(() => {
    if (showCat) {
      fireConfetti();
    }
  }, [showCat, fireConfetti]);

  // Show cat after typing finishes
  useEffect(() => {
    if (!showHappyBirthday) return;
    const timer = setTimeout(() => setShowCat(true), TOTAL_TYPING_TIME);
    return () => clearTimeout(timer);
  }, [showHappyBirthday, TOTAL_TYPING_TIME]);

  const handleGiftClick = () => {
    if (isClicked) return;
    setIsClicked(true);

    // Get box position
    const boxEl = document.getElementById("hero-gift-box");
    const startX = boxEl
      ? boxEl.getBoundingClientRect().left + boxEl.getBoundingClientRect().width / 2
      : window.innerWidth / 2;
    const startY = boxEl
      ? boxEl.getBoundingClientRect().top + boxEl.getBoundingClientRect().height / 2
      : window.innerHeight / 2;

    // Create 800 flower particles for full screen coverage
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const particles: FlowerParticle[] = [];
    for (let i = 0; i < 800; i++) {
      particles.push(createFlowerParticle(startX, startY, Math.floor(Math.random() * 70), screenW, screenH));
    }
    flowerParticlesRef.current = particles;
    animateFlowers();

    // Start fading box and make flowers fall at 4.5s (adjusted by delayFactor)
    setTimeout(() => {
      setBoxFading(true);
      isFallingRef.current = true;
    }, 4500 * delayFactor);

    // Hide flowers and box at 5.7s, THEN start typing
    setTimeout(() => {
      setBoxHidden(true);
      cancelAnimationFrame(flowerAnimRef.current);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      // Now show the typewriter text
      setShowHappyBirthday(true);
    }, 5700 * delayFactor);

    // Trigger parent callback and auto-scroll after everything completes
    setTimeout(() => {
      onGiftOpened();
      // Scroll immediately after since components are already fully rendered
      setTimeout(() => {
        const scrollOffset = window.innerWidth < 768 ? 50 : 250;
        window.scrollTo({ top: window.innerHeight + scrollOffset, behavior: "smooth" });
      }, 100);
    }, 5700 * delayFactor + TOTAL_TYPING_TIME + 1200 * delayFactor);
  };

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0B2046]">
      <Sparkles count={20} colors={["rgba(215,179,106,0.4)", "rgba(255,255,255,0.2)"]} />

      {/* Canvas for flower explosion */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 30 }}
      />

      {/* Canvas for confetti explosion */}
      <canvas
        ref={confettiCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 50 }}
      />

      {/* Gift Box Container */}
      {!boxHidden && (
        <div
          className="relative z-20 cursor-pointer flex flex-col items-center"
          onClick={handleGiftClick}
          style={{
            opacity: boxFading ? 0 : 1,
            transform: boxFading ? "translateY(100vh)" : "translateY(0)",
            transition: "transform 1.2s cubic-bezier(0.55, 0.085, 0.68, 0.53), opacity 1.2s ease-in",
          }}
        >
          {/* Gift box image */}
          <motion.img
            id="hero-gift-box"
            src={isClicked ? "/assets/gift-box-after.png" : "/assets/gift-box-before.png"}
            alt="Gift Box"
            className="relative"
            style={{ width: "250px", filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.2))" }}
            animate={
              !isClicked
                ? { x: [1, -2, -4, 4, 2, -2, -4, 4, -2, 2, 2], y: [1, -3, 0, 3, -2, 3, 2, 2, -2, 3, -3], rotate: [0, -1, 2, 0, 2, -1, 0, -2, 2, 0, -1] }
                : { scale: [0.9, 1], y: [10, 0] }
            }
            transition={
              !isClicked
                ? { duration: 1.5, repeat: Infinity, ease: "linear" }
                : { duration: 0.5, ease: "backOut" }
            }
          />

          {/* Instruction text */}
          {!isClicked && (
            <motion.p
              className="mt-6 text-lg md:text-xl font-semibold z-20"
              style={{ color: "#f8e5b6", textShadow: "1px 1px 2px rgba(0,0,0,0.5)", fontFamily: "var(--font-inter), sans-serif", letterSpacing: "0.05em" }}
              animate={{ scale: [1, 1.05, 1], opacity: [1, 0.8, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              tap to open
            </motion.p>
          )}
        </div>
      )}

      {/* ⬇️ [تعديل النص تحت صندوق الهدية قبل الفتح] */}
      <AnimatePresence>
        {showText && !isClicked && (
          <motion.h1
            className="mt-10 text-4xl md:text-5xl font-[family-name:var(--font-playfair)] italic text-white/90 z-20"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            For Farida
          </motion.h1>
        )}
      </AnimatePresence>

      {/* Happy Birthday Text - typewriter style (starts AFTER flowers fade) */}
      <AnimatePresence>
        {showHappyBirthday && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center justify-center gap-3 md:gap-5">
              {/* Typewriter text */}
              <div
                className="text-3xl sm:text-4xl md:text-6xl font-[family-name:var(--font-inter)] font-semibold tracking-wide text-[#f8e5b6] uppercase text-center"
                style={{ textShadow: "0 4px 30px rgba(0,0,0,0.8)" }}
              >
                {/* ⬇️ [تعديل السطر الأول من نص التهنيئة - HAPPY BIRTHDAY] */}
                <div className="flex justify-center items-center flex-wrap">
                  {"happy birthday".split("").map((char, index) => (
                    <motion.span
                      key={`hb-${index}`}
                      initial={{ opacity: 0, display: "none" }}
                      animate={{ opacity: 1, display: "inline-block" }}
                      transition={{ delay: index * 0.13, duration: 0.05 }}
                      style={{ display: "inline-block" }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                  {/* Blinking cursor */}
                  <motion.span
                    className="inline-block w-[3px] h-[0.9em] bg-[#f8e5b6] ml-1 align-middle"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </div>

                {/* ⬇️ [تعديل السطر الثاني من نص التهنيئة - FAVORITE] */}
                <div className="flex justify-center items-center flex-wrap mt-1 md:mt-2 text-3xl sm:text-4xl md:text-6xl text-[#D7B36A]">
                  {"favorite".split("").map((char, index) => {
                    const totalDelay = TYPING_LINE1 + TYPING_PAUSE + (index * 0.2);
                    return (
                    <motion.span
                        key={`j-${index}`}
                        initial={{ opacity: 0, display: "none" }}
                        animate={{ opacity: 1, display: "inline-block" }}
                        transition={{ delay: totalDelay, duration: 0.05 }}
                        style={{ display: "inline-block" }}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                  {/* Blinking cursor */}
                  <motion.span
                    className="inline-block w-[3px] h-[0.9em] bg-[#D7B36A] ml-1 align-middle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ delay: TYPING_LINE1 + TYPING_PAUSE, duration: 0.8, repeat: Infinity }}
                  />
                </div>
              </div>

              {/* Birthday cat image - appears after typing with confetti */}
              <AnimatePresence>
                {showCat && (
                  <motion.div
                    className="flex justify-center items-center relative"
                    initial={{ opacity: 0, scale: 0, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      duration: window.innerWidth < 768 ? 1.5 : 1,
                      type: "spring",
                      stiffness: 100,
                      damping: 8,
                    }}
                  >
                    {/* Glow behind cat */}
                    <motion.div
                      className="absolute rounded-full pointer-events-none"
                      style={{
                        background: "radial-gradient(circle, rgba(255,215,0,0.25) 0%, transparent 70%)",
                        width: "300px", height: "300px",
                      }}
                      animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <img
                      src="/assets/birthday-cat-hat.png"
                      alt="Birthday Cat"
                      className="w-[120px] h-auto sm:w-[150px] md:w-[200px] lg:w-[240px] object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] relative z-10"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
