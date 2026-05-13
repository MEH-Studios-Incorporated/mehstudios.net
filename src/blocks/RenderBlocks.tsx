import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CardsBlock } from '@/blocks/Cards/Component'
import { CommunityBlock } from '@/blocks/Community/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { NewsPanelBlock } from '@/blocks/NewsPanel/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'

const blockComponents = {
  archive: ArchiveBlock,
  cards: CardsBlock,
  community: CommunityBlock,
  content: ContentBlock,
  newsPanel: NewsPanelBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
}

// Blocks that manage their own vertical spacing
const noMarginBlocks = new Set(['archive', 'cards', 'community', 'newsPanel'])

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              // @ts-expect-error there may be some mismatch between the expected types here
              const blockEl = <Block {...block} disableInnerContainer />
              return noMarginBlocks.has(blockType) ? (
                <Fragment key={index}>{blockEl}</Fragment>
              ) : (
                <div className="my-16" key={index}>
                  {blockEl}
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
