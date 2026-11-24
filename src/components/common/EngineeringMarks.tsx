import { motion } from 'motion/react'
import { cn } from '../../utils/cn'

/** Corner registration ticks – a subtle drafting detail for framed images and panels. */
export function CornerTicks({ className, tone = 'light' }: { className?: string; tone?: 'light' | 'dark' }) {
  const c = tone === 'light' ? 'border-white/60' : 'border-ink-800/40'
  return (
    <span aria-hidden className={cn('pointer-events-none absolute inset-0 z-10', className)}>
      <span className={cn('absolute top-0 left-0 size-4 border-t border-l', c)} />
      <span className={cn('absolute top-0 right-0 size-4 border-t border-r', c)} />
      <span className={cn('absolute bottom-0 left-0 size-4 border-b border-l', c)} />
      <span className={cn('absolute right-0 bottom-0 size-4 border-r border-b', c)} />
    </span>
  )
}

const draw = { duration: 1.4, ease: [0.22, 1, 0.36, 1] as const }

/** A dimension line that draws itself in when it enters the viewport. */
export function DimensionLine({ label, className, tone = 'dark' }: { label: string; className?: string; tone?: 'light' | 'dark' }) {
  return (
    <div aria-hidden className={className}>
    <div
      className={cn(
        'flex items-center gap-3 font-sans text-[0.65rem] tracking-[0.1em] uppercase',
        tone === 'dark' ? 'text-steel-500' : 'text-steel-400',
      )}
    >
      <span className="h-3 w-px bg-current" />
      <motion.span
        className="h-px flex-1 origin-left bg-current"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={draw}
      />
      <span className="shrink-0">{label}</span>
      <motion.span
        className="h-px flex-1 origin-right bg-current"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={draw}
      />
      <span className="h-3 w-px bg-current" />
    </div>
    </div>
  )
}
