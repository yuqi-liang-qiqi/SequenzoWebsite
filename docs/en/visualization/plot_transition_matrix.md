<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-12 13:59:06
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-12 14:14:56
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
    title=None,            # optional figure title
    save_as=None,          # e.g., "transitions.png"
    dpi=200                # image resolution if saving
)
```

## Entry Parameters

| Parameter | Required | Type         | Description                                                                                       |
| --------- | -------- | ------------ | ------------------------------------------------------------------------------------------------- |
| `seqdata` | ✓        | SequenceData | Your sequence dataset created with `SequenceData`. Labels from this object are used for the axes. |
| `title`   | ✗        | str          | Figure title. Default = `None` (no title).                                                        |
| `save_as` | ✗        | str          | File path to save the figure (e.g., `"transitions.png"`). If omitted, the plot is only displayed. |
| `dpi`     | ✗        | int          | Output resolution when saving. Default = `200`. Use `300+` for publication quality.               |

## What It Does

* Computes a transition rate matrix from `t` to `t+1` across all sequences (row-wise probabilities).
* Plots a heatmap with:

  * rows = state at time `t`
  * columns = state at time `t+1`
  * cell value = transition probability (0–1), shown with two decimal places.
* Shows the diagonal(probability of staying) and the lower triangle; the upper triangle is masked to avoid duplication.

## Key Features

* **Interpretable at a glance**: dark cells = common transitions; light cells = rare transitions.
* **Consistent labels**: uses `seqdata.labels` on both axes.
* **Publication-ready**: export with `save_as` and `dpi`.
* **Console print helper** (optional): use `print_transition_matrix()` to print the matrix with aligned columns.

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

### 3. Get and print the numeric matrix (optional)

```python
from your_module import compute_transition_matrix, print_transition_matrix

tm = compute_transition_matrix(seqdata)   # returns a NumPy array of row-normalized rates
print_transition_matrix(seqdata, tm)      # nicely formatted console output
```

## Notes

* Rows sum to 1.0 (within rounding). If a row has no observed outgoing transitions, it is safely handled to avoid division by zero.
* The diagonal shows `p(stay in the same state); off-diagonal cells show `p(change to another state)`.
* If you need the full matrix without masking, you can adapt the plotting code to remove the upper-triangle mask.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

Edited by: Yuqi Liang


