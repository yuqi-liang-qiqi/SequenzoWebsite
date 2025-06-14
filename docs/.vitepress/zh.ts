import { defineConfig, type DefaultTheme } from 'vitepress'

export const zh = defineConfig({
  lang: 'zh-Hans',
  description: 'Sequenzo, a powerful and flexible tool for analyzing and visualizing sequencing data.',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/zh' },
    ],

    sidebar: [
      {
        text: '开始',
        items:[
          {
            text: 'Sequenzo',
            link: '/zh/brief-introduction'
          },
          {
            text: '下载安装',
            link: '/zh/basics/installing'
          },
          {
            text: '如何使用',
            link: '/zh/basics/quickstart'
          },
        ]
      },
      {
        text: '教程',
        items: [
          {
            text: '简洁教程',
            link: '/zh/tutorials/short-tutorial'
          },
          {
            text: '视频教程',
            link: '/zh/tutorials/video-tutorial'
          }
        ]
      },
      {
        text: '数据处理',
        items: [
          {
            text: '缺失值',
            link: '/zh/traminer-and-sequenzo/functions-comparison'
          },
          {
            text: '宽、长格式转换',
            link: '/zh/traminer-and-sequenzo/performance-diff'
          },
        ]
      },
      {
        text: '函数库',
        items: [
          {
            text: '简介',
            link: '/zh/function-library/introduction'
          },
          {
            text: 'SequenceData',
            link: '/zh/function-library/sequence-data'
          },
          {
            text: 'get_distance_matrix',
            link: '/zh/function-library/get-distance-matrix'
          }
        ]
      },
      {
        text: '大数据',
        items: [
          {
            text: '函数对比',
            link: '/zh/big-data/functions-comparison'
          },
          {
            text: '性能差异',
            link: '/zh/big-data/performance-diff'
          }
        ]
      },
      {
        text: 'Sequenzo 和 R',
        items: [
          {
            text: '函数对比',
            link: '/zh/traminer-and-sequenzo/functions-comparison'
          },
          {
            text: '性能差异',
            link: '/zh/traminer-and-sequenzo/performance-diff'
          }
        ]
      },
      {
        text: '数据集',
        items: [
          {
            text: 'CO₂ 排放 (1800-2022)',
            link: '/zh/datasets/co2-emissions'
          },
          {
            text: '人均 GDP (1800-2022)',
            link: '/zh/datasets/gdp-per-capita'
          },
          {
            text: "中国城市殖民史",
            link: '/zh/datasets/chinese-cities-colonial-history'
          }
        ]
      },
      {
        text: '常见问题',
        link: '/zh/faq'
      },
      {
        text: '更新日志',
        link: '/zh/changelog'
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Liang-Team/Sequenzo' }
    ],

    footer: {
      message: 'Released under the BSD-3-Clause License.',
      copyright: '版权所有 © 2025 至今 <a href="https://yuqi-liang.tech">Yuqi Liang</a>, 由 <a href="https://www.mactavish.tech/">Mactavish</a> 开发'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    skipToContentLabel: '跳转到内容'
  }
})

export const search: DefaultTheme.AlgoliaSearchOptions['locales'] = {
  zh: {
    placeholder: '搜索文档',
    translations: {
      button: {
        buttonText: '搜索文档',
        buttonAriaLabel: '搜索文档'
      },
      modal: {
        searchBox: {
          resetButtonTitle: '清除查询条件',
          resetButtonAriaLabel: '清除查询条件',
          cancelButtonText: '取消',
          cancelButtonAriaLabel: '取消'
        },
        startScreen: {
          recentSearchesTitle: '搜索历史',
          noRecentSearchesText: '没有搜索历史',
          saveRecentSearchButtonTitle: '保存至搜索历史',
          removeRecentSearchButtonTitle: '从搜索历史中移除',
          favoriteSearchesTitle: '收藏',
          removeFavoriteSearchButtonTitle: '从收藏中移除'
        },
        errorScreen: {
          titleText: '无法获取结果',
          helpText: '你可能需要检查你的网络连接'
        },
        footer: {
          selectText: '选择',
          navigateText: '切换',
          closeText: '关闭',
          searchByText: '搜索提供者'
        },
        noResultsScreen: {
          noResultsText: '无法找到相关结果',
          suggestedQueryText: '你可以尝试查询',
          reportMissingResultsText: '你认为该查询应该有结果？',
          reportMissingResultsLinkText: '点击反馈'
        }
      }
    }
  }
}
