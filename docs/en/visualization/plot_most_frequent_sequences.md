<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-12 13:49:18
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-12 13:49:50
 * @FilePath: /SequenzoWebsite/docs/en/visualization/plot_most_frequent_sequences.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# `plot_most_frequent_sequences()`

`plot_most_frequent_sequences()` draws the Top-N most common full sequences in your data (e.g., the 10 most frequently observed state paths). Each horizontal bar represents one sequence pattern across time; the bar’s height equals that sequence’s percentage in the whole dataset. Colors follow your `SequenceData` state color map so segments match your legend.

This is similar to `seqfplot` in R’s TraMineR.

## Function Usage

```python
plot_most_frequent_sequences(
    seqdata,
    top_n=10,         # how many sequences to show
    save_as=None,     # e.g., "top_sequences.png"
    dpi=200
)
```

## Entry Parameters

| Parameter | Required | Type         | Description                                                                                               |
| --------- | -------- | ------------ | --------------------------------------------------------------------------------------------------------- |
| `seqdata` | ✓        | SequenceData | Your sequence dataset created with `SequenceData`. Colors and legend come from this object.               |
| `top_n`   | ✗        | int          | Number of most frequent sequences to display. Default = 10.                                               |
| `save_as` | ✗        | str          | File path to save the figure (e.g., `"top_sequences.png"`). If not set, the plot is just shown on screen. |
| `dpi`     | ✗        | int          | Resolution when saving the image. Default = 200. Use 300+ for publications if your machine can handle it. |

## What It Does

* Counts how often each unique full sequence appears.
* Selects the Top-N sequences and computes their share (percentage of all sequences).
* Draws each sequence as a stacked horizontal bar: one colored block per time point.
* Labels the x-axis as time and the y-axis as cumulative percentage so you can see:

  * the top sequence’s percentage,
  * the cumulative share covered by the Top-N sequences.

## Key Features

* Clear, compact view of the most typical trajectories in your data.
* Colors and legend automatically match `SequenceData` (no manual color work).
* Scales to different `top_n` values without changing your workflow.
* Ready for export with `save_as` and `dpi`.

## Examples

### 1. Show the default Top 10 sequences

```python
plot_most_frequent_sequences(seqdata)
```

### 2. Show Top 5 sequences with higher resolution

```python
plot_most_frequent_sequences(
    seqdata,
    top_n=5,
    dpi=300
)
```

### 3. Save the figure to a file

```python
plot_most_frequent_sequences(
    seqdata,
    top_n=15,
    save_as="top15_sequences.png"
)
```

This saves `top15_sequences.png` in your current working directory (or the folder you specify).

## Notes

* Bars are stacked along time so you can read the sequence pattern left → right.
* The y-axis shows percentages. The top tick equals the cumulative share of the Top-N sequences (so the bars fill up to that value, not necessarily to 100%).
* The legend is pulled from `SequenceData` to ensure state-color consistency across plots.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

Edited by: Yuqi Liang
