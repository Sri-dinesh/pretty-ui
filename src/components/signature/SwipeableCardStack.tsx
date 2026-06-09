"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { X, Heart } from "lucide-react";

interface SwipeCard {
  id: string | number;
  content: ReactNode;
  label?: string;
}

interface SwipeableCardStackProps {
  cards?: SwipeCard[];
  onSwipeLeft?: (card: SwipeCard) => void;
  onSwipeRight?: (card: SwipeCard) => void;
  className?: string;
}

const defaultCards: SwipeCard[] = [
  {
    id: 1,
    label: "Card 1",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center gap-3 p-6">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
          style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}>
          🚀
        </div>
        <h3 className="text-xl font-bold">Launch Fast</h3>
        <p className="text-sm text-[var(--text-secondary)]">Ship production-ready components in minutes, not days.</p>
      </div>
    ),
  },
  {
    id: 2,
    label: "Card 2",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center gap-3 p-6">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
          style={{ background: "linear-gradient(135deg, #ec4899, #f59e0b)" }}>
          ✨
        </div>
        <h3 className="text-xl font-bold">Look Premium</h3>
        <p className="text-sm text-[var(--text-secondary)]">Every micro-interaction crafted with obsessive detail.</p>
      </div>
    ),
  },
  {
    id: 3,
    label: "Card 3",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center gap-3 p-6">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
          style={{ background: "linear-gradient(135deg, #06b6d4, #10b981)" }}>
          🎯
        </div>
        <h3 className="text-xl font-bold">Stay Focused</h3>
        <p className="text-sm text-[var(--text-secondary)]">Minimal, clean design that keeps attention where it matters.</p>
      </div>
    ),
  },
  {
    id: 4,
    label: "Card 4",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center gap-3 p-6">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
          style={{ background: "linear-gradient(135deg, #f59e0b, #ef4444)" }}>
          🎨
        </div>
        <h3 className="text-xl font-bold">Design System</h3>
        <p className="text-sm text-[var(--text-secondary)]">Cohesive CSS variables for instant theming and consistency.</p>
      </div>
    ),
  },
];

function SwipeableCard({
  card,
  index,
  total,
  onSwipe,
}: {
  card: SwipeCard;
  index: number;
  total: number;
  onSwipe: (direction: "left" | "right") => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);
  const leftOpacity = useTransform(x, [-100, -20, 0], [1, 0.5, 0]);
  const rightOpacity = useTransform(x, [0, 20, 100], [0, 0.5, 1]);

  const isTop = index === 0;
  const scale = 1 - index * 0.04;
  const yOffset = index * 8;

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 80 || Math.abs(info.velocity.x) > 400) {
      onSwipe(info.offset.x > 0 ? "right" : "left");
    }
  };

  return (
    <motion.div
      drag={isTop ? "x" : false}
      dragConstraints={{ left: -300, right: 300 }}
      onDragEnd={handleDragEnd}
      className="absolute inset-0 rounded-2xl border cursor-grab active:cursor-grabbing"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border)",
        boxShadow: isTop ? "var(--shadow-lg)" : "var(--shadow-sm)",
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        scale,
        zIndex: total - index,
        y: yOffset,
      }}
    >
      {card.content}

      {/* Swipe indicators */}
      {isTop && (
        <>
          <motion.div
            className="absolute inset-0 rounded-2xl flex items-center justify-center pointer-events-none"
            style={{ opacity: leftOpacity, background: "rgba(239,68,68,0.15)" }}
          >
            <div className="border-4 border-red-500 text-red-500 rounded-xl px-4 py-2 text-2xl font-black rotate-[-15deg]">
              PASS
            </div>
          </motion.div>
          <motion.div
            className="absolute inset-0 rounded-2xl flex items-center justify-center pointer-events-none"
            style={{ opacity: rightOpacity, background: "rgba(16,185,129,0.15)" }}
          >
            <div className="border-4 border-green-500 text-green-500 rounded-xl px-4 py-2 text-2xl font-black rotate-[15deg]">
              LIKE
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

export default function SwipeableCardStack({
  cards = defaultCards,
  onSwipeLeft,
  onSwipeRight,
  className = "",
}: SwipeableCardStackProps) {
  const [activeCards, setActiveCards] = useState(cards);
  const [swipedCards, setSwipedCards] = useState<SwipeCard[]>([]);

  const handleSwipe = (direction: "left" | "right") => {
    if (activeCards.length === 0) return;
    const top = activeCards[0];
    if (direction === "left") onSwipeLeft?.(top);
    else onSwipeRight?.(top);

    setActiveCards((prev) => prev.slice(1));
    setSwipedCards((prev) => [top, ...prev]);
  };

  const handleReset = () => {
    setActiveCards(cards);
    setSwipedCards([]);
  };

  const visible = activeCards.slice(0, 4);

  return (
    <div className={`flex flex-col items-center gap-6 ${className}`}>
      {/* Stack */}
      <div className="relative w-full" style={{ height: 260 }}>
        <AnimatePresence>
          {activeCards.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 rounded-2xl border border-dashed border-[var(--border)] flex flex-col items-center justify-center gap-3 text-[var(--text-secondary)]"
            >
              <span className="text-4xl">🎉</span>
              <p className="text-sm font-medium">All cards swiped!</p>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[var(--accent-subtle)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-colors"
              >
                Restart
              </button>
            </motion.div>
          ) : (
            visible.map((card, i) => (
              <SwipeableCard
                key={card.id}
                card={card}
                index={i}
                total={visible.length}
                onSwipe={handleSwipe}
              />
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSwipe("left")}
          disabled={activeCards.length === 0}
          className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-red-400 hover:bg-red-500/10 hover:border-red-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <X size={20} />
        </motion.button>

        <div className="text-xs text-[var(--text-tertiary)] font-medium min-w-[60px] text-center">
          {activeCards.length}/{cards.length}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSwipe("right")}
          disabled={activeCards.length === 0}
          className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-green-500 hover:bg-green-500/10 hover:border-green-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Heart size={20} />
        </motion.button>
      </div>

      <p className="text-xs text-[var(--text-tertiary)]">Drag cards or use the buttons</p>
    </div>
  );
}
