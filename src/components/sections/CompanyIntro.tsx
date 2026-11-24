import { company } from '../../data/company'
import { TextLink } from '../common/Button'
import { DimensionLine } from '../common/EngineeringMarks'
import { Photo } from '../common/Photo'
import { Reveal } from '../common/Reveal'
import { SectionHeading } from '../common/SectionHeading'
import { SteelBackdrop } from '../common/SteelBackdrop'

export function CompanyIntro() {
  return (
    <section aria-labelledby="intro-title" className="overflow-clip isolate relative bg-steel-50 py-24 lg:py-36">
      <SteelBackdrop tone="light" />
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        {/* asymmetric image block */}
        <div className="relative lg:col-span-6">
          <Photo
            src="/assets/site/lathe-turning.jpg"
            alt="Shaft being turned on a lathe"
            parallax={8}
            reveal
            className="aspect-[4/3] w-full lg:aspect-[5/4]"
          />
          <div className="absolute -right-2 -bottom-10 hidden w-[42%] border-8 border-steel-50 sm:block lg:-right-8">
            <Photo
              src="/assets/site/gear-pinion-mesh.jpg"
              alt="Pinion meshing with a large gear"
              reveal
              className="aspect-square w-full"
            />
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <SectionHeading
            id="intro-title"
            eyebrow="About Simplex Metals"
            title={['Built on Engineering.', 'Driven by Trust.']}
            accentLast
          />
          <Reveal className="mt-8 space-y-5 text-[1.05rem] leading-relaxed text-steel-600">
            <p>
              Simplex Metals is a manufacturer of <strong className="font-semibold text-ink-800">mechanical spares and equipment</strong> for
              core sector industries. Our range covers forged and cast wheels, shafts and axles, rings, gears and pinions, and rope
              drums for EOT cranes – components that keep plants and machinery running.
            </p>
            <p>
              Forging, machining and hardening are backed by in-house material and non-destructive testing, so every component is
              built for the loads, shocks and duty cycles of steel, aluminium, cement, railway and power applications.
            </p>
          </Reveal>
          <Reveal className="mt-10 grid grid-cols-2 gap-6 border-t border-steel-200 pt-8">
            <div>
              <p className="font-sans text-[0.65rem] font-semibold tracking-[0.1em] text-steel-500 uppercase">Vision</p>
              <p className="mt-2 text-sm font-medium text-ink-800">{company.vision}</p>
            </div>
            <div>
              <p className="font-sans text-[0.65rem] font-semibold tracking-[0.1em] text-steel-500 uppercase">Mission</p>
              <p className="mt-2 text-sm font-medium text-ink-800">{company.mission[0]}</p>
            </div>
          </Reveal>
          <Reveal className="mt-10">
            <TextLink to="/about">Discover Our Company</TextLink>
          </Reveal>
          <DimensionLine label="Bhilai · Chhattisgarh · India" className="mt-14 hidden lg:block" />
        </div>
      </div>
    </section>
  )
}
