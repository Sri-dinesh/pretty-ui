"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Github, Layers, Zap, Palette, Search, User, Bell, FileText, Settings, Star, Mail, Image, File, Code, Cpu, BarChart3, Globe } from "lucide-react";
import ComponentShowcase from "@/components/ComponentShowcase";
import {
  AuroraNavbar,
  MagneticCard,
  MorphingSearch,
  LiquidToggle,
  PulseDataBadge,
  RippleButton,
  ParallaxScrollCard,
  GlowInput,
  ElasticSlider,
  OrbitMenu,
  MorphingCTAButton,
  SpotlightCard,
  HolographicProfileCard,
  InfiniteMarquee,
  StepperTimeline,
  GlassmorphismModal,
  SegmentedControl,
  SkeletonLoader,
  OTPInput,
  FloatingLabelInput,
  DragToConfirm,
  CommandPalette,
  AvatarStackedGroup,
  ToastNotificationStack,
  AccordionFAQ,
  AnimatedNumberCounter,
  BentoGridItem,
  ScrollProgressIndicator,
  FileDropZone,
  DarkModeToggle,
  // Phase 3
  PixelRevealCard,
  NeonGlowBorder,
  TypewriterText,
  PricingCard,
  CircularProgressRing,
  SwipeableCardStack,
  InteractiveRatingStars,
  GradientTextReveal,
  NotificationBell,
  CursorTrailEffect,
} from "@/components/signature";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ============== HERO SECTION ============== */}
      <section className="relative overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-1/2 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
            style={{ background: "var(--accent)" }}
          />
          <div
            className="absolute -bottom-1/2 right-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-[100px]"
            style={{ background: "#a855f7" }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-8 pb-24">
          {/* Navigation */}
          <AuroraNavbar />

          {/* Hero Content */}
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="mt-24 md:mt-32 text-center max-w-3xl mx-auto"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-[var(--bg-card)] mb-8">
              <Sparkles size={14} className="text-[var(--accent)]" />
              <span className="text-xs font-medium text-[var(--text-secondary)]">
                40 Signature Components — Phases 1, 2 &amp; 3
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]"
            >
              Components that{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, var(--accent), #a855f7, #ec4899)",
                }}
              >
                feel alive
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="mt-6 text-lg text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed"
            >
              A curated library of premium UI components designed with
              obsessive attention to detail. Every hover, every click,
              every transition — crafted to perfection.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <motion.a
                href="#gallery"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--accent)] text-white font-semibold text-sm shadow-lg hover:shadow-[var(--shadow-glow)] transition-shadow"
              >
                Explore Components
                <ArrowRight size={16} />
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-border bg-[var(--bg-card)] font-semibold text-sm hover:border-[var(--accent)] transition-colors"
              >
                <Github size={16} />
                View Source
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
            >
              {[
                { value: "40", label: "Components" },
                { value: "60fps", label: "Animations" },
                { value: "A11y", label: "Accessible" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-[var(--accent)]">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[var(--text-tertiary)] mt-1 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============== FEATURES BAR ============== */}
      <section className="border-y border-border bg-[var(--bg-secondary)]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Layers,
                title: "Modular Architecture",
                desc: "Each component is self-contained and ready to drop into any project.",
              },
              {
                icon: Zap,
                title: "60fps Motion",
                desc: "GPU-accelerated animations powered by Framer Motion for buttery smooth interactions.",
              },
              {
                icon: Palette,
                title: "Design System",
                desc: "Cohesive CSS variables ensure consistency across every component and theme.",
              },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="shrink-0 w-10 h-10 rounded-xl bg-[var(--accent-subtle)] flex items-center justify-center text-[var(--accent)]">
                  <feature.icon size={20} />
                </div>
                <div>
                  <div className="text-sm font-semibold">{feature.title}</div>
                  <div className="text-xs text-[var(--text-tertiary)] mt-1 leading-relaxed">
                    {feature.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== COMPONENT GALLERY ============== */}
      <section id="gallery" className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent-subtle)] text-[var(--accent)] mb-4">
            The Collection
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Signature Components
          </h2>
          <p className="mt-3 text-[var(--text-secondary)] max-w-lg mx-auto">
            30 meticulously crafted components. Hover, click, and scroll to
            experience the details.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1 — Aurora Navbar (full width) */}
          <ComponentShowcase
            title="Aurora Navbar"
            description="Animated navbar with aurora gradient backdrop, shared layout hover indicators, and smooth mobile menu."
            span="full"
          >
            <AuroraNavbar />
          </ComponentShowcase>

          {/* 2 — Magnetic Card */}
          <ComponentShowcase
            title="Magnetic Card"
            description="3D tilt card that follows cursor with magnetic spring physics and gradient orb lighting."
          >
            <MagneticCard
              title="Hover Me"
              description="Move your cursor around to feel the magnetic 3D tilt effect."
              icon={<Layers size={22} />}
            />
          </ComponentShowcase>

          {/* 3 — Morphing Search */}
          <ComponentShowcase
            title="Morphing Search"
            description="Compact pill that expands into a full search panel with animated suggestions."
            span="2"
          >
            <MorphingSearch />
          </ComponentShowcase>

          {/* 4 — Liquid Toggle */}
          <ComponentShowcase
            title="Liquid Toggle"
            description="Spring-physics toggle switch with liquid blob animation and ripple feedback."
          >
            <div className="flex flex-col items-center gap-6">
              <LiquidToggle label="Notifications" defaultChecked />
              <LiquidToggle label="Auto-save" />
            </div>
          </ComponentShowcase>

          {/* 5 — Pulse Data Badge */}
          <ComponentShowcase
            title="Pulse Data Badge"
            description="Real-time data display with live pulse indicator and trend visualization."
          >
            <div className="flex flex-col items-center gap-4">
              <PulseDataBadge value="2,847" label="Active Users" trend="up" />
              <PulseDataBadge value="$12.4K" label="Revenue" trend="up" />
            </div>
          </ComponentShowcase>

          {/* 6 — Ripple Button */}
          <ComponentShowcase
            title="Ripple Button"
            description="Click-position-aware ripple effect with multiple variants and sizes."
          >
            <div className="flex flex-wrap items-center justify-center gap-3">
              <RippleButton variant="primary">Primary</RippleButton>
              <RippleButton variant="secondary">Secondary</RippleButton>
              <RippleButton variant="ghost">Ghost</RippleButton>
            </div>
          </ComponentShowcase>

          {/* 7 — Parallax Scroll Card */}
          <ComponentShowcase
            title="Parallax Card"
            description="Scroll-linked parallax backgrounds with staggered reveal animations."
            span="2"
          >
            <ParallaxScrollCard
              title="Depth in Motion"
              description="Scroll the page to see layers shift independently, creating a natural sense of depth."
              tag="Parallax"
            />
          </ComponentShowcase>

          {/* 8 — Glow Input */}
          <ComponentShowcase
            title="Glow Input"
            description="Focus-activated gradient glow border with animated underline and character counter."
          >
            <GlowInput label="Email" placeholder="you@example.com" />
          </ComponentShowcase>

          {/* 9 — Elastic Slider */}
          <ComponentShowcase
            title="Elastic Slider"
            description="Spring-physics slider with elastic thumb, animated value display, and tick marks."
          >
            <ElasticSlider label="Brightness" min={0} max={100} defaultValue={65} />
          </ComponentShowcase>

          {/* 10 — Orbit Menu */}
          <ComponentShowcase
            title="Orbit Menu"
            description="Radial menu that explodes from center with orbit ring, spring physics, and tooltips."
          >
            <OrbitMenu />
          </ComponentShowcase>
        </div>
      </section>

      {/* ============== PHASE 2 COMPONENT GALLERY ============== */}
      <section id="phase2" className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent-subtle)] text-[var(--accent)] mb-4">
            Phase 2 — Advanced Collection
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            20 New Signature Components
          </h2>
          <p className="mt-3 text-[var(--text-secondary)] max-w-lg mx-auto">
            Mind-blowing interactions, production-grade inputs, and rich UI
            patterns — built to impress.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1 — Morphing CTA Button */}
          <ComponentShowcase
            title="Morphing CTA Button"
            description="Magnetic pull with shape morphing. Glow, outline, and solid variants."
          >
            <div className="flex flex-wrap items-center justify-center gap-4">
              <MorphingCTAButton variant="glow">Get Started</MorphingCTAButton>
              <MorphingCTAButton variant="outline">Learn More</MorphingCTAButton>
              <MorphingCTAButton variant="solid" size="lg">Subscribe</MorphingCTAButton>
            </div>
          </ComponentShowcase>

          {/* 2 — Spotlight Card */}
          <ComponentShowcase
            title="Spotlight Card"
            description="Mouse-following radial gradient spotlight with frosted blur."
            span="2"
          >
            <div className="flex gap-4 flex-wrap justify-center">
              <SpotlightCard className="max-w-xs">
                <h3 className="text-lg font-semibold mb-2">Hover here</h3>
                <p className="text-sm text-[var(--text-secondary)]">Move your cursor to see the spotlight track your movement.</p>
              </SpotlightCard>
              <SpotlightCard spotlightColor="rgba(168,85,247,0.15)" className="max-w-xs">
                <h3 className="text-lg font-semibold mb-2">Purple Glow</h3>
                <p className="text-sm text-[var(--text-secondary)]">Customizable spotlight color and radius.</p>
              </SpotlightCard>
            </div>
          </ComponentShowcase>

          {/* 3 — Holographic Profile Card */}
          <ComponentShowcase
            title="Holographic Profile Card"
            description="3D tilt with holographic rainbow border and configurable angle."
          >
            <HolographicProfileCard
              name="Alex Rivera"
              role="Design Engineer"
              bio="Building the future of UI, one component at a time."
              enableHologram
            />
          </ComponentShowcase>

          {/* 4 — Infinite Marquee */}
          <ComponentShowcase
            title="Infinite Marquee"
            description="Seamless horizontal scroller, pauses on hover. Adjustable speed and direction."
            span="full"
          >
            <InfiniteMarquee
              speed="normal"
              pauseOnHover
              items={[
                { label: "React" },
                { label: "Next.js" },
                { label: "Tailwind" },
                { label: "Framer Motion" },
                { label: "TypeScript" },
                { label: "Vercel" },
                { label: "Figma" },
                { label: "Prisma" },
              ]}
            />
          </ComponentShowcase>

          {/* 5 — Stepper Timeline */}
          <ComponentShowcase
            title="Stepper Timeline"
            description="Vertical step indicator with active/completed/pending states."
            span="2"
          >
            <StepperTimeline
              currentStep={2}
              steps={[
                { title: "Account Setup", description: "Create your account" },
                { title: "Profile Info", description: "Add personal details" },
                { title: "Preferences", description: "Customize experience" },
                { title: "Complete", description: "All done!" },
              ]}
            />
          </ComponentShowcase>

          {/* 6 — Glassmorphism Modal */}
          <ComponentShowcase
            title="Glassmorphism Modal"
            description="Frosted glass backdrop with spring-animated modal dialog."
          >
            <GlassmorphismModal
              title="Confirm Action"
            >
              <p className="text-sm text-[var(--text-secondary)]">This is a premium glassmorphism modal with backdrop blur.</p>
            </GlassmorphismModal>
          </ComponentShowcase>

          {/* 7 — Segmented Control */}
          <ComponentShowcase
            title="Segmented Control"
            description="Pill-shaped tab switcher with smooth sliding indicator."
          >
            <SegmentedControl
              options={["Overview", "Analytics", "Reports", "Settings"]}
            />
          </ComponentShowcase>

          {/* 8 — Skeleton Loader */}
          <ComponentShowcase
            title="Skeleton Loader"
            description="Placeholder loading states with pulse and wave animations."
          >
            <div className="flex flex-col gap-4">
              <SkeletonLoader variant="card" />
            </div>
          </ComponentShowcase>

          {/* 9 — OTP Input */}
          <ComponentShowcase
            title="OTP Input"
            description="Auto-focusing verification code boxes with glow ring."
          >
            <OTPInput length={6} inputType="number" />
          </ComponentShowcase>

          {/* 10 — Floating Label Input */}
          <ComponentShowcase
            title="Floating Label Input"
            description="Floating label with glow border and error states."
          >
            <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
              <FloatingLabelInput labelText="Full Name" />
              <FloatingLabelInput labelText="Email Address" helperText="We&apos;ll never share your email." />
            </div>
          </ComponentShowcase>

          {/* 11 — Drag to Confirm */}
          <ComponentShowcase
            title="Drag to Confirm"
            description="Swipe-to-confirm slider for destructive or critical actions."
          >
            <DragToConfirm confirmText="Slide to Delete" />
          </ComponentShowcase>

          {/* 12 — Command Palette */}
          <ComponentShowcase
            title="Command Palette"
            description="CMD+K search with fuzzy filtering and keyboard navigation."
            span="full"
          >
            <CommandPalette
              placeholder="Type a command or search..."
              data={[
                { id: "1", label: "Go to Dashboard", category: "Navigation" },
                { id: "2", label: "Create New Project", category: "Actions" },
                { id: "3", label: "Search Users", category: "Navigation" },
                { id: "4", label: "Open Settings", category: "Navigation" },
                { id: "5", label: "Deploy to Production", category: "Actions" },
                { id: "6", label: "View Analytics", category: "Navigation" },
              ]}
            />
          </ComponentShowcase>

          {/* 13 — Avatar Stacked Group */}
          <ComponentShowcase
            title="Avatar Stacked Group"
            description="Overlapping avatar group with hover pop and overflow count."
          >
            <AvatarStackedGroup
              maxVisible={4}
              users={[
                { name: "Alice", imageUrl: "" },
                { name: "Bob", imageUrl: "" },
                { name: "Carol", imageUrl: "" },
                { name: "Dave", imageUrl: "" },
                { name: "Eve", imageUrl: "" },
                { name: "Frank", imageUrl: "" },
              ]}
            />
          </ComponentShowcase>

          {/* 14 — Toast Notification Stack */}
          <ComponentShowcase
            title="Toast Notifications"
            description="Stackable notification system with auto-dismiss and positions."
          >
            <ToastNotificationStack position="top-right" />
          </ComponentShowcase>

          {/* 15 — Accordion FAQ */}
          <ComponentShowcase
            title="Accordion FAQ"
            description="Collapsible FAQ with single/multi-open modes and smooth height animation."
            span="full"
          >
            <AccordionFAQ
              items={[
                { title: "What is Pretty UI?", content: "Pretty UI is a premium component library built with Next.js, Tailwind CSS, and Framer Motion — designed for Awwwards-worthy interfaces." },
                { title: "Can I use these in production?", content: "Absolutely. Every component is built with TypeScript, accessibility, and performance in mind." },
                { title: "How do I customize the theme?", content: "All styling is driven by CSS custom properties. Change the variables in globals.css and every component updates instantly." },
                { title: "Is dark mode supported?", content: "Yes! Every component supports both light and dark mode via the built-in ThemeProvider." },
              ]}
            />
          </ComponentShowcase>

          {/* 16 — Animated Number Counter */}
          <ComponentShowcase
            title="Animated Number Counter"
            description="Scroll-triggered counting animation with prefix/suffix support."
          >
            <div className="flex flex-wrap justify-center gap-8">
              <AnimatedNumberCounter targetNumber={2847} suffix="+" label="Users" />
              <AnimatedNumberCounter targetNumber={99.9} prefix="" suffix="%" label="Uptime" />
              <AnimatedNumberCounter targetNumber={12} prefix="$" suffix="K" label="Revenue" />
            </div>
          </ComponentShowcase>

          {/* 17 — Bento Grid Item */}
          <ComponentShowcase
            title="Bento Grid Item"
            description="Bento layout item with dot pattern backgrounds and gradient highlights."
            span="2"
          >
            <div className="grid grid-cols-2 gap-3">
              <BentoGridItem span="1" hasPattern>
                <div className="text-center">
                  <Zap size={24} className="text-[var(--accent)] mx-auto mb-2" />
                  <p className="text-sm font-semibold">Fast</p>
                </div>
              </BentoGridItem>
              <BentoGridItem span="1" hasPattern={false}>
                <div className="text-center">
                  <Palette size={24} className="text-[var(--accent)] mx-auto mb-2" />
                  <p className="text-sm font-semibold">Beautiful</p>
                </div>
              </BentoGridItem>
            </div>
          </ComponentShowcase>

          {/* 18 — Scroll Progress Indicator */}
          <ComponentShowcase
            title="Scroll Progress Indicator"
            description="Fixed scroll progress bar — see it at the top of the page as you scroll!"
          >
            <div className="text-center text-sm text-[var(--text-secondary)]">
              <p>Scroll the page to see the progress bar at the top.</p>
              <ScrollProgressIndicator color="var(--accent)" height={3} />
            </div>
          </ComponentShowcase>

          {/* 19 — File Drop Zone */}
          <ComponentShowcase
            title="File Drop Zone"
            description="Drag-and-drop file upload zone with validation and preview."
            span="2"
          >
            <FileDropZone
              accept="image/png,image/jpeg,application/pdf"
              multiple
              maxSize={5 * 1024 * 1024}
            />
          </ComponentShowcase>

          {/* 20 — Dark Mode Toggle */}
          <ComponentShowcase
            title="Dark Mode Toggle"
            description="Sun/Moon icon toggle with rotate and flip transitions."
          >
            <div className="flex items-center justify-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <DarkModeToggle size={48} transitionType="rotate" iconStyle="minimal" />
                <span className="text-xs text-[var(--text-tertiary)]">Rotate</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <DarkModeToggle size={48} transitionType="flip" iconStyle="filled" />
                <span className="text-xs text-[var(--text-tertiary)]">Flip</span>
              </div>
            </div>
          </ComponentShowcase>
        </div>
      </section>

      {/* ============== PHASE 3 COMPONENT GALLERY ============== */}
      <section id="phase3" className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent-subtle)] text-[var(--accent)] mb-4">
            Phase 3 — Next-Level Collection
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            10 New Signature Components
          </h2>
          <p className="mt-3 text-[var(--text-secondary)] max-w-lg mx-auto">
            Pixel reveals, neon borders, typewriters, swipeable stacks — the most
            expressive components yet.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* 1 — Typewriter Text */}
          <ComponentShowcase
            title="Typewriter Text"
            description="Multi-string typewriter with realistic typing rhythm, delete animation, and cursor blink."
            span="2"
          >
            <div className="flex flex-col gap-2 py-4">
              <TypewriterText
                className="text-2xl md:text-3xl"
                prefix="We build "
                strings={["beautiful interfaces.", "stunning animations.", "premium components.", "pixel-perfect UI."]}
              />
              <TypewriterText
                className="text-lg"
                prefix="Powered by "
                strings={["Framer Motion.", "React & TypeScript.", "CSS Variables.", "obsessive detail."]}
                typingSpeed={80}
              />
            </div>
          </ComponentShowcase>

          {/* 2 — Interactive Rating Stars */}
          <ComponentShowcase
            title="Interactive Rating Stars"
            description="Animated star rating with emoji sentiment morphing and particle burst on click."
          >
            <InteractiveRatingStars defaultValue={0} />
          </ComponentShowcase>

          {/* 3 — Pixel Reveal Card */}
          <ComponentShowcase
            title="Pixel Reveal Card"
            description="Mosaic pixel-grid dissolves to reveal content on hover using canvas animation."
            span="2"
          >
            <div className="grid grid-cols-2 gap-4">
              <PixelRevealCard
                title="Hover Me"
                description="Watch the pixel mosaic dissolve to reveal the content beneath."
                gradient="linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%)"
              />
              <PixelRevealCard
                title="Neon Reveal"
                description="Each pixel fades in a randomized sequence for a unique feel."
                gradient="linear-gradient(135deg, #06b6d4 0%, #10b981 100%)"
              />
            </div>
          </ComponentShowcase>

          {/* 4 — Circular Progress Ring */}
          <ComponentShowcase
            title="Circular Progress Ring"
            description="SVG gradient stroke progress ring with spring animation triggered on scroll."
          >
            <div className="flex flex-wrap items-center justify-center gap-8">
              <CircularProgressRing value={87} size={120} label="CPU" sublabel="Usage" gradientColors={["#7c3aed", "#ec4899"]} />
              <CircularProgressRing value={63} size={120} label="RAM" sublabel="Memory" gradientColors={["#06b6d4", "#10b981"]} />
              <CircularProgressRing value={42} size={120} label="DSK" sublabel="Storage" gradientColors={["#f59e0b", "#ef4444"]} />
            </div>
          </ComponentShowcase>

          {/* 5 — Neon Glow Border */}
          <ComponentShowcase
            title="Neon Glow Border"
            description="Sweeping conic-gradient neon border cycling through rainbow colors continuously."
            span="2"
          >
            <div className="flex flex-wrap items-center justify-center gap-6">
              <NeonGlowBorder borderRadius="20px" speed={4}>
                <div className="flex flex-col gap-1 min-w-[160px]">
                  <div className="flex items-center gap-2">
                    <Zap size={16} className="text-[var(--accent)]" />
                    <span className="text-sm font-semibold">Lightning Fast</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)]">60fps animations everywhere.</p>
                </div>
              </NeonGlowBorder>
              <NeonGlowBorder borderRadius="20px" colors={["#06b6d4","#10b981","#a855f7","#06b6d4"]} speed={6}>
                <div className="flex flex-col gap-1 min-w-[160px]">
                  <div className="flex items-center gap-2">
                    <Globe size={16} className="text-[var(--accent)]" />
                    <span className="text-sm font-semibold">Any Content</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)]">Wrap any element with neon.</p>
                </div>
              </NeonGlowBorder>
            </div>
          </ComponentShowcase>

          {/* 6 — Swipeable Card Stack */}
          <ComponentShowcase
            title="Swipeable Card Stack"
            description="Tinder-style draggable card stack with spring physics, like/pass overlays, and button controls."
            span="2"
          >
            <SwipeableCardStack />
          </ComponentShowcase>

          {/* 7 — Notification Bell */}
          <ComponentShowcase
            title="Notification Bell"
            description="Animated bell with jiggle physics, badge counter, and staggered dropdown notification panel."
          >
            <div className="flex flex-col items-center gap-6">
              <NotificationBell />
              <p className="text-xs text-[var(--text-tertiary)] text-center">Click the bell to open the panel</p>
            </div>
          </ComponentShowcase>

          {/* 8 — Gradient Text Reveal */}
          <ComponentShowcase
            title="Gradient Text Reveal"
            description="Scroll-triggered clip-path text reveal with cinematic gradient sweep and word stagger mode."
            span="full"
          >
            <div className="flex flex-col gap-6 py-4 text-center">
              <GradientTextReveal
                as="h3"
                className="text-3xl md:text-4xl font-bold"
                delay={0.1}
              >
                Crafted with obsessive attention to detail.
              </GradientTextReveal>
              <GradientTextReveal
                as="h3"
                className="text-2xl md:text-3xl font-bold"
                gradient="linear-gradient(90deg, #06b6d4 0%, #10b981 40%, #a855f7 100%)"
                delay={0.3}
                stagger
              >
                Every pixel. Every transition. Every interaction.
              </GradientTextReveal>
            </div>
          </ComponentShowcase>

          {/* 9 — Cursor Trail Effect */}
          <ComponentShowcase
            title="Cursor Trail Effect"
            description="Particle trail that follows the cursor inside the container with smooth decay animation."
            span="2"
          >
            <CursorTrailEffect
              className="w-full rounded-xl h-48"
              style={{ background: "var(--bg-secondary)" }}
              dotCount={20}
              dotSize={10}
              delay={35}
            >
              <div className="flex items-center justify-center h-full">
                <p className="text-sm text-[var(--text-secondary)] pointer-events-none select-none">
                  ✨ Move your cursor in here to see the trail effect
                </p>
              </div>
            </CursorTrailEffect>
          </ComponentShowcase>

          {/* 10 — Pricing Card */}
          <ComponentShowcase
            title="Pricing Card"
            description="Full pricing table with monthly/annual billing toggle, popular badge, feature checklist, and hover lift."
            span="full"
          >
            <PricingCard />
          </ComponentShowcase>

        </div>
      </section>

      {/* ============== FOOTER ============== */}
      <footer className="border-t border-border bg-[var(--bg-secondary)]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Sparkles size={16} className="text-[var(--accent)]" />
              Pretty UI
            </div>
            <p className="text-xs text-[var(--text-tertiary)]">
              Crafted with obsessive attention to detail. Phases 1, 2 &amp; 3 — Signature
              Collection. 40 components total.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-xs text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors"
              >
                Components
              </a>
              <a
                href="#"
                className="text-xs text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors"
              >
                Docs
              </a>
              <a
                href="#"
                className="text-xs text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
