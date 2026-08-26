import { Link } from 'react-router-dom'
import { Seed } from './Seed'

export const SeedLink = ({ to, href, external = false, inverted = false, className = '', children, ...rest }) => {
  const inner = (
    <>
      <span>{children}</span>
      <Seed inverted={inverted} />
    </>
  )
  if (external || href) {
    return (
      <a
        href={href}
        className={`seedlink ${className}`}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        {...rest}
      >
        {inner}
      </a>
    )
  }
  return (
    <Link to={to} className={`seedlink ${className}`} {...rest}>
      {inner}
    </Link>
  )
}
