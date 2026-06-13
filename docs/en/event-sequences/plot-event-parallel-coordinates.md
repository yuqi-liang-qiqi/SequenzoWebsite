# `plot_event_parallel_coordinates()`

`plot_event_parallel_coordinates()` draws event sequences as parallel-coordinate-style trajectories.

This function is Sequenzo's closest counterpart to TraMineR `seqpcplot`-style visualization.

## Function Usage

```python
plot_event_parallel_coordinates(
    event_sequences,
    group_labels=None,
    color_palette=None,
    event_labels_order=None,
    order_align="first",
    title="auto",
    x_label=None,
    y_label=None,
    rows=1,
    cols=None,
    figsize=(12, 8),
    linewidth=3.0,
    alpha=0.45,
    fontsize=11,
    save_as=None,
    dpi=200,
    show=False
)
```

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `event_sequences` | ✓ | EventSequenceData / EventSequenceList | The full event-sequence dataset to plot. |
| `group_labels` | ✗ | array-like | Optional grouping variable for faceted panels. |
| `event_labels_order` | ✗ | Sequence[str] | Optional custom display order for event labels. |
| `order_align` | ✗ | str | Horizontal axis mode: event order position (`"first"`, `"last"`) or timestamps (`"time"`). |
| `x_label`, `y_label` | ✗ | str | Axis label overrides. |
| `save_as` | ✗ | str | Save path; `.png` is auto-appended if missing. |
| `dpi` | ✗ | int | Save resolution (default `200`). |
| `show` | ✗ | bool | If `True`, calls `plt.show()` inside the function. |

## TraMineR Parameter Mapping

- `event_sequences` -> TraMineR event-sequence object / `seqelist`
- `group_labels` -> TraMineR `group`
- `color_palette` -> TraMineR `cpal`
- `event_labels_order` -> TraMineR `alphabet`
- `title` -> TraMineR `main`
- `x_label` / `y_label` -> TraMineR `xlab` / `ylab`

## What It Does

- Displays event order position on the x-axis and event categories on the y-axis.
- Aggregates identical trajectories and renders weighted visual emphasis.
- Supports grouped panels for side-by-side comparison.

## Example (Step by Step)

```python
from sequenzo.event_sequences import plot_event_parallel_coordinates

# Step 1: Plot all sequences
plot_event_parallel_coordinates(
    event_sequences=eseq,
    title="Event sequences (all cases)",
    x_label="Position",
    y_label="Event",
    save_as="outputs/event_parallel_all",
    dpi=300,
    show=True
)

# Step 2: Plot by group
plot_event_parallel_coordinates(
    event_sequences=eseq,
    group_labels=df["sex"],
    title="Event sequences by sex",
    x_label="Position",
    y_label="Event",
    save_as="outputs/event_parallel_by_sex",
    dpi=300,
    show=True
)
```

## R Counterpart

- **Closest R function:** `seqpcplot` / `plot.seqelist(type="pc")`
- **Mapping note:** Visual intent is similar, but panel layout and styling are not one-to-one.

## See Also

- [Event Sequences Introduction](/en/event-sequences/introduction) explains the workflow and data structures.
- [Quickstart Example](/en/event-sequences/example) shows a complete event-mining run.
- [Helper Functions](/en/event-sequences/event-sequence-helpers) lists supporting utilities.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## Reference

Ritschard, G., Bürgin, R., & Studer, M. (2013). Exploratory Mining of Life Event Histories. In J. J. McArdle & G. Ritschard (Eds.), Contemporary Issues in Exploratory Data Mining in the Behavioral Sciences (pp. 221–253). Routledge.
