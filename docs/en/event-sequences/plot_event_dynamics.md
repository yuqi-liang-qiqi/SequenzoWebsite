# `plot_event_dynamics()`

`plot_event_dynamics()` visualizes event dynamics as survival-style or hazard-style curves.

It is the recommended counterpart to TraMineRextras `seqedplot`.

## Function Usage

```python
plot_event_dynamics(
    event_sequences
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

- **Survival mode:** plots probability that first occurrence time is after `t`.
- **Hazard mode:** plots mean event count per time bin.
- Supports grouped panels and event-level legends.

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

- **Closest R function:** `seqedplot`

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang
