import { Link } from 'react-router-dom'

const variants = {
  scarlet: 'btn--scarlet',
  outline: 'btn--outline',
  'outline-dark': 'btn--outline-dark',
}

export const Button = ({
  variant = 'scarlet',
  to,
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  children,
  ...rest
}) => {
  const cls = `btn ${variants[variant]} btn-label ${className}`
  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls} {...rest}>
      {children}
    </button>
  )
}
