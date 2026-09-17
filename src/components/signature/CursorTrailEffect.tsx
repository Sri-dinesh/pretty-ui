"use client";

import { useEffect, useRef, useState, ReactNode, CSSProperties } from "react";

interface TrailDot {
  id: number;
  x: number;
  y: number;
  opacity: number;
  scale: number;
}

interface CursorTrailEffectProps {
  children?: ReactNode;
  dotCount?: number;
  dotSize?: number;
  color?: string;
  delay?: number;
  className?: string;
  containerOnly?: boolean;
  style?: CSSProperties;
}

export default function CursorTrailEffect({
  children,
  dotCount = 16,
  dotSize = 10,
  color = "var(--accent)",
  delay = 40,
  className = "",
  containerOnly = true,
  style,
}: CursorTrailEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dots, setDots] = useState<TrailDot[]>([]);
  const positionsRef = useRef<{ x: number; y: number }[]>([]);
  const mouseRef = useRef({ x: -999, y: -999 });
  const counterRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (containerOnly) {
        const rect = container.getBoundingClientRect();
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      } else {
        mouseRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const target = containerOnly ? container : window;
    target.addEventListener("mousemove", handleMouseMove as EventListener);
    return () => target.removeEventListener("mousemove", handleMouseMove as EventListener);
  }, [containerOnly]);

  useEffect(() => {
    const animate = (time: number) => {
      if (time - lastUpdateRef.current >= delay) {
        lastUpdateRef.current = time;
        const { x, y } = mouseRef.current;

        if (x === -999) {
          rafRef.current = requestAnimationFrame(animate);
          return;
        }

        const id = ++counterRef.current;
        positionsRef.current.push({ x, y });
        if (positionsRef.current.length > dotCount) {
          positionsRef.current.shift();
        }

        setDots(
          positionsRef.current.map((pos, i) => {
            const progress = i / (dotCount - 1);
            return {
              id: id - (positionsRef.current.length - 1 - i),
              x: pos.x,
              y: pos.y,
              opacity: progress * 0.8,
              scale: 0.2 + progress * 0.8,
            };
          })
        );
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [dotCount, delay]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ cursor: "none", ...style }}
    >
      {children}

      {/* Trail dots */}
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute pointer-events-none rounded-full"
          style={{
            left: dot.x,
            top: dot.y,
            width: dotSize * dot.scale,
            height: dotSize * dot.scale,
            background: color,
            opacity: dot.opacity,
            transform: "translate(-50%, -50%)",
            transition: "none",
          }}
        />
      ))}

      {/* Cursor dot */}
      {dots.length > 0 && (
        <div
          className="absolute pointer-events-none rounded-full border-2 z-10"
          style={{
            left: mouseRef.current.x,
            top: mouseRef.current.y,
            width: dotSize * 1.8,
            height: dotSize * 1.8,
            borderColor: color,
            background: `${color}22`,
            transform: "translate(-50%, -50%)",
            transition: "left 0.04s linear, top 0.04s linear",
          }}
        />
      )}
    </div>
  );
}
