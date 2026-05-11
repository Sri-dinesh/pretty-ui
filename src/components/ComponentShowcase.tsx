"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Eye, Copy, Check } from "lucide-react";

interface ComponentShowcaseProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
  span?: "1" | "2" | "full";
}

export default function ComponentShowcase({
  title,
  description,
  children,
  className = "",
  span = "1",
}: ComponentShowcaseProps) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const spanClasses = {
    "1": "col-span-1",
    "2": "md:col-span-2",
    full: "md:col-span-2 lg:col-span-3",
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative rounded-2xl border border-border bg-[var(--bg-card)] overflow-hidden hover:border-[var(--border-hover)] transition-all duration-300 hover:shadow-[var(--shadow-lg)] ${spanClasses[span]} ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-xs text-[var(--text-tertiary)] mt-0.5 max-w-[260px]">
            {description}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="p-2 rounded-lg hover:bg-[var(--accent-subtle)] text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors"
            aria-label="Copy code"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Check size={14} className="text-green-500" />
                </motion.div>
              ) : (
                <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Copy size={14} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCode(!showCode)}
            className={`p-2 rounded-lg transition-colors ${
              showCode
                ? "bg-[var(--accent-subtle)] text-[var(--accent)]"
                : "hover:bg-[var(--accent-subtle)] text-[var(--text-tertiary)] hover:text-[var(--accent)]"
            }`}
            aria-label="Toggle code view"
          >
            {showCode ? <Eye size={14} /> : <Code2 size={14} />}
          </motion.button>
        </div>
      </div>

      {/* Component Display */}
      <div className="relative min-h-[200px] flex items-center justify-center p-8">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--text-primary) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 w-full flex items-center justify-center">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
