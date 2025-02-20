import { defineConfig, type DefaultTheme } from 'vitepress'

export const en = defineConfig({
  lang: 'en-US',
  description: 'Sequenzo, a powerful and flexible tool for analyzing and visualizing sequencing data.',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/en' },
    ],

    sidebar: [
      {
        text: 'Level 0',
        collapsed: false,
        items: [
          {
            text: 'Level 1',
            //collapsed: false,
            items: [
              {
                text: 'Level 2.1',
                items: [
                  { text: 'Level 3.1', link: '/en/markdown-examples' },
                  { text: 'Level 3.2', link: '/en/markdown-examples-1' }
                ]
              },
              {
                text: 'Level 2.2',
                items: [
                  { text: 'Level 3.3', link: '/en/markdown-examples-2' },
                  { text: 'Level 3.4', link: '/en/markdown-examples-3' }
                ]
              }
            ]
          },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Liang-Team/Sequenzo' }
    ],

    footer: {
      //message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present <a href="https://yuqi-liang.tech">Yuqi Liang</a>, developed by <a href="https://www.mactavish.tech/">Mactavish</a>'
    }
  }
})
