# `run_feature_extraction_and_selection_pipeline()`

`run_feature_extraction_and_selection_pipeline()` runs the full FES workflow: spell-based feature extraction, optional control residualization, Boruta selection, and an optional exploratory final model.

## Function Usage

```python
run_feature_extraction_and_selection_pipeline(
    seqdata,
    outcome,
    *,
    controls=None,
    sample_weights=None,
    state_groups=None,
    problem_type=None,
    config=None,
    preset=None,
    ids=None,
    fit_final_model=None,
    verbose=True,
)
```

## `get_feature_extraction_and_selection_config_preset()`

```python
get_feature_extraction_and_selection_config_preset(preset)
```

Returns a frozen `FeatureExtractionAndSelectionConfig` for a **named settings bundle**. Currently supported: `"unterlerchner2023"` (Unterlerchner et al. 2023 defaults).

## R / Literature Parameter Mapping

| Sequenzo | R / packages |
| --- | --- |
| Feature extraction step | `WeightedCluster::seqpropclust(..., prop.only=TRUE)` |
| Boruta step | `Boruta::Boruta(residuals(confounder_model) ~ ., data=features)` |
| Optional final model | `lm()` / `glm()` on selected features |
| `preset="unterlerchner2023"` | Unterlerchner et al. (2023) parameterization |
| Residualization | OLS/WLS (regression); binomial deviance residuals (binary classification) |

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `seqdata` | ✓ | `SequenceData` | Input sequences; row count must match `outcome`. |
| `outcome` | ✓ | array-like | 1D outcome vector (`n` elements). |
| `controls` | ✗ | `DataFrame` / `ndarray` / `None` | Control covariates (`n` rows). Used for residualization and optional final model. |
| `sample_weights` | ✗ | array-like / `None` | 1D weights of length `n` for WLS/GLM. |
| `state_groups` | ✗ | `dict` / `None` | State grouping for feature builders. |
| `problem_type` | ✗ | `"regression"` / `"classification"` / `"auto"` / `None` | If omitted or `"auto"`, numeric outcomes default to regression. |
| `config` | ✗ | `FeatureExtractionAndSelectionConfig` / `None` | Full configuration object. |
| `preset` | ✗ | `str` / `None` | **Named settings bundle** from a published workflow (e.g. `"unterlerchner2023"` loads Unterlerchner et al. 2023 defaults). Mutually exclusive with `config`. |
| `ids` | ✗ | sequence / `None` | Index for feature DataFrames in the result. |
| `fit_final_model` | ✗ | `bool` / `None` | Override `config.fit_final_model`. Default `False` in presets. |
| `verbose` | ✗ | `bool` | Print progress messages. |

### `FeatureExtractionAndSelectionConfig` fields

| Field | Default | Description |
| --- | --- | --- |
| `sequencing_max_k` | `3` | Max subsequence length. |
| `sequencing_min_support` | `0.05` | Minimum subsequence support. |
| `sequencing_top_mined_subsequences` | `1000` | Cap on mined subsequences. |
| `sequencing_count_method` | `"presence"` | Sequencing count method. |
| `sequencing_event_label_mode` | `"state"` | Event label mode. |
| `timing_bin_width` | `12.0` | Bin width in `seqdata.time` units. |
| `time_unit_hint` | `"same_as_labels"` | Metadata stored in results for reproducibility and self-documentation; does not change bins. |
| `timing_include_start` | `True` | Include start timing features. |
| `timing_include_end` | `True` | Include end timing features. |
| `timing_count_method` | `"any"` | Timing count method. |
| `timing_bin_include_left` | `True` | Left-inclusive timing bins. |
| `end_time_mode` | `"last_observed"` | `"exit_time"` in `unterlerchner2023` preset. |
| `boruta_n_iter` | `50` | Boruta outer iterations. |
| `boruta_perc` | `100.0` | Boruta percentile threshold. |
| `boruta_alpha` | `0.01` | Boruta alpha (R `pValue` analogue). |
| `boruta_two_step` | `False` | BorutaPy two-step mode (off for R-style path). |
| `residualize_target_with_controls` | `True` | Residualize outcome on controls before Boruta. |
| `include_controls_in_final_model` | `True` | Add controls to optional final model design matrix. |
| `fit_final_model` | `False` | Fit exploratory OLS/WLS or logistic model after selection. |

