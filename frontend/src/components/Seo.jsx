import { Helmet } from 'react-helmet-async'

const SITE = 'House of Chirmi'
const DEFAULT_DESC =
  "We build and grow India's craft-led brands. Shopify storefronts, brand management, and a creator collective for Indian craft and occasion-wear labels."
const ORIGIN = 'https://houseofchirmi.com'

export const Seo = ({ title, description = DEFAULT_DESC, path = '/' }) => {
  const fullTitle = title ? `${title} — ${SITE}` : `${SITE} — We build and grow India's craft-led brands`
  const url = `${ORIGIN}${path}`
  const image = `${ORIGIN}/og.jpg`
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
