'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { cn } from '@/utilities/ui'

export const CTAGradientCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const gradientRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 })

    tl.to(gradientRef.current, {
      opacity: 0.5,
      duration: 1,
      ease: 'sine.inOut',
    })
    tl.to(gradientRef.current, {
      opacity: 1,
      duration: 1,
      ease: 'sine.inOut',
    })
    // 5s idle hold before next pulse
    tl.to(gradientRef.current, {
      opacity: 1,
      duration: 5,
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div
      className={cn(
        'cta-card relative w-full rounded-[4px] overflow-hidden flex flex-col justify-between gap-6',
      )}
      style={{ background: 'var(--color-neutral)' }}
    >
      {/* Gradient overlay — fades in/out on the whole gradient at once */}
      <div
        ref={gradientRef}
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          background:
            'linear-gradient(to top right, var(--color-primary) 0%, var(--color-neutral) 50%, var(--color-primary) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between gap-6 w-full">{children}</div>
    </div>
  )
}
