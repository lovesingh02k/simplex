import { Link } from 'react-router-dom'
import { Photo } from '../components/common/Photo'
import { Reveal } from '../components/common/Reveal'
import { Seo } from '../components/common/Seo'
import { FinalCta } from '../components/sections/FinalCta'
import { PageHero } from '../components/sections/PageHero'
import { industries } from '../data/industries'
import { getProduct } from '../data/products'
import { cn } from '../utils/cn'

export default function Industries() {
  return (
    <>
      <Seo
        title="Industries Served – Steel, Aluminium, Cement, Railways & Power"
        description="Simplex Metals supplies mechanical spares and equipment to steel plants, aluminium plants, cement plants, railways and power plants."
      />
      <PageHero
        eyebrow="Industries Served"
        title={['Five Sectors.', 'One Standard of Quality.']}
        intro="Our components are built for the core sector – continuous operation, heavy loads and shock, where an unplanned stop costs far more than the part."
        drawing="wheel"
        crumbs={[{ label: 'Industries' }]}
        feature={{ src: '/assets/industries/railways-locomotives.jpg', alt: 'Three generations of Indian Railways locomotives', label: 'Railways', caption: 'Bogie wheels and loco wheel sets, to IRS specification where required', position: '60% 50%' }}
      />

      <section aria-label="Industries" className="bg-steel-50 py-16 lg:py-24">
        <div className="container-x">
          {industries.map((ind, i) => {
            const flip = i % 2 === 1
            return (
              <article
                key={ind.id}
                id={ind.id}
                aria-labelledby={`${ind.id}-title`}
                className="grid scroll-mt-28 items-center gap-10 border-b border-steel-200 py-14 last:border-b-0 lg:grid-cols-12 lg:gap-16 lg:py-20"
              >
                <div className={cn('relative lg:col-span-7', flip && 'lg:order-2')}>
                  <Photo
                    src={ind.image.src}
                    alt={ind.image.alt}
                    position={ind.image.position}
                    parallax={8}
                    reveal
                    className="aspect-[16/10] w-full"
                  />
                </div>
                <Reveal className={cn('lg:col-span-5', flip && 'lg:order-1')}>
                  <p className="font-sans text-[0.7rem] tracking-[0.1em] text-forge-600 uppercase">Sector {ind.number}</p>
                  <h2 id={`${ind.id}-title`} className="display-tight mt-4 text-[clamp(2rem,4vw,3.2rem)] font-extrabold text-ink-800">
                    {ind.name}
                  </h2>
                  <p className="mt-6 text-[1.05rem] leading-relaxed text-steel-600">{ind.description}</p>
                  <p className="mt-8 font-sans text-[0.65rem] font-semibold tracking-[0.1em] text-steel-500 uppercase">Relevant products</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {ind.relatedProducts.map((slug) => {
                      const p = getProduct(slug)
                      if (!p) return null
                      return (
                        <li key={slug}>
                          <Link
                            to={`/products/${slug}`}
                            className="inline-block border border-steel-300 bg-white px-3 py-2 text-sm text-ink-800 transition-colors duration-300 hover:border-ink-800 hover:bg-ink-800 hover:text-white"
                          >
                            {p.shortName}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </Reveal>
              </article>
            )
          })}
        </div>
      </section>
      <FinalCta title={['Running a Plant?', 'Let’s Talk Spares.']} image="/assets/industries/railways.jpg" />
    </>
  )
}
