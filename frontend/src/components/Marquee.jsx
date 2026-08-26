import { Seed } from './Seed'

const items = ['Handloom', 'Kashmiri craft', 'Jewellery', 'Occasion wear', 'Bridal']

const Group = () => (
  <span className="marquee-group inline-flex items-center">
    {items.map((it, i) => (
      <span key={i} className="inline-flex items-center">
        <span className="accent-italic" style={{ color: 'var(--paper)', fontSize: 'clamp(1.6rem, 4vw, 3rem)', padding: '0 0.5em' }}>
          {it}
        </span>
        <span style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)' }}>
          <Seed inverted />
        </span>
      </span>
    ))}
  </span>
)

export const Marquee = () => (
  <div className="marquee" aria-hidden="true">
    <div className="marquee-track">
      <Group />
      <Group />
    </div>
  </div>
)
