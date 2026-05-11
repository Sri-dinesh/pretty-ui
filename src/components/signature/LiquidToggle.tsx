"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LiquidToggleProps {
  defaultChecked?: boolean;
  onToggle?: (checked: boolean) => void;
  label?: string;
}

export default function LiquidToggle({
  defaultChecked = false,
  onToggle,
  label = "Dark Mode",
}: LiquidToggleProps) {
  const [isOn, setIsOn] = useState(defaultChecked);

  const handleToggle = () => {
    setIsOn(!isOn);
    onToggle?.(!isOn);
  };

  return (
    <div className="flex items-center gap-4">
      {label && (
        <span className="text-sm font-medium text-[var(--text-secondary)]">
          {label}
        </span>
      )}
      <button
        role="switch"
        aria-checked={isOn}
        onClick={handleToggle}
        className="relative w-16 h-9 rounded-full p-1 transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        style={{
          background: isOn ? "var(--accent)" : "var(--border)",
        }}
      >
        {/* Liquid blob background */}
        <AnimatePresence>
          {isOn && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: "0 0 20px var(--accent-glow)" }}
            />
          )}
        </AnimatePresence>

        {/* Knob */}
        <motion.div
          animate={{
            x: isOn ? 28 : 0,
            scale: 1,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          whileTap={{ scale: 0.85 }}
          className="relative w-7 h-7 rounded-full bg-white shadow-md"
        >
          {/* Inner detail */}
          <motion.div
            animate={{
              scale: isOn ? 1 : 0,
              opacity: isOn ? 1 : 0,
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "var(--accent)" }}
            />
          </motion.div>

          {/* Off state inner */}
          <motion.div
            animate={{
              scale: isOn ? 0 : 1,
              opacity: isOn ? 0 : 1,
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--text-tertiary)]" />
          </motion.div>
        </motion.div>

        {/* Ripple on toggle */}
        <AnimatePresence>
          {isOn && (
            <motion.div
              key="ripple"
              initial={{ scale: 0.5, opacity: 0.5 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute top-1/2 right-2 -translate-y-1/2 w-7 h-7 rounded-full"
              style={{ background: "var(--accent)" }}
            />
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
