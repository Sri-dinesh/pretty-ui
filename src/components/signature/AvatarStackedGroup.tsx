"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface AvatarStackedGroupProps {
  className?: string;
  variant?: "default" | "ring" | "minimal";
  size?: "sm" | "md" | "lg";
  users?: { name: string; imageUrl?: string }[];
  maxVisible?: number;
  isLoading?: boolean;
  disabled?: boolean;
}

const defaultUsers = [
  { name: "Alice" },
  { name: "Bob" },
  { name: "Carol" },
  { name: "Dan" },
  { name: "Eve" },
  { name: "Frank" },
  { name: "Grace" },
];

const palette = [
  "from-violet-500 to-purple-600",
  "from-cyan-500 to-blue-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-600",
  "from-emerald-500 to-teal-600",
  "from-fuchsia-500 to-purple-600",
  "from-sky-500 to-indigo-600",
];

export default function AvatarStackedGroup({
  className = "",
  size = "md",
  users = defaultUsers,
  maxVisible = 4,
  isLoading = false,
  disabled = false,
}: AvatarStackedGroupProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const visible = users.slice(0, maxVisible);
  const overflow = users.length - maxVisible;

  const sizes = {
    sm: { avatar: "w-8 h-8 text-[10px]", overlap: "-ml-2", ring: "ring-2" },
    md: { avatar: "w-10 h-10 text-xs", overlap: "-ml-3", ring: "ring-2" },
    lg: { avatar: "w-14 h-14 text-sm", overlap: "-ml-4", ring: "ring-[3px]" },
  };
  const s = sizes[size];

  return (
    <div className={`flex items-center ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`}>
      {isLoading
        ? Array.from({ length: maxVisible }).map((_, i) => (
            <div
              key={i}
              className={`${s.avatar} rounded-full bg-[var(--bg-secondary)] animate-pulse ${s.ring} ring-[var(--bg-card)] ${i > 0 ? s.overlap : ""}`}
            />
          ))
        : visible.map((user, i) => (
            <motion.div
              key={user.name}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
              animate={{
                y: hoveredIndex === i ? -6 : 0,
                scale: hoveredIndex === i ? 1.15 : 1,
                zIndex: hoveredIndex === i ? 20 : maxVisible - i,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={`relative ${s.avatar} rounded-full ${s.ring} ring-[var(--bg-card)] overflow-hidden cursor-pointer ${
                i > 0 ? s.overlap : ""
              }`}
            >
              {user.imageUrl ? (
                <img src={user.imageUrl} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${palette[i % palette.length]} flex items-center justify-center text-white font-bold`}>
                  {user.name.charAt(0)}
                </div>
              )}

              {/* Tooltip */}
              {hoveredIndex === i && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-[var(--bg-elevated)] text-[10px] font-medium border border-border shadow-md whitespace-nowrap z-30"
                >
                  {user.name}
                </motion.div>
              )}
            </motion.div>
          ))}

      {/* Overflow count */}
      {overflow > 0 && (
        <motion.div
          whileHover={{ scale: 1.1 }}
          className={`${s.avatar} rounded-full ${s.ring} ring-[var(--bg-card)] ${s.overlap} bg-[var(--bg-secondary)] flex items-center justify-center font-semibold text-[var(--text-secondary)] cursor-default`}
          style={{ zIndex: 0 }}
        >
          +{overflow}
        </motion.div>
      )}
    </div>
  );
}
