import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'

export const Community: Block = {
  slug: 'community',
  interfaceName: 'CommunityBlock',
  labels: { singular: 'Community', plural: 'Community' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
    },
    {
      name: 'body',
      type: 'richText',
      label: 'Body Text',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    link({
      appearances: ['default'],
      overrides: {
        admin: {
          hideGutter: true,
          initCollapsed: true,
        },
        label: 'CTA Button',
      },
    }),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Community Image',
    },
  ],
}
