import React from 'react'

import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

export const MediumImpactHero: React.FC<Page['hero']> = ({ badge, title, subtitle, links, media }) => {
  return (
    <section
      className="relative w-full medium-hero-height overflow-hidden -mt-24 pt-24"
      style={{
        background: 'linear-gradient(180deg, var(--color-primary) 0%, rgb(0,29,45) 100%)',
      }}
    >
      {/* Radial glow — right side */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 75% 50%, rgba(0,181,255,0.22) 0%, rgba(0,96,147,0) 65%)',
        }}
      />

      {/* Grid */}
      <div className="meh-container relative grid grid-cols-1 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center medium-hero-gap medium-hero-py">

        {/* Copy column */}
        <div className="min-w-0">
          {badge && (
            <div className="inline-block px-3 py-[6px] mb-5 bg-primary/20 border border-primary/40 rounded-[var(--radius-selector)] font-franklin font-bold text-xs tracking-[0.14em] text-base-content uppercase">
              {badge}
            </div>
          )}

          {title && (
            <h1 className="font-franklin font-black leading-[1.02] tracking-[-0.02em] text-base-content m-0 medium-hero-title">
              {title}
            </h1>
          )}

          {subtitle && (
            <p className="font-franklin font-semibold leading-[1.3] medium-hero-sub mt-4 mb-7 max-w-[520px] text-base-content/90">
              {subtitle}
            </p>
          )}

          {Array.isArray(links) && links.length > 0 && (
            <div className="flex gap-3 flex-wrap">
              {links.map(({ link }, i) => (
                <CMSLink key={i} {...link} size="default" />
              ))}
            </div>
          )}
        </div>

        {/* Art tile column — hidden on mobile */}
        {media && typeof media === 'object' && (
          <div
            className={cn(
              'hidden md:block relative aspect-[5/4] overflow-hidden rounded-[var(--radius-field)]',
              'border border-primary',
            )}
            style={{ boxShadow: '0 8px 60px color-mix(in oklab, var(--color-accent) 40%, transparent)' }}
          >
            <Media fill imgClassName="object-cover" priority resource={media} />
          </div>
        )}
      </div>
    </section>
  )
}
