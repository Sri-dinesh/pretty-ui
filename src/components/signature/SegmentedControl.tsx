"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface SegmentedControlProps {
  className?: string;
  variant?: "default" | "pill" | "underline";
  size?: "sm" | "md" | "lg";
  options?: string[];
  defaultIndex?: number;
  activeColor?: string;
  animationType?: "spring" | "tween";
  onChange?: (option: string, index: number) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function SegmentedControl({
  className = "",
  size = "md",
  options = ["All", "Active", "Archived", "Drafts"],
  defaultIndex = 0,
  activeColor = "var(--accent)",
  animationType = "spring",
  onChange,
  isLoading = false,
  disabled = false,
}: SegmentedControlProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const handleSelect = (i: number) => {
    if (disabled) return;
    setActiveIndex(i);
    onChange?.(options[i], i);
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-2.5",
  };

  const transition =
    animationType === "spring"
      ? { type: "spring" as const, stiffness: 400, damping: 30 }
      : { type: "tween" as const, duration: 0.25, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <div
      className={`inline-flex items-center rounded-xl bg-[var(--bg-secondary)] p-1 border border-border ${
        disabled ? "opacity-50 pointer-events-none" : ""
      } ${className}`}
    >
      {isLoading
        ? Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={`${sizes[size]} mx-1 rounded-lg bg-[var(--border)] animate-pulse w-16 h-8`} />
          ))
        : options.map((option, i) => (
            <motion.button
              key={option}
              onClick={() => handleSelect(i)}
              className={`relative ${sizes[size]} rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeIndex === i
                  ? "text-white"
                  : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
              }`}
            >
              {activeIndex === i && (
                <motion.div
                  layoutId="segment-active"
                  className="absolute inset-0 rounded-lg shadow-sm"
                  style={{ background: activeColor }}
                  transition={transition}
                />
              )}
              <span className="relative z-10">{option}</span>
            </motion.button>
          ))}
    </div>
  );
}
