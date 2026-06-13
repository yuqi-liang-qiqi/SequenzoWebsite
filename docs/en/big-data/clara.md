# `clara()`: Fast k-medoids clustering for large sequence datasets

CLARA is short for **Clustering LARge Applications** (Kaufman & Rousseeuw, 1990). It was originally proposed as a way to apply Partitioning Around Medoids (PAM, k-medoids) efficiently on large datasets by:

1. Drawing subsamples of the data,
2. Running PAM on each subsample,
3. Extending the medoids to classify the whole dataset,
4. Repeating this process several times and keeping the best solution.

`clara()` implements a generalized CLARA procedure (sampling-based PAM/k-medoids) tailored for social sequence data. It repeatedly samples weighted subsets, runs a fast medoid search, evaluates several quality criteria, and returns the best solution for each cluster `k`.

## Function Usage

```python
result = clara(
    seqdata,                    # SequenceData object
    R=100,                      # Number of subsampling iterations
    kvals=range(2, 11),         # Candidate numbers of clusters
    sample_size=None,           # Size of each subsample
    method="crisp",             # "crisp", "fuzzy", "representativeness", or "noise"
    dist_args=None,             # Arguments for get_distance_matrix()
    criteria=["distance"],      # Objective(s): "distance","db","xb","pbm","ams"
    stability=False,            # Compute ARI/Jaccard stability if True
    max_dist=None,              # Required for method="representativeness"
    m=1.5,                      # Fuzziness exponent for fuzzy/noise clustering
    dnoise=None                 # Noise distance for method="noise"
)
```

## Entry Parameters

| Parameter     | Required | Type           | Description                                                                                                                                                                                                          |
| ------------- | -------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `seqdata`     | ✓        | SequenceData   | Input sequences as a `SequenceData` object.                                                                                                                                                                          |
| `R`           | ✗        | int            | Number of subsampling iterations. Larger values explore more subsamples and can improve solution stability. Default = `100`.                                                                                                                             |
| `kvals`       | ✗        | iterable\[int] | Candidate cluster counts to evaluate. Default = `range(2, 11)`.                                                                                                                                                      |
| `sample_size` | ✗        | int or None    | Size of each subsample (with replacement). If None, uses `40 + 2*max(kvals)`.                                                                                                                                        |
| `method`      | ✗        | str            | Clustering mode. Choose `"crisp"` (hard k-medoids), `"fuzzy"` (fuzzy membership), `"representativeness"` (representativeness scores), or `"noise"` (noise-cluster fuzzy clustering). Default = `"crisp"`.                 |
| `dist_args`   | ✓        | dict           | Arguments passed to `get_distance_matrix()`. Example: `{"method":"OM","sm":"CONSTANT","indel":1}`.                                                                                                                   |
| `criteria`    | ✗        | list\[str]     | Optimization target(s). Choose from: `"distance"` (mean within-cluster dissimilarity), `"db"` (Davies–Bouldin), `"xb"` (Xie–Beni), `"pbm"` (PBM), `"ams"` (average silhouette-like score). Default = `["distance"]`. |
| `stability`   | ✗        | bool           | If True, computes ARI and Jaccard against the best iteration to summarize stability. Default = `False`.                                                                                                                |
| `max_dist`    | ✗*       | float or None  | Maximum possible distance used to convert dissimilarities into representativeness scores. Required when `method="representativeness"`.                                                                                |
| `m`           | ✗        | float          | Fuzziness exponent for `method="fuzzy"` and `method="noise"`. Larger values soften membership assignments. Default = `1.5`.                                                                                          |
| `dnoise`      | ✗        | float or None  | Noise-cluster distance for `method="noise"`. If `None`, the underlying weighted fuzzy clustering routine uses its adaptive/default behavior.                                                                          |

\*`max_dist` is required only for `method="representativeness"`.

## What It Does

1. Aggregates duplicate sequences and assigns weights so repeated trajectories are not over-counted.

2. Repeats `R` times:

   * Draws a weighted subsample of size `sample_size` (with replacement).
   * Computes a pairwise dissimilarity matrix via `get_distance_matrix(dist_args)`.
   * Uses a fast hierarchical pass to seed medoids.
   * Runs hard k-medoids, fuzzy medoid clustering, representativeness scoring, or noise-cluster fuzzy clustering depending on `method`.
   * Evaluates each `k` in `kvals` on the chosen `criteria`.

3. For each `k`, selects the best iteration according to the objective (min for distance/DB/XB, max for PBM/AMS).

4. If `stability=True`, compares all iterations to the best one using ARI and Jaccard on the aggregated contingency table.

5. Expands the best aggregated solution back to the original individuals and returns results.

No data are modified in place. The function prints concise progress messages so that you can keep track of it clearly.

## Returns

The function returns a dictionary. Its shape depends on how many criteria you asked to optimize.

When `criteria` has a single item:

* `kvals`: the evaluated k values.
* `clustering`: DataFrame of shape `(n_entities, len(kvals))`. For `method="crisp"`, each column is the 1-based cluster label for that k. For `"fuzzy"`, `"noise"`, and `"representativeness"`, cells contain the membership or score vectors returned for each entity.
* `stats`: DataFrame with one row per k and the following columns:

  * `Number of Clusters`: label like “Cluster 2”.
  * `Avg dist`: mean within-cluster dissimilarity of the best iteration.
  * `PBM`, `DB`, `XB`, `AMS`: criterion values for the best iteration at that k.
  * `ARI>0.8`, `JC>0.8`: counts of iterations whose agreement with the best iteration is ≥ 0.8 (only if `stability=True`; otherwise `NaN`).
  * `Best iter`: the index of the winning iteration (0-based).

