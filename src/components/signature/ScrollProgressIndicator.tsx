"use client";

import { motion, useScroll, useSpring } from "framer-motion";

interface ScrollProgressIndicatorProps {
  className?: string;
  variant?: "default" | "gradient" | "glow";
  size?: "sm" | "md" | "lg";
  color?: string;
  height?: number;
  position?: "top" | "bottom";
  isLoading?: boolean;
  disabled?: boolean;
}

export default function ScrollProgressIndicator({
  className = "",
  variant = "default",
  color = "var(--accent)",
  height = 3,
  position = "top",
  isLoading = false,
  disabled = false,
}: ScrollProgressIndicatorProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 50, restDelta: 0.001 });

  if (disabled) return null;

  const bg =
    variant === "gradient"
      ? "linear-gradient(90deg, var(--accent), #a855f7, #ec4899)"
      : variant === "glow"
      ? color
      : color;

  return (
    <motion.div
      className={`fixed left-0 right-0 z-[999] origin-left ${
        position === "top" ? "top-0" : "bottom-0"
      } ${className}`}
      style={{
        scaleX,
        height,
        background: bg,
        boxShadow: variant === "glow" ? `0 0 10px ${color}, 0 0 20px ${color}` : "none",
      }}
    />
  );
}
