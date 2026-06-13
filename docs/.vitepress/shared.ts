
import { defineConfig } from 'vitepress'

export const shared = defineConfig({
  title: "Sequenzo",

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  sitemap: {
    hostname: 'https://sequenzo.yuqi-liang.tech'
  },
  themeConfig: {
    // Many English pages do not yet have Chinese counterparts. Send language
    // switchers to the locale home pages instead of generating same-path links
    // that would 404 for untranslated pages.
    i18nRouting: false,
    // Local search must be configured at the site level (not per-locale),
    // otherwise VitePress does not build the search index.
    search: {
      provider: 'local'
    }
  },
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/icononly_transparent_nobuffer.png' }],
    ['link', { rel: 'shortcut icon', type: 'image/png', href: '/icononly_transparent_nobuffer.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Sequenzo' }],
    ['meta', { property: 'og:image', content: 'https://sequenzo.yuqi-liang.tech/fulllogo_transparent.png' }],
    ['meta', { name: 'twitter:card', content: 'summary' }]
  ]
})
