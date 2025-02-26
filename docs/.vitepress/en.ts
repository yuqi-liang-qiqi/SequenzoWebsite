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
        text: 'Basics',
        items: [
          {
            text: 'About Sequenzo',
            link: '/en/basics/about-sequenzo'
          },
          {
          text: 'Installing',
          link: '/en/basics/installing'
        },
          {
          text: 'Quickstart',
          link: '/en/basics/quickstart'
        },
          ]
      },
      {
        text: 'Tutorials',
        items: [
          {
            text: 'Basic concepts',
            link: '/en/tutorials/short-tutorial'
          },
          {
            text: 'Video Tutorial',
            link: '/en/tutorials/video-tutorial'
          }
        ]
      },
      {
        text: 'Sequenzo and R',
        items: [
          {
            text: 'Functions Comparison',
            link: '/en/traminer-and-sequenzo/functions-comparison'
          },
          {
            text: 'Performance Differences',
            link: '/en/traminer-and-sequenzo/performance-diff'
          }
        ]
      },
      {
        text: 'Datasets',
        items: [
          {
            text: 'CO₂ Emissions',
            link: '/en/datasets/co2-emissions'
          },
          {
            text: "Chinese Cities' Colonial History",
            link: '/en/datasets/chinese-cities-colonial-history'
          }
        ]
      },
      {
        text: 'Frequently Asked Questions',
        link: '/en/faq'
      },
      {
        text: 'Changelog',
        link: '/en/changelog'
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Liang-Team/Sequenzo' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 - present <a href="https://yuqi-liang.tech">Yuqi Liang</a>, developed by <a href="https://www.mactavish.tech/">Mactavish</a>'
    }
  }
})
