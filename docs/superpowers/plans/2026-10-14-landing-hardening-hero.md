# Landing hardening and hero implementation plan

Goal: implement Stefano's October 14 brief on feat/landing-hardening-hero, then deliver a PR and Vercel preview for approval before merging.

Approved correction: preserve Request a call and FormSubmit; do not restore Calendly booking. Preserve existing localized copy apart from the requested hero structure/About removal. Shared social data is contact.items, including the intentional BNB Chain mailto.

1. Capture three production-build mobile Lighthouse runs and one desktop run before edits. Keep supplied 73/3.5s/660ms as user-reported until measured independently.
2. Build centered server-rendered hero: derived crop of existing Peru photo, 160/200px image priority+fetchPriority+AVIF/WebP, name H1, existing role, request button, shared SocialLinks. Photo never animates. Text reveal uses CSS; mobile/reduced-motion background is CSS. Desktop Paper mesh imports after photo paint/load and idle, pauses off-screen/hidden.
3. Remove About component, navigation targets and translations; preserve metadata/hreflang/sitemap. Propose unique removed TradFi copy in PR only.
4. Reduce initial client work: defer request dialog until clicked, below-fold module imports until visible while retaining server HTML, remove unnecessary Framer runtime, pass only UI strings rather than importing every locale into header clients. Tighten image sizes and label/title accessibility.
5. Security: common headers in next.config, enforced frame-ancestors none only; broader CSP report-only uses build-time hashes of actual prerendered inline scripts to retain static/CDN performance. Postbuild patches the generated route header manifest and fails if unsupported adapter output exists. Permit FormSubmit connect-src and inline styles needed by existing UI/Paper; no blob/worker permissions unless actual source requires them. Secure locale cookie; retain JS access if next-intl reads/writes it. Preserve HSTS.
6. Run build/typecheck, focused automated header/hash checks, integrated-browser visual checks at360/768/1440, all locales/themes/form open+validation/keyboard, reduced motion and shader lifecycle. No unapproved real email submissions.
7. Run comparable after Lighthouse, then push feature branch and create PR. Verify actual Vercel preview headers, Secure cookie, CSP hashes against returned inline scripts, no first-party report-only violations, and preview Lighthouse. Attach screenshots and measured results. STOP for explicit merge approval.
