# `plot_state_distribution()`

`plot_state_distribution()` creates plots that show **how the share of people in each state changes over time**.

For example, at a certain year, you might see that 10% of people are in “Education”, 30% are in “Employment”, and 60% are in “Unemployment”. The function tracks these percentages across time and draws them as a figure.

You can also compare these changes across different groups (e.g., Male vs Female, Country A vs Country B).

This function is useful when you want to visualize **who is in which state, at what time, and how the share of states changes**.

If you run it in a Jupyter Notebook, the figure appears under the cell. If you run it as a Python script, a window will pop up. You can also save the figure to a file with `save_as`.

## Function Usage

```python
plot_state_distribution(
    seqdata,
    id_group_df=None,       # optional grouping info
    categories=None,        # which column to use for grouping
    figsize=(12, 7),        # size of each plot
    title=None,             # overall plot title
    xlabel="Time",
    ylabel="State Distribution (%)",
    save_as=None,           # save output (e.g., "plot.png")
    dpi=200,
    layout="column",        # "column" or "grid"
    stacked=True,           # stacked area vs line plot
    group_order=None,       # custom group order
    sort_groups="auto",     # "auto","numeric","alpha","none"
    show=True               # display plot
)
```

## Entry Parameters

| Parameter     | Required | Type         | Description                                                                                     |
| ------------- | -------- | ------------ | ----------------------------------------------------------------------------------------------- |
| `seqdata`     | ✓        | SequenceData | Your sequence dataset (created using `SequenceData`).                                           |
| `id_group_df` | ✗        | DataFrame    | A DataFrame linking IDs to groups (e.g., gender, country). If `None`, one overall plot is made. |
| `categories`  | ✗        | str          | Column name in `id_group_df` specifying the grouping variable.                                  |
| `figsize`     | ✗        | tuple        | Size of each subplot (width, height). Default = `(12, 7)`.                                      |
| `title`       | ✗        | str          | Title for the entire figure.                                                                    |
| `xlabel`      | ✗        | str          | Label for the x-axis.                                                                           |
| `ylabel`      | ✗        | str          | Label for the y-axis.                                                                           |
| `save_as`     | ✗        | str          | File path to save the figure (e.g., `"output.png"`).                                            |
| `dpi`         | ✗        | int          | Resolution of the saved figure. Default = `200`.                                                |
| `layout`      | ✗        | str          | How to arrange multiple plots: `"column"` (stacked vertically) or `"grid"`.                     |
| `stacked`     | ✗        | bool         | If `True`, draws stacked area plots. If `False`, draws line plots.                      |
| `group_order` | ✗        | list         | Manually specify the order of groups (overrides automatic sorting).                             |
| `sort_groups` | ✗        | str          | Sorting method: `"auto"` (numeric-smart), `"numeric"`, `"alpha"`, `"none"`.                     |
| `show`        | ✗        | bool         | Whether to show the figure immediately after it is created. If `True`, the plot will pop up in your current environment (for example, inside a Jupyter Notebook output cell, or in a separate window if you are running a Python script). If `False`, the plot will not be shown on the screen, but you can still save it using save_as. |

## What It Does

* Calculates percentages of each state at every time point.
* Creates plots that show how these percentages change over time.
* If groups are provided, makes one subplot per group.
* Supports two visualization styles:

  * Stacked area plot (default): states are stacked to show 100%.
  * Line plot: each state shown as a line.
* Automatically sorts groups in a smart way (e.g., `1st year`, `2nd year`, …).
* Ensures each time point sums to 100% to avoid gaps.
* Can save and/or display the final figure.

## Key Features

* **Single or multiple groups**: works for overall data or subgroup comparisons.
* **Flexible layouts**: show plots in columns or a grid.
* **Clean aesthetics**: built-in colors, grid lines, axis labels.
* **Automatic group sorting**: numeric-first, alphabetical, or custom order.
* **Exportable**: save high-resolution figures for publications or reports.

## Examples

### 1. Single overall distribution (no groups)

```python
plot_state_distribution(seqdata,
                        title="Overall State Distribution",
                        stacked=True)
```

This creates one stacked area plot showing how states (e.g., EDU, FT, UNEMP) evolve over time.

### 2. Compare distributions across groups

```python
plot_state_distribution(seqdata,
                        id_group_df=id_group_df,
                        categories="Gender",
                        layout="grid",
                        stacked=False,
                        title="State Distribution by Gender")
```

This will generate **one subplot for each gender**, using line plots instead of stacked areas.

### 3. Save the figure

```python
plot_state_distribution(seqdata,
                        id_group_df=id_group_df,
                        categories="Country",
                        save_as="country_comparison.png")
```

This will save the final figure as `country_comparison.png` in your working directory.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

Edited by: Yuqi Liang