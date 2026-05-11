"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

interface OTPInputProps {
  className?: string;
  variant?: "default" | "underline" | "rounded";
  size?: "sm" | "md" | "lg";
  length?: number;
  isSecure?: boolean;
  inputType?: "number" | "alphanumeric";
  onComplete?: (code: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function OTPInput({
  className = "",
  size = "md",
  length = 6,
  isSecure = false,
  inputType = "number",
  onComplete,
  isLoading = false,
  disabled = false,
}: OTPInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const sizes = {
    sm: "w-9 h-10 text-sm",
    md: "w-12 h-14 text-lg",
    lg: "w-14 h-16 text-xl",
  };

  const isValidChar = useCallback(
    (char: string) => {
      if (inputType === "number") return /^\d$/.test(char);
      return /^[a-zA-Z0-9]$/.test(char);
    },
    [inputType]
  );

  const handleChange = (index: number, char: string) => {
    if (disabled || !isValidChar(char)) return;
    const newValues = [...values];
    newValues[index] = char;
    setValues(newValues);

    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    const code = newValues.join("");
    if (code.length === length && newValues.every((v) => v !== "")) {
      onComplete?.(code);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newValues = [...values];
      if (values[index]) {
        newValues[index] = "";
        setValues(newValues);
      } else if (index > 0) {
        newValues[index - 1] = "";
        setValues(newValues);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, length);
    const chars = pasted.split("").filter(isValidChar);
    const newValues = [...values];
    chars.forEach((char, i) => {
      if (i < length) newValues[i] = char;
    });
    setValues(newValues);
    const nextIndex = Math.min(chars.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
    if (newValues.every((v) => v !== "") && newValues.join("").length === length) {
      onComplete?.(newValues.join(""));
    }
  };

  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`}>
      {Array.from({ length }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            scale: focusedIndex === i ? 1.05 : 1,
            borderColor: focusedIndex === i ? "var(--accent)" : values[i] ? "var(--accent-light)" : "var(--border)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="relative"
        >
          {/* Glow ring */}
          {focusedIndex === i && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -inset-px rounded-xl pointer-events-none"
              style={{
                boxShadow: "0 0 12px var(--accent-glow)",
              }}
            />
          )}
          <input
            ref={(el) => { inputRefs.current[i] = el; }}
            type={isSecure ? "password" : "text"}
            inputMode={inputType === "number" ? "numeric" : "text"}
            maxLength={1}
            value={values[i]}
            onFocus={() => setFocusedIndex(i)}
            onBlur={() => setFocusedIndex(-1)}
            onChange={(e) => {
              const val = e.target.value;
              if (val) handleChange(i, val[val.length - 1]);
            }}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            disabled={disabled || isLoading}
            className={`${sizes[size]} rounded-xl border-2 bg-[var(--bg-card)] text-center font-semibold outline-none transition-colors caret-[var(--accent)] ${
              isLoading ? "animate-pulse" : ""
            }`}
            aria-label={`Digit ${i + 1}`}
          />
        </motion.div>
      ))}

      {/* Separator dash */}
      {length === 6 && (
        <div
          className="absolute left-1/2 -translate-x-1/2 w-3 h-0.5 rounded bg-[var(--border)]"
          style={{ display: "none" }}
        />
      )}
    </div>
  );
}
