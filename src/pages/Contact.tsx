import { AnimatePresence, motion } from 'motion/react'
import { AlertCircle, CheckCircle2, Mail, MapPin, Navigation, Phone } from 'lucide-react'
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fadeUp, stagger, viewport } from '../animations/variants'
import { Button } from '../components/common/Button'
import { Eyebrow } from '../components/common/Eyebrow'
import { Seo } from '../components/common/Seo'
import { PageHero } from '../components/sections/PageHero'
import { company } from '../data/company'
import { getProduct, products } from '../data/products'
import { cn } from '../utils/cn'
import {
  emptyEnquiry,
  enquiryEndpoint,
  enquiryMailto,
  submitEnquiry,
  validateEnquiry,
  type Enquiry,
  type EnquiryErrors,
} from '../utils/enquiry'

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error'

export default function Contact() {
  const [params] = useSearchParams()
  const preselected = getProduct(params.get('product') ?? '')

  return (
    <>
      <Seo
        title="Contact & Business Enquiry"
        description="Contact Simplex Metals, Bhilai. Phone 0788-4040320, email hkssimplexmetals@gmail.com. Send a business enquiry for wheels, shafts, rings, gears, rope drums and custom components."
      />
      <PageHero
        eyebrow="Contact & Business Enquiry"
        title={['Let’s Discuss Your', 'Requirements.']}
        intro="Send us your drawing, material grade and quantity – or simply call. Our team will get back to you with technical feedback and a quotation."
        drawing="shaft"
        crumbs={[{ label: 'Contact' }]}
        feature={{ src: '/assets/site/micrometer.jpg', alt: 'Micrometer measuring a component', label: 'Send Your Drawing', caption: 'Size, grade, hardness and standard – we respond with technical feedback' }}
      />

      <section className="bg-steel-50 py-20 lg:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <ContactDetails />
          <div className="lg:col-span-7 lg:col-start-6">
            <EnquiryForm initialProduct={preselected?.name ?? ''} />
          </div>
        </div>
      </section>
    </>
  )
}

