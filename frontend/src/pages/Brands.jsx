import { Seo } from '../components/Seo'
import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { MaskedHeading } from '../components/MaskedHeading'
import { Eyebrow } from '../components/Eyebrow'
import { Button } from '../components/Button'
import { Seed } from '../components/Seed'
import { HairlineGrid, Cell } from '../components/HairlineGrid'
import { useDarkHero } from '../components/LayoutContext'
import { monthlyWork, brandTiers } from '../config/brands'

export default function Brands() {
  useDarkHero(false)
  return (
    <>
      <Seo title="Brands" description="Monthly brand partnerships for craft labels that have a store and need it to grow. From ₹22,000 per month." path="/brands" />

      {/* Hero */}
      <Section background="paper" flush className="pt-nav-h pb-section-y">
        <div className="pt-24">
          <MaskedHeading
            className="h-page max-w-[16ch]"
            lines={[<>Someone has to own</>, <>the brand. Let it be us.</>]}
          />
          <Reveal delay={0.3}>
            <p className="lede mt-10">
              Monthly partnerships for craft labels that have a store and need it to grow.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* The maths */}
      <Section background="scarlet" id="maths" className="text-center flex flex-col items-center">
        <div className="flex gap-4 mb-12 seed-md" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <Seed inverted key={i} />
          ))}
        </div>
        <Reveal className="max-w-[44rem]">
          <p className="statement text-paper mb-8">
            If your average order is ₹10,000, a ₹35,000 partnership needs four extra orders to pay
            for itself.
          </p>
          <p className="display-italic-lg text-paper">
            That&rsquo;s the entire business case. Everything below is how we get there.
          </p>
        </Reveal>
      </Section>

      {/* What we do each month */}
      <Section background="paper" id="monthly">
        <Reveal>
          <Eyebrow>Every month</Eyebrow>
          <h2 className="h2 mt-6 mb-14">Six things, every month.</h2>
        </Reveal>
        <HairlineGrid className="md:grid-cols-2 lg:grid-cols-3">
          {monthlyWork.map((item) => (
            <Cell invert key={item} className="p-8 lg:p-10 flex items-start gap-4 min-h-[12rem]">
              <span className="mt-[0.4em]"><Seed /></span>
              <p className="body-text">{item}</p>
            </Cell>
          ))}
        </HairlineGrid>
      </Section>

      {/* Tiers */}
      <Section background="paper-deep" id="tiers">
        <Reveal>
          <h2 className="h2 mb-14">Monthly, from ₹22,000.</h2>
        </Reveal>
        <HairlineGrid className="md:grid-cols-3">
          {brandTiers.map((t) => (
            <Cell key={t.name} className="bg-paper-deep p-8 lg:p-10">
              <h3 className="h3 mb-4">{t.name}</h3>
              <p className="price mb-1">{t.price}</p>
              <p className="eyebrow">per month</p>
            </Cell>
          ))}
        </HairlineGrid>
        <p className="display-italic-lg mt-10">All monthly. Three-month minimum.</p>
      </Section>

      {/* What we don't do */}
      <Section background="ink">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-20">
          <Reveal>
            <p className="statement">
              We don&rsquo;t post for the sake of posting. We don&rsquo;t chase follower counts.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="body-text op-82">
              We don&rsquo;t send you a report full of impressions and call it growth. If the number
              that matters isn&rsquo;t moving, we&rsquo;ll tell you and we&rsquo;ll change what
              we&rsquo;re doing.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Close */}
      <Section background="paper" className="text-center flex flex-col items-center">
        <Reveal className="flex flex-col items-center">
          <h2 className="h2 mb-4">Let&rsquo;s look at your numbers.</h2>
          <p className="eyebrow mb-10">Free. Thirty minutes.</p>
          <Button variant="scarlet" to="/contact">
            Book a brand review
          </Button>
        </Reveal>
      </Section>
    </>
  )
}
