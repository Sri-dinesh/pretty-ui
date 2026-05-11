"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface GlowInputProps {
  placeholder?: string;
  label?: string;
  type?: string;
}

export default function GlowInput({
  placeholder = "Enter your email...",
  label = "Email",
  type = "email",
}: GlowInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="w-full max-w-sm">
      {label && (
        <motion.label
          animate={{
            color: isFocused ? "var(--accent)" : "var(--text-secondary)",
          }}
          className="block text-sm font-medium mb-2 transition-colors"
        >
          {label}
        </motion.label>
      )}

      <div className="relative">
        {/* Glow effect */}
        <motion.div
          animate={{
            opacity: isFocused ? 1 : 0,
            scale: isFocused ? 1 : 0.95,
          }}
          transition={{ duration: 0.3 }}
          className="absolute -inset-px rounded-xl pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, var(--accent), #a855f7, var(--accent))",
            backgroundSize: "200% 200%",
            animation: isFocused ? "gradient-shift 3s ease infinite" : "none",
            filter: "blur(4px)",
          }}
        />

        {/* Input container */}
        <div className="relative rounded-xl bg-[var(--bg-card)] border border-border overflow-hidden">
          <input
            type={type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="w-full px-4 py-3.5 bg-transparent text-sm outline-none placeholder:text-[var(--text-tertiary)]"
          />

          {/* Animated underline */}
          <motion.div
            animate={{
              scaleX: isFocused ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
            style={{ background: "var(--accent)" }}
          />
        </div>

        {/* Character count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isFocused && value.length > 0 ? 1 : 0 }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--text-tertiary)] font-mono"
        >
          {value.length}
        </motion.div>
      </div>
    </div>
  );
}
