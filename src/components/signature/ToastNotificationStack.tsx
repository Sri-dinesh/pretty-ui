"use client";

import { useState, useCallback, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";
type Position = "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";

interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

interface ToastContextType {
  addToast: (type: ToastType, title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextType>({ addToast: () => {} });
export const useToast = () => useContext(ToastContext);

interface ToastNotificationStackProps {
  className?: string;
  variant?: "default" | "minimal" | "bordered";
  size?: "sm" | "md" | "lg";
  position?: Position;
  duration?: number;
  dismissible?: boolean;
  children?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
}

const icons = {
  success: <CheckCircle size={18} className="text-green-500" />,
  error: <XCircle size={18} className="text-red-500" />,
  warning: <AlertTriangle size={18} className="text-amber-500" />,
  info: <Info size={18} className="text-blue-500" />,
};

const positionClasses: Record<Position, string> = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
};

function ToastStack({
  position = "bottom-right",
  duration = 4000,
  dismissible = true,
}: {
  position: Position;
  duration: number;
  dismissible: boolean;
  toasts: ToastItem[];
  removeToast: (id: string) => void;
} & { toasts: ToastItem[]; removeToast: (id: string) => void }) {
  return null; // placeholder to avoid confusion, actual rendering below
}

export default function ToastNotificationStack({
  className = "",
  position = "bottom-right",
  duration = 4000,
  dismissible = true,
  disabled = false,
}: ToastNotificationStackProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback(
    (type: ToastType, title: string, description?: string) => {
      if (disabled) return;
      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      setToasts((prev) => [...prev, { id, type, title, description }]);
      if (duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
      }
    },
    [duration, disabled]
  );

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const isBottom = position.includes("bottom");
  const slideFrom = position.includes("right") ? 80 : position.includes("left") ? -80 : 0;

  return (
    <div className={className}>
      {/* Demo triggers */}
      <div className="flex flex-wrap gap-2">
        {(["success", "error", "warning", "info"] as ToastType[]).map((type) => (
          <motion.button
            key={type}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => addToast(type, `${type.charAt(0).toUpperCase() + type.slice(1)} toast`, "This is a notification message.")}
            disabled={disabled}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border border-border bg-[var(--bg-card)] hover:border-[var(--accent)] transition-colors capitalize ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {type}
          </motion.button>
        ))}
      </div>

      {/* Toast container - rendered via portal-like fixed positioning */}
      <div className={`fixed ${positionClasses[position]} z-[100] flex flex-col ${isBottom ? "flex-col-reverse" : ""} gap-2 w-full max-w-sm pointer-events-none`}>
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, x: slideFrom, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: slideFrom, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onMouseEnter={() => {/* pause would require clearing timeout - simplified */}}
              className="pointer-events-auto flex items-start gap-3 px-4 py-3.5 rounded-xl border border-border bg-[var(--bg-card)] shadow-lg"
            >
              <div className="shrink-0 mt-0.5">{icons[toast.type]}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold">{toast.title}</div>
                {toast.description && (
                  <div className="text-xs text-[var(--text-tertiary)] mt-0.5">{toast.description}</div>
                )}
              </div>
              {dismissible && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeToast(toast.id)}
                  className="shrink-0 p-0.5 rounded hover:bg-[var(--bg-secondary)] text-[var(--text-tertiary)] transition-colors"
                  aria-label="Dismiss"
                >
                  <X size={14} />
                </motion.button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
