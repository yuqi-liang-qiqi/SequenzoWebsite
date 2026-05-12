# `compare_groups_across_positions()`

`compare_groups_across_positions()` scans a sequence dataset along the time axis and asks where predefined groups show the strongest window-wise local discrepancy. It is the Sequenzo counterpart to the TraMineR `seqdiff` workflow.

Position-wise here means **window-wise local discrepancy analysis**, not a cell-by-cell cross-tabulation of states at each time point unless the window length is effectively one.

## Function Usage

```python
compare_groups_across_positions(
    seqdata,
    group,
    cmprange=(0, 1),
    seqdist_args=None,
    with_missing=False,
    weighted=True,
    squared=False
)
```

## TraMineR Parameter Mapping

- `seqdata` -> TraMineR `seqdata`
- `group` -> TraMineR `group`
- `cmprange` -> TraMineR `cmprange`
- `seqdist_args` -> arguments passed to the distance function used inside the scan
- `with_missing` -> TraMineR `with.missing`
- `weighted` -> TraMineR weighted analysis flag
- `squared` -> TraMineR `squared`

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `seqdata` | ✓ | `SequenceData` / `pd.DataFrame` | Sequence data with one row per case and one column per time point. |
| `group` | ✓ | array-like / `pd.Series` / `pd.DataFrame` | Group labels for each sequence, or a state-sequence object with one column per time point. |
| `cmprange` | ✗ | `tuple` | Window around each anchor position. Default `(0, 1)` defines the local comparison window used around each anchor position. Studer et al. (2011) illustrate six-month sliding windows rather than single-cell state comparisons. |
| `seqdist_args` | ✗ | `dict` | Arguments forwarded to `get_distance_matrix()`. Default: `{"method": "LCS", "norm": "auto"}`. |
| `with_missing` | ✗ | `bool` | Whether missing states are kept in the local sub-sequences. Default: `False`. |
| `weighted` | ✗ | `bool` | If `True`, use `seqdata.weights` when available. Default: `True`. |
| `squared` | ✗ | `bool` | If `True`, use exponent v = 2 on local dissimilarities before association summaries. Default: `False` (v = 1). |

## What It Returns

A dictionary with window-wise statistics and discrepancy profiles.

| Key | Type | Description |
| --- | --- | --- |
| `stat` | `pd.DataFrame` | Rows are anchor positions. Columns are `Pseudo F`, `Pseudo Fbf`, `Pseudo R2`, `Bartlett`, and `Levene`. |
| `discrepancy` | `pd.DataFrame` | Group discrepancy values by position, plus a `Total` column. |
| `xtstep` | `int` | Tick-step metadata carried over from `seqdata` for plotting. |
| `tick_last` | `bool` | Whether the last time label should be forced onto plots. |

At each valid anchor position the function:

1. Extracts the local sub-sequence defined by `cmprange`.
2. Drops rows with missing group labels or invalid sub-sequences unless `with_missing=True`.
3. Builds a temporary `SequenceData` object for that window.
4. Computes a local distance matrix with `get_distance_matrix()`.
5. Calls `single_factor_association()` with `R=0` and `weight_permutation="diss"` when weights are used, matching TraMineR `seqdiff`.

## Examples

### Step 1: Prepare data and grouping variable

```python
from sequenzo import SequenceData, load_dataset
from sequenzo.discrepancy_analysis import compare_groups_across_positions

df = load_dataset("mvad")
time_list = [c for c in df.columns if str(c).isdigit()]
seqdata = SequenceData(df, time=time_list, states=sorted(df[time_list].stack().unique()))

group = df["male"]
```

### Step 2: Run the window-wise scan

```python
result = compare_groups_across_positions(
    seqdata=seqdata,
    group=group,
    cmprange=(0, 1),
    seqdist_args={"method": "LCS", "norm": "auto"},
)
```

### Step 3: Inspect and plot the results

```python
from sequenzo.discrepancy_analysis import (
    print_group_differences_across_positions,
    plot_group_differences_across_positions,
)

print_group_differences_across_positions(result)
plot_group_differences_across_positions(result, stat="Pseudo R2")
```

## R Counterpart

- **Closest R workflow:** `seqdiff`
- **Mapping note:** Both workflows slide a comparison window along the time axis, rebuild local distances, and summarize group discrepancy position by position.

## Notes

- The scan can be slow because it recomputes a distance matrix at every anchor position.
- If a position has no valid sequences, Sequenzo skips it and emits a warning.
- `plot_group_differences_across_positions()` can plot one statistic, two statistics on twin axes, or discrepancy profiles.
- Keep `seqdist_args` aligned with the substantive meaning of your comparison. A timing-sensitive method can produce a different window profile than an order-only method.
- By default, Sequenzo uses nonsquared dissimilarities (v = 1). Set `squared=True` mainly for sensitivity checks or when the local dissimilarity is naturally Euclidean.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Studer, M., Ritschard, G., Gabadinho, A., & Müller, N. S. (2011). Discrepancy analysis of state sequences. *Sociological Methods & Research*, 40(3), 471–510.

Batagelj, V. (1988). Generalized Ward and related clustering problems. In H. H. Bock (Ed.), *Classification and Related Methods of Data Analysis* (pp. 67–74). North-Holland.
