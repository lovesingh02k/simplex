import { Seo } from '../components/common/Seo'
import { Capabilities } from '../components/sections/Capabilities'
import { CompanyIntro } from '../components/sections/CompanyIntro'
import { FinalCta } from '../components/sections/FinalCta'
import { HomeHero } from '../components/sections/HomeHero'
import { IndustriesShowcase } from '../components/sections/IndustriesShowcase'
import { QualityPreview } from '../components/sections/QualityPreview'
import { SpecStrip } from '../components/sections/SpecStrip'
import { WhyChoose } from '../components/sections/WhyChoose'

export default function Home() {
  return (
    <>
      <Seo
        title="Mechanical Spares & Equipment Manufacturers, Bhilai"
        description="Simplex Metals manufactures forged and cast wheels, shafts and axles, rings, gears and pinions and rope drums for steel, aluminium, cement, railway and power plants. Parts you can trust."
      />
      <HomeHero />
      <CompanyIntro />
      <SpecStrip />
      <Capabilities />
      <IndustriesShowcase />
      <QualityPreview />
      <WhyChoose />
      <FinalCta image="/assets/site/forging-hot.jpg" />
    </>
  )
}
