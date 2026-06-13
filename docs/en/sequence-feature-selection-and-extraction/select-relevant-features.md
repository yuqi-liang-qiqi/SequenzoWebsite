# `select_relevant_features()`

`select_relevant_features()` runs Boruta all-relevant feature selection on an existing feature matrix. Use this when you already have `X` (for example from `extract_sequence_features()`) and a target `y`.

## Function Usage

```python
select_relevant_features(
    X,
    y,
    *,
    problem_type="regression",
    n_iter=50,
    perc=100.0,
    boruta_alpha=0.01,
    boruta_two_step=False,
    random_state=42,
    verbose=False,
)
```

## R / Literature Parameter Mapping

| Sequenzo | R `Boruta` | Notes |
| --- | --- | --- |
| `n_iter` | `maxRuns` | Outer Boruta iterations |
| `perc` | shadow percentile logic | Default `100.0` |
| `boruta_alpha` | `pValue` | Default `0.01` |
| `boruta_two_step` | `mcAdj` / two-step path | Sequenzo default `False` |
| `problem_type` | implicit from `y` | `"regression"` or `"classification"` |

Underlying engine: BorutaPy + sklearn random forest (Gini importance), not R ranger permutation importance.

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `X` | ✓ | `ndarray` / `DataFrame` | Feature matrix (`n` × `p`). Column names used if `DataFrame`. |
| `y` | ✓ | array-like | 1D target vector of length `n`. |
| `problem_type` | ✗ | `str` | `"regression"` or `"classification"`. |
| `n_iter` | ✗ | `int` | Boruta iterations (default `50`). |
| `perc` | ✗ | `float` | Percentile of shadow importances (default `100.0`). |
| `boruta_alpha` | ✗ | `float` | Significance level (default `0.01`). |
| `boruta_two_step` | ✗ | `bool` | BorutaPy two-step correction (default `False`). |
| `random_state` | ✗ | `int` / `None` | Random seed for the forest (default `42`). |
| `verbose` | ✗ | `bool` | Print Boruta progress. |

## Returns

A `dict` with:

| Key | Description |
| --- | --- |
| `selected_mask` | Boolean mask over columns (confirmed). |
| `selected_indices` | Integer indices of confirmed features. |
| `selected_feature_names` | Names of confirmed features. |
| `tentative_mask` | Boolean mask for tentative features (`support_weak_`). |
| `tentative_indices` | Indices of tentative features. |
| `tentative_feature_names` | Names of tentative features. |
| `boruta_ranking` | Boruta ranking vector (`ranking_` from BorutaPy). |
| `hit_counts` | Reserved for Boruta implementations that expose hit counts; currently `None` with BorutaPy. |
| `shadow_hit_counts` | Reserved for Boruta implementations that expose shadow hit counts; currently `None` with BorutaPy. |

If `X` is not a DataFrame, features are named `X1`, `X2`, …

## Example

```python
from sequenzo import extract_sequence_features, select_relevant_features

features = extract_sequence_features(seqdata, timing_bin_width=12.0)
selection = select_relevant_features(
    features["X_full"],
    outcome,
    problem_type="regression",
    n_iter=50,
    boruta_alpha=0.01,
    boruta_two_step=False,
)

print(selection["selected_feature_names"])
print(selection["tentative_feature_names"])
```

### With residualized outcome (manual)

Residualize `y` on controls before calling this function if you follow Bolano and Studer (2020); the pipeline does this automatically via `residualize_target_with_controls`.

## R Counterpart

- **Closest R function:** `Boruta::Boruta()`
- **Mapping note:** Same algorithm family; different importance metric and RF backend. See [Conceptual Guide](./conceptual-guide.md#boruta-python-vs-r).

## Notes

- `X` must contain only finite values.
- For classification, invalid category codes (`y < 0`) raise an error.
- Requires PyPI package `boruta` (`pip install sequenzo`).
- Default random forest uses `n_estimators=800` inside the Boruta wrapper unless you extend `select_all_relevant_features_boruta` with a custom estimator (not exposed on this entrypoint).
- With BorutaPy, `hit_counts` and `shadow_hit_counts` are `None`. Use `boruta_ranking`, `selected_*`, and `tentative_*` for diagnostics.

## See Also

- [Section overview](/en/sequence-feature-selection-and-extraction/introduction) maps the surrounding workflow and related functions.
- [Typical Workflow](/en/basics/typical-workflow) shows where this method fits in the full analysis.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Bolano, D., & Studer, M. (2020). The link between previous life trajectories and a later life outcome: A feature selection approach.

Unterlerchner, L., Studer, M., & Gomensoro, A. (2023). Back to the features. Investigating the relationship between educational pathways and income using sequence analysis and feature extraction and selection approach. Swiss journal of sociology, 49(2), 417-446.
