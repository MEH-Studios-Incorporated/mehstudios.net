import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import 'dotenv/config'
type Global = keyof Config['globals']

async function getGlobal<TSlug extends Global>(slug: TSlug, depth = 0) {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
  })

  return global
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug.
 *
 * Generic over the slug so callers get that global's type back. Without the
 * parameter the return type is a union of every global in the config, which
 * no caller can use without a cast — and the union grows each time a plugin
 * registers one.
 */
export const getCachedGlobal = <TSlug extends Global>(slug: TSlug, depth = 0) =>
  unstable_cache(async () => getGlobal(slug, depth), [slug], {
    tags: [`global_${slug}`],
  })
