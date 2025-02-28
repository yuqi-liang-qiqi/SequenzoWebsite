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
        text: 'API',
        items: [
          {
            text: 'SequenceData',
            link: '/en/api/sequence-data'
          },
          {
            text: 'get_distance_matrix',
            link: '/en/api/get-distance-matrix'
          }
        ]
      },
      {
        text: 'Big Data',
        items: [
          {
            text: 'Functions Comparison',
            link: '/en/big-data/functions-comparison'
          },
          {
            text: 'Performance Differences',
            link: '/en/big-data/performance-diff'
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
            text: 'CO₂ Emissions (1800-2022)',
            link: '/en/datasets/co2-emissions'
          },
          {
            text: 'GDP per capita (1800-2022)',
            link: '/en/datasets/gdp-per-capita'
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
      message: 'Released under the BSD-3-Clause License.',
      copyright: 'Copyright © 2025 - present <a href="https://yuqi-liang.tech">Yuqi Liang</a>, developed by <a href="https://www.mactavish.tech/">Mactavish</a>'
    }
  }
})
