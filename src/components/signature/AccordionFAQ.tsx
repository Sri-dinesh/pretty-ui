"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Minus } from "lucide-react";

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionFAQProps {
  className?: string;
  variant?: "default" | "bordered" | "ghost";
  size?: "sm" | "md" | "lg";
  items?: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenIndex?: number;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  disabled?: boolean;
}

const defaultItems: AccordionItem[] = [
  {
    title: "What components are included?",
    content: "The Signature Collection includes 20 premium components ranging from interactive buttons and cards to complex navigation patterns and data display widgets.",
  },
  {
    title: "Can I use these in production?",
    content: "Absolutely. Every component is built with TypeScript, follows WCAG accessibility standards, and is fully responsive. They're designed to be production-ready.",
  },
  {
    title: "Do they work with Tailwind CSS?",
    content: "Yes. All components use Tailwind CSS for styling and are compatible with your existing Tailwind configuration. Custom CSS variables are used for theming.",
  },
  {
    title: "How do animations perform?",
    content: "All animations are powered by Framer Motion and run at 60fps. They use GPU-accelerated transforms and are designed to be silky smooth on all devices.",
  },
];

export default function AccordionFAQ({
  className = "",
  size = "md",
  items = defaultItems,
  allowMultiple = false,
  defaultOpenIndex = -1,
  iconPosition = "right",
  isLoading = false,
  disabled = false,
}: AccordionFAQProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(
    new Set(defaultOpenIndex >= 0 ? [defaultOpenIndex] : [])
  );

  const toggle = (index: number) => {
    if (disabled) return;
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (!allowMultiple) next.clear();
        next.add(index);
      }
      return next;
    });
  };

  const sizes = {
    sm: { px: "px-4", py: "py-3", title: "text-sm", content: "text-xs" },
    md: { px: "px-5", py: "py-4", title: "text-base", content: "text-sm" },
    lg: { px: "px-6", py: "py-5", title: "text-lg", content: "text-base" },
  };
  const s = sizes[size];

  if (isLoading) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-14 rounded-xl bg-[var(--bg-secondary)] animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className={`w-full max-w-lg space-y-2 ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`}>
      {items.map((item, i) => {
        const isOpen = openIndices.has(i);
        return (
          <div
            key={i}
            className="rounded-xl border border-border bg-[var(--bg-card)] overflow-hidden transition-colors hover:border-[var(--border-hover)]"
          >
            <button
              onClick={() => toggle(i)}
              className={`w-full flex items-center gap-3 ${s.px} ${s.py} text-left`}
              aria-expanded={isOpen}
            >
              {iconPosition === "left" && (
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 text-[var(--accent)]"
                >
                  <Plus size={16} />
                </motion.div>
              )}
              <span className={`flex-1 ${s.title} font-medium`}>{item.title}</span>
              {iconPosition === "right" && (
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="shrink-0 text-[var(--text-tertiary)]"
                >
                  <ChevronDown size={18} />
                </motion.div>
              )}
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className={`${s.px} pb-4 ${s.content} text-[var(--text-secondary)] leading-relaxed border-t border-border pt-3`}>
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
