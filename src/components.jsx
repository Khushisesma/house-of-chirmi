import { Fragment, useEffect, useId, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { site, navLinks, whatsappLink, categories } from './content'
import { useSiteEffects } from './effects'

export function Seo({ title, description = site.tagline, path = '/' }) {
  const full = title ? `${title} — ${site.name}` : `${site.name} — Shopify stores for independent brands`
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
  if (href) return <a className={cls} href={href} target="_blank" rel="noopener noreferrer" data-magnetic {...rest}><span>{children}</span></a>
  return <Link className={cls} to={to} data-magnetic {...rest}><span>{children}</span></Link>
}

/* The chirmi seed: glossy red with a black eye. */
export const Seed = ({ className = '', style, ...rest }) => {
  const id = useId().replace(/:/g, '')
  return (
  <svg className={`seed ${className}`} style={style} viewBox="0 0 120 84" aria-hidden="true" {...rest}>
    <defs>
      <clipPath id={`c${id}`}><ellipse cx="60" cy="42" rx="58" ry="40" /></clipPath>
      <radialGradient id={`g${id}`} cx="0.62" cy="0.3" r="0.7">
        <stop offset="0" stopColor="#ff5a4a" /><stop offset="0.55" stopColor="#e2231a" /><stop offset="1" stopColor="#9c120c" />
      </radialGradient>
    </defs>
    <g clipPath={`url(#c${id})`}>
      <rect width="120" height="84" fill={`url(#g${id})`} />
      <ellipse cx="6" cy="42" rx="34" ry="44" fill="#14100e" />
    </g>
    <ellipse cx="78" cy="22" rx="16" ry="6" fill="#fff" opacity="0.55" transform="rotate(-12 78 22)" />
  </svg>
  )
}

/* Infinite ticker. Items are duplicated so the loop is seamless. */
export const Marquee = ({ items, className = '', reverse }) => {
  const row = items.flatMap((t, i) => [<span key={`t${i}`}>{t}</span>, <Seed key={`s${i}`} className="seed-inline" />])
  return (
    <div className={`marquee ${className}${reverse ? ' marquee-rev' : ''}`} aria-hidden="true">
      <div className="marquee-track">{row}{row.map((el, i) => <el.type key={`d${i}`} {...el.props} />)}</div>
    </div>
  )
}

/* Rotating circular badge with a seed in the middle. */
export const SpinBadge = ({ to = '/contact', text = 'Start a project • Start a project • ' }) => (
  <Link to={to} className="spin-badge" aria-label="Start a project" data-cursor="Hello">
    <svg viewBox="0 0 200 200" aria-hidden="true">
      <defs><path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
      <text><textPath href="#badge-circle">{text}</textPath></text>
    </svg>
    <Seed className="spin-badge-seed" />
  </Link>
)

/* Wrap each word so headlines can rise word by word. */
export const Words = ({ children, className = '' }) =>
  String(children).split(' ').map((w, i) => (
    <Fragment key={i}><span className={`word ${className}`} style={{ '--i': i }}><span>{w}</span></span>{' '}</Fragment>
  ))

export const Meta = ({ items }) => (
  <p className="meta">{items.map((t) => <span key={t}>{t}</span>)}</p>
)

export function Quote({ t, large, link }) {
  return (
    <figure className={`quote${large ? ' quote-lg' : ''}`}>
      <blockquote><p>“{t.quote}”</p></blockquote>
      <figcaption className="caption">
        {t.by}, {link ? <Link to={`/work/${t.slug}`}>{t.brand}</Link> : t.brand}
      </figcaption>
    </figure>
  )
}

export function CaseCard({ c, frame = 'frame-land', eager }) {
  return (
    <Link to={`/work/${c.slug}`} className="case-card" data-cursor="View" data-reveal>
      <Meta items={c.tags} />
      <h3 className="subheading">{c.name}</h3>
      <div className={`frame ${frame}${c.image ? '' : ' frame-type'}`}>
        {c.image
          ? <img src={c.image} alt={`${c.name} storefront, designed by House of Chirmi`} width="2000" height="1250" loading={eager ? 'eager' : 'lazy'} />
          : <span className="display serif">{c.name}</span>}
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
      <div className="progress" aria-hidden="true" />
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
    </header>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <Marquee items={['Tell us what you’re building', ...categories, 'And whatever’s next']} className="marquee-red" />
      <div className="wrap">
        <div className="footer-cta">
          <h2 className="display-xl" data-reveal><span className="word-rise">Tell us what<br />you’re <span className="serif">building.</span></span></h2>
          <div className="pill-row" style={{ marginTop: 40 }}>
            <Pill to="/contact">Start a project</Pill>
            <Pill ghost href={whatsappLink('Hi House of Chirmi, I’d like to talk about my brand.')}>WhatsApp</Pill>
          </div>
        </div>
        <div className="footer-cols">
          <div>
            <p className="caption">Studio</p>
            {navLinks.map((l) => <Link key={l.to} to={l.to}>{l.label}</Link>)}
          </div>
          <div>
            <p className="caption">Contact</p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
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
        <div className="footer-giant" aria-hidden="true">
          {'CHIRMI'.split('').map((l, i) => <span key={i} style={{ '--i': i }}>{l}</span>)}
          <Seed className="footer-seed" />
        </div>
      </div>
    </footer>
  )
}

export function Layout() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  useSiteEffects(pathname)
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
    </>
  )
}
