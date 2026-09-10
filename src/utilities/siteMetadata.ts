/**
 * Single source of truth for the site's brand strings.
 *
 * Every page title, Open Graph card and admin-panel label pulls from here so a
 * rename is a one-file change instead of a grep across the app.
 */

/** The studio name on its own — used as a title suffix and as `og:site_name`. */
export const SITE_NAME = 'Multimedia Entertainment Hub'

/** The positioning line that follows the name in the full title. */
export const SITE_TAGLINE = 'A Game production studio'

/** The default `<title>` for pages that do not set their own. */
export const SITE_TITLE = `${SITE_NAME} | ${SITE_TAGLINE}`

/** Fallback meta/OG description for pages with no description of their own. */
export const SITE_DESCRIPTION =
  'Multimedia Entertainment Hub is a game production studio building original worlds, games and the community around them.'

/** Path (relative to the server URL) of the fallback Open Graph card. */
export const SITE_OG_IMAGE = '/meh-og.webp'

/**
 * Builds a page title in the house format: `Page | Multimedia Entertainment Hub`.
 * Passing nothing returns the full default title including the tagline.
 */
export const buildTitle = (pageTitle?: string | null): string =>
  pageTitle ? `${pageTitle} | ${SITE_NAME}` : SITE_TITLE
