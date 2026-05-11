"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

interface ElasticSliderProps {
  min?: number;
  max?: number;
  defaultValue?: number;
  label?: string;
  onChange?: (value: number) => void;
}

export default function ElasticSlider({
  min = 0,
  max = 100,
  defaultValue = 50,
  label = "Volume",
  onChange,
}: ElasticSliderProps) {
  const [value, setValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbScale = useMotionValue(1);
  const springScale = useSpring(thumbScale, { stiffness: 400, damping: 15 });
  const percentage = ((value - min) / (max - min)) * 100;

  const handleInteraction = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const pct = x / rect.width;
      const newVal = Math.round(min + pct * (max - min));
      setValue(newVal);
      onChange?.(newVal);
    },
    [min, max, onChange]
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    thumbScale.set(1.3);
    handleInteraction(e.clientX);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    handleInteraction(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    thumbScale.set(1);
  };

  return (
    <div className="w-full max-w-xs">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-[var(--text-secondary)]">
          {label}
        </span>
        <motion.span
          key={value}
          initial={{ y: -5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-sm font-bold font-mono text-[var(--accent)]"
        >
          {value}
        </motion.span>
      </div>

      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative h-2 rounded-full cursor-pointer bg-[var(--bg-secondary)] touch-none"
      >
        {/* Filled track */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: `${percentage}%`,
            background: "var(--accent)",
          }}
          animate={{
            boxShadow: isDragging
              ? "0 0 12px var(--accent-glow)"
              : "0 0 0 transparent",
          }}
        />

        {/* Thumb */}
        <motion.div
          style={{
            left: `${percentage}%`,
            scale: springScale,
          }}
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white shadow-md border-2 border-[var(--accent)]"
          animate={{
            boxShadow: isDragging
              ? "0 0 16px var(--accent-glow)"
              : "0 2px 8px rgba(0,0,0,0.1)",
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Inner dot */}
          <motion.div
            animate={{ scale: isDragging ? 1 : 0 }}
            className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-[var(--accent)]"
          />
        </motion.div>

        {/* Scale ticks */}
        <div className="absolute -bottom-5 left-0 right-0 flex justify-between">
          {[0, 25, 50, 75, 100].map((tick) => (
            <span
              key={tick}
              className="text-[10px] text-[var(--text-tertiary)] font-mono"
            >
              {min + (tick / 100) * (max - min)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
