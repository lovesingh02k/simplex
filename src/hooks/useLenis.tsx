import Lenis from 'lenis'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useReducedMotion } from 'motion/react'

const LenisContext = createContext<Lenis | null>(null)

/**
 * Lenis drives native window scrolling, so Motion's useScroll / whileInView observe it directly.
 * Disabled entirely when the user prefers reduced motion.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (reduce) return
    const instance = new Lenis({ duration: 1.15, smoothWheel: true, autoRaf: true })
    setLenis(instance)
    return () => {
      instance.destroy()
      setLenis(null)
    }
  }, [reduce])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

export const useLenis = () => useContext(LenisContext)

/** Scroll to an element id or to the top, via Lenis when available. */
export function useScrollTo() {
  const lenis = useLenis()
  return (target: string | number, opts: { immediate?: boolean } = {}) => {
    const offset = -80
    if (lenis) {
      lenis.scrollTo(typeof target === 'string' ? `#${target}` : target, { offset, immediate: opts.immediate })
      return
    }
    if (typeof target === 'number') {
      window.scrollTo({ top: target })
      return
    }
    const el = document.getElementById(target)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset })
  }
}
