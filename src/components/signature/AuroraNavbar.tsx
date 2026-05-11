"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const navLinks = ["Components", "Docs", "Showcase", "Pricing"];

export default function AuroraNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { theme, toggle } = useTheme();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-3xl mx-auto"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-[var(--bg-card)]">
        {/* Aurora gradient background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "linear-gradient(120deg, transparent 20%, var(--accent-glow) 50%, transparent 80%)",
            backgroundSize: "200% 200%",
            animation: "gradient-shift 8s ease infinite",
          }}
        />

        <div className="relative flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 font-bold text-lg"
            whileHover={{ scale: 1.02 }}
          >
            <Sparkles className="w-5 h-5 text-[var(--accent)]" />
            <span>Pretty UI</span>
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <motion.button
                key={link}
                onHoverStart={() => setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              >
                {hoveredIndex === i && (
                  <motion.div
                    layoutId="navbar-hover"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: "var(--accent-subtle)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link}</span>
              </motion.button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.9, rotate: 180 }}
              transition={{ duration: 0.3 }}
              onClick={toggle}
              className="p-2 rounded-full hover:bg-[var(--accent-subtle)] transition-colors"
              aria-label="Toggle theme"
            >
              <motion.div
                animate={{ rotate: theme === "dark" ? 0 : 180 }}
                transition={{ duration: 0.5 }}
              >
                {theme === "dark" ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                )}
              </motion.div>
            </motion.button>

            {/* Mobile hamburger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[var(--accent-subtle)]"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden border-t border-border"
            >
              <div className="px-4 py-3 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--accent-subtle)] transition-colors"
                  >
                    {link}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
