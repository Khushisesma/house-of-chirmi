import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Seo, Pill, Meta, CaseCard, Quote } from './components'
import {
  site, stats, services, packages, alwaysIncluded, processSteps, studioFaq,
  monthlyWork, brandTiers, commitments, cases, getCase, getNextCase,
  categories, testimonials, getTestimonial,
  needOptions, budgetOptions, whatsappLink,
} from './content'

const Faq = ({ items }) => (
  <div className="faq rows" style={{ borderTop: '1px solid var(--color-carbon-black)' }}>
    {items.map((f) => (
      <details key={f.q}>
        <summary>{f.q}</summary>
        <p>{f.a}</p>
      </details>
    ))}
  </div>
)

/* ---------------- Home ---------------- */
export function Home() {
  const [first, ...rest] = cases
  return (
    <>
      <Seo path="/" />
      <section className="wrap hero">
        <h1 className="display-xl rise">
          Shopify stores<br />for brands with<br /><span className="serif">something to say.</span>
        </h1>
        <div className="hero-foot rise rise-2">
          <p className="body-lg">
            House of Chirmi is a Shopify studio. We design, build and grow storefronts for independent
            brands — fashion, jewellery, bags, home décor, and whatever you’re making next.
          </p>
          <div className="pill-row">
            <Pill to="/work">View work</Pill>
            <Pill ghost to="/contact">Start a project</Pill>
          </div>
        </div>
      </section>

      <section className="wrap section">
        <hr className="rule" />
        <div className="stats">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="stat-value">{s.value}</div>
              <p className="caption stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap section" aria-labelledby="range-h">
        <div className="section-head">
          <h2 id="range-h" className="heading-sm">Built so far</h2>
          <p className="caption">Your category isn’t here? Good — tell us about it.</p>
        </div>
        <ul className="chips">
          {categories.map((c) => <li key={c}>{c}</li>)}
        </ul>
      </section>

      <section className="wrap section" aria-labelledby="work-h">
        <div className="section-head">
          <h2 id="work-h" className="display">Selected work</h2>
          <Pill ghost to="/work">All work</Pill>
        </div>
        <CaseCard c={first} frame="frame-wide" eager />
        <div className="grid-2" style={{ marginTop: 64 }}>
          {rest.map((c) => <CaseCard key={c.slug} c={c} />)}
        </div>
      </section>

      <section className="wrap section" aria-labelledby="words-h">
        <h2 id="words-h" className="display" style={{ marginBottom: 40 }}>In their <span className="serif">words</span></h2>
        <div className="grid-2">
          {testimonials.map((t) => <Quote key={t.slug} t={t} link />)}
        </div>
      </section>

      <section className="wrap section" aria-labelledby="services-h">
        <h2 id="services-h" className="display" style={{ marginBottom: 40 }}>What we do</h2>
        <div className="rows">
          {services.map((s) => (
            <Link key={s.name} to={s.to} className="row row-3">
              <span className="row-name">{s.name}</span>
              <Meta items={s.tags} />
              <span className="pill-row"><span className="caption" style={{ alignSelf: 'center', marginRight: 12 }}>{s.price}</span><span className="pill">More +</span></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <div className="two-col">
          <p className="statement">A store should look like <span className="serif">your brand,</span> not the theme.</p>
          <div style={{ display: 'grid', gap: 20, alignContent: 'end' }}>
            <p className="body-lg">
              Anyone can give you a clean grid and a fast theme. The work is in the structure: a wedding
              edit for the clutch label, shop-by-room for the décor brand, festival collections for the
              handloom store — paths built around how your buyer actually shops.
            </p>
            <p className="body-lg">
              We’ve built for fashion, jewellery, bags, home décor and handloom, and we’re happy to learn
              something new. Every project starts by understanding your customer, your calendar, and why
              your carts get abandoned.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="price-h">
        <div className="section-head">
          <h2 id="price-h" className="display">We publish<br />our prices.</h2>
          <p className="body-lg">Because you shouldn’t need a call to find out whether we’re in your range.</p>
        </div>
        <div className="rows">
          {packages.map((p) => (
            <Link key={p.name} to="/studio" className="row row-3">
              <span className="row-name">{p.name}</span>
              <span className="row-mid body-sm">{p.blurb}</span>
              <span className="pill-row"><span className="caption" style={{ alignSelf: 'center', marginRight: 12 }}>{p.price}</span><span className="pill">More +</span></span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

/* ---------------- Work ---------------- */
export function Work() {
  return (
    <>
      <Seo title="Work" description="Selected Shopify storefronts — fashion, jewellery, bags, home décor and handloom brands." path="/work" />
      <section className="wrap hero">
        <h1 className="display-xl rise">Work</h1>
        <div className="hero-foot rise rise-2">
          <p className="body-lg">Storefronts for fashion, jewellery, bags, home décor and handloom labels — each built around how its buyer shops.</p>
        </div>
      </section>
      <section className="wrap section">
        <div className="grid-2">
          {cases.map((c, i) => <CaseCard key={c.slug} c={c} eager={i < 2} />)}
        </div>
      </section>
      <section className="wrap section">
        <h2 className="heading-sm" style={{ marginBottom: 24 }}>Brands we’ve worked with</h2>
        <div className="rows">
          {cases.map((c) => (
            <Link key={c.slug} to={`/work/${c.slug}`} className="row row-3">
              <span className="row-name">{c.name}</span>
              <span className="row-mid"><Meta items={c.tags} /></span>
              <span className="pill">More +</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

export function CaseDetail() {
  const { slug } = useParams()
  const c = getCase(slug)
  if (!c) return <Navigate to="/work" replace />
  const next = getNextCase(slug)
  const t = getTestimonial(slug)
  const blocks = [['The brand', c.brand], ['The brief', c.brief], ['What we built', c.built], ['The result', c.result]].filter(([, b]) => b)
  return (
    <>
      <Seo title={c.name} description={c.blurb} path={`/work/${c.slug}`} />
      <section className="wrap hero">
        <Meta items={c.tags} />
        <h1 className="display-xl rise" style={{ marginTop: 20 }}>{c.name}</h1>
        <div className="hero-foot rise rise-2">
          <p className="body-lg">{c.meta}</p>
          {c.url && <Pill href={c.url}>Visit live store ↗</Pill>}
        </div>
      </section>
      <section className="wrap section">
        {c.image
          ? <div className="frame frame-land"><img src={c.image} alt={`${c.name} storefront homepage`} width="2000" height="1250" /></div>
          : <div className="frame frame-land frame-type"><span className="display serif">{c.name}</span></div>}
      </section>
      <section className="wrap section">
        <div className="rows">
          {blocks.map(([h, b]) => (
            <div key={h} className="detail-grid" style={{ padding: '20px 0', borderBottom: '1px solid var(--color-carbon-black)' }}>
              <p className="caption">{h}</p>
              <p className="body-lg" style={{ maxWidth: '56ch', fontSize: 22, lineHeight: 1.17 }}>{b}</p>
            </div>
          ))}
        </div>
      </section>
      {t && (
        <section className="wrap section">
          <Quote t={t} large />
        </section>
      )}
      {(c.long || c.mobile) && (
        <section className="wrap section">
          <div className="showcase">
            {c.long && (
              <figure>
                <div className="browser" tabIndex={0} aria-label={`Scrollable view of the ${c.name} homepage`}>
                  <img src={c.long} alt={`${c.name} homepage, scrolled`} width="1400" height="3500" loading="lazy" />
                </div>
                <figcaption className="caption">The homepage, top to bottom — scroll inside</figcaption>
              </figure>
            )}
            {c.mobile && (
              <figure>
                <div className="phone"><img src={c.mobile} alt={`${c.name} on mobile`} width="780" height="1688" loading="lazy" /></div>
                <figcaption className="caption">Mobile-first — where most buyers shop</figcaption>
              </figure>
            )}
          </div>
        </section>
      )}
      <section className="wrap section">
        <hr className="rule" />
        <Link to={`/work/${next.slug}`} className="section-head" style={{ marginTop: 20 }}>
          <span><p className="caption">Next case</p><span className="display">{next.name}</span></span>
          <span className="pill">View case</span>
        </Link>
      </section>
    </>
  )
}

/* ---------------- Studio (websites) ---------------- */
export function Studio() {
  return (
    <>
      <Seo title="Websites" description="Shopify storefronts for independent brands. Launch ₹35,000, Growth ₹65,000, Signature ₹1,10,000. Prices published." path="/studio" />
      <section className="wrap hero">
        <h1 className="display-xl rise">Storefronts that<br />earn the <span className="serif">price.</span></h1>
        <div className="hero-foot rise rise-2">
          <p className="body-lg">Fast, beautiful Shopify stores for independent brands — fashion, jewellery, home, lifestyle — built to sell at a premium without apology.</p>
          <Pill to="/contact">Start a project</Pill>
        </div>
      </section>

      <section className="wrap section">
        <div className="grid-3">
          {packages.map((p, i) => (
            <div key={p.name} className={`panel${i === 1 ? ' panel-warm' : ''}`}>
              <p className="caption">{p.timeline}</p>
              <h2 className="subheading">{p.name}</h2>
              <p className="price">{p.price}</p>
              <p className="body-sm">{p.blurb}</p>
              <ul className="list">{p.inclusions.map((x) => <li key={x}>{x}</li>)}</ul>
              <Pill to="/contact">Choose {p.name}</Pill>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <div className="two-col">
          <h2 className="display">Always<br />included</h2>
          <ul className="list" style={{ alignSelf: 'end' }}>{alwaysIncluded.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
      </section>

      <section className="wrap section">
        <h2 className="display" style={{ marginBottom: 40 }}>Six steps, because<br />the order matters.</h2>
        <div className="grid-3" style={{ rowGap: 32 }}>
          {processSteps.map((s, i) => (
            <div key={s.title} style={{ borderTop: '1px solid var(--color-carbon-black)', paddingTop: 20 }}>
              <p className="caption">0{i + 1}</p>
              <h3 className="subheading" style={{ margin: '20px 0 12px' }}>{s.title}</h3>
              <p className="body-sm">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <h2 className="heading-sm" style={{ marginBottom: 24 }}>Questions</h2>
        <Faq items={studioFaq} />
      </section>
    </>
  )
}

/* ---------------- Brands (partnership) ---------------- */
export function Brands() {
  return (
    <>
      <Seo title="Brand partnership" description="Monthly brand partnerships for independent labels that have a store and need it to grow. From ₹22,000 per month." path="/brands" />
      <section className="wrap hero">
        <h1 className="display-xl rise">Someone has to<br />own the brand.<br /><span className="serif">Let it be us.</span></h1>
        <div className="hero-foot rise rise-2">
          <p className="body-lg">Monthly partnerships for brands that already have a store and need it to grow.</p>
          <Pill to="/contact">Book a brand review</Pill>
        </div>
      </section>

      <section className="wrap section">
        <div className="panel panel-warm" style={{ padding: 'clamp(24px, 5vw, 64px)' }}>
          <p className="caption">The business case</p>
          <p className="statement" style={{ fontSize: 'var(--text-heading-sm)' }}>
            If your average order is ₹10,000, a ₹35,000 partnership needs four extra orders a month to pay for itself.
          </p>
        </div>
      </section>

      <section className="wrap section">
        <h2 className="display" style={{ marginBottom: 40 }}>Every month</h2>
        <div className="rows">
          {monthlyWork.map((m, i) => (
            <div key={m} className="row"><span className="body-sm">{m}</span><span className="caption">0{i + 1}</span></div>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2 className="display">From ₹22,000<br />a month.</h2>
          <p className="caption">All monthly · Three-month minimum</p>
        </div>
        <div className="grid-3">
          {brandTiers.map((t) => (
            <div key={t.name} className="panel">
              <h3 className="subheading">{t.name}</h3>
              <p className="price">{t.price}</p>
              <p className="body-sm">{t.note}</p>
              <p className="caption">per month</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <div className="two-col">
          <p className="statement">We don’t chase <span className="serif">follower counts.</span></p>
          <p className="body-lg" style={{ alignSelf: 'end' }}>
            We don’t send you a report full of impressions and call it growth. If the number that
            matters isn’t moving, we’ll tell you, and we’ll change what we’re doing.
          </p>
        </div>
      </section>
    </>
  )
}

/* ---------------- About ---------------- */
export function About() {
  return (
    <>
      <Seo title="About" description="Indian goldsmiths once weighed gold against the chirmi seed. A small thing that became the standard." path="/about" />
      <section className="wrap hero">
        <h1 className="display-xl rise">The thing gold<br />was <span className="serif">measured</span> against.</h1>
      </section>
      <section className="wrap section">
        <div className="two-col">
          <p className="caption">Why “Chirmi”</p>
          <div style={{ display: 'grid', gap: 20 }}>
            <p className="body-lg" style={{ fontSize: 22, lineHeight: 1.17 }}>
              For centuries, Indian goldsmiths weighed gold against the chirmi seed — so consistent in
              weight that it became the <span className="serif">ratti</span>, the unit for measuring gold
              and gemstones across the subcontinent.
            </p>
            <p className="body-lg">
              A seed you could lose in your palm, and it was the standard. That’s the studio we want to be:
              small, exact, and the measure other work is held to.
            </p>
          </div>
        </div>
      </section>
      <section className="wrap section">
        <div className="two-col">
          <p className="caption">Who’s behind it</p>
          <div style={{ display: 'grid', gap: 20 }}>
            <p className="body-lg" style={{ fontSize: 22, lineHeight: 1.17 }}>
              House of Chirmi is led by Khushi, a Shopify designer and developer who has built storefronts
              for fashion, jewellery, handmade bags, home décor and handloom labels — and is always up for a
              new category.
            </p>
            <p className="body-lg">
              Every project is handled personally — you talk to the person designing and building your
              store, not an account manager.
            </p>
          </div>
        </div>
      </section>
      <section className="wrap section">
        <h2 className="display" style={{ marginBottom: 40 }}>Four commitments</h2>
        <div className="grid-4">
          {commitments.map((c, i) => (
            <div key={c.title} style={{ borderTop: '1px solid var(--color-carbon-black)', paddingTop: 20 }}>
              <p className="caption">0{i + 1}</p>
              <h3 className="subheading" style={{ margin: '20px 0 12px' }}>{c.title}</h3>
              <p className="body-sm">{c.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

/* ---------------- Contact ---------------- */
export function Contact() {
  const [f, setF] = useState({ name: '', brand: '', link: '', need: needOptions[0], budget: budgetOptions[0], message: '' })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const text = [
    `Hi House of Chirmi, I’m ${f.name || '—'}${f.brand ? ` from ${f.brand}` : ''}.`,
    f.link && `Store / Instagram: ${f.link}`,
    `Looking for: ${f.need}`,
    `Budget: ${f.budget}`,
    f.message && `\n${f.message}`,
  ].filter(Boolean).join('\n')

  const onSubmit = (e) => {
    e.preventDefault()
    window.open(whatsappLink(text), '_blank', 'noopener')
  }
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`Project enquiry — ${f.brand || f.name || 'new brand'}`)}&body=${encodeURIComponent(text)}`

  return (
    <>
      <Seo title="Contact" description="Start a project with House of Chirmi. WhatsApp or email — we reply within one working day." path="/contact" />
      <section className="wrap hero">
        <h1 className="display-xl rise">Start a<br /><span className="serif">project.</span></h1>
        <div className="hero-foot rise rise-2">
          <p className="body-lg">Tell us about your brand. We reply within one working day — usually sooner.</p>
        </div>
      </section>
      <section className="wrap section">
        <div className="detail-grid">
          <div style={{ display: 'grid', gap: 12, alignContent: 'start' }}>
            <p className="caption">Direct</p>
            <a className="subheading" href={whatsappLink('Hi House of Chirmi!')} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
            <a className="subheading" href={`mailto:${site.email}`} style={{ wordBreak: 'break-all' }}>{site.email}</a>
            <a className="subheading" href={site.instagram} target="_blank" rel="noopener noreferrer">{site.instagramLabel} ↗</a>
            <a className="subheading" href={site.studioInstagram} target="_blank" rel="noopener noreferrer">{site.studioInstagramLabel} ↗</a>
          </div>
          <form className="form" onSubmit={onSubmit}>
            <div className="form-2">
              <div className="field"><label htmlFor="name">Your name</label><input id="name" required autoComplete="name" value={f.name} onChange={set('name')} /></div>
              <div className="field"><label htmlFor="brand">Brand name</label><input id="brand" value={f.brand} onChange={set('brand')} /></div>
            </div>
            <div className="field"><label htmlFor="link">Current store or Instagram</label><input id="link" placeholder="optional" value={f.link} onChange={set('link')} /></div>
            <div className="form-2">
              <div className="field"><label htmlFor="need">What do you need?</label><select id="need" value={f.need} onChange={set('need')}>{needOptions.map((o) => <option key={o}>{o}</option>)}</select></div>
              <div className="field"><label htmlFor="budget">Budget</label><select id="budget" value={f.budget} onChange={set('budget')}>{budgetOptions.map((o) => <option key={o}>{o}</option>)}</select></div>
            </div>
            <div className="field"><label htmlFor="message">Anything else?</label><textarea id="message" value={f.message} onChange={set('message')} /></div>
            <div className="pill-row" style={{ alignItems: 'center' }}>
              <button type="submit" className="pill">Send on WhatsApp</button>
              <a className="pill pill-ghost" href={mailto}>Send by email</a>
            </div>
            <p className="form-note">Opens WhatsApp or your email app with your details filled in.</p>
          </form>
        </div>
      </section>
    </>
  )
}

export function NotFound() {
  return (
    <>
      <Seo title="Not found" path="/404" />
      <section className="wrap hero">
        <h1 className="display-xl">404</h1>
        <div className="hero-foot"><p className="body-lg">This page doesn’t exist.</p><Pill to="/">Back home</Pill></div>
      </section>
    </>
  )
}
