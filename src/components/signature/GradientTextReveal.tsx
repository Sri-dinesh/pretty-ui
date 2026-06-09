"use client";

import { useRef, ReactNode, ElementType } from "react";
import { motion, useInView } from "framer-motion";

interface GradientTextRevealProps {
  children: ReactNode;
  className?: string;
  gradient?: string;
  delay?: number;
  duration?: number;
  as?: ElementType;
  stagger?: boolean;
}

export default function GradientTextReveal({
  children,
  className = "",
  gradient = "linear-gradient(90deg, var(--accent) 0%, #a855f7 40%, #ec4899 70%, var(--accent) 100%)",
  delay = 0,
  duration = 0.9,
  as: Tag = "h2",
  stagger = false,
}: GradientTextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  if (stagger && typeof children === "string") {
    const words = children.split(" ");
    return (
      <Tag
        ref={ref as React.RefObject<HTMLHeadingElement>}
        className={`overflow-hidden ${className}`}
        style={{ display: "block" }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden"
            style={{ marginRight: "0.3em" }}
          >
            <motion.span
              className="inline-block"
              style={{
                backgroundImage: gradient,
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              initial={{ y: "110%", opacity: 0 }}
              animate={
                isInView
                  ? { y: "0%", opacity: 1 }
                  : { y: "110%", opacity: 0 }
              }
              transition={{
                duration,
                delay: delay + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={`overflow-hidden ${className}`}
      style={{ display: "block" }}
    >
      <motion.span
        className="inline-block relative"
        style={{ display: "block" }}
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={
          isInView
            ? { clipPath: "inset(0 0% 0 0)" }
            : { clipPath: "inset(0 100% 0 0)" }
        }
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <span
          style={{
            backgroundImage: gradient,
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            display: "block",
          }}
        >
          {children}
        </span>

        {/* Sweeping highlight overlay */}
        <motion.span
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
          }}
          initial={{ backgroundPosition: "-100% 0" }}
          animate={isInView ? { backgroundPosition: "200% 0" } : {}}
          transition={{ duration: duration * 1.2, delay: delay + 0.1, ease: "linear" }}
        />
      </motion.span>
    </Tag>
  );
}
