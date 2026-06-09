# ✨ Pretty UI

A premium collection of never-seen-before UI components. Future-minimalist design meets cutting-edge interactions.

Pretty UI is a meticulously crafted component library built on top of Next.js, Framer Motion, and Tailwind CSS. It features **31 high-performance, fully animated signature components** ready to drop into your projects.

## 🚀 Features

- **31 Signature Components**: Including Aurora Navbars, Magnetic Cards, Liquid Toggles, Glassmorphism Modals, and more.
- **60fps Motion**: GPU-accelerated micro-interactions powered by Framer Motion for buttery-smooth animations.
- **Modern Tech Stack**: Built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4.
- **Dark Mode Ready**: Fully supports both light and dark modes out-of-the-box via a custom `ThemeProvider`.
- **Modular Architecture**: Each component in `src/components/signature/` is fully self-contained.

---

## 🛠️ Getting Started

### 1. Installation

First, install the dependencies. The project relies on `framer-motion`, `lucide-react`, and `@fontsource` packages.

```bash
npm install
```

### 2. Development Server

Start the local development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3001](http://localhost:3001). 
*(Note: The server port has been explicitly configured to 3001 to avoid conflicts.)*

---

## 🧩 The Components

You can explore all the components live on the landing page (`src/app/page.tsx`). The source code for each component is available in the `src/components/signature/` directory.

### Phase 1: Foundation
- Aurora Navbar
- Magnetic Card
- Morphing Search
- Liquid Toggle
- Pulse Data Badge
- Ripple Button
- Parallax Scroll Card
- Glow Input
- Elastic Slider
- Orbit Menu

### Phase 2: Advanced
- Morphing CTA Button
- Spotlight Card
- Holographic Profile Card
- Infinite Marquee
- Stepper Timeline
- Glassmorphism Modal
- Segmented Control
- Skeleton Loader
- OTP Input
- Floating Label Input
- Drag To Confirm
- Command Palette
- Avatar Stacked Group
- Toast Notification Stack
- Accordion FAQ
- Animated Number Counter
- Bento Grid Item
- Scroll Progress Indicator
- File Drop Zone
- Dark Mode Toggle

---

## 🎨 Customization

All styling is driven by CSS custom properties. You can globally customize the theme by tweaking the variables in `src/app/globals.css`. Every component will automatically inherit these updates to maintain a cohesive design system!

## 🤝 Tech Stack
- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: Inter & Space Grotesk (via Fontsource)
