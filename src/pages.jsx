import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Seo, Pill, Meta, CaseCard, Quote, Seed, Marquee, SpinBadge, Words } from './components'
import {
  site, stats, services, packages, alwaysIncluded, processSteps, studioFaq,
  monthlyWork, brandTiers, commitments, cases, getCase, getNextCase,
  categories, featuredTestimonials, getTestimonial,
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
// Colour for each stacked work card, in order. bg / text.
const tones = [
  ['var(--chirmi)', 'var(--sand)'],
  ['var(--rani)', 'var(--sand)'],
  ['var(--saffron)', 'var(--kohl)'],
  ['var(--indigo)', 'var(--sand)'],
  ['var(--peacock)', 'var(--sand)'],
  ['var(--kohl)', 'var(--sand)'],
  ['var(--marigold)', 'var(--kohl)'],
]

const Scrub = ({ text, serif }) => (
  <p className="statement scrub" data-scrub>
    {text.split(' ').map((w, i) => <span key={i} className="w">{w} </span>)}
    {serif && <span className="w serif">{serif}</span>}
  </p>
)

export function Home() {
  return (
    <>
      <Seo path="/" />
      <section className="hero-home">
        <Seed className="float f1" data-depth="1.4" />
        <Seed className="float f2" data-depth="0.7" />
        <Seed className="float f3" data-depth="2" />
        <Seed className="float f4" data-depth="1" />
        <div className="wrap">
          <p className="caption hero-kicker"><span className="dot" /> Shopify studio · India · open for projects</p>
          <h1 className="display-xl hero-title">
            <Words>Shopify stores</Words><br />
            <Words>for brands with</Words><br />
            <span className="word serif hl" style={{ '--i': 5 }}><span>something to say.</span></span>
          </h1>
          <div className="hero-foot">
            <p className="body-lg rise rise-2">
              House of Chirmi designs, builds and grows storefronts for independent brands — fashion,
              jewellery, bags, home décor, and whatever you’re making next.
            </p>
            <div className="pill-row rise rise-3">
              <Pill to="/work">View work</Pill>
              <Pill ghost to="/contact">Start a project</Pill>
            </div>
          </div>
        </div>
        <SpinBadge />
      </section>

      <section className="tapes" aria-label="What we make">
        <Marquee items={categories} className="tape tape-a" />
        <Marquee items={['Design', 'Build', 'Launch', 'Grow', 'Repeat']} className="tape tape-b" reverse />
      </section>

      <section className="wrap section" aria-label="In numbers">
        <div className="bento">
          {stats.map((st, i) => (
            <div key={st.label} className={`tile tile-${i + 1}`} data-reveal style={{ '--d': `${i * 90}ms` }}>
              <span className="tile-num" data-count={st.value}>{st.value}</span>
              <p className="caption">{st.label}</p>
            </div>
          ))}
          <div className="tile tile-chips" data-reveal style={{ '--d': '270ms' }}>
            <p className="caption">Built so far</p>
            <ul className="chips">{categories.map((c) => <li key={c}>{c}</li>)}</ul>
            <p className="caption" style={{ marginTop: 'auto' }}>Your category isn’t here? Good — tell us about it.</p>
          </div>
          <Link to="/work/lakhmanis" className="tile tile-fast" data-reveal style={{ '--d': '360ms' }} data-cursor="Read">
            <span className="tile-num">2</span>
            <p className="caption">Days — our fastest full store launch, for Lakhmanis</p>
          </Link>
        </div>
      </section>

      <section className="section" aria-labelledby="work-h">
        <div className="wrap section-head">
          <h2 id="work-h" className="display" data-reveal><span className="word-rise">Selected <span className="serif">work</span></span></h2>
          <Pill ghost to="/work">All work</Pill>
        </div>
        <div className="stack">
          {cases.map((c, i) => (
            <Link key={c.slug} to={`/work/${c.slug}`} className="stack-card" data-cursor="View"
              style={{ '--bg': tones[i % tones.length][0], '--fg': tones[i % tones.length][1], top: `calc(72px + ${i * 14}px)` }}>
              <div className="stack-inner wrap">
                <div className="stack-text">
                  <p className="caption">0{i + 1} / 0{cases.length}</p>
                  <h3 className="stack-name">{c.name}</h3>
                  <Meta items={c.tags} />
                  <p className="body-lg">{c.blurb}</p>
                  <span className="pill pill-inv">View case →</span>
                </div>
                <div className="stack-img">
                  {c.image ? <img src={c.image} alt={`${c.name} storefront`} width="2000" height="1250" loading={i < 2 ? 'eager' : 'lazy'} />
                    : <span className="display serif">{c.name}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {featuredTestimonials.length > 0 && (
        <section className="band band-rani" aria-labelledby="words-h">
          <div className="wrap">
            <h2 id="words-h" className="caption">In their words</h2>
            <span className="quote-mark" aria-hidden="true" data-parallax="0.15">“</span>
            <div className={featuredTestimonials.length > 1 ? 'grid-2' : ''}>
              {featuredTestimonials.map((t) => <Quote key={t.slug} t={t} link large={featuredTestimonials.length === 1} />)}
            </div>
          </div>
        </section>
      )}

      <section className="band band-kohl chirmi-band">
        <div className="wrap two-col">
          <div className="seed-stage" aria-hidden="true">
            <svg className="orbit" viewBox="0 0 200 200">
              <defs><path id="orbit-circle" d="M100,100 m-92,0 a92,92 0 1,1 184,0 a92,92 0 1,1 -184,0" /></defs>
              <circle cx="100" cy="100" r="96" />
              <text><textPath href="#orbit-circle">chirmi · ratti · gunja · a seed, a song, a standard · chirmi · ratti · gunja ·</textPath></text>
            </svg>
            <Seed className="seed-giant" />
          </div>
          <div style={{ display: 'grid', gap: 24, alignContent: 'center', justifyItems: 'start' }}>
            <p className="caption">Why Chirmi</p>
            <p className="statement" data-reveal><span className="word-rise">Named after a seed <span className="serif">Rajasthan sings about.</span></span></p>
            <p className="body-lg">
              The chirmi is the red seed of a Rajasthani folk song about longing for home — and the seed
              goldsmiths once weighed gold against. Small, exact, and full of feeling. That’s the standard.
            </p>
            <Pill to="/about">Read the story</Pill>
          </div>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="services-h">
        <h2 id="services-h" className="display" style={{ marginBottom: 40 }} data-reveal><span className="word-rise">What we <span className="serif">do</span></span></h2>
        <div className="rows rows-sweep">
          {services.map((sv) => (
            <Link key={sv.name} to={sv.to} className="row row-3">
              <span className="row-name">{sv.name}</span>
              <Meta items={sv.tags} />
              <span className="pill-row"><span className="caption" style={{ alignSelf: 'center', marginRight: 12 }}>{sv.price}</span><span className="pill">More +</span></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <Scrub text="A store should look like your brand, not the theme. The work is in the structure — a wedding edit for the clutch label, shop-by-room for the décor brand, festival collections for the handloom store —" serif="paths built around how your buyer actually shops." />
      </section>

      <section className="wrap section" aria-labelledby="price-h">
        <div className="section-head">
          <h2 id="price-h" className="display" data-reveal><span className="word-rise">We publish<br />our <span className="serif">prices.</span></span></h2>
          <p className="body-lg">Because you shouldn’t need a call to find out whether we’re in your range.</p>
        </div>
        <div className="rows rows-sweep">
          {packages.map((pk) => (
            <Link key={pk.name} to="/studio" className="row row-3">
              <span className="row-name">{pk.name}</span>
              <span className="row-mid body-sm">{pk.blurb}</span>
              <span className="pill-row"><span className="caption" style={{ alignSelf: 'center', marginRight: 12 }}>{pk.price}</span><span className="pill">More +</span></span>
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
        <h1 className="display-xl hero-title"><Words>Selected</Words> <span className="word serif hl" style={{ '--i': 1 }}><span>work.</span></span></h1>
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
        <div className="rows rows-sweep">
          {cases.map((c) => (
            <Link key={c.slug} to={`/work/${c.slug}`} className="row row-3" data-preview={c.image || undefined}>
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
  const tone = tones[cases.findIndex((x) => x.slug === slug) % tones.length]
  const blocks = [['The brand', c.brand], ['The brief', c.brief], ['What we built', c.built], ['The result', c.result]].filter(([, b]) => b)
  return (
    <>
      <Seo title={c.name} description={c.blurb} path={`/work/${c.slug}`} />
      <section className="case-hero" style={{ '--bg': tone[0], '--fg': tone[1] }}>
        <div className="wrap">
          <Meta items={c.tags} />
          <h1 className="display-xl hero-title" style={{ marginTop: 20 }}><Words>{c.name}</Words></h1>
          <div className="hero-foot rise rise-2">
            <p className="body-lg">{c.meta}</p>
            {c.url && <Pill href={c.url}>Visit live store ↗</Pill>}
          </div>
        </div>
      </section>
      <section className="wrap case-shot" data-reveal>
        {c.image
          ? <div className="frame frame-land"><img src={c.image} alt={`${c.name} storefront homepage`} width="2000" height="1250" /></div>
          : <div className="frame frame-land frame-type"><span className="display serif">{c.name}</span></div>}
      </section>
      <section className="wrap section">
        <div className="rows">
          {blocks.map(([h, b]) => (
            <div key={h} className="detail-grid" data-reveal style={{ padding: '20px 0', borderBottom: '1px solid var(--color-carbon-black)' }}>
              <p className="caption">{h}</p>
              <p className="body-lg" style={{ maxWidth: '56ch', fontSize: 22, lineHeight: 1.17 }}>{b}</p>
            </div>
          ))}
        </div>
      </section>
      {t && (
        <section className="band band-rani">
          <div className="wrap">
            <span className="quote-mark" aria-hidden="true">“</span>
            <Quote t={t} large />
          </div>
        </section>
      )}
      {c.gallery && (
        <section className="wrap section">
          <div className="gallery">
            {c.gallery.map((g, i) => (
              <img key={g} src={g} alt={`${c.name} storefront, launch reel frame ${i + 1}`} width="720" height="1280" loading="lazy" />
            ))}
          </div>
          <p className="caption" style={{ textAlign: 'center', marginTop: 12 }}>Frames from our launch reels — desktop and mobile</p>
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
        <Link to={`/work/${next.slug}`} className="section-head next-case" style={{ marginTop: 20 }} data-cursor="Next">
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
            <div key={p.name} className={`panel${i === 1 ? ' panel-warm' : ''}${i === 2 ? ' panel-dark' : ''}`} data-reveal style={{ '--d': `${i * 100}ms` }}>
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
            <div key={t.name} className="panel" data-reveal>
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
      <Seo title="About" description="Chirmi is the red seed Rajasthan sings about, and the seed goldsmiths once weighed gold against. Small, exact, and full of feeling." path="/about" />
      <section className="wrap hero">
        <Seed className="float f1" data-depth="1.2" />
        <Seed className="float f3" data-depth="0.8" />
        <h1 className="display-xl hero-title"><Words>A small seed.</Words><br /><Words>A long</Words> <span className="word serif hl" style={{ '--i': 5 }}><span>song.</span></span></h1>
        <div className="hero-foot rise rise-2">
          <p className="body-lg">Chirmi is a tiny red seed with a black eye. In Rajasthan, it’s also a feeling.</p>
        </div>
      </section>
      <section className="wrap section">
        <div className="two-col" data-reveal>
          <p className="caption">In Rajasthan</p>
          <div style={{ display: 'grid', gap: 20 }}>
            <p className="body-lg" style={{ fontSize: 22, lineHeight: 1.17 }}>
              The chirmi grows on a wild creeper across the Rajasthani desert, and it gives its name to one of
              the state’s best-loved folk songs. In <span className="serif">“Chirmi”</span>, a young bride far
              from her parents’ home sees the chirmi vine and is reminded, one by one, of everyone she loves.
            </p>
            <p className="body-lg">
              It’s a song about longing and belonging — about how something small and familiar can carry you
              all the way home. Generations of women have sung it at weddings and in courtyards, and it still
              makes people tear up.
            </p>
          </div>
        </div>
      </section>
      <section className="wrap section">
        <div className="two-col" data-reveal>
          <p className="caption">The measure</p>
          <div style={{ display: 'grid', gap: 20 }}>
            <p className="body-lg" style={{ fontSize: 22, lineHeight: 1.17 }}>
              The same seed is so consistent in weight that Indian goldsmiths weighed gold against it for
              centuries. It became the <span className="serif">ratti</span>, the unit for measuring gold and
              gemstones across the subcontinent.
            </p>
            <p className="body-lg">
              A seed you could lose in your palm, and it was the standard.
            </p>
          </div>
        </div>
      </section>
      <section className="wrap section">
        <div className="panel panel-warm" style={{ padding: 'clamp(24px, 5vw, 64px)' }}>
          <p className="caption">So, House of Chirmi</p>
          <p className="statement" style={{ fontSize: 'var(--text-heading-sm)' }}>
            Exact enough to be the measure. Warm enough to feel like home. We want every store we build to
            do both — so a customer miles away opens it and feels they already <span className="serif">know</span> the brand.
          </p>
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
