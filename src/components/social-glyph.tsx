import { Mail } from 'lucide-react';

/**
 * Shared social-icon glyphs used by the #contact section and the footer.
 * Outlines only (current color via stroke="currentColor") so the surrounding
 * container controls the color in both light and dark themes.
 */
export function SocialGlyph({
  kind,
  className,
}: {
  kind: 'email' | 'x' | 'linkedin' | 'telegram';
  className?: string;
}) {
  if (kind === 'email') {
    return <Mail className={className} aria-hidden="true" />;
  }
  if (kind === 'x') {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M4 4l16 16M20 4L4 20" />
      </svg>
    );
  }
  if (kind === 'linkedin') {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <line x1="8" y1="11" x2="8" y2="17" />
        <circle cx="8" cy="7.5" r="0.7" fill="currentColor" />
        <path d="M12 17v-4a2.5 2.5 0 0 1 5 0v4" />
        <line x1="12" y1="11" x2="12" y2="17" />
      </svg>
    );
  }
  // telegram
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 11.5l17-7-3 16-6-5-2 5-1-6 11-8" />
    </svg>
  );
}
