import { defineConfig } from 'vitepress'

export const en = defineConfig({
  lang: 'en-US',
  description: 'Sequenzo is a Python package for analyzing categorical sequences and life-course trajectories.',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outlineTitle: 'Table of Contents',
    nav: [
      { text: 'Install', link: '/en/basics/installing' },
      { text: 'Quickstart', link: '/en/basics/quickstart' },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        collapsed: true,
        items: [
          {
            text: 'About Sequenzo',
            link: '/en/basics/about-sequenzo',
            collapsed: false,
            items: [
              {
                text: 'Sequence Foundations and Inspirations',
                link: '/en/basics/foundations-and-inspirations'
              },
              {
                text: '📖 How to Cite Us?',
                link: '/en/basics/how-to-cite'
              },
              {
                text: 'Join Our Community',
                link: '/en/basics/join-our-community'
              }
            ]
          },
          {
            text: 'Onboarding',
            collapsed: false,
            items: [
              {
                text: 'Installation',
                link: '/en/basics/installing'
              },
              {
                text: 'Quickstart',
                link: '/en/basics/quickstart'
              },
              {
                text: 'Typical Workflow',
                link: '/en/basics/typical-workflow'
              },
              {
                text: 'View Our Tutorials Online',
                link: '/en/basics/view-tutorials-online'
              }
            ]
          },
          {
            text: 'Common Setup Decisions',
            collapsed: false,
            items: [
              {
                text: 'Numeric to Categorical Data',
                link: '/en/basics/if-you-have-numeric-data'
              },
              {
                text: 'Handling Missing Values',
                link: '/en/basics/handle-missing-values'
              },
              {
                text: 'Working with Weighted Data',
                link: '/en/basics/weighted-data'
              },
              {
                text: 'Big Data Concepts',
                link: '/en/basics/if-you-have-big-data'
              }
            ]
          }
        ]
      },
      {
        text: 'Conceptual Guides',
        collapsed: true,
        items: [
          {
            text: 'Overview',
            link: '/en/tutorials/introduction'
          },
          {
            text: 'Foundations',
            collapsed: false,
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
                text: 'Sequence Summary Statistics vs Sequence Characteristics Indicators',
                link: '/en/tutorials/sequence-indicators-and-statistics'
              },
              {
                text: 'Statistics Is More Than Models',
                link: '/en/tutorials/statistics-101'
              },
              {
                text: 'Sequence Analysis vs. Regression',
                link: '/en/tutorials/sa-vs-regression'
              }
            ]
          },
          {
            text: 'Dissimilarity-Based Clustering',
            collapsed: false,
            items: [
              {
                text: 'Dissimilarity Measures',
                link: '/en/tutorials/dissimilarity-measures'
              },
              {
                text: 'Distance Matrices',
                link: '/en/tutorials/matrix-in-dissimilarity-measures'
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
                text: 'Cluster Analysis Methods',
                link: '/en/tutorials/cluster-analysis-methods'
              },
              {
                text: 'Cluster Quality Indicators',
                link: '/en/tutorials/cluster-quality-indicators'
              },
              {
                text: 'Understanding CLARA',
                link: '/en/tutorials/understanding-clara'
              },
              {
                text: 'Reporting Results of the Typical Workflow',
                link: '/en/tutorials/reporting-sequence-analysis'
              }
            ]
          },
          {
            text: 'Probabilistic Models',
            collapsed: false,
            items: [
              {
                text: 'Latent Class Analysis',
                link: '/en/tutorials/lca'
              },
              {
                text: 'Markov Chains',
                link: '/en/tutorials/markov-chain-models-01'
              },
              {
                text: 'Hidden Markov Models',
                link: '/en/tutorials/markov-chain-models-02'
              },
              {
                text: 'Sequence Analysis vs. LCA vs. HMM',
                link: '/en/tutorials/sa-lca-and-hmm'
              }
            ]
          },
          {
            text: 'Event Models',
            collapsed: false,
            items: [
              {
                text: 'Sequence History Analysis',
                link: '/en/tutorials/sequence-history-analysis'
              },
              {
                text: 'Sequence Analysis Multi-state Model',
                link: '/en/tutorials/multi-state-model'
              }
            ]
          }
        ]
      },
      {
        text: 'Datasets',
        collapsed: true,
        items: [
          {
            text: 'Overview',
            link: '/en/datasets/introduction'
          },
          {
            text: 'CO₂ Emissions (1800-2022)',
            link: '/en/datasets/CO2-emissions'
          },
          {
            text: 'GDP per Capita (1800-2022)',
            link: '/en/datasets/gdp-per-capita'
          },
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
        text: 'Data Preparation',
        collapsed: true,
        items: [
          {
            text: 'Overview',
            link: '/en/data-preprocessing/introduction'
          },
          {
            text: 'Wide and Long Format Conversion',
            link: '/en/data-preprocessing/wide-long-format'
          },
          {
            text: 'Clean Time Columns',
            link: '/en/data-preprocessing/clean-time-columns'
          },
          {
            text: 'Assign Unique IDs',
            link: '/en/data-preprocessing/assign-unique-ids'
          },
          {
            text: 'Check Missing Values',
            link: '/en/data-preprocessing/missing-values'
          },
          {
            text: 'Replace Cluster ID by Labels',
            link: '/en/data-preprocessing/replace-cluster-id-by-labels'
          }
        ]
      },
      {
        text: 'Typical Workflow Functions',
        collapsed: true,
        items: [
          {
            text: 'Overview',
            link: '/en/function-library/introduction'
          },
          {
            text: 'SequenceData',
            link: '/en/function-library/sequence-data'
          },
          {
            text: 'get_distance_matrix()',
            link: '/en/function-library/get-distance-matrix'
          },
          {
            text: 'Cluster()',
            link: '/en/function-library/hierarchical-clustering'
          },
          {
            text: 'ClusterQuality()',
            link: '/en/function-library/cluster-quality'
          },
          {
            text: 'ClusterResults()',
            link: '/en/function-library/cluster-results'
          },
          {
            text: 'KMedoids()',
            link: '/en/function-library/KMedoids'
          }
        ]
      },
      {
        text: 'Sequence Operations and Distances',
        collapsed: true,
        items: [
          {
            text: 'Overview',
            link: '/en/function-library/sequence-operations'
          },
          {
            text: 'Prefix and Suffix Trees',
            link: '/en/sequence-characteristics-indicators/prefix-and-suffix-trees'
          },
          {
            text: 'Dissimilarity Helper Functions',
            link: '/en/function-library/dissimilarity-helpers'
          }
        ]
      },
      {
        text: 'Sequence Summary Statistics',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/en/statistics/introduction' },
          { text: 'Sequence Summary Statistics vs Sequence Characteristics Indicators', link: '/en/tutorials/sequence-indicators-and-statistics' },
          { text: 'Sequenzo and TraMineR Mapping', link: '/en/statistics/traminer-function-mapping' },
          {
            text: 'Sequence Summaries',
            collapsed: true,
            items: [
              { text: 'Distinct State Sequences', link: '/en/statistics/distinct-state-sequences' },
              { text: 'State Spell Durations', link: '/en/statistics/state-spell-durations' },
              { text: 'Mean Time by State', link: '/en/statistics/mean-time-by-state' },
              { text: 'Individual State Distribution', link: '/en/statistics/individual-state-distribution' },
              { text: 'Modal State Sequence', link: '/en/statistics/modal-state-sequence' },
              { text: 'Sequence Length Summary', link: '/en/statistics/sequence-length-summary' },
              { text: 'Transition Count Summary', link: '/en/statistics/transition-count-summary' },
            ]
          },
          {
            text: 'Weighted Summary Statistics',
            collapsed: true,
            items: [
              { text: 'Weighted Mean', link: '/en/statistics/weighted-mean' },
              { text: 'Weighted Variance', link: '/en/statistics/weighted-variance' },
              { text: 'Weighted Five-Number Summary', link: '/en/statistics/weighted-five-number-summary' },
            ]
          },
        ]
      },
      {
        text: 'Sequence Characteristics Indicators',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/en/sequence-characteristics-indicators/introduction' },
          { text: 'Sequence Summary Statistics vs Sequence Characteristics Indicators', link: '/en/tutorials/sequence-indicators-and-statistics' },
          { text: 'Sequenzo and TraMineR Mapping', link: '/en/sequence-characteristics-indicators/traminer-function-mapping' },
          {
            text: 'Length and Duration',
            collapsed: true,
            items: [
              { text: 'Sequence Length', link: '/en/sequence-characteristics-indicators/sequence-length' },
              { text: 'Spell Durations', link: '/en/sequence-characteristics-indicators/spell-durations' },
              { text: 'Mean Spell Duration', link: '/en/sequence-characteristics-indicators/mean-spell-duration' },
              { text: 'Duration Standard Deviation', link: '/en/sequence-characteristics-indicators/duration-standard-deviation' },
              { text: 'Spell Duration Variance', link: '/en/sequence-characteristics-indicators/spell-duration-variance' },
            ]
          },
          {
            text: 'States and Transitions',
            collapsed: true,
            items: [
              { text: 'Visited States', link: '/en/sequence-characteristics-indicators/visited-states' },
              { text: 'Recurrence', link: '/en/sequence-characteristics-indicators/recurrence' },
              { text: 'Number of Subsequences', link: '/en/sequence-characteristics-indicators/number-of-subsequences' },
              { text: 'Number of Transitions', link: '/en/sequence-characteristics-indicators/number-of-transitions' },
              { text: 'State Frequencies per Sequence', link: '/en/sequence-characteristics-indicators/state-frequencies-per-sequence' },
              { text: 'State Frequencies and Entropy per Sequence', link: '/en/sequence-characteristics-indicators/state-frequencies-and-entropy-per-sequence' },
            ]
          },
          {
            text: 'Entropy, Complexity, and Instability',
            collapsed: true,
            items: [
              { text: 'Within-Sequence Entropy', link: '/en/sequence-characteristics-indicators/within-sequence-entropy' },
              { text: 'Entropy Difference', link: '/en/sequence-characteristics-indicators/entropy-difference' },
              { text: 'Cross-Sectional Entropy', link: '/en/sequence-characteristics-indicators/cross-sectional-entropy' },
              { text: 'Volatility', link: '/en/sequence-characteristics-indicators/volatility' },
              { text: 'Sequence Complexity Index', link: '/en/sequence-characteristics-indicators/complexity-index' },
              { text: 'Turbulence', link: '/en/sequence-characteristics-indicators/turbulence' },
            ]
          },
          {
            text: 'Ranked and Quality Indices',
            collapsed: true,
            items: [
              { text: 'Positive-Negative Indicators', link: '/en/sequence-characteristics-indicators/positive-negative-indicators' },
              { text: 'Integration Index', link: '/en/sequence-characteristics-indicators/integration-index' },
              { text: 'Badness Index', link: '/en/sequence-characteristics-indicators/badness-index' },
              { text: 'Degradation Index', link: '/en/sequence-characteristics-indicators/degradation-index' },
              { text: 'Precarity Index', link: '/en/sequence-characteristics-indicators/precarity-index' },
              { text: 'Insecurity Index', link: '/en/sequence-characteristics-indicators/insecurity-index' },
            ]
          },
        ]
      },
      {
        text: 'Visualization Tools',
        collapsed: true,
        items: [
          {
            text: 'Overview',
            link: '/en/visualization/introduction'
          },
          {
            text: 'Gallery',
            link: '/en/visualization/gallery'
          },
          {
            text: 'How to Read Sequence Plots',
            link: '/en/tutorials/reading-sequence-plots'
          },
          {
            text: 'Sequenzo and TraMineR Mapping',
            link: '/en/visualization/traminer-function-mapping'
          },
          {
            text: 'Customize Colors',
            link: '/en/visualization/how-to-customize-colors'
          },
          {
            text: 'Longitudinal Views',
            collapsed: true,
            items: [
              {
                text: 'Index Plot',
                link: '/en/visualization/index-plot'
              },
              {
                text: 'Most Frequent Sequences Plot',
                link: '/en/visualization/plot-most-frequent-sequences'
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
              }
            ]
          },
          {
            text: 'Cross-Sectional Views',
            collapsed: true,
            items: [
              {
                text: 'State Distribution Plot',
                link: '/en/visualization/state-distribution-plot'
              },
              {
                text: 'Modal State Plot',
                link: '/en/visualization/plot-modal-state'
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
                text: 'Cross-Sectional Characteristics Plot',
                link: '/en/visualization/plot-cross-sectional-characteristics'
              }
            ]
          }
        ]
      },
      {
        text: 'Beyond Basic Clustering',
        collapsed: true,
        items: [
          {
            text: 'From Sequences to Variables',
            collapsed: true,
            items: [
              {
                text: 'Overview',
                link: '/en/beyond-basic-clustering/from-sequences-to-variables/introduction'
              },
              {
                text: 'Conceptual Guide',
                link: '/en/beyond-basic-clustering/from-sequences-to-variables/conceptual-guide'
              },
              {
                text: 'Representativeness Matrix',
                link: '/en/beyond-basic-clustering/from-sequences-to-variables/representativeness-matrix'
              },
              {
                text: 'Hard Classification Variables',
                link: '/en/beyond-basic-clustering/from-sequences-to-variables/hard-classification-variables'
              },
              {
                text: 'FANNY Membership',
                link: '/en/beyond-basic-clustering/from-sequences-to-variables/fanny-membership'
              },
              {
                text: 'Soft Classification Variables',
                link: '/en/beyond-basic-clustering/from-sequences-to-variables/soft-classification-variables'
              },
              {
                text: 'Pseudoclass Regression',
                link: '/en/beyond-basic-clustering/from-sequences-to-variables/pseudoclass-regression'
              },
              {
                text: 'KMedoids Result Helpers',
                link: '/en/beyond-basic-clustering/from-sequences-to-variables/medoid-indices-from-kmedoids-result'
              },
              {
                text: 'Max Distance',
                link: '/en/beyond-basic-clustering/from-sequences-to-variables/max-distance'
              },
              {
                text: 'Cluster Labels to Dummies',
                link: '/en/beyond-basic-clustering/from-sequences-to-variables/cluster-labels-to-dummies'
              }
            ]
          },
          {
            text: 'Representative Sequences',
            link: '/en/function-library/representative-sequences'
          },
          {
            text: 'Clustering Extensions',
            link: '/en/beyond-basic-clustering/clustering-extensions'
          }
        ]
      },
      {
        text: 'Discrepancy Analysis',
        collapsed: true,
        items: [
          {
            text: 'Overview',
            link: '/en/discrepancy-analysis/introduction'
          },
          {
            text: 'Sequenzo and TraMineR Mapping',
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
            text: 'Overview',
            link: '/en/group-comparison/introduction'
          },
          {
            text: 'Conceptual Guide',
            link: '/en/group-comparison/conceptual-guide'
          },
          {
            text: 'Sequenzo and TraMineR Mapping',
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
        text: 'Decomposition',
        collapsed: true,
        items: [
          {
            text: 'Overview',
            link: '/en/decomposition/introduction'
          },
          {
            text: 'Conceptual Guide: SA–KOB Decomposition',
            link: '/en/decomposition/sa-kob-conceptual-guide'
          },
          {
            text: 'SA–KOB Decomposition',
            link: '/en/decomposition/get-sa-kob-decomposition'
          },
          {
            text: 'SA–KOB Bootstrap',
            link: '/en/decomposition/get-sa-kob-decomposition-bootstrap'
          },
          {
            text: 'KOB Decomposition',
            link: '/en/decomposition/get-kob-decomposition'
          },
          {
            text: 'KOB Bootstrap',
            link: '/en/decomposition/get-kob-decomposition-bootstrap'
          },
          {
            text: 'Oaxaca–Blinder Decomposition',
            link: '/en/decomposition/get-oaxaca-blinder-decomposition'
          }
        ]
      },
      {
        text: 'Feature Extraction and Selection',
        collapsed: true,
        items: [
          {
            text: 'Overview',
            link: '/en/sequence-feature-selection-and-extraction/introduction'
          },
          {
            text: 'Step-by-Step Tutorial',
            link: '/en/sequence-feature-selection-and-extraction/tutorial'
          },
          {
            text: 'Conceptual Guide',
            link: '/en/sequence-feature-selection-and-extraction/conceptual-guide'
          },
          {
            text: 'Extract Sequence Features',
            link: '/en/sequence-feature-selection-and-extraction/extract-sequence-features'
          },
          {
            text: 'Run FES Pipeline',
            link: '/en/sequence-feature-selection-and-extraction/run-feature-extraction-and-selection-pipeline'
          },
          {
            text: 'Select Relevant Features',
            link: '/en/sequence-feature-selection-and-extraction/select-relevant-features'
          },
          {
            text: 'Interpret Selected Features',
            link: '/en/sequence-feature-selection-and-extraction/interpret-selected-features'
          },
          {
            text: 'Clustassoc Validation',
            link: '/en/sequence-feature-selection-and-extraction/clustassoc-like-typology-validation'
          }
        ]
      },
      {
        text: 'Markov Chain Models',
        collapsed: true,
        items: [
          {
            text: 'Overview',
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
                text: 'Mixture Hidden Markov Model (MHMM)',
                link: '/en/markov-chain-models/mhmm'
              }
            ]
          },
          {
            text: 'Sequenzo and seqHMM Mapping',
            link: '/en/markov-chain-models/seqhmm-function-mapping'
          },
          {
            text: 'HMM Workflow',
            collapsed: true,
            items: [
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
                text: 'Simulate HMM',
                link: '/en/markov-chain-models/simulate-hmm'
              }
            ]
          },
          {
            text: 'MHMM Workflow',
            collapsed: true,
            items: [
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
                text: 'Simulate MHMM',
                link: '/en/markov-chain-models/simulate-mhmm'
              }
            ]
          },
          {
            text: 'NHMM Workflow',
            collapsed: true,
            items: [
              {
                text: 'Build NHMM',
                link: '/en/markov-chain-models/build-nhmm'
              },
              {
                text: 'Fit NHMM',
                link: '/en/markov-chain-models/fit-nhmm'
              },
              {
                text: 'Simulate NHMM',
                link: '/en/markov-chain-models/simulate-nhmm'
              }
            ]
          },
          {
            text: 'MNHMM Workflow',
            collapsed: true,
            items: [
              {
                text: 'Build MNHMM',
                link: '/en/markov-chain-models/build-mnhmm'
              },
              {
                text: 'Estimate MNHMM',
                link: '/en/markov-chain-models/estimate-mnhmm'
              },
              {
                text: 'Simulate MNHMM',
                link: '/en/markov-chain-models/simulate-mnhmm'
              }
            ]
          },
          {
            text: 'Model Utilities',
            collapsed: true,
            items: [
              {
                text: 'Model Comparison',
                link: '/en/markov-chain-models/model-comparison'
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
          }
        ]
      },
      {
        text: 'Event Sequences',
        collapsed: true,
        items: [
          {
            text: 'Overview',
            link: '/en/event-sequences/introduction'
          },
          { text: 'Quickstart Example', link: '/en/event-sequences/example' },
          {
            text: 'Sequenzo and TraMineR Mapping',
            link: '/en/event-sequences/traminer-function-mapping'
          },
          {
            text: 'Mine Event Patterns',
            collapsed: true,
            items: [
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
              }
            ]
          },
          {
            text: 'Convert and Inspect',
            collapsed: true,
            items: [
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
              }
            ]
          },
          {
            text: 'Visualize Event Patterns',
            collapsed: true,
            items: [
              {
                text: 'Plot Event Sequences',
                link: '/en/event-sequences/plot-event-sequences'
              },
              {
                text: 'Plot Event Dynamics',
                link: '/en/event-sequences/plot-event-dynamics'
              },
              {
                text: 'Plot Subsequence Frequencies',
                link: '/en/event-sequences/plot-subsequence-frequencies'
              },
              {
                text: 'Plot Event Parallel Coordinates',
                link: '/en/event-sequences/plot-event-parallel-coordinates'
              },
              {
                text: 'Plot Subsequence Group Contrasts',
                link: '/en/event-sequences/plot-subsequence-group-contrasts'
              }
            ]
          },
          {
            text: 'Helper Functions',
            link: '/en/event-sequences/event-sequence-helpers'
          }
        ]
      },
      {
        text: 'Event History Analysis',
        collapsed: true,
        items: [
          {
            text: 'Sequence History, SAMM, and Spell Survival',
            link: '/en/event-history-analysis/samm-emlt-and-survival'
          }
        ]
      },
      {
        text: 'Multidomain or Polyadic Sequence Analysis',
        collapsed: true,
        items: [
          {
            text: 'Overview',
            link: '/en/multidomain/introduction'
          },
          {
            text: 'Sequenzo and TraMineR Mapping',
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
          },
          {
            text: 'Hierarchical and Relational Analysis',
            link: '/en/hierarchical-sequence-analysis/introduction'
          }
        ]
      },
      {
        text: 'Big Data Tools',
        collapsed: true,
        items: [
          {
            text: 'Overview',
            link: '/en/big-data/introduction'
          },
          {
            text: 'Check Uniqueness Rate',
            link: '/en/big-data/check-uniqueness-rate'
          },
          {
            text: 'CLARA',
            link: '/en/big-data/clara'
          },
          {
            text: 'Scaling Multidomain Workflows',
            link: '/en/big-data/multidomain-clara'
          }
        ]
      },
      {
        text: 'Uncertainty',
        collapsed: true,
        items: [
          {
            text: 'Timing Uncertainty',
            link: '/en/uncertainty/timing-uncertainty'
          }
        ]
      },
      {
        text: 'Sequenzo and R',
        collapsed: true,
        items: [
          {
            text: 'Overview',
            link: '/en/traminer-and-sequenzo/introduction'
          },
          {
            text: 'Functions Comparison',
            link: '/en/traminer-and-sequenzo/functions-comparison'
          },
          {
            text: 'Performance Differences',
            link: '/en/traminer-and-sequenzo/performance-diff'
          },
          {
            text: 'Use R in Python Environment',
            link: '/en/traminer-and-sequenzo/use-R-in-python-environment'
          }
        ]
      },
      {
        text: 'Resources',
        collapsed: true,
        items: [
          {
            text: 'Frequently Asked Questions',
            link: '/en/faq/'
          },
          {
            text: 'Team and Acknowledgements',
            link: '/en/faq/team-and-acknowledgements'
          },
          {
            text: 'Issues and Requests',
            link: '/en/faq/bug_reports_and_feature_requests'
          },
          {
            text: 'What\'s New',
            link: '/en/changelog'
          }
        ]
      },
    ],

    ...(process.env.SHOW_EDIT_LINK === '1' || process.env.SHOW_EDIT_LINK === 'true'
      ? {
          editLink: {
            pattern: 'https://github.com/yuqi-liang-qiqi/SequenzoWebsite/edit/main/docs/:path',
            text: 'Edit this page on GitHub'
          }
        }
      : {}),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Liang-Team/Sequenzo' }
    ],

    footer: {
      message: 'Sequenzo is released under the BSD-3-Clause License; this documentation site source is licensed under MIT.',
      copyright: 'Copyright © 2025 - present <a href="https://yuqi-liang.tech">Yuqi Liang</a>, developed by <a href="https://www.mactavish.tech/">Mactavish</a> and <a href="https://yuqi-liang.tech">Yuqi Liang</a>'
    }
  }
})
