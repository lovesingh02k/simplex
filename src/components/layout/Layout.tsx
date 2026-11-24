import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { useScrollTo } from '../../hooks/useLenis'
import { Footer } from './Footer'
import { Loader } from './Loader'
import { Navbar } from './Navbar'

const ease = [0.22, 1, 0.36, 1] as const

export function Layout() {
  const location = useLocation()
  const outlet = useOutlet()

  return (
    <>
      <Loader />
      <Navbar />
      <ScrollManager />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="main"
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5, ease } }}
          exit={{ opacity: 0, transition: { duration: 0.3, ease } }}
        >
          {outlet}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  )
}

/** Resets scroll on route change and honours #hash targets once the new page has rendered. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  const scrollTo = useScrollTo()

  useEffect(() => {
    const timers: number[] = []
    // wait for the outgoing page transition (300ms) before touching scroll
    timers.push(
      window.setTimeout(() => {
        if (!hash) {
          scrollTo(0, { immediate: true })
          return
        }
        // lazy-loaded pages may not have rendered the target yet – retry for up to ~3s,
        // then settle once more after images/reveals have shifted the layout
        const id = decodeURIComponent(hash.slice(1))
        let tries = 0
        const attempt = () => {
          if (document.getElementById(id)) {
            scrollTo(id)
            timers.push(window.setTimeout(() => scrollTo(id), 700))
          } else if (tries++ < 30) {
            timers.push(window.setTimeout(attempt, 100))
          }
        }
        attempt()
      }, 320),
    )
    return () => timers.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, hash])

  return null
}
