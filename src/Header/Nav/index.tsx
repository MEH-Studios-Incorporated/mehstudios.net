'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

function getLinkHref(link: NonNullable<HeaderType['navItems']>[0]['link']): string | null {
  if (link.type === 'reference' && link.reference) {
    const val = link.reference.value
    if (typeof val === 'object' && val !== null && 'slug' in val && val.slug) {
      const prefix = link.reference.relationTo !== 'pages' ? `/${link.reference.relationTo}` : ''
      return `${prefix}/${val.slug}`
    }
    return null
  }
  return link.url || null
}

interface HeaderNavProps {
  data: HeaderType
  mobile?: boolean
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ data, mobile = false }) => {
  const navItems = data?.navItems || []
  const pathname = usePathname()

  return (
    <>
      {navItems.map(({ link }, i) => {
        const href = getLinkHref(link)
        const isActive = !!href && (pathname === href || (href !== '/' && pathname.startsWith(href + '/')))

        return (
          <CMSLink
            key={i}
            {...link}
            appearance="inline"
            className={cn(
              'font-franklin font-bold transition-opacity',
              mobile ? 'text-[28px]' : 'text-[20px]',
              isActive ? 'opacity-100 nav-link-active' : 'opacity-[0.78] hover:opacity-100',
            )}
          />
        )
      })}
    </>
  )
}
