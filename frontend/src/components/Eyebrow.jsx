import { Seed } from './Seed'

export const Eyebrow = ({ inverted = false, className = '', children }) => (
  <div className={`eyebrow-row ${className}`}>
    <Seed inverted={inverted} />
    <span className="eyebrow">{children}</span>
  </div>
)
