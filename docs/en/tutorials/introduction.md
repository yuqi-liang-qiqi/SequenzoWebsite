# Conceptual Guides

Conceptual guides explain method choices. Function pages document exact calls and parameters. Use this page to start from your research goal, then move to the pages you need.

## Learn in Order

If you are new to sequence analysis, read these pages first:

- [Basic Concepts](/en/tutorials/basic-concepts)
- [Timing, Duration, and Order](/en/tutorials/timing-duration-order)
- [Sequence Summary Statistics vs Sequence Characteristics Indicators](/en/tutorials/sequence-indicators-and-statistics)
- [Statistics Is More Than Models](/en/tutorials/statistics-101)
- [Sequence Analysis vs. Regression](/en/tutorials/sa-vs-regression)

Then move into sequence comparison and clustering:

- [Dissimilarity Measures](/en/tutorials/dissimilarity-measures)
- [Distance Matrices](/en/tutorials/matrix-in-dissimilarity-measures)
- [Normalizing Sequences](/en/tutorials/normalizing-sequences)
- [Computational Complexity of Dissimilarity Measures](/en/tutorials/computational-complexity-of-dissimilarity-measures) if you are working with large samples
- [Cluster Analysis Methods](/en/tutorials/cluster-analysis-methods)
- [Cluster Quality Indicators](/en/tutorials/cluster-quality-indicators)
- [Understanding CLARA](/en/tutorials/understanding-clara)
- [Reporting Results of the Typical Workflow](/en/tutorials/reporting-sequence-analysis) when you write up the results

For model-based sequence analysis, start here:

- [Latent Class Analysis](/en/tutorials/lca)
- [Markov Chains](/en/tutorials/markov-chain-models-01)
- [Hidden Markov Models](/en/tutorials/markov-chain-models-02)
- [Sequence Analysis vs. LCA vs. HMM](/en/tutorials/sa-lca-and-hmm)

For event-history style extensions, see:

- [Sequence History Analysis](/en/tutorials/sequence-history-analysis)
- [Sequence Analysis Multi-state Model](/en/tutorials/multi-state-model)

## Start by Goal

| Goal | Start with | Then use |
| --- | --- | --- |
| Describe and visualize trajectories | [Basic Concepts](/en/tutorials/basic-concepts), [Timing, Duration, and Order](/en/tutorials/timing-duration-order), [Sequence Summary Statistics vs Sequence Characteristics Indicators](/en/tutorials/sequence-indicators-and-statistics) | [How to Read Sequence Plots](/en/tutorials/reading-sequence-plots), [Visualization Gallery](/en/visualization/gallery), [Sequence Summary Statistics](/en/statistics/introduction), [Sequence Characteristics Indicators](/en/sequence-characteristics-indicators/introduction) |
| Compare and cluster whole sequences | [Dissimilarity Measures](/en/tutorials/dissimilarity-measures), [Distance Matrices](/en/tutorials/matrix-in-dissimilarity-measures) | [`get_distance_matrix()`](/en/function-library/get-distance-matrix), [Cluster Analysis Methods](/en/tutorials/cluster-analysis-methods), [Cluster Quality Indicators](/en/tutorials/cluster-quality-indicators) |
| Scale clustering to large datasets | [Big Data Tools](/en/big-data/introduction), [Check Uniqueness Rate](/en/big-data/check-uniqueness-rate) | [Understanding CLARA](/en/tutorials/understanding-clara), [CLARA](/en/big-data/clara), [Scaling Multidomain Workflows](/en/big-data/multidomain-clara) |
| Compare predefined groups | [Group Comparison](/en/group-comparison/conceptual-guide), [Discrepancy Analysis](/en/discrepancy-analysis/introduction) | [Sequence Analysis vs. Regression](/en/tutorials/sa-vs-regression), [Decomposition](/en/decomposition/introduction) |
| Model latent dynamics | [Markov Chains](/en/tutorials/markov-chain-models-01), [Hidden Markov Models](/en/tutorials/markov-chain-models-02) | [Markov Chain Models](/en/markov-chain-models/introduction) |
| Work with multidomain or relational trajectories | [Basic Concepts](/en/tutorials/basic-concepts) | [Multidomain or Polyadic Sequence Analysis](/en/multidomain/introduction), [Hierarchical and Relational Sequence Analysis](/en/hierarchical-sequence-analysis/introduction) |
| Turn sequences into regression-ready variables | [Sequence Analysis vs. Regression](/en/tutorials/sa-vs-regression) | [From Sequences to Variables](/en/beyond-basic-clustering/from-sequences-to-variables/introduction), [Feature Extraction and Selection](/en/sequence-feature-selection-and-extraction/introduction) |
| Mine frequent event patterns | [Basic Concepts](/en/tutorials/basic-concepts) | [Event Sequences](/en/event-sequences/introduction) |
| Model transition histories or spell survival | [Sequence History Analysis](/en/tutorials/sequence-history-analysis), [Sequence Analysis Multi-state Model](/en/tutorials/multi-state-model) | [Event History Analysis](/en/event-history-analysis/samm-emlt-and-survival) |
| Report robustness to timing error | [Dissimilarity Measures](/en/tutorials/dissimilarity-measures) | [Timing Uncertainty](/en/uncertainty/timing-uncertainty) |
| Write up methods for a paper | [Reporting Results of the Typical Workflow](/en/tutorials/reporting-sequence-analysis) | [Cluster Quality Indicators](/en/tutorials/cluster-quality-indicators), [How to Cite](/en/basics/how-to-cite) |

## Run Code

Use [View Our Tutorials Online](/en/basics/view-tutorials-online) for full Colab and GitHub examples. For a compact in-doc example, start with the [Quickstart](/en/basics/quickstart).
