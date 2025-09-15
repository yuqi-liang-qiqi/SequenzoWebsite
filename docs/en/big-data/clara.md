<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-12 14:40:49
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-15 18:48:02
 * @FilePath: /SequenzoWebsite/docs/en/big-data/clara.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# `clara()`: Fast k-medoids clustering for large sequence datasets

CLARA is short for **Clustering LARge Applications** (Kaufman & Rousseeuw, 1990). It was originally proposed as a way to apply PAM (k-medoids) efficiently on large datasets by:

1. Drawing subsamples of the data,
2. Running PAM on each subsample,
3. Extending the medoids to classify the whole dataset,
4. Repeating this process several times and keeping the best solution.

`clara()` implements a generalized CLARA procedure (sampling-based PAM/k-medoids) tailored for social sequence data. It repeatedly samples weighted subsets, runs a fast medoid search, evaluates several quality criteria, and returns the best partition for each `k`.

## Function usage

```python
result = clara(
    seqdata,                    # SequenceData object
    R=100,                      # number of subsampling iterations
    kvals=range(2, 11),         # candidate numbers of clusters
    sample_size=None,           # size of each subsample
    method="crisp",             # clustering mode (currently: "crisp")
    dist_args=None,             # arguments for get_distance_matrix()
    criteria=["distance"],      # objective(s): "distance","db","xb","pbm","ams"
    stability=False,            # compute ARI/Jaccard stability if True
    parallel=False,             # run inner loops in parallel if True
    max_dist=None               # reserved (not used by "crisp")
)
```

## Entry parameters

| Parameter     | Required | Type           | Description                                                                                                                                                                                                          |
| ------------- | -------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `seqdata`     | ✓        | SequenceData   | Input sequences as a `SequenceData` object.                                                                                                                                                                          |
| `R`           | ✗        | int            | Number of subsampling iterations. Larger R improves robustness. Default = 100.                                                                                                                                       |
| `kvals`       | ✗        | iterable\[int] | Candidate cluster counts to evaluate. Default = `range(2, 11)`.                                                                                                                                                      |
| `sample_size` | ✗        | int or None    | Size of each subsample (with replacement). If None, uses `40 + 2*max(kvals)`.                                                                                                                                        |
| `method`      | ✗        | str            | Clustering mode. Currently supports `"crisp"`.                                                                                                                                                                       |
| `dist_args`   | ✓        | dict           | Arguments passed to `get_distance_matrix()`. Example: `{"method":"OM","sm":"CONSTANT","indel":1}`.                                                                                                                   |
| `criteria`    | ✗        | list\[str]     | Optimization target(s). Choose from: `"distance"` (mean within-cluster dissimilarity), `"db"` (Davies–Bouldin), `"xb"` (Xie–Beni), `"pbm"` (PBM), `"ams"` (average silhouette-like score). Default = `["distance"]`. |
| `stability`   | ✗        | bool           | If True, computes ARI and Jaccard against the best iteration to summarize stability. Default = False.                                                                                                                |
| `parallel`    | ✗        | bool           | If True, uses joblib to parallelize iterations. Default = False.                                                                                                                                                     |
| `max_dist`    | ✗        | float or None  | Reserved for other methods; not used by `"crisp"`.                                                                                                                                                                   |

## What it does

1. Aggregates duplicate sequences and assigns weights so repeated trajectories are not over-counted.
2. Repeats R times:

   * Draws a weighted subsample of size `sample_size` (with replacement).
   * Computes a pairwise dissimilarity matrix via `get_distance_matrix(**dist_args)`.
   * Uses a fast hierarchical pass to seed medoids and runs weighted k-medoids.
   * Evaluates each k in `kvals` on the chosen `criteria`.
3. For each k, selects the best iteration according to the objective (min for distance/DB/XB, max for PBM/AMS).
4. If `stability=True`, compares all iterations to the best one using ARI and Jaccard on the aggregated contingency table.
5. Expands the best aggregated partition back to the original individuals and returns results.

No data are modified in place. The function prints concise progress messages.

## Key features

* Scales to large n by subsampling (CLARA principle) while keeping duplicates properly weighted.
* Works directly with sequence dissimilarities from Sequenzo (e.g., OM).
* Multiple quality criteria supported; you can inspect and compare them.
* Optional stability diagnostics (ARI, Jaccard) for the selected solution.
* Parallelizable with joblib.

## Returns

The function returns a dictionary. Its shape depends on how many criteria you asked to optimize.

When `criteria` has a single item:

* `kvals`: the evaluated k values.
* `clustering`: DataFrame of shape `(n_entities, len(kvals))`. Each column is the 1-based cluster label for that k.
* `stats`: DataFrame with one row per k and the following columns:

  * `Number of Clusters`: label like “Cluster 2”.
  * `Avg dist`: mean within-cluster dissimilarity of the best iteration.
  * `PBM`, `DB`, `XB`, `AMS`: criterion values for the best iteration at that k.
  * `ARI>0.8`, `JC>0.8`: counts of iterations whose agreement with the best iteration is ≥ 0.8 (only if `stability=True`; otherwise NaN).
  * `Best iter`: the index of the winning iteration (0-based).
* `clara`: a dict keyed by k-index (0 for k=2, 1 for k=3, …). Each entry includes:

  * `medoids`: indices (in the original data) of selected medoids.
  * `clustering`: 1-based labels for all original entities.
  * `iter_objective`: the criterion value across iterations.
  * `evol_diss`: the running best objective over iterations (min or max as appropriate).
  * `objective`: the winning objective value.
  * `avg_dist`, `pbm`, `db`, `xb`, `ams`: values for the winning iteration.
  * `arimatrix`: a 2-column DataFrame with ARI and Jaccard per iteration if `stability=True`; NaN otherwise.
  * `R`, `k`, `criteria`, `method`: bookkeeping.

When `criteria` has multiple items:

* The top-level dict includes one sub-result per criterion (same structure as above).
* `allstats`: concatenated summary table across criteria.
* `param`: a small record of your input choices.

## Practical notes

* `dist_args` is required. A safe starting point is `{"method":"OM","sm":"CONSTANT","indel":1}`.
* If you are unsure about `sample_size`, the default works for a first pass. For better stability, increase it (and/or increase `R`).
* Larger `R` improves reliability but costs more time. Use `parallel=True` to speed up on multi-core machines.
* `kvals` should include the range you are genuinely considering (for example `range(2, 8)`).

## Example

```python
from sequenzo.define_sequence_data import SequenceData
from sequenzo.dissimilarity_measures.get_distance_matrix import get_distance_matrix
from sequenzo.big_data.clara.clara import clara   # path depends on your package layout
import pandas as pd

# 1) Prepare SequenceData
df = pd.read_csv("sampled_1000_data.csv")
time = [c for c in df.columns if c.startswith("C")]
states = ['data', 'data & intensive math', 'hardware', 'research',
          'software', 'software & hardware', 'support & test']

sequence_data = SequenceData(
    df[['worker_id'] + time],
    time_type="age",
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
    dist_args={"method":"OM","sm":"CONSTANT","indel":1},
    parallel=True,
    stability=True
)

# 3) Inspect outputs
print(result["stats"])          # summary table by k
print(result["clustering"].head())  # cluster memberships for each k
```

## Interpreting the criteria (short guide)

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

## Authors

Code: Xinyi Li

Documentation: Yuqi Liang

Edited by: Yuqi Liang