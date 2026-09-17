"use client";

import { useEffect, useRef, useId } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

interface CircularProgressRingProps {
  value: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  gradientColors?: [string, string];
  className?: string;
  animationDuration?: number;
  showPercentage?: boolean;
  trackColor?: string;
}

export default function CircularProgressRing({
  value = 75,
  size = 160,
  strokeWidth = 12,
  label,
  sublabel,
  gradientColors = ["#7c3aed", "#ec4899"],
  className = "",
  animationDuration = 1.5,
  showPercentage = true,
  trackColor,
}: CircularProgressRingProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const clampedValue = Math.max(0, Math.min(100, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;
  const rawId = useId();
  const gradId = `grad-${rawId.replace(/:/g, "")}`;

  // Animate the stroke-dashoffset
  const rawProgress = useMotionValue(0);
  const springProgress = useSpring(rawProgress, {
    stiffness: 60,
    damping: 18,
    mass: 0.8,
  });
  const dashOffset = useTransform(
    springProgress,
    [0, 100],
    [circumference, circumference - (clampedValue / 100) * circumference]
  );

  // Counter display
  const displayValue = useTransform(springProgress, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      rawProgress.set(clampedValue);
    }
  }, [isInView, clampedValue, rawProgress]);

  // For text display
  const motionDisplayRef = useRef<SVGTextElement>(null);
  useEffect(() => {
    const unsubscribe = displayValue.on("change", (v) => {
      if (motionDisplayRef.current) {
        motionDisplayRef.current.textContent = showPercentage ? `${v}%` : `${v}`;
      }
    });
    return unsubscribe;
  }, [displayValue, showPercentage]);

  const trackStrokeColor = trackColor || "var(--border)";

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          ref={ref}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ transform: "rotate(-90deg)" }}
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradientColors[0]} />
              <stop offset="100%" stopColor={gradientColors[1]} />
            </linearGradient>
          </defs>

          {/* Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={trackStrokeColor}
            strokeWidth={strokeWidth}
          />

          {/* Progress arc */}
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{ strokeDashoffset: dashOffset }}
          />
        </svg>

        {/* Center text */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ transform: "none" }}
        >
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="absolute inset-0"
          >
            <text
              ref={motionDisplayRef}
              x={center}
              y={center + (label ? -6 : 6)}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={size * 0.18}
              fontWeight="700"
              fill="var(--text-primary)"
              fontFamily="var(--font-geist-sans), system-ui, sans-serif"
            >
              {showPercentage ? "0%" : "0"}
            </text>
            {label && (
              <text
                x={center}
                y={center + size * 0.13}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={size * 0.09}
                fill="var(--text-secondary)"
                fontFamily="var(--font-geist-sans), system-ui, sans-serif"
              >
                {label}
              </text>
            )}
          </svg>
        </div>
      </div>

      {sublabel && (
        <p className="text-xs text-[var(--text-tertiary)] font-medium tracking-wide uppercase">
          {sublabel}
        </p>
      )}
    </div>
  );
}
