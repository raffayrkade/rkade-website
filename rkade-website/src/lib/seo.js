// Single source for site-wide SEO facts. Every page's <Seo> reads from here
// so the domain, the brand name and the fallback image only ever live in one
// place. See src/components/common/Seo.jsx for how these get rendered.

export const SITE_URL = 'https://rkade.co'
export const SITE_NAME = 'RKade'
export const DEFAULT_OG_IMAGE = '/brand/og-image.png'
export const DEFAULT_OG_IMAGE_ALT = 'RKade. We build the system. You close the clients.'

// The Organization entry, rendered once, sitewide, from SiteLayout. Social
// profiles that are still 'PLACEHOLDER' in CTAButtons.jsx are left out of
// sameAs rather than shipped as broken links, matching the rule in
// docs/CONVENTIONS.md that a placeholder never renders as a real link.
export function organizationJsonLd({ instagram, linkedin }) {
  const sameAs = [instagram, linkedin].filter((link) => link && link !== 'PLACEHOLDER')

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/arch-mark.svg`,
    email: 'contact@rkade.co',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  }
}
