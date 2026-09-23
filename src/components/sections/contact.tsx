import { RequestCall } from '@/components/request-call';
import { SocialGlyph } from '@/components/social-glyph';
import type { SiteContent } from '@/content';
export function Contact({ content }: { content: SiteContent }) {
  const c = content.contact;
  return (
    <section id="contact" aria-labelledby="contact-heading" className="section-space">
      <div className="container max-w-6xl text-center">
        <hr className="mb-10 border-0 border-t border-hairline-2 sm:mb-14" />
        <h2 id="contact-heading" className="section-title">{c.heading}</h2>
        <p className="mx-auto mb-7 mt-5 max-w-[52ch] text-base leading-relaxed text-fg-dim">{c.body}</p>
        <RequestCall copy={content.requestForm} />
        <ul className="mt-9 flex flex-wrap justify-center gap-3">
          {c.items.map(item => <li key={item.kind}><a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined} aria-label={item.label} title={item.label} className="social-link group"><SocialGlyph kind={item.kind} className="h-[22px] w-[22px]" /><span aria-hidden="true" className="social-tooltip">{item.label}</span></a></li>)}
        </ul>
      </div>
    </section>
  );
}
