import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import React from 'react'

import { ArchiveBlockClient } from './Component.client'
import { sdk } from '@/utilities/getPayloadSDK'

export const ArchiveBlock: React.FC<ArchiveBlockProps & { id?: string }> = async (props) => {
  const {
    categories,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    heading,
    arrangement,
  } = props

  const limit = limitFromProps || 10
  let posts: Post[] = []

  if (populateBy === 'collection') {
    const flattenedCategories = categories?.map((c) =>
      typeof c === 'object' ? c.id : c,
    )

    const fetched = await sdk.find({
      collection: 'posts',
      depth: 1,
      limit,
      ...(flattenedCategories?.length
        ? { where: { categories: { in: flattenedCategories } } }
        : {}),
    })

    posts = fetched.docs
  } else {
    posts = (selectedDocs ?? [])
      .map((doc) => (typeof doc.value === 'object' ? doc.value : null))
      .filter((p): p is Post => p != null)
  }

  return (
    <ArchiveBlockClient
      heading={heading ?? null}
      arrangement={(arrangement as 'row' | 'grid') ?? 'row'}
      posts={posts}
    />
  )
}
