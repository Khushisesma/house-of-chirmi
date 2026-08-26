const grounds = {
  paper: 'bg-paper text-ink',
  'paper-deep': 'bg-paper-deep text-ink',
  ink: 'bg-ink text-paper',
  'ink-soft': 'bg-ink-soft text-paper',
  scarlet: 'bg-scarlet text-paper',
}

export const Section = ({
  background = 'paper',
  flush = false,
  id,
  className = '',
  children,
  as: Tag = 'section',
}) => (
  <Tag
    id={id}
    className={`${grounds[background]} px-gutter ${flush ? '' : 'py-section-y'} ${className}`}
  >
    {children}
  </Tag>
)
