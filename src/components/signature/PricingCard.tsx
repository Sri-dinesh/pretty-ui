"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap, Star, Building2 } from "lucide-react";

interface PricingPlan {
  name: string;
  price: number;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  icon?: React.ReactNode;
  accentColor?: string;
}

interface PricingCardProps {
  plan: PricingPlan;
  className?: string;
  annual?: boolean;
}

const defaultPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: 0,
    description: "Perfect for side projects and personal use.",
    features: ["5 projects", "10GB storage", "Basic analytics", "Community support"],
    cta: "Get Started Free",
    icon: <Zap size={18} />,
    accentColor: "#10b981",
  },
  {
    name: "Pro",
    price: 29,
    period: "mo",
    description: "For growing teams who need more power.",
    features: ["Unlimited projects", "100GB storage", "Advanced analytics", "Priority support", "Custom domains", "Team collaboration"],
    cta: "Start Free Trial",
    popular: true,
    icon: <Star size={18} />,
    accentColor: "#7c3aed",
  },
  {
    name: "Enterprise",
    price: 99,
    period: "mo",
    description: "For large organizations at scale.",
    features: ["Everything in Pro", "Unlimited storage", "Dedicated support", "SSO / SAML", "SLA guarantee", "Custom contracts"],
    cta: "Contact Sales",
    icon: <Building2 size={18} />,
    accentColor: "#f59e0b",
  },
];

function PricingCardSingle({ plan, annual = false }: PricingCardProps) {
  const [hovered, setHovered] = useState(false);
  const displayPrice = annual && plan.price > 0 ? Math.round(plan.price * 0.8) : plan.price;
  const accent = plan.accentColor || "var(--accent)";

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      className="relative flex flex-col rounded-2xl border overflow-hidden"
      style={{
        borderColor: plan.popular ? accent : "var(--border)",
        background: "var(--bg-card)",
        boxShadow: plan.popular
          ? `0 0 40px rgba(124,58,237,0.15), 0 8px 30px rgba(0,0,0,0.08)`
          : "var(--shadow-md)",
      }}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div
          className="absolute top-0 left-0 right-0 py-1.5 text-center text-xs font-semibold text-white tracking-wider uppercase"
          style={{ background: accent }}
        >
          Most Popular
        </div>
      )}

      <div className={`flex flex-col flex-1 p-6 ${plan.popular ? "pt-10" : ""}`}>
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
            style={{ background: accent }}
          >
            {plan.icon}
          </div>
          <span className="font-semibold text-sm">{plan.name}</span>
        </div>

        {/* Price */}
        <div className="mb-2 flex items-end gap-1">
          {plan.price === 0 ? (
            <span className="text-4xl font-bold">Free</span>
          ) : (
            <>
              <span className="text-4xl font-bold">${displayPrice}</span>
              <span className="text-[var(--text-tertiary)] text-sm mb-1">/{plan.period}</span>
            </>
          )}
        </div>
        {annual && plan.price > 0 && (
          <span className="text-xs text-green-500 font-medium mb-4">Save 20% with annual billing</span>
        )}

        <p className="text-[var(--text-secondary)] text-sm mb-6 leading-relaxed">{plan.description}</p>

        {/* Features */}
        <ul className="flex flex-col gap-2.5 mb-8 flex-1">
          {plan.features.map((feat) => (
            <li key={feat} className="flex items-center gap-2.5 text-sm">
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                style={{ background: `${accent}22` }}
              >
                <Check size={10} style={{ color: accent }} strokeWidth={3} />
              </span>
              {feat}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 rounded-xl text-sm font-semibold transition-all"
          style={
            plan.popular
              ? { background: accent, color: "#fff", boxShadow: hovered ? `0 0 24px ${accent}66` : "none" }
              : { background: "var(--accent-subtle)", color: "var(--accent)" }
          }
        >
          {plan.cta}
        </motion.button>
      </div>
    </motion.div>
  );
}

interface PricingTableProps {
  plans?: PricingPlan[];
}

export default function PricingCard({ plans = defaultPlans }: PricingTableProps) {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="w-full">
      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <span className={`text-sm font-medium ${!annual ? "text-[var(--text-primary)]" : "text-[var(--text-tertiary)]"}`}>Monthly</span>
        <motion.button
          onClick={() => setAnnual((a) => !a)}
          className="relative w-12 h-6 rounded-full transition-colors"
          style={{ background: annual ? "var(--accent)" : "var(--border)" }}
        >
          <motion.div
            animate={{ x: annual ? 24 : 2 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute top-1 w-4 h-4 rounded-full bg-white shadow"
          />
        </motion.button>
        <span className={`text-sm font-medium ${annual ? "text-[var(--text-primary)]" : "text-[var(--text-tertiary)]"}`}>
          Annual
          <span className="ml-1.5 text-xs text-green-500 font-semibold">-20%</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <PricingCardSingle key={plan.name} plan={plan} annual={annual} />
        ))}
      </div>
    </div>
  );
}
