/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        paper: 'var(--paper)',
        'paper-deep': 'var(--paper-deep)',
        scarlet: 'var(--scarlet)',
        clay: 'var(--clay)',
        gold: 'var(--gold)',
        graphite: 'var(--graphite)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
      },
      spacing: {
        gutter: 'var(--gutter)',
        'section-y': 'var(--section-y)',
        'nav-h': 'var(--nav-h)',
      },
      maxWidth: {
        site: '1600px',
      },
    },
  },
  plugins: [],
}
