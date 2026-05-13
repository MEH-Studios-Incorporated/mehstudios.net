'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { CommunityBlock } from '@/payload-types'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

gsap.registerPlugin(ScrollTrigger)

export type CommunityBlockClientProps = CommunityBlock

const IMAGE_TRANSFORM_DESKTOP = 'perspective(2000px) rotateX(40deg) skewX(5deg)'
const IMAGE_TRANSFORM_MOBILE = 'perspective(1200px) rotateX(28deg) skewX(3deg)'

export const CommunityBlockClient: React.FC<CommunityBlockClientProps> = ({
  heading,
  body,
  link,
  image,
}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const shadowImgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const imageTransform = isMobile ? IMAGE_TRANSFORM_MOBILE : IMAGE_TRANSFORM_DESKTOP

    if (imageWrapRef.current) imageWrapRef.current.style.transform = imageTransform
    if (shadowImgRef.current) shadowImgRef.current.style.transform = imageTransform

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: isMobile ? '+=70vh' : 'bottom bottom',
          scrub: isMobile ? 0.8 : 1.4,
        },
      })

      tl.fromTo(
        bodyRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, ease: 'power2.out', duration: 0.5 },
        0.1,
      )

      tl.fromTo(
        imageWrapRef.current,
        { y: 0 },
        { y: isMobile ? 30 : 60, ease: 'power2.out', duration: 0.6 },
        0.15,
      )

      tl.fromTo(
        shadowImgRef.current,
        { opacity: 0, x: 10, y: -10 },
        { opacity: 0.85, x: 0, y: 0, ease: 'power2.out', duration: 0.6 },
        0.2,
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const hasLink = link?.type === 'reference' ? !!link.reference : !!link?.url

  return (
    <section ref={sectionRef} className="relative h-[150vh] md:h-[220vh]">
      <div className="sticky top-0 h-[70vh] md:h-screen overflow-hidden bg-black">
        {/* Radial blue glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 40% at 50% 78%, rgba(40,120,255,0.7) 0%, rgba(30,100,200,0.35) 40%, transparent 72%)',
          }}
        />

        {/* Centered vertical stack */}
        <div className="relative h-full w-full flex flex-col items-center justify-start pt-[clamp(80px,12vh,140px)] px-[clamp(16px,5vw,80px)]">
          {/* Heading */}
          <h2
            className="font-franklin font-bold text-white leading-[1.0] tracking-[-0.04em] m-0 text-center relative w-full"
            style={{
              fontSize: 'clamp(40px,7.5vw,96px)',
              mixBlendMode: 'difference',
              zIndex: 30,
            }}
          >
            {heading}
          </h2>

          {/* Body + CTA */}
          <div
            ref={bodyRef}
            className="mt-5 max-w-xl text-center"
            style={{ opacity: 0, zIndex: 20, position: 'relative' }}
          >
            {body && (
              <RichText
                data={body}
                enableGutter={false}
                enableProse={false}
                className="[&_p]:text-white/75 [&_p]:text-[clamp(13px,1.3vw,17px)] [&_p]:leading-relaxed [&_p]:m-0"
              />
            )}
            {hasLink && link && (
              <div className="mt-6 flex justify-center">
                <CMSLink {...link} />
              </div>
            )}
          </div>

          {/* Image stack */}
          <div
            className="relative mt-6 md:mt-4 flex justify-center w-full"
            style={{ zIndex: 10, overflow: 'visible' }}
          >
            <div className="relative w-[82vw] md:w-[min(900px,90vw)]">
              {/* Shadow image */}
              <div
                ref={shadowImgRef}
                className="absolute inset-0"
                style={{
                  top: '18px',
                  left: '-20px',
                  transform: IMAGE_TRANSFORM_MOBILE,
                  filter: 'brightness(0.4) saturate(0.6) hue-rotate(200deg)',
                  opacity: 0,
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
              >
                <Media
                  resource={image}
                  className="w-full rounded-lg overflow-hidden"
                  imgClassName="w-full h-auto block"
                />
              </div>

              {/* Main image */}
              <div
                ref={imageWrapRef}
                style={{
                  transform: IMAGE_TRANSFORM_MOBILE,
                  boxShadow: '0 40px 100px rgba(0,0,0,0.95), 0 0 60px rgba(30,100,200,0.3)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <Media resource={image} className="w-full" imgClassName="w-full h-auto block" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
