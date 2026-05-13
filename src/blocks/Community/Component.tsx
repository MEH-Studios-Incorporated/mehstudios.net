import React from 'react'
import type { CommunityBlock as CommunityBlockProps } from '@/payload-types'
import { CommunityBlockClient } from './Component.client'

export const CommunityBlock: React.FC<CommunityBlockProps> = (props) => {
  return <CommunityBlockClient {...props} />
}
