<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-12 13:59:06
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2026-02-08 18:07:03
 * @FilePath: /SequenzoWebsite/docs/en/visualization/plot_transition_matrix.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# `plot_transition_matrix()`

`plot_transition_matrix()` draws a heatmap of state-to-state transition rates: for each “from” state (rows), it shows the probability of moving to each “to” state at the next time step (columns). The diagonal cells are stay-in-the-same-state probabilities.

Under the hood, the transition matrix is row-normalized, so each row sums to 1.0 (i.e., probabilities).

## Function Usage

```python
plot_transition_matrix(
    seqdata,
    weights="auto",        # sequence weights; "auto" uses seqdata.weights if available
    title="State Transition Rate Matrix",
    fontsize=12,
    save_as=None,          # e.g., "transitions.png"
    dpi=200,
    format=".2f"           # annotation format (e.g. ".2f" for 2 decimals, ".3f" for 3)
)
```

## Entry Parameters

| Parameter  | Required | Type         | Description                                                                                        |
| ---------- | -------- | ------------ | -------------------------------------------------------------------------------------------------- |
| `seqdata`  | ✓        | SequenceData | Your sequence dataset created with `SequenceData`. Labels from this object are used for the axes.  |
| `weights`  | ✗        | array/str    | Weights for sequences. If `"auto"`, uses `seqdata.weights` if available. Default = `"auto"`.       |
| `title`    | ✗        | str          | Figure title. Default = `"State Transition Rate Matrix"`.                                          |
| `fontsize` | ✗        | int          | Base font size for axis labels and annotations. Default = `12`.                                    |
| `save_as`  | ✗        | str          | File path to save the figure (e.g., `"transitions.png"`). If omitted, the plot is only displayed. |
| `dpi`      | ✗        | int          | Output resolution when saving. Default = `200`. Use `300+` for publication quality.                  |
| `format`   | ✗        | str          | Format string for cell annotations (e.g. `".2f"` for 2 decimals, `".3f"` for 3). Default = `".2f"`. |

## What It Does

* Computes a transition rate matrix from `t` to `t+1` across all sequences, with optional sequence weights (row-wise probabilities; each row sums to 1).
* Plots a heatmap with:
  * rows = state at time `t`
  * columns = state at time `t+1`
  * cell value = transition probability (0–1), formatted with the `format` parameter (default two decimal places).
* Shows the full matrix (all cells); the diagonal is the probability of staying in the same state.

## Key Features

* **Interpretable at a glance**: darker cells = higher transition probability; lighter = lower.
* **Weighted computation**: supports `weights="auto"` (from `seqdata.weights`) or a custom weight array.
* **Consistent labels**: uses `seqdata.labels` on both axes.
* **Custom formatting**: control annotation decimals with the `format` parameter (e.g. `".3f"`).
* **Publication-ready**: export with `save_as` and `dpi`.
* **Helpers**: `compute_transition_matrix(seqdata, with_missing=False, weights="auto")` returns the matrix; `print_transition_matrix(seqdata, transition_rates)` prints it to the console with aligned columns.

## Examples

### 1. Basic heatmap

```python
plot_transition_matrix(seqdata)
```

Displays the transition rate heatmap in your current environment.

### 2. Add a title and save

```python
plot_transition_matrix(
    seqdata,
    title="State Transition Rates (t → t+1)",
    save_as="transition_matrix.png",
    dpi=300
)
```

Saves a high-resolution PNG to your working directory.

### 3. Custom format and font size

```python
plot_transition_matrix(
    seqdata,
    title="Transition Rates",
    format=".3f",    # 3 decimal places in each cell
    fontsize=14
)
```

### 4. Get and print the numeric matrix (optional)

```python
from sequenzo.visualization import compute_transition_matrix, print_transition_matrix

tm = compute_transition_matrix(seqdata)   # returns a NumPy array of row-normalized rates
print_transition_matrix(seqdata, tm)       # nicely formatted console output (4 decimal places)
```

## Notes

* Rows sum to 1.0 (within rounding). If a row has no observed outgoing transitions, it is safely handled to avoid division by zero.
* The diagonal is p(stay in the same state); off-diagonal cells are p(move to another state).
* Transition counts are weighted when `weights` is provided; the matrix is then row-normalized to rates.

## Authors

Code: Yuqi Liang, Sebastian Daza

Documentation: Yuqi Liang

Edited by: Yuqi Liang


