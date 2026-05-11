"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";

const suggestions = [
  "Button components",
  "Navigation bars",
  "Card layouts",
  "Form inputs",
  "Data tables",
];

export default function MorphingSearch() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = suggestions.filter((s) =>
    s.toLowerCase().includes(query.toLowerCase())
  );

  const handleExpand = () => {
    setIsExpanded(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    setQuery("");
  };

  return (
    <div className="relative flex items-center justify-center w-full">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.button
            key="collapsed"
            layoutId="search-container"
            onClick={handleExpand}
            className="flex items-center gap-3 px-6 py-3 rounded-full border border-border bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:shadow-[var(--shadow-glow)] transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Search size={18} />
            <span className="text-sm font-medium">Search components...</span>
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[var(--bg-secondary)] text-[var(--text-tertiary)] text-xs font-mono">
              ⌘K
            </kbd>
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            layoutId="search-container"
            className="w-full max-w-md rounded-2xl border border-[var(--accent)] bg-[var(--bg-card)] shadow-[var(--shadow-glow)] overflow-hidden"
          >
            <div className="flex items-center gap-3 px-5 py-4">
              <Search size={18} className="text-[var(--accent)] shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type to search..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--text-tertiary)]"
              />
              <motion.button
                onClick={handleCollapse}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1 rounded-md hover:bg-[var(--accent-subtle)]"
              >
                <X size={16} className="text-[var(--text-tertiary)]" />
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="border-t border-border"
            >
              {filtered.length > 0 ? (
                <ul className="py-2">
                  {filtered.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <button className="w-full flex items-center justify-between px-5 py-2.5 text-sm hover:bg-[var(--accent-subtle)] transition-colors group">
                        <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                          {item}
                        </span>
                        <ArrowRight
                          size={14}
                          className="text-[var(--text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <div className="px-5 py-4 text-sm text-[var(--text-tertiary)]">
                  No results found
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
