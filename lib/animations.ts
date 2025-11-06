/**
 * BarberShopp - Premium Animations Library 2025
 * Framer Motion animations pour un design de niveau Awwwards
 */

import { Variants, Transition } from "framer-motion"

// ============================================
// EASING CURVES (2025 Trends)
// ============================================

export const easings = {
  // Smooth & Natural
  smooth: [0.23, 1, 0.32, 1] as const,

  // Bouncy & Playful
  spring: { type: "spring" as const, stiffness: 300, damping: 30 },

  // Elegant & Professional
  elegant: [0.25, 0.46, 0.45, 0.94] as const,

  // Sharp & Quick
  sharp: [0.4, 0, 0.2, 1] as const,
}

// ============================================
// ENTRANCE ANIMATIONS
// ============================================

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const slideUp: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
}

export const slideDown: Variants = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
}

export const slideLeft: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
}

export const slideRight: Variants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
}

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
}

export const scaleUp: Variants = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
}

// ============================================
// 3D EFFECTS (2025 Trend)
// ============================================

export const lift3D: Variants = {
  initial: {
    rotateX: 0,
    rotateY: 0,
    z: 0,
  },
  hover: {
    rotateX: 5,
    rotateY: -5,
    z: 50,
    transition: { duration: 0.4, ease: easings.smooth },
  },
}

export const tilt3D: Variants = {
  initial: { rotateY: 0, rotateX: 0 },
  hover: {
    rotateY: 10,
    rotateX: 5,
    transition: { duration: 0.3, ease: easings.elegant },
  },
}

export const float3D: Variants = {
  initial: { y: 0, z: 0 },
  animate: {
    y: [-10, 10, -10],
    z: [0, 20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

// ============================================
// MICRO-INTERACTIONS
// ============================================

export const tap = {
  whileTap: { scale: 0.95 },
  transition: easings.spring,
}

export const hover = {
  whileHover: {
    scale: 1.02,
    y: -4,
    transition: { duration: 0.3, ease: easings.smooth },
  },
}

export const hoverGlow = {
  whileHover: {
    boxShadow: "0 0 30px rgba(139, 69, 19, 0.4)",
    transition: { duration: 0.3 },
  },
}

export const magnetic = {
  // Will be implemented with custom hook useMagnetic()
  whileHover: { scale: 1.05 },
  transition: { type: "spring", stiffness: 400, damping: 25 },
}

// ============================================
// STAGGER ANIMATIONS
// ============================================

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const staggerFastContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easings.smooth },
  },
}

// ============================================
// PARALLAX LAYERS
// ============================================

export const parallaxLayer = {
  background: { translateZ: -100, scale: 2 },
  midground: { translateZ: 0, scale: 1 },
  foreground: { translateZ: 100, scale: 0.8 },
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

export const scrollFadeIn: Variants = {
  initial: { opacity: 0, y: 50 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easings.smooth },
  },
}

export const scrollSlideLeft: Variants = {
  initial: { opacity: 0, x: -100 },
  whileInView: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: easings.elegant },
  },
}

export const scrollSlideRight: Variants = {
  initial: { opacity: 0, x: 100 },
  whileInView: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: easings.elegant },
  },
}

// ============================================
// LOADER ANIMATIONS
// ============================================

export const spinLoader: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    },
  },
}

export const pulseLoader: Variants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [1, 0.5, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

export const dotsLoader: Variants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

// ============================================
// GLASSMORPHISM FADE
// ============================================

export const glassFadeIn: Variants = {
  initial: {
    opacity: 0,
    backdropFilter: "blur(0px)",
  },
  animate: {
    opacity: 1,
    backdropFilter: "blur(20px)",
    transition: { duration: 0.8, ease: easings.smooth },
  },
}

// ============================================
// TRANSITION PRESETS
// ============================================

export const transitions = {
  fast: { duration: 0.2, ease: easings.sharp } as Transition,
  normal: { duration: 0.4, ease: easings.smooth } as Transition,
  slow: { duration: 0.6, ease: easings.elegant } as Transition,
  verySlow: { duration: 1, ease: easings.smooth } as Transition,
  spring: easings.spring as Transition,
}

// ============================================
// PAGE TRANSITIONS
// ============================================

export const pageTransition: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: easings.smooth },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.3, ease: easings.sharp },
  },
}

// ============================================
// HERO ANIMATIONS
// ============================================

export const heroTitle: Variants = {
  initial: { opacity: 0, y: 50, scale: 0.9 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: easings.elegant,
      delay: 0.2,
    },
  },
}

export const heroSubtitle: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easings.smooth,
      delay: 0.5,
    },
  },
}

export const heroCTA: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      delay: 0.8,
    },
  },
}

// ============================================
// CARD ANIMATIONS
// ============================================

export const cardHover: Variants = {
  initial: {
    scale: 1,
    y: 0,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  hover: {
    scale: 1.03,
    y: -8,
    boxShadow: "0 20px 40px rgba(10, 22, 40, 0.2)",
    transition: { duration: 0.3, ease: easings.smooth },
  },
}

export const card3DHover: Variants = {
  initial: {
    rotateX: 0,
    rotateY: 0,
    z: 0,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  hover: {
    rotateX: 5,
    rotateY: -5,
    z: 50,
    boxShadow: "0 25px 50px rgba(10, 22, 40, 0.25)",
    transition: { duration: 0.4, ease: easings.smooth },
  },
}

// ============================================
// SHIMMER EFFECT
// ============================================

export const shimmer: Variants = {
  animate: {
    backgroundPosition: ["200% center", "-200% center"],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "linear",
    },
  },
}

// ============================================
// EXPORT ALL
// ============================================

export const animations = {
  // Easings
  easings,

  // Entrances
  fadeIn,
  slideUp,
  slideDown,
  slideLeft,
  slideRight,
  scaleIn,
  scaleUp,

  // 3D Effects
  lift3D,
  tilt3D,
  float3D,

  // Micro-interactions
  tap,
  hover,
  hoverGlow,
  magnetic,

  // Stagger
  staggerContainer,
  staggerFastContainer,
  staggerItem,

  // Parallax
  parallaxLayer,

  // Scroll
  scrollFadeIn,
  scrollSlideLeft,
  scrollSlideRight,

  // Loaders
  spinLoader,
  pulseLoader,
  dotsLoader,

  // Glassmorphism
  glassFadeIn,

  // Transitions
  transitions,

  // Pages
  pageTransition,

  // Hero
  heroTitle,
  heroSubtitle,
  heroCTA,

  // Cards
  cardHover,
  card3DHover,

  // Effects
  shimmer,
}

export default animations
