'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type { Post } from '@/payload-types'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso?: string | null): string {
  if (!iso) return ''
  return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' })
    .format(new Date(iso))
    .toUpperCase()
}

function splitTitle(title: string): [string, string] {
  if (title.includes('\n')) {
    const i = title.indexOf('\n')
    return [title.slice(0, i), title.slice(i + 1)]
  }
  const words = title.split(' ')
  const mid = Math.ceil(words.length / 2)
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')]
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ArrowBadge() {
  return (
    <span className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
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

function CarouselButton({
  direction,
  onClick,
  disabled,
}: {
  direction: 'prev' | 'next'
  onClick: () => void
  disabled: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'prev' ? 'Previous' : 'Next'}
      className="w-14 h-14 rounded-full bg-primary/30 border border-white/10 hover:bg-primary/50 disabled:opacity-35 disabled:cursor-default transition-colors flex items-center justify-center cursor-pointer"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className={cn(direction === 'prev' && 'rotate-180')}
        aria-hidden
      >
        <path
          d="M7.5 5L12.5 10L7.5 15"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

// ─── Showcase card (post-aware) ───────────────────────────────────────────────

function ShowcaseCard({ post, grid = false }: { post: Post; grid?: boolean }) {
  const [line1, line2] = splitTitle(post.title)
  const date = formatDate(post.publishedAt)

  const image =
    typeof post.heroImage === 'object' && post.heroImage
      ? post.heroImage
      : typeof post.meta?.image === 'object' && post.meta?.image
        ? post.meta.image
        : null

  return (
    <Link
      href={`/posts/${post.slug}`}
      className={cn(
        'group relative overflow-hidden rounded-sm bg-neutral snap-start',
        'shadow-[2px_2px_80px_color-mix(in_oklab,var(--color-accent)_35%,transparent)]',
        'hover:shadow-[2px_2px_110px_color-mix(in_oklab,var(--color-accent)_50%,transparent)]',
        'transition-shadow duration-[260ms]',
        grid ? 'w-full aspect-470/600' : 'w-[min(470px,82vw)] aspect-470/600 flex-none',
      )}
    >
      {/* Image — top 66.7% */}
      <div className="absolute inset-x-0 top-0 h-[66.7%]">
        {image && <Media fill imgClassName="object-cover" resource={image} />}
      </div>

      {/* Fade-to-black gradient */}
      <div
        className="absolute inset-x-0 top-0 h-[66.7%] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, var(--color-neutral) 100%)',
        }}
      />

      {/* Title */}
      <div className="absolute top-[66.7%] font-franklin font-bold leading-[1.05] tracking-[-0.03em] text-[clamp(30px,4.6vw,48px)] text-base-content left-[clamp(20px,4vw,37px)] right-[clamp(20px,4vw,37px)]">
        <div>{line1}</div>
        {line2 && <div>{line2}</div>}
      </div>

      {/* Date — replaces tag: thin weight, smaller size */}
      {date && (
        <div className="absolute font-franklin font-thin text-[clamp(13px,1.4vw,16px)] text-base-content/70 tracking-[0.08em] left-[clamp(20px,4vw,37px)] bottom-[clamp(20px,3vw,28px)]">
          {date}
        </div>
      )}

      <div className="absolute right-[clamp(16px,2.4vw,22px)] bottom-[clamp(16px,2.4vw,22px)]">
        <ArrowBadge />
      </div>
    </Link>
  )
}

// ─── Archive block client ─────────────────────────────────────────────────────

export interface ArchiveBlockClientProps {
  heading?: string | null
  arrangement: 'row' | 'grid'
  posts: Post[]
}

export const ArchiveBlockClient: React.FC<ArchiveBlockClientProps> = ({
  heading,
  arrangement,
  posts,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const headingRowRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [leftOffset, setLeftOffset] = useState(16)

  const updateBounds = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 0)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1)
  }, [])

  const updateOffset = useCallback(() => {
    const el = headingRowRef.current
    if (!el) return
    setLeftOffset(el.getBoundingClientRect().left)
  }, [])

  useEffect(() => {
    if (arrangement !== 'row') return
    const el = scrollerRef.current
    if (!el) return
    updateBounds()
    updateOffset()
    el.addEventListener('scroll', updateBounds, { passive: true })
    window.addEventListener('resize', updateOffset)
    return () => {
      el.removeEventListener('scroll', updateBounds)
      window.removeEventListener('resize', updateOffset)
    }
  }, [arrangement, updateBounds, updateOffset])

  const handleScrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    const firstCard = el.firstElementChild as HTMLElement | null
    const step = (firstCard?.offsetWidth ?? 470) + 36
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  if (!posts.length) return null

  if (arrangement === 'row') {
    return (
      <section
        className="pt-[clamp(40px,5vw,60px)] pb-[clamp(48px,6vw,80px)] z-20 overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, var(--color-base-100) 0%, var(--color-base-200) 100%)',
        }}
      >
        <div
          ref={headingRowRef}
          className="meh-container flex items-end justify-between mb-[clamp(20px,3vw,32px)]"
        >
          {heading && (
            <h2 className="font-franklin font-bold m-0 text-[clamp(40px,6.5vw,72px)] leading-none tracking-[-0.02em] text-base-content">
              {heading}
            </h2>
          )}
          <div className="flex gap-3 pb-3 shrink-0 ml-auto">
            <CarouselButton direction="prev" onClick={() => handleScrollBy(-1)} disabled={atStart} />
            <CarouselButton direction="next" onClick={() => handleScrollBy(1)} disabled={atEnd} />
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-9 overflow-x-auto scrollbar-none py-15 -my-15 [scroll-snap-type:x_mandatory] [&::-webkit-scrollbar]:hidden pr-4 md:pr-8"
          style={{ paddingLeft: `${leftOffset}px`, scrollPaddingLeft: `${leftOffset}px` }}
        >
          {posts.map((post) => (
            <ShowcaseCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="pt-[clamp(40px,5vw,60px)] pb-[clamp(48px,6vw,80px)]">
      <div className="meh-container">
        {heading && (
          <h2 className="font-franklin font-bold m-0 text-[clamp(40px,6.5vw,72px)] leading-none tracking-[-0.02em] text-base-content mb-[clamp(28px,5vw,48px)]">
            {heading}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
          {posts.map((post) => (
            <ShowcaseCard key={post.id} post={post} grid />
          ))}
        </div>
      </div>
    </section>
  )
}
