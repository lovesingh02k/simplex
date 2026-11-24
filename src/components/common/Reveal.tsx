import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'
import { fadeUp, viewport } from '../../animations/variants'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  variants?: Variants
}

export function Reveal({ children, className, delay = 0, variants = fadeUp }: Props) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      transition={delay ? { delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] } : undefined}
    >
      {children}
    </motion.div>
  )
}
