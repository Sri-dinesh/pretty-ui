"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Check, AlertCircle, Info, Gift } from "lucide-react";

interface Notification {
  id: string | number;
  title: string;
  message: string;
  time: string;
  read?: boolean;
  type?: "info" | "success" | "warning" | "gift";
}

interface NotificationBellProps {
  notifications?: Notification[];
  className?: string;
}

const defaultNotifications: Notification[] = [
  {
    id: 1,
    title: "New component available",
    message: "Phase 3 components are now live and ready to use.",
    time: "Just now",
    type: "gift",
    read: false,
  },
  {
    id: 2,
    title: "Build successful",
    message: "Your latest deployment completed with 0 errors.",
    time: "2m ago",
    type: "success",
    read: false,
  },
  {
    id: 3,
    title: "Design system updated",
    message: "CSS variables have been refreshed across all themes.",
    time: "1h ago",
    type: "info",
    read: false,
  },
  {
    id: 4,
    title: "Performance warning",
    message: "Bundle size increased by 12KB in the last build.",
    time: "3h ago",
    type: "warning",
    read: true,
  },
];

const typeConfig = {
  info: { icon: Info, color: "#06b6d4", bg: "rgba(6,182,212,0.12)" },
  success: { icon: Check, color: "#10b981", bg: "rgba(16,185,129,0.12)" },
  warning: { icon: AlertCircle, color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  gift: { icon: Gift, color: "#a855f7", bg: "rgba(168,85,247,0.12)" },
};

export default function NotificationBell({
  notifications: initialNotifications = defaultNotifications,
  className = "",
}: NotificationBellProps) {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isJiggling, setIsJiggling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleBellClick = () => {
    if (!open) {
      setIsJiggling(true);
      setTimeout(() => setIsJiggling(false), 600);
    }
    setOpen((o) => !o);
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const dismiss = (id: string | number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div ref={containerRef} className={`relative inline-flex ${className}`}>
      {/* Bell button */}
      <motion.button
        onClick={handleBellClick}
        animate={
          isJiggling
            ? { rotate: [0, -18, 18, -12, 12, -6, 6, 0] }
            : { rotate: 0 }
        }
        transition={{ duration: 0.6, ease: "easeInOut" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="relative w-11 h-11 rounded-xl flex items-center justify-center border transition-colors"
        style={{
          background: open ? "var(--accent-subtle)" : "var(--bg-card)",
          borderColor: open ? "var(--accent)" : "var(--border)",
          color: open ? "var(--accent)" : "var(--text-primary)",
        }}
        aria-label="Notifications"
      >
        <Bell size={20} />

        {/* Badge */}
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-white text-[10px] font-bold"
              style={{ background: "var(--accent)" }}
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="absolute top-full right-0 mt-2 w-80 rounded-2xl border overflow-hidden shadow-2xl z-50"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
              <span className="text-sm font-semibold">Notifications</span>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs text-[var(--accent)] font-medium hover:underline"
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* List */}
            <div className="max-h-72 overflow-y-auto">
              <AnimatePresence initial={false}>
                {notifications.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-10 gap-2 text-[var(--text-tertiary)]"
                  >
                    <Bell size={28} className="opacity-30" />
                    <p className="text-xs">All caught up!</p>
                  </motion.div>
                ) : (
                  notifications.map((notif, i) => {
                    const config = typeConfig[notif.type || "info"];
                    const Icon = config.icon;

                    return (
                      <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 16, height: 0, padding: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.25 }}
                        className="flex items-start gap-3 px-4 py-3 border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-secondary)] transition-colors"
                        style={{ opacity: notif.read ? 0.65 : 1 }}
                      >
                        {/* Icon */}
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: config.bg }}
                        >
                          <Icon size={14} style={{ color: config.color }} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-xs font-semibold leading-snug">{notif.title}</p>
                            {!notif.read && (
                              <div
                                className="w-1.5 h-1.5 rounded-full shrink-0 mt-1"
                                style={{ background: "var(--accent)" }}
                              />
                            )}
                          </div>
                          <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                            {notif.message}
                          </p>
                          <p className="text-[10px] text-[var(--text-tertiary)] mt-1">{notif.time}</p>
                        </div>

                        {/* Dismiss */}
                        <button
                          onClick={() => dismiss(notif.id)}
                          className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                        >
                          <X size={11} />
                        </button>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="px-4 py-2.5 border-t border-[var(--border)]">
                <button className="text-xs text-[var(--accent)] font-medium hover:underline w-full text-center">
                  View all notifications
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
