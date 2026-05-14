# From Sequences to Variables

After computing sequence dissimilarities and clustering similar trajectories, a common next step is to use the clustering result in a regression model or another downstream analysis. For example, employment trajectory clusters may be used to predict later income, or family trajectory types may be used to explain health outcomes.

That workflow is intuitive, but it treats cluster membership as if it were a fixed, certain characteristic of each case. In practice, cluster labels depend on the distance measure, clustering algorithm, number of clusters, and other modelling choices. Many sequences also lie between types rather than inside a single clear group.

## Where This Fits in the Documentation

Sequenzo splits clustering documentation into two places on purpose.

**[Core Functions of Typical Workflow](../../function-library/introduction.md)** covers the standard sequence-analysis pipeline most users start with: build [`SequenceData`](../../function-library/sequence-data.md), compute a distance matrix, then cluster with [`Cluster`](../../function-library/hierarchical-clustering.md) or [`KMedoids`](../../function-library/KMedoids.md), assess quality with [`ClusterQuality`](../../function-library/cluster-quality.md), and inspect results with [`ClusterResults`](../../function-library/cluster-results.md).

The top-level **Clustering** section in the sidebar is for **additional clustering-related workflows** that go beyond that typical path — for example, turning a clustering solution into regression covariates (this module), and other clustering extensions as they are documented. If you are new to Sequenzo, start with Core Functions; return here when you already have a distance matrix and cluster solution and need Helske-style variables for downstream modelling.

The `sequenzo.clustering.sequences_to_variables` module implements the regression-ready variable constructions described by Helske, Helske, and Chihaya (2024). It turns a distance matrix and a clustering solution into covariates you can use in standard regression models:

- **Representativeness** — continuous measures of how close each sequence is to each representative (typically a PAM medoid).
- **Hard classification** — cluster membership encoded as `K − 1` dummy variables with one reference category omitted.
- **Soft classification** — fuzzy membership degrees encoded as `K − 1` continuous predictors with one reference omitted.
- **Pseudoclass regression** — repeated random hard assignments from membership probabilities, with coefficients combined by Rubin's rules.

Most functions in this module do **not** compute distances, choose `k`, or fit the final substantive model. The exception is [`pseudoclass_regression()`](./pseudoclass-regression.md), which fits repeated OLS or logit models as part of the pseudoclass procedure. Otherwise, these functions assume you already have a square dissimilarity matrix and, for most workflows, a `KMedoids` result or a membership matrix from FANNY.

For the conceptual background — when hard labels are misleading, how representativeness differs from soft membership, and how to choose an approach — see the [Conceptual Guide](./conceptual-guide.md).

The key choice is whether the outcome is assumed to be **class-dependent** or **similarity-based**. If the outcome depends mainly on membership in a small number of real trajectory types, hard or soft classification may be appropriate. If the outcome varies gradually with closeness to ideal trajectories, representativeness is usually more appropriate.

## When Should You Use This Module?

Use this module when your research question links earlier trajectories to a later outcome and you want to move beyond a single hard cluster label.

Typical situations include:

- You have clustered sequences with `KMedoids` and want Helske-style representativeness variables before regression.
- You want hard cluster dummies with a clearly defined reference category for `statsmodels` / `sklearn` models.
- Clusters overlap and you want soft membership predictors instead of forcing each case into one type.
- You want to compare hard, soft, and representativeness specifications for the same outcome model.

This module is **not** a replacement for sequence clustering, discrepancy analysis, or feature extraction and selection. It answers a narrower question: given a clustering solution, how should sequence information enter a regression model?

## Which Variable Construction Should I Choose?

| Situation | Recommended approach |
| --- | --- |
| Clear, well-separated clusters and class-dependent outcome | Hard classification |
| Meaningful but overlapping clusters | Soft classification |
| Outcome varies gradually with closeness to ideal trajectories | Representativeness |
| Sensitivity check for uncertain class assignment | Pseudoclass regression |
| You mainly want interpretable duration/timing features | [Feature extraction and selection](../../sequence-feature-selection-and-extraction/introduction.md), not this module |

## How This Differs from Related Sequenzo Workflows

| Approach | Main question | Typical output |
| --- | --- | --- |
| Sequence clustering (`KMedoids`, `Cluster`) | What broad trajectory types exist? | Cluster labels or medoid assignments |
| [Feature extraction and selection](../../sequence-feature-selection-and-extraction/introduction.md) | Which duration, timing, or sequencing features relate to an outcome? | Interpretable feature matrix + Boruta selection |
| [Discrepancy analysis](../../discrepancy-analysis/introduction.md) | Is a covariate associated with sequence dissimilarities? | Pseudo-R² and permutation tests |
| **From sequences to variables** | How should a clustering solution enter regression? | Representativeness, dummies, or membership covariates |

