import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

type Props = { value: number; decimals?: number; prefix?: string; suffix?: string; className?: string }

/** Counts up once when scrolled into view. Use only with verified, brochure-stated figures. */
export function Counter({ value, decimals = 0, prefix = '', suffix = '', className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: setDisplay })
    return () => controls.stop()
  }, [inView, reduce, value])

  const final = `${prefix}${value.toFixed(decimals)}${suffix}`
  return (
    <span ref={ref} className={className}>
      <span aria-hidden>
        {prefix}
        {display.toFixed(decimals)}
        {suffix}
      </span>
      <span className="sr-only">{final}</span>
    </span>
  )
}
