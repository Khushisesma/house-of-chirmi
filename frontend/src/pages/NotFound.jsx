import { Seo } from '../components/Seo'
import { Section } from '../components/Section'
import { MaskedHeading } from '../components/MaskedHeading'
import { SeedLink } from '../components/SeedLink'
import { useDarkHero } from '../components/LayoutContext'

export default function NotFound() {
  useDarkHero(true)
  return (
    <>
      <Seo title="Not found" description="This page isn't here — but the studio, brands, and collective are." path="/404" />
      <Section background="ink" flush className="min-h-[100svh] flex flex-col justify-center pt-nav-h pb-section-y">
        <MaskedHeading className="h-page mb-16" lines={[<>This one</>, <>isn&rsquo;t here.</>]} />
        <div className="flex flex-col gap-6">
          <SeedLink to="/studio" inverted>
            The Studio
          </SeedLink>
          <SeedLink to="/brands" inverted>
            Brands
          </SeedLink>
          <SeedLink to="/collective" inverted>
            The Collective
          </SeedLink>
        </div>
      </Section>
    </>
  )
}
