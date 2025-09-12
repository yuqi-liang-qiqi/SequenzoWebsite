<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-12 13:58:00
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-12 14:00:01
 * @FilePath: /SequenzoWebsite/docs/en/visualization/plot_mean_time.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# `plot_mean_time()`

`plot_mean_time()` draws a horizontal bar chart showing, for each state, the **average amount of time** spent in that state across all sequences. Optionally, it adds **standard error** bars so you can judge uncertainty.

Example: if your sequences cover 10 years and the average person spends 2.8 years in “Education”, the bar for “Education” is 2.8 (on the x-axis). Units follow your data (years, months, waves, etc.).

## Function Usage

```python
plot_mean_time(
    seqdata,
    show_error_bar=True,                 # add SE whiskers
    title=None,                          # optional figure title
    x_label="Mean Time (Years)",         # change to "Months" / "Waves" as needed
    y_label="State",
    save_as=None,                        # e.g., "mean_time.png"
    dpi=200
)
```

## Entry Parameters

| Parameter        | Required | Type         | Description                                                                                 |
| ---------------- | -------- | ------------ | ------------------------------------------------------------------------------------------- |
| `seqdata`        | ✓        | SequenceData | Your sequence dataset created with `SequenceData`.                                          |
| `show_error_bar` | ✗        | bool         | If `True`, shows standard error bars for each state’s mean time. Default = `True`.          |
| `title`          | ✗        | str          | Figure title. Default = `None` (no title).                                                  |
| `x_label`        | ✗        | str          | X-axis label. Default = `"Mean Time (Years)"`. Change this to match your time unit.         |
| `y_label`        | ✗        | str          | Y-axis label. Default = `"State"`.                                                          |
| `save_as`        | ✗        | str          | File path to save the figure (e.g., `"mean_time.png"`). If omitted, the plot is just shown. |
| `dpi`            | ✗        | int          | Output resolution when saving. Default = `200`. Use `300+` for publication quality.         |

## What It Does

* Computes, for each state, the **mean total time** spent in that state across all sequences.
* Optionally computes and draws **standard error** whiskers for each bar.
* Sorts states by mean time (small → large) to make the chart easy to read.
* Uses your `SequenceData` color map so state colors match your legend elsewhere.
* Displays the plot in your environment (Notebook cell output or a window in scripts) and can save it via `save_as`.

## Key Features

* Intuitive “how long in each state?” summary at a glance.
* Error bars for uncertainty (toggle with `show_error_bar`).
* Clean defaults (light grid, readable labels) with minimal configuration.
* Publication-ready export with `save_as` and `dpi`.

## Examples

### 1. Basic mean time plot

```python
plot_mean_time(seqdata)
```

Shows the average time in each state (with SE bars) and sorts states by mean time.

### 2. Customize labels and hide error bars

```python
plot_mean_time(
    seqdata,
    show_error_bar=False,
    x_label="Mean Time (Months)",
    y_label="Life-course State",
    title="Average Time Spent by State (Months)"
)
```

### 3. Save a high-resolution figure

```python
plot_mean_time(
    seqdata,
    save_as="mean_time_by_state.png",
    dpi=300
)
```

Saves `mean_time_by_state.png` in your current working directory (or the path you specify).

## Notes

* Units depend on your data. If your sequence time points are months, set `x_label="Mean Time (Months)"`.
* “Standard error” here reflects variability of mean time across sequences; wider bars mean more uncertainty.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

Edited by: Yuqi Liang
