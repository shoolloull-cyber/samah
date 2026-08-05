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

  // Smooth Typewriter State (Zero Layout Shift)
  const [typed1, setTyped1] = useState("");
  const [typed2, setTyped2] = useState("");

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

  // Show "For Farida" text after a delay
  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Ultra-Smooth 60FPS Typewriter Engine (Perfect Natural Rhythm: 105ms / 120ms)
  useEffect(() => {
    if (!showHappyBirthday) return;

    const full1 = "HAPPY BIRTHDAY";
    const full2 = "SAMAH";
    let i1 = 0;
    let i2 = 0;

    const timer1 = setInterval(() => {
      if (i1 <= full1.length) {
        setTyped1(full1.slice(0, i1));
        i1++;
      } else {
        clearInterval(timer1);
        setTimeout(() => {
          const timer2 = setInterval(() => {
            if (i2 <= full2.length) {
              setTyped2(full2.slice(0, i2));
              i2++;
            } else {
              clearInterval(timer2);
              setTimeout(() => {
                setShowCat(true);
              }, 600);
            }
          }, 120);
        }, 300);
      }
    }, 105);

    return () => {
      clearInterval(timer1);
    };
  }, [showHappyBirthday]);

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
        p.vy += 0.8 + Math.random() * 0.5;
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

  // Fire confetti burst (optimized count for smooth performance)
  const fireConfetti = useCallback(() => {
    if (confettiFiredRef.current) return;
    confettiFiredRef.current = true;

    const isMobile = window.innerWidth < 768;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight * 0.55;

    const mainCount = isMobile ? 60 : 120;
    const sideCount = isMobile ? 25 : 50;

    const pieces: ConfettiPiece[] = [];
    for (let i = 0; i < mainCount; i++) {
      pieces.push(createConfettiPiece(centerX, centerY));
    }
    for (let i = 0; i < sideCount; i++) {
      const p = createConfettiPiece(centerX * 0.3, centerY * 0.6);
      p.vx = Math.abs(p.vx) * 1.2;
      pieces.push(p);
    }
    for (let i = 0; i < sideCount; i++) {
      const p = createConfettiPiece(centerX * 1.7, centerY * 0.6);
      p.vx = -Math.abs(p.vx) * 1.2;
      pieces.push(p);
    }

    confettiRef.current = pieces;
    animateConfetti();
  }, [animateConfetti]);

  // Trigger confetti when cat appears
  useEffect(() => {
    if (showCat) {
      fireConfetti();
    }
  }, [showCat, fireConfetti]);

  const handleGiftClick = () => {
    if (isClicked) return;
    setIsClicked(true);

    const boxEl = document.getElementById("hero-gift-box");
    const startX = boxEl
      ? boxEl.getBoundingClientRect().left + boxEl.getBoundingClientRect().width / 2
      : window.innerWidth / 2;
    const startY = boxEl
      ? boxEl.getBoundingClientRect().top + boxEl.getBoundingClientRect().height / 2
      : window.innerHeight / 2;

    // Optimized particle count based on screen size (160 mobile / 400 desktop)
    const isMobile = window.innerWidth < 768;
    const totalParticles = isMobile ? 160 : 400;
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const particles: FlowerParticle[] = [];
    for (let i = 0; i < totalParticles; i++) {
      particles.push(createFlowerParticle(startX, startY, Math.floor(Math.random() * 50), screenW, screenH));
    }
    flowerParticlesRef.current = particles;
    animateFlowers();

    setTimeout(() => {
      setBoxFading(true);
      isFallingRef.current = true;
    }, 3800);

    setTimeout(() => {
      setBoxHidden(true);
      cancelAnimationFrame(flowerAnimRef.current);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      setShowHappyBirthday(true);
    }, 4800);

    setTimeout(() => {
      onGiftOpened();
      setTimeout(() => {
        const scrollOffset = window.innerWidth < 768 ? 50 : 250;
        window.scrollTo({ top: window.innerHeight + scrollOffset, behavior: "smooth" });
      }, 100);
    }, 8900);
  };

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0B2046]">
      <Sparkles count={15} colors={["rgba(215,179,106,0.4)", "rgba(255,255,255,0.2)"]} />

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
          <motion.img
            id="hero-gift-box"
            src={isClicked ? "/assets/gift-box-after.png" : "/assets/gift-box-before.png"}
            alt="Gift Box"
            className="relative"
            style={{ width: "230px", filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.2))" }}
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

      <AnimatePresence>
        {showText && !isClicked && (
          <motion.h1
            className="mt-10 text-4xl md:text-5xl font-[family-name:var(--font-playfair)] italic text-white/90 z-20"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            For samah
          </motion.h1>
        )}
      </AnimatePresence>

      {/* High Performance 60FPS Typewriter Header */}
      <AnimatePresence>
        {showHappyBirthday && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col items-center justify-center gap-3 md:gap-5">
              <div
                className="text-3xl sm:text-4xl md:text-6xl font-[family-name:var(--font-inter)] font-semibold tracking-wide text-[#f8e5b6] uppercase text-center"
                style={{ textShadow: "0 4px 30px rgba(0,0,0,0.8)" }}
              >
                {/* Line 1: HAPPY BIRTHDAY */}
                <div className="flex justify-center items-center">
                  <span>{typed1}</span>
                  {typed1.length < 14 && (
                    <span className="inline-block w-[3px] h-[0.9em] bg-[#f8e5b6] ml-1 align-middle animate-pulse" />
                  )}
                </div>

                {/* Line 2: FAVORITE */}
                <div className="flex justify-center items-center mt-1 md:mt-2 text-3xl sm:text-4xl md:text-6xl text-[#D7B36A]">
                  <span>{typed2}</span>
                  {typed1.length >= 14 && !showCat && (
                    <span className="inline-block w-[3px] h-[0.9em] bg-[#D7B36A] ml-1 align-middle animate-pulse" />
                  )}
                </div>
              </div>

              {/* Birthday Cat Image */}
              <AnimatePresence>
                {showCat && (
                  <motion.div
                    className="flex justify-center items-center relative"
                    initial={{ opacity: 0, scale: 0, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      type: "spring",
                      stiffness: 120,
                      damping: 10,
                    }}
                  >
                    <div
                      className="absolute rounded-full pointer-events-none"
                      style={{
                        background: "radial-gradient(circle, rgba(255,215,0,0.25) 0%, transparent 70%)",
                        width: "280px", height: "280px",
                      }}
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
