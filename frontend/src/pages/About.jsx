import { Seo } from '../components/Seo'
import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { MaskedHeading } from '../components/MaskedHeading'
import { Eyebrow } from '../components/Eyebrow'
import { Seed } from '../components/Seed'
import { HairlineGrid, Cell } from '../components/HairlineGrid'
import { CraftImage } from '../components/CraftImage'
import { useDarkHero } from '../components/LayoutContext'
import { commitments, founderPortrait } from '../config/about'

const scatterOffsets = ['mt-0', 'mt-6', 'mt-2', 'mt-10', 'mt-4']

export default function About() {
  useDarkHero(true)
  return (
    <>
      <Seo title="About" description="For centuries, Indian goldsmiths weighed gold against the chirmi seed. A small thing that became the standard other valuable things were measured against." path="/about" />

      {/* Hero */}
      <Section background="scarlet" flush className="min-h-[100svh] flex flex-col justify-center pt-nav-h pb-section-y">
        <div className="flex gap-5 mb-14 seed-lg" aria-hidden="true">
          {scatterOffsets.map((cls, i) => (
            <span key={i} className={cls}>
              <Seed inverted />
            </span>
          ))}
        </div>
        <MaskedHeading
          className="h-hero max-w-[16ch]"
          lines={[<>The thing gold</>, <>was measured against.</>]}
        />
        <Reveal delay={0.35} className="mt-12 max-w-[62ch]">
          <p className="body-text text-paper mb-8">
            For centuries, Indian goldsmiths weighed gold against the chirmi seed. Scarlet,
            black-eyed, and so consistent in weight that it became the{' '}
            <span className="font-display italic">ratti</span> — the unit for measuring gold and
            gemstones across the subcontinent.
          </p>
          <p className="display-italic-lg text-paper">
            A seed you could lose in your palm, and it was the standard.
          </p>
        </Reveal>
      </Section>

      {/* Ratti fact, set as type */}
      <Section background="paper" className="text-center flex flex-col items-center">
        <div className="mb-8 seed-xl" aria-hidden="true">
          <Seed />
        </div>
        <p className="eyebrow track-wide">
          1 ratti · 0.12 g · the seed gold was weighed against
        </p>
      </Section>

      {/* Story */}
      <Section background="paper" flush className="pb-section-y">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-20">
          <Reveal>
            <p className="body-text op-82">
              House of Chirmi started with one store, built for a brand that deserved better than a
              template. Then another. Seven now, across handloom, Kashmiri craft, and jewellery.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="body-text op-82">
              Along the way it became clear that a beautiful store isn&rsquo;t enough. The brands
              that grow are the ones with a story, a content engine, and people who&rsquo;ll wear the
              thing and be seen wearing it. So we built those too.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Commitments */}
      <Section background="paper-deep">
        <Reveal>
          <Eyebrow>What we hold to</Eyebrow>
          <h2 className="h2 mt-6 mb-14">Four commitments.</h2>
        </Reveal>
        <HairlineGrid className="md:grid-cols-2">
          {commitments.map((c) => (
            <Cell invert key={c.title} className="bg-paper-deep p-8 lg:p-12 flex items-start gap-4 min-h-[14rem]">
              <span className="mt-[0.4em]"><Seed /></span>
              <div>
                <h3 className="h3 mb-3">{c.title}</h3>
                <p className="body-text op-82">{c.body}</p>
              </div>
            </Cell>
          ))}
        </HairlineGrid>
      </Section>

      {/* Founder */}
      <Section background="ink">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-center">
          <Reveal>
            <div className="square max-w-[30rem]">
              <CraftImage src={founderPortrait} alt="Founder of House of Chirmi" width={1000} height={1000} className="w-full h-full" imgClassName="h-full" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="body-text op-82 text-paper mb-8">
              I started this because good craft kept getting sold like it had something to apologise
              for. It doesn&rsquo;t. It just needs a store that knows the customer, the calendar, and
              the craft.
            </p>
            <p className="body-text op-82 text-paper mb-8">
              We keep the list short on purpose — Indian craft and occasion wear, nothing else — so
              that every store we build starts from something we already understand.
            </p>
            <p className="display-italic-lg text-paper">House of Chirmi</p>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
