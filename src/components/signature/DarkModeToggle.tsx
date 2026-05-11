"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DarkModeToggleProps {
  className?: string;
  variant?: "default" | "pill" | "minimal";
  size?: number;
  iconStyle?: "minimal" | "filled";
  transitionType?: "rotate" | "flip";
  defaultDark?: boolean;
  onChange?: (isDark: boolean) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function DarkModeToggle({
  className = "",
  size = 40,
  iconStyle = "minimal",
  transitionType = "rotate",
  defaultDark = true,
  onChange,
  isLoading = false,
  disabled = false,
}: DarkModeToggleProps) {
  const [isDark, setIsDark] = useState(defaultDark);

  const toggle = () => {
    if (disabled) return;
    setIsDark((prev) => {
      onChange?.(!prev);
      return !prev;
    });
  };

  const iconSize = size * 0.5;

  const rotateAnimation = {
    initial: { rotate: -90, scale: 0, opacity: 0 },
    animate: { rotate: 0, scale: 1, opacity: 1 },
    exit: { rotate: 90, scale: 0, opacity: 0 },
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
  };

  const flipAnimation = {
    initial: { rotateY: -180, scale: 0, opacity: 0 },
    animate: { rotateY: 0, scale: 1, opacity: 1 },
    exit: { rotateY: 180, scale: 0, opacity: 0 },
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  };

  const anim = transitionType === "rotate" ? rotateAnimation : flipAnimation;

  return (
    <motion.button
      onClick={toggle}
      whileHover={!disabled ? { scale: 1.1 } : undefined}
      whileTap={!disabled ? { scale: 0.9 } : undefined}
      disabled={disabled}
      className={`relative flex items-center justify-center rounded-full border border-border transition-colors ${
        isDark ? "bg-[var(--bg-elevated)]" : "bg-amber-50"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-[var(--accent)]"} ${className}`}
      style={{ width: size, height: size }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="border-2 border-[var(--border)] border-t-[var(--accent)] rounded-full"
          style={{ width: iconSize, height: iconSize }}
        />
      ) : (
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div key="moon" {...anim}>
              {iconStyle === "filled" ? (
                <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor" className="text-indigo-400">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </motion.div>
          ) : (
            <motion.div key="sun" {...anim}>
              {iconStyle === "filled" ? (
                <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor" className="text-amber-500">
                  <circle cx="12" cy="12" r="5" />
                  <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none">
                    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </g>
                </svg>
              ) : (
                <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
                  <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Active glow ring */}
      <motion.div
        animate={{
          boxShadow: isDark
            ? "0 0 15px rgba(129, 140, 248, 0.3)"
            : "0 0 15px rgba(251, 191, 36, 0.3)",
        }}
        className="absolute inset-0 rounded-full pointer-events-none"
      />
    </motion.button>
  );
}
