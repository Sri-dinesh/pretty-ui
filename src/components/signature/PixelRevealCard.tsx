"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface PixelRevealCardProps {
  title?: string;
  description?: string;
  gradient?: string;
  pixelSize?: number;
  className?: string;
}

export default function PixelRevealCard({
  title = "Pixel Reveal",
  description = "Hover to dissolve the pixel mosaic and reveal the content beneath.",
  gradient = "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%)",
  pixelSize = 16,
  className = "",
}: PixelRevealCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const progressRef = useRef(0);
  const directionRef = useRef<"in" | "out">("out");
  const pixelsRef = useRef<{ x: number; y: number; delay: number }[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  // Build a shuffled pixel grid
  const buildPixels = useCallback((w: number, h: number) => {
    const cols = Math.ceil(w / pixelSize);
    const rows = Math.ceil(h / pixelSize);
    const arr: { x: number; y: number; delay: number }[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        arr.push({ x: c * pixelSize, y: r * pixelSize, delay: Math.random() });
      }
    }
    // shuffle
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    pixelsRef.current = arr;
  }, [pixelSize]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setDims({ w: width, h: height });
      buildPixels(width, height);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [buildPixels]);

  // Draw canvas overlay
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !dims.w) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, dims.w, dims.h);

    const progress = progressRef.current; // 0 = fully covered, 1 = fully revealed

    pixelsRef.current.forEach(({ x, y, delay }) => {
      // Each pixel has a delay; it disappears when progress > delay
      const alpha = Math.max(0, Math.min(1, 1 - (progress - delay) / 0.3));
      if (alpha <= 0) return;

      // Gradient color for the pixel block
      const hue = ((x / dims.w) * 60 + (y / dims.h) * 40 + 270) % 360;
      ctx.fillStyle = `hsla(${hue}, 70%, 55%, ${alpha})`;
      ctx.fillRect(x, y, pixelSize - 1, pixelSize - 1);
    });
  }, [dims, pixelSize]);

  // Animation loop
  useEffect(() => {
    const speed = 0.015;

    const loop = () => {
      if (directionRef.current === "in") {
        progressRef.current = Math.min(1, progressRef.current + speed);
      } else {
        progressRef.current = Math.max(0, progressRef.current - speed);
      }
      draw();

      const done =
        (directionRef.current === "in" && progressRef.current >= 1) ||
        (directionRef.current === "out" && progressRef.current <= 0);

      if (!done) {
        animFrameRef.current = requestAnimationFrame(loop);
      }
    };

    cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isHovered, draw]);

  const handleMouseEnter = () => {
    directionRef.current = "in";
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    directionRef.current = "out";
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl cursor-pointer select-none ${className}`}
      style={{ minHeight: 220 }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{ background: gradient }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="w-14 h-14 rounded-2xl mb-4 mx-auto flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="4" height="4" rx="0.5"/>
              <rect x="10" y="3" width="4" height="4" rx="0.5"/>
              <rect x="17" y="3" width="4" height="4" rx="0.5"/>
              <rect x="3" y="10" width="4" height="4" rx="0.5"/>
              <rect x="10" y="10" width="4" height="4" rx="0.5"/>
              <rect x="17" y="10" width="4" height="4" rx="0.5"/>
              <rect x="3" y="17" width="4" height="4" rx="0.5"/>
              <rect x="10" y="17" width="4" height="4" rx="0.5"/>
              <rect x="17" y="17" width="4" height="4" rx="0.5"/>
            </svg>
          </div>
          <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
          <p className="text-white/80 text-sm leading-relaxed max-w-[220px]">{description}</p>
        </motion.div>

        {/* Pre-hover hint */}
        <motion.div
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="text-white/90 text-sm font-medium tracking-wider uppercase">Hover to Reveal</span>
        </motion.div>
      </div>

      {/* Pixel canvas overlay */}
      {dims.w > 0 && (
        <canvas
          ref={canvasRef}
          width={dims.w}
          height={dims.h}
          className="absolute inset-0 pointer-events-none"
          style={{ display: "block" }}
        />
      )}
    </div>
  );
}
