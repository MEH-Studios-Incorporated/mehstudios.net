import React from 'react'
import type { NewsPanelBlock as NewsPanelBlockProps, Post } from '@/payload-types'
import { NewsPanelBlockClient, type ClientPost } from './Component.client'
import { sdk } from '@/utilities/getPayloadSDK'

function extractId(val: number | Post | null | undefined): number | null {
  if (val == null) return null
  return typeof val === 'object' ? val.id : val
}

function toClientPost(post: Post): ClientPost {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    publishedAt: post.publishedAt ?? null,
    heroImage: typeof post.heroImage === 'object' && post.heroImage ? post.heroImage : null,
    metaImage:
      typeof post.meta?.image === 'object' && post.meta?.image ? post.meta.image : null,
  }
}

export const NewsPanelBlock: React.FC<NewsPanelBlockProps> = async (props) => {
  const { featuredPost, articles, featuredEyebrow, featuredEyebrowSub } = props

  const featuredId = extractId(featuredPost as number | Post | null)
  const articleIds = ((articles ?? []) as (number | Post)[])
    .map(extractId)
    .filter((id): id is number => id != null)

  if (!featuredId) return null

  const allIds = [featuredId, ...articleIds]
  const settled = await Promise.allSettled(
    allIds.map((id) =>
      sdk.findByID({ collection: 'posts', id, depth: 1 }),
    ),
  )

  const posts = settled
    .filter((r): r is PromiseFulfilledResult<Post> => r.status === 'fulfilled')
    .map((r) => r.value)

  const [featured, ...rest] = posts
  if (!featured) return null

  return (
    <NewsPanelBlockClient
      featured={toClientPost(featured)}
      articles={rest.map(toClientPost)}
      eyebrow={featuredEyebrow ?? null}
      eyebrowSub={featuredEyebrowSub ?? null}
    />
  )
}
