import type { Config } from 'src/payload-types'

import { unstable_cache } from 'next/cache'
import 'dotenv/config'
import { sdk } from '@/utilities/getPayloadSDK'
type Global = keyof Config['globals']

async function getGlobal(slug: Global, depth = 0) {
  const global = await sdk.findGlobal({
    slug,
    depth,
  })

  return global
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = (slug: Global, depth = 0) =>
  unstable_cache(async () => getGlobal(slug, depth), [slug], {
    tags: [`global_${slug}`],
  })
