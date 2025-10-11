import { defineConfig, type DefaultTheme } from 'vitepress'

export const en = defineConfig({
  lang: 'en-US',
  description: 'Sequenzo, a powerful and flexible tool for analyzing and visualizing sequencing data.',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/en/' },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          {
            text: 'About Sequenzo',
            link: '/en/basics/about-sequenzo'
          },
          {
          text: 'Installing',
          link: '/en/basics/installing'
        },
        //   {
        //   text: 'Quickstart',
        //   link: '/en/basics/quickstart'
        // },
        {
          text: 'View Our Coding Tutorials Online',
          link: '/en/basics/view_tutorials_online'
        },
        {
          text: 'Converting Numeric Data to Categorical Data',
          link: '/en/basics/if_you_have_numeric_data'
        },
        // {
        //   text: 'Typical workflow',
        //   link: '/en/basics/typical_workflow'
        // },
        // {
        //   text: 'How to Handle Missing Values',
        //   link: '/en/basics/handle_missing_values'
        // },
        {
          text: 'Working with Weighted Data',
          link: '/en/basics/weighted_data'
        }
          ]
      },
      {
        text: 'Conceptual Tutorials',
        items: [
          {
            text: 'Basic Concepts',
            link: '/en/tutorials/basic-concepts'
          },
          {
            text: 'Timing, Duration, and Order',
            link: '/en/tutorials/timing-duration-order'
          },
          {
            text: 'Sequence Analysis vs. Latent Class Analysis vs. Hidden Markov Models',
            link: '/en/tutorials/sa_lca_and_hmm'
          }
          // {
          //   text: 'Dissimilarity measures',
          //   link: '/en/tutorials/dissimilarity-measures'
          // }
        ]
      },
      {
        text: 'Data Preprocessing Functions',
        items: [
          {
            text: 'Check Missing Values',
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
        text: 'Core Functions',
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
            text: 'Get Distance Matrix',
            link: '/en/function-library/get-distance-matrix'
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
          },
          {
            text: 'K Medoids',
            link: '/en/function-library/KMedoids'
          }
        ]
      },
      {
        text: 'Visualization Tools',
        items: [
          {
            text: 'Common Parameters and Features in Visualization Functions',
            link: '/en/visualization/introduction'
          },
          {
            text: 'How to Customize Colors and Recommended Color Schemes',
            link: '/en/visualization/how-to-customize-colors'
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
        text: 'Big Data Tools',
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
            text: 'Use R in Python Environment',
            link: '/en/traminer-and-sequenzo/use_R_in_python_environment'
          },
          // {
          //   text: 'Functions Comparison',
          //   link: '/en/traminer-and-sequenzo/functions-comparison'
          // },
          // {
          //   text: 'Performance Differences',
          //   link: '/en/traminer-and-sequenzo/performance-diff'
          // }
        ]
      },
      {
        text: 'Datasets',
        items: [
          {
            text: 'CO₂ Emissions (1800-2022)',
            link: '/en/datasets/CO2-emissions'
          },
          // {
          //   text: 'GDP per capita (1800-2022)',
          //   link: '/en/datasets/gdp-per-capita'
          // },
          {
            text: "Chinese Territories' Colonial History",
            link: '/en/datasets/chinese-territories-colonial-history'
          },
          {
            text: "Pairfam Family Trajectories",
            link: '/en/datasets/pairfam-family'
          }
        ]
      },
      // {
      //   text: 'Frequently Asked Questions',
      //   link: '/en/faq'
      // },
      {
        text: 'Team and Acknowledgements',
        link: '/en/faq/team_and_acknolwedgements'
      },
      {
        text: 'Bug Reports and Feature Requests',
        link: '/en/faq/bug_reports_and_feature_requests'
      },
      {
        text: 'What\'s New',
        link: '/en/changelog'
      },
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
