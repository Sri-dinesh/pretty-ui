"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

interface MorphingCTAButtonProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "glow" | "outline" | "solid";
  size?: "sm" | "md" | "lg";
  magneticStrength?: number;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export default function MorphingCTAButton({
  children = "Get Started",
  className = "",
  variant = "solid",
  size = "md",
  magneticStrength = 0.3,
  isLoading = false,
  disabled = false,
  onClick,
}: MorphingCTAButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * magneticStrength);
      y.set((e.clientY - cy) * magneticStrength);
    },
    [magneticStrength, disabled, x, y]
  );

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const sizes = {
    sm: "px-5 py-2.5 text-xs",
    md: "px-8 py-3.5 text-sm",
    lg: "px-10 py-4.5 text-base",
  };

  const variants = {
    solid: "bg-[var(--accent)] text-white",
    outline: "border-2 border-[var(--accent)] text-[var(--accent)] bg-transparent",
    glow: "bg-[var(--accent)] text-white",
  };

  return (
    <motion.button
      ref={ref}
      onClick={disabled || isLoading ? undefined : onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      animate={{
        borderRadius: isHovered ? "12px" : "50px",
        scale: isHovered ? 1.05 : 1,
      }}
      whileTap={!disabled ? { scale: 0.97 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      disabled={disabled}
      className={`relative overflow-hidden font-semibold transition-shadow duration-300 ${sizes[size]} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${variant === "glow" && isHovered ? "shadow-[0_0_30px_var(--accent-glow)]" : ""} ${className}`}
    >
      {/* Shimmer sweep on hover */}
      <AnimatePresence>
        {isHovered && !disabled && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "100%", opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Glow ring for glow variant */}
      {variant === "glow" && (
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute -inset-px rounded-[inherit] pointer-events-none"
          style={{
            background: "linear-gradient(135deg, var(--accent), #a855f7, #ec4899, var(--accent))",
            backgroundSize: "300% 300%",
            animation: "gradient-shift 3s ease infinite",
            filter: "blur(6px)",
            zIndex: -1,
          }}
        />
      )}

      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
          />
        ) : (
          children
        )}
      </span>
    </motion.button>
  );
}
