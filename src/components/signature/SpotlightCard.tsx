"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface SpotlightCardProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "bordered";
  size?: "sm" | "md" | "lg";
  spotlightColor?: string;
  borderRadius?: string;
  enableBlur?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function SpotlightCard({
  children,
  className = "",
  variant = "default",
  size = "md",
  spotlightColor = "rgba(139, 92, 246, 0.15)",
  borderRadius = "16px",
  enableBlur = true,
  isLoading = false,
  disabled = false,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (disabled) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const sizes = { sm: "p-4", md: "p-6", lg: "p-8" };

  const variantStyles = {
    default: "bg-[var(--bg-card)] border border-border",
    elevated: "bg-[var(--bg-elevated)] shadow-[var(--shadow-md)]",
    bordered: "bg-transparent border-2 border-border",
  };

  const defaultContent = (
    <div className="relative z-10">
      <div className="w-10 h-10 rounded-xl bg-[var(--accent-subtle)] flex items-center justify-center mb-4">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
      </div>
      <h3 className="text-lg font-semibold mb-2">Spotlight Card</h3>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
        Move your cursor across this card to see the spotlight effect illuminate the surface.
      </p>
    </div>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={!disabled ? { y: -2 } : undefined}
      className={`relative overflow-hidden transition-all duration-300 ${sizes[size]} ${variantStyles[variant]} ${
        disabled ? "opacity-50 pointer-events-none" : ""
      } ${className}`}
      style={{ borderRadius }}
    >
      {/* Spotlight gradient */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${enableBlur ? "400px" : "250px"} circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 70%)`,
          filter: enableBlur ? "blur(1px)" : "none",
        }}
      />

      {/* Border spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 70%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          padding: "1px",
          borderRadius,
        }}
      />

      {/* Loading skeleton */}
      {isLoading ? (
        <div className="relative z-10 space-y-3">
          <div className="h-10 w-10 rounded-xl bg-[var(--bg-secondary)] animate-pulse" />
          <div className="h-5 w-32 rounded-md bg-[var(--bg-secondary)] animate-pulse" />
          <div className="h-4 w-full rounded-md bg-[var(--bg-secondary)] animate-pulse" />
          <div className="h-4 w-2/3 rounded-md bg-[var(--bg-secondary)] animate-pulse" />
        </div>
      ) : (
        children || defaultContent
      )}
    </motion.div>
  );
}