These workflows can be combined. For example, you might cluster for description, validate whether the typology captures a covariate association with [`clustassoc_like_typology_validation()`](../../sequence-feature-selection-and-extraction/clustassoc-like-typology-validation.md), and then build Helske-style regression covariates with the functions below.

## What You Need Before You Start

Most pages assume that you already have:

1. A square symmetric distance matrix from [`get_distance_matrix()`](../../function-library/get-distance-matrix.md), with zeros on the diagonal and no `NA` values.
2. A clustering solution on that same matrix — usually from [`KMedoids`](../../function-library/KMedoids.md) with `method="PAMonce"`.
3. An outcome vector (and optional other covariates) aligned row-for-row with the distance matrix.
4. A clear substantive reason for the number of clusters `K` and the choice of representatives (medoids).

`KMedoids` returns, for each observation, the **1-based row index of its cluster medoid** (WeightedCluster convention). Use [`medoid_indices_from_kmedoids_result()`](./medoid-indices-from-kmedoids-result.md) and [`cluster_labels_from_kmedoids_result()`](./medoid-indices-from-kmedoids-result.md#cluster-labels-from-kmedoids-result) with the default `input_base=1` to convert that vector into sorted 0-based medoid indices and 0-based cluster labels.

## Entry Points

| Function | Role |
| --- | --- |
| [`representativeness_matrix()`](./representativeness-matrix.md) | Build `R_i^k = 1 − d(i,k) / d_max` for each sequence and each medoid. |
| [`hard_classification_variables()`](./hard-classification-variables.md) | Turn cluster labels into `K − 1` dummy predictors. |
| [`fanny_membership()`](./fanny-membership.md) | Compute FANNY fuzzy membership on the distance matrix (Helske soft / pseudoclass step). |
| [`soft_classification_variables()`](./soft-classification-variables.md) | Omit the reference column from a membership matrix for regression. |
| [`pseudoclass_regression()`](./pseudoclass-regression.md) | Draw `M` hard assignments from `U`, fit OLS or logit, combine with Rubin's rules. |

Helpers:

| Function | Role |
| --- | --- |
| [`medoid_indices_from_kmedoids_result()`](./medoid-indices-from-kmedoids-result.md) | Sorted 0-based medoid row indices from a `KMedoids` return vector. |
| [`cluster_labels_from_kmedoids_result()`](./medoid-indices-from-kmedoids-result.md#cluster-labels-from-kmedoids-result) | 0-based cluster labels `0 … K−1` from a `KMedoids` return vector. |
| [`max_distance()`](./max-distance.md) | Maximum off-diagonal dissimilarity; used in representativeness normalization. |
| [`cluster_labels_to_dummies()`](./cluster-labels-to-dummies.md) | Low-level dummy encoding with omitted reference (used by hard classification). |

Lower-level FANNY symbols (`fanny`, `FannyResult`, `medoid_membership_approximation`) live in the same submodule but are mainly for advanced use; see [FANNY membership](./fanny-membership.md#lower-level-fanny-api).

## A Typical Workflow

### Representativeness + hard dummies

```python
from sequenzo import (
    get_distance_matrix,
    KMedoids,
    representativeness_matrix,
    medoid_indices_from_kmedoids_result,
    cluster_labels_from_kmedoids_result,
    hard_classification_variables,
)

diss = get_distance_matrix(seqdata, method="OM", sm="TRATE", indel="auto")
kmed = KMedoids(diss, k=5, method="PAMonce", verbose=False)

medoids = medoid_indices_from_kmedoids_result(kmed)
R = representativeness_matrix(
    diss, medoids, d_max=None, as_dataframe=True, ids=seqdata.ids
)

labels = cluster_labels_from_kmedoids_result(kmed)
dummies = hard_classification_variables(
    labels, k=5, reference=0, as_dataframe=True, ids=seqdata.ids
)
```

### Soft classification

```python
from sequenzo import fanny_membership, soft_classification_variables

U, _ = fanny_membership(diss, k=5, m=1.4)
X_soft = soft_classification_variables(U, reference=0, as_dataframe=True, ids=seqdata.ids)
```

Helske et al. (2024) use membership exponent `m = 1.4`. The second return value of `fanny_membership` is `highest_membership_indices` — the row with highest membership in each cluster column. These are **not** PAM medoids and must not be passed to `representativeness_matrix`.

### Pseudoclass (requires `statsmodels`)

```python
from sequenzo import pseudoclass_regression

fit = pseudoclass_regression(
    y=outcome,
    U=U,
    X_fixed=other_covariates,
    M=20,
    reference=0,
    model_type="ols",
    random_state=42,
)
print(fit["beta_combined"], fit["se_combined"])
```

## Method Notes

| Topic | Behavior |
| --- | --- |
| Representativeness formula | `R_i^k = 1 − d(i, medoid_k) / d_max`. Values are clipped to `[0, 1]` as a numerical safeguard; when `d_max` is the maximum pairwise distance, the formula already lies in this range. Values do **not** sum to 1 across `k`. |
| `d_max` | Defaults to the maximum **off-diagonal** entry of `diss` via `max_distance()`. |
| Reference category | Hard and soft builders omit one cluster column (`reference=0` drops the first cluster in sorted label order). |
| FANNY | `fanny_membership` wraps `fanny` with `memb_exp=m` and R-style column reordering (`caddy`). Python port of R `cluster::fanny`; deterministic initialization; validated in Sequenzo unit tests. |
| `k` constraint in FANNY | Sequenzo follows R `cluster::fanny`: `1 <= k <= n // 2 - 1`. This is an R implementation bound, not a general fuzzy-clustering limit. |
| Pseudoclass | Requires `K >= 2`. Draws categorical labels from each row of `U`, fits `M` models, combines variances with Rubin's rules. Requires `statsmodels`. |
| CLARA representativeness | WeightedCluster `seqclararange(..., method="representativeness")` uses the same `1 − d / max.dist` idea inside CLARA; `representativeness_matrix` is the standalone matrix builder on fixed medoids. |

## Python ↔ R or Literature Mapping

| Sequenzo | Closest R / literature counterpart | Notes |
| --- | --- | --- |
| `representativeness_matrix()` | Helske et al. (2024); WeightedCluster `seqclararange(..., method="representativeness")` | No single TraMineR function |
| `hard_classification_variables()` | Helske et al. (2024) Table 1 hard classification | R workflows usually build dummies manually |
| `fanny_membership()` | `cluster::fanny(diss, k, diss=TRUE, memb.exp=m)` | Port of R `cluster` FANNY |
| `soft_classification_variables()` | Helske et al. (2024) Table 1 soft classification | Omits reference membership column |
| `pseudoclass_regression()` | Helske et al. (2024) pseudoclass + Rubin (2004) | Not packaged in WeightedCluster |
| `medoid_indices_from_kmedoids_result()` | Interpreting `wcKMedoids` / `KMedoids` medoid index vector | Converts 1-based medoid indices to sorted 0-based medoid rows |
| `max_distance()` | `max(diss)` on off-diagonal pairs | Used in representativeness normalization |

## Included Pages

- [Conceptual Guide](./conceptual-guide.md) — theory, method choice, and interpretation
- [`representativeness_matrix()`](./representativeness-matrix.md)
- [`hard_classification_variables()`](./hard-classification-variables.md)
- [`fanny_membership()`](./fanny-membership.md)
- [`soft_classification_variables()`](./soft-classification-variables.md)
- [`pseudoclass_regression()`](./pseudoclass-regression.md)
- [KMedoids result helpers](./medoid-indices-from-kmedoids-result.md) — `medoid_indices_from_kmedoids_result`, `cluster_labels_from_kmedoids_result`
- [`max_distance()`](./max-distance.md)
- [`cluster_labels_to_dummies()`](./cluster-labels-to-dummies.md)

## Things to Keep in Mind

- Passing FANNY `highest_membership_indices` to `representativeness_matrix()`. Use PAM medoids from `medoid_indices_from_kmedoids_result()` instead.
- Treating soft membership columns as dummy variables. They are continuous membership degrees.
- Forgetting that one membership column is omitted only to avoid collinearity; the reference cluster is still represented implicitly because all membership columns sum to 1.
- Interpreting one representativeness coefficient alone. Representativeness columns should usually be interpreted together through predicted values.
- Assuming hard cluster labels are true observed categories. They are derived from the chosen distance measure, clustering algorithm, and number of clusters.
- Mixing row order between the distance matrix, outcome vector, and fixed covariates.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Helske, S., Helske, J., & Chihaya, G. K. (2024). From sequences to variables: Rethinking the relationship between sequences and outcomes. *Sociological Methodology*, 54(1), 27–51.

Kaufman, L., & Rousseeuw, P. J. (1990). *Finding Groups in Data: An Introduction to Cluster Analysis*. Wiley.

Rubin, D. B. (2004). *Multiple Imputation for Nonresponse in Surveys*. Wiley.
