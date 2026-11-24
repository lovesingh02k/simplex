import { motion } from 'motion/react'
import { Link, useParams } from 'react-router-dom'
import { stagger, viewport } from '../animations/variants'
import { Button, TextLink } from '../components/common/Button'
import { Photo } from '../components/common/Photo'
import { Reveal } from '../components/common/Reveal'
import { Seo } from '../components/common/Seo'
import { ProductCard } from '../components/products/ProductCard'
import { ProductSpecs } from '../components/products/ProductSpecs'
import { FinalCta } from '../components/sections/FinalCta'
import { PageHero } from '../components/sections/PageHero'
import { industries } from '../data/industries'
import { getProduct, products } from '../data/products'
import NotFound from './NotFound'
import { SteelBackdrop } from '../components/common/SteelBackdrop'

export default function ProductDetail() {
  const { slug = '' } = useParams()
  const product = getProduct(slug)
  if (!product) return <NotFound />

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3)
  const usedIn = industries.filter((i) => i.relatedProducts.includes(product.slug))
  const feature = product.gallery[0]
    ? { ...product.gallery[0], label: product.name, caption: product.summary }
    : usedIn[0]
      ? { ...usedIn[0].image, label: 'Used in', caption: usedIn.map((i) => i.name).join(' · ') }
      : undefined

  return (
    <>
      <Seo title={product.name} description={product.description} />
      <PageHero
        eyebrow={`Product ${product.number}`}
        title={[product.name]}
        intro={product.summary}
        drawing={product.category === 'gears' ? 'gear' : product.category === 'shafts' ? 'shaft' : 'wheel'}
        crumbs={[{ label: 'Products', to: '/products' }, { label: product.shortName }]}
        feature={feature}
      />

      <section className="overflow-clip isolate relative bg-steel-50 py-20 lg:py-28">
        <SteelBackdrop tone="light" />
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="relative lg:sticky lg:top-28">
              <Photo src={product.image.src} alt={product.image.alt} position={product.image.position} reveal className="aspect-[4/3] w-full" />
              {product.gallery.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {product.gallery.map((g) => (
                    <Photo key={g.src} src={g.src} alt={g.alt} position={g.position} reveal className="aspect-[4/3]" />
                  ))}
                </div>
              )}
              {usedIn.length > 0 && (
                <div className="mt-10">
                  <p className="text-[0.72rem] font-semibold tracking-[0.1em] text-steel-500 uppercase">Used in</p>
                  <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {usedIn.map((ind) => (
                      <li key={ind.id}>
                        <Link to={`/industries#${ind.id}`} className="group relative block aspect-[4/3] overflow-hidden bg-ink-800">
                          <img
                            src={ind.image.src}
                            alt={ind.image.alt}
                            loading="lazy"
                            className="h-full w-full object-cover grayscale-[0.4] transition-[transform,filter] duration-700 ease-industrial group-hover:scale-110 group-hover:grayscale-0"
                            style={{ objectPosition: ind.image.position }}
                          />
                          <span className="absolute inset-0 bg-linear-to-t from-ink-900/85 to-transparent" />
                          <span className="absolute bottom-0 left-0 p-3 text-sm font-semibold text-white">{ind.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-6">
            <Reveal>
              <p className="font-sans text-[0.7rem] tracking-[0.1em] text-forge-600 uppercase">Technical description</p>
              <p className="mt-5 text-[1.15rem] leading-relaxed text-ink-800">{product.description}</p>
            </Reveal>
            <Reveal className="mt-12">
              <ProductSpecs product={product} compact />
            </Reveal>
            <Reveal className="mt-12 border border-steel-200 bg-white p-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink-800 [font-stretch:108%]">Have a requirement for {product.shortName.toLowerCase()}?</h2>
              <p className="mt-3 text-sm leading-relaxed text-steel-600">
                Share your drawing, material grade, quantity and any applicable standard. Our team will respond with technical feedback and a quotation.
              </p>
              <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
                <Button to={`/contact?product=${product.slug}`}>Send an Enquiry</Button>
                <TextLink to="/quality">Quality & Testing</TextLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="related-title" className="overflow-clip isolate relative bg-ink-900 py-20 lg:py-28">
        <SteelBackdrop />
        <div className="container-x">
          <h2 id="related-title" className="display-tight text-[clamp(1.8rem,3.4vw,2.6rem)] font-extrabold text-white">
            More from our <span className="text-forge-500">portfolio</span>
          </h2>
          <motion.div className="mt-12 grid gap-5 md:grid-cols-3" variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport}>
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </motion.div>
        </div>
      </section>
      <FinalCta title={['Ready to', 'Place an Enquiry?']} image="/assets/site/heavy-machine-shop.jpg" />
    </>
  )
}
