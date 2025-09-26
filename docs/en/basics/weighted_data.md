<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-21 11:11:16
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-21 16:43:16
 * @FilePath: /SequenzoWebsite/docs/en/basics/weighted_data.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# Working with Weighted Data

In some social science datasets, you will find a column called `weight`. This column provides survey or design weights, which adjust the contribution of each individual to the analysis. If your dataset does not include such a variable, you can safely ignore this feature. However, understanding how weights work will give you a deeper grasp of social sequence analysis.

## What are weights?

In many datasets in social sciences, each row does not represent the same fraction of the population. For example:

* In a **survey dataset**, some respondents may carry higher sampling weights to correct for unequal probabilities of selection.

**Example:** In the [pairfam-family dataset](../datasets/pairfam-family.md), the variable `weight40` is provided so that trajectories at age 40 are representative of the German population. If you ignore it, some social groups may be over- or under-represented.

For instance:

```
id = 111000
weight40 = 0.343964278697968
```

This does not mean the person is “one-third of a person.” Instead, Pairfam used a complex sampling design (stratification, unequal selection probabilities), and over time there is also attrition (dropout).

To make the sample representative of the German population at age 40, the survey team provides a calibration weight. The value tells us how much this person should count when computing population estimates.

Thus, if `weight40 < 1` (like 0.34), this respondent comes from a group that is **overrepresented** in the raw sample, so their influence must be down-weighted.

If `weight40 > 1` (like 1.7), this respondent comes from a group that is **underrepresented**, so their influence must be boosted.

In practice, using weights means that descriptive statistics and sequence distributions reflect the **population structure**, not just the raw sample.

* In an **administrative dataset**, some individuals may represent many others (e.g., when rows are aggregated by groups).

  * Example: If each row corresponds to a municipality’s unemployment trajectory, and the dataset also contains the size of the municipality, using that size as a weight ensures large municipalities count more than small ones.

* In a **simulated dataset**, you may want to emphasize certain cases more than others.

  * Example: Suppose you simulate 10 “rare” career paths but want them to contribute as much as 100 “common” ones. You can give the rare paths weight = 10 each, so that they have equal influence when computing descriptive statistics or substitution costs.

Overall, a weight is simply a non-negative number attached to each sequence that tells you how much that sequence should count in descriptive statistics and cost estimation.

By default, `Sequenzo` assumes all sequences are equally weighted (`weight = 1` in `SequenceData()`).

## Why use weights?

Weights allow your results to reflect the **true population structure**, not just the raw sample.
For example:

* **Without weights:** A small oversampled subgroup may dominate the transition rates used to compute substitution costs.
* **With weights:** Substitution costs reflect the intended population frequencies.

This is especially important if you are analyzing survey data or data that have been stratified, clustered, or aggregated.

## How to provide weights with `Sequenzo`

When you define your dataset, pass an array of weights:

```python
from sequenzo import SequenceData

seq = SequenceData(
    data=df,
    time=list(df.columns)[1:],   # Sequence columns
    states=["A", "B", "C"],
    id_col="ID",
    weights=df["survey_weight"].values   # One weight per sequence
)
```

If no weights are given, Sequenzo automatically sets them to 1.

## How weights change the sequence analysis workflow

Most of the workflow is unchanged: you still compute distances, cluster, and visualize as usual.
But there are a few key places where weights matter:

1. **Descriptive statistics and cross-tabs in `SequenceData()`**

   * `sequence_data.get_xtabs(other, weighted=True)` uses weights when counting co-occurrences.
   * Weighted counts affect transition probabilities and derived summaries.

2. **Uniqueness statistics in `SequenceData()`**

   * `sequence_data.uniqueness_stats(weighted=True)` reports uniqueness rates after accounting for weights.
   * Example: if a rare sequence has a very large weight, it contributes proportionally.

3. **Substitution cost matrices (`sm`)**

   * If you choose `sm="TRATE"` (transition-rate based), Sequenzo uses weighted transition rates.
   * This means substitution costs reflect population-weighted transitions rather than raw frequencies.
   * With `sm="CONSTANT"`, weights have no effect.

4. **Insertion/deletion costs (`indel`)**

   * When `indel="auto"`, its value may be derived from the substitution matrix.
   * If the substitution matrix was built using weights, the indel cost is indirectly weight-dependent.

5. **Visualization**

Most Sequenzo plots now accept an optional weights argument (default: `"auto"`).
When set to `"auto"`, the function uses `sequence_data.weights` if available; otherwise, it falls back to equal weights.

* Plots that summarize frequencies or means (state-distribution, modal-state, most-frequent sequences, mean time, transition matrix, relative frequency plot) compute weighted tallies and divide by the total weight.
* Pure “row-rendering” plots (sequence index) do not replicate rows by weight; instead, we offer weight-aware sorting and labeling.
* Error bars for proportions use an effective sample size $Neff = (Σw)² / Σ(w²)$ to approximate $SE ≈ √(p(1−p)/Neff)$.

