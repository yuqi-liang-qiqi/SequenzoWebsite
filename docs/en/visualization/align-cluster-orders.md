# `align_cluster_orders()`

When you compare several clustering methods side by side (for example LCP vs LCPmst vs LCPspell), each method has its own cluster IDs. Cluster `1` under LCP is **not** the same pathway as cluster `1` under LCPmst. If you plot them in raw PAM order, similar medoids jump around between columns and the figure is hard to read.

`align_cluster_orders()` fixes that for **display only**:

1. You give it one medoid state sequence per cluster, for each method.
2. It matches similar medoids across methods (Hamming distance + Hungarian assignment).
3. It returns a **permutation** for each method: which original cluster should sit in column 1, 2, 3, …

Then you reorder your tables / plot panels with `apply_cluster_order()` so that column `C1`…`Ck` line up across rows.

::: tip Important
This does **not** recompute distances or re-run PAM. Cluster membership and `n` / weights stay the same. Only the **left-to-right order of panels** changes so comparisons are easier.
:::

## When you need it

Use this when:

- You have **two or more** methods (or partitions) with the same number of clusters `k`.
- Each method has a **representative sequence** per cluster (usually a PAM medoid).
- You want a figure where **similar pathways share the same column**.

If you only plot one method, you do not need this function.

## Step-by-step workflow

### Step 1 — Prepare one `(k, T)` matrix per method

Each row is one cluster’s medoid: a length-`T` vector of state codes (the same coding as in `SequenceData`).

```python
import numpy as np

# Example with k=4 clusters and T=10 time points (toy numbers)
medoids_lcp = np.array([
    [1, 1, 1, 3, 3, 5, 5, 5, 5, 5],  # cluster 1 medoid
    [1, 1, 3, 3, 3, 3, 7, 7, 7, 7],  # cluster 2
    [1, 5, 5, 5, 5, 5, 5, 5, 5, 5],  # cluster 3
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],  # cluster 4
])

medoids_lcmpst = np.array([
    [1, 1, 3, 3, 3, 3, 7, 7, 7, 7],  # similar to LCP cluster 2
    [1, 1, 1, 3, 3, 5, 5, 5, 5, 5],  # similar to LCP cluster 1
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 5, 5, 5, 5, 5, 5, 5, 5, 5],
])

# List in the same order as the rows of your multi-method figure
mats = [medoids_lcp, medoids_lcmpst]
```

In a real project you usually build each matrix from PAM output: for each cluster, take the medoid individual’s sequence from `seqdata.values`.

### Step 2 — Call `align_cluster_orders`

```python
from sequenzo.visualization import align_cluster_orders, apply_cluster_order

orders = align_cluster_orders(
    mats,
    reference=0,            # which method is the anchor (0-based)
    mode="to_reference",    # every method matches that anchor
    sort_reference=True,    # also sort the anchor so similar medoids sit next to each other
)
```

What you get:

- `orders` is a list, one array per method.
- `orders[i][j]` means: **display column `j` should show the original cluster `orders[i][j]`** of method `i`.

Example reading:

```python
print(orders[0])  # e.g. [3, 0, 1, 2] → display C1 = original cluster 3, C2 = original 0, ...
print(orders[1])  # permutation for the second method
```

### Step 3 — Reorder your medoid tables (optional but usual)

If you keep a pandas table with one row per cluster (`Cluster`, medoid id, `n`, weight, …):

```python
aligned_tables = [
    apply_cluster_order(tab, order, renumber=True)
    for tab, order in zip(tables, orders)
]
```

- `renumber=True` rewrites the `Cluster` column to `1…k` in **display** order, so titles can read `C1`, `C2`, … left to right.
- Membership files for index plots can be remapped the same way if you want panel order to match.

### Step 4 — Plot in the new column order

Draw panels left to right as `C1 → C2 → … → Ck` using the aligned tables. The substantive clusters did not change; only their column positions did.

## Function signatures

### `align_cluster_orders`