* `clara`: a dict keyed by k-index (0 for `k=2`, 1 for `k=3`, …). Each entry includes:

  * `medoids`: indices (in the original data) of selected medoids.
  * `clustering`: 1-based labels for all original entities in crisp mode, or membership/score vectors for fuzzy, noise, and representativeness modes.
  * `iter_objective`: the criterion value across iterations.
  * `evol_diss`: the running best objective over iterations (min or max as appropriate).
  * `objective`: the winning objective value.
  * `avg_dist`, `pbm`, `db`, `xb`, `ams`: values for the winning iteration.
  * `arimatrix`: a 2-column DataFrame with ARI and Jaccard per iteration if `stability=True`; `NaN` otherwise.
  * `R`, `k`, `criteria`, `method`: bookkeeping.

When `criteria` has multiple items:

* The top-level dict includes one sub-result per criterion (same structure as above).
* `allstats`: concatenated summary table across criteria.
* `param`: a small record of your input choices.

## Key features

* Scales to large datasets by subsampling (CLARA principle) while keeping duplicates properly weighted.
* Works directly with sequence dissimilarities from Sequenzo (e.g., optimal matching).
* Supports hard partitions, fuzzy memberships, representativeness scores, and noise-aware memberships.
* Multiple quality criteria supported; you can inspect and compare them.
* Optional stability diagnostics (ARI, Jaccard) for the selected solution.

## Practical notes

* `dist_args` is required. A safe starting point is `{"method":"OM","sm":"CONSTANT","indel":1}`.
* Start with `method="crisp"` when you need an interpretable hard typology.
* Use `method="fuzzy"` when sequences may belong partly to several clusters, and tune `m` if assignments are too sharp or too diffuse.
* Use `method="representativeness"` when you need representativeness scores rather than a single hard label; set `max_dist` to a positive maximum distance for the chosen metric.
* Use `method="noise"` when some sequences should be allowed to sit near a noise cluster instead of being forced into a substantive group; tune `dnoise` when the default is not appropriate for your distance scale.
* If you are unsure about `sample_size`, the default works for a first pass. For better stability, increase it (and/or increase `R`).
* Larger `R` improves reliability but costs more time, so start with a smaller `R` while tuning the distance specification.
* `kvals` should include the range you are genuinely considering (for example `range(2, 8)`).

## Example

```python
from sequenzo import SequenceData, clara
import pandas as pd

# 1) Prepare SequenceData
df = pd.read_csv("data.csv")

# Clean the time columns as those columns in this dataset all start with "C", 
# e.g., C1, C2, ..., C10.
time = [c for c in df.columns if c.startswith("C")]
states = ['data', 'data science', 'hardware', 'research',
          'software', 'systems & infrastructure', 'support & test']

sequence_data = SequenceData(
    df[['worker_id'] + time],
    time=time,
    id_col="worker_id",
    states=states
)

# 2) Run CLARA with OM distance
result = clara(
    sequence_data,
    R=50,
    kvals=range(2, 7),
    sample_size=3000,
    criteria=["distance"],
    # Use the most frequently used setting for measuring dissimilarities of sequences
    dist_args={"method":"OM", "sm":"CONSTANT", "indel":1},
    stability=True
)

# 3) Inspect outputs
print(result["stats"])          # Summary table by k
print(result["clustering"].head())  # Cluster memberships for each k
```

## Interpreting the criteria

* `distance` (lower is better): mean dissimilarity to assigned medoid; compactness.
* `DB` (lower is better): Davies–Bouldin index; trade-off between within-cluster scatter and between-cluster separation.
* `XB` (lower is better): Xie–Beni index; penalizes overlap relative to minimum medoid separation.
* `PBM` (higher is better): PBM index; emphasizes global separation vs. within compactness.
* `AMS` (higher is better): average of a silhouette-like ratio using the two nearest medoids.

## Stability summary

If `stability=True`, the function compares each iteration’s partition to the best one at that k:

* ARI: Adjusted Rand Index (1 = identical; 0 = random agreement).
* Jaccard coefficient: pairwise agreement on co-membership.
  The `ARI>0.8` and `JC>0.8` counts give a quick sense of how often the same structure reappears across iterations.

### Helper functions used internally (for reference)

* `adjustedRandIndex(tab_or_xy)`: returns the ARI between two partitions or from a contingency table.
* `jaccardCoef(tab)`: Jaccard agreement computed from a contingency table.

These are used only when `stability=True`.

## References

Kaufman, L., & Rousseeuw, P. J. (2009). Finding groups in data: an introduction to cluster analysis. John Wiley & Sons.

Studer, M., Sadeghi, R., & Tochon, L. (2024). Sequence Analysis for large databases (Vol. 104, pp. 1-42). LIVES Working papers.

## See Also

- [Section overview](/en/big-data/introduction) maps the surrounding workflow and related functions.
- [Typical Workflow](/en/basics/typical-workflow) shows where this method fits in the full analysis.

## Authors

Code: Xinyi Li

Documentation: Yuqi Liang
