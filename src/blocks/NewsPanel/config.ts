import type { Block } from 'payload'

export const NewsPanel: Block = {
  slug: 'newsPanel',
  interfaceName: 'NewsPanelBlock',
  labels: { singular: 'News Panel', plural: 'News Panels' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'featuredEyebrow',
          type: 'text',
          label: 'Featured eyebrow (e.g. MAPLE SPRINGS)',
          admin: { width: '50%' },
        },
        {
          name: 'featuredEyebrowSub',
          type: 'text',
          label: 'Featured eyebrow subtitle (e.g. Research Facility)',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'featuredPost',
      type: 'relationship',
      relationTo: 'posts',
      required: true,
      label: 'Featured Post',
    },
    {
      name: 'articles',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      minRows: 1,
      maxRows: 4,
      label: 'News Rows (1–4 posts)',
      admin: {
        description: 'Pick up to 4 posts that appear as rows on the right.',
      },
    },
  ],
}
