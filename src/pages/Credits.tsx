import { Seo } from '../components/common/Seo'
import { PageHero } from '../components/sections/PageHero'
import credits from '../data/credits.json'

/** Attribution for the freely licensed industry photographs (required by CC BY / BY-SA). */
export default function Credits() {
  return (
    <>
      <Seo title="Photo Credits" description="Credits and licences for industry photographs used on the Simplex Metals website." />
      <PageHero
        eyebrow="Photo Credits"
        title={['Photo Credits']}
        intro="The photographs on this website are representative images used under their open licences. They illustrate the industries, products and processes described, and do not show Simplex Metals' own works, products or customers."
        drawing="gear"
        crumbs={[{ label: 'Photo Credits' }]}
      />
      <section className="bg-steel-50 py-20">
        <ul className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {credits.map((c) => (
            <li key={c.image} className="card-lift overflow-hidden border border-steel-200 bg-white">
              <img src={c.image} alt={c.title} loading="lazy" className="aspect-[16/10] w-full object-cover" />
              <div className="p-5 text-sm">
                <p className="font-semibold text-ink-800">{c.title}</p>
                <p className="mt-1 text-steel-600">By {c.author}</p>
                <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                  {c.licenseUrl ? (
                    <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer" className="text-forge-600 underline-offset-2 hover:underline">
                      {c.license}
                    </a>
                  ) : (
                    <span>{c.license}</span>
                  )}
                  <a href={c.source} target="_blank" rel="noopener noreferrer" className="text-forge-600 underline-offset-2 hover:underline">
                    Source (Wikimedia Commons)
                  </a>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
