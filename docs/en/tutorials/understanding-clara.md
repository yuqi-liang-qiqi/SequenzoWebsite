# Understanding CLARA

CLARA stands for **Clustering LARge Applications**. In Sequenzo, it is the main workflow for clustering large sequence datasets when a full pairwise distance matrix would be too expensive to compute or store.

## Before You Start

You should already know the distance-to-clustering workflow from [Typical Workflow](/en/basics/typical-workflow) and [Dissimilarity Measures](./dissimilarity-measures.md). You need a `SequenceData` object and a distance specification that makes sense for your research question.

Read this page for the mechanics of `clara()`: what it computes, which parameters matter first, and how to inspect the returned clustering table and quality summaries.

## Why CLARA Still Uses Distances

CLARA is a clustering method for large datasets, but it still needs distances. What it avoids is computing the full `N x N` distance matrix for every sequence at once.

Inside each CLARA iteration, Sequenzo does two smaller distance jobs:

1. Draw a subsample of size `sample_size` and compute a full subsample distance matrix.
2. Run k-medoids on the subsample, then compute distances from all `N` sequences to the selected medoids.

The workflow is still distance to clustering, but it is chunked:

```text
subsample -> distance matrix -> PAM/k-medoids -> medoids -> full-data assignment -> repeat R times
```

This is why `dist_args` is required. CLARA does not decide what "similar" means. You still decide that through the distance measure, substitution costs, indel costs, and normalization.

## Minimal Workflow

```python
from sequenzo import SequenceData, clara, load_dataset

df = load_dataset("country_co2_emissions_global_deciles")
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

result = clara(
    seq,
    R=50,
    kvals=range(2, 7),
    sample_size=80,
    dist_args={"method": "OM", "sm": "TRATE", "indel": "auto", "norm": "auto"},
    criteria=["distance"],
    stability=True,
)

print(result["stats"])
print(result["clustering"].head())
```

For large datasets, increase `sample_size` and `R` after the first exploratory run.

## Choosing Parameters

| Parameter | What to decide |
| --- | --- |
| `dist_args` | The substantive distance definition. Start from OM/TRATE or the method recommended by your research design. |
| `kvals` | Candidate cluster counts to compare, for example `range(2, 8)`. |
| `sample_size` | How many sequences enter each PAM subsample. Larger samples improve medoid search but cost more time. |
| `R` | Number of repeated subsamples. Larger values improve the chance of finding stable medoids. |
| `criteria` | Which objective to optimize, such as `"distance"`, `"db"`, `"xb"`, `"pbm"`, or `"ams"`. |
| `stability` | Whether to compute ARI/Jaccard agreement against the best iteration. |

Use a small `R` and moderate `sample_size` while tuning `dist_args`. Once the distance measure and candidate `k` range are sensible, rerun with larger values.

## Reading the Output

When you pass one criterion, `clara()` returns a dictionary with three main entries:

| Output | Meaning |
| --- | --- |
| `result["stats"]` | One row per candidate `k`, including compactness, quality criteria, stability counts, and best iteration. |
| `result["clustering"]` | Cluster labels for every original sequence and every candidate `k`. |
| `result["clara"]` | Detailed objects for each `k`, including medoids, objective history, and stability matrices. |

The clustering labels are useful for merging back into your original data. The stats table is useful for choosing a plausible `k`, but it should not be the only basis for interpretation.

## Interpreting Quality Criteria

| Criterion | Direction | Interpretation |
| --- | --- | --- |
| `distance` | Lower is better | Average dissimilarity to assigned medoids. |
| `DB` | Lower is better | Davies-Bouldin style compactness and separation. |
| `XB` | Lower is better | Xie-Beni style overlap penalty. |
| `PBM` | Higher is better | Separation relative to compactness. |
| `AMS` | Higher is better | Silhouette-like comparison of nearest medoids. |

Quality indicators are diagnostics, not final answers. A professional CLARA interpretation should also inspect medoid sequences, cluster sizes, and substantive labels.

## Stability Checks

With `stability=True`, Sequenzo compares each iteration's partition to the best iteration at the same `k`.

- ARI near 1 means two partitions are highly similar after adjusting for chance.
- Jaccard agreement summarizes how often sequence pairs are grouped together in both partitions.
- `ARI>0.8` and `JC>0.8` count how many iterations are close to the selected solution.

If a solution has good compactness but weak stability, increase `R`, increase `sample_size`, or reconsider the distance measure and candidate `k`.

## How This Differs from Hierarchical Clustering

Hierarchical clustering starts from one full distance matrix and cuts one tree at different values of `k`. CLARA repeatedly searches for medoids on subsamples and assigns the full dataset to those medoids.

That means CLARA quality summaries evaluate sampled k-medoids solutions, not cuts of a fixed dendrogram. For small datasets, hierarchical clustering can be easier to inspect. For large datasets, CLARA is often the practical option.

## See Also

- [`clara()`](/en/big-data/clara) documents the full function signature and returned object.
- [CLARA and Big Data](/en/basics/if-you-have-big-data) explains when the large-data workflow is appropriate.
- [Cluster Quality Indicators](./cluster-quality-indicators.md) explains common quality measures.
- [Representative Sequences](/en/function-library/representative-sequences) helps interpret medoids and representative trajectories.

## References

Kaufman, L., & Rousseeuw, P. J. (2009). *Finding groups in data: An introduction to cluster analysis.* John Wiley & Sons.

*Author: Yuqi Liang*
