# Decomposition Analysis

Sequenzo's `decomposition` module explains gaps in a continuous outcome between two groups. It splits the mean difference into an **explained** part (composition / endowment) and an **unexplained** part (returns / coefficients, plus intercept).

The methods are widely used for wage gaps, pension gaps, and health inequalities, but they apply to **any** binary group comparison with a numeric outcome.

## What You Can Do Here

| Goal | Start here |
| --- | --- |
| Understand SA–KOB workflow and interpretation | [Conceptual Guide: SA–KOB](./sa-kob-conceptual-guide) |
| Decompose a gap with your own design matrix | [`get_kob_decomposition()`](./get-kob-decomposition) |
| Add bootstrap uncertainty to generic KOB | [`get_kob_decomposition_bootstrap()`](./get-kob-decomposition-bootstrap) |
| Decompose a gap with sequence-analysis clusters | [`get_sa_kob_decomposition()`](./get-sa-kob-decomposition) |
| Bootstrap SA–KOB cluster contributions | [`get_sa_kob_decomposition_bootstrap()`](./get-sa-kob-decomposition-bootstrap) |
| Call the low-level engine directly | [`get_oaxaca_blinder_decomposition()`](./get-oaxaca-blinder-decomposition) |

## Module Layout

| Layer | Python module | Main entry points |
| --- | --- | --- |
| Engine | `sequenzo.decomposition.oaxaca` | `get_oaxaca_blinder_decomposition()` |
| Generic KOB | `sequenzo.decomposition.kob` | `get_kob_decomposition()`, `get_kob_decomposition_bootstrap()` |
| SA–KOB | `sequenzo.decomposition.sa_kob` | `get_sa_kob_decomposition()`, `get_sa_kob_decomposition_bootstrap()` |
| Results | `sequenzo.decomposition.results` | `KOBDecompositionResult`, `SAKOBDecompositionResult`, … |

`get_kob_decomposition()` is the recommended public name. It calls the same engine as `get_oaxaca_blinder_decomposition()`.

## Typical Workflow (Generic KOB)

### Step 1: Prepare outcome, group, and covariates

You need one numeric outcome `y`, one binary grouping variable, and a design matrix `X` with the same number of rows.

```python
import numpy as np
import pandas as pd

y = df["pension_income"].to_numpy()
group = df["sex"].to_numpy()
X = df[["age", "education_years"]].to_numpy()
```

### Step 2: Fit the decomposition

```python
from sequenzo.decomposition import get_kob_decomposition

result = get_kob_decomposition(
    y=y,
    group=group,
    X=X,
    variable_names=["age", "education_years"],
    group0_value="men",
    group1_value="women",
    reference="group0",
)
```

### Step 3: Read the gap and components

```python
result.total_gap              # mean(group0) - mean(group1)
result.explained              # composition effect
result.unexplained_returns    # coefficient / returns effect
result.unexplained_intercept  # intercept difference
result.by_column              # column-level contributions
result.by_term                # term-level aggregates
```

Positive `total_gap` means `group0` has a higher mean outcome than `group1`.

### Step 4 (optional): Bootstrap uncertainty

```python
from sequenzo.decomposition import get_kob_decomposition_bootstrap

boot = get_kob_decomposition_bootstrap(
    y=y,
    group=group,
    X=X,
    n_boot=500,
    random_state=42,
)
boot.confidence_intervals["explained"]
```

## Typical Workflow (SA–KOB)

SA–KOB combines sequence-analysis typologies with KOB decomposition (Rowold, Struffolino, and Fasang, 2025). After you have cluster labels from sequence analysis, one function handles dummy construction, reference-coefficient assignment (options I–III), and cluster-level reporting. The default is option III (`cluster_coefficient_reference="majority"`).

### Step 1: Obtain cluster labels from sequence analysis

Cluster men and women on a **pooled** sample so both groups share the same typology. See the [conceptual guide](./sa-kob-conceptual-guide) for pooling, common support, and silhouette checks.

### Step 2: Run SA–KOB

```python
from sequenzo.decomposition import get_sa_kob_decomposition

result = get_sa_kob_decomposition(
    y=pension_income,
    group=sex,
    cluster_labels=life_course_cluster,
    k=8,
    reference_category_index=0,
    cluster_coefficient_reference="majority",
    fallback_reference="group0",
    group0_value="men",
    group1_value="women",
)
```

### Step 3: Inspect cluster composition and contributions

```python
result.cluster_composition     # Rowold et al., Table 2 style
result.cluster_owners          # coefficient owner per cluster
result.by_cluster              # all k clusters, including baseline
result.common_support_table    # sparse-cell diagnostics
```

Scalar `explained` and `unexplained_returns` follow the raw twofold identity. `by_cluster` uses Yun-normalized category attribution, so `explained_detailed` may differ slightly from `explained` in mixed-reference settings.

## Sign Convention and Identity

For all functions:

- `total_gap = group0_mean - group1_mean`
- `total_gap ≈ explained + unexplained_returns + unexplained_intercept`

When categorical normalization is enabled, detailed tables in `by_category` or `by_cluster` are reference-invariant at the category level, but their sums may not exactly match the scalar twofold components. Keep both: scalars for the decomposition identity, detailed tables for interpretation.

## Related Sequenzo Modules

- `sequenzo.group_comparison` — overall two-group tests (LRT, BIC)
- `sequenzo.clustering` — sequence typologies and cluster-quality diagnostics used as SA–KOB inputs

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Rowold, C., Struffolino, E., & Fasang, A. E. (2025). Life-course-sensitive analysis of group inequalities: Combining sequence analysis with the Kitagawa–Oaxaca–Blinder decomposition. *Sociological Methods & Research*, 54(2), 646–705.

Jann, B. (2008). The Blinder–Oaxaca decomposition for linear regression models. *The Stata Journal*, 8(4), 453–479.
