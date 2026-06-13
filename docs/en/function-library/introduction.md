# API Reference

Use this page to find the Sequenzo function, class, or workflow page for a task.

New to Sequenzo? Start with the [Quickstart](/en/basics/quickstart) or [Typical Workflow](/en/basics/typical-workflow). Use this page when you already know the task and need the right function family.

## Data Preparation

| Task | Main pages |
| --- | --- |
| Convert between wide and long formats | [`wide_to_long_format_data()` and `long_to_wide_format_data()`](/en/data-preprocessing/wide-long-format) |
| Check missing values | [`summarize_missing_values()`](/en/data-preprocessing/missing-values) |
| Assign stable IDs | [`assign_unique_ids()`](/en/data-preprocessing/assign-unique-ids) |
| Clean time-column names | [`clean_time_columns_auto()`](/en/data-preprocessing/clean-time-columns) |
| Replace numeric cluster IDs with labels | [`replace_cluster_id_by_labels()`](/en/data-preprocessing/replace-cluster-id-by-labels) |
| Work with weights | [Working with Weighted Data](/en/basics/weighted-data) |

## Core Workflow

| Task | Main entry points |
| --- | --- |
| Define categorical sequence data | [`SequenceData`](/en/function-library/sequence-data) |
| Compute pairwise sequence dissimilarities | [`get_distance_matrix()`](/en/function-library/get-distance-matrix) |
| Cluster sequences hierarchically | [`Cluster`](/en/function-library/hierarchical-clustering) |
| Cluster with k-medoids | [`KMedoids`](/en/function-library/KMedoids) |
| Evaluate cluster quality | [`ClusterQuality`](/en/function-library/cluster-quality) |
| Inspect and summarize cluster results | [`ClusterResults`](/en/function-library/cluster-results) |

## Sequence Operations and Distances

| Task | Main pages |
| --- | --- |
| Concatenate, decompose, recode, shift, and align sequences | [Sequence Operations](/en/function-library/sequence-operations) |
| Build substitution-cost matrices or inspect distance helpers | [Dissimilarity Helper Functions](/en/function-library/dissimilarity-helpers) |
| Analyze forward divergence and backward convergence | [Prefix and Suffix Trees](/en/sequence-characteristics-indicators/prefix-and-suffix-trees) |
| Choose and normalize sequence dissimilarities | [`get_distance_matrix()`](/en/function-library/get-distance-matrix) |

## Descriptive Statistics and Indicators

| Task | Main pages |
| --- | --- |
| Compute sequence-level indicators | [Sequence Characteristics Indicators](/en/sequence-characteristics-indicators/introduction) |
| Compute weighted descriptive statistics | [Sequence Statistics](/en/statistics/introduction) |
| Compare Sequenzo and TraMineR naming | [Functions Comparison](/en/traminer-and-sequenzo/functions-comparison) |

## Visualization

| Task | Main pages |
| --- | --- |
| Browse available plot types | [Visualization Gallery](/en/visualization/gallery) |
| Customize palettes and plot options | [Visualization Tools](/en/visualization/introduction) |
| Plot individual sequences, state distributions, modal states, medoids, and transitions | [Visualization Tools](/en/visualization/gallery) |

## Clustering and Typologies

| Task | Main pages |
| --- | --- |
| Fit one hierarchical or k-medoids solution | [`Cluster`](/en/function-library/hierarchical-clustering), [`KMedoids`](/en/function-library/KMedoids) |
| Compare cluster counts and clustering methods | [Clustering Extensions](/en/beyond-basic-clustering/clustering-extensions) |
| Work with fuzzy memberships or property-based typologies | [Clustering Extensions](/en/beyond-basic-clustering/clustering-extensions) |
| Convert sequence typologies into regression variables | [From Sequences to Variables](/en/beyond-basic-clustering/from-sequences-to-variables/introduction) |
| Select representative observed sequences | [Representative Sequences](/en/function-library/representative-sequences) |

## Inference, Group Comparison, and Decomposition

| Task | Main pages |
| --- | --- |
| Run discrepancy analysis and permutation tests | [Discrepancy Analysis](/en/discrepancy-analysis/introduction) |
| Compare sequence groups with likelihood-ratio or BIC tests | [Group Comparison](/en/group-comparison/conceptual-guide) |
| Decompose group differences in sequence outcomes | [Decomposition](/en/decomposition/introduction) |
| Extract and select interpretable sequence features | [Feature Extraction and Selection](/en/sequence-feature-selection-and-extraction/introduction) |

## Model-Based Sequence Analysis

| Task | Main pages |
| --- | --- |
| Build and fit HMMs, MHMMs, NHMMs, or MNHMMs | [Markov Chain Models](/en/markov-chain-models/introduction) |
| Map Sequenzo functions to R seqHMM | [Sequenzo and seqHMM Mapping](/en/markov-chain-models/seqhmm-function-mapping) |
| Compare HMM-family models | [Model Comparison](/en/markov-chain-models/model-comparison) |
| Bootstrap HMM-family models | [Bootstrap Model](/en/markov-chain-models/bootstrap-model) |

## Event Sequences, Event History, and Survival

| Task | Main pages |
| --- | --- |
| Mine event subsequences and event-pattern frequencies | [Event Sequences](/en/event-sequences/introduction) |
| Convert between event sequences and TSE format | [Event Sequence Helpers](/en/event-sequences/event-sequence-helpers) |
| Analyze sequence histories, SAMM windows, EMLT coordinates, or spell survival | [Sequence History, EMLT, SAMM, and Spell Survival](/en/event-history-analysis/samm-emlt-and-survival) |

## Multidomain, Polyadic, and Relational Analysis

| Task | Main pages |
| --- | --- |
| Compare domains or build multidomain distances | [Multidomain or Polyadic Sequence Analysis](/en/multidomain/introduction) |
| Build CAT, DAT, or IDCD distances | [CAT](/en/multidomain/cat-distance-matrix), [DAT](/en/multidomain/dat-distance-matrix), [IDCD](/en/multidomain/idcd-sequence) |
| Scale multidomain workflows | [Scaling Multidomain Workflows](/en/big-data/multidomain-clara) |
| Analyze level-1 by level-2 relational trajectories | [Hierarchical and Relational Sequence Analysis](/en/hierarchical-sequence-analysis/introduction) |

## Large Data and Robustness

| Task | Main pages |
| --- | --- |
| Use CLARA for large single-domain sequence clustering | [CLARA](/en/big-data/clara) |
| Plan large multidomain sequence analysis | [Scaling Multidomain Workflows](/en/big-data/multidomain-clara) |
| Choose scalable clustering and robustness tools | [Large Data and Robustness](/en/big-data/introduction) |
| Assess sensitivity to transition-timing error | [Timing Uncertainty](/en/uncertainty/timing-uncertainty) |

## Notes on Completeness

This reference prioritizes stable, user-facing functions and workflows. Low-level helpers are documented on module pages when they are not central enough for a separate page.

## Authors
