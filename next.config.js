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
    // Suppresses six known type errors, listed below. Some are in code that
    // ships in the export, so this is not "all harmless server-side noise".
    //
    // A plain `tsc --noEmit` will not show them: TypeScript 6 treats the
    // `baseUrl` deprecation in tsconfig.json as a hard error and stops before
    // type checking. Use `npx tsc --noEmit --ignoreDeprecations 6.0`.
    //
    //   Header/Component.tsx         getCachedGlobal returns a union of every
    //                                global, assigned to Header. Fix: make
    //                                getCachedGlobal generic over the slug.
    //   Header/Component.client.tsx  onClick is not on CMSLinkType
    //   components/ui/pagination.tsx variant 'ghost' is not defined
    //   blocks/Community/config.ts   initCollapsed invalid on a group's admin
    //   endpoints/seed/index.ts x2   footer seed writes navItems, but Footer
    //                                has socialLinks/columns
    ignoreBuildErrors: true,
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
