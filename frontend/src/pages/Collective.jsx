import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { MaskedHeading } from '../components/MaskedHeading'
import { Button } from '../components/Button'
import { Seed } from '../components/Seed'
import { CreatorForm } from '../components/CreatorForm'
import { useDarkHero } from '../components/LayoutContext'
import { rateCard, creatorPromises } from '../config/collective'

const tabs = [
  { id: 'brands', label: 'For brands' },
  { id: 'creators', label: 'For creators' },
]

export default function Collective() {
  useDarkHero(false)
  const [active, setActive] = useState('brands')
  const location = useLocation()
  const refs = useRef([])

  useEffect(() => {
    if (location.hash.includes('creator')) setActive('creators')
    else if (location.hash.includes('brand') || location.hash.includes('ratecard')) setActive('brands')
  }, [location.hash])

  const onKeyDown = (e) => {
    const i = tabs.findIndex((t) => t.id === active)
    let next = i
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % tabs.length
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + tabs.length) % tabs.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = tabs.length - 1
    else return
    e.preventDefault()
    setActive(tabs[next].id)
    refs.current[next]?.focus()
  }

  return (
    <>
      <Seo title="Collective" description="Creators who understand drape, occasion, and craft. Ready-to-post content for Indian craft brands. From ₹5,000 per asset." path="/collective" />

      {/* Hero */}
      <Section background="paper" flush className="pt-nav-h pb-16">
        <div className="pt-24">
          <MaskedHeading
            className="h-page max-w-[18ch]"
            lines={[<>Content that looks like</>, <>your brand, not like an ad.</>]}
          />
        </div>
      </Section>

      {/* Segmented control */}
      <Section background="paper" flush className="pb-8 flex justify-center">
        <div
          role="tablist"
          aria-label="Collective audience"
          onKeyDown={onKeyDown}
          className="inline-flex p-1 rounded-full pill-border"
        >
          {tabs.map((t, idx) => {
            const selected = active === t.id
            return (
              <button
                key={t.id}
                ref={(el) => (refs.current[idx] = el)}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={selected}
                aria-controls={`panel-${t.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(t.id)}
                className={`btn-label rounded-full transition-colors duration-500 px-6 py-3 ${selected ? 'bg-ink text-paper' : 'bg-transparent text-ink'}`}
                data-testid={`collective-tab-${t.id}`}
              >
                {t.label}
              </button>
            )
          })}
        </div>
      </Section>

      {/* For brands panel */}
      {active === 'brands' && (
        <Section background="paper" id="for-brands" role="tabpanel" aria-labelledby="tab-brands" tabIndex={0}>
          <Reveal className="max-w-[62ch] mb-16">
            <p className="body-text op-82">
              Our creators understand drape, occasion, and craft. They know how a Kanjivaram falls
              and why a bride cares about the blouse before the saree. You get finished,
              ready-to-post assets. We handle the brief, the casting, the shoot, and the revisions.
            </p>
          </Reveal>

          <div id="ratecard" className="hair-bottom max-w-[52rem]">
            {rateCard.map((r) => (
              <div key={r.label} className="hair-top flex items-baseline justify-between gap-6 py-6">
                <span className="body-text">{r.label}</span>
                <span className="price-sm whitespace-nowrap">{r.price}</span>
              </div>
            ))}
          </div>

          <p className="display-italic-lg mt-10 mb-12">
            Full usage rights included. Use it on your feed, your ads, your product pages.
          </p>
          <Button variant="outline-dark" to="/contact">
            Start a project
          </Button>
        </Section>
      )}

      {/* For creators panel */}
      {active === 'creators' && (
        <Section background="scarlet" id="for-creators" role="tabpanel" aria-labelledby="tab-creators" tabIndex={0}>
          <div className="flex gap-4 mb-12 justify-center seed-md" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <Seed inverted key={i} />
            ))}
          </div>
          <Reveal className="text-center flex flex-col items-center">
            <h2 className="h2 mb-8 text-paper">Get paid to make things you&rsquo;d make anyway.</h2>
            <p className="body-text text-paper mb-14">
              We work with creators across ethnic wear, bridal, and jewellery. You don&rsquo;t need a
              hundred thousand followers. You need taste and you need to deliver on time.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {creatorPromises.map((p) => (
              <div key={p} className="flex items-start gap-3 text-paper">
                <span className="mt-[0.4em]"><Seed inverted /></span>
                <p className="body-text text-paper">{p}</p>
              </div>
            ))}
          </div>

          <div id="apply" className="max-w-[46rem]">
            <CreatorForm />
          </div>
        </Section>
      )}
    </>
  )
}