| Parameter | Required | Type | Description |
| --------- | -------- | ---- | ----------- |
| `partitions` | ✓ | list of arrays | One entry per method. Each entry is shape `(k, T)` or a list of `k` length-`T` vectors. |
| `reference` | ✗ | int or `"first"` | Which partition is the anchor when `mode="to_reference"`. Default = `0`. |
| `mode` | ✗ | str | `"to_reference"` (default): every method matches the reference. `"progressive"`: method `i` matches the already-aligned method `i-1`. |
| `sort_reference` | ✗ | bool | If `True` (default), reorder the reference so similar medoids are neighbouring columns before matching others. |
| `normalize` | ✗ | bool | If `True` (default), Hamming costs are divided by `T` (values in `[0, 1]`). |

**Returns:** `list` of length-`k` integer permutations, one per partition.

### `apply_cluster_order`

| Parameter | Required | Type | Description |
| --------- | -------- | ---- | ----------- |
| `medoids` | ✓ | DataFrame | One row per cluster. |
| `order` | ✓ | sequence of int | Permutation from `align_cluster_orders`. |
| `cluster_col` | ✗ | str | Column used to sort clusters before applying `order`. Default = `"Cluster"`. |
| `renumber` | ✗ | bool | If `True` (default), set `cluster_col` to `1…k` in display order. |

**Returns:** a new DataFrame in display order.

## Choosing `reference` and `mode`

**`mode="to_reference"` (recommended for papers)**  
Pick one substantively clear method as the anchor (for example LCPmst / RLCPmst). Every other row is matched to that same layout, so all rows share one column language.

```python
orders = align_cluster_orders(mats, reference=1, mode="to_reference")
```

**`mode="progressive"`**  
Useful when consecutive methods are closest to each other (method 2 ≈ method 1, method 3 ≈ method 2, …). Matching walks along the list instead of always jumping back to one fixed reference.

```python
orders = align_cluster_orders(mats, mode="progressive", sort_reference=True)
```

## Full minimal example

```python
import numpy as np
import pandas as pd
from sequenzo.visualization import align_cluster_orders, apply_cluster_order

# --- 1. Medoid state matrices (one row = one cluster) ---
mats = [medoids_method_a, medoids_method_b, medoids_method_c]  # each (k, T)

# --- 2. Align columns to method B (index 1) ---
orders = align_cluster_orders(
    mats,
    reference=1,
    mode="to_reference",
    sort_reference=True,
)

# --- 3. Reorder summary tables for plotting ---
tables = [table_a, table_b, table_c]  # each has column "Cluster"
aligned = [
    apply_cluster_order(tab, order, renumber=True)
    for tab, order in zip(tables, orders)
]

# --- 4. Plot each aligned table left-to-right as C1..Ck ---
# (your plotting code here; panel j uses aligned[i].iloc[j])
```

## How matching works (short)

1. For two methods, compute a `k × k` cost matrix: Hamming mismatch between every pair of medoids (fraction of time points that disagree, by default).
2. Solve a one-to-one assignment (Hungarian algorithm) so total cost is minimized.
3. That assignment is the permutation for the non-reference method.

So alignment is about **similar medoid pathways**, not about forcing the same people into the same cluster ID.

## Common mistakes

1. **Expecting cluster IDs to stay “true” across methods**  
   After `renumber=True`, `C1` is a **display** label. Say so in the figure caption (“columns are display-aligned to …”).

2. **Different `k` across methods**  
   Matching assumes each partition has the same number of medoids you want to show in parallel columns. Align sets with the same `k`.

3. **Forgetting to reorder membership when drawing index plots**  
   If medoid panels are aligned but full index-plot columns still use raw PAM IDs, the two figures will disagree. Remap membership with the same `orders`.

4. **Building the matrix in the wrong cluster order**  
   Rows of each `(k, T)` matrix must follow the same original cluster numbering as your table (usually sorted by `Cluster` 1…k) before you apply the returned permutation.

## See also

- [`plot_sequence_index()`](./index-plot.md) — full within-cluster index plots; use `x_tick_labels="bottom"` for multi-row grids.
- [`plot_single_medoid()`](./plot-single-medoid.md) — one overall medoid strip.
- Customize colors: [Customize Colors](./how-to-customize-colors.md).
