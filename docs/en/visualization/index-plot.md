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

## What It Does

* Converts sequence values into a color matrix where rows are sequences and columns are time points.
* Sorts sequences to make visual patterns easier to see. Uses `sort_by` parameter to determine sorting method, with `"lexicographic"` as the default.
* If group info is provided (via `group_by_column` or `group_dataframe`), creates one subplot per group and arranges them by `layout`.
* Supports sequence selection to show subsets of data using `sequence_selection` parameter.
* Adds a legend using `seqdata`'s color map so colors match your state labels.
* Displays the figure in your current environment and can also save it to a file if `save_as` is set.

## Notes and Tips

* State values must be integer-coded starting at 1. The colormap is aligned to `1..K` where `K` is the number of states.
* Missing values are internally handled for sorting; visually they still map via the colormap you set in `SequenceData`.
* For `"mds"` and `"distance_to_most_frequent"` sorting, distance matrices are computed automatically using Optimal Matching (OM) with constant substitution costs.
* Very large N (many rows) can make figures heavy. Use `sequence_selection` parameter to plot subsets or use grouping to split the plot into panels.
* The `plot_style` parameter offers predefined aspect ratios: `"standard"` for balanced views, `"compact"` for square plots, `"wide"` for emphasizing time progression, and `"narrow"` for vertical layouts.
* When using `plot_style="custom"`, you must provide a `figsize` parameter that differs from the default `(10, 6)`.

## Key Features

* Clear "barcode-like" visualization of entire sequences over time.
* Multiple groups in one figure for easy comparison.
* Several built-in sorting rules to reveal structure (lexicographic, MDS, distance-based).
* Flexible grouping with direct and external grouping options.
* Sequence selection capabilities for focusing on subsets of data.
* Multiple plot styles for different visualization needs.
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

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

Edited by: Yuqi Liang
