import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { MaskedHeading } from '../components/MaskedHeading'
import { Eyebrow } from '../components/Eyebrow'
import { HairlineGrid, Cell } from '../components/HairlineGrid'
import { CraftImage } from '../components/CraftImage'
import { useDarkHero } from '../components/LayoutContext'
import { cases } from '../config/cases'

export default function Work() {
  useDarkHero(true)
  const showPlaceholder = cases.length < 4
  return (
    <>
      <Seo title="Work" description="Seven live storefronts and still counting — handloom, Kashmiri craft, and jewellery brands built to sell at a premium." path="/work" />

      {/* Hero */}
      <Section background="ink" flush className="pt-nav-h pb-section-y">
        <div className="pt-24">
          <Eyebrow inverted>Selected work</Eyebrow>
          <MaskedHeading
            className="h-hero mt-6"
            lines={[<>Seven live.</>, <span className="accent-italic">Still counting.</span>]}
          />
        </div>
      </Section>

      {/* Case grid */}
      <Section background="paper" flush className="pb-section-y">
        <HairlineGrid className="md:grid-cols-2">
          {cases.map((c, i) => (
            <Cell invert key={c.slug} className="p-8 lg:p-10">
              <Link to={`/work/${c.slug}`} className="block group" data-testid={`work-case-${c.slug}`}>
                <CraftImage src={c.image} alt={`${c.name} storefront`} width={800} height={600} priority={i === 0} />
                <div className="flex items-start justify-between gap-6 mt-6">
                  <h3 className="h3">{c.name}</h3>
                  <span className="btn-label whitespace-nowrap">{c.category}</span>
                </div>
                <p className="body-text op-82 mt-4">{c.blurb}</p>
              </Link>
            </Cell>
          ))}
          {showPlaceholder && (
            <div className="tile-gradient p-8 lg:p-10 flex items-end min-h-[22rem]" aria-hidden="true">
              <p className="display-italic-lg text-paper">
                More coming — we&rsquo;re mid-build on two
              </p>
            </div>
          )}
        </HairlineGrid>
      </Section>
    </>
  )
}
