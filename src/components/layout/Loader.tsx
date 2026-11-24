import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { company } from '../../data/company'

const ease = [0.22, 1, 0.36, 1] as const

/** Short branded intro on first visit. Skipped for reduced-motion users and repeat visits in a session. */
export function Loader() {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(() => !reduce && !sessionStorage.getItem('sm-intro'))

  useEffect(() => {
    if (!visible) return
    sessionStorage.setItem('sm-intro', '1')
    const t = setTimeout(() => setVisible(false), 1500)
    return () => clearTimeout(t)
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[100] grid place-items-center bg-ink-900"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease }}
        >
          <div className="flex flex-col items-center gap-6">
            <motion.img
              src={company.logo.white}
              alt=""
              className="h-24 w-auto"
              initial={{ opacity: 0, scale: 0.6, rotate: -200 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.15, ease }}
            />
            <div className="h-px w-40 overflow-hidden bg-white/10">
              <motion.div
                className="h-full origin-left bg-forge-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, ease }}
              />
            </div>
            <motion.p
              className="font-sans text-[0.65rem] font-semibold tracking-[0.1em] text-steel-400 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Parts You Can Trust
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
