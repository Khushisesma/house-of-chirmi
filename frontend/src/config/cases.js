// Case studies. The grid takes an arbitrary number and renders at most one
// placeholder tile; add a fourth case and the placeholder drops off.
export const cases = [
  {
    slug: 'rawish-designs',
    name: 'Rawish Designs',
    category: 'Kashmiri craft',
    meta: '\u20B910,500 AOV',
    url: 'https://rawishdesigns.com',
    image: '',
    blurb:
      'Three named collections, a premium price point, and a buyer who needs to trust before she spends. We built the storefront around occasion, not fabric.',
    brand:
      'A Kashmiri craft label selling embroidered pieces at a premium price point, to a buyer who researches before she spends.',
    brief:
      'Make the price feel earned. The old store led with fabric; buyers arriving for a wedding or a festival couldn\u2019t find their way in.',
    built:
      'A storefront organised around occasion rather than material \u2014 three named collections, trust signals surfaced early, and product pages that answer the question before it becomes a doubt.',
    result:
      'A \u20B910,500 average order value on a store that reads as considered, not clearance. The premium is no longer something to apologise for.',
  },
  {
    slug: 'kaarmugizh',
    name: 'Kaarmugizh',
    category: 'Handloom',
    meta: '300+ SKUs',
    url: 'https://kaarmugizh.com',
    image: '',
    blurb:
      'Four categories, festival architecture, and a review engine that turned first-time buyers into proof for the next one.',
    brand:
      'A handloom label with over 300 SKUs across four categories, selling to buyers who shop by season and by festival.',
    brief:
      'Give range a shape. With hundreds of products, the store needed architecture that made festival season navigable, not overwhelming.',
    built:
      'Festival-led collection architecture, four clean category paths, and a review engine that turns each first-time buyer into proof for the next.',
    result:
      'First-time buyers convert into repeat proof. Range stopped being a liability and became the reason to come back.',
  },
  {
    slug: 'the-jewellery-line',
    name: 'The jewellery line',
    category: 'Category launch',
    meta: '',
    url: 'https://kaarmugizh.com',
    image: '',
    blurb:
      'A second category built inside an existing store, merchandised to sell alongside the saree rather than compete with it.',
    brand:
      'An existing handloom store adding jewellery as a second category, without cannibalising the saree business.',
    brief:
      'Launch a category that complements the core range instead of competing with it for the same cart.',
    built:
      'A merchandising structure that pairs jewellery with the saree at the point of decision \u2014 bundles, cross-links, and occasion framing.',
    result:
      'A second category that sells alongside the first rather than against it, lifting the value of the same visit.',
  },
]

export const getCase = (slug) => cases.find((c) => c.slug === slug)
export const getNextCase = (slug) => {
  const i = cases.findIndex((c) => c.slug === slug)
  return cases[(i + 1) % cases.length]
}
