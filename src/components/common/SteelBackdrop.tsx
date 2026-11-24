import { cn } from '../../utils/cn'
import { TechDrawing } from './TechDrawing'

type Props = {
  tone?: 'dark' | 'light'
  drawing?: 'wheel' | 'gear' | 'shaft'
  /** Where the drawing sits: right edge (default) or left edge. */
  drawingSide?: 'left' | 'right'
  /** Warm forge glow in one corner (dark tone only). */
  glow?: boolean
  className?: string
}

/**
 * Section background: brushed-steel texture, an optional engineering drawing of a Simplex
 * component bleeding off one edge, and an optional warm glow. Place inside a `relative isolate` parent.
 */
export function SteelBackdrop({ tone = 'dark', drawing, drawingSide = 'right', glow, className }: Props) {
  const dark = tone === 'dark'
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(/assets/textures/brushed-steel-${dark ? 'dark' : 'light'}.jpg)` }}
      />
      {dark && glow && (
        <div
          className={cn(
            'absolute size-[60vw] max-w-[900px] rounded-full opacity-60 blur-3xl',
            drawingSide === 'right' ? '-top-1/3 -right-1/4' : '-bottom-1/3 -left-1/4',
          )}
          style={{ background: 'radial-gradient(circle, rgba(242,106,27,0.22), transparent 65%)' }}
        />
      )}
      {drawing && (
        <TechDrawing
          variant={drawing}
          className={cn(
            'absolute top-1/2 w-[min(70vw,760px)] -translate-y-1/2',
            drawingSide === 'right' ? '-right-[12%]' : '-left-[12%]',
            dark ? 'text-white/[0.09]' : 'text-ink-800/[0.08]',
          )}
        />
      )}
    </div>
  )
}
