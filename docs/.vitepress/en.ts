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
        {
          text: 'How to View Our Jupyter Notebook Tutorials Online',
          link: '/en/basics/if_you_cannot_render_ipynb_on_github'
        },
        {
          text: 'Converting numeric data to categorical data',
          link: '/en/basics/if_you_have_numeric_data'
        },
        {
          text: 'Typical workflow',
          link: '/en/basics/typical_workflow'
        }
          ]
      },
      {
        text: 'Tutorials',
        items: [
          {
            text: 'Basic concepts',
            link: '/en/tutorials/basic-concepts'
          },
          {
            text: 'Timing, duration, and order',
            link: '/en/tutorials/timing-duration-order'
          }
        ]
      },
      {
        text: 'Data Preprocessing',
        items: [
          {
            text: 'Missing Values',
            link: '/en/data-preprocessing/missing-values'
          },
          {
            text: 'Wide and Long Format Conversion',
            link: '/en/data-preprocessing/wide-long-format'
          },
          {
            text: 'Assign Unique IDs',
            link: '/en/data-preprocessing/assign_unique_ids'
          }, 
          {
            text: 'Clean Time Columns',
            link: '/en/data-preprocessing/clean_time_columns'
          },
          {
            text: 'Replace Cluster ID by Labels',
            link: '/en/data-preprocessing/replace_cluster_id_by_labels'
          }
        ]
      },
      {
        text: 'Function Library',
        items: [
          {
            text: 'Introduction',
            link: '/en/function-library/introduction'
          },
          {
            text: 'SequenceData',
            link: '/en/function-library/sequence-data'
          },
          {
            text: 'get_distance_matrix',
            link: '/en/function-library/get-distance-matrix'
          },
          {
            text: 'K Medoids',
            link: '/en/function-library/KMedoids'
          },
          {
            text: 'Hierarchical Clustering',
            link: '/en/function-library/hierarchical_clustering'
          },
          {
            text: 'Cluster Quality',
            link: '/en/function-library/cluster_quality'
          },
          {
            text: 'Cluster Results',
            link: '/en/function-library/cluster_results'
          }
        ]
      },
      {
        text: 'Visualization',
        items: [
          {
            text: 'Common Parameters and Features in Visualization Functions',
            link: '/en/visualization/introduction'
          },
          {
            text: 'Index Plot',
            link: '/en/visualization/index-plot'
          },
          {
            text: 'State Distribution Plot',
            link: '/en/visualization/state-distribution-plot'
          },
          {
            text: 'Modal State Plot',
            link: '/en/visualization/plot_modal_state'
          },
          {
            text: 'Most Frequent Sequences Plot',
            link: '/en/visualization/plot_most_frequent_sequences'
          },
          {
            text: 'Mean Time Plot',
            link: '/en/visualization/plot_mean_time'
          },
          {
            text: 'Transition Matrix Plot',
            link: '/en/visualization/plot_transition_matrix'
          },
          {
            text: 'Relative Frequency Plot',
            link: '/en/visualization/plot_relative_frequency'
          },
          {
            text: 'Single Medoid Plot',
            link: '/en/visualization/plot_single_medoid'
          }
        ]
      },
      {
        text: 'Big Data',
        items: [
          {
            text: 'Clara',
            link: '/en/big-data/clara'
          },
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
            link: '/en/datasets/CO2-emissions'
          },
          {
            text: 'GDP per capita (1800-2022)',
            link: '/en/datasets/gdp-per-capita'
          },
          {
            text: "Chinese Territories' Colonial History",
            link: '/en/datasets/chinese-territories-colonial-history'
          }
        ]
      },
      {
        text: 'Frequently Asked Questions',
        link: '/en/faq'
      },
      {
        text: 'Team and Acknowledgements',
        link: '/en/faq/team_and_acknolwedgements'
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
