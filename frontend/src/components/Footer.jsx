import { Link } from 'react-router-dom'
import { Seed } from './Seed'
import { contact } from '../config/contact'

const columns = [
  {
    heading: 'Studio',
    links: [
      { label: 'Packages', to: '/studio#packages' },
      { label: 'The process', to: '/studio#process' },
      { label: 'Questions', to: '/studio#questions' },
    ],
  },
  {
    heading: 'Brands',
    links: [
      { label: 'What we do', to: '/brands#monthly' },
      { label: 'Tiers', to: '/brands#tiers' },
      { label: 'The maths', to: '/brands#maths' },
    ],
  },
  {
    heading: 'Collective',
    links: [
      { label: 'For brands', to: '/collective#for-brands' },
      { label: 'Rate card', to: '/collective#ratecard' },
      { label: 'For creators', to: '/collective#for-creators' },
    ],
  },
]

export const Footer = () => (
  <footer className="bg-ink text-paper px-gutter py-section-y">
    <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
      <div>
        <Link to="/" className="flex items-center gap-3 mb-8">
          <span style={{ fontSize: '1.35rem' }}>
            <Seed inverted />
          </span>
          <span className="font-display" style={{ fontSize: '1.35rem' }}>
            House of Chirmi
          </span>
        </Link>
        <p className="font-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', lineHeight: 1.15 }}>
          We build and grow India&rsquo;s <span className="accent-italic">craft-led</span> brands.
        </p>
      </div>

      {columns.map((col) => (
        <nav key={col.heading} aria-label={col.heading}>
          <p className="eyebrow mb-6" style={{ opacity: 0.6 }}>
            {col.heading}
          </p>
          <ul className="space-y-3">
            {col.links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="btn-label" style={{ opacity: 0.82 }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ))}
    </div>

    <div
      className="mt-20 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
      style={{ borderTop: '1px solid var(--hair-on-ink)' }}
    >
      <p className="btn-label" style={{ opacity: 0.7 }}>
        © 2026 House of Chirmi
      </p>
      <div className="flex items-center gap-4 btn-label">
        <a href={contact.instagram} target="_blank" rel="noreferrer">
          Instagram
        </a>
        <Seed inverted />
        <a href={contact.emailHref}>Email</a>
        <Seed inverted />
        <a href={contact.whatsappHref} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
      </div>
    </div>
  </footer>
)
