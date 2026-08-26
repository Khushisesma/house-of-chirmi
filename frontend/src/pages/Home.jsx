import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { MaskedHeading } from '../components/MaskedHeading'
import { Eyebrow } from '../components/Eyebrow'
import { Button } from '../components/Button'
import { SeedLink } from '../components/SeedLink'
import { HairlineGrid, Cell } from '../components/HairlineGrid'
import { Seed } from '../components/Seed'
import { CraftImage } from '../components/CraftImage'
import { Marquee } from '../components/Marquee'
import { useDarkHero } from '../components/LayoutContext'
import { wings } from '../config/wings'
import { packages } from '../config/studio'
import { cases } from '../config/cases'

const WordmarkBand = () => {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], [80, -140])
  return (
    <Section background="paper" flush className="py-section-y overflow-hidden">
      <div ref={ref}>
        {reduce ? (
          <div className="wordmark" aria-hidden="true">
            Chirmi <span className="accent-italic">Chirmi</span> Chirmi
          </div>
        ) : (
          <motion.div className="wordmark" aria-hidden="true" style={{ x }}>
            Chirmi <span className="accent-italic">Chirmi</span> Chirmi
          </motion.div>
        )}
        <Eyebrow className="mt-8">the seed gold was measured against</Eyebrow>
      </div>
    </Section>
  )
}

const Plate = () => {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  return (
    <section ref={ref} className="relative bg-ink h-[72svh] overflow-hidden">
      {reduce ? (
        <div className="plate-inner absolute inset-x-0 top-0">
          <CraftImage src="/images/plate-drape.webp" alt="Draped silk with gold zari catching one shaft of light" width={1600} height={1200} className="w-full h-full" imgClassName="h-full" />
        </div>
      ) : (
        <motion.div className="plate-inner absolute inset-x-0 top-0" style={{ y }}>
          <CraftImage src="/images/plate-drape.webp" alt="Draped silk with gold zari catching one shaft of light" width={1600} height={1200} className="w-full h-full" imgClassName="h-full" />
        </motion.div>
      )}
      <div className="absolute inset-0 bg-ink/20" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 px-gutter pb-10 flex items-end justify-between gap-6 text-paper">
        <Eyebrow inverted>Plate I — the drape</Eyebrow>
        <p className="display-italic-lg text-paper max-46 text-right">
          Every store has to earn the price the brand asks.
        </p>
      </div>
    </section>
  )
}

