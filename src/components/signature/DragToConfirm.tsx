"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

interface DragToConfirmProps {
  className?: string;
  variant?: "default" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  confirmText?: string;
  resetOnRelease?: boolean;
  color?: string;
  onConfirm?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function DragToConfirm({
  className = "",
  size = "md",
  confirmText = "Swipe to Confirm",
  resetOnRelease = true,
  color = "var(--accent)",
  onConfirm,
  isLoading = false,
  disabled = false,
}: DragToConfirmProps) {
  const [confirmed, setConfirmed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const [maxDrag, setMaxDrag] = useState(250);

  const progress = useTransform(springX, [0, maxDrag], [0, 1]);
  const bgOpacity = useTransform(progress, [0, 0.8, 1], [0, 0.3, 1]);
  const textOpacity = useTransform(progress, [0, 0.5], [1, 0]);
  const checkScale = useTransform(progress, [0.85, 1], [0, 1]);

  const sizes = {
    sm: { h: "h-12", thumb: "w-10 h-10", text: "text-xs" },
    md: { h: "h-14", thumb: "w-12 h-12", text: "text-sm" },
    lg: { h: "h-16", thumb: "w-14 h-14", text: "text-base" },
  };
  const s = sizes[size];

  const handleDragEnd = useCallback(() => {
    const current = x.get();
    if (current >= maxDrag * 0.9) {
      x.set(maxDrag);
      setConfirmed(true);
      onConfirm?.();
    } else if (resetOnRelease) {
      x.set(0);
    }
  }, [maxDrag, onConfirm, resetOnRelease, x]);

  const handleReset = () => {
    x.set(0);
    setConfirmed(false);
  };

  useEffect(() => {
    if (containerRef.current) {
      const thumbSize = size === "sm" ? 40 : size === "md" ? 48 : 56;
      setMaxDrag(containerRef.current.offsetWidth - thumbSize - 8);
    }
  }, [size]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-xs overflow-hidden rounded-full ${s.h} border border-border bg-[var(--bg-secondary)] ${
        disabled ? "opacity-50 pointer-events-none" : ""
      } ${className}`}
    >
      {/* Progress fill */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ opacity: bgOpacity, background: color }}
      />

      {/* Text */}
      <motion.div
        style={{ opacity: textOpacity }}
        className={`absolute inset-0 flex items-center justify-center ${s.text} font-medium text-[var(--text-tertiary)] select-none pointer-events-none`}
      >
        {confirmed ? (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-white font-semibold flex items-center gap-1">
            <Check size={16} /> Confirmed
          </motion.span>
        ) : (
          <span className="flex items-center gap-2">
            {confirmText}
            <ArrowRight size={14} />
          </span>
        )}
      </motion.div>

      {/* Confirmed state */}
      {confirmed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="text-white font-semibold flex items-center gap-2 text-sm">
            <Check size={18} /> Confirmed
          </span>
        </motion.div>
      )}

      {/* Draggable thumb */}
      {!confirmed && (
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: maxDrag }}
          dragElastic={0}
          onDragEnd={handleDragEnd}
          style={{ x: springX }}
          whileTap={{ scale: 0.95 }}
          className={`absolute left-1 top-1/2 -translate-y-1/2 ${s.thumb} rounded-full bg-white shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing z-10`}
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="w-4 h-4 border-2 border-[var(--border)] border-t-[var(--accent)] rounded-full"
            />
          ) : (
            <ArrowRight size={18} style={{ color }} />
          )}
        </motion.div>
      )}

      {/* Reset tap area (after confirm) */}
      {confirmed && (
        <button
          onClick={handleReset}
          className="absolute inset-0 z-20"
          aria-label="Reset"
        />
      )}
    </div>
  );
}
