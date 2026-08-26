// Pure-CSS reveal-on-load. Resting state is visible; the fade-up plays once via
// CSS (backwards fill) so content is never left hidden by a hydration race.
export const Reveal = ({ delay = 0, className = '', as: Tag = 'div', children }) => (
  <Tag className={`reveal-up ${className}`} style={{ animationDelay: `${delay}s` }}>
    {children}
  </Tag>
)
