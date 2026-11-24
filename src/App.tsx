import { MotionConfig } from 'motion/react'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { LenisProvider } from './hooks/useLenis'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const Products = lazy(() => import('./pages/Products'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Industries = lazy(() => import('./pages/Industries'))
const Quality = lazy(() => import('./pages/Quality'))
const Infrastructure = lazy(() => import('./pages/Infrastructure'))
const Contact = lazy(() => import('./pages/Contact'))
const Credits = lazy(() => import('./pages/Credits'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LenisProvider>
        <BrowserRouter>
          <Suspense fallback={<div className="min-h-svh bg-ink-900" />}>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="products" element={<Products />} />
                <Route path="products/:slug" element={<ProductDetail />} />
                <Route path="industries" element={<Industries />} />
                <Route path="quality" element={<Quality />} />
                <Route path="infrastructure" element={<Infrastructure />} />
                <Route path="contact" element={<Contact />} />
                <Route path="credits" element={<Credits />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </LenisProvider>
    </MotionConfig>
  )
}
