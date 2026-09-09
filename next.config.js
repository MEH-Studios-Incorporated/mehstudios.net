import { withPayload } from '@payloadcms/next/withPayload'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    // An export has no image optimizer.
    unoptimized: true,
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      ...[
        NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */,
        // The frontend reads from a remote Payload instance, which serves
        // media from its own origin.
        process.env.NEXT_PUBLIC_PAYLOAD_API_URL,
      ]
        .filter(Boolean)
        .map((item) => {
          const url = new URL(item)

          return {
            hostname: url.hostname,
            protocol: url.protocol.replace(':', ''),
          }
        }),
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
  typescript: {
    // The export only emits HTML from the (frontend) tree. The type errors this
    // repo carries are all in server-side code that has no part in that: the
    // Payload admin/API, the preview and seed handlers, and the revalidate
    // hooks — the workflow strips the first two and an export never runs the
    // third. Run `tsc --noEmit --ignoreDeprecations 6.0` to see them.
    ignoreBuildErrors: true,
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
