import { Button } from '../components/common/Button'
import { Seo } from '../components/common/Seo'
import { SteelBackdrop } from '../components/common/SteelBackdrop'

export default function NotFound() {
  return (
    <section className="overflow-clip isolate relative grid min-h-[80svh] place-items-center bg-ink-900 px-6 pt-32 pb-20 text-center text-white">
      <SteelBackdrop drawing="gear" glow />
      <Seo title="Page Not Found" description="The page you are looking for could not be found." />
      <meta name="robots" content="noindex" />
      <div>
        <p className="font-sans text-xs tracking-[0.1em] text-forge-400 uppercase">Error 404</p>
        <h1 className="display-tight mt-6 text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold">This part isn’t in our catalogue.</h1>
        <p className="mx-auto mt-6 max-w-md text-steel-300">The page you are looking for may have moved. Let’s get you back on track.</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button to="/">Back to Home</Button>
          <Button to="/products" variant="outline-light">View Products</Button>
        </div>
      </div>
    </section>
  )
}
