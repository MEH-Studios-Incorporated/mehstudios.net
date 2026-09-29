import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

// Despite its name the previous version of this never read NEXT_PUBLIC_SERVER_URL: the
// middle branch was the literal `undefined`, so off Vercel it always fell through to
// localhost and the image optimizer rejected every real host with a 400.
const NEXT_PUBLIC_SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined)

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      ...[
        NEXT_PUBLIC_SERVER_URL /* 'https://cms.mehstudios.net' */,
        // Media is served by the Payload instance, which may be a different origin
        // from the site rendering it.
        process.env.NEXT_PUBLIC_PAYLOAD_API_URL,
      ]
        // filter(Boolean) so an unset var is skipped rather than throwing
        // "Invalid URL" out of new URL(undefined) and failing the whole build.
        .filter(Boolean)
        .map((item) => {
          const url = new URL(item)

          return {
            hostname: url.hostname,
            protocol: url.protocol.replace(':', ''),
          }
        })
        // The two variables usually name the same origin; keep one entry for it.
        .filter(
          (pattern, i, all) =>
            all.findIndex(
              (other) =>
                other.hostname === pattern.hostname && other.protocol === pattern.protocol,
            ) === i,
        ),
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/media/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