export default function Home() {
  useDarkHero(true)
  return (
    <>
      <Seo path="/" />

      {/* Hero */}
      <Section background="ink" flush className="relative min-h-[100svh] flex flex-col justify-center pt-nav-h pb-24">
        <div className="hero-glow" aria-hidden="true" />
        <div className="relative">
          <MaskedHeading
            className="h-hero max-w-[16ch]"
            lines={[
              <>We build and grow</>,
              <>
                India&rsquo;s <span className="accent-italic">craft-led</span>
              </>,
              <>brands.</>,
            ]}
          />
          <Reveal delay={0.35}>
            <p className="lede max-44 mt-10 op-74">
              Storefronts, brand, and creators — for labels selling sarees, suits, and jewellery to
              people who care how things are made.
            </p>
          </Reveal>
          <Reveal delay={0.5} className="flex flex-wrap gap-4 mt-10">
            <Button variant="scarlet" to="/work">
              See the work
            </Button>
            <Button variant="outline" to="/contact">
              Start a project
            </Button>
          </Reveal>
        </div>
        <div className="absolute inset-x-0 bottom-0 px-gutter">
          <div className="py-6 flex flex-wrap items-center gap-x-4 gap-y-2 btn-label op-82 rule-top-dark">
            <span>7 stores built and selling</span>
            <Seed inverted />
            <span>₹1,500 – ₹14,500 order values</span>
            <Seed inverted />
            <span>Handloom, Kashmiri craft, jewellery</span>
          </div>
        </div>
      </Section>

      <WordmarkBand />

      {/* Three wings */}
      <Section background="paper">
        <Reveal>
          <Eyebrow>Three wings of the house</Eyebrow>
          <h2 className="h2 mt-6 mb-14">Take one. Take all three.</h2>
        </Reveal>
        <HairlineGrid className="md:grid-cols-3">
          {wings.map((w) => (
            <Cell invert key={w.name} className="p-8 lg:p-12 flex flex-col min-h-[26rem]">
              <Eyebrow>{w.eyebrow}</Eyebrow>
              <h3 className="h3 mt-6 mb-5">{w.name}</h3>
              <p className="body-text op-82 mb-8">{w.body}</p>
              <div className="mt-auto">
                <p className="btn-label mb-5">{w.price}</p>
                <SeedLink to={w.to}>{w.linkLabel}</SeedLink>
              </div>
            </Cell>
          ))}
        </HairlineGrid>
        <p className="accent-italic display-italic-lg mt-12">
          They work alone. They work better together.
        </p>
      </Section>

      {/* Selected work */}
      <Section background="paper-deep">
        <Reveal>
          <Eyebrow>Selected work</Eyebrow>
          <h2 className="h2 mt-6 mb-14">
            Seven live. <span className="accent-italic">Still counting.</span>
          </h2>
        </Reveal>
        <Reveal>
          <Link to={`/work/${cases[0].slug}`} className="block group mb-6" data-testid="home-case-0">
            <CraftImage src={cases[0].image} alt={`${cases[0].name} storefront`} width={1600} height={700} priority />
            <div className="flex items-start justify-between gap-6 pt-6 mt-6 rule-top">
              <h3 className="h3">{cases[0].name}</h3>
              <span className="btn-label whitespace-nowrap">{cases[0].category}</span>
            </div>
            <p className="body-text op-82 mt-4">{cases[0].blurb}</p>
          </Link>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {[cases[1], cases[2]].map((c) => (
            <Reveal key={c.slug}>
              <Link to={`/work/${c.slug}`} className="block group" data-testid={`home-case-${c.slug}`}>
                <CraftImage src={c.image} alt={`${c.name} storefront`} width={800} height={1000} />
                <div className="flex items-start justify-between gap-6 pt-6 mt-6 rule-top">
                  <h3 className="h3">{c.name}</h3>
                  <span className="btn-label whitespace-nowrap">{c.category}</span>
                </div>
                <p className="body-text op-82 mt-4">{c.blurb}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Statement */}
      <Section background="ink">
        <Reveal>
          <h2 className="h2 mb-14 max-w-[18ch]">
            Most agencies have never sold a <span className="accent-italic">saree</span>.
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-10 lg:gap-20">
          <Reveal>
            <p className="body-text op-82">
              They&rsquo;ll give you a clean grid and a fast theme. What they won&rsquo;t give you is a
              collection structure built around Onam and wedding season. Or product pages that answer
              the sizing question before it kills the sale.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="body-text op-82">
              We only work with Indian craft and occasion-wear brands. That&rsquo;s the whole list. It
              means we already know your customer, your calendar, and the three reasons your cart gets
              abandoned.
            </p>
          </Reveal>
        </div>
      </Section>

      <Plate />

      {/* Origin */}
      <Section background="scarlet" className="text-center flex flex-col items-center">
        <div className="flex gap-4 mb-12 seed-md" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <Seed inverted key={i} />
          ))}
        </div>
        <Reveal className="max-w-[46rem]">
          <p className="statement text-paper mb-8">For centuries, gold was measured against a seed.</p>
          <p className="body-text text-paper mx-auto mb-8">
            The chirmi — scarlet, black-eyed, and so consistent in weight that it became the{' '}
            <span className="font-display italic">ratti</span>, the unit Indian goldsmiths used to
            weigh gold and gemstones across the subcontinent.
          </p>
          <p className="display-italic-lg text-paper">
            Small enough to lose in your palm. And still the standard.
          </p>
        </Reveal>
      </Section>

      <Section background="ink" flush className="py-16">
        <Marquee />
      </Section>

      {/* Pricing */}
      <Section background="paper">
        <Reveal>
          <Eyebrow>No discovery call required</Eyebrow>
          <h2 className="h2 mt-6 mb-6">We publish our prices.</h2>
          <p className="lede mb-14">
            Because you shouldn&rsquo;t have to sit through a call to find out whether we&rsquo;re in
            your range.
          </p>
        </Reveal>
        <HairlineGrid className="md:grid-cols-3">
          {packages.map((p) => (
            <Cell invert key={p.name} className="p-8 lg:p-12 flex flex-col min-h-[20rem]">
              <h3 className="h3 mb-4">{p.name}</h3>
              <p className="price mb-6">{p.price}</p>
              <p className="body-text op-82 mt-auto">{p.blurb}</p>
            </Cell>
          ))}
        </HairlineGrid>
      </Section>

      {/* Closing */}
      <Section background="ink" className="text-center flex flex-col items-center">
        <Reveal className="flex flex-col items-center">
          <h2 className="h2 mb-10">Tell us what you&rsquo;re building.</h2>
          <Button variant="scarlet" to="/contact">
            Start a project
          </Button>
        </Reveal>
      </Section>
    </>
  )
}
