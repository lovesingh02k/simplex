import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'

type Variant = 'primary' | 'outline-light' | 'outline-dark' | 'dark'

const base =
  'group relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden px-6 py-4 font-sans text-[0.72rem] font-semibold tracking-[0.1em] uppercase transition-[color,border-color,transform] duration-500 active:scale-[0.97]'

const variants: Record<Variant, string> = {
  primary: 'bg-forge-500 text-white',
  'outline-light': 'border border-white/35 text-white hover:border-white hover:text-ink-900',
  'outline-dark': 'border border-ink-800/30 text-ink-800 hover:border-ink-800 hover:text-white',
  dark: 'bg-ink-800 text-white',
}

const fill: Record<Variant, string> = {
  primary: 'bg-ink-900',
  'outline-light': 'bg-white',
  'outline-dark': 'bg-ink-800',
  dark: 'bg-forge-500',
}

type Props = {
  to?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: Variant
  children: ReactNode
  className?: string
  external?: boolean
  disabled?: boolean
  icon?: ReactNode
}

export function Button({ to, href, onClick, type = 'button', variant = 'primary', children, className, external, disabled, icon }: Props) {
  const content = (
    <>
      {/* sliding fill on hover */}
      <span
        aria-hidden
        className={cn(
          'absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[var(--ease-industrial)] group-hover:scale-x-100',
          fill[variant],
        )}
      />
      <span className="relative">{children}</span>
      <span aria-hidden className="relative transition-transform duration-500 group-hover:translate-x-1">
        {icon ?? <ArrowRight className="size-4" />}
      </span>
    </>
  )
  const cls = cn(base, variants[variant], disabled && 'pointer-events-none opacity-60', className)

  if (to)
    return (
      <Link to={to} className={cls}>
        {content}
      </Link>
    )
  if (href)
    return (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {content}
      </a>
    )
  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled}>
      {content}
    </button>
  )
}

export function TextLink({
  to,
  children,
  tone = 'dark',
  className,
}: {
  to: string
  children: ReactNode
  tone?: 'dark' | 'light'
  className?: string
}) {
  return (
    <Link
      to={to}
      className={cn(
        'group inline-flex items-center gap-2 font-sans text-[0.72rem] font-semibold tracking-[0.1em] uppercase',
        tone === 'dark' ? 'text-ink-800' : 'text-white',
        className,
      )}
    >
      <span className="relative pb-1">
        {children}
        <span className="absolute bottom-0 left-0 h-px w-full origin-left bg-forge-500 transition-transform duration-500 ease-[var(--ease-industrial)] group-hover:scale-x-[0.35]" />
      </span>
      <ArrowUpRight
        aria-hidden
        className="size-4 text-forge-500 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  )
}
