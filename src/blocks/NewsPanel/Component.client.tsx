'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import type { Media } from '@/payload-types'
import { Media as MediaComponent } from '@/components/Media'
import { cn } from '@/utilities/ui'

// ─── Shared types ─────────────────────────────────────────────────────────────

export interface ClientPost {
  id: number
  title: string
  slug: string
  publishedAt?: string | null
  heroImage?: Media | null
  metaImage?: Media | null
}

interface Props {
  featured: ClientPost
  articles: ClientPost[]
  eyebrow?: string | null
  eyebrowSub?: string | null
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string | null | undefined): string {
  if (!iso) return ''
  return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' })
    .format(new Date(iso))
    .toUpperCase()
}

function postHref(slug: string) {
  return `/posts/${slug}`
}

// ─── Arrow Badge ──────────────────────────────────────────────────────────────

function ArrowBadge({ size = 40 }: { size?: number }) {
  const icon = Math.round(size * 0.5)
  return (
    <span
      className="rounded-full bg-white/15 flex items-center justify-center flex-none"
      style={{ width: size, height: size }}
    >
      <svg width={icon} height={icon} viewBox="0 0 20 20" fill="none" aria-hidden>
        <path
          d="M7.5 5L12.5 10L7.5 15"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

// ─── News Row (small card) ────────────────────────────────────────────────────

function NewsRow({ post }: { post: ClientPost }) {
  const [hovered, setHovered] = useState(false)
  const bgImage = post.heroImage ?? post.metaImage ?? null
  const date = formatDate(post.publishedAt)

  return (
    <Link
      href={postHref(post.slug)}
      className={cn(
        'relative h-[129px] overflow-hidden block',
        'border border-primary rounded-sm',
        'transition-shadow duration-[220ms] ease-out',
        hovered &&
          'shadow-[2px_2px_80px_color-mix(in_oklab,var(--color-accent)_60%,transparent)]',
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {bgImage && (
        <div className="absolute inset-0">
          <MediaComponent fill resource={bgImage} imgClassName="object-cover" />
        </div>
      )}
      <div className="absolute inset-0 bg-black/50" />

      <div
        className="absolute left-7 right-20 font-franklin font-semibold tracking-[0.07em] text-[clamp(16px,1.6vw,20px)] text-base-content leading-snug"
        style={{ top: 28 }}
      >
        {post.title}
      </div>

      {date && (
        <div
          className="absolute left-7 font-franklin font-medium text-sm text-white/80 tracking-[0.07em]"
          style={{ top: 64 }}
        >
          {date}
        </div>
      )}

      <div className="absolute right-[22px] bottom-[22px]">
        <ArrowBadge size={40} />
      </div>
    </Link>
  )
}

// ─── Featured Card (large card) ───────────────────────────────────────────────

function FeaturedCard({
  post,
  eyebrow,
  eyebrowSub,
}: {
  post: ClientPost
  eyebrow?: string | null
  eyebrowSub?: string | null
}) {
  const bgImage = post.heroImage ?? post.metaImage ?? null
  const date = formatDate(post.publishedAt)

  return (
    <Link
      href={postHref(post.slug)}
      className={cn(
        'relative block overflow-hidden rounded-sm',
        'h-auto aspect-[16/11]',
        'md:h-[428px] md:aspect-auto',
      )}
    >
      {bgImage && (
        <div className="absolute inset-0">
          <MediaComponent fill resource={bgImage} imgClassName="object-cover" />
        </div>
      )}
      <div className="absolute inset-0 bg-black/60" />

      {/* Eyebrow */}
      {(eyebrow || eyebrowSub) && (
        <div
          className="absolute right-[clamp(20px,3vw,34px)] font-franklin font-bold leading-none text-base-content"
          style={{
            left: 'clamp(20px,3vw,34px)',
            top: 'clamp(28px,4vw,47px)',
            fontSize: 'clamp(28px,3.5vw,40px)',
          }}
        >
          {eyebrow && <span className="uppercase">{eyebrow}</span>}
          {eyebrow && eyebrowSub && <br />}
          {eyebrowSub && <span className="normal-case">{eyebrowSub}</span>}
        </div>
      )}

      {/* Post title */}
      <div
        className="absolute font-franklin font-medium leading-none text-base-content"
        style={{
          left: 'clamp(20px,3vw,34px)',
          bottom: 'clamp(56px,6vw,84px)',
          fontSize: 'clamp(22px,3vw,32px)',
        }}
      >
        {post.title}
      </div>

      {/* Date */}
      {date && (
        <div
          className="absolute font-franklin text-base text-white/90 tracking-[0.06em]"
          style={{
            left: 'clamp(20px,3vw,34px)',
            bottom: 'clamp(20px,3vw,28px)',
          }}
        >
          {date}
        </div>
      )}

      <div className="absolute right-[18px] bottom-[18px]">
        <ArrowBadge size={48} />
      </div>
    </Link>
  )
}

// ─── News Panel Block ─────────────────────────────────────────────────────────

export const NewsPanelBlockClient: React.FC<Props> = ({
  featured,
  articles,
  eyebrow,
  eyebrowSub,
}) => {
  if (!featured) return null

  return (
    <section className="relative pb-[clamp(48px,9vw,90px)]">
      <div className="meh-container">
        <div
          className={cn(
            'relative w-full bg-base-100',
            'border border-primary rounded-[20px] overflow-hidden',
            'shadow-[0_4px_4px_rgba(0,0,0,0.25),0_24px_80px_rgba(0,0,0,0.45)]',
            'p-[clamp(20px,2.4vw,36px)]',
            'grid grid-cols-1 md:grid-cols-2 gap-[clamp(20px,2.4vw,36px)]',
          )}
        >
          <FeaturedCard post={featured} eyebrow={eyebrow} eyebrowSub={eyebrowSub} />

          {articles.length > 0 && (
            <div className="flex flex-col gap-5 min-w-0">
              {articles.map((post) => (
                <NewsRow key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
