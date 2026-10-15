import { RequestCall } from '@/components/request-call';
import { SocialLinks } from '@/components/social-links';
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
        <SocialLinks items={c.items} className="mt-9" />
      </div>
    </section>
  );
}
