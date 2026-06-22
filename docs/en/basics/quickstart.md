# Quickstart

Run a complete six-step analysis with a bundled dataset: load data, define sequences, compute distances, cluster, compare candidate cluster counts, and export memberships.

Before running the code, install Sequenzo locally or use a hosted notebook. See [Installing](/en/basics/installing) for local setup and [View Our Tutorials Online](/en/basics/view-tutorials-online) for Colab.

The example uses `country_co2_emissions_global_deciles`. It classifies each country-year's CO₂ emissions per capita into global deciles from `D1 (Very Low)` to `D10 (Very High)`. See [CO₂ Emissions](/en/datasets/CO2-emissions) for how the deciles are built.

## Run a First Analysis

```python
from sequenzo import (
    load_dataset,
    SequenceData,
    get_distance_matrix,
    Cluster,
    ClusterQuality,
    ClusterResults,
)

# 1. Load a bundled dataset.
df = load_dataset("country_co2_emissions_global_deciles")

# 2. Define the sequence columns and states (the state space, also called the alphabet).
time_cols = [col for col in df.columns if col != "country"]
states = [
    "D1 (Very Low)", "D2", "D3", "D4", "D5",
    "D6", "D7", "D8", "D9", "D10 (Very High)",
    "Missing",
]

seq = SequenceData(
    df,
    time=time_cols,
    id_col="country",
    states=states,
    labels=states,
)

# Optional: preview a compact legend for the state colors.
seq.plot_legend(style="horizontal")

# 3. Compute pairwise sequence distances.
distance_matrix = get_distance_matrix(
    seqdata=seq,
    method="OM",
    sm="TRATE",
    indel="auto",
    norm="auto",
)

# 4. Fit hierarchical clustering on the distance matrix.
cluster = Cluster(
    matrix=distance_matrix,
    entity_ids=seq.ids,
    clustering_method="average",
)

# 5. Compare candidate numbers of clusters.
quality = ClusterQuality(cluster, max_clusters=10)
quality.compute_cluster_quality_scores()
print(quality.get_cqi_table())

# 6. Export cluster membership for the cluster count you choose.
chosen_k = 5  # Example; choose after inspecting the CQI table and plots.
results = ClusterResults(cluster)
members = results.get_cluster_memberships(num_clusters=chosen_k)
print(members.head())
```

## What Each Step Does

1. `SequenceData` checks rows, time columns, states, labels, IDs, and missing values. Read the printed summary before moving on.
2. `plot_legend(style="horizontal")` previews the state colors used by later plots.
3. `get_distance_matrix()` compares every pair of sequences. Here, Optimal Matching treats two countries as similar when their emission-rank trajectories have similar order and timing.
4. `Cluster()` builds the hierarchical tree from the distance matrix.
5. `ClusterQuality()` compares candidate values of `k` with indicators such as average silhouette width, point-biserial correlation, and Calinski-Harabasz scores.
6. `ClusterResults()` exports the final memberships so you can merge them back into your data.

## Next Steps

- [Typical Workflow](/en/basics/typical-workflow) shows how the analysis stages fit together.
- [Basic Concepts](/en/tutorials/basic-concepts), [Timing, Duration, and Order](/en/tutorials/timing-duration-order), and [Dissimilarity Measures](/en/tutorials/dissimilarity-measures) explain the core choices.
- [Cluster Quality Indicators](/en/tutorials/cluster-quality-indicators) and [How to Read Sequence Plots](/en/tutorials/reading-sequence-plots) help with interpretation.
- [`SequenceData`](/en/function-library/sequence-data), [`get_distance_matrix()`](/en/function-library/get-distance-matrix), and [`ClusterQuality`](/en/function-library/cluster-quality) document the APIs used above.
- [Tutorials](/en/tutorials/introduction) gives a reading path by research goal, and [View Our Tutorials Online](/en/basics/view-tutorials-online) links to Colab examples.
