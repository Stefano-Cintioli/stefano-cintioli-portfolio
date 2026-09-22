import { EnvelopeSimple, XLogo, LinkedinLogo, TelegramLogo, GithubLogo } from '@phosphor-icons/react/dist/ssr';
import type { ContactItem } from '@/content';

/** Consistent brand glyphs from the existing icon package. Names live on links. */
export function SocialGlyph({ kind, className }: { kind: ContactItem['kind']; className?: string }) {
  const Icon = { email: EnvelopeSimple, x: XLogo, linkedin: LinkedinLogo, telegram: TelegramLogo, github: GithubLogo }[kind];
  return <Icon className={className} weight={kind === 'email' ? 'regular' : 'fill'} aria-hidden="true" />;
}
