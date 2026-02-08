# `plot_sequence_index()`

In a sequence index plot, each row is one person/firm/region/country, each column is a time point, and the color shows which state that person is in at that time. This lets you see patterns such as when people switch states, how stable sequences look, and how sequences differ across groups (e.g., Male vs Female, Country A vs Country B).

If you run it in a Jupyter Notebook, the figure appears under the cell. If you run it as a Python script, a window will pop up. You can also save the figure to a file with `save_as`.

## Function Usage

A minimal example with only the required parameters (sufficient for most use cases):

```python
plot_sequence_index(sequence_data)
```

The `plot_sequence_index` function provides two approaches for grouping based on your data structure:

**1. Direct grouping** (when grouping info is already in your sequence data):
```python
plot_sequence_index(sequence_data, 
                    group_by_column="Cluster", 
                    group_labels=cluster_labels)
```

**2. External grouping** (when grouping info is in a separate dataframe):
```python
plot_sequence_index(sequence_data, 
                    group_dataframe=membership_table, 
                    group_column_name="Cluster", 
                    group_labels=cluster_labels)
```

If you would like to customize the visualization, please see the following table on additional parameters. 

## Entry Parameters

| Parameter       | Required | Type         | Description                                                                                                                                                                                                                                                                                                                          |
| --------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `seqdata`       | ✓        | SequenceData | Your sequence dataset created with `SequenceData`. Rows are entities, columns are time points, values are integer-coded states (1..K).                                                                                                                                                                                               |
| `group_by_column` | ✗        | str          | **Direct grouping**: Column name from `seqdata.data` to group by. Use this when grouping information is already in your data. Example: "Cluster", "sex", "education".                                                                                                                                                                |
| `group_dataframe` | ✗        | DataFrame    | **External grouping**: Separate dataframe containing grouping information. Use this when grouping info is in a separate table (e.g., clustering results). Must contain ID column and grouping column.                                                                                                                                      |
| `group_column_name` | ✗        | str          | Name of the grouping column in `group_dataframe`. Required when using `group_dataframe`.                                                                                                                                                                                                                                              |
| `group_labels`  | ✗        | dict         | Custom labels for group values. Example: `{1: "Late Family Formation", 2: "Early Partnership"}`. Maps original values to display labels.                                                                                                                                                                                             |
| `sort_by`       | ✗        | str          | How to sort sequences within each subplot. Options: `"unsorted"` or `"none"` (keep original order), `"lexicographic"` (sort sequences lexicographically), `"mds"` (sort by first MDS dimension), `"distance_to_most_frequent"` (sort by distance to most frequent sequence). Default = `"lexicographic"`.                            |
| `sort_by_weight` | ✗        | bool         | If `True`, sort sequences by weight (descending), overrides `sort_by`. Default = `False`.                                                                                                                                                                                                                                             |
| `weights`       | ✗        | array/str    | Weights for sequences. If `"auto"`, uses `seqdata.weights` if available. Default = `"auto"`.                                                                                                                                                                                                                                         |
| `figsize`       | ✗        | tuple        | Size of each subplot (width, height). Only used when `plot_style="custom"`. Default = `(10, 6)`.                                                                                                                                                                                                                                     |
| `plot_style`    | ✗        | str          | Plot aspect style: `"standard"` (balanced view), `"compact"` (more square), `"wide"` (emphasizes time), `"narrow"` (moderately vertical), `"custom"` (use figsize). Default = `"standard"`.                                                                                                                                          |
| `title`         | ✗        | str          | Title for the whole figure.                                                                                                                                                                                                                                                                                                          |
| `xlabel`        | ✗        | str          | Label for the x-axis. Default = `"Time"`.                                                                                                                                                                                                                                                                                            |
| `ylabel`        | ✗        | str          | Label for the y-axis. Default = `"Sequences"`.                                                                                                                                                                                                                                                                                       |
| `save_as`       | ✗        | str          | File path to save the final combined figure (e.g., `"index.png"`). The image is saved in your current working directory unless you provide a full path.                                                                                                                                                                              |
| `dpi`           | ✗        | int          | Resolution when saving the image. Default = `200`.                                                                                                                                                                                                                                                                                   |
| `layout`        | ✗        | str          | How to arrange multiple group subplots: `"column"` (stacked vertically) or `"grid"` (rows × columns). Default = `"column"`.                                                                                                                                                                                                         |
| `nrows`/`ncols` | ✗        | int          | Manually set the grid size when `layout="grid"`. If not set, it is auto-determined.                                                                                                                                                                                                                                                  |
| `group_order`   | ✗        | list         | Custom order of groups. If provided, overrides automatic sorting.                                                                                                                                                                                                                                                                    |
| `sort_groups`   | ✗        | str          | Sorting for group panels: `"auto"` (numeric-smart), `"numeric"`, `"alpha"` (alphabetical), or `"none"` (original order). Default = `"auto"`.                                                                                                                                                                                        |
| `fontsize`      | ✗        | int          | Base font size for text elements (titles use fontsize+2, ticks use fontsize-2). Default = `12`.                                                                                                                                                                                                                                      |
| `show_group_titles` | ✗    | bool         | Whether to show group titles. Default = `True`.                                                                                                                                                                                                                                                                                     |
| `include_legend` | ✗       | bool         | Whether to include legend in the plot. Default = `True`.                                                                                                                                                                                                                                                                             |
| `sequence_selection` | ✗   | str/list     | Method for selecting sequences: `"all"` (show all), `"first_n"` (show first n), `"last_n"` (show last n), or list of specific sequence IDs. Default = `"all"`.                                                                                                                                                                      |
| `n_sequences`   | ✗        | int          | Number of sequences to show when using `"first_n"` or `"last_n"`. Default = `10`.                                                                                                                                                                                                                                                    |
| `show_sequence_ids` | ✗    | bool         | If `True`, show actual sequence IDs on y-axis instead of sequence numbers. Most useful when `sequence_selection` is a list of IDs. Default = `False`.                                                                                                                                                                                |
| `sort_by_ids`   | ✗        | list/array   | Custom ID order for sorting sequences. When provided, overrides `sort_by`. Useful for aligning multiple plots so the same IDs appear in the same row (e.g. multidomain analysis). Example: `sort_by_ids=[1, 3, 2, 5, 4]`.                                                                                                                                        |
| `return_sorted_ids` | ✗   | bool         | If `True`, returns the sorted ID order after plotting: a dict (group name → sorted ID array) for grouped plots, or a single array for non-grouped plots. Use with multidomain analysis to pass IDs to the next plot via `sort_by_ids`. Default = `False`.                                                                          |
| `show_title`    | ✗        | bool         | If `False`, suppresses the main title even when `title` is set. Default = `True`.                                                                                                                                                                                                                                                    |
| `proportional_scaling` | ✗  | bool         | If `True`, scales subplot heights by the number of sequences in each group. Only applies to grouped plots with `layout="column"`. Default = `False`.                                                                                                                                                                               |
| `hide_y_axis`   | ✗        | bool         | If `True`, hides y-axis ticks, labels, and spine for all subplots. Useful with `proportional_scaling` for cleaner plots. Default = `False`.                                                                                                                                                                                          |
| `sequence_gap`  | ✗        | int          | Number of blank rows between each sequence band (0 = no gap, 1 = small gap, 2 = larger). Default = `0`.                                                                                                                                                                                                                                |
| `sequence_rows` | ✗        | int          | Number of rows each sequence occupies. Use >1 for thicker bars (e.g. 3 = 3× thicker). With `sequence_gap`, gap height is 1/`sequence_rows` of bar height. Default = `1`.                                                                                                                                                               |

