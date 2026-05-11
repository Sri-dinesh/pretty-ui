"use client";

import { motion } from "framer-motion";

interface PulseDataBadgeProps {
  value: string | number;
  label: string;
  trend?: "up" | "down" | "neutral";
  pulse?: boolean;
}

export default function PulseDataBadge({
  value = "2,847",
  label = "Active Users",
  trend = "up",
  pulse = true,
}: PulseDataBadgeProps) {
  const trendColors = {
    up: { color: "#22c55e", bg: "rgba(34, 197, 94, 0.1)" },
    down: { color: "#ef4444", bg: "rgba(239, 68, 68, 0.1)" },
    neutral: { color: "var(--text-tertiary)", bg: "var(--accent-subtle)" },
  };

  const trendConfig = trendColors[trend];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="relative inline-flex items-center gap-4 px-6 py-4 rounded-2xl border border-border bg-[var(--bg-card)] overflow-hidden group cursor-default"
    >
      {/* Pulse ring */}
      {pulse && (
        <div className="absolute top-3 right-3">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{
                backgroundColor: trendConfig.color,
                animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
              }}
            />
            <span
              className="relative inline-flex rounded-full h-2.5 w-2.5"
              style={{ backgroundColor: trendConfig.color }}
            />
          </span>
        </div>
      )}

      {/* Icon area */}
      <div
        className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
        style={{ background: trendConfig.bg }}
      >
        {trend === "up" ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={trendConfig.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
        ) : trend === "down" ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={trendConfig.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
            <polyline points="17 18 23 18 23 12" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={trendConfig.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        )}
      </div>

      {/* Text */}
      <div>
        <motion.div
          className="text-2xl font-bold tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {value}
        </motion.div>
        <div className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider mt-0.5">
          {label}
        </div>
      </div>

      {/* Hover shimmer */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--accent-glow), transparent)",
          backgroundSize: "200% 100%",
          animation: "shimmer 2s linear infinite",
        }}
      />
    </motion.div>
  );
}
