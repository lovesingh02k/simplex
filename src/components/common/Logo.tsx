import { company } from '../../data/company'
import { cn } from '../../utils/cn'

type Props = {
  className?: string
  /** light = white mark (for dark backgrounds); dark = navy mark (for light backgrounds) */
  tone?: 'light' | 'dark'
  withWordmark?: boolean
  markClassName?: string
}

/**
 * The original SIMPLEX mark from the brochure. On light backgrounds the same artwork is
 * used as a mask and filled with brand navy – the mark itself is never redrawn.
 */
export function Logo({ className, tone = 'light', withWordmark = true, markClassName }: Props) {
  const mark =
    tone === 'light' ? (
      <img src={company.logo.white} alt="" className="h-full w-auto" width={535} height={421} />
    ) : (
      <span
        aria-hidden
        className="block aspect-[535/421] h-full bg-ink-800"
        style={{
          maskImage: `url(${company.logo.white})`,
          WebkitMaskImage: `url(${company.logo.white})`,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
        }}
      />
    )

  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      {/* the whole mark turns slightly on hover, like a wheel – the artwork itself is unchanged */}
      <span
        className={cn(
          'block h-11 shrink-0 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-rotate-[14deg] sm:h-12',
          markClassName,
        )}
      >
        {mark}
      </span>
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              'font-display text-[1.08rem] font-extrabold tracking-[0.08em] uppercase [font-stretch:115%] transition-colors duration-500 group-hover:text-forge-400',
              tone === 'light' ? 'text-white' : 'text-ink-800',
            )}
          >
            Simplex Metals
          </span>
          <span
            className={cn(
              'mt-1 font-sans text-[0.58rem] tracking-[0.1em] uppercase',
              tone === 'light' ? 'text-steel-400' : 'text-steel-500',
            )}
          >
            Parts You Can Trust
          </span>
        </span>
      )}
    </span>
  )
}