## What It Does

* Converts sequence values into a color matrix where rows are sequences and columns are time points.
* Sorts sequences to make visual patterns easier to see. Uses `sort_by` (or `sort_by_ids` if provided) to determine order, with `"lexicographic"` as the default.
* If group info is provided (via `group_by_column` or `group_dataframe`), creates one subplot per group and arranges them by `layout`. With `proportional_scaling=True` and `layout="column"`, subplot heights scale by group size.
* Supports sequence selection via `sequence_selection` and optional spacing via `sequence_gap` and `sequence_rows` for thicker or more spaced bands.
* Can return the sorted ID order with `return_sorted_ids` for use in aligned multidomain or follow-up plots.
* Adds a legend using `seqdata`'s color map so colors match your state labels.
* Displays the figure in your current environment and can also save it to a file if `save_as` is set.

## Notes and Tips

* State values must be integer-coded starting at 1. The colormap is aligned to `1..K` where `K` is the number of states.
* Missing values are internally handled for sorting; visually they still map via the colormap you set in `SequenceData`.
* For `"mds"` and `"distance_to_most_frequent"` sorting, distance matrices are computed automatically using Optimal Matching (OM) with constant substitution costs.
* Very large N (many rows) can make figures heavy. Use `sequence_selection` to plot subsets, or grouping to split into panels; `proportional_scaling` helps when groups have very different sizes.
* Use `sort_by_ids` and `return_sorted_ids` to align rows across multiple plots (e.g. first plot returns sorted IDs, second plot uses them in `sort_by_ids`).
* The `plot_style` parameter offers predefined aspect ratios: `"standard"` for balanced views, `"compact"` for square plots, `"wide"` for emphasizing time progression, and `"narrow"` for vertical layouts.
* When using `plot_style="custom"`, you must provide a `figsize` parameter that differs from the default `(10, 6)`.
* `sequence_gap` and `sequence_rows` add spacing or thicker bars between sequences; combine with `hide_y_axis` and `proportional_scaling` for cleaner multi-group figures.

