# `plot_subsequence_group_contrasts()`

`plot_subsequence_group_contrasts()` visualizes discriminating subsequences across groups.

It is Sequenzo's closest counterpart to TraMineR's S3 `plot.subseqelistchisq()` method.

## Function Usage

```python
plot_subsequence_group_contrasts(
    group_contrast_results,
    y_limit_mode="uniform",
    rows=None,
    cols=None,
    resid_levels=(0.05, 0.01),
    color_palette=None,
    plot_type="freq",
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

- `group_contrast_results` -> TraMineR S3 `plot.subseqelistchisq()` `x`
- `y_limit_mode` -> TraMineR S3 `plot.subseqelistchisq()` `ylim`
- `plot_type` -> TraMineR S3 `plot.subseqelistchisq()` `ptype`
- `show_legend` -> TraMineR S3 `plot.subseqelistchisq()` `with.legend`
- `legend_text_scale` -> TraMineR S3 `plot.subseqelistchisq()` `cex.legend`
- `x_label` / `y_label` -> TraMineR S3 `plot.subseqelistchisq()` `xlab` / `ylab`

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `group_contrast_results` | ✓ | SubsequenceList | Group-comparison subsequence results, usually from `compare_groups()`. |
| `plot_type` | ✗ | str | `"freq"` for frequency view, `"resid"` for Pearson residual view. |
| `x_label`, `y_label` | ✗ | str | Axis label overrides. |
| `save_as` | ✗ | str | Save path; `.png` is auto-appended if missing. |
| `dpi` | ✗ | int | Save resolution (default `200`). |
| `show` | ✗ | bool | If `True`, calls `plt.show()` inside the function. |

## What It Does

- Produces group-wise panels for discriminating subsequences.
- Encodes over- or under-representation in each group using Pearson-residual-based color bins.
- Supports both frequency and residual-centric interpretation.

## Example (Step by Step)

```python
from sequenzo.event_sequences import plot_subsequence_group_contrasts

# Step 1: Frequency-style view
plot_subsequence_group_contrasts(
    discr[:10],
    plot_type="freq",
    x_label="Frequency",
    y_label="Subsequence",
    save_as="outputs/subsequence_group_contrasts_freq",
    dpi=300,
    show=True
)

# Step 2: Residual-style view
plot_subsequence_group_contrasts(
    discr[:10],
    plot_type="resid",
    x_label="Pearson residual",
    y_label="Subsequence",
    save_as="outputs/subsequence_group_contrasts_resid",
    dpi=300,
    show=True
)
```

## R Counterpart

- **Closest R method:** TraMineR S3 `plot.subseqelistchisq()`
- **Mapping note:** Residual-based color encoding follows the same visual logic as Figures 3 and 4 in Ritschard et al. (2013).

## See Also

- [Event Sequences Introduction](/en/event-sequences/introduction) explains the workflow and data structures.
- [Quickstart Example](/en/event-sequences/example) shows a complete event-mining run.
- [Helper Functions](/en/event-sequences/event-sequence-helpers) lists supporting utilities.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## Reference

Ritschard, G., Bürgin, R., & Studer, M. (2013). Exploratory Mining of Life Event Histories. In J. J. McArdle & G. Ritschard (Eds.), Contemporary Issues in Exploratory Data Mining in the Behavioral Sciences (pp. 221–253). Routledge.