This keeps pictures faithful to population structure when weights are present, while preserving backward-compatible behavior when weights are absent.

5. **Downstream analysis**

   * Pairwise distances (OM, HAM, DHD, etc.) are not directly weighted per sequence.
   * Instead, weights shape the cost matrix, which then affects distances indirectly.

For K-Medoids / PAM / PAMonce, weights are used explicitly in the objective: **each point’s distance to its medoid is multiplied by its weight when computing the total cost**.

In other words, with weights, the chosen medoids and the final cluster assignments can differ from the equal-weight case; with extreme weights, a few sequences may even dominate the solution.

Unlike K-Medoids, the sequence weights of hierarchical clustering are not applied during the linkage construction itself, but only in the evaluation of cluster quality. Details follow below.

## Weighted data in hierarchical clustering

### Why weights are applied to cluster quality indicators (CQIs) but not to the linkage function

In Sequenzo, weights are supported in **clustering quality indicators** (e.g., ASWw, R², HG) and in **K-Medoids / PAM variants**, but not in hierarchical linkage computation (which is under the hood of the `method=ward` parameter for `Cluster()`). This is intentional and follows both methodological and practical considerations.

**1. Quality metrics are naturally weightable.**

Most evaluation statistics are defined as averages over cases (e.g., average silhouette width, explained variance). Extending these to weighted versions is straightforward: each case contributes proportionally to its weight. This ensures that the assessment of clustering solutions correctly reflects sample design or population importance.

**2. Hierarchical linkage is more complicated.**

Many popular linkage rules, such as Ward (frequently used in sequence analysis), centroid, or median, are rooted in **geometric interpretations that only hold in Euclidean feature spaces**. 

When applied to non-Euclidean dissimilarities such as Optimal Matching or other sequence dissimilarity distances, these formulas are already approximations. Adding weights on top does not have a clear or widely accepted definition, and may produce unstable or misleading dendrograms.

**3. Limited applicability of weighted linkage.**

Among the common linkage methods, only **average linkage (UPGMA)** can be safely extended to incorporate weights: the distance between clusters is defined as the weighted average of all pairwise dissimilarities. 

For single or complete linkage, weights are irrelevant (they always use min/max). For Ward and centroid-based methods, a valid weighted version requires access to Euclidean coordinates, which are not available for general sequence distances.

**4. Design choice in Sequenzo.**

Because of these limitations, Sequenzo does not attempt to provide weighted linkage. Instead, users who require weighted clustering should rely on:

* evaluating hierarchical partitions using the weighted quality metrics, or
* the weighted K-Medoids / PAM / PAMonce implementations. 

This approach ensures that weights are respected where the theory is sound, while avoiding methods that would give a false sense of rigor.

## Weighted data in K-Medoids and its variants

Sequenzo implements K-Medoids clustering along with two common variants: **PAM** (Partitioning Around Medoids) and **PAMonce**. All three methods group sequences by minimizing the total dissimilarity between each sequence and its assigned medoid (the most representative sequence of the cluster). Unlike hierarchical clustering, which produces a full tree, K-Medoids directly returns a flat partition of the data.

### How the algorithms differ

* **KMedoids (standard)**

  This version follows the classic algorithm: it repeatedly swaps candidate medoids with non-medoids until no further improvement is possible.
  It guarantees the optimal partition given enough passes, but can be computationally demanding on large datasets.

* **PAM (Partitioning Around Medoids)**

  PAM also seeks optimal medoids but typically explores a broader set of swaps and refinements in each iteration. It tends to give more stable results than KMedoids, but at higher computational cost.

* **PAMonce**

  This is a faster, approximate variant. Instead of repeatedly updating medoids, it performs only one refinement pass from the initial selection.
  PAMonce is much faster on large datasets and often yields results close to the full PAM algorithm, though sometimes at the expense of cluster quality.

### Role of weights

All three methods accept a `weights` argument. By default, each sequence has equal weight (`weights = 1`).
When you supply a weight vector, the clustering objective changes:

* Distances from each sequence to its assigned medoid are **multiplied by its weight**.
* Heavier weights make a sequence more influential when choosing medoids and forming clusters.
* In extreme cases, a single sequence with a very large weight can dominate cluster formation.

This makes weighted K-Medoids especially useful when working with survey data, stratified samples, or aggregated sequences where some units represent larger populations than others.

### Practical guidance

* If you want **population-representative clusters**, always pass the survey or design weights.
* If you only care about the **structure of your sample**, you can ignore weights and treat all sequences equally.
* For large datasets, try **PAMonce** first for speed, and switch to **PAM** if you need more precise partitions.
* Use the `npass` parameter to control how many random restarts are attempted. More passes increase stability at the cost of runtime.

### K-Medoids / PAM / PAMonce: Weighted vs. unweighted (toy example)

Below is a minimal, self-contained example that you can run without computing sequence distances first (we use a small hand-crafted dissimilarity matrix). It demonstrates three things:

