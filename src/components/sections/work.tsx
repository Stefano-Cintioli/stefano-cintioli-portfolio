'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BlurFade } from '@/components/motion/blur-fade';
import type { SiteContent, ToolItem, CommsPost } from '@/content';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Work — two tabs (Tools + Communication). Impact lives in its own #impact
 * section to avoid rendering the same metrics in two places.
 *
 * Tab transitions: AnimatePresence handles the crossfade between panels.
 * Each panel reveals its children with a small stagger.
 */
export function Work({ content }: { content: SiteContent }) {
  const [active, setActive] = useState<'tools' | 'socials'>('tools');
  const reduced = useReducedMotion();

  return (
    <section
      id="work"
      className="relative border-t border-hairline scroll-mt-[var(--nav-h)]"
    >
      <div className="container max-w-6xl py-24 md:py-32">
        <BlurFade>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary mb-8">
            {content.work.kicker}
          </p>
        </BlurFade>

        <Tabs
          value={active}
          onValueChange={(v) => setActive(v as typeof active)}
          className="w-full"
        >
          <BlurFade delay={0.08}>
            <TabsList
              className={cn(
                'mb-10 h-auto p-0 bg-transparent gap-6 border-b border-hairline rounded-none w-full justify-start',
              )}
            >
              <TabTrigger value="tools" label={content.work.tabs.tools} />
              <TabTrigger value="socials" label={content.work.tabs.socials} />
            </TabsList>
          </BlurFade>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: EASE }}
            >
              <TabsContent value="tools" forceMount={active === 'tools' ? true : undefined} hidden={active !== 'tools'}>
                <ToolsGrid tools={content.work.tools} statusLabels={content.status} visitLabel={content.action.visit} />
              </TabsContent>
              <TabsContent value="socials" forceMount={active === 'socials' ? true : undefined} hidden={active !== 'socials'}>
                <CommsGrid posts={content.work.comms.posts} />
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
 * Tab trigger — underline indicator
 * ------------------------------------------------------------------------- */
function TabTrigger({ value, label }: { value: string; label: string }) {
  return (
    <TabsTrigger
      value={value}
      className={cn(
        'relative h-auto px-0 py-3 rounded-none bg-transparent shadow-none',
        'font-sans text-sm tracking-[0.005em] text-foreground/60',
        'data-[state=active]:text-foreground data-[state=active]:font-medium data-[state=active]:bg-transparent',
        'data-[state=active]:shadow-none',
        'transition-colors',
        'after:absolute after:inset-x-0 after:-bottom-px after:h-[3px]',
        'after:bg-primary after:origin-center after:transition-transform after:duration-300',
        'after:scale-x-0 data-[state=active]:after:scale-x-100',
        'hover:text-foreground hover:after:scale-x-[0.5]',
      )}
    >
      {label}
    </TabsTrigger>
  );
}

/* -------------------------------------------------------------------------
 * Tools grid — 2×2 cards
 * ------------------------------------------------------------------------- */
function ToolsGrid({
  tools,
  statusLabels,
  visitLabel,
}: {
  tools: ToolItem[];
  statusLabels: SiteContent['status'];
  visitLabel: string;
}) {
  return (
    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 list-none p-0">
      {tools.map((tool, i) => (
        <ToolCard
          key={tool.slug}
          tool={tool}
          statusLabel={statusLabels[tool.status]}
          visitLabel={visitLabel}
          index={i}
        />
      ))}
    </ul>
  );
}

function ToolCard({
  tool,
  statusLabel,
  visitLabel,
  index,
}: {
  tool: ToolItem;
  statusLabel: string;
  visitLabel: string;
  index: number;
}) {
  const reduced = useReducedMotion();
  const initial = reduced ? false : { opacity: 0, y: 14, filter: 'blur(6px)' };
  const animate = { opacity: 1, y: 0, filter: 'blur(0px)' };

  return (
    <motion.li
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: EASE }}
      className={cn(
        'group relative rounded-2xl border border-hairline bg-card text-card-foreground',
        'p-7 sm:p-8 min-h-[230px] flex flex-col gap-5',
        'transition-[border-color,transform,box-shadow] duration-300',
        'hover:border-primary hover:-translate-y-1',
        'hover:shadow-[0_24px_50px_-20px_rgba(240,185,11,0.18)]',
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-xs tracking-[0.06em] text-primary transition-colors group-hover:text-accent-hover">
          {tool.number}
        </span>
        <StatusBadge status={tool.status} label={statusLabel} />
      </div>

      <div className="flex-1">
        <h3 className="font-display text-xl sm:text-2xl font-medium leading-[1.1] tracking-tight text-foreground mb-2">
          {tool.name}
        </h3>
        <p className="text-sm sm:text-base text-fg-dim leading-relaxed">
          {tool.desc}
        </p>
      </div>

      {tool.url && (
        <div className="flex justify-end">
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${tool.name} — ${visitLabel}`}
            className="inline-flex items-center gap-1 font-mono text-xs tracking-[0.04em] text-fg-mute transition-[color,transform] duration-200 hover:text-primary group-hover:translate-x-0.5 group-hover:text-primary"
          >
            {visitLabel}
          </a>
        </div>
      )}
    </motion.li>
  );
}

function StatusBadge({
  status,
  label,
}: {
  status: 'live' | 'beta' | 'internal';
  label: string;
}) {
  const palette =
    status === 'live'
      ? 'text-primary border-primary'
      : status === 'beta'
      ? 'text-accent-hover border-accent-hover'
      : 'text-fg-mute border-hairline-2';

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded border font-mono text-[0.65rem] uppercase tracking-[0.1em]',
        palette,
      )}
    >
      {label}
    </span>
  );
}

/* -------------------------------------------------------------------------
 * Comms grid — 2×2 photo cards
 * ------------------------------------------------------------------------- */
function CommsGrid({ posts }: { posts: CommsPost[] }) {
  return (
    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 list-none p-0">
      {posts.map((post, i) => (
        <CommsCard key={post.id} post={post} index={i} />
      ))}
    </ul>
  );
}

function CommsCard({ post, index }: { post: CommsPost; index: number }) {
  const reduced = useReducedMotion();
  const initial = reduced ? false : { opacity: 0, y: 14, filter: 'blur(6px)' };
  const animate = { opacity: 1, y: 0, filter: 'blur(0px)' };

  return (
    <motion.li
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: EASE }}
      className="group"
    >
      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'block rounded-2xl overflow-hidden border border-hairline bg-card',
          'transition-[border-color,transform,box-shadow] duration-300',
          'hover:border-primary hover:-translate-y-1',
          'hover:shadow-[0_24px_50px_-20px_rgba(240,185,11,0.18)]',
        )}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-bg-2">
          <Image
            src={post.photo}
            alt={post.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-[50%_35%] transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
        <div className="p-5 sm:p-6 flex flex-col gap-2">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-fg-mute">
            <span>{post.platform}</span> · <span>{post.date}</span>
          </p>
          <p className="font-display text-lg sm:text-xl leading-[1.25] tracking-tight text-foreground flex items-start gap-2">
            <span className="flex-1">{post.topic}</span>
            <ArrowUpRight
              className="h-4 w-4 mt-1 shrink-0 text-fg-mute transition-[color,transform] duration-200 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </p>
        </div>
      </a>
    </motion.li>
  );
}
