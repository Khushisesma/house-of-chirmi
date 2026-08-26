import { useState } from 'react'

export const CraftImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  imgClassName = '',
}) => {
  const [err, setErr] = useState(false)
  const showFallback = err || !src
  if (showFallback) {
    return (
      <div
        className={`craft-fallback ${className}`}
        role="img"
        aria-label={alt}
        style={{ aspectRatio: `${width} / ${height}` }}
      />
    )
  }
  return (
    <div className={`craft-img-wrap ${className}`} style={{ aspectRatio: `${width} / ${height}` }}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`craft-img ${imgClassName}`}
        loading={priority ? 'eager' : 'lazy'}
        fetchpriority={priority ? 'high' : undefined}
        decoding={priority ? undefined : 'async'}
        onError={() => setErr(true)}
      />
    </div>
  )
}
