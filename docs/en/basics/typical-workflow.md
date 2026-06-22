# Typical Workflow


Sequences → Distance Measure → Distance Matrix → Clustering Method → Choose `k` → Clusters

That chain is the classic sequence-clustering workflow. Sequenzo also supports visualization, group comparison, model-based analysis, multidomain work, event histories, feature extraction, and robustness checks. Most paths start from the same data object, then branch by research question.

## Broader Workflow Map

```text
Raw data
  ↓
Data cleaning and time-column setup
  ↓
SequenceData
  ↓
Explore: statistics, indicators, and visualization
  ↓
Choose the research path
  ├─ Compare whole trajectories → distances → clustering / CLARA / representatives
  │     (CLARA scales clustering to large data; representatives are typical observed sequences)
  ├─ Compare predefined groups → discrepancy analysis / group comparison / decomposition
  ├─ Model latent dynamics → HMM / MHMM / NHMM / MNHMM
  ├─ Work across domains → CAT / DAT / IDCD / scaling guide
  ├─ Study relational pairs → hierarchical and relational sequence analysis
  ├─ Mine event patterns → frequent subsequences / event dynamics
  ├─ Model event histories → sequence history / SAMM / spell survival
  ├─ Create downstream variables → representativeness / fuzzy memberships / feature selection
  └─ Check robustness → timing uncertainty and stability diagnostics
```

Choose the method family from the research question, not from the function list. Similar observed pathways? Start with distances. Predefined group differences? Start with discrepancy analysis or group comparison. Latent processes behind observed states? Start with Markov chain models.

## Keep Method Choices Separate

Distance measures and clustering algorithms answer different questions.

| Choice | What it decides | Where to continue |
| --- | --- | --- |
| Distance measure | How two sequences are compared | [Dissimilarity Measures](/en/tutorials/dissimilarity-measures) |
| Clustering method | How similar sequences are grouped | [Cluster Analysis Methods](/en/tutorials/cluster-analysis-methods) |
| Number of clusters | How coarse or detailed the typology should be | [Cluster Quality Indicators](/en/tutorials/cluster-quality-indicators) |

Think of the distance as the ruler and the clustering method as the grouping strategy. For example, CLARA is a scalable medoid-based clustering workflow. It still needs a distance measure, but it is not itself a distance measure.

For large datasets, use the [CLARA guide](/en/big-data/clara) after you have chosen the distance and clustering goal.

## Choose a Next Path

| If your question is... | Continue with... |
| --- | --- |
| How do I prepare my own data first? | [Data Preprocessing Overview](/en/data-preprocessing/introduction), then [`SequenceData`](/en/function-library/sequence-data) |
| How do I compare whole trajectories? | [Dissimilarity Measures](/en/tutorials/dissimilarity-measures), then [`get_distance_matrix()`](/en/function-library/get-distance-matrix) |
| How many clusters should I keep? | [Cluster Quality Indicators](/en/tutorials/cluster-quality-indicators), then [`ClusterQuality`](/en/function-library/cluster-quality) |
| What do the sequences look like before modeling? | [Visualization Tools](/en/visualization/introduction), [Sequence Summary Statistics](/en/statistics/introduction), and [Sequence Characteristics Indicators](/en/sequence-characteristics-indicators/introduction) |
| Do predefined groups explain trajectory differences? | [Discrepancy Analysis](/en/discrepancy-analysis/introduction) and [Group Comparison](/en/group-comparison/conceptual-guide) |
| Are there latent states or latent subgroups? | [Markov Chain Models](/en/markov-chain-models/introduction) |
| Do several life domains unfold together? | [Multidomain or Polyadic Sequence Analysis](/en/multidomain/introduction) |
| Do repeated events form frequent patterns? | [Event Sequences](/en/event-sequences/introduction) |
| Are transition histories or spell durations the focus? | [Event History Analysis](/en/event-history-analysis/samm-emlt-and-survival) |

*Author: Yuqi Liang*
