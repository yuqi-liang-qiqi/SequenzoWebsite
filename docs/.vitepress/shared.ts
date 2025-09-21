import { defineConfig } from 'vitepress'

export const shared = defineConfig({
  title: "Sequenzo",

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/icononly_transparent_nobuffer.png' }],
    ['link', { rel: 'shortcut icon', type: 'image/png', href: '/icononly_transparent_nobuffer.png' }]
  ]
})
