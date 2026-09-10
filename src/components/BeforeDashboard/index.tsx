import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { SITE_NAME } from '@/utilities/siteMetadata'
import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>{`Welcome to the ${SITE_NAME} admin.`}</h4>
      </Banner>
      Here&apos;s what to do next:
      <ul className={`${baseClass}__instructions`}>
        <li>
          <SeedButton />
          {' with a starter set of pages and posts, then '}
          <a href="/" target="_blank">
            visit the site
          </a>
          {' to see the results.'}
        </li>
        <li>
          {'Edit the studio site from '}
          <strong>Pages</strong>
          {', write announcements and devlogs in '}
          <strong>Posts</strong>
          {', and manage the navigation from the '}
          <strong>Header</strong>
          {' and '}
          <strong>Footer</strong>
          {' globals.'}
        </li>
        <li>
          Publishing a page or post triggers a rebuild of the public site. Saving a draft does
          not, so you can work in progress safely.
        </li>
      </ul>
    </div>
  )
}

export default BeforeDashboard
