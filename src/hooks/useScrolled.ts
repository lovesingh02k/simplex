import { useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'

export function useScrolled(threshold = 40) {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > threshold))
  return scrolled
}
