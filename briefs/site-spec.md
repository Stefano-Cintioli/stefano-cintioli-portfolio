# Stefano Cintioli — Personal Site Spec

Source of truth for the build. Claude Code reads this before generating anything.

---

## 1. Audience & purpose

External, hire-me document. Primary visitor: Head of Ecosystem / Head of Growth / Head of BD at competing Web3 chains (Solana, Polygon, Avalanche, Sui, Monad, etc.) evaluating recruitment. Secondary: Web3-native VCs scouting regional operators. Tertiary: founders seeking to work with Stefano.

Must survive a future role change. BNB Chain is the current chapter, not the identity.

---

## 2. Visual register

Polished restraint. Reference: Linear, Pitch.com marketing site. Not Karpathy-sparse, not agency-portfolio. Editorial typography, generous whitespace, one accent color, restrained motion (smooth scroll, subtle hover states only). No parallax, no custom cursor, no splash screen, no count-up, no reveal-on-scroll. Fast loads. Dense info per scroll.

Archetype selection: Claude Code reads `~/.claude/skills/premium-website/reference/02-archetypes.md` and proposes 2-3 archetypes matching this register. User picks before build starts.

---

## 3. Language

Full trilingual EN / ES / PT. Language toggle in header. Single source of truth: `content.json` with `en` / `es` / `pt` keys per copy field. EN is the default load.

---

## 4. Structure (5 sections, single page, no sub-pages)

### 4.1 Hero (full viewport)

- Eyebrow: `Argentina · LatAm · Global Web3`
- Headline: `Bridging LatAm builders with the global Web3 ecosystem.`
- Sub: one line on current role + posture (manual edit at build time)
- Single CTA: `Get in touch` → `mailto:stefano.cintioli@bnbchain.org`
- One photo: `assets/Binance Day Peru.jpg` (needs WebP compression via skill)
- Tab deep-link anchors enabled (`#tools`, `#impact`, `#socials`)

### 4.2 Currently (one paragraph)

Manually updated. First version:
> "Currently running BNB Chain's LatAm community and BD pipeline from Buenos Aires. Routing regional projects toward stables, payments, AI, and RWA verticals. Co-developing BNB Dojo as a global builder-engagement layer. Always open to builders, founders, and operators working on the region."

Large italic, generous whitespace, no photo.

### 4.3 Work (3 tabs)

Tabs at the top of the section. Click to switch. Deep-linkable via URL anchors.

**Tab 1 — Tools**

Five live tools, each as a small card with: name, one-line description, link (or "Internal" badge if no public URL), status (Live / Beta).

1. **BNB Dojo** — Mobile-first gamified Web3 learning platform. Trilingual ES/PT/EN. Belt-rank system. → `https://bnb-dojo-v2.vercel.app/home` (Beta)
2. **Daily Intelligence Briefing Agent** — Structured daily ecosystem briefings via Telegram + Gmail. Groq + LLaMA 3. (Internal)
3. **Content Amplification Tool** — Internal tool to coordinate KOL/ambassador amplification. → `https://content-amp-tool.vercel.app` (Live)
4. **Presentations Stack + Brand Kit** — BNB Chain brand-compliant slide templates and event assets. → `https://github.com/stefanocintioli-bot/bnb-chain-v0` (Live)
5. **Ambassador Program Automation** — Cross-functional contribution to Guild ops infrastructure. (Internal)

**Tab 2 — Impact**

Dashboard layout. Three rows of four numbers each. Each number with a one-line label that includes time context.

Row 1:
- `5` projects live on BNB Chain mainnet (H1 2026)
- `19+` BD leads sourced and routed (6 months)
- `22+` activations across the region
- `8` countries activated (Argentina, Brazil, Peru, Venezuela, Paraguay, Chile, Mexico, Spain)

Row 2:
- `76.3K` X impressions in 6 months, all organic
- `476` followers from <100, organic, zero paid
- `6` AMAs and Spaces executed
- `30+` beta users testing BNB Dojo v2

Row 3:
- `+462` Telegram members in less than 6 months
- `1,654` organic messages across community channels
- `25+` KOL and builder 1-1s across the region
- `5` internal tools shipped during the role

