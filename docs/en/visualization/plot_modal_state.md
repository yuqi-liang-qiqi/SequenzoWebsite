# `plot_modal_state()`

`plot_modal_state()` creates a modal state plot, which shows at each time point **the most common state** (modal state) among all sequences, along with the percentage of sequences in that state.

For example, if in year 2000 most countries are in `"Middle"` emissions level, and 60% of them fall into that category, the bar for 2000 will be `"Middle"` with height = 0.6. You can also split the dataset into groups (e.g., by gender, region, country type) and create one subplot per group.

## Function Usage

```python
plot_modal_state(
    seqdata,
    group_by=None,          # optional grouping variable
    group_labels=None,      # optional custom group names
    xlabel="Time",
    ylabel="Rel. Freq.",    # relative frequency, from 0 to 1
    fig_width=12,
    fig_height=None,        # auto-calculated if None
    show_counts=True,       # show group sample size in titles
    save_as=None,           # optional file path to save
    dpi=200                 # resolution of saved figure
)
```

## Entry Parameters

| Parameter      | Required | Type                 | Description                                                                                                                                    |
| -------------- | -------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `seqdata`      | ✓        | SequenceData         | Your sequence dataset created with `SequenceData`.                                                                                             |
| `group_by`     | ✗        | str / Series / array | Variable used for grouping. Can be a column name from the dataset, or an external array/Series. If `None`, all sequences are plotted together. |
| `group_labels` | ✗        | list                 | Custom names for groups. If not provided, unique values of `group_by` are used.                                                                |
| `xlabel`       | ✗        | str                  | Label for the x-axis. Default = `"Time"`.                                                                                                      |
| `ylabel`       | ✗        | str                  | Label for the y-axis. Default = `"Rel. Freq."` (relative frequency from 0 to 1).                                                               |
| `fig_width`    | ✗        | int                  | Width of the figure in inches. Default = `12`.                                                                                                 |
| `fig_height`   | ✗        | int                  | Height of the figure. If `None`, automatically set based on the number of groups.                                                              |
| `show_counts`  | ✗        | bool                 | Whether to display the number of sequences in each group’s subplot title.                                                                      |
| `save_as`      | ✗        | str                  | File path to save the figure (e.g., `"modal_plot.png"`). If no extension is provided, `.png` is added automatically.                           |
| `dpi`          | ✗        | int                  | Resolution of the saved figure. Default = `200`. Higher values (e.g., `300`) produce publication-quality images.                               |

## What It Does

* For each time point, finds the most frequent state in the sequences.
* Calculates the relative frequency (percentage) of that modal state.
* Draws colored bars (using your state color map) to show the modal state and its share.
* If grouping is provided, creates one subplot per group.
* Adds sample size `(n=…)` to group titles if `show_counts=True`.
* Can display directly in your environment or save to a file.

## Key Features

* **Simple summary**: highlights the dominant state at each time point.
* **Group comparison**: compare modal trends across groups in multiple panels.
* **Automatic sizing**: figure height scales with number of groups.
* **Publication-ready**: consistent colors and legend, exportable with `save_as` and `dpi`.

## Examples

### 1. Overall modal state plot (no groups)

```python
plot_modal_state(
    seqdata,
    xlabel="Year",
    ylabel="Relative Frequency"
)
```

This produces a single plot showing the modal state at each time point.

### 2. Grouped by region

```python
plot_modal_state(
    seqdata,
    group_by="Region",
    xlabel="Year",
    ylabel="Relative Frequency",
    show_counts=True
)
```

This produces one subplot for each region, with `(n=…)` sample sizes in the titles.

### 3. Save the figure

```python
plot_modal_state(
    seqdata,
    group_by="Continent",
    save_as="modal_state_by_continent.png",
    dpi=300
)
```

This saves a high-resolution figure in your working directory.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

Edited by: Yuqi Liang
