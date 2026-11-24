import type { Transition, Variants } from 'motion/react'

export const ease = [0.22, 1, 0.36, 1] as const

export const transition = (delay = 0, duration = 0.9): Transition => ({ duration, delay, ease })

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: transition() },
}

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: transition(0, 1.1) },
}

export const stagger = (staggerChildren = 0.09, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

/** Line-mask reveal for headline rows. */
export const lineReveal: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: transition(0, 1.05) },
}

/**
 * Image reveal: fade up with a slight settle in scale. Transform/opacity only – animated
 * clip-path can fail to repaint in some Chromium + GPU combinations, leaving an empty frame.
 */
export const imageReveal: Variants = {
  hidden: { opacity: 0, y: 28, scale: 1.08 },
  show: { opacity: 1, y: 0, scale: 1, transition: transition(0, 1.1) },
}

export const viewport = { once: true, margin: '0px 0px -12% 0px' } as const
