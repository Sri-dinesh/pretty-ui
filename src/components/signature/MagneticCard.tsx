"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface MagneticCardProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  gradient?: string;
}

export default function MagneticCard({
  title = "Magnetic Card",
  description = "Hover to feel the magnetic pull. This card follows your cursor with a 3D tilt effect.",
  icon,
  gradient = "from-violet-500/20 to-fuchsia-500/20",
}: MagneticCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
      }}
      className="relative group cursor-pointer"
    >
      <div
        className={`relative overflow-hidden rounded-2xl border border-border bg-[var(--bg-card)] p-8 transition-shadow duration-500 group-hover:shadow-[var(--shadow-glow)]`}
      >
        {/* Gradient orb that follows cursor */}
        <motion.div
          className={`pointer-events-none absolute w-40 h-40 rounded-full bg-gradient-to-br ${gradient} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          style={{
            x: useTransform(springX, [-0.5, 0.5], [-80, 80]),
            y: useTransform(springY, [-0.5, 0.5], [-80, 80]),
          }}
        />

        <div className="relative z-10">
          {icon && (
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--accent-subtle)] text-[var(--accent)]">
              {icon}
            </div>
          )}
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {description}
          </p>
        </div>

        {/* Shimmer border */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--accent-glow), transparent)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2s linear infinite",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              padding: "1px",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
