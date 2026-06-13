# `plot_relative_frequency()`

`plot_relative_frequency()` draws a two-panel figure to summarize sequence “typicality” by frequency groups:

* Left: the **medoid** (most central) sequence for each frequency group, shown as a sequence-index strip.
* Right: a **box plot** of dissimilarities (distance to the group medoid) for sequences in that group.
  It also prints a summary line with a **pseudo R²**, **F-statistic**, and **p-value** that quantify how well groups are separated.

## Function Usage

```python
plot_relative_frequency(
    seqdata,
    distance_matrix,     # NxN pairwise distances among sequences
    num_groups=12,       # number of frequency groups
    save_as=None,        # e.g., "seqrf.png"
    dpi=200
)
```

## Entry Parameters

| Parameter         | Required | Type                   | Description                                                                                                                                                 |
| ----------------- | -------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `seqdata`         | ✓        | SequenceData           | Your sequence dataset created with `SequenceData`. Provides time axis, state labels, and colors.                                                            |
| `distance_matrix` | ✓        | np.ndarray / DataFrame | An `N×N` symmetric pairwise distance matrix between sequences (order must match `seqdata.values`). A pandas DataFrame is accepted and converted internally. |
| `num_groups`      | ✗        | int                    | Number of frequency groups to form along the 1D MDS axis (equal-size bins). Default = `12`.                                                                 |
| `weights`         | ✗        | np.ndarray / `"auto"` | Weights for sequences. With `"auto"` (default), uses `seqdata.weights` when available.                                                                      |
| `grouping_method` | ✗        | str                    | Grouping method: `"first"` (equal-size groups, default) or `"prop"` (weighted grouping).                                                                    |
| `fontsize`        | ✗        | int                    | Base font size for labels. Default = `12`.                                                                                                                   |
| `show_title`      | ✗        | bool                   | Whether to draw the figure title. Default = `True`.                                                                                                          |
| `save_as`         | ✗        | str                    | File path to save the figure (e.g., `"seqrf.png"`). If omitted, the plot is only displayed.                                                                 |
| `dpi`             | ✗        | int                    | Output resolution when saving. Default = `200`. Use `300+` for publications if your machine can handle it.                                                  |

## What It Does

* Orders sequences by a **1D classical MDS (cmdscale)** projection of the distance matrix, then splits them into `num_groups` equal-size **frequency groups**.
* For each group, finds the **medoid** (sequence with minimal weighted sum of distances) and shows it as a colored strip (left panel).
* For each group, computes **dissimilarities to the medoid** and shows them as a **horizontal box plot** (right panel).
* Reports **representation quality** below the legend: pseudo/medoid-based **R²**, **F-statistic**, and **p-value** with significance stars (`*`, `**`, `***`).
* Uses the state color palette defined in `seqdata` so colors are consistent with your other plots.
* Adapts figure height to the number of groups so labels remain readable.

## Key Features

* One glance view: “typical” (medoid) sequence per group + how tightly sequences cluster around it.
* Distance-agnostic: works with any valid `N×N` sequence distance (OM, LCP, Hamming, etc.).
* Auto layout and legend that scale with the number of states.
* Publication-ready export via `save_as` and `dpi`.

## Examples

### 1. Basic seqrf plot with defaults

```python
plot_relative_frequency(
    seqdata,
    distance_matrix
)
```

### 2. Fewer groups, higher resolution, and save

```python
plot_relative_frequency(
    seqdata,
    distance_matrix,
    num_groups=8,
    save_as="seqrf_8groups.png",
    dpi=300
)
```

## R Counterpart

- **Closest R function:** `seqplot(type="rf")` (TraMineR) / related RF tooling in TraMineRextras
- **Mapping note:** Conceptually aligned with relative-frequency-style sequence visualization.

## Notes

* `distance_matrix` must match the sequence order in `seqdata.values` (`N×N`, symmetric, non-negative).
* Grouping uses equal-size bins along the MDS axis (method `"first"` internally).
* The medoid is computed by minimizing the (weighted) sum of distances within each group.
* The y-axis on the left counts groups (1 = bottom group). The right panel uses your distance units.
* If your time labels are dense, only a subset of x-ticks is shown for readability.

## See Also

- [How to Read Sequence Plots](/en/tutorials/reading-sequence-plots) explains how to interpret and choose plot types.
- [Visualization Gallery](/en/visualization/gallery) shows all plots with code.
- [Visualization Tools](/en/visualization/introduction) documents shared parameters.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

Edited by: Yuqi Liang

## References

Fasang, A. E., & Liao, T. F. (2013). Visualizing Sequences in the Social Sciences: Relative Frequency Sequence Plots: Relative Frequency Sequence Plots. Sociological Methods & Research, 43(4), 643-676. https://doi.org/10.1177/0049124113506563 (Original work published 2014)