/**
 * Twitter card image — identical to the OG image. Next.js wants a separate
 * file at this name so the <meta name="twitter:image"> tag is emitted; the
 * actual generator is shared.
 */
export {
  default,
  alt,
  size,
  contentType,
  generateImageMetadata,
} from './opengraph-image';
