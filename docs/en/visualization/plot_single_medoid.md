<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-12 14:18:33
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-12 14:19:24
 * @FilePath: /SequenzoWebsite/docs/zh/visualization/plot_single_medoid.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# `plot_single_medoid()`

`plot_single_medoid()` identifies the **single medoid sequence** (the most central sequence that minimizes total distance to all others) and plots it as a colored strip across time.
The title also reports the medoid’s **coverage**: the share of sequences that lie within a small distance threshold of this medoid.

## Function Usage

```python
# assume you already computed an NxN distance matrix named `distance_matrix`
plot_single_medoid(
    seqdata,
    show_legend=True,     # show state legend on the right
    title=None,           # custom title; if None, shows ID and coverage
    save_as=None          # e.g., "medoid.png"
)
```

## Entry Parameters

| Parameter     | Required | Type         | Description                                                                                        |
| ------------- | -------- | ------------ | -------------------------------------------------------------------------------------------------- |
| `seqdata`     | ✓        | SequenceData | Your sequence dataset created with `SequenceData`. Provides time labels, state labels, and colors. |
| `show_legend` | ✗        | bool         | If `True`, shows the state legend. Default = `True`.                                               |
| `title`       | ✗        | str          | Figure title. If `None`, an auto title is shown: `Medoid Sequence (ID: …, Coverage: …%)`.          |
| `save_as`     | ✗        | str          | File path to save the figure (e.g., `"medoid.png"`). If omitted, the plot is only displayed.       |

Important external input (must exist before calling):

* `distance_matrix` (np.ndarray): an `N×N` symmetric pairwise distance matrix that matches the row order of `seqdata.values`.
  The current implementation reads this variable from the surrounding scope.

## What It Does

* Finds the sequence with the **minimum total distance** to all other sequences (the medoid).
* Computes the medoid’s **coverage** = proportion of sequences whose distance to the medoid is ≤ `0.10 × max(distance_matrix)`.
* Draws the medoid as one horizontal bar, one colored block per time point (colors come from `SequenceData`).
* Optionally displays a legend and saves the figure.

## Key Features

* One-shot view of the **most representative** sequence in the dataset.
* **Coverage** gives an immediate sense of how many sequences are close to this medoid.
* Colors and legend are consistent with `SequenceData` across your project.
* Ready for export via `save_as` (default DPI is 200 inside the function).

## Examples

### 1. Basic usage

```python
# compute or load your NxN distance matrix first
distance_matrix = my_distance_function(seqdata.values)

plot_single_medoid(seqdata)
```

### 2. Save to file with a custom title and no legend

```python
distance_matrix = my_distance_function(seqdata.values)

plot_single_medoid(
    seqdata,
    show_legend=False,
    title="Most Representative Sequence",
    save_as="single_medoid.png"
)
```

## Notes

* The coverage threshold is `0.10 × max(distance_matrix)` by default (see `_compute_individual_medoid_coverage`).
* If you prefer a different threshold, modify the helper or expose a parameter in your wrapper.
* Ensure `distance_matrix` rows/columns are in the same order as `seqdata.values`.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

Edited by: Yuqi Liang
