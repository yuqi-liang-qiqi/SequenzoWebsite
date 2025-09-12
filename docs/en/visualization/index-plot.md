# `plot_sequence_index()`

`plot_sequence_index()` draws a “sequence index plot”: each row is one person (or case), each column is a time point, and the color shows which state that person is in at that time. This lets you see patterns such as when people switch states, how stable sequences look, and how sequences differ across groups (e.g., Male vs Female, Country A vs Country B).

If you run it in a Jupyter Notebook, the figure appears under the cell. If you run it as a Python script, a window will pop up. You can also save the figure to a file with `save_as`.

## Function Usage

```python
plot_sequence_index(
    seqdata,
    id_group_df=None,     # optional grouping info
    categories=None,      # which column to use for grouping
    sort_by=None,         # sequence sorting rule, see below
    figsize=(10, 6),      # size of each subplot
    title=None,           # overall title
    xlabel="Time",
    ylabel="Sequences",
    save_as=None,         # save output file (e.g., "index.png")
    dpi=200,
    layout="column",      # "column" or "grid"
    nrows=None,           # manual rows for layout (optional)
    ncols=None,           # manual cols for layout (optional)
    group_order=None,     # custom order of groups
    sort_groups="auto"    # "auto","numeric","alpha","none"
)
```

## Entry Parameters

| Parameter       | Required | Type         | Description                                                                                                                                                                                                                                                                                                                          |
| --------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `seqdata`       | ✓        | SequenceData | Your sequence dataset created with `SequenceData`. Rows are entities, columns are time points, values are integer-coded states (1..K).                                                                                                                                                                                               |
| `id_group_df`   | ✗        | DataFrame    | A DataFrame linking IDs to groups (e.g., gender, country). If `None`, a single overall plot is made.                                                                                                                                                                                                                                 |
| `categories`    | ✗        | str          | Column name in `id_group_df` that specifies the grouping variable.                                                                                                                                                                                                                                                                   |
| `sort_by`       | ✗        | str          | How to sort sequences within each subplot. Options: `None` (lexicographic by time), `"first_marriage"` (sort by first time reaching a target state; current default target is state code 3), `"transition_count"` (fewest to most switches), `"final_state"` (by the ending state), `"happiness_slope"` (by fitted slope over time). |
| `figsize`       | ✗        | tuple        | Size of each subplot (width, height). Default = `(10, 6)`.                                                                                                                                                                                                                                                                           |
| `title`         | ✗        | str          | Title for the whole figure.                                                                                                                                                                                                                                                                                                          |
| `xlabel`        | ✗        | str          | Label for the x-axis.                                                                                                                                                                                                                                                                                                                |
| `ylabel`        | ✗        | str          | Label for the y-axis.                                                                                                                                                                                                                                                                                                                |
| `save_as`       | ✗        | str          | File path to save the final combined figure (e.g., `"index.png"`). The image is saved in your current working directory unless you provide a full path.                                                                                                                                                                              |
| `dpi`           | ✗        | int          | Resolution when saving the image. Default = `200`.                                                                                                                                                                                                                                                                                   |
| `layout`        | ✗        | str          | How to arrange multiple group subplots: `"column"` (stacked vertically) or `"grid"` (rows × columns).                                                                                                                                                                                                                                |
| `nrows`/`ncols` | ✗        | int          | Manually set the grid size when `layout="grid"`. If not set, it is auto-determined.                                                                                                                                                                                                                                                  |
| `group_order`   | ✗        | list         | Custom order of groups. If provided, overrides automatic sorting.                                                                                                                                                                                                                                                                    |
| `sort_groups`   | ✗        | str          | Sorting for group panels: `"auto"` (numeric-smart), `"numeric"`, `"alpha"` (alphabetical), or `"none"` (original order).                                                                                                                                                                                                             |

## What It Does

* Converts sequence values into a color matrix where rows are sequences and columns are time points.
* Sorts sequences to make visual patterns easier to see. If `sort_by=None`, a lexicographic time-based sort is used; otherwise uses the chosen structural rule.
* If group info is provided, creates one subplot per group and arranges them by `layout`.
* Adds a legend using `seqdata`’s color map so colors match your state labels.
* Displays the figure in your current environment and can also save it to a file if `save_as` is set.

## Notes and Tips

* State values must be integer-coded starting at 1. The colormap is aligned to `1..K` where K is the number of states.
* Missing values are internally handled for sorting; visually they still map via the colormap you set in `SequenceData`.
* `"first_marriage"` currently uses `target_state=3` inside the helper. If your “marriage” state has a different code, adjust this in your code or map states accordingly in `SequenceData`.
* Very large N (many rows) can make figures heavy. Consider plotting a subset or grouping to split the plot into panels.

## Key Features

* Clear “barcode-like” visualization of entire sequences over time.
* Multiple groups in one figure for easy comparison.
* Several built-in sorting rules to reveal structure (first event time, number of switches, final state, simple slope).
* Publication-ready export via `save_as` and `dpi`.

## Examples

### 1. Overall index plot (no groups)

```python
plot_sequence_index(
    seqdata,
    title="Sequence Index Plot: Overall",
    xlabel="Time",
    ylabel="Sequences"
)
```

This draws one panel where each row is one sequence and colors show states over time.

### 2. Compare groups in a grid

```python
plot_sequence_index(
    seqdata,
    id_group_df=id_group_df,
    categories="Gender",
    layout="grid",
    title="Sequence Index Plot by Gender"
)
```

This creates one subplot per gender and arranges them in a grid.

### 3. Sort by number of switches (stable at top → volatile at bottom)

```python
plot_sequence_index(
    seqdata,
    sort_by="transition_count",
    title="Index Plot Sorted by Transition Count"
)
```

Sequences with fewer state changes appear at the top; those with many switches sink to the bottom.

### 4. Save the figure

```python
plot_sequence_index(
    seqdata,
    id_group_df=id_group_df,
    categories="Country",
    save_as="index_by_country.png",
    dpi=300
)
```

This saves a high-resolution figure to `index_by_country.png` in your working directory.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

Edited by: Yuqi Liang
