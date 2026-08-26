export const HairlineGrid = ({ dark = false, className = '', children }) => (
  <div className={`hairline-grid ${dark ? 'hairline-grid--dark' : ''} ${className}`}>
    {children}
  </div>
)

export const Cell = ({ invert = false, className = '', children, ...rest }) => (
  <div className={`cell ${invert ? 'cell--invert' : ''} ${className}`} {...rest}>
    {children}
  </div>
)
