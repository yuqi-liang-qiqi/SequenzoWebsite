# `plot_single_medoid()`

`plot_single_medoid()` identifies the **single medoid sequence** (the most central sequence that minimizes total distance to all others) and plots it as a colored strip across time.
The title also reports the medoid’s **coverage**: the share of sequences that lie within a small distance threshold of this medoid.

## Function Usage

```python
from sequenzo import get_distance_matrix, plot_single_medoid

distance_matrix = get_distance_matrix(
    seqdata,
    method="OM",
    sm="CONSTANT",
    indel=1,
)

plot_single_medoid(
    seqdata,
    distance_matrix,
    show_legend=True,     # show state legend on the right
    title=None,           # custom title; if None, shows ID and coverage
    save_as=None          # e.g., "medoid.png"
)
```

## Entry Parameters

| Parameter     | Required | Type         | Description                                                                                        |
| ------------- | -------- | ------------ | -------------------------------------------------------------------------------------------------- |
| `seqdata`     | ✓        | SequenceData | Your sequence dataset created with `SequenceData`. Provides time labels, state labels, and colors. |
| `distance_matrix` | ✓ | array-like | Pairwise distance matrix with the same row order as `seqdata.values`. Full square and condensed forms are accepted. |
| `weights`     | ✗        | array-like or `"auto"` | Sequence weights. With `"auto"`, the function uses `seqdata.weights` when available. |
| `show_legend` | ✗        | bool         | If `True`, shows the state legend. Default = `True`.                                               |
| `title`       | ✗        | str          | Figure title. If `None`, an auto title is shown: `Medoid Sequence (ID: …, Coverage: …%)`.          |
| `fontsize`    | ✗        | int          | Font size used for axis labels. Default = `12`.                                                    |
| `save_as`     | ✗        | str          | File path to save the figure (e.g., `"medoid.png"`). If omitted, the plot is only displayed.       |

## What It Does

* Finds the sequence with the **minimum total distance** to all other sequences (the medoid).
* Computes the medoid’s **coverage** = proportion of sequences whose distance to the medoid is ≤ `0.10 × max(distance_matrix)`.
* Draws the medoid as one horizontal bar, one colored block per time point (colors come from `SequenceData`).
* Optionally displays a legend and saves the figure.

## Returns

`None`. The function draws the figure on screen, and writes it to disk when `save_as` is provided.

## Key Features

* One-shot view of the **most representative** sequence in the dataset.
* **Coverage** gives an immediate sense of how many sequences are close to this medoid.
* Colors and legend are consistent with `SequenceData` across your project.
* Ready for export via `save_as` (default DPI is 200 inside the function).

## Examples

### 1. Basic usage

```python
distance_matrix = get_distance_matrix(
    seqdata,
    method="OM",
    sm="CONSTANT",
    indel=1,
)

plot_single_medoid(seqdata, distance_matrix)
```

### 2. Save to file with a custom title and no legend

```python
distance_matrix = get_distance_matrix(
    seqdata,
    method="OM",
    sm="CONSTANT",
    indel=1,
)

plot_single_medoid(
    seqdata,
    distance_matrix,
    show_legend=False,
    title="Most Representative Sequence",
    save_as="single_medoid.png"
)
```

## R Counterpart

- **Closest R function:** No direct one-function equivalent
- **Mapping note:** Closest TraMineR workflow is `TraMineR::seqrep()` + `TraMineR::seqrplot()`, then selecting one representative sequence manually.

## Notes

* The coverage threshold is `0.10 × max(distance_matrix)` by default (see `_compute_individual_medoid_coverage`).
* If you prefer a different threshold, modify the helper or expose a parameter in your wrapper.
* Ensure `distance_matrix` rows/columns are in the same order as `seqdata.values`.

## See Also

- [How to Read Sequence Plots](/en/tutorials/reading-sequence-plots) explains how to interpret and choose plot types.
- [Visualization Gallery](/en/visualization/gallery) shows all plots with code.
- [Visualization Tools](/en/visualization/introduction) documents shared parameters.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

Edited by: Yuqi Liang

Translation and testing by: Sizhu Qu
