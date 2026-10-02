import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { site, navLinks, whatsappLink } from './content'

export function Seo({ title, description = site.tagline, path = '/' }) {
  const full = title ? `${title} — ${site.name}` : `${site.name} — Shopify stores for Indian craft brands`
  const url = `${site.url}${path === '/' ? '' : path}`
  return (
    <Helmet>
      <title>{full}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${site.url}/og.jpg`} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  )
}

export const Wordmark = () => (
  <Link to="/" className="wordmark" aria-label={`${site.name} home`}>
    House of Chirmi<sup>®</sup>
  </Link>
)

export const Pill = ({ to, href, children, ghost, ...rest }) => {
  const cls = `pill${ghost ? ' pill-ghost' : ''}`
  if (href) return <a className={cls} href={href} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>
  return <Link className={cls} to={to} {...rest}>{children}</Link>
}

export const Meta = ({ items }) => (
  <p className="meta">{items.map((t) => <span key={t}>{t}</span>)}</p>
)

export function CaseCard({ c, frame = 'frame-land', eager }) {
  return (
    <Link to={`/work/${c.slug}`} className="case-card">
      <Meta items={c.tags} />
      <h3 className="subheading">{c.name}</h3>
      <div className={`frame ${frame}`}>
        <img src={c.image} alt={`${c.name} storefront, designed by House of Chirmi`} width="1600" height="1000" loading={eager ? 'eager' : 'lazy'} />
      </div>
      <div className="case-card-foot">
        <p className="body-sm">{c.blurb}</p>
        <span className="pill">View case</span>
      </div>
    </Link>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="header">
      <div className="wrap header-row">
        <Wordmark />
        <nav className="nav" aria-label="Primary">
          {navLinks.map((l) => <NavLink key={l.to} to={l.to}>{l.label}</NavLink>)}
        </nav>
        <button className="menu-btn" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((o) => !o)}>
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile">
          {navLinks.map((l) => <NavLink key={l.to} to={l.to}>{l.label}</NavLink>)}
          <a className="pill" href={whatsappLink('Hi House of Chirmi, I’d like to talk about my brand.')} target="_blank" rel="noopener noreferrer">
            WhatsApp us
          </a>
        </nav>
      )}
      <hr className="rule" />
    </header>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="wrap">
        <hr className="rule" />
        <div className="footer-cta">
          <h2 className="display">Tell us what<br />you’re building.</h2>
          <div className="pill-row" style={{ marginTop: 32 }}>
            <Pill to="/contact">Start a project</Pill>
            <Pill ghost href={whatsappLink('Hi House of Chirmi, I’d like to talk about my brand.')}>WhatsApp</Pill>
          </div>
        </div>
        <hr className="rule" />
        <div className="footer-cols">
          <div>
            <p className="caption">Studio</p>
            {navLinks.map((l) => <Link key={l.to} to={l.to}>{l.label}</Link>)}
          </div>
          <div>
            <p className="caption">Contact</p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">{site.whatsappLabel}</a>
          </div>
          <div>
            <p className="caption">Follow</p>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer">{site.instagramLabel}</a>
            <a href={site.studioInstagram} target="_blank" rel="noopener noreferrer">{site.studioInstagramLabel} — websites</a>
          </div>
          <div>
            <p className="caption">Based in</p>
            <p>{site.location}</p>
            <p>© {year} House of Chirmi</p>
          </div>
        </div>
        <div className="footer-giant" aria-hidden="true">Chirmi®</div>
      </div>
    </footer>
  )
}

export function Layout() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
    </>
  )
}
