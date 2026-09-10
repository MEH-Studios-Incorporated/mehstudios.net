import React from 'react'

import { SITE_NAME } from '@/utilities/siteMetadata'

/**
 * Replaces Payload's default icon in the admin nav and on the browser tab
 * fallback. See `AdminLogo` for the light-theme inversion.
 */
export const AdminIcon = () => (
  /* eslint-disable-next-line @next/next/no-img-element */
  <img
    alt={`${SITE_NAME} icon`}
    className="meh-admin-graphic meh-admin-icon"
    decoding="async"
    height={136}
    src="/logo.png"
    width={98}
  />
)

export default AdminIcon
