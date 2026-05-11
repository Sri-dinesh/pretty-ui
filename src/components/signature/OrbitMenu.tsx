"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Settings, User, Bell, Search } from "lucide-react";

const menuItems = [
  { icon: Home, label: "Home" },
  { icon: Search, label: "Search" },
  { icon: Bell, label: "Alerts" },
  { icon: User, label: "Profile" },
  { icon: Settings, label: "Settings" },
];

export default function OrbitMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="relative flex items-center justify-center w-48 h-48">
      {/* Orbit items */}
      <AnimatePresence>
        {isOpen &&
          menuItems.map((item, i) => {
            const angle = (i / menuItems.length) * 360 - 90;
            const rad = (angle * Math.PI) / 180;
            const radius = 70;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;
            const Icon = item.icon;

            return (
              <motion.button
                key={item.label}
                initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                animate={{ x, y, scale: 1, opacity: 1 }}
                exit={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: i * 0.05,
                }}
                onHoverStart={() => setActiveIndex(i)}
                onHoverEnd={() => setActiveIndex(null)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="absolute flex items-center justify-center w-11 h-11 rounded-full border border-border bg-[var(--bg-card)] shadow-md hover:border-[var(--accent)] hover:shadow-[var(--shadow-glow)] transition-colors"
                aria-label={item.label}
              >
                <Icon size={18} className={activeIndex === i ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"} />

                {/* Tooltip */}
                <AnimatePresence>
                  {activeIndex === i && (
                    <motion.span
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute -bottom-8 px-2 py-1 rounded-md bg-[var(--bg-elevated)] text-[10px] font-medium text-[var(--text-secondary)] border border-border whitespace-nowrap shadow-md"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
      </AnimatePresence>

      {/* Center button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-[var(--accent)] text-white shadow-lg"
        style={{
          boxShadow: isOpen
            ? "0 0 30px var(--accent-glow)"
            : "0 4px 12px rgba(0,0,0,0.2)",
        }}
        aria-label="Toggle menu"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </motion.button>

      {/* Orbit ring */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute w-[160px] h-[160px] rounded-full border border-border/50 pointer-events-none"
            style={{ borderStyle: "dashed" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
