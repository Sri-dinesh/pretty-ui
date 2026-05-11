"use client";

import { motion } from "framer-motion";

interface SkeletonLoaderProps {
  className?: string;
  variant?: "card" | "list" | "profile";
  size?: "sm" | "md" | "lg";
  rows?: number;
  showImage?: boolean;
  animation?: "pulse" | "wave" | "none";
  isLoading?: boolean;
  disabled?: boolean;
}

export default function SkeletonLoader({
  className = "",
  variant = "card",
  size = "md",
  rows = 3,
  showImage = true,
  animation = "pulse",
  isLoading = true,
  disabled = false,
}: SkeletonLoaderProps) {
  const animClass =
    animation === "pulse"
      ? "animate-pulse"
      : animation === "wave"
      ? ""
      : "";

  const waveStyle =
    animation === "wave"
      ? {
          background:
            "linear-gradient(90deg, var(--bg-secondary) 0%, var(--border) 50%, var(--bg-secondary) 100%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.8s ease infinite",
        }
      : {};

  const Bar = ({ width = "100%", height = "12px" }: { width?: string; height?: string }) => (
    <div
      className={`rounded-md ${animClass}`}
      style={{
        width,
        height,
        background: animation !== "wave" ? "var(--bg-secondary)" : undefined,
        ...waveStyle,
      }}
    />
  );

  if (!isLoading) return null;

  if (variant === "profile") {
    return (
      <div className={`space-y-4 ${disabled ? "opacity-50" : ""} ${className}`}>
        <div className="flex items-center gap-4">
          <div
            className={`rounded-full shrink-0 ${animClass} ${size === "sm" ? "w-10 h-10" : size === "md" ? "w-14 h-14" : "w-18 h-18"}`}
            style={{ background: animation !== "wave" ? "var(--bg-secondary)" : undefined, ...waveStyle }}
          />
          <div className="flex-1 space-y-2">
            <Bar width="40%" height="16px" />
            <Bar width="25%" height="12px" />
          </div>
        </div>
        {Array.from({ length: rows }).map((_, i) => (
          <Bar key={i} width={`${100 - i * 15}%`} />
        ))}
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className={`space-y-3 ${disabled ? "opacity-50" : ""} ${className}`}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            {showImage && (
              <div
                className={`shrink-0 rounded-lg ${animClass} ${size === "sm" ? "w-8 h-8" : size === "md" ? "w-10 h-10" : "w-12 h-12"}`}
                style={{ background: animation !== "wave" ? "var(--bg-secondary)" : undefined, ...waveStyle }}
              />
            )}
            <div className="flex-1 space-y-1.5">
              <Bar width={`${60 + Math.random() * 30}%`} height="14px" />
              <Bar width={`${40 + Math.random() * 20}%`} height="10px" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Card variant (default)
  return (
    <div
      className={`rounded-2xl border border-border bg-[var(--bg-card)] overflow-hidden ${
        disabled ? "opacity-50" : ""
      } ${className}`}
    >
      {showImage && (
        <div
          className={`w-full ${animClass} ${size === "sm" ? "h-28" : size === "md" ? "h-40" : "h-52"}`}
          style={{ background: animation !== "wave" ? "var(--bg-secondary)" : undefined, ...waveStyle }}
        />
      )}
      <div className={`space-y-3 ${size === "sm" ? "p-3" : size === "md" ? "p-5" : "p-7"}`}>
        <Bar width="50%" height="18px" />
        {Array.from({ length: rows }).map((_, i) => (
          <Bar key={i} width={`${85 - i * 12}%`} />
        ))}
      </div>
    </div>
  );
}
