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
                  { text: 'Level 3.1', link: '/zh/api-examples' },
                  { text: 'Level 3.2', link: '/zh/api-examples-1' }
                ]
              },
              {
                text: 'Level 2.2',
                items: [
                  { text: 'Level 3.3', link: '/zh/api-examples-2' },
                  { text: 'Level 3.4', link: '/zh/api-examples-3' }
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
      copyright: '版权所有 © 2025-至今 <a href="https://yuqi-liang.tech">Yuqi Liang</a>, 由 <a href="https://www.mactavish.tech/">Mactavish</a> 开发'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
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
