import { Head } from 'vite-react-ssg'
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_ALT } from '@/lib/seo'

/**
 * Every route's own title, description, canonical and social cards, in one
 * place. `vite-react-ssg`'s <Head> is a React Helmet wrapper: it writes into
 * the real <head> at prerender time, so view-source on the built HTML shows
 * these tags, not just the browser's live DOM.
 *
 * `path` is the route's path starting with '/', used to build the canonical
 * URL and the og:url. `image` defaults to the one shared OG card in
 * public/brand until per-page cards exist, see docs/GOTCHAS.md.
 */
export default function Seo({
  title,
  description,
  path,
  type = 'website',
  image = DEFAULT_OG_IMAGE,
  imageAlt = DEFAULT_OG_IMAGE_ALT,
  noindex = false,
  jsonLd,
}) {
  // NotFound has no fixed path (it catches every unmatched route), so it
  // renders without a canonical or an og:url rather than a wrong one.
  const url = path ? `${SITE_URL}${path}` : undefined
  const absoluteImage = image.startsWith('http') ? image : `${SITE_URL}${image}`
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {url && <link rel="canonical" href={url} />}
      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />

      {jsonLd && (
        // react-helmet dedupes tags that share an identical attribute set, and
        // every JSON-LD script otherwise only carries `type`. `data-seo`
        // keeps this one distinct from the sitewide Organization script that
        // SiteLayout renders, so neither one silently replaces the other.
        <script type="application/ld+json" data-seo="page">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Head>
  )
}
