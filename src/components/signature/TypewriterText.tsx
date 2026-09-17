"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypewriterTextProps {
  strings: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  cursorChar?: string;
  className?: string;
  highlightColor?: string;
  prefix?: string;
}

export default function TypewriterText({
  strings = ["beautiful interfaces.", "stunning animations.", "premium components.", "pixel-perfect UI."],
  typingSpeed = 60,
  deletingSpeed = 35,
  pauseDuration = 2000,
  cursorChar = "|",
  className = "",
  highlightColor = "var(--accent)",
  prefix = "We craft ",
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");
  const [stringIndex, setStringIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentString = strings[stringIndex % strings.length];

  const tick = useCallback(() => {
    if (phase === "typing") {
      if (displayText.length < currentString.length) {
        setDisplayText(currentString.slice(0, displayText.length + 1));
        timeoutRef.current = setTimeout(tick, typingSpeed + Math.random() * 30);
      } else {
        setPhase("pausing");
        timeoutRef.current = setTimeout(() => setPhase("deleting"), pauseDuration);
      }
    } else if (phase === "deleting") {
      if (displayText.length > 0) {
        setDisplayText((prev) => prev.slice(0, -1));
        timeoutRef.current = setTimeout(tick, deletingSpeed);
      } else {
        setStringIndex((i) => (i + 1) % strings.length);
        setPhase("typing");
        timeoutRef.current = setTimeout(tick, 300);
      }
    }
  }, [phase, displayText, currentString, typingSpeed, deletingSpeed, pauseDuration, strings.length]);

  useEffect(() => {
    timeoutRef.current = setTimeout(tick, typingSpeed);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [tick]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`font-bold leading-tight ${className}`}>
      <span className="text-[var(--text-primary)]">{prefix}</span>
      <span style={{ color: highlightColor }}>
        {displayText}
      </span>
      <motion.span
        animate={{ opacity: cursorVisible ? 1 : 0 }}
        transition={{ duration: 0 }}
        style={{ color: highlightColor, marginLeft: "1px" }}
      >
        {cursorChar}
      </motion.span>
    </div>
  );
}
