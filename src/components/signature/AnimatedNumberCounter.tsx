"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";

interface AnimatedNumberCounterProps {
  className?: string;
  variant?: "default" | "card" | "minimal";
  size?: "sm" | "md" | "lg";
  targetNumber?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  label?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function AnimatedNumberCounter({
  className = "",
  size = "md",
  targetNumber = 12847,
  duration = 2,
  prefix = "",
  suffix = "",
  label = "Total Users",
  isLoading = false,
  disabled = false,
}: AnimatedNumberCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (isInView && !disabled) {
      const controls = animate(motionValue, targetNumber, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setDisplayValue(Math.round(v)),
      });
      return () => controls.stop();
    }
  }, [isInView, targetNumber, duration, disabled, motionValue]);

  const formatNumber = (n: number) => n.toLocaleString();

  const sizes = {
    sm: { number: "text-3xl", label: "text-xs" },
    md: { number: "text-5xl", label: "text-sm" },
    lg: { number: "text-7xl", label: "text-base" },
  };
  const s = sizes[size];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={`text-center ${disabled ? "opacity-50" : ""} ${className}`}
    >
      {isLoading ? (
        <div className="space-y-2 flex flex-col items-center">
          <div className={`h-12 w-32 rounded-lg bg-[var(--bg-secondary)] animate-pulse`} />
          <div className="h-4 w-20 rounded bg-[var(--bg-secondary)] animate-pulse" />
        </div>
      ) : (
        <>
          <div className={`${s.number} font-bold tracking-tight tabular-nums`}>
            <span className="text-[var(--text-tertiary)]">{prefix}</span>
            <span>{formatNumber(displayValue)}</span>
            <span className="text-[var(--accent)]">{suffix}</span>
          </div>
          {label && (
            <div className={`${s.label} text-[var(--text-tertiary)] font-medium uppercase tracking-wider mt-2`}>
              {label}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}
