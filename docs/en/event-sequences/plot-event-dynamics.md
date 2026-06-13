# `plot_event_dynamics()`

`plot_event_dynamics()` visualizes event timing patterns as survival-style or binned event-rate curves.

It is Sequenzo's closest counterpart to TraMineRextras `seqedplot`.

## Function Usage

```python
plot_event_dynamics(
    event_sequences,
    group_labels=None,
    num_bins=20,
    time_range=None,
    title="auto",
    curve_type="survival",
    excluded_events=None,
    show_legend="auto",
    color_palette=None,
    figsize=(12, 8),
    linewidth=2.0,
    fontsize=11,
    x_label=None,
    y_label=None,
    save_as=None,
    dpi=200,
    show=False
)
```

## TraMineR Parameter Mapping

- `event_sequences` -> TraMineR `seqe`
- `group_labels` -> TraMineR `group`
- `num_bins` -> TraMineR `breaks`
- `time_range` -> TraMineR `ages`
- `curve_type` -> TraMineR `type`
- `excluded_events` -> TraMineR `ignore`
- `show_legend` -> TraMineR `with.legend`
- `color_palette` -> TraMineR `cpal`
- `x_label` / `y_label` -> TraMineR `xlab` / `ylab`

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `event_sequences` | ✓ | EventSequenceData / EventSequenceList | The full event-sequence dataset to visualize. |
| `curve_type` | ✗ | str | `"survival"` or `"hazard"`. |
| `group_labels` | ✗ | array-like | Optional grouping variable for panel comparison. |
| `x_label`, `y_label` | ✗ | str | Axis label overrides. |
| `save_as` | ✗ | str | Save path; `.png` is auto-appended if missing. |
| `dpi` | ✗ | int | Save resolution (default `200`). |
| `show` | ✗ | bool | If `True`, calls `plt.show()` inside the function. |

## What It Does

- **Survival mode:** plots the probability that the first occurrence of an event happens after time `t`.
- **Hazard-style mode:** summarizes event occurrence by time bins, for example as a binned event rate or mean event count per bin.
- Supports grouped panels and event-level legends.

The hazard-style view is descriptive. It should not be interpreted as a full event-history hazard model.

## Example (Step by Step)

```python
from sequenzo.event_sequences import plot_event_dynamics

# Step 1: Survival-style curves
plot_event_dynamics(
    eseq,
    group_labels=df["sex"],
    curve_type="survival",
    x_label="Time",
    y_label="Survival probability",
    save_as="outputs/event_dynamics_survival",
    dpi=300,
    show=True
)

# Step 2: Hazard-style curves
plot_event_dynamics(
    eseq,
    group_labels=df["sex"],
    curve_type="hazard",
    num_bins=8,
    x_label="Time",
    y_label="Mean number of events",
    save_as="outputs/event_dynamics_hazard",
    dpi=300,
    show=True
)
```

## R Counterpart

- **Closest R function:** TraMineRextras `seqedplot`
- **Mapping note:** Conceptually follows the same idea of showing event timing and dynamics, but it is not a one-to-one replacement for every `seqedplot` workflow.

## See Also

- [Event Sequences Introduction](/en/event-sequences/introduction) explains the workflow and data structures.
- [Quickstart Example](/en/event-sequences/example) shows a complete event-mining run.
- [Helper Functions](/en/event-sequences/event-sequence-helpers) lists supporting utilities.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## Reference

Ritschard, G., Bürgin, R., & Studer, M. (2013). Exploratory Mining of Life Event Histories. In J. J. McArdle & G. Ritschard (Eds.), Contemporary Issues in Exploratory Data Mining in the Behavioral Sciences (pp. 221–253). Routledge.
