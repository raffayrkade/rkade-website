/**
 * One image from src/data/work.js, rendered with the intrinsic pixel
 * dimensions carried on the data object as native width/height attributes.
 * That is what keeps CLS at 0.00: the browser reserves the right amount of
 * space before the file has even started downloading, so nothing shifts
 * once it lands.
 *
 * Every image on the Work pages sits below the fold (the hero above it is
 * text only and always taller than one screen), so nothing here is a real
 * LCP candidate. All of them lazy load. If a future page ever puts one of
 * these above the fold, pass `priority` and it switches to eager loading
 * with a high fetch priority, but that is not exercised today.
 */
export default function WorkImage({ image, tone = 'cream', priority = false, className = '' }) {
  if (!image) return null
  const { src, alt, width, height } = image

  const border = tone === 'cream' ? 'border-line-strong' : 'border-cream/15'

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      // Lowercase on purpose. react-dom@18.3.1 (the version this project is
      // actually pinned to) does not yet know the camelCase `fetchPriority`
      // prop and warns it straight into the SSR output if used, confirmed by
      // running the prerender build. eslint-plugin-react assumes a newer
      // React that does support it, so this line disables that one rule
      // rather than reintroducing the warning to satisfy it.
      // eslint-disable-next-line react/no-unknown-property
      fetchpriority={priority ? 'high' : 'auto'}
      className={`h-auto w-full rounded border ${border} ${className}`}
    />
  )
}
