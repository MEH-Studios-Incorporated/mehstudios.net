// CallToActionBlock.tsx (server component — unchanged)
import React from 'react'
import type { CallToActionBlock as CTABlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import { CTAGradientCard } from './Component.client'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText, variant }) => {
  const v = variant ?? 'gradient'

  return (
    <section className="meh-container cta-section">
      {v === 'gradient' ? (
        <CTAGradientCard>
          {richText && (
            <RichText
              className="cta-richtext"
              data={richText}
              enableGutter={false}
              enableProse={false}
            />
          )}
          {links && links.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {links.map(({ link }, i) => (
                <CMSLink key={i} size="lg" {...link} />
              ))}
            </div>
          )}
        </CTAGradientCard>
      ) : (
        <div
          className={cn(
            'cta-card relative w-full rounded-[4px] overflow-hidden flex flex-col justify-between gap-6',
            v === 'black' && 'bg-neutral',
            v === 'primary' && 'bg-primary',
          )}
        >
          {richText && (
            <RichText
              className="cta-richtext"
              data={richText}
              enableGutter={false}
              enableProse={false}
            />
          )}
          {links && links.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {links.map(({ link }, i) => (
                <CMSLink key={i} size="lg" {...link} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
