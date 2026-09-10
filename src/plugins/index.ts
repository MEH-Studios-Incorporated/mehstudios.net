import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { SITE_TITLE, buildTitle } from '@/utilities/siteMetadata'
import { collectionTemplatesPlugin } from '@alacrity-education/payload-plugin-collection-templates'
import { payloadPluginCollectionsGlobalsWebhook } from '@alacrity-education/payload-plugin-collections-globals-webhook'
import type { WebhookDocumentContext } from '@alacrity-education/payload-plugin-collections-globals-webhook'

/**
 * Only a published document fires the rebuild webhook.
 *
 * `pages` and `posts` autosave every 100ms for live preview, and Payload's
 * autosave runs the same submit path as a manual save — so the admin panel
 * reported a document update, and the webhook rebuilt the site, on every
 * keystroke. A Publish click is the only save that sets `_status` to
 * `published`; autosaves and Save Draft clicks stay `draft`, and a draft is not
 * on the public site, so there is nothing to rebuild.
 *
 * The globals below carry no `versions`, so every save of one is already
 * explicit and they stay opted in wholesale.
 */
const publishedOnly = ({ doc }: WebhookDocumentContext): boolean => doc._status === 'published'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? buildTitle(doc.title) : SITE_TITLE
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  collectionTemplatesPlugin({
    collections: {
      pages: true,
      posts: { exclude: ['author'] },
    },
  }),
  // `disabled` unless a target is configured: without a url the plugin reports
  // a configuration error on every admin save, so it stays inert until
  // PAYLOAD_WEBHOOK_URL is set.
  payloadPluginCollectionsGlobalsWebhook({
    url: process.env.PAYLOAD_WEBHOOK_URL,
    disabled: !process.env.PAYLOAD_WEBHOOK_URL,
    collections: {
      pages: { filter: publishedOnly },
      posts: { filter: publishedOnly },
    },
    globals: {
      header: true,
      footer: true,
    },
  }),
]
