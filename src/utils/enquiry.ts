import { company } from '../data/company'

export type Enquiry = {
  name: string
  company: string
  email: string
  phone: string
  product: string
  quantity: string
  requirements: string
  message: string
}

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>

export const emptyEnquiry: Enquiry = {
  name: '',
  company: '',
  email: '',
  phone: '',
  product: '',
  quantity: '',
  requirements: '',
  message: '',
}

export function validateEnquiry(e: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {}
  if (e.name.trim().length < 2) errors.name = 'Please enter your full name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.email.trim())) errors.email = 'Please enter a valid email address.'
  const digits = e.phone.replace(/\D/g, '')
  if (digits.length < 10 || digits.length > 13) errors.phone = 'Please enter a valid phone number (10–13 digits).'
  if (!e.product.trim()) errors.product = 'Please select or describe the component you need.'
  if (e.requirements.trim().length < 10) errors.requirements = 'Please describe your technical requirements (size, material, standard…).'
  return errors
}

/**
 * Backend endpoint for enquiries. Set VITE_ENQUIRY_ENDPOINT in `.env` to a service that accepts
 * a JSON POST (e.g. your own API, Formspree, Web3Forms). When unset, the form falls back to a
 * prefilled email in the visitor's mail app – nothing is sent silently.
 */
export const enquiryEndpoint: string | undefined = import.meta.env.VITE_ENQUIRY_ENDPOINT || undefined

export async function submitEnquiry(e: Enquiry): Promise<void> {
  if (!enquiryEndpoint) throw new Error('No enquiry endpoint configured')
  const res = await fetch(enquiryEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...e, source: 'simplexmetals-website', submittedAt: new Date().toISOString() }),
  })
  if (!res.ok) throw new Error(`Enquiry failed with status ${res.status}`)
}

export function enquiryMailto(e: Enquiry): string {
  const subject = `Enquiry: ${e.product}${e.company ? ` – ${e.company}` : ''}`
  const body = [
    `Name: ${e.name}`,
    `Company: ${e.company || '-'}`,
    `Email: ${e.email}`,
    `Phone: ${e.phone}`,
    `Product / Component: ${e.product}`,
    `Quantity: ${e.quantity || '-'}`,
    '',
    'Technical requirements:',
    e.requirements,
    '',
    'Additional message:',
    e.message || '-',
  ].join('\n')
  return `mailto:${company.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