function ContactDetails() {
  return (
    <motion.aside
      className="space-y-4 lg:col-span-4"
      aria-label="Contact information"
      variants={stagger(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      <motion.div variants={fadeUp}>
        <Eyebrow>Reach Us Directly</Eyebrow>
        <h2 className="display-tight mt-5 text-[clamp(1.9rem,3vw,2.6rem)] font-extrabold text-ink-800">Simplex Metals</h2>
        <p className="mt-2 text-steel-600">{company.descriptor}</p>
      </motion.div>

      <motion.a variants={fadeUp} href={company.contact.phoneHref} className="group card-lift mt-6 flex items-center gap-5 bg-ink-900 p-6 text-white">
        <span className="grid size-12 shrink-0 place-items-center bg-forge-500 transition-transform duration-500 group-hover:scale-110">
          <Phone className="size-5" />
        </span>
        <span>
          <span className="block font-sans text-[0.65rem] font-semibold tracking-[0.1em] text-steel-400 uppercase">Call us</span>
          <span className="mt-1 block font-display text-xl font-bold [font-stretch:108%]">{company.contact.phone}</span>
        </span>
      </motion.a>

      <motion.a variants={fadeUp} href={`mailto:${company.contact.email}`} className="group card-lift flex items-center gap-5 border border-steel-200 bg-white p-6">
        <span className="grid size-12 shrink-0 place-items-center border border-steel-200 text-forge-500 transition-colors duration-500 group-hover:bg-forge-500 group-hover:text-white">
          <Mail className="size-5" />
        </span>
        <span className="min-w-0">
          <span className="block font-sans text-[0.65rem] font-semibold tracking-[0.1em] text-steel-500 uppercase">Email us</span>
          <span className="mt-1 block font-semibold break-all text-ink-800">{company.contact.email}</span>
        </span>
      </motion.a>

      {company.contact.addresses.map((a) => (
        <motion.div key={a.label} variants={fadeUp} className="card-lift border border-steel-200 bg-white p-6">
          <div className="flex items-start gap-5">
            <span className="grid size-12 shrink-0 place-items-center border border-steel-200 text-forge-500">
              <MapPin className="size-5" />
            </span>
            <address className="text-ink-800 not-italic">
              <span className="block font-sans text-[0.65rem] font-semibold tracking-[0.1em] text-steel-500 uppercase">{a.label}</span>
              {a.lines.map((l) => (
                <span key={l} className="mt-1 block">
                  {l}
                </span>
              ))}
            </address>
          </div>
          <a
            href={a.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 font-sans text-[0.68rem] tracking-[0.1em] text-forge-600 uppercase hover:text-ink-800"
          >
            <Navigation className="size-3.5" /> Open in Google Maps
          </a>
        </motion.div>
      ))}

      <motion.figure variants={fadeUp} className="group relative hidden overflow-hidden lg:block">
        <img
          src="/assets/site/heavy-machine-shop.jpg"
          alt="Heavy machine shop"
          loading="lazy"
          className="photo-grade aspect-[4/3] w-full object-cover object-[60%_50%] grayscale-[0.4] transition-[transform,filter] duration-[1.2s] ease-industrial group-hover:scale-105 group-hover:grayscale-0"
        />
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink-900/85 to-transparent" />
        <figcaption className="absolute inset-x-0 bottom-0 p-5 text-sm text-white">
          <span className="block text-[0.7rem] font-semibold tracking-[0.1em] text-forge-400 uppercase">Built to Order</span>
          Wheels, shafts, rings, gears and rope drums to your drawing
        </figcaption>
      </motion.figure>
    </motion.aside>
  )
}

function EnquiryForm({ initialProduct }: { initialProduct: string }) {
  const [values, setValues] = useState<Enquiry>({ ...emptyEnquiry, product: initialProduct })
  const [errors, setErrors] = useState<EnquiryErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [honeypot, setHoneypot] = useState('')
  const startedAt = useRef(0)
  useEffect(() => {
    startedAt.current = Date.now()
  }, [])
  const formRef = useRef<HTMLFormElement>(null)

  const update = (key: keyof Enquiry) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    // Spam guards: hidden honeypot field and a minimum fill time.
    if (honeypot || Date.now() - startedAt.current < 2500) {
      setStatus('sent')
      return
    }
    const found = validateEnquiry(values)
    setErrors(found)
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0]
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    if (!enquiryEndpoint) {
      window.location.href = enquiryMailto(values)
      setStatus('mailto')
      return
    }
    try {
      setStatus('sending')
      await submitEnquiry(values)
      setStatus('sent')
      setValues(emptyEnquiry)
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="relative border border-steel-200 bg-white p-6 shadow-[0_30px_80px_-40px_rgba(7,12,24,0.35)] sm:p-10">
      <span aria-hidden className="absolute top-0 left-0 h-1 w-24 bg-forge-500" />
      <h2 className="display-tight text-[clamp(1.8rem,3vw,2.4rem)] font-extrabold text-ink-800">Business Enquiry</h2>
      <p className="mt-3 text-sm text-steel-600">
        Fields marked <span className="text-forge-600">*</span> are required.
        {!enquiryEndpoint && ' Submitting opens your email app with the enquiry prefilled – just press send.'}
      </p>

      <AnimatePresence>
        {status !== 'idle' && status !== 'sending' && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <StatusMessage status={status} values={values} />
          </motion.div>
        )}
      </AnimatePresence>

      <form ref={formRef} onSubmit={onSubmit} noValidate className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2">
        {/* honeypot – hidden from people, tempting to bots */}
        <div aria-hidden className="pointer-events-none absolute top-0 left-0 h-px w-px overflow-hidden opacity-0 [clip-path:inset(50%)]">
          <label>
            Website
            <input tabIndex={-1} autoComplete="off" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
          </label>
        </div>

        <Field label="Full Name" name="name" required error={errors.name}>
          <input name="name" autoComplete="name" value={values.name} onChange={update('name')} className={inputCls(errors.name)} {...aria('name', errors.name)} />
        </Field>
        <Field label="Company Name" name="company" error={errors.company}>
          <input name="company" autoComplete="organization" value={values.company} onChange={update('company')} className={inputCls()} {...aria('company')} />
        </Field>
        <Field label="Email Address" name="email" required error={errors.email}>
          <input name="email" type="email" autoComplete="email" value={values.email} onChange={update('email')} className={inputCls(errors.email)} {...aria('email', errors.email)} />
        </Field>
        <Field label="Phone Number" name="phone" required error={errors.phone}>
          <input name="phone" type="tel" autoComplete="tel" inputMode="tel" value={values.phone} onChange={update('phone')} className={inputCls(errors.phone)} {...aria('phone', errors.phone)} />
        </Field>
        <Field label="Product / Component Required" name="product" required error={errors.product}>
          <select name="product" value={values.product} onChange={update('product')} className={cn(inputCls(errors.product), 'appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat')} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236f7a8e' stroke-width='1.6' fill='none'/%3E%3C/svg%3E\")" }} {...aria('product', errors.product)}>
            <option value="">Select a product…</option>
            {products.map((p) => (
              <option key={p.slug} value={p.name}>
                {p.name}
              </option>
            ))}
            <option value="Other / Not listed">Other / Not listed</option>
          </select>
        </Field>
        <Field label="Quantity" name="quantity" error={errors.quantity}>
          <input name="quantity" placeholder="e.g. 4 nos." value={values.quantity} onChange={update('quantity')} className={inputCls()} {...aria('quantity')} />
        </Field>
        <Field label="Technical Requirements" name="requirements" required error={errors.requirements} wide>
          <textarea
            name="requirements"
            rows={4}
            placeholder="Size / drawing no., material grade, hardness, applicable standard (IS, BS, DIN, IRS…)"
            value={values.requirements}
            onChange={update('requirements')}
            className={inputCls(errors.requirements)}
            {...aria('requirements', errors.requirements)}
          />
        </Field>
        <Field label="Additional Message" name="message" wide>
          <textarea name="message" rows={3} value={values.message} onChange={update('message')} className={inputCls()} {...aria('message')} />
        </Field>

        <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-steel-500">Your details are used only to respond to this enquiry.</p>
          <Button type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Submit Enquiry'}
          </Button>
        </div>
      </form>
    </div>
  )
}

function StatusMessage({ status, values }: { status: Status; values: Enquiry }) {
  if (status === 'sent')
    return (
      <Alert tone="success" icon={<CheckCircle2 className="size-5" />}>
        Thank you – your enquiry has been received. Our team will contact you shortly.
      </Alert>
    )
  if (status === 'mailto')
    return (
      <Alert tone="info" icon={<Mail className="size-5" />}>
        Your email app should now be open with the enquiry prefilled – please press <strong>send</strong> to deliver it. If nothing opened,{' '}
        <a className="underline" href={enquiryMailto(values)}>
          try again
        </a>{' '}
        or email us at <a className="underline" href={`mailto:${company.contact.email}`}>{company.contact.email}</a>.
      </Alert>
    )
  return (
    <Alert tone="error" icon={<AlertCircle className="size-5" />}>
      Sorry, your enquiry could not be sent. Please{' '}
      <a className="underline" href={enquiryMailto(values)}>
        send it by email
      </a>{' '}
      or call <a className="underline" href={company.contact.phoneHref}>{company.contact.phone}</a>.
    </Alert>
  )
}

function Alert({ tone, icon, children }: { tone: 'success' | 'info' | 'error'; icon: ReactNode; children: ReactNode }) {
  return (
    <div
      className={cn(
        'mt-6 flex gap-3 border-l-2 p-4 text-sm leading-relaxed',
        tone === 'success' && 'border-emerald-600 bg-emerald-50 text-emerald-900',
        tone === 'info' && 'border-ink-700 bg-steel-100 text-ink-800',
        tone === 'error' && 'border-red-600 bg-red-50 text-red-900',
      )}
    >
      <span className="shrink-0">{icon}</span>
      <p>{children}</p>
    </div>
  )
}

const inputCls = (error?: string) =>
  cn(
    'w-full border bg-steel-50 px-4 py-3.5 text-[0.95rem] text-ink-800 placeholder:text-steel-400 transition-colors duration-300 outline-none focus:bg-white',
    error ? 'border-red-500 focus:border-red-600' : 'border-steel-200 focus:border-ink-800',
  )

const aria = (name: string, error?: string) => ({
  id: name,
  'aria-invalid': error ? true : undefined,
  'aria-describedby': error ? `${name}-error` : undefined,
})

function Field({ label, name, required, error, wide, children }: { label: string; name: string; required?: boolean; error?: string; wide?: boolean; children: ReactNode }) {
  return (
    <div className={cn(wide && 'sm:col-span-2')}>
      <label htmlFor={name} className="mb-2 block font-sans text-[0.68rem] tracking-[0.1em] text-ink-700 uppercase">
        {label} {required && <span className="text-forge-600">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-2 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
