import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        { label: 'None',          value: 'none' },
        { label: 'High Impact',   value: 'highImpact' },
        { label: 'Medium Impact', value: 'mediumImpact' },
        { label: 'Low Impact',    value: 'lowImpact' },
      ],
      required: true,
    },

    // ─── High Impact only ──────────────────────────────────────────────────
    {
      name: 'slides',
      type: 'array',
      label: 'Slides',
      maxRows: 5,
      admin: {
        condition: (_, { type } = {}) => type === 'highImpact',
        description: 'Up to 5 slides that auto-rotate every 4.2 s. Each slide has its own copy and optional CTA.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          label: 'Subtitle',
          admin: { rows: 2 },
        },
        linkGroup({
          appearances: ['default', 'outline'],
          overrides: {
            maxRows: 1,
            label: 'Call to Action',
            admin: { initCollapsed: true },
          },
        }),
      ],
    },

    // ─── Medium / Low Impact shared ────────────────────────────────────────
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      admin: {
        condition: (_, { type } = {}) => type === 'mediumImpact' || type === 'lowImpact',
        description: 'Main heading',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      admin: {
        condition: (_, { type } = {}) => type === 'mediumImpact' || type === 'lowImpact',
        description: 'Supporting line beneath the title',
        rows: 2,
      },
    },

    // ─── Medium Impact only ────────────────────────────────────────────────
    {
      name: 'badge',
      type: 'text',
      label: 'Badge',
      admin: {
        condition: (_, { type } = {}) => type === 'mediumImpact',
        description: 'Small chip label above the title (e.g. "NOW IN DEVELOPMENT")',
      },
    },
    {
      name: 'media',
      type: 'upload',
      label: 'Art Tile',
      relationTo: 'media',
      admin: {
        condition: (_, { type } = {}) => type === 'mediumImpact',
        description: 'Key art shown on the right column',
      },
    },

    // ─── Low Impact only ───────────────────────────────────────────────────
    {
      name: 'supertitle',
      type: 'text',
      label: 'Supertitle',
      admin: {
        condition: (_, { type } = {}) => type === 'lowImpact',
        description: 'Breadcrumb-style label above the title (e.g. "MEH Studios · Blog")',
      },
    },

    // ─── Medium Impact links ───────────────────────────────────────────────
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
        admin: {
          condition: (_, { type } = {}) => type === 'mediumImpact',
        },
      },
    }),

    // ─── Legacy richText (kept for data compatibility, hidden in admin) ────
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: false,
      admin: {
        condition: () => false,
      },
    },
  ],
  label: false,
}
