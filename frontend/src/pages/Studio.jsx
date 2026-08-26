import { Seo } from '../components/Seo'
import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { MaskedHeading } from '../components/MaskedHeading'
import { Eyebrow } from '../components/Eyebrow'
import { Button } from '../components/Button'
import { Seed } from '../components/Seed'
import { HairlineGrid, Cell } from '../components/HairlineGrid'
import { Accordion } from '../components/Accordion'
import { useDarkHero } from '../components/LayoutContext'
import { packages, alwaysIncluded, processSteps, studioFaq } from '../config/studio'

export default function Studio() {
  useDarkHero(false)
  return (
    <>
      <Seo title="Studio" description="Shopify storefronts for Indian craft and occasion-wear labels. Seven live and selling. From ₹35,000." path="/studio" />

      {/* Hero */}
      <Section background="paper" flush className="pt-nav-h pb-section-y">
        <div className="pt-24">
          <MaskedHeading
            className="h-page max-w-[18ch]"
            lines={[<>Storefronts for brands</>, <>worth the price they ask.</>]}
          />
          <Reveal delay={0.3}>
            <p className="lede mt-10">
              We build Shopify stores for Indian craft and occasion-wear labels. Seven live and
              selling.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* The problem */}
      <Section background="paper">
        <Reveal className="max-w-[62ch]">
          <p className="statement mb-8">
            A ₹10,500 lehenga and a ₹1,500 cotton saree do not sell the same way.
          </p>
          <p className="body-text op-82">
            One needs trust signals, sizing confidence, and a story. The other needs speed, range,
            and festival urgency. Most templates treat them identically. That&rsquo;s the difference
            between a store that looks fine and a store that sells.
          </p>
        </Reveal>
      </Section>

      {/* Packages */}
      <Section background="paper-deep" id="packages">
        <Reveal>
          <Eyebrow>Packages</Eyebrow>
          <h2 className="h2 mt-6 mb-14">Three ways in.</h2>
        </Reveal>
        <HairlineGrid className="md:grid-cols-3">
          {packages.map((p) => (
            <Cell key={p.name} className="bg-paper-deep p-8 lg:p-10 flex flex-col">
              <h3 className="h3 mb-4">{p.name}</h3>
              <p className="price mb-2">
                {p.price}
              </p>
              <p className="eyebrow mb-8">{p.timeline}</p>
              <ul className="space-y-4 mt-auto">
                {p.inclusions.map((inc) => (
                  <li key={inc} className="flex items-start gap-3 body-text">
                    <span className="mt-[0.5em]"><Seed /></span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </Cell>
          ))}
        </HairlineGrid>
      </Section>

      {/* Always included */}
      <Section background="paper">
        <Reveal>
          <Eyebrow>Always included</Eyebrow>
          <h2 className="h2 mt-6 mb-12">Every build, no exceptions.</h2>
        </Reveal>
        <ul className="hair-bottom">
          {alwaysIncluded.map((item) => (
            <li key={item} className="hair-top flex items-center gap-4 py-5 body-text">
              <Seed />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Process */}
      <Section background="ink" id="process">
        <Reveal>
          <h2 className="h2 mb-14 max-w-[16ch]">Six steps, because the order matters.</h2>
        </Reveal>
        <HairlineGrid dark className="md:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, i) => (
            <div key={step.title} className="bg-ink p-8 lg:p-10">
              <p className="process-num mb-6">
                {i + 1}
              </p>
              <h3 className="h3 mb-4 text-paper">{step.title}</h3>
              <p className="body-text op-82 text-paper">{step.body}</p>
            </div>
          ))}
        </HairlineGrid>
      </Section>

      {/* Questions */}
      <Section background="paper" id="questions">
        <Reveal>
          <h2 className="h2 mb-12">Answered plainly.</h2>
        </Reveal>
        <Accordion items={studioFaq} />
        <div className="mt-16">
          <Button variant="outline-dark" to="/contact">
            Start a project
          </Button>
        </div>
      </Section>
    </>
  )
}
