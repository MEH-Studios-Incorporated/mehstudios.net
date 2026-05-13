import React from 'react'

import type { Page } from '@/payload-types'

export const LowImpactHero: React.FC<Page['hero']> = ({ supertitle, title, subtitle }) => {
  return (
    <section
      className="relative w-full overflow-hidden -mt-24 pt-24 border-b border-primary"
      style={{
        background: 'linear-gradient(180deg, var(--color-primary) 0%, rgb(0,29,45) 100%)',
      }}
    >
      {/* Bottom glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 100% at 50% 100%, rgba(0,181,255,0.18) 0%, rgba(0,96,147,0) 70%)',
        }}
      />

      <div className="meh-container relative flex items-baseline justify-between flex-wrap gap-6 low-hero-pt low-hero-pb">

        {/* Supertitle — full width row */}
        {supertitle && (
          <div className="basis-full font-franklin font-medium text-[13px] tracking-[0.18em] uppercase text-base-content/70 mb-2">
            {supertitle}
          </div>
        )}

        {/* Title */}
        {title && (
          <h1 className="font-franklin font-extrabold leading-[1.1] tracking-[-0.02em] text-base-content m-0 low-hero-title">
            {title}
          </h1>
        )}

        {/* Subtitle — baseline-aligned to the right */}
        {subtitle && (
          <p className="font-franklin font-medium leading-[1.4] text-base-content/80 m-0 max-w-[420px] low-hero-sub">
            {subtitle}
          </p>
        )}

      </div>
    </section>
  )
}