## Key Features

* Clear "barcode-like" visualization of entire sequences over time.
* Multiple groups in one figure for easy comparison; optional proportional subplot heights by group size.
* Several built-in sorting rules (lexicographic, MDS, distance-based) plus custom ID order via `sort_by_ids` for aligned multidomain plots.
* Flexible grouping with direct and external grouping options.
* Sequence selection and optional row spacing/thickness (`sequence_gap`, `sequence_rows`).
* Multiple plot styles for different visualization needs.
* Optional return of sorted IDs for reuse in subsequent plots.
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

### 2. Compare groups using direct grouping

```python
plot_sequence_index(
    seqdata,
    group_by_column="Gender",
    layout="grid",
    title="Sequence Index Plot by Gender"
)
```

This creates one subplot per gender and arranges them in a grid using direct grouping from your sequence data.

### 3. Compare groups using external grouping

```python
plot_sequence_index(
    seqdata,
    group_dataframe=membership_table,
    group_column_name="Cluster",
    group_labels={1: "Late Family Formation", 2: "Early Partnership"},
    layout="column",
    title="Sequence Index Plot by Cluster"
)
```

This uses external grouping with custom group labels and arranges subplots in a column layout.

### 4. Sort by MDS and select first 20 sequences

```python
plot_sequence_index(
    seqdata,
    sort_by="mds",
    sequence_selection="first_n",
    n_sequences=20,
    plot_style="compact",
    title="First 20 Sequences Sorted by MDS"
)
```

This sorts sequences by the first MDS dimension and shows only the first 20 sequences in a compact plot style.

### 5. Show specific sequences by ID

```python
plot_sequence_index(
    seqdata,
    sequence_selection=["ID001", "ID005", "ID012"],
    show_sequence_ids=True,
    plot_style="wide",
    title="Selected Sequences"
)
```

This shows only specific sequences by their IDs and displays the actual IDs on the y-axis.

### 6. Save the figure with custom styling

```python
plot_sequence_index(
    seqdata,
    group_by_column="Country",
    plot_style="custom",
    figsize=(15, 8),
    save_as="index_by_country.png",
    dpi=300,
    fontsize=14
)
```

This saves a high-resolution figure with custom dimensions and larger font size to `index_by_country.png` in your working directory.

### 7. Proportional subplot heights and hide y-axis

```python
plot_sequence_index(
    seqdata,
    group_by_column="Cluster",
    group_labels=cluster_labels,
    proportional_scaling=True,
    hide_y_axis=True,
    layout="column",
    title="Index Plot by Cluster (proportional heights)"
)
```

This scales each group subplot height by its number of sequences and hides the y-axis for a cleaner look when groups have very different sizes.

### 8. Align multiple plots using sorted IDs (e.g. multidomain)

```python
# First plot: get sorted ID order per group (dict: group name → array of IDs)
sorted_ids_by_group = plot_sequence_index(
    seqdata_domain1,
    group_by_column="Cluster",
    group_labels=cluster_labels,
    return_sorted_ids=True
)

# Build one flat list in the same row order as the first plot (group1, then group2, ...)
ids_in_plot_order = [sid for g in sorted_ids_by_group for sid in sorted_ids_by_group[g]]

# Second plot: same row order across domains
plot_sequence_index(
    seqdata_domain2,
    group_by_column="Cluster",
    group_labels=cluster_labels,
    sort_by_ids=ids_in_plot_order,
    title="Domain 2 (aligned with Domain 1)"
)
```

This uses the sorted IDs from the first plot so the same entities appear in the same row in the second plot.

### 9. Thicker bands with spacing between sequences

```python
plot_sequence_index(
    seqdata,
    sequence_gap=1,
    sequence_rows=2,
    plot_style="narrow",
    title="Index Plot with Spaced Bands"
)
```

This draws each sequence as a thicker band (2 rows) with a small gap between bands for readability.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

Edited by: Yuqi Liang
