// All site copy and prices live here. Edit this file, push to GitHub,
// and Vercel redeploys automatically. A price is typed once, here.

export const site = {
  name: 'House of Chirmi',
  url: 'https://houseofchirmi.com',
  tagline: 'Shopify storefronts and brand partnerships for Indian craft and occasion-wear brands.',
  email: 'khushisesma25@gmail.com',
  instagram: 'https://instagram.com/houseofchirmi',
  instagramLabel: '@houseofchirmi',
  whatsappNumber: '919660570279',
  whatsappLabel: '+91 96605 70279',
  location: 'India — working remotely with brands everywhere',
}

// Keep these honest. Update the numbers as they grow.
export const stats = [
  { value: '5', label: 'Storefronts live' },
  { value: '1', label: 'Brand under partnership' },
  { value: '10', label: 'Days to launch' },
]

export const navLinks = [
  { label: 'Work', to: '/work' },
  { label: 'Websites', to: '/studio' },
  { label: 'Brand partnership', to: '/brands' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const services = [
  {
    name: 'Shopify storefronts',
    tags: ['Design', 'Build', 'Launch'],
    body: 'Fast, considered stores for craft labels — built to sell at a premium price point without apology.',
    price: 'From ₹35,000',
    to: '/studio',
  },
  {
    name: 'Brand partnership',
    tags: ['Strategy', 'Content', 'Conversion'],
    body: 'We own how your brand shows up and how it converts, month to month. Content, campaigns, merchandising, and the numbers behind them.',
    price: 'From ₹22,000 / month',
    to: '/brands',
  },
]

export const packages = [
  {
    name: 'Launch',
    price: '₹35,000',
    timeline: 'Ten days',
    blurb: 'A focused storefront for a smaller range, live in ten days.',
    inclusions: ['Up to 20 products', 'Three collections', 'Policies, payments and shipping configured', 'Mobile-first build'],
  },
  {
    name: 'Growth',
    price: '₹65,000',
    timeline: 'Three weeks',
    blurb: 'A custom homepage and occasion-led collections, built to convert.',
    inclusions: ['Custom homepage', 'Occasion-led collections', 'Reviews and size guides', 'Brand story', 'Conversion-built product pages'],
  },
  {
    name: 'Signature',
    price: '₹1,10,000',
    timeline: 'Ninety days of support',
    blurb: 'The full brand narrative, with ninety days of support.',
    inclusions: ['Full brand narrative', 'Custom sections', 'Email capture flows', 'Launch assets', 'Ninety days of support'],
  },
]

export const alwaysIncluded = [
  'Mobile-first build',
  'All policy pages',
  'Payments and shipping configured',
  'Basic SEO',
  'Speed optimisation',
  'Loom walkthrough',
  '30-minute training call',
  'Full credential handover',
]

export const processSteps = [
  { title: 'Understand', body: 'One call, the right questions, everything recorded.' },
  { title: 'Structure', body: 'We agree the architecture before anyone opens a design tool.' },
  { title: 'Design', body: 'Homepage first, one round of revisions.' },
  { title: 'Build', body: 'Theme, products, apps, policies.' },
  { title: 'Quality check', body: 'Mobile, checkout, speed, forms, every link.' },
  { title: 'Hand over', body: 'Full walkthrough, full training, full access. You own everything.' },
]

export const studioFaq = [
  { q: 'How long does it take?', a: 'Ten days for Launch, three weeks for Growth, and around a month for Signature depending on how much brand work is involved.' },
  { q: 'What do you need from me?', a: 'Your product photos, your copy or a willingness to let us write it, and one call to agree the structure.' },
  { q: 'Do I own the store?', a: 'Yes. Completely. Always.' },
  { q: 'What if I need changes later?', a: 'You can make small changes yourself after the training call. For larger work, a brand partnership keeps the store growing month to month.' },
  { q: 'Do you migrate from WooCommerce or Wix?', a: 'Yes. We move your products, content and customers across, and set up redirects so you don’t lose search traffic.' },
  { q: 'What if I only have ten products?', a: 'That’s fine. Launch is built for smaller ranges, and a tight catalogue often sells better than a sprawling one.' },
]

export const monthlyWork = [
  '10–12 content assets for your feed and product pages',
  'Instagram strategy, calendar, and posting',
  'Store merchandising — collections, seasonal edits, festival campaigns',
  'Conversion work — reviews, size guides, product page copy',
  'Email and WhatsApp flows — abandoned cart, post-purchase, launches',
  'A monthly report with three things to do next',
]

export const brandTiers = [
  { name: 'Essential', price: '₹22,000', note: 'Store care, merchandising, monthly report' },
  { name: 'Growth', price: '₹35,000', note: 'Everything in Essential, plus content and Instagram' },
  { name: 'Partner', price: '₹60,000+', note: 'Full brand ownership, campaigns and flows' },
]

export const commitments = [
  { title: 'We publish our prices.', body: 'No discovery call required to find out if we’re affordable.' },
  { title: 'You own everything.', body: 'Every file, every login, every asset. Always.' },
  { title: 'We say no.', body: 'If we’re not right for your brand, we’ll tell you and point you somewhere better.' },
  { title: 'We only do one thing.', body: 'Indian craft and occasion wear. That’s the whole list.' },
]

export const needOptions = ['New Shopify store', 'Redesign / migration', 'Brand partnership', 'Not sure yet']
export const budgetOptions = ['₹35,000 — Launch', '₹65,000 — Growth', '₹1,10,000 — Signature', '₹22,000+ / month — Partnership', 'Not sure yet']

// Case studies. Only "brand" and "built" are required — "brief" and "result"
// render only when filled in. Add real numbers (AOV, conversion) as you get them.
export const cases = [
  {
    slug: 'rawish-designs',
    name: 'Rawish Designs',
    tags: ['Kashmiri craft', 'Shopify', 'Storefront'],
    meta: '₹10,500 average order value',
    url: 'https://www.rawishdesigns.com',
    image: '/images/rawish-desktop.webp',
    mobile: '/images/rawishdesigns-mobile.webp',
    blurb: 'Three named collections, a premium price point, and a buyer who needs to trust before she spends.',
    brand: 'A Kashmiri craft label selling embroidered pieces at a premium price point, to a buyer who researches before she spends.',
    brief: 'Make the price feel earned. The old store led with fabric; buyers arriving for a wedding or a festival couldn’t find their way in.',
    built: 'A storefront organised around occasion rather than material — three named collections (Bāgh-e-Firdaus, Shān-e-Mehfil, Husn-e-Waadi), trust signals surfaced early, and product pages that answer the question before it becomes a doubt.',
    result: 'A ₹10,500 average order value on a store that reads as considered, not clearance.',
  },
  {
    slug: 'lakhmanis',
    name: 'Lakhmanis',
    tags: ['Ethnic wear', 'Shopify', 'Festive'],
    meta: 'Kurtis to lehengas, ₹699 – ₹9,999',
    url: 'https://www.lakhmanis.com',
    image: '/images/lakhmanis-desktop.webp',
    mobile: '/images/lakhmanis-mobile.webp',
    blurb: 'An ethnic-wear store for everyday kurtis to festive lehengas — heritage meets modernity.',
    brand: 'An ethnic-wear label selling kurtis, suits, anarkalis, co-ord sets and lehengas — “heritage meets modernity”.',
    brief: '',
    built: 'A storefront whose navigation follows how she shops: festive and Navratri edits up front, then clear paths by silhouette — co-ords, dresses, anarkali, lehenga, short kurtis — across a wide price range.',
    result: '',
  },
  {
    slug: 'dumroo',
    name: 'Dumroo',
    tags: ['Jewellery', 'Shopify', 'Brand-led'],
    meta: 'Named collections: Chaand, Dhaara, Padma',
    url: 'https://www.shopdumroo.com',
    image: '/images/dumroo-desktop.webp',
    mobile: '/images/dumroo-mobile.webp',
    blurb: 'Jewellery for the woman who writes her own rules — an editorial store that lets the photography carry the brand.',
    brand: 'A jewellery label for the woman who writes her own rules, with a strong photographic identity and named collections.',
    brief: '',
    built: 'An editorial, image-led storefront: full-bleed campaign photography, a quiet header, and shopping paths by piece — anklets, bracelets, earrings, necklaces, rings — alongside story-led collections like Chaand, Dhaara and Padma.',
    result: '',
  },
  {
    slug: 'reba-aura',
    name: 'Reba Aura',
    tags: ['Heritage jewellery', 'Shopify', 'Large catalogue'],
    meta: '15+ categories, from haathphool to heritage watches',
    url: 'https://www.rebaaura.in',
    image: '/images/rebaaura-desktop.webp',
    mobile: '/images/rebaaura-mobile.webp',
    blurb: 'A heritage-jewellery store with a deep catalogue — necklaces, hasli, haathphool, kaanchain and heritage watches.',
    brand: 'A heritage and occasion jewellery label with a deep catalogue across traditional pieces and accessories.',
    brief: '',
    built: 'A rich, gold-on-black storefront with a two-row navigation that makes a large catalogue browsable — necklaces, earrings, hand and hair accessories, brooches, heritage watches — plus a “sale under ₹2,499” entry point for first-time buyers.',
    result: '',
  },
  {
    slug: 'kaarmugizh',
    name: 'Kaarmugizh',
    tags: ['Handloom', 'Shopify', '300+ SKUs'],
    meta: '300+ products across women, men, kids and jewellery',
    url: 'https://www.kaarmugizh.com',
    image: '/images/kaarmugizh-desktop.webp',
    mobile: '/images/kaarmugizh-mobile.webp',
    blurb: 'Four categories, festival architecture, and a review engine that turns first-time buyers into proof.',
    brand: 'A handloom label with over 300 SKUs across four categories, selling to buyers who shop by season and by festival.',
    brief: 'Give range a shape. With hundreds of products, the store needed architecture that made festival season navigable, not overwhelming.',
    built: 'Festival-led collection architecture, four clean category paths (women, men, kids, jewellery), and a jewellery line merchandised to sell alongside the saree rather than compete with it.',
    result: 'Range stopped being a liability and became the reason to come back.',
  },
]

export const getCase = (slug) => cases.find((c) => c.slug === slug)
export const getNextCase = (slug) => {
  const i = cases.findIndex((c) => c.slug === slug)
  return cases[(i + 1) % cases.length]
}

export const whatsappLink = (text) =>
  `https://wa.me/${site.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ''}`
