"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface HolographicProfileCardProps {
  className?: string;
  variant?: "default" | "compact" | "expanded";
  size?: "sm" | "md" | "lg";
  tiltMaxAngle?: number;
  enableHologram?: boolean;
  imageUrl?: string;
  name?: string;
  role?: string;
  bio?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function HolographicProfileCard({
  className = "",
  size = "md",
  tiltMaxAngle = 12,
  enableHologram = true,
  imageUrl,
  name = "Alex Rivera",
  role = "Creative Engineer",
  bio = "Building the future of digital interfaces, one pixel at a time.",
  isLoading = false,
  disabled = false,
}: HolographicProfileCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [tiltMaxAngle, -tiltMaxAngle]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-tiltMaxAngle, tiltMaxAngle]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (disabled) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const sizes = { sm: "w-64", md: "w-80", lg: "w-96" };

  const hologramGradient = useTransform(
    [springX, springY],
    ([lx, ly]: number[]) => {
      const pctX = (lx + 0.5) * 100;
      const pctY = (ly + 0.5) * 100;
      return `linear-gradient(${135 + lx * 60}deg, #a855f7 ${pctX - 20}%, #06b6d4 ${pctX}%, #f43f5e ${pctX + 30}%, #facc15 ${pctY + 60}%)`;
    }
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={`relative ${sizes[size]} ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`}
    >
      {/* Holographic border */}
      {enableHologram && (
        <motion.div
          className="absolute -inset-[2px] rounded-2xl transition-opacity duration-300 pointer-events-none"
          style={{
            background: hologramGradient,
            opacity: isHovered ? 1 : 0.4,
            filter: isHovered ? "blur(2px) brightness(1.3)" : "blur(0px)",
          }}
        />
      )}

      {/* Card body */}
      <div className="relative rounded-2xl bg-[var(--bg-card)] border border-border overflow-hidden">
        {/* Holographic shimmer overlay */}
        {enableHologram && isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-20 opacity-20"
            style={{
              background: hologramGradient,
              mixBlendMode: "overlay",
            }}
          />
        )}

        {isLoading ? (
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] animate-pulse" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-24 bg-[var(--bg-secondary)] rounded animate-pulse" />
                <div className="h-3 w-20 bg-[var(--bg-secondary)] rounded animate-pulse" />
              </div>
            </div>
            <div className="h-3 w-full bg-[var(--bg-secondary)] rounded animate-pulse" />
            <div className="h-3 w-2/3 bg-[var(--bg-secondary)] rounded animate-pulse" />
          </div>
        ) : (
          <div className="relative z-10 p-6">
            {/* Avatar + Info */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-[var(--accent)] to-purple-500">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-xl font-bold">
                      {name.charAt(0)}
                    </div>
                  )}
                </div>
                {/* Online indicator */}
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-500 border-2 border-[var(--bg-card)]" />
              </div>
              <div>
                <h3 className="font-semibold text-base">{name}</h3>
                <p className="text-xs text-[var(--accent)] font-medium">{role}</p>
              </div>
            </div>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
              {bio}
            </p>

            {/* Stats */}
            <div className="flex gap-6 pt-4 border-t border-border">
              {[
                { label: "Projects", value: "128" },
                { label: "Followers", value: "4.2K" },
                { label: "Stars", value: "892" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-sm font-bold">{stat.value}</div>
                  <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
