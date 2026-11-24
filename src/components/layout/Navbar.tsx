import { AnimatePresence, motion } from 'motion/react'
import { Menu, Phone, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { company, navigation } from '../../data/company'
import { useLenis } from '../../hooks/useLenis'
import { useScrolled } from '../../hooks/useScrolled'
import { cn } from '../../utils/cn'
import { Button } from '../common/Button'
import { Logo } from '../common/Logo'

const ease = [0.22, 1, 0.36, 1] as const

export function Navbar() {
  const scrolled = useScrolled(24)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const lenis = useLenis()
  const toggleRef = useRef<HTMLButtonElement>(null)

  // close the menu on navigation
  useEffect(() => setOpen(false), [pathname])

  // lock scrolling + Escape to close while the overlay is open
  useEffect(() => {
    if (!open) return
    lenis?.stop()
    document.documentElement.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      lenis?.start()
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, lenis])

  const solid = scrolled || open

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:bg-forge-500 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.2 }}
        className={cn(
          'border-b transition-[background-color,border-color,backdrop-filter] duration-500',
          solid ? 'border-white/10 bg-ink-900/92 backdrop-blur-md' : 'border-transparent bg-transparent',
        )}
      >
        <div
          className={cn(
            'container-x flex items-center justify-between gap-6 transition-[height] duration-500',
            scrolled ? 'h-[72px]' : 'h-[88px]',
          )}
        >
          <Link to="/" aria-label="Simplex Metals – home" className="group relative z-10 shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {navigation.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'group relative block px-3 py-2 font-sans text-[0.72rem] font-semibold tracking-[0.06em] uppercase transition-colors duration-300',
                        isActive ? 'text-white' : 'text-steel-300 hover:text-white',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {!isActive && (
                          <span
                            aria-hidden
                            className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-right scale-x-0 bg-white/60 transition-transform duration-500 ease-industrial group-hover:origin-left group-hover:scale-x-100"
                          />
                        )}
                        {item.label}
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-forge-500"
                            transition={{ duration: 0.5, ease }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden sm:block"><Button to="/contact" className="!min-h-11 !px-5 !py-3">
              Get in Touch
            </Button></span>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="relative z-10 grid size-12 place-items-center border border-white/20 text-white transition-colors hover:border-white xl:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {open ? <X className="size-5" /> : <Menu className="size-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>{open && <MobileMenu />}</AnimatePresence>
    </header>
  )
}

function MobileMenu() {
  const firstLink = useRef<HTMLAnchorElement>(null)
  useEffect(() => firstLink.current?.focus(), [])

  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="fixed inset-x-0 top-0 bottom-0 -z-10 flex flex-col overflow-y-auto bg-ink-900 pt-[88px] xl:hidden"
      initial={{ opacity: 0, y: '-4%' }}
      animate={{ opacity: 1, y: '0%' }}
      exit={{ opacity: 0, y: '-4%' }}
      transition={{ duration: 0.7, ease }}
    >
      <nav aria-label="Mobile" className="container-x flex-1 py-8">
        <motion.ul
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } } }}
        >
          {navigation.map((item, i) => (
            <motion.li
              key={item.to}
              className="border-b border-white/10"
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
            >
              <NavLink
                ref={i === 0 ? firstLink : undefined}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'flex items-baseline gap-5 py-4 font-display text-[clamp(1.6rem,6vw,2.4rem)] font-bold tracking-tight [font-stretch:110%] transition-colors',
                    isActive ? 'text-forge-400' : 'text-white hover:text-forge-300',
                  )
                }
              >
                <span className="font-sans text-xs font-normal text-steel-500">{String(i + 1).padStart(2, '0')}</span>
                {item.label}
              </NavLink>
            </motion.li>
          ))}
        </motion.ul>
      </nav>
      <motion.div
        className="container-x grid gap-4 border-t border-white/10 py-8 text-sm text-steel-300 sm:grid-cols-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.6 } }}
      >
        <a href={company.contact.phoneHref} className="flex items-center gap-3 hover:text-white">
          <Phone className="size-4 text-forge-400" /> {company.contact.phone}
        </a>
        <a href={`mailto:${company.contact.email}`} className="break-all hover:text-white">
          {company.contact.email}
        </a>
        <Button to="/contact" className="sm:hidden">
          Get in Touch
        </Button>
      </motion.div>
    </motion.div>
  )
}
