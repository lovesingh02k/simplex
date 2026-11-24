import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

/** Small section label: an orange square marker followed by a quiet uppercase label. */
export function Eyebrow({ children, tone = 'dark', className }: { children: ReactNode; tone?: 'dark' | 'light'; className?: string }) {
  return (
    <p
      className={cn(
        'flex items-center gap-2.5 text-[0.72rem] font-semibold tracking-[0.1em] uppercase',
        tone === 'dark' ? 'text-steel-600' : 'text-steel-300',
        className,
      )}
    >
      <span aria-hidden className="size-1.5 shrink-0 bg-forge-500" />
      {children}
    </p>
  )
}