## Returns

A `dict` including:

| Key | Description |
| --- | --- |
| `problem_type` | Resolved problem type. |
| `n` | Sample size. |
| `time_unit_hint`, `timing_bin_width`, `end_time_mode` | Extraction settings used. |
| `all_feature_names` | Full candidate feature names. |
| `selected_feature_names`, `selected_mask`, `selected_indices` | Boruta **confirmed** features. |
| `tentative_feature_names`, `tentative_mask`, `tentative_indices` | Boruta **tentative** features. |
| `boruta_ranking` | Boruta ranking vector (`ranking_` from BorutaPy). |
| `hit_counts` | Reserved for Boruta implementations that expose hit counts; currently `None` with BorutaPy. |
| `shadow_hit_counts` | Reserved for Boruta implementations that expose shadow hit counts; currently `None` with BorutaPy. |
| `X_duration`, `X_timing`, `X_sequencing`, `X_full` | Feature matrices as DataFrames. |
| `X_selected` | NumPy array of confirmed features only. |
| `fit_final_model`, `final_model_fitted`, `final_model_is_exploratory` | Whether a final model was requested/fitted. |
| `final_model`, `y_pred`, `r2`, `bic` | Present if `fit_final_model=True` and regression. |
| `final_model`, `y_pred`, `accuracy` | Present if `fit_final_model=True` and classification. |

Raises `RuntimeError` if Boruta confirms zero features.

## Example

### Unterlerchner (2023) style

```python
from sequenzo import run_feature_extraction_and_selection_pipeline

result = run_feature_extraction_and_selection_pipeline(
    seqdata=seqdata,
    outcome=outcome,
    controls=controls,
    preset="unterlerchner2023",
)

print(result["selected_feature_names"])
```

### Optional exploratory final model

```python
result = run_feature_extraction_and_selection_pipeline(
    seqdata=seqdata,
    outcome=outcome,
    controls=controls,
    preset="unterlerchner2023",
    fit_final_model=True,
)

print(result["r2"])
```

### Binary outcome with classification residualization

```python
result = run_feature_extraction_and_selection_pipeline(
    seqdata=seqdata,
    outcome=binary_outcome,
    controls=controls,
    problem_type="classification",
    preset="unterlerchner2023",
)
```

## R Counterpart

- **Closest R workflow:** `seqpropclust(..., prop.only=TRUE)` + `Boruta()` on residualized outcomes + optional `lm()` / `glm()`
- **Mapping note:** Not one R function; papers script these steps. Boruta confirmed sets may differ from R because Sequenzo uses BorutaPy (see [Conceptual Guide](./conceptual-guide.md#boruta-python-vs-r)).

## Notes

- Provide **either** `config` **or** `preset`, not both.
- Multi-class classification: set `residualize_target_with_controls=False` in a custom `config`.
- Papers often cluster correlated features before interpreting a final regression. Use `cluster_correlated_features()` rather than relying on `fit_final_model=True` alone.
- Requires PyPI package `boruta` (installed with `pip install sequenzo`).
- With BorutaPy, `hit_counts` and `shadow_hit_counts` in the result are `None`; use `boruta_ranking`, `selected_*`, and `tentative_*` instead.

## See Also

- [Section overview](/en/sequence-feature-selection-and-extraction/introduction) maps the surrounding workflow and related functions.
- [Typical Workflow](/en/basics/typical-workflow) shows where this method fits in the full analysis.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Bolano, D., & Studer, M. (2020). The link between previous life trajectories and a later life outcome: A feature selection approach.

Unterlerchner, L., Studer, M., & Gomensoro, A. (2023). Back to the features. Investigating the relationship between educational pathways and income using sequence analysis and feature extraction and selection approach. Swiss journal of sociology, 49(2), 417-446.
