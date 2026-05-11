"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface InfiniteMarqueeProps {
  className?: string;
  variant?: "default" | "bordered" | "ghost";
  size?: "sm" | "md" | "lg";
  speed?: "slow" | "normal" | "fast";
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  items?: { label: string; icon?: React.ReactNode }[];
  isLoading?: boolean;
  disabled?: boolean;
}

const defaultItems = [
  { label: "Vercel" },
  { label: "Stripe" },
  { label: "Linear" },
  { label: "Figma" },
  { label: "Notion" },
  { label: "Framer" },
  { label: "Raycast" },
  { label: "Arc" },
];

export default function InfiniteMarquee({
  className = "",
  size = "md",
  speed = "normal",
  direction = "left",
  pauseOnHover = true,
  items = defaultItems,
  isLoading = false,
  disabled = false,
}: InfiniteMarqueeProps) {
  const speedMap = { slow: 40, normal: 25, fast: 12 };
  const duration = speedMap[speed];
  const sizeMap = { sm: "text-sm py-3", md: "text-base py-5", lg: "text-lg py-7" };

  const content = [...items, ...items];

  return (
    <div
      className={`w-full overflow-hidden ${disabled ? "opacity-50" : ""} ${className}`}
    >
      <div
        className={`relative flex ${sizeMap[size]}`}
        style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
      >
        {isLoading ? (
          <div className="flex gap-8 px-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-6 w-24 rounded-md bg-[var(--bg-secondary)] animate-pulse shrink-0" />
            ))}
          </div>
        ) : (
          <motion.div
            className={`flex shrink-0 gap-8 items-center ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
            animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
            transition={{
              x: { repeat: Infinity, repeatType: "loop", duration, ease: "linear" },
            }}
          >
            {content.map((item, i) => (
              <div
                key={`${item.label}-${i}`}
                className="flex items-center gap-3 shrink-0 px-6 py-2.5 rounded-full border border-border bg-[var(--bg-card)] hover:border-[var(--accent)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 group cursor-default"
              >
                {item.icon || (
                  <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[var(--accent)]/30 to-purple-500/30 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-[var(--accent)]">
                      {item.label.charAt(0)}
                    </span>
                  </div>
                )}
                <span className="font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
