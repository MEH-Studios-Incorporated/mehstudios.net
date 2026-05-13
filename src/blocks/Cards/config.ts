import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'
import { linkGroup } from '@/fields/linkGroup'

export const Cards: Block = {
  slug: 'cards',
  interfaceName: 'CardsBlock',
  labels: { singular: 'Cards', plural: 'Cards' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'arrangement',
      type: 'select',
      label: 'Arrangement',
      defaultValue: 'row',
      options: [
        { label: 'Row (carousel)', value: 'row' },
        { label: 'Grid', value: 'grid' },
      ],
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      fields: [
        {
          name: 'variant',
          type: 'select',
          label: 'Card Variant',
          defaultValue: 'showcase',
          options: [
            { label: 'Showcase', value: 'showcase' },
            { label: 'Information', value: 'information' },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },

        // ─── Showcase only ────────────────────────────────────────────
        {
          name: 'title',
          type: 'textarea',
          label: 'Title',
          admin: {
            condition: (_, { variant } = {}) => variant === 'showcase',
            description: 'Use a newline to force a specific line split.',
            rows: 2,
          },
        },
        {
          name: 'tag',
          type: 'text',
          label: 'Tag (e.g. STEAM, EPIC)',
          admin: {
            condition: (_, { variant } = {}) => variant === 'showcase',
          },
        },
        link({
          appearances: false,
          overrides: {
            admin: {
              condition: (_, { variant } = {}) => variant === 'showcase',
              hideGutter: true,
            },
          },
        }),

        // ─── Information only ─────────────────────────────────────────
        {
          name: 'richText',
          type: 'richText',
          label: 'Content',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h3'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
          admin: {
            condition: (_, { variant } = {}) => variant === 'information',
          },
        },
        linkGroup({
          appearances: ['default', 'outline'],
          overrides: {
            maxRows: 1,
            label: 'CTA (optional)',
            admin: {
              initCollapsed: true,
              condition: (_, { variant } = {}) => variant === 'information',
            },
          },
        }),
      ],
    },
  ],
}
