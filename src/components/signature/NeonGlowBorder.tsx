"use client";

import { useRef, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";

interface NeonGlowBorderProps {
  children: ReactNode;
  colors?: string[];
  borderWidth?: number;
  speed?: number;
  borderRadius?: string;
  className?: string;
}

export default function NeonGlowBorder({
  children,
  colors = ["#7c3aed", "#a855f7", "#ec4899", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#7c3aed"],
  borderWidth = 2,
  speed = 3,
  borderRadius = "16px",
  className = "",
}: NeonGlowBorderProps) {
  const borderRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const angleRef = useRef(0);

  useEffect(() => {
    const border = borderRef.current;
    const glow = glowRef.current;
    if (!border) return;

    const colorStops = colors.join(", ");

    const animate = () => {
      angleRef.current = (angleRef.current + speed * 0.5) % 360;
      const gradient = `conic-gradient(from ${angleRef.current}deg, ${colorStops})`;
      border.style.background = gradient;
      if (glow) glow.style.background = gradient;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [colors, speed]);

  return (
    <motion.div
      className={`relative inline-flex ${className}`}
      style={{ borderRadius, padding: borderWidth }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Animated conic-gradient border layer */}
      <div
        ref={borderRef}
        className="absolute inset-0"
        style={{ borderRadius, zIndex: 0 }}
      />

      {/* Glow blur layer */}
      <div
        ref={glowRef}
        className="absolute inset-0 blur-md opacity-60"
        style={{ borderRadius, zIndex: 0 }}
      />

      {/* Inner content */}
      <div
        className="relative z-10 w-full h-full"
        style={{
          borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
          background: "var(--bg-card)",
          padding: "20px",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
