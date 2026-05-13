import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Footer } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const socialLinks = footerData?.socialLinks || []
  const columns = footerData?.columns || []

  return (
    <footer
      className="w-full footer-padding bottom-0 mt-auto z-10 min-h-96 "
      style={{
        background: 'linear-gradient(var(--color-base-100) 0%, var(--color-neutral) 49%)',
        color: 'var(--color-base-content)',
      }}
    >
      <div className="meh-container grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] footer-grid-gap">

        {/* Brand column */}
        <div className="min-w-0">
          <div className="flex items-center gap-3">

            <div className="font-bold footer-brand-name leading-[1.2] tracking-[-0.02em]">
              Multimedia<br />Entertainment Hub
            </div>
          </div>

          {socialLinks.length > 0 && (
            <div className="flex flex-wrap gap-x-[22px] gap-y-[14px] mt-[26px]">
              {socialLinks.map(({ link }, i) => (
                <CMSLink
                  key={i}
                  {...link}
                  appearance="inline"
                  className="text-base-content text-[15px] no-underline hover:opacity-75 transition-opacity"
                />
              ))}
            </div>
          )}
        </div>

        {/* Link columns */}
        {columns.map((col, i) => (
          <div key={col.id ?? i} className="flex flex-col gap-3 pt-[14px]">
            {(col.links || []).map(({ link }, j) => (
              <CMSLink
                key={j}
                {...link}
                appearance="inline"
                className="text-base-content text-[17px] no-underline hover:opacity-75 transition-opacity"
              />
            ))}
          </div>
        ))}

      </div>
    </footer>
  )
}
