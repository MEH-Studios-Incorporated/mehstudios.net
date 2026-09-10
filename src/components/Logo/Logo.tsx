import clsx from 'clsx'
import React from 'react'

import { SITE_NAME } from '@/utilities/siteMetadata'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

/**
 * The MEH monogram used in the header and footer.
 *
 * `width`/`height` mirror the intrinsic size of `public/logo.png` (98×136) so
 * the browser reserves the right box and the portrait mark is not squashed —
 * the height is set in CSS and the width follows from the aspect ratio.
 */
export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt={`${SITE_NAME} logo`}
      width={98}
      height={136}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('h-11 w-auto', className)}
      src="/logo.png"
    />
  )
}
