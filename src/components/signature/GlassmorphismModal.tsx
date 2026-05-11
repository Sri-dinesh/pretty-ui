"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface GlassmorphismModalProps {
  className?: string;
  variant?: "default" | "centered" | "drawer";
  size?: "sm" | "md" | "lg" | "full";
  blur?: number;
  backdropColor?: string;
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function GlassmorphismModal({
  className = "",
  size = "md",
  blur = 16,
  backdropColor = "rgba(0, 0, 0, 0.5)",
  isOpen: controlledOpen,
  onClose: controlledClose,
  title = "Glassmorphism Modal",
  children,
  isLoading = false,
  disabled = false,
}: GlassmorphismModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen ?? internalOpen;
  const onClose = controlledClose ?? (() => setInternalOpen(false));

  const sizeStyles = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    full: "max-w-[95vw] max-h-[95vh]",
  };

  const defaultContent = (
    <div className="space-y-4">
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
        This modal uses glassmorphism with backdrop blur for a frosted-glass effect. It animates in with spring physics and supports keyboard dismissal.
      </p>
      <div className="flex gap-3 pt-2">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-[var(--accent)] text-white text-sm font-medium hover:brightness-110 transition"
        >
          Confirm
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-[var(--bg-secondary)] transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Trigger (only if uncontrolled) */}
      {controlledOpen === undefined && (
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => !disabled && setInternalOpen(true)}
          disabled={disabled}
          className={`px-6 py-3 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold hover:shadow-[var(--shadow-glow)] transition-shadow ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Open Modal
        </motion.button>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
            onKeyDown={(e) => e.key === "Escape" && onClose()}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              style={{
                backgroundColor: backdropColor,
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`,
              }}
            />

            {/* Modal panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className={`relative w-full ${sizeStyles[size]} rounded-2xl border border-white/10 overflow-hidden ${className}`}
              style={{
                background: "rgba(var(--bg-card-rgb, 20, 20, 22), 0.8)",
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`,
              }}
            >
              {/* Holographic top edge */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-50" />

              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-2">
                <h2 className="text-lg font-semibold">{title}</h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-[var(--text-tertiary)] transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* Content */}
              <div className="px-6 pb-6 pt-2">
                {isLoading ? (
                  <div className="space-y-3">
                    <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
                    <div className="h-4 w-3/4 rounded bg-white/10 animate-pulse" />
                    <div className="h-4 w-1/2 rounded bg-white/10 animate-pulse" />
                  </div>
                ) : (
                  children || defaultContent
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
