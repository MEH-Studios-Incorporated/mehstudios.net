import React from 'react'

import { SITE_NAME } from '@/utilities/siteMetadata'

const BeforeLogin: React.FC = () => {
  return (
    <div>
      <p>
        <b>{`Welcome to the ${SITE_NAME} admin.`}</b>
        {' Sign in to manage the studio site — pages, posts, media and navigation.'}
      </p>
    </div>
  )
}

export default BeforeLogin
