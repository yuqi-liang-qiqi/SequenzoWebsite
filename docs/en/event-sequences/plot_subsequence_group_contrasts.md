# `plot_subsequence_group_contrasts()`

`plot_subsequence_group_contrasts()` visualizes discriminating subsequences across groups.

It is the recommended counterpart to TraMineR `plot.subseqelistchisq`.

## Function Usage

```python
plot_subsequence_group_contrasts(
    group_contrast_results,  # subgroup_contrast_results
    y_limit_mode="uniform",
    rows=None,
    cols=None,
    resid_levels=(0.05, 0.01),
    color_palette=None,
    pcurve_type="freq",
    legend_title=None,
    show_legend=True,
    legend_text_scale=1.0,
    figsize=(13, 7),
    fontsize=11,
    x_label=None,
    y_label=None,
    save_as=None,
    dpi=200,
    show=False
)
```

## TraMineR Parameter Mapping

- `group_contrast_results` -> TraMineR `x`
- `y_limit_mode` -> TraMineR `ylim`
- `plot_type` -> TraMineR `ptype`
- `show_legend` -> TraMineR `with.legend`
- `legend_text_scale` -> TraMineR `cex.legend`
- `x_label` / `y_label` -> TraMineR `xlab` / `ylab`

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `x` (`subgroup_contrast_results`) | ✓ | SubsequenceList | Group-comparison subsequence results (usually from `compare_groups()`). |
| `plot_type` | ✗ | str | `"freq"` for frequency view, `"resid"` for Pearson residual view. |
| `x_label`, `y_label` | ✗ | str | Axis label overrides. |
| `save_as` | ✗ | str | Save path; `.png` is auto-appended if missing. |
| `dpi` | ✗ | int | Save resolution (default `200`). |
| `show` | ✗ | bool | If `True`, calls `plt.show()` inside the function. |

## What It Does

- Produces group-wise panels for discriminating subsequences.
- Encodes direction/significance through residual-based color bins.
- Supports both frequency and residual-centric interpretation.

## Example (Step by Step)

```python
from sequenzo.event_sequences import plot_subsequence_group_contrasts

# Step 1: Frequency-style view
plot_subsequence_group_contrasts(
    discr[:10],
    pcurve_type="freq",
    x_label="Frequency",
    y_label="Subsequence",
    save_as="outputs/subsequence_group_contrasts_freq",
    dpi=300,
    show=True
)

# Step 2: Residual-style view
plot_subsequence_group_contrasts(
    discr[:10],
    pcurve_type="resid",
    x_label="Pearson residual",
    y_label="Subsequence",
    save_as="outputs/subsequence_group_contrasts_resid",
    dpi=300,
    show=True
)
```

## R Counterpart

- **Closest R function:** `plot.subseqelistchisq`

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang
