import { Navigate, useParams } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { MaskedHeading } from '../components/MaskedHeading'
import { Eyebrow } from '../components/Eyebrow'
import { SeedLink } from '../components/SeedLink'
import { CraftImage } from '../components/CraftImage'
import { useDarkHero } from '../components/LayoutContext'
import { getCase, getNextCase } from '../config/cases'

export default function CaseDetail() {
  useDarkHero(true)
  const { slug } = useParams()
  const c = getCase(slug)
  if (!c) return <Navigate to="/work" replace />
  const next = getNextCase(slug)

  const blocks = [
    { label: 'The brand', body: c.brand },
    { label: 'The brief', body: c.brief },
    { label: 'What we built', body: c.built },
    { label: 'The result', body: c.result },
  ]

  return (
    <>
      <Seo title={c.name} description={c.blurb} path={`/work/${c.slug}`} />

      {/* Full-bleed hero image below the nav */}
      <Section background="ink" flush className="pt-nav-h">
        <CraftImage src={c.image} alt={`${c.name} — ${c.category}`} width={1600} height={800} priority />
      </Section>

      <Section background="paper">
        <Reveal>
          <p className="eyebrow mb-6">{c.category}{c.meta ? ` — ${c.meta}` : ''}</p>
          <MaskedHeading className="h-page mb-16" lines={[c.name]} />
        </Reveal>

        <div className="hair-bottom max-w-[68ch]">
          {blocks.map((b) => (
            <Reveal key={b.label} className="hair-top py-10">
              <Eyebrow>{b.label}</Eyebrow>
              <p className="body-text op-82 mt-5">{b.body}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-6">
          <SeedLink href={c.url} external>
            Visit the live store
          </SeedLink>
          <SeedLink to={`/work/${next.slug}`}>Next — {next.name}</SeedLink>
          <SeedLink to="/work" className="op-60">
            Back to all work
          </SeedLink>
        </div>
      </Section>
    </>
  )
}
