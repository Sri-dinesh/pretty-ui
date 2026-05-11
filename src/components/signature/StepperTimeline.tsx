"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface StepItem {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

interface StepperTimelineProps {
  className?: string;
  variant?: "default" | "minimal" | "numbered";
  size?: "sm" | "md" | "lg";
  currentStep?: number;
  orientation?: "vertical" | "horizontal";
  steps?: StepItem[];
  iconSet?: React.ReactNode[];
  isLoading?: boolean;
  disabled?: boolean;
}

const defaultSteps: StepItem[] = [
  { title: "Account Setup", description: "Create your profile" },
  { title: "Preferences", description: "Customize settings" },
  { title: "Integration", description: "Connect your tools" },
  { title: "Complete", description: "Ready to launch" },
];

export default function StepperTimeline({
  className = "",
  size = "md",
  currentStep = 1,
  orientation = "vertical",
  steps = defaultSteps,
  iconSet,
  isLoading = false,
  disabled = false,
}: StepperTimelineProps) {
  const sizeStyles = {
    sm: { dot: "w-8 h-8 text-xs", text: "text-xs", desc: "text-[10px]" },
    md: { dot: "w-10 h-10 text-sm", text: "text-sm", desc: "text-xs" },
    lg: { dot: "w-12 h-12 text-base", text: "text-base", desc: "text-sm" },
  };

  const s = sizeStyles[size];

  if (orientation === "horizontal") {
    return (
      <div className={`w-full ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`}>
        <div className="flex items-start justify-between relative">
          {/* Connector line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-[var(--border)]" style={{ left: "5%", right: "5%" }}>
            <motion.div
              className="h-full bg-[var(--accent)]"
              initial={{ width: "0%" }}
              animate={{ width: `${Math.max(0, ((currentStep - 1) / (steps.length - 1)) * 100)}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {steps.map((step, i) => {
            const status = i < currentStep ? "completed" : i === currentStep ? "current" : "upcoming";
            return (
              <motion.div
                key={i}
                className="flex flex-col items-center text-center relative z-10 flex-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div
                  animate={{
                    scale: status === "current" ? 1.1 : 1,
                    boxShadow: status === "current" ? "0 0 16px var(--accent-glow)" : "0 0 0 transparent",
                  }}
                  className={`${s.dot} rounded-full flex items-center justify-center font-semibold border-2 transition-colors duration-300 ${
                    status === "completed"
                      ? "bg-[var(--accent)] border-[var(--accent)] text-white"
                      : status === "current"
                      ? "bg-[var(--bg-card)] border-[var(--accent)] text-[var(--accent)]"
                      : "bg-[var(--bg-secondary)] border-border text-[var(--text-tertiary)]"
                  }`}
                >
                  {status === "completed" ? (
                    <Check size={16} />
                  ) : iconSet?.[i] ? (
                    iconSet[i]
                  ) : (
                    i + 1
                  )}
                </motion.div>
                <div className={`mt-3 ${s.text} font-medium ${status === "upcoming" ? "text-[var(--text-tertiary)]" : ""}`}>
                  {step.title}
                </div>
                {step.description && (
                  <div className={`mt-0.5 ${s.desc} text-[var(--text-tertiary)]`}>
                    {step.description}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // Vertical
  return (
    <div className={`${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`}>
      {steps.map((step, i) => {
        const status = i < currentStep ? "completed" : i === currentStep ? "current" : "upcoming";
        const isLast = i === steps.length - 1;

        return (
          <motion.div
            key={i}
            className="flex gap-4"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            {/* Timeline column */}
            <div className="flex flex-col items-center">
              <motion.div
                animate={{
                  scale: status === "current" ? 1.1 : 1,
                  boxShadow: status === "current" ? "0 0 16px var(--accent-glow)" : "0 0 0 transparent",
                }}
                className={`${s.dot} rounded-full flex items-center justify-center font-semibold border-2 shrink-0 transition-colors duration-300 ${
                  status === "completed"
                    ? "bg-[var(--accent)] border-[var(--accent)] text-white"
                    : status === "current"
                    ? "bg-[var(--bg-card)] border-[var(--accent)] text-[var(--accent)]"
                    : "bg-[var(--bg-secondary)] border-border text-[var(--text-tertiary)]"
                }`}
              >
                {status === "completed" ? (
                  <Check size={16} />
                ) : iconSet?.[i] ? (
                  iconSet[i]
                ) : (
                  i + 1
                )}
              </motion.div>
              {!isLast && (
                <div className="relative w-0.5 flex-1 min-h-[40px] bg-[var(--border)] my-1">
                  <motion.div
                    className="absolute top-0 left-0 w-full bg-[var(--accent)]"
                    initial={{ height: "0%" }}
                    animate={{ height: status === "completed" ? "100%" : "0%" }}
                    transition={{ duration: 0.4, delay: i * 0.15 }}
                  />
                </div>
              )}
            </div>

            {/* Content */}
            <div className={`pb-8 ${isLast ? "pb-0" : ""}`}>
              <div className={`${s.text} font-semibold ${status === "upcoming" ? "text-[var(--text-tertiary)]" : ""}`}>
                {step.title}
              </div>
              {step.description && (
                <div className={`mt-1 ${s.desc} text-[var(--text-tertiary)] leading-relaxed`}>
                  {step.description}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
