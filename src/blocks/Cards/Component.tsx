'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import type { CardsBlock as CardsBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

type CardItem = NonNullable<CardsBlockProps['cards']>[number]

function splitTitle(title: string): [string, string] {
  if (title.includes('\n')) {
    const i = title.indexOf('\n')
    return [title.slice(0, i), title.slice(i + 1)]
  }
  const words = title.split(' ')
  const mid = Math.ceil(words.length / 2)
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')]
}

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

function ShowcaseCard({ card, grid = false }: { card: CardItem; grid?: boolean }) {
  const [line1, line2] = card.title ? splitTitle(card.title) : ['', '']

  const cardClassName = cn(
    'group relative overflow-hidden rounded-sm bg-neutral snap-start',
    'shadow-[2px_2px_80px_color-mix(in_oklab,var(--color-accent)_35%,transparent)]',
    'hover:shadow-[2px_2px_110px_color-mix(in_oklab,var(--color-accent)_50%,transparent)]',
    'transition-shadow duration-[260ms]',
    grid ? 'w-full aspect-470/600' : 'w-[min(470px,82vw)] aspect-470/600 flex-none',
  )

  const inner = (
    <>
      <div className="absolute inset-x-0 top-0 h-[66.7%]">
        {typeof card.image === 'object' && (
          <Media fill imgClassName="object-cover" resource={card.image} />
        )}
      </div>
      <div
        className="absolute inset-x-0 top-0 h-[66.7%] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, var(--color-neutral) 100%)',
        }}
      />
      {card.title && (
        <div className="absolute top-[66.7%] font-franklin font-bold leading-[1.05] tracking-[-0.03em] text-[clamp(30px,4.6vw,48px)] text-base-content left-[clamp(20px,4vw,37px)] right-[clamp(20px,4vw,37px)]">
          <div>{line1}</div>
          {line2 && <div>{line2}</div>}
        </div>
      )}
      {card.tag && (
        <div className="absolute font-franklin font-bold tracking-[0.02em] text-[clamp(22px,3vw,32px)] text-base-content left-[clamp(20px,4vw,37px)] bottom-[clamp(20px,3vw,28px)]">
          {card.tag}
        </div>
      )}
      <div className="absolute right-[clamp(16px,2.4vw,22px)] bottom-[clamp(16px,2.4vw,22px)]">
        <ArrowBadge />
      </div>
    </>
  )

  const hasLink = card.link?.type === 'reference' ? !!card.link.reference : !!card.link?.url

  if (hasLink) {
    return (
      <CMSLink {...card.link} appearance="inline" className={cardClassName}>
        {inner}
      </CMSLink>
    )
  }
  return <div className={cardClassName}>{inner}</div>
}

function InformationCard({ card, grid = false }: { card: CardItem; grid?: boolean }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden flex flex-col gap-4 border border-primary/40 rounded-sm bg-neutral snap-start',
        grid ? 'w-full aspect-470/600' : 'w-[min(470px,82vw)] aspect-470/600 flex-none',
      )}
    >
      <div className="relative h-1/2">
        {typeof card.image === 'object' && (
          <Media fill imgClassName="object-cover" resource={card.image} />
        )}
      </div>
      <div
        className="absolute inset-x-0 top-[35%] bottom-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, var(--color-neutral) 30%, var(--color-neutral) 100%)',
        }}
      />
      <div className="relative  px-[clamp(20px,4vw,37px)] pb-[clamp(20px,3vw,28px)] flex flex-col gap-4">
        {card.richText && (
          <RichText
            data={card.richText}
            enableGutter={false}
            enableProse={false}
            className="[&_h3]:font-franklin [&_h3]:font-bold [&_h3]:text-[1.15rem] [&_h3]:leading-[1.2] [&_h3]:m-0 [&_p]:text-[0.9rem] [&_p]:text-white/80 [&_p]:mt-2 [&_p]:mb-0"
          />
        )}
      </div>
      <div className={'flex-1'}></div>
      {card.links?.[0]?.link && <CMSLink {...card.links[0].link} size="sm" className={"m-4"} />}

    </div>
  )
}

function renderCard(card: CardItem, i: number, grid = false) {
  return card.variant === 'information' ? (
    <InformationCard key={card.id ?? i} card={card} grid={grid} />
  ) : (
    <ShowcaseCard key={card.id ?? i} card={card} grid={grid} />
  )
}

export const CardsBlock: React.FC<CardsBlockProps> = ({ heading, arrangement, cards }) => {
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
  }, [updateBounds, updateOffset])

  const handleScrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    const firstCard = el.firstElementChild as HTMLElement | null
    const step = (firstCard?.offsetWidth ?? 470) + 36
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  const isRow = !arrangement || arrangement === 'row'
  const cardList = cards ?? []

  if (!cardList.length) return null

  if (isRow) {
    return (
      <section
        className="pt-[clamp(40px,5vw,60px)]  pb-[clamp(48px,6vw,80px)] z-20 overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, var(--color-base-100) 0%, var(--color-base-200) 100%)',
        }}
      >
        <div
          ref={headingRowRef}
          className="meh-container z-10 flex  items-end justify-between mb-[clamp(20px,3vw,32px)]"
        >
          {heading && (
            <h2 className="font-franklin z-10 font-bold m-0 text-[clamp(40px,6.5vw,72px)] leading-none tracking-[-0.02em] text-base-content">
              {heading}
            </h2>
          )}
          <div className="flex gap-3 pb-3 z-20 shrink-0 ml-auto">
            <CarouselButton
              direction="prev"
              onClick={() => handleScrollBy(-1)}
              disabled={atStart}
            />
            <CarouselButton direction="next" onClick={() => handleScrollBy(1)} disabled={atEnd} />
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-9 overflow-x-auto scrollbar-none py-15 -my-15 [scroll-snap-type:x_mandatory] [&::-webkit-scrollbar]:hidden pr-4 md:pr-8"
          style={{
            paddingLeft: `${leftOffset}px`,
            scrollPaddingLeft: `${leftOffset}px`,
          }}
        >
          {cardList.map((card, i) => renderCard(card, i))}
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
          {cardList.map((card, i) => renderCard(card, i, true))}
        </div>
      </div>
    </section>
  )
}
