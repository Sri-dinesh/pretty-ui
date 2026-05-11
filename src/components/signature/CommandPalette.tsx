"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, ArrowRight, Clock, Hash } from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  category?: string;
}

interface CommandPaletteProps {
  className?: string;
  variant?: "default" | "minimal" | "bordered";
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  data?: CommandItem[];
  showRecent?: boolean;
  onSelect?: (item: CommandItem) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const defaultData: CommandItem[] = [
  { id: "1", label: "Create new project", category: "Actions", description: "Start a fresh workspace" },
  { id: "2", label: "Search components", category: "Actions", description: "Browse the library" },
  { id: "3", label: "Toggle dark mode", category: "Settings", description: "Switch theme" },
  { id: "4", label: "Open documentation", category: "Navigation", description: "Read the docs" },
  { id: "5", label: "Export as package", category: "Actions", description: "Download components" },
  { id: "6", label: "Profile settings", category: "Settings", description: "Manage your account" },
  { id: "7", label: "View changelog", category: "Navigation", description: "See what's new" },
  { id: "8", label: "Invite team member", category: "Actions", description: "Share workspace access" },
];

export default function CommandPalette({
  className = "",
  size = "md",
  placeholder = "Type a command or search...",
  data = defaultData,
  showRecent = true,
  onSelect,
  isLoading = false,
  disabled = false,
}: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = data.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.description?.toLowerCase().includes(query.toLowerCase())
  );

  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    const cat = item.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  const flatFiltered = Object.values(grouped).flat();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setActiveIndex(0);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, flatFiltered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && flatFiltered[activeIndex]) {
      onSelect?.(flatFiltered[activeIndex]);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Trigger */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => !disabled && setIsOpen(true)}
        disabled={disabled}
        className={`inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border border-border bg-[var(--bg-card)] text-[var(--text-tertiary)] hover:border-[var(--accent)] transition-all ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <Search size={15} />
        <span className="text-sm">Search...</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-[var(--bg-secondary)] text-[10px] font-mono border border-border">
          <Command size={10} />K
        </kbd>
      </motion.button>

      {/* Palette */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
            onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`relative w-full max-w-lg bg-[var(--bg-card)] border border-border rounded-2xl shadow-2xl overflow-hidden ${className}`}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                <Search size={18} className="text-[var(--text-tertiary)] shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActiveIndex(0);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholder}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--text-tertiary)]"
                />
                <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[var(--bg-secondary)] text-[var(--text-tertiary)] border border-border">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[320px] overflow-y-auto py-2">
                {isLoading ? (
                  <div className="px-5 py-3 space-y-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="h-10 rounded-lg bg-[var(--bg-secondary)] animate-pulse" />
                    ))}
                  </div>
                ) : flatFiltered.length === 0 ? (
                  <div className="px-5 py-8 text-center text-sm text-[var(--text-tertiary)]">
                    No results for &ldquo;{query}&rdquo;
                  </div>
                ) : (
                  Object.entries(grouped).map(([category, items]) => (
                    <div key={category}>
                      <div className="px-5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                        {category}
                      </div>
                      {items.map((item) => {
                        const globalIndex = flatFiltered.indexOf(item);
                        return (
                          <motion.button
                            key={item.id}
                            onClick={() => {
                              onSelect?.(item);
                              setIsOpen(false);
                            }}
                            onMouseEnter={() => setActiveIndex(globalIndex)}
                            className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors ${
                              globalIndex === activeIndex
                                ? "bg-[var(--accent-subtle)]"
                                : "hover:bg-[var(--bg-secondary)]"
                            }`}
                          >
                            <div className="w-8 h-8 rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center shrink-0">
                              {item.icon || <Hash size={14} className="text-[var(--text-tertiary)]" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium truncate">{item.label}</div>
                              {item.description && (
                                <div className="text-xs text-[var(--text-tertiary)] truncate">
                                  {item.description}
                                </div>
                              )}
                            </div>
                            {globalIndex === activeIndex && (
                              <ArrowRight size={14} className="text-[var(--accent)] shrink-0" />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-2.5 border-t border-border flex items-center gap-4 text-[10px] text-[var(--text-tertiary)]">
                <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-[var(--bg-secondary)] border border-border">↑↓</kbd> Navigate</span>
                <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-[var(--bg-secondary)] border border-border">↵</kbd> Select</span>
                <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-[var(--bg-secondary)] border border-border">Esc</kbd> Close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
