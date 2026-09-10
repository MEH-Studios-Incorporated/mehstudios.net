import React from 'react'

import { SITE_NAME, SITE_TAGLINE } from '@/utilities/siteMetadata'

/**
 * Replaces Payload's default logo on the admin login screen.
 *
 * The monogram in `public/logo.png` is white on transparent, so `custom.scss`
 * inverts `.meh-admin-graphic` under Payload's light theme to keep it legible.
 */
export const AdminLogo = () => (
  <div className="meh-admin-logo">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      alt={`${SITE_NAME} logo`}
      className="meh-admin-graphic meh-admin-logo__mark"
      decoding="async"
      height={136}
      src="/logo.png"
      width={98}
    />
    <div className="meh-admin-logo__text">
      <strong>{SITE_NAME}</strong>
      <span>{SITE_TAGLINE}</span>
    </div>
  </div>
)

export default AdminLogo
