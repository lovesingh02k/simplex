import { Check } from 'lucide-react'
import type { Product } from '../../data/products'
import { cn } from '../../utils/cn'

/** Applications, specification table and capability tags for a product. */
export function ProductSpecs({ product, compact }: { product: Product; compact?: boolean }) {
  return (
    <div className={cn('grid gap-10', !compact && 'lg:grid-cols-2')}>
      <div>
        <h3 className="font-sans text-[0.68rem] font-semibold tracking-[0.1em] text-steel-500 uppercase">{product.applications.title}</h3>
        <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {product.applications.items.map((a) => (
            <li key={a} className="flex items-start gap-3 text-[0.95rem] text-ink-800 transition-transform duration-300 hover:translate-x-1">
              <Check className="mt-0.5 size-4 shrink-0 text-forge-500" strokeWidth={2.5} />
              {a}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-sans text-[0.68rem] font-semibold tracking-[0.1em] text-steel-500 uppercase">Available specifications</h3>
        <dl className="mt-4 border-t border-steel-200">
          {product.specifications.map((s) => (
            <div key={s.label} className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] gap-4 border-b border-steel-200 py-3 text-sm">
              <dt className="text-steel-500">{s.label}</dt>
              <dd className="font-medium text-ink-800">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={cn(!compact && 'lg:col-span-2')}>
        <h3 className="font-sans text-[0.68rem] font-semibold tracking-[0.1em] text-steel-500 uppercase">Related manufacturing capabilities</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {product.capabilities.map((c) => (
            <li key={c} className="chip-hover cursor-default border border-steel-300 bg-white px-3 py-1.5 font-sans text-[0.7rem] tracking-wide text-ink-700">
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
