# `plot_subsequence_frequencies()`

`plot_subsequence_frequencies()` draws a frequency chart for subsequences.

## Function Usage

```python
plot_subsequence_frequencies(
    subsequence_results,
    frequency_values=None,
    text_scale=1.0,
    color="steelblue",
    figsize=(10, 6),
    title=None,
    fontsize=11,
    x_label=None,
    y_label=None,
    save_as=None,
    dpi=200,
    show=False
)
```

## TraMineR Parameter Mapping

- `subsequence_results` -> TraMineR `x`
- `frequency_values` -> TraMineR `freq`
- `text_scale` -> TraMineR `cex`
- `title` -> TraMineR `main`
- `x_label` / `y_label` -> TraMineR `xlab` / `ylab`

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `subsequence_results` | ✓ | SubsequenceList | The subsequences to visualize (usually from `find_frequent_subsequences()`). |
| `frequency_values` | ✗ | sequence[float] | Optional custom values (defaults to support). |
| `x_label`, `y_label` | ✗ | str | Axis label overrides. |
| `save_as` | ✗ | str | Save path; `.png` is auto-appended if no extension is given. |
| `dpi` | ✗ | int | Save resolution (default `200`). |
| `show` | ✗ | bool | If `True`, calls `plt.show()` inside the function. |

## What It Does

- Displays how common each subsequence is.
- Makes it easier to compare top patterns at a glance.

## Example

```python
from sequenzo.event_sequences import plot_subsequence_frequencies

plot_subsequence_frequencies(
    fsubseq,
    x_label="Support",
    y_label="Subsequence",
    save_as="outputs/subsequence_support",
    dpi=300,
    show=True
)
```

## R Counterpart

- **Closest R function:** `plot.subseqelist`
- **Mapping note:** Both visualize subsequence frequencies/support from frequent-subsequence results.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Ritschard, G., Bürgin, R., & Studer, M. (2013). Exploratory Mining of Life Event Histories. In J. J. McArdle & G. Ritschard (Eds.), *Contemporary Issues in Exploratory Data Mining in the Behavioral Sciences* (pp. 221-253). Routledge.
