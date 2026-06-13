# `pseudoclass_regression()`

`pseudoclass_regression()` implements Helske-style **pseudoclass assignment**: draw `M` hard cluster labels from a membership matrix, fit a regression in each replication, and combine coefficients with Rubin's multiple-imputation rules.

## Function Usage

```python
pseudoclass_regression(
    y,
    U,
    *,
    X_fixed=None,
    M=20,
    reference=0,
    random_state=None,
    model_type="ols",
    add_intercept=True,
    x_fixed_names=None,
    cluster_names=None,
)
```

## R / Literature Parameter Mapping

| Sequenzo | R / packages | Notes |
| --- | --- | --- |
| Membership draws from `U` | Helske et al. (2024) pseudoclass step | Categorical assignment per replication |
| Rubin combination | Rubin (2004) multiple imputation pooling | `beta_combined`, `se_combined`, `cov_combined` |
| `model_type="ols"` | `stats::lm` | Continuous outcome |
| `model_type="logit"` | `stats::glm(..., family=binomial)` | Binary outcome |

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `y` | ✓ | `ndarray` | Outcome vector of length `n`. |
| `U` | ✓ | `ndarray` | Membership matrix `(n, K)` with rows summing to 1. Requires `K >= 2`. |
| `X_fixed` | ✗ | `ndarray` / `None` | Optional fixed covariates. May be 1D `(n,)` or 2D `(n, p)`; a 1D array is reshaped to `(n, 1)`. Appended before cluster dummies. |
| `M` | ✗ | `int` | Number of pseudoclass replications. Default `20`. Must be `>= 1`. |
| `reference` | ✗ | `int` | Reference cluster index (0-based) omitted when building dummies. |
| `random_state` | ✗ | `int` / `None` | Seed for `numpy.random.Generator` when drawing cluster labels. |
| `model_type` | ✗ | `"ols"` / `"logit"` | Regression model. Default `"ols"`. |
| `add_intercept` | ✗ | `bool` | If `True`, prepend an intercept unless `X_fixed` already contains an exact all-ones column. Default `True`. |
| `x_fixed_names` | ✗ | `list` / `None` | Optional names for columns in `X_fixed`. Defaults to `X_fixed_1`, `X_fixed_2`, … |
| `cluster_names` | ✗ | `list` / `None` | Optional length-`K` cluster names used in the non-reference dummy coefficient names. |

## Returns

A `dict` with keys:

| Key | Type | Description |
| --- | --- | --- |
| `beta_combined` | `ndarray` | Pooled coefficient vector (Rubin rules). |
| `se_combined` | `ndarray` | Pooled standard errors (`sqrt(diag(cov_combined))`). |
| `cov_combined` | `ndarray` | Pooled covariance matrix `T = W + (1 + 1/m_eff) B`, where `W` is the average within-replication covariance and `B` is the between-replication covariance of the coefficient estimates. |
| `within_cov`, `between_cov` | `ndarray` | The within-replication covariance `W` and between-replication covariance `B` used to form `cov_combined`. |
| `beta_list` | `list` | Coefficient vector from each successful replication. |
| `cov_list` | `list` | Covariance matrix from each successful replication. |
| `m_eff` | `int` | Number of successful fits. |
| `failed` | `int` | `M - m_eff` replications skipped due to rank-deficient design matrices, logit non-convergence, perfect separation, or other model-fitting errors. |
| `success_rate`, `failed_reasons` | scalar / `dict` | Proportion of successful replications and a reason-count dictionary for skipped draws. |
| `param_names` | `list` | Coefficient names in the same order as `beta_combined` and `se_combined`. |
| `M`, `reference`, `model_type`, `add_intercept` | scalar metadata | Echo the requested pseudoclass settings so downstream reports can audit the pooling context. |

Replications that fail are skipped and counted in `failed`. If one or more draws fail, pooled inference is conditional on the successful fitted draws; inspect `success_rate` and `failed_reasons` before reporting the result. If every replication fails, a `RuntimeError` is raised.

## Example

```python
from sequenzo import fanny_membership, pseudoclass_regression

U, _ = fanny_membership(diss, k=5, m=1.4)

result = pseudoclass_regression(
    y=income,
    U=U,
    X_fixed=controls,
    M=20,
    reference=0,
    model_type="ols",
    random_state=42,
)

print(result["m_eff"], result["failed"])
print(result["beta_combined"])
print(result["se_combined"])
```

## R Counterpart

- **Closest R workflow:** manual pseudoclass draws + separate models + Rubin pooling.
- **Mapping note:** Not exported by WeightedCluster or TraMineR. Requires Python `statsmodels`.

## Notes

- **Dependency:** `statsmodels` must be installed.
- `U` must have at least two cluster columns (`K >= 2`).
- `y` and `U` must have the same number of rows; `X_fixed` must match if provided.
- Helske et al. (2024) report that pseudoclass assignment often underperforms soft classification and representativeness in their simulations; treat it as a sensitivity check rather than the default.
- In each replication, cluster dummies are built directly from the drawn labels and the omitted `reference` column, not via [`cluster_labels_to_dummies()`](./cluster-labels-to-dummies.md).

## See Also

- [Section overview](/en/beyond-basic-clustering/from-sequences-to-variables/introduction) maps the surrounding workflow and related functions.
- [Typical Workflow](/en/basics/typical-workflow) shows where this method fits in the full analysis.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Helske, S., Helske, J., & Chihaya, G. K. (2024). From sequences to variables: Rethinking the relationship between sequences and outcomes. *Sociological Methodology*, 54(1), 27–51.

Rubin, D. B. (2004). *Multiple Imputation for Nonresponse in Surveys*. Wiley.