Below the numbers: photo strip with 4 photos. Each photo clickable, opens recap link in new tab. Recap links empty (`#`) at v1 — user fills later.

Photos (in order):
1. `assets/Binance Day Peru.jpg` — Binance Day Perú, May 2026
2. `assets/Vendimia Workshop.jpg` — VendimiaTech Hackathon, Mendoza
3. `assets/Crecimiento Workshop.jpeg` — Crecimiento Workshop, Buenos Aires + Lima
4. `assets/UniversityTour Panel.jpg` — Binance University Tour, UTN Buenos Aires

NO logos strip. NO testimonials. NO event-by-event copy.

**Tab 3 — Socials & Comms**

3-4 featured posts/threads as text cards (not screenshots — screenshots age badly). Per card: post topic in one line, platform, date, link. Plus social handles at the top of the tab.

Cards are manually curated. v1 ships with placeholder entries — user fills in 4 real posts post-launch.

### 4.4 How I Think & Operate (4 principles)

Vertical stack, full width, generous whitespace between. Numbered 01–04. Principle title in editorial weight, body in serif. No photos. No effects.

**01. First filter for the region.**
LatAm doesn't have a discovery problem. It has a signal problem. My job is to find serious builders in the region and route them to the right vertical owner inside BNB Chain BD (stables, payments, AI, RWAs) before noise reaches them. Warm referral over cold pitch.

**02. Builders, not banners.**
The budget goes where the builders are. Technical tracks, workshops, bounties, direct project migrations. Not vanity sponsorship tiers and not stages with twenty logos on them.

**03. Build what the work needs.**
The job comes with a fixed budget and a moving target. When the right tool doesn't exist, the only honest move is to build it. AI-assisted development makes this faster than waiting for it to arrive. The ceiling of what a community team produces is set by the tools it has access to. Some of those tools, the team has to ship themselves.

**04. Show up. Stay. Build alongside.**
Regional ecosystems take years, not quarters. Repeat hackathons, repeat conferences, repeat conversations with the same builders. The job isn't to broadcast at them. It's to sit next to them, hear what they need, build the path with them. Without builders, no ecosystem. Without showing up, no trust. By year three you stop being a visitor and start being the room.

### 4.5 Contact

Large type. Four channels with icons:
- Email: `stefano.cintioli@bnbchain.org`
- X: `@s_cintioli_`
- LinkedIn: `linkedin.com/in/stefanocintioli`
- Telegram: handle TBC at build time

---

## 5. Tech

- Static HTML/CSS/JS via the premium-website skill (Adrian Saenz)
- No build step, no npm, no framework
- Local libraries (GSAP, Lenis on opt-in only — restrained register suggests skip)
- WebP for all images (Binance Day Peru and UniversityTour need compression — skill handles)
- Photos source: `assets/` (already populated)
- Logos source: `assets/logos/` (BNB Chain marks for header/footer only — no project-logos strip)
- Deploy: Vercel free subdomain for v1
- GitHub repo: `stefanocintioli-bot/stefano-cintioli-portfolio` (to be created)

---

## 6. Out of scope for v1

- Logos strip showing routed projects
- Testimonials section
- Event-by-event copy
- Marquee case study sub-pages
- Custom domain (defer to v2)
- Auto-pulled live X feed
- Tool screenshots (badges and descriptions only)

---

## 7. Skill-specific notes

The premium-website skill's intake template asks 5 questions (brand name, photos, CTA, must-haves, pages). All answers are pre-filled here so the skill skips intake entirely. Specifically:

- Brand name: Stefano Cintioli
- Photos: user-supplied, already in `assets/`
- CTA: single, email
- Pages: one page
- Must-haves: trilingual toggle, 3-tab Work section, photo strip with click-to-recap, polished-restrained register

Claude Code reads `~/.claude/skills/premium-website/reference/02-archetypes.md` and `~/.claude/skills/premium-website/reference/03-effects-catalog.md` before proposing archetypes. The chosen archetype must avoid: parallax, custom cursors, splash screens, count-up animations, reveal-on-scroll. Allowed: smooth scroll, subtle hover states, tab transitions.
