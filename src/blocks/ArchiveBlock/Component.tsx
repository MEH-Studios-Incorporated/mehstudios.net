import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { ArchiveBlockClient } from './Component.client'

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
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((c) =>
      typeof c === 'object' ? c.id : c,
    )

    const fetched = await payload.find({
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
