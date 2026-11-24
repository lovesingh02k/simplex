import { Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { company, navigation } from '../../data/company'
import { industries } from '../../data/industries'
import { products } from '../../data/products'
import { Logo } from '../common/Logo'
import { SteelBackdrop } from '../common/SteelBackdrop'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative isolate overflow-hidden bg-ink-950 text-steel-300">
      <SteelBackdrop />
      <div className="container-x relative">
        <div className="grid gap-12 pt-20 pb-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr_1.4fr]">
          <div>
            <Link to="/" aria-label="Simplex Metals – home" className="group inline-block">
              <Logo markClassName="!h-16" />
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-steel-400">{company.descriptor}, Bhilai, Chhattisgarh, India.</p>
          </div>

          <FooterCol title="Company">
            {navigation.map((n) => (
              <FooterLink key={n.to} to={n.to}>
                {n.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Products">
            {products.map((p) => (
              <FooterLink key={p.slug} to={`/products/${p.slug}`}>
                {p.shortName}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Industries">
            {industries.map((i) => (
              <FooterLink key={i.id} to={`/industries#${i.id}`}>
                {i.name}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Contact">
            <li>
              <a href={company.contact.phoneHref} className="flex items-start gap-3 transition-colors hover:text-white">
                <Phone className="mt-0.5 size-4 shrink-0 text-forge-500" /> {company.contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.contact.email}`} className="flex items-start gap-3 break-all transition-colors hover:text-white">
                <Mail className="mt-0.5 size-4 shrink-0 text-forge-500" /> {company.contact.email}
              </a>
            </li>
            {company.contact.addresses.map((a) => (
              <li key={a.label} className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-forge-500" />
                <span>
                  <span className="block font-sans text-[0.65rem] font-semibold tracking-[0.1em] text-steel-500 uppercase">{a.label}</span>
                  {a.lines.slice(0, 2).join(', ')}
                </span>
              </li>
            ))}
          </FooterCol>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-7 font-sans text-[0.68rem] tracking-[0.12em] text-steel-500 uppercase lg:flex-row lg:justify-between">
          <p>© {year} Simplex Metals. All rights reserved.</p>
          <p>
            Representative images ·{' '}
            <Link to="/credits" className="transition-colors hover:text-white">
              Photo Credits
            </Link>
          </p>
          <p>
            Designed &amp; developed by{' '}
            <a
              href="https://googlixlabs.com/"
              target="_blank"
              rel="noopener"
              className="font-semibold text-steel-300 underline-offset-4 transition-colors hover:text-forge-400 hover:underline"
            >
              Googlix Labs
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-sans text-[0.68rem] font-semibold tracking-[0.1em] text-white uppercase">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm">{children}</ul>
    </div>
  )
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="group inline-flex items-center transition-colors duration-300 hover:text-white">
        <span aria-hidden className="mr-0 h-px w-0 bg-forge-500 transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
        {children}
      </Link>
    </li>
  )
}
