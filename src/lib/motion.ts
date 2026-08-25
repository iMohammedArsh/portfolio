import type { Variants } from 'framer-motion'
import type { MouseEvent } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

/** Ease-out-expo — the one easing curve used across every section. */
export const EASE = [0.23, 1, 0.32, 1] as const

export const DURATION = {
  fast: 0.3,
  base: 0.5,
  slow: 0.7,
} as const

/** Default reveal: fade + rise. Use for small text and list items. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE },
  },
}

/**
 * The signature reveal for headlines and major statements — content arrives
 * slightly scaled-down and soft-focus, then settles to full scale and sharp
 * focus. Reads as depth rather than a flat fade.
 */
export const revealBlur: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 28, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: DURATION.slow, ease: EASE },
  },
}

export function staggerContainer(staggerChildren = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  }
}

/** Shared `viewport` prop for every `whileInView` reveal. */
export const viewportOnce = { once: true, margin: '-80px' } as const

export const SPRING = {
  /** Cursor-following magnetic buttons. */
  snappy: { stiffness: 200, damping: 14 },
  /** 3D card tilt — heavier smoothing so it feels physical, not twitchy. */
  smooth: { stiffness: 120, damping: 16 },
  /** Custom cursor ring trail. */
  gentle: { stiffness: 200, damping: 25 },
} as const

/**
 * Kinetic headline reveal — each word clips in from below rather than the
 * whole block fading. Pair with `staggerContainer` on the parent and split
 * the headline into `<motion.span variants={kineticWord}>` per word.
 */
export const kineticWord: Variants = {
  hidden: { opacity: 0, y: '100%' },
  visible: {
    opacity: 1,
    y: '0%',
    transition: { duration: DURATION.slow, ease: EASE },
  },
}

/**
 * Magnetic hover — call the returned handlers on a wrapper element to pull
 * its content toward the cursor within a small radius, spring back on leave.
 * Kept subtle (low default strength) — a hint of physicality, not a gimmick.
 */
export function useMagnetic(strength = 0.2) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, SPRING.snappy)
  const springY = useSpring(y, SPRING.snappy)

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * strength)
    y.set((e.clientY - rect.top - rect.height / 2) * strength)
  }

  const onMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return { x: springX, y: springY, onMouseMove, onMouseLeave }
}

/**
 * 3D pointer-tilt for cards — rotates the element a few degrees toward the
 * cursor, spring-eased. No color, no glow: the depth cue is the tilt itself.
 */
export function useTilt(maxDegrees = 6) {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRotateX = useSpring(rotateX, SPRING.smooth)
  const springRotateY = useSpring(rotateY, SPRING.smooth)

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * maxDegrees * 2)
    rotateX.set(py * -maxDegrees * 2)
  }

  const onMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return { rotateX: springRotateX, rotateY: springRotateY, onMouseMove, onMouseLeave }
}
