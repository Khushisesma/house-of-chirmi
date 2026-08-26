// Shared pricing source. A price is typed once, here.
export const packages = [
  {
    name: 'Launch',
    price: '₹35,000',
    timeline: 'Ten days',
    blurb: 'A focused storefront for a smaller range, live in ten days.',
    inclusions: [
      'Up to 20 products',
      'Three collections',
      'Policies, payments and shipping configured',
      'Mobile-first build',
    ],
  },
  {
    name: 'Growth',
    price: '₹65,000',
    timeline: 'Three weeks',
    blurb: 'A custom homepage and occasion-led collections, built to convert.',
    inclusions: [
      'Custom homepage',
      'Occasion-led collections',
      'Reviews and size guides',
      'Brand story',
      'Conversion-built product pages',
    ],
  },
  {
    name: 'Signature',
    price: '₹1,10,000',
    timeline: 'Ninety days of support',
    blurb: 'The full brand narrative, with ninety days of support.',
    inclusions: [
      'Full brand narrative',
      'Custom sections',
      'Email capture flows',
      'Launch assets',
      'Ninety days of support',
    ],
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
  {
    q: 'How long does it take?',
    a: 'Ten days for Launch, three weeks for Growth, and around a month for Signature depending on how much brand work is involved.',
  },
  {
    q: 'What do you need from me?',
    a: 'Your product photos, your copy or a willingness to let us write it, and one call to agree the structure. That\u2019s the short version.',
  },
  {
    q: 'Do I own the store?',
    a: 'Yes. Completely. Always.',
    emphasis: true,
  },
  {
    q: 'What if I need changes later?',
    a: 'You can make small changes yourself after the training call. For larger work, a Brands partnership keeps the store growing month to month.',
  },
  {
    q: 'Do you migrate from WooCommerce or Wix?',
    a: 'Yes. We move your products, your content, and your customers across, and we set up redirects so you don\u2019t lose search traffic.',
  },
  {
    q: 'What if I only have ten products?',
    a: 'That\u2019s fine. Launch is built for smaller ranges, and a tight catalogue often sells better than a sprawling one.',
  },
]