1. How to call KMedoids, PAM, and PAMonce
2. How to pass a weight vector
3. How weights can change the chosen medoids and assignments

#### Setup

```python
import numpy as np
from sequenzo.clustering.KMedoids import KMedoids

# For reproducible random initializations
np.random.seed(42)
```

#### A tiny distance matrix with two natural groups

We build an 8×8 distance matrix with two tight groups:

* Group A: indices 0–3
* Group B: indices 4–7

And we place a mild cross-group separation so that, without weights, both groups are equally plausible.

```python
# 8 objects, 2 natural groups of size 4
n = 8
D = np.zeros((n, n), dtype=float)

# Intra-group distances are small
for i in range(4):
    for j in range(4):
        if i != j:
            D[i, j] = 0.3  # Group A (0-3)

for i in range(4, 8):
    for j in range(4, 8):
        if i != j:
            D[i, j] = 0.3  # Group B (4-7)

# Cross-group distances are larger, but not huge
for i in range(4):
    for j in range(4, 8):
        D[i, j] = D[j, i] = 1.0

# Sanity: zero diagonal
np.fill_diagonal(D, 0.0)

print("Distance matrix D:\n", np.round(D, 2))
```

#### Case 1: PAMonce (fast), unweighted

```python
k = 2
labels_unweighted = KMedoids(
    diss=D,
    k=k,
    method="PAMonce",  # fast one-pass refinement
    npass=10,          # 10 random restarts; increase for extra stability
    weights=None       # None -> all ones (equal weights)
)

print("\n[PAMonce | unweighted] cluster labels:", labels_unweighted)
```

#### Case 2: PAMonce, weighted

Now we give one object a very large weight, making it represent a much bigger share of the population. This often changes which medoids are optimal and can flip some assignments.

```python
# Everyone weight=1, except object #6 (index 6) is very heavy
w = np.ones(n, dtype=float)
w[6] = 50.0

labels_weighted = KMedoids(
    diss=D,
    k=k,
    method="PAMonce",
    npass=10,
    weights=w
)

print("[PAMonce | weighted]   cluster labels:", labels_weighted)
print("Weights:", w)
```

**What to expect:**

* Unweighted: two balanced clusters (0–3) vs. (4–7).
* Weighted: the algorithm prefers solutions that keep the heavy object (#6) close to its medoid; the chosen medoids and the final partition can shift accordingly (e.g., the medoid inside 4–7 might move closer to #6, or #6 can “pull” a borderline case across the split).

#### Case 3: Full PAM (more thorough), weighted

`PAM` explores more swaps/refinements than `PAMonce`. It’s slower but can yield higher-quality partitions. If you have time, compare:

```python
labels_pam_weighted = KMedoids(
    diss=D,
    k=k,
    method="PAM",   # more thorough than PAMonce
    npass=5,        # a few restarts (increase for large datasets)
    weights=w
)
print("[PAM | weighted]        cluster labels:", labels_pam_weighted)
```

#### Case 4: Classic KMedoids, weighted

This is the textbook variant; it iterates swaps until no improvement is possible (given the current run), typically between `PAMonce` and `PAM` in cost/speed profile depending on implementation details.

```python
labels_kmedoids_weighted = KMedoids(
    diss=D,
    k=k,
    method="KMedoids",
    npass=5,
    weights=w
)
print("[KMedoids | weighted]   cluster labels:", labels_kmedoids_weighted)
```

#### Interpreting results

* All three variants **accept weights** and **use them in the objective** (each object’s dissimilarity to its medoid is multiplied by its weight).
* If you set one or a few **very large weights**, those objects will **strongly influence** the medoid choice and the final partition.
* For **large datasets**, start with **PAMonce** for speed. If needed, validate with **PAM** on a subset or with fewer passes.
* If your downstream analysis requires population-representative clusters (e.g., survey data), pass the **survey/design weights** here. If you care only about the sample’s internal structure, you can safely omit weights.

> Tip: For reproducibility, set `np.random.seed(...)` and use a non-zero `npass` (multiple restarts) to reduce sensitivity to initialization.

#### Using initial medoids (optional)

If you already have good candidate medoids (e.g., from domain knowledge or a warm start), you can pass them via `initialclust`:

```python
# Suppose we want to start from medoids at indices [1, 6]
labels_from_init = KMedoids(
    diss=D,
    k=2,
    method="PAMonce",
    initialclust=[1, 6],  # medoid indices (0-based)
    npass=0,              # skip random restarts when you trust the init
    weights=w
)
print("[PAMonce | weighted | init=[1,6]] labels:", labels_from_init)
```

When `initialclust` is provided as a **membership vector** (one label per object) or as a **hierarchical linkage** matrix, Sequenzo will convert it to starting medoids internally (see the docstring for details). This is handy when you want to “lift” a solution found on a subsample to the full dataset.

*Author: Yuqi Liang*
*Translate: Sizhu Qu*

