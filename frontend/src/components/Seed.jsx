export const Seed = ({ inverted = false, className = '' }) => (
  <span aria-hidden="true" className={`seed ${inverted ? 'seed--inv' : ''} ${className}`} />
)
