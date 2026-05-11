"use client";

import { motion } from "framer-motion";

interface BentoGridItemProps {
  className?: string;
  variant?: "default" | "gradient" | "outlined";
  size?: "sm" | "md" | "lg";
  span?: string;
  hasPattern?: boolean;
  theme?: "dark" | "light" | "auto";
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function BentoGridItem({
  className = "",
  size = "md",
  span = "col-span-1",
  hasPattern = true,
  theme = "auto",
  title = "Bento Item",
  description = "A sleek grid item designed for bento-box layouts with subtle patterns and fade-in animations.",
  icon,
  children,
  isLoading = false,
  disabled = false,
}: BentoGridItemProps) {
  const sizes = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const themeClasses = {
    dark: "bg-zinc-900 text-white border-zinc-800",
    light: "bg-white text-zinc-900 border-zinc-200",
    auto: "bg-[var(--bg-card)] border-border",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={!disabled ? { y: -3, transition: { duration: 0.2 } } : undefined}
      className={`relative overflow-hidden rounded-2xl border ${themeClasses[theme]} ${sizes[size]} ${span} ${
        disabled ? "opacity-50 pointer-events-none" : ""
      } transition-shadow duration-300 hover:shadow-[var(--shadow-lg)] group ${className}`}
    >
      {/* Gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-purple-500/5 pointer-events-none" />

      {/* Dot pattern */}
      {hasPattern && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04] group-hover:opacity-[0.06] transition-opacity"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 0.5px, transparent 0.5px)",
            backgroundSize: "16px 16px",
          }}
        />
      )}

      {/* Content */}
      {isLoading ? (
        <div className="relative z-10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] animate-pulse" />
          <div className="h-5 w-28 rounded bg-[var(--bg-secondary)] animate-pulse" />
          <div className="h-3 w-full rounded bg-[var(--bg-secondary)] animate-pulse" />
          <div className="h-3 w-3/4 rounded bg-[var(--bg-secondary)] animate-pulse" />
        </div>
      ) : children ? (
        <div className="relative z-10">{children}</div>
      ) : (
        <div className="relative z-10">
          {icon && (
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-subtle)] flex items-center justify-center text-[var(--accent)] mb-4">
              {icon}
            </div>
          )}
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{description}</p>
        </div>
      )}

      {/* Hover line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent origin-left"
      />
    </motion.div>
  );
}
