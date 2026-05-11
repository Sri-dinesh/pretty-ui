"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RippleItem {
  id: number;
  x: number;
  y: number;
}

interface RippleButtonProps {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function RippleButton({
  children = "Click Me",
  variant = "primary",
  size = "md",
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<RippleItem[]>([]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x, y }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 800);
    },
    []
  );

  const variants = {
    primary: "bg-[var(--accent)] text-white hover:brightness-110",
    secondary:
      "bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-border hover:border-[var(--accent)]",
    ghost:
      "bg-transparent text-[var(--text-primary)] hover:bg-[var(--accent-subtle)]",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`relative overflow-hidden rounded-xl font-semibold transition-all duration-300 ${variants[variant]} ${sizes[size]} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]`}
    >
      {/* Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ width: 0, height: 0, opacity: 0.5 }}
            animate={{ width: 300, height: 300, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: ripple.x - 150,
              top: ripple.y - 150,
              borderRadius: "50%",
              background:
                variant === "primary"
                  ? "rgba(255,255,255,0.3)"
                  : "var(--accent-glow)",
              pointerEvents: "none",
            }}
          />
        ))}
      </AnimatePresence>

      <span className="relative z-10 flex items-center gap-2 justify-center">
        {children}
      </span>
    </motion.button>
  );
}
