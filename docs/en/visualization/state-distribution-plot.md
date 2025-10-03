# `plot_state_distribution()`

`plot_state_distribution()` creates plots that show **how the share of entities in each state changes over time**. In a state distribution plot, each time point shows the percentage of individuals/firms/regions/countries in each state. 

This lets you see trends such as which states become more or less common over time, and how state distributions differ across groups (e.g., Male vs Female, Country A vs Country B). For example, at a certain year, you might see that 10% of people are in “Education”, 30% are in “Employment”, and 60% are in “Unemployment”. The function tracks these percentages across time and draws them as a figure.

If you run it in a Jupyter Notebook, the figure appears under the cell. If you run it as a Python script, a window will pop up. You can also save the figure to a file with `save_as`.

## Function Usage

A minimal example with only the required parameters (sufficient for most use cases):

```python
plot_state_distribution(sequence_data)
```

The `plot_state_distribution` function provides two approaches for grouping based on your data structure:

**1. Direct grouping** (when grouping info is already in your sequence data):
```python
plot_state_distribution(sequence_data, 
                        group_by_column="Cluster", 
                        group_labels=cluster_labels)
```

**2. External grouping** (when grouping info is in a separate dataframe):
```python
plot_state_distribution(sequence_data, 
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
| `weights`       | ✗        | array/str    | Weights for sequences. If `"auto"`, uses `seqdata.weights` if available. Default = `"auto"`.                                                                                                                                                                                                                                         |
| `figsize`       | ✗        | tuple        | Size of each subplot (width, height). Only used when `plot_style="custom"`. Default = `(12, 7)`.                                                                                                                                                                                                                                     |
| `plot_style`    | ✗        | str          | Plot aspect style: `"standard"` (balanced view), `"compact"` (more square), `"wide"` (emphasizes time), `"narrow"` (moderately vertical), `"custom"` (use figsize). Default = `"standard"`.                                                                                                                                          |
| `title`         | ✗        | str          | Title for the whole figure.                                                                                                                                                                                                                                                                                                          |
| `xlabel`        | ✗        | str          | Label for the x-axis. Default = `"Time"`.                                                                                                                                                                                                                                                                                            |
| `ylabel`        | ✗        | str          | Label for the y-axis. Default = `"State Distribution (%)"`.                                                                                                                                                                                                                                                                           |
| `save_as`       | ✗        | str          | File path to save the final combined figure (e.g., `"distribution.png"`). The image is saved in your current working directory unless you provide a full path.                                                                                                                                                                      |
| `dpi`           | ✗        | int          | Resolution when saving the image. Default = `200`.                                                                                                                                                                                                                                                                                   |
| `layout`        | ✗        | str          | How to arrange multiple group subplots: `"column"` (stacked vertically) or `"grid"` (rows × columns). Default = `"column"`.                                                                                                                                                                                                         |
| `nrows`/`ncols` | ✗        | int          | Manually set the grid size when `layout="grid"`. If not set, it is auto-determined.                                                                                                                                                                                                                                                  |
| `stacked`       | ✗        | bool         | If `True`, draws stacked area plots. If `False`, draws line plots. Default = `True`.                                                                                                                                                                                                                                                 |
| `show`          | ✗        | bool         | Whether to show the figure immediately. Default = `True`.                                                                                                                                                                                                                                                                             |
| `include_legend` | ✗       | bool         | Whether to include legend in the plot. Default = `True`.                                                                                                                                                                                                                                                                             |
| `group_order`   | ✗        | list         | Custom order of groups. If provided, overrides automatic sorting.                                                                                                                                                                                                                                                                    |
| `fontsize`      | ✗        | int          | Base font size for text elements (titles use fontsize+2, ticks use fontsize-2). Default = `12`.                                                                                                                                                                                                                                      |
| `sort_groups`   | ✗        | str          | Sorting for group panels: `"auto"` (numeric-smart), `"numeric"`, `"alpha"` (alphabetical), or `"none"` (original order). Default = `"auto"`.                                                                                                                                                                                        |
| `show_group_titles` | ✗    | bool         | Whether to show group titles. Default = `True`.                                                                                                                                                                                                                                                                                     |

## What It Does

* Calculates weighted percentages of each state at every time point.
* Creates plots that show how these percentages change over time.
* If group info is provided (via `group_by_column` or `group_dataframe`), creates one subplot per group and arranges them by `layout`.
* Supports two visualization styles:
  * Stacked area plot (default): states are stacked to show 100%.
  * Line plot: each state shown as a line.
* Automatically sorts groups in a smart way (e.g., `1st year`, `2nd year`, …).
* Ensures each time point sums to exactly 100% to avoid gaps.
* Displays the figure in your current environment and can also save it to a file if `save_as` is set.

## Key Features

* **Clear percentage visualization**: shows how state prevalence changes over time.
* **Multiple groups in one figure**: for easy comparison across categories.
* **Flexible grouping**: with direct and external grouping options.
* **Two plot styles**: stacked area plots or line plots.
* **Multiple plot styles**: for different visualization needs.
* **Publication-ready export**: via `save_as` and `dpi`.

## Examples

### 1. Overall state distribution (no groups)

```python
plot_state_distribution(
    seqdata,
    title="Overall State Distribution",
    stacked=True
)
```

This creates one stacked area plot showing how states evolve over time.

### 2. Compare distributions using direct grouping

```python
plot_state_distribution(
    seqdata,
    group_by_column="Gender",
    layout="grid",
    stacked=False,
    title="State Distribution by Gender"
)
```

This creates one subplot per gender using line plots instead of stacked areas with the direct grouping API.

### 3. Compare distributions using external grouping

```python
plot_state_distribution(
    seqdata,
    group_dataframe=membership_table,
    group_column_name="Cluster",
    group_labels={1: "Late Family Formation", 2: "Early Partnership"},
    layout="column",
    title="State Distribution by Cluster"
)
```

This uses external grouping with custom group labels and arranges subplots in a column layout.

### 4. Custom plot style and save

```python
plot_state_distribution(
    seqdata,
    group_by_column="Country",
    plot_style="custom",
    figsize=(16, 8),
    stacked=True,
    save_as="country_comparison.png",
    dpi=300,
    fontsize=14
)
```

This saves a high-resolution figure with custom dimensions and larger font size to `country_comparison.png` in your working directory.

## Notes and Tips

* State values must be integer-coded starting at 1. The colormap is aligned to `1..K` where `K` is the number of states.
* Missing values are internally handled for percentage calculations; they are excluded from the weighted distributions.
* The `plot_style` parameter offers predefined aspect ratios: `"standard"` for balanced views, `"compact"` for square plots, `"wide"` for emphasizing time progression, and `"narrow"` for vertical layouts.
* When using `plot_style="custom"`, you must provide a `figsize` parameter that differs from the default `(12, 7)`.
* Weighted percentages are calculated at each time point, ensuring that each time point sums to exactly 100%.
* Stacked area plots are ideal for showing overall composition, while line plots are better for comparing individual state trends across groups.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

Edited by: Yuqi Liang