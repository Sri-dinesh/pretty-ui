"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxScrollCardProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  tag?: string;
}

export default function ParallaxScrollCard({
  title = "Scroll to Reveal",
  description = "This card uses scroll-linked parallax to create depth. The background shifts at a different rate than the content.",
  tag = "Featured",
}: ParallaxScrollCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className="relative overflow-hidden rounded-2xl border border-border bg-[var(--bg-card)]"
    >
      {/* Parallax background layer */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-fuchsia-500/10" />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-[var(--accent)]/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-fuchsia-500/10 blur-2xl" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 p-8">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent-subtle)] text-[var(--accent)] mb-4"
        >
          {tag}
        </motion.span>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl font-bold mb-3"
        >
          {title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm text-[var(--text-secondary)] leading-relaxed"
        >
          {description}
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 h-px bg-gradient-to-r from-[var(--accent)] via-[var(--accent)]/50 to-transparent origin-left"
        />

        {/* Fake metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-4 flex gap-6"
        >
          {[
            { label: "Views", value: "12.4K" },
            { label: "Saves", value: "1.2K" },
            { label: "Shares", value: "342" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-lg font-bold">{stat.value}</div>
              <div className="text-xs text-[var(--text-tertiary)]">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
