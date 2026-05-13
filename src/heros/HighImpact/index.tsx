'use client'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

import type { Page } from '@/payload-types'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

export const HighImpactHero: React.FC<Page['hero']> = ({ slides }) => {
  const slideCount = slides?.length ?? 0
  const total = slideCount > 0 ? slideCount : 4
  const [idx, setIdx] = useState(0)

  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const copyRefs = useRef<(HTMLDivElement | null)[]>([])
  const prevIdx = useRef(0)

  // Auto-advance
  useEffect(() => {
    if (total <= 1) return
    const t = setInterval(() => setIdx((i) => (i + 1) % total), 4200)
    return () => clearInterval(t)
  }, [total])

  // GSAP crossfade — animates only the two slides involved, not all of them
  useEffect(() => {
    const from = prevIdx.current
    const to = idx
    if (from === to) {
      // Initial mount — just show current
      const el = imageRefs.current[to]
      const copy = copyRefs.current[to]
      if (el) gsap.set(el, { opacity: 1 })
      if (copy) gsap.set(copy, { opacity: 1 })
      return
    }

    const fromImg = imageRefs.current[from]
    const toImg = imageRefs.current[to]
    const fromCopy = copyRefs.current[from]
    const toCopy = copyRefs.current[to]

    const tl = gsap.timeline()
    if (toImg) tl.to(toImg, { opacity: 1, duration: 0.6, ease: 'power2.inOut' }, 0)
    if (fromImg) tl.to(fromImg, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, 0)
    if (toCopy) tl.to(toCopy, { opacity: 1, duration: 0.6, ease: 'power2.inOut' }, 0)
    if (fromCopy) tl.to(fromCopy, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, 0)

    prevIdx.current = to
  }, [idx])

  return (
    <section
      data-theme="dark"
      className="relative w-full hero-height overflow-y-visible overflow-x-clip z-0 -mt-40"
      style={{
        background: 'linear-gradient(var(--color-primary) 0%, rgb(0,29,45) 60%, rgb(0,15,24) 100%)',
      }}
    >
      {/* Per-slide image layers */}
      {slideCount > 0 ? (
        slides!.map((slide, i) => (
          <div
            key={slide.id ?? i}
            ref={(el) => {
              imageRefs.current[i] = el
            }}
            className="absolute inset-0 h-screen pointer-events-none"
            style={{
              opacity: i === 0 ? 1 : 0,
              willChange: 'opacity',
              transform: 'translateZ(0)',
            }}
          >
            {typeof slide.image === 'object' && (
              <Media
                fill
                imgClassName="object-cover h-screen"
                priority={i === 0}
                resource={slide.image}
              />
            )}
            {/* Per-slide gradient overlay — moved inside so it's part of the same composited layer */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.8) 100%)',
              }}
            />
          </div>
        ))
      ) : (
        <div
          className="absolute inset-x-0 top-0 h-[65%] flex items-center justify-center pointer-events-none text-white/30 font-mono text-xs tracking-[0.08em] uppercase"
          style={{
            background:
              'radial-gradient(ellipse 60% 80% at 50% 30%, rgba(0,181,255,0.25) 0%, rgba(0,96,147,0) 70%), linear-gradient(var(--color-primary) 0%, rgb(0,29,45) 100%)',
          }}
        >
          Add slides in the CMS
        </div>
      )}

      {/* Bottom scrim — single layer with a stronger blur instead of 4 stacked layers.
          Using a fixed-height container instead of bottom: -70vh to limit paint area. */}
      <div
        className="absolute inset-x-0 top-[40%] bottom-[-70vh] pointer-events-none"
        style={{ transform: 'translateZ(0)' }}
      >
        {/* Light blur — covers the upper portion, fades in early */}
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 35%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 35%, black 100%)',
          }}
        />
        {/* Heavy blur — only kicks in toward the bottom */}
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            maskImage: 'linear-gradient(to bottom, transparent 50%, black 85%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 50%, black 85%, black 100%)',
          }}
        />
        {/* Black overlay — ramps darkness toward the bottom.
      This is cheap (just a gradient, no filter) so we use it freely. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0.9) 100%)',
          }}
        />
      </div>

      {/* Per-slide copy layers */}
      {slideCount > 0 &&
        slides!.map((slide, i) => (
          <div
            key={`copy-${slide.id ?? i}`}
            ref={(el) => {
              copyRefs.current[i] = el
            }}
            className={cn(
              'meh-container absolute inset-x-0 hero-content-bottom',
              i !== idx && 'pointer-events-none',
            )}
            style={{
              opacity: i === 0 ? 1 : 0,
              willChange: 'opacity',
            }}
          >
            <div className="flex-1 basis-80 min-w-0 xl:max-w-xl">
              {slide.title && (
                <h1 className="font-franklin font-black leading-none tracking-[-0.02em] text-base-content m-0 hero-title">
                  {slide.title}
                </h1>
              )}
              {slide.subtitle && (
                <p className="font-franklin font-bold leading-[1.15] text-base-content mt-5 mb-0  whitespace-pre-line hero-subtitle">
                  {slide.subtitle}
                </p>
              )}
              {slide.links?.[0]?.link && (
                <div className="mt-7">
                  <CMSLink {...slide.links[0].link} size="lg" />
                </div>
              )}
            </div>
          </div>
        ))}

      {/* Pagination dots */}
      <div className="meh-container absolute inset-x-0 bottom-0 lg:hero-content-bottom flex items-end justify-end">
        <div className="flex gap-3.5 pb-2">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Slide ${i + 1}`}
              className={cn(
                'slide-dot h-2 sm:h-4 border-none rounded-full p-0 cursor-pointer z-10 transition-colors duration-200 ease-out',
                i === idx ? 'bg-base-content' : 'bg-white/35',
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
