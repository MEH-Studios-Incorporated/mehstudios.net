'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { CMSLink } from '@/components/Link'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()



  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const signIn = data.signInButton?.label ? data.signInButton : null

  return (
    <>
      <header
        className="sticky top-0 z-50 h-24 w-full backdrop-blur-lg border-b bg-base-100/20 border-none"
      >
        <div className="meh-container navbar h-full flex items-center gap-6">
          {/* Logo */}
          <div className={"navbar-start"}>
          <Link href="/" className=" flex items-center">
            <Logo loading="eager" priority="high" />
          </Link>
          </div>

          {/* Desktop nav links — hidden on tablet/mobile */}
          <div className="hidden lg:flex navbar-center items-center gap-9">
            <HeaderNav data={data} />
          </div>

          {/* Sign-in button — hidden on mobile only */}
          <div className="navbar-end">
          {signIn && (
            <div className="hidden  md:block">
              <CMSLink {...signIn} appearance="default" />
            </div>
          )}
            </div>

          {/* Hamburger — visible on tablet + mobile */}
          <button
            className="lg:hidden w-11 h-11 border border-white/10 bg-white/5 rounded-[5px] inline-flex items-center justify-center cursor-pointer text-base-content"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <svg
              width={22}
              height={22}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.25}
              strokeLinecap="round"
            >
              {menuOpen ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile/tablet overlay sheet */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[49] bg-black/85 backdrop-blur-2xl flex flex-col justify-center px-4 md:px-8 gap-7"
          onClick={() => setMenuOpen(false)}
        >
          <HeaderNav data={data} mobile />
          {signIn && (
            <div className="mt-4" onClick={(e) => e.stopPropagation()}>
              <CMSLink {...signIn} appearance="default" onClick={() => setMenuOpen(false)} />
            </div>
          )}
        </div>
      )}
    </>
  )
}
