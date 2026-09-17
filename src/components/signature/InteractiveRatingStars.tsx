"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InteractiveRatingStarsProps {
  maxStars?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  size?: number;
  className?: string;
  showLabel?: boolean;
  allowHalf?: boolean;
}

const sentiments = [
  { emoji: "😶", label: "No rating" },
  { emoji: "😞", label: "Terrible" },
  { emoji: "😕", label: "Poor" },
  { emoji: "😐", label: "Okay" },
  { emoji: "😊", label: "Good" },
  { emoji: "🤩", label: "Amazing!" },
];

export default function InteractiveRatingStars({
  maxStars = 5,
  defaultValue = 0,
  onChange,
  size = 36,
  className = "",
  showLabel = true,
}: InteractiveRatingStarsProps) {
  const [rating, setRating] = useState(defaultValue);
  const [hovered, setHovered] = useState(0);
  const [isAnimating, setIsAnimating] = useState<number | null>(null);

  const display = hovered || rating;
  const sentimentIndex = Math.min(Math.round(display), sentiments.length - 1);

  const handleClick = (value: number) => {
    setRating(value === rating ? 0 : value);
    setIsAnimating(value);
    onChange?.(value === rating ? 0 : value);
    setTimeout(() => setIsAnimating(null), 600);
  };

  const getStarFill = (starIndex: number) => {
    const val = hovered || rating;
    if (val >= starIndex) return "full";
    return "empty";
  };

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {/* Sentiment emoji */}
      {showLabel && (
        <div className="flex flex-col items-center gap-1.5 min-h-[60px]">
          <AnimatePresence mode="wait">
            <motion.span
              key={sentimentIndex}
              initial={{ scale: 0.4, opacity: 0, y: -8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.4, opacity: 0, y: 8 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="text-4xl select-none"
            >
              {sentiments[sentimentIndex].emoji}
            </motion.span>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.span
              key={`label-${sentimentIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs font-semibold text-[var(--text-secondary)] tracking-wider uppercase"
            >
              {sentiments[sentimentIndex].label}
            </motion.span>
          </AnimatePresence>
        </div>
      )}

      {/* Stars */}
      <div
        className="flex gap-1"
        onMouseLeave={() => setHovered(0)}
      >
        {Array.from({ length: maxStars }, (_, i) => {
          const starValue = i + 1;
          const fill = getStarFill(starValue);
          const isAnimated = isAnimating !== null && starValue <= isAnimating;

          return (
            <motion.button
              key={starValue}
              onHoverStart={() => setHovered(starValue)}
              onClick={() => handleClick(starValue)}
              animate={
                isAnimated
                  ? { scale: [1, 1.4, 1], rotate: [0, -15, 15, 0] }
                  : { scale: 1, rotate: 0 }
              }
              transition={
                isAnimated
                  ? { duration: 0.5, delay: (starValue - 1) * 0.06, ease: "easeInOut" }
                  : { type: "spring", stiffness: 400, damping: 20 }
              }
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="relative focus:outline-none"
              style={{ width: size, height: size }}
              aria-label={`Rate ${starValue} out of ${maxStars}`}
            >
              <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill={fill === "full" ? "var(--accent)" : "none"}
                stroke={fill === "full" ? "var(--accent)" : "var(--border-hover)"}
                strokeWidth={1.5}
                style={{ transition: "fill 0.15s ease, stroke 0.15s ease" }}
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>

              {/* Particle burst on click */}
              <AnimatePresence>
                {isAnimating === starValue && (
                  <>
                    {[...Array(6)].map((_, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                        animate={{
                          scale: 1,
                          x: Math.cos((idx / 6) * Math.PI * 2) * 24,
                          y: Math.sin((idx / 6) * Math.PI * 2) * 24,
                          opacity: 0,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full"
                        style={{
                          background: "var(--accent)",
                          marginLeft: -3,
                          marginTop: -3,
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* Numeric display */}
      <div className="text-xs text-[var(--text-tertiary)]">
        {rating > 0 ? (
          <span>
            <span className="font-bold text-[var(--accent)]">{rating}</span> / {maxStars} stars
          </span>
        ) : (
          <span>Click to rate</span>
        )}
      </div>
    </div>
  );
}
