"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FloatingLabelInputProps {
  className?: string;
  variant?: "default" | "filled" | "minimal";
  size?: "sm" | "md" | "lg";
  labelText?: string;
  helperText?: string;
  hasError?: boolean;
  cornerStyle?: "sharp" | "rounded" | "pill";
  type?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function FloatingLabelInput({
  className = "",
  size = "md",
  labelText = "Email address",
  helperText,
  hasError = false,
  cornerStyle = "rounded",
  type = "text",
  disabled = false,
  isLoading = false,
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");
  const isActive = isFocused || value.length > 0;

  const sizes = {
    sm: { input: "pt-5 pb-1.5 px-3 text-xs", label: "text-xs", helper: "text-[10px]" },
    md: { input: "pt-6 pb-2 px-4 text-sm", label: "text-sm", helper: "text-xs" },
    lg: { input: "pt-7 pb-2.5 px-5 text-base", label: "text-base", helper: "text-sm" },
  };

  const radii = { sharp: "rounded-none", rounded: "rounded-xl", pill: "rounded-full" };
  const s = sizes[size];

  const borderColor = hasError
    ? "border-red-500"
    : isFocused
    ? "border-[var(--accent)]"
    : "border-border";

  return (
    <div className={`w-full max-w-sm ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`}>
      <div className="relative">
        {/* Glow */}
        {isFocused && !hasError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute -inset-px ${radii[cornerStyle]} pointer-events-none`}
            style={{ boxShadow: "0 0 8px var(--accent-glow)" }}
          />
        )}

        <input
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled || isLoading}
          className={`peer w-full ${s.input} ${radii[cornerStyle]} bg-[var(--bg-card)] border ${borderColor} outline-none transition-colors duration-200 ${
            cornerStyle === "pill" ? "pl-6" : ""
          }`}
          placeholder=" "
          aria-label={labelText}
        />

        {/* Floating label */}
        <motion.label
          animate={{
            y: isActive ? -10 : 0,
            scale: isActive ? 0.75 : 1,
            color: hasError
              ? "#ef4444"
              : isFocused
              ? "var(--accent)"
              : "var(--text-tertiary)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`absolute left-${cornerStyle === "pill" ? "6" : "4"} ${
            size === "sm" ? "top-2.5" : size === "md" ? "top-3.5" : "top-4"
          } origin-left ${s.label} font-medium pointer-events-none`}
          style={{ left: cornerStyle === "pill" ? "1.5rem" : "1rem" }}
        >
          {labelText}
        </motion.label>

        {/* Animated underline */}
        {cornerStyle !== "pill" && (
          <motion.div
            animate={{ scaleX: isFocused ? 1 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute bottom-0 left-0 right-0 h-0.5 origin-center ${
              hasError ? "bg-red-500" : "bg-[var(--accent)]"
            }`}
          />
        )}
      </div>

      {/* Helper text */}
      {helperText && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-1.5 ${s.helper} ${hasError ? "text-red-500" : "text-[var(--text-tertiary)]"}`}
        >
          {helperText}
        </motion.p>
      )}
    </div>
  );
}
