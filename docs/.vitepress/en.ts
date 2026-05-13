import { defineConfig, type DefaultTheme } from 'vitepress'

export const en = defineConfig({
  lang: 'en-US',
  description: 'Sequenzo, a powerful and flexible tool for analyzing and visualizing sequencing data.',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outlineTitle: 'Table of Contents',
    nav: [
      { text: 'Home', link: '/en/' },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        collapsed: true,
        items: [
          {
            text: 'About Sequenzo',
            link: '/en/basics/about-sequenzo'
          },
          {
            text: 'Foundations and Inspirations',
            link: '/en/basics/foundations-and-inspirations'
          },
          {
            text: '📖 Citation Guide',
            link: '/en/basics/how-to-cite'
          },
          {
            text: 'Join Our Communities',
            link: '/en/basics/join-our-community'
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
          link: '/en/basics/view-tutorials-online'
        },
        {
          text: 'Converting Numeric Data to Categorical Data',
          link: '/en/basics/if-you-have-numeric-data'
        },
        // {
        //   text: 'Typical workflow',
        //   link: '/en/basics/typical-workflow'
        // },
        // {
        //   text: 'How to Handle Missing Values',
        //   link: '/en/basics/handle-missing-values'
        // },
        {
          text: 'Working with Weighted Data',
          link: '/en/basics/weighted-data'
        }
          ]
      },
      {
        text: 'Conceptual Tutorials',
        collapsed: true,
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
            text: 'Dissimilarity Measures',
            link: '/en/tutorials/dissimilarity-measures'
          },
          {
            text: 'Normalizing Sequences',
            link: '/en/tutorials/normalizing-sequences'
          },
          {
            text: 'Computational Complexity of Dissimilarity Measures',
            link: '/en/tutorials/computational-complexity-of-dissimilarity-measures'
          },
          {
            text: 'Statistics Is More Than Models',
            link: '/en/tutorials/statistics-101'
          },
          {
            text: 'Sequence Analysis vs. Latent Class Analysis vs. Hidden Markov Models',
            link: '/en/tutorials/sa-lca-and-hmm'
          }
        ]
      },
      {
        text: 'Datasets',
        collapsed: true,
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
            text: "Chinese Territories' Colonial History (1840-1949)",
            link: '/en/datasets/chinese-territories-colonial-history'
          },
          {
            text: "Pairfam Family Trajectories",
            link: '/en/datasets/pairfam-family'
          },
          {
            text: "Pairfam Activity Trajectories",
            link: '/en/datasets/pairfam-activity'
          },
          {
            text: 'Biofam Family Life Trajectories',
            link: '/en/datasets/biofam'
          },
          {
            text: 'Biofam Three-Domain Family Life',
            link: '/en/datasets/biofam-three-domains'
          },
          {
            text: 'MVAD School-to-Work Transitions',
            link: '/en/datasets/mvad'
          },
          {
            text: "Political Science Aid Datasets",
            link: '/en/datasets/political-science-aid-datasets'
          },
          {
            // text: "Polyadic Sequence Data on Intergenerational Family Formation",
            text: "Intergenerational Family Data for Polyadic Analysis",
            link: '/en/datasets/dyadic-sequence-data-lsog'
          },
          {
            text: "College Students' Stress",
            link: '/en/datasets/stress-data'
          }
        ]
      },
      {
        text: 'Data Preprocessing Functions',
        collapsed: true,
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
            link: '/en/data-preprocessing/assign-unique-ids'
          }, 
          {
            text: 'Clean Time Columns',
            link: '/en/data-preprocessing/clean-time-columns'
          },
          {
            text: 'Replace Cluster ID by Labels',
            link: '/en/data-preprocessing/replace-cluster-id-by-labels'
          }
        ]
      },
      {
        text: 'Core Functions of Typical Workflow',
        collapsed: true,
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
            link: '/en/function-library/hierarchical-clustering'
          },
          {
            text: 'Cluster Quality',
            link: '/en/function-library/cluster-quality'
          },
          {
            text: 'Cluster Results',
            link: '/en/function-library/cluster-results'
          },
          {
            text: 'K Medoids',
            link: '/en/function-library/KMedoids'
          }
        ]
      },
      {
        text: 'Sequence Characteristics Indicators',
        collapsed: true,
        items: [
          { text: 'Sequenzo-TraMineR Mapping', link: '/en/sequence-characteristics-indicators/traminer-function-mapping' },
          { text: 'Sequence Length', link: '/en/sequence-characteristics-indicators/sequence-length' },
          { text: 'Spell Durations', link: '/en/sequence-characteristics-indicators/spell-durations' },
          { text: 'Visited States', link: '/en/sequence-characteristics-indicators/visited-states' },
          { text: 'Recurrence', link: '/en/sequence-characteristics-indicators/recurrence' },
          { text: 'Mean Spell Duration', link: '/en/sequence-characteristics-indicators/mean-spell-duration' },
          { text: 'Duration Standard Deviation', link: '/en/sequence-characteristics-indicators/duration-standard-deviation' },
          { text: 'Number of Subsequences', link: '/en/sequence-characteristics-indicators/number-of-subsequences' },
          { text: 'Number of Transitions', link: '/en/sequence-characteristics-indicators/number-of-transitions' },
          { text: 'Spell Duration Variance', link: '/en/sequence-characteristics-indicators/spell-duration-variance' },
          { text: 'State Frequencies per Sequence', link: '/en/sequence-characteristics-indicators/state-frequencies-per-sequence' },
          { text: 'State Frequencies and Entropy per Sequence', link: '/en/sequence-characteristics-indicators/state-frequencies-and-entropy-per-sequence' },
          { text: 'Within-Sequence Entropy', link: '/en/sequence-characteristics-indicators/within-sequence-entropy' },
          { text: 'Entropy Difference', link: '/en/sequence-characteristics-indicators/entropy-difference' },
          { text: 'Cross-Sectional Entropy', link: '/en/sequence-characteristics-indicators/cross-sectional-entropy' },
          { text: 'Volatility', link: '/en/sequence-characteristics-indicators/volatility' },
          { text: 'Sequence Complexity Index', link: '/en/sequence-characteristics-indicators/complexity-index' },
          { text: 'Turbulence', link: '/en/sequence-characteristics-indicators/turbulence' },
          { text: 'Positive-Negative Indicators', link: '/en/sequence-characteristics-indicators/positive-negative-indicators' },
          { text: 'Integration Index', link: '/en/sequence-characteristics-indicators/integration-index' },
          { text: 'Badness Index', link: '/en/sequence-characteristics-indicators/badness-index' },
          { text: 'Degradation Index', link: '/en/sequence-characteristics-indicators/degradation-index' },
          { text: 'Precarity Index', link: '/en/sequence-characteristics-indicators/precarity-index' },
          { text: 'Insecurity Index', link: '/en/sequence-characteristics-indicators/insecurity-index' },
        ]
      },
      {
        text: 'Statistics',
        collapsed: true,
        items: [
          { text: 'Sequenzo-TraMineR Mapping', link: '/en/statistics/traminer-function-mapping' },
          { text: 'Distinct State Sequences', link: '/en/statistics/distinct-state-sequences' },
          { text: 'State Spell Durations', link: '/en/statistics/state-spell-durations' },
          { text: 'Mean Time by State', link: '/en/statistics/mean-time-by-state' },
          { text: 'Individual State Distribution', link: '/en/statistics/individual-state-distribution' },
          { text: 'Modal State Sequence', link: '/en/statistics/modal-state-sequence' },
          { text: 'Sequence Length Summary', link: '/en/statistics/sequence-length-summary' },
          { text: 'Transition Count Summary', link: '/en/statistics/transition-count-summary' },
          { text: 'Weighted Mean', link: '/en/statistics/weighted-mean' },
          { text: 'Weighted Variance', link: '/en/statistics/weighted-variance' },
          { text: 'Weighted Five-Number Summary', link: '/en/statistics/weighted-five-number-summary' },
        ]
      },
      {
        text: 'Visualization Tools',
        collapsed: true,
        items: [
          {
            text: 'Sequenzo-TraMineR Mapping',
            link: '/en/visualization/traminer-function-mapping'
          },
          {
            text: 'Gallery',
            link: '/en/visualization/gallery'
          },
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
            link: '/en/visualization/plot-modal-state'
          },
          {
            text: 'Most Frequent Sequences Plot',
            link: '/en/visualization/plot-most-frequent-sequences'
          },
          {
            text: 'Mean Time Plot',
            link: '/en/visualization/plot-mean-time'
          },
          {
            text: 'Transition Matrix Plot',
            link: '/en/visualization/plot-transition-matrix'
          },
          {
            text: 'Relative Frequency Plot',
            link: '/en/visualization/plot-relative-frequency'
          },
          {
            text: 'Single Medoid Plot',
            link: '/en/visualization/plot-single-medoid'
          },
          {
            text: 'Longitudinal Characteristics Plot',
            link: '/en/visualization/plot-longitudinal-characteristics'
          },
          {
            text: 'Cross-Sectional Characteristics Plot',
            link: '/en/visualization/plot-cross-sectional-characteristics'
          }
        ]
      },
      {
        text: 'Event Sequences',
        collapsed: true,
        items: [
          {
            text: 'Introduction',
            link: '/en/event-sequences/introduction'
          },
          { text: 'Quickstart example', link: '/en/event-sequences/example' },
          {
            text: 'Sequenzo-TraMineR Mapping',
            link: '/en/event-sequences/traminer-function-mapping'
          },
          {
            text: 'Create Event Sequences',
            link: '/en/event-sequences/create-event-sequences'
          },
          {
            text: 'Find Frequent Subsequences',
            link: '/en/event-sequences/find-frequent-subsequences'
          },
          {
            text: 'Count Subsequence Occurrences',
            link: '/en/event-sequences/count-subsequence-occurrences'
          },
          {
            text: 'Compare Groups',
            link: '/en/event-sequences/compare-groups'
          },
          {
            text: 'Convert Event Sequences to TSE',
            link: '/en/event-sequences/convert-event-sequences-to-tse'
          },
          {
            text: 'Compute Event Transition Matrix',
            link: '/en/event-sequences/compute-event-transition-matrix'
          },
          {
            text: 'Check Event Subsequence Containment',
            link: '/en/event-sequences/check-event-subsequence-containment'
          },
          {
            text: 'Plot Event Sequences',
            link: '/en/event-sequences/plot-event-sequences'
          },
          {
            text: 'Plot Subsequence Frequencies',
            link: '/en/event-sequences/plot-subsequence-frequencies'
          },
          {
            text: 'Helper Functions',
            link: '/en/event-sequences/event-sequence-helpers'
          }
        ]
      },
      {
        text: 'Multidomain or Polyadic Sequence Analysis',
        collapsed: true,
        items: [
          {
            text: 'Sequenzo-TraMineR Mapping',
            link: '/en/multidomain/traminer-function-mapping'
          },
          {
            text: 'Association Between Domains',
            link: '/en/multidomain/association-between-domains'
          },
          {
            text: 'CAT Distance Matrix',
            link: '/en/multidomain/cat-distance-matrix'
          },
          {
            text: 'DAT Distance Matrix',
            link: '/en/multidomain/dat-distance-matrix'
          },
          {
            text: 'IDCD Sequence',
            link: '/en/multidomain/idcd-sequence'
          },
          {
            text: 'Combined Typology',
            link: '/en/multidomain/combined-typology'
          },
          {
            text: 'Merge Sparse CombT Types',
            link: '/en/multidomain/merge-sparse-combt-types'
          },
          {
            text: 'Linked Polyadic Sequence Analysis',
            link: '/en/multidomain/linked-polyadic-sequence-analysis'
          }
        ]
      },
      {
        text: 'Discrepancy Analysis',
        collapsed: true,
        items: [
          {
            text: 'Introduction',
            link: '/en/discrepancy-analysis/introduction'
          },
          {
            text: 'Sequenzo-TraMineR Mapping',
            link: '/en/discrepancy-analysis/traminer-function-mapping'
          },
          {
            text: 'Conceptual Guide',
            link: '/en/discrepancy-analysis/conceptual-guide'
          },
          {
            text: 'Distance-Based Association',
            link: '/en/discrepancy-analysis/get-group-distance-association'
          },
          {
            text: 'Differences by Position',
            link: '/en/discrepancy-analysis/get-group-differences-by-position'
          },
          {
            text: 'Permutation Tests',
            link: '/en/discrepancy-analysis/permutation-tests'
          },
          {
            text: 'Distance Tree',
            link: '/en/discrepancy-analysis/build-distance-tree'
          },
          {
            text: 'Sequence Tree',
            link: '/en/discrepancy-analysis/build-sequence-tree'
          }
        ]
      },
      {
        text: 'Group Comparison',
        collapsed: true,
        items: [
          {
            text: 'Conceptual Guide',
            link: '/en/group-comparison/conceptual-guide'
          },
          {
            text: 'Sequenzo and TraMineR Extra Mapping',
            link: '/en/group-comparison/traminer-function-mapping'
          },
          {
            text: 'Group Differences',
            link: '/en/group-comparison/get-group-differences'
          },
          {
            text: 'Likelihood-Ratio Test',
            link: '/en/group-comparison/get-lrt-test'
          },
          {
            text: 'Bayesian Information Criterion',
            link: '/en/group-comparison/get-bic-test'
          }
        ]
      },
      {
        text: 'Markov Chain Models',
        collapsed: true,
        items: [
          {
            text: 'Introduction',
            link: '/en/markov-chain-models/introduction'
          },
          {
            text: 'Conceptual Guides',
            collapsed: true,
            items: [
              {
                text: 'Markov Chain',
                link: '/en/markov-chain-models/markov-chain'
              },
              {
                text: 'Hidden Markov Model (HMM)',
                link: '/en/markov-chain-models/hmm'
              },
              {
                text: 'Mixed Hidden Markov Model (MHMM)',
                link: '/en/markov-chain-models/mhmm'
              }
            ]
          },
          {
            text: 'Sequenzo and seqHMM Mapping',
            link: '/en/markov-chain-models/seqhmm-function-mapping'
          },
          {
            text: 'Build HMM',
            link: '/en/markov-chain-models/build-hmm'
          },
          {
            text: 'Fit Model',
            link: '/en/markov-chain-models/fit-model'
          },
          {
            text: 'Predict Hidden States',
            link: '/en/markov-chain-models/predict'
          },
          {
            text: 'Posterior Probabilities',
            link: '/en/markov-chain-models/posterior-probs'
          },
          {
            text: 'Plot HMM',
            link: '/en/markov-chain-models/plot-hmm'
          },
          {
            text: 'Build MHMM',
            link: '/en/markov-chain-models/build-mhmm'
          },
          {
            text: 'Fit MHMM',
            link: '/en/markov-chain-models/fit-mhmm'
          },
          {
            text: 'Predict MHMM Clusters',
            link: '/en/markov-chain-models/predict-mhmm'
          },
          {
            text: 'MHMM Posterior Probabilities',
            link: '/en/markov-chain-models/posterior-probs-mhmm'
          },
          {
            text: 'Plot MHMM',
            link: '/en/markov-chain-models/plot-mhmm'
          },
          {
            text: 'Build NHMM',
            link: '/en/markov-chain-models/build-nhmm'
          },
          {
            text: 'Fit NHMM',
            link: '/en/markov-chain-models/fit-nhmm'
          },
          {
            text: 'Model Comparison',
            link: '/en/markov-chain-models/model-comparison'
          },
          {
            text: 'Simulate HMM',
            link: '/en/markov-chain-models/simulate-hmm'
          },
          {
            text: 'Simulate MHMM',
            link: '/en/markov-chain-models/simulate-mhmm'
          },
          {
            text: 'Simulate NHMM',
            link: '/en/markov-chain-models/simulate-nhmm'
          },
          {
            text: 'Bootstrap Model',
            link: '/en/markov-chain-models/bootstrap-model'
          },
          {
            text: 'Advanced Model Fitting',
            link: '/en/markov-chain-models/fit-model-advanced'
          }
        ]
      },
      // {
      //   text: 'Sequence Feature Extration and Selection',
      //   collapsed: true,
      //   items: [
      //     {
      //       text: 'Introduction',
      //       link: '/en/sequence-feature-selection/introduction'
      //     },
      //     {
      //       text: 'Conceptual Guide',
      //       link: '/en/sequence-feature-selection/conceptual-guide'
      //     },
      //     {
      //       text: 'Extract Sequence Features',
      //       link: '/en/sequence-feature-selection/extract-sequence-features'
      //     },
      //     {
      //       text: 'Select Relevant Features',
      //       link: '/en/sequence-feature-selection/select-relevant-features'
      //     },
      //     {
      //       text: 'Interpret Selected Features',
      //       link: '/en/sequence-feature-selection/interpret-selected-features'
      //     }
      //   ]
      // },
      // {
      //   text: 'Inequality Decomposition',
      //   collapsed: true,
      //   items: [
      //     {
      //       text: 'Introduction',
      //       link: '/en/inequality-decomposition/introduction'
      //     },
      //     {
      //       text: 'Conceptual Guide: SA–KOB Decomposition',
      //       link: '/en/inequality-decomposition/sa-kob-conceptual-guide'
      //     },
      //     {
      //       text: 'KOB Decomposition',
      //       link: '/en/inequality-decomposition/get-kob-decomposition'
      //     },
      //     {
      //       text: 'Oaxaca–Blinder Decomposition',
      //       link: '/en/inequality-decomposition/get-oaxaca-blinder-decomposition'
      //     }
      //   ]
      // },
      {
        text: 'Big Data Tools',
        collapsed: true,
        items: [
          {
            text: 'Check Uniqueness Rate',
            link: '/en/big-data/check-uniqueness-rate'
          },
          {
            text: 'Clara',
            link: '/en/big-data/clara'
          },
        ]
      },
      {
        text: 'Sequenzo and R',
        collapsed: true,
        items: [
          {
            text: 'Use R in Python Environment',
            link: '/en/traminer-and-sequenzo/use-R-in-python-environment'
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
      copyright: 'Copyright © 2025 - present <a href="https://yuqi-liang.tech">Yuqi Liang</a>, developed by <a href="https://www.mactavish.tech/">Mactavish</a> and <a href="https://yuqi-liang.tech">Yuqi Liang</a>'
    }
  }
})
