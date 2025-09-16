import { defineConfig, type DefaultTheme } from 'vitepress'

export const zh = defineConfig({
  lang: 'zh-Hans',
  description: 'Sequenzo, a powerful and flexible tool for analyzing and visualizing sequencing data.',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/zh/' },
    ],

    sidebar: [
      {
        text: '开始',
        items:[
          {
            text: '序列分析与 Sequenzo',
            link: '/zh/basics/about-sequenzo'
          },
          {
            text: '下载安装',
            link: '/zh/basics/installing'
          },
          {
            text: '如何在线查看代码教程',
            link: '/zh/basics/view_tutorials_online'
          },
          {
            text: 'Converting numeric data to categorical data',
            link: '/zh/basics/if_you_have_numeric_data'
          },
          {
            text: '常见工作流',
            link: '/zh/basics/typical_workflow'
          },
          {
            text: '如何处理缺失值',
            link: '/zh/basics/handle_missing_values'
          }
        ]
      },
      {
        text: '概念/知识类教程',
        items: [
          {
            text: '基本概念',
            link: '/zh/tutorials/basic-concepts'
          },
          {
            text: '时点、时长和顺序',
            link: '/zh/tutorials/timing-duration-order'
          },
          {
            text: '理解非相似度量',
            link: '/zh/tutorials/dissimilarity-measures'
          }
        ]
      },
      {
        text: '数据预处理工具',
        items: [
          {
            text: '缺失值',
            link: '/zh/data-preprocessing/missing-values'
          },
          {
            text: '宽、长格式转换',
            link: '/zh/data-preprocessing/wide-long-format'
          },
          {
            text: '分配唯一 ID',
            link: '/zh/data-preprocessing/assign_unique_ids'
          }, 
          {
            text: '清洗时间列',
            link: '/zh/data-preprocessing/clean_time_columns'
          },
          {
            text: '替换簇 ID 为标签',
            link: '/zh/data-preprocessing/replace_cluster_id_by_labels'
          },
        ]
      },
      {
        text: '核心的类和算法',
        items: [
          {
            text: '简介',
            link: '/zh/function-library/introduction'
          },
          {
            text: '标准的序列数据结构',
            link: '/zh/function-library/sequence-data'
          },
          {
            text: '计算距离矩阵',
            link: '/zh/function-library/get-distance-matrix'
          },
          {
            text: '层次聚类',
            link: '/zh/function-library/hierarchical_clustering'
          },
          {
            text: '聚类质量',
            link: '/zh/function-library/cluster_quality'
          },
          {
            text: '聚类结果',
            link: '/zh/function-library/cluster_results'
          },
          {
            text: 'K Medoids',
            link: '/zh/function-library/KMedoids'
          }
        ]
      },
      {
        text: '可视化工具',
        items: [
          {
            text: '常见绘图参数和特征',
            link: '/zh/visualization/introduction'
          },
          {
            text: '索引图',
            link: '/zh/visualization/index-plot'
          },
          {
            text: '状态分布图',
            link: '/zh/visualization/state-distribution-plot'
          },
          {
            text: '模态状态图',
            link: '/zh/visualization/plot_modal_state'
          },
          {
            text: '最频繁序列图',
            link: '/zh/visualization/plot_most_frequent_sequences'
          },
          {
            text: '平均时间图',
            link: '/zh/visualization/plot_mean_time'
          },
          {
            text: '转移矩阵图',
            link: '/zh/visualization/plot_transition_matrix'
          },
          {
            text: '相对频率图',
            link: '/zh/visualization/plot_relative_frequency'
          },
          {
            text: '单个 Medoid 图',
            link: '/zh/visualization/plot_single_medoid'
          }
        ]
      },
      {
        text: '大数据工具',
        items: [
          {
            text: 'Clara 算法',
            link: '/zh/big-data/clara'
          },
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
            link: '/zh/datasets/CO2-emissions'
          },
          {
            text: '人均 GDP (1800-2022)',
            link: '/zh/datasets/gdp-per-capita'
          },
          {
            text: "中国地区殖民史",
            link: '/zh/datasets/chinese-territories-colonial-history'
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
      },
      {
        text: '团队与致谢',
        link: '/zh/faq/team_and_acknolwedgements'
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
