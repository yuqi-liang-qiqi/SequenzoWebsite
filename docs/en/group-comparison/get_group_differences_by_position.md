# `get_group_differences_by_position()`

This function shows *where* group differences happen along the sequence axis.
Instead of one global test, it runs local discrepancy comparisons in sliding windows.

## Function Usage

Minimal usage:

```python
get_group_differences_by_position(seqdata, group)
```

Common usage with centered windows:

```python
get_group_differences_by_position(
    seqdata=seqdata,
    group=group,
    cmprange=(-2, 2),
    seqdist_args={"method": "LCS", "norm": "auto"},
)
```

## Entry Parameters

| Parameter | Required | Type | Default | Typical Range / Options | Description |
| --- | --- | --- | --- | --- | --- |
| `seqdata` | ✓ | SequenceData / DataFrame | - | state sequence table | Input sequence dataset. |
| `group` | ✓ | array-like / DataFrame | - | 2+ groups | Group labels (global or position-specific). |
| `cmprange` | ✗ | tuple[int, int] | `(0, 1)` | e.g. `(-2,2)`, `(-1,1)`, `(0,1)` | Sliding window around each position. |
| `seqdist_args` | ✗ | dict | `{"method": "LCS", "norm": "auto"}` | valid distance args | Arguments passed to distance computation. |
| `with_missing` | ✗ | bool | `False` | `True` / `False` | Missing handling strategy. |
| `weighted` | ✗ | bool | `True` | `True` / `False` | Whether to use sequence weights. |
| `squared` | ✗ | bool | `False` | `True` / `False` | Whether discrepancy uses squared distances. |

## What It Does

- Computes local distance matrices for each sliding window.
- Runs discrepancy-based association at each position.
- Returns per-position pseudo statistics and discrepancy profiles.
- Supports plotting via `plot_group_differences_by_position()`.

## Notes and Tips

- Use narrower windows for local shocks; wider windows for smoother trends.
- For publication figures, combine this with group-specific sequence plots.
- If computation is slow, reduce window width or simplify distance settings.

## Examples

### 1) Minimal

```python
from sequenzo.group_comparison import get_group_differences_by_position
res = get_group_differences_by_position(seqdata, group)
```

### 2) Standard (centered local windows)

```python
res = get_group_differences_by_position(
    seqdata=seqdata,
    group=group,
    cmprange=(-1, 1),
    seqdist_args={"method": "LCS", "norm": "auto"},
)
print(res["stat"]["Pseudo R2"].head())
```

### 3) Advanced (weighted + missing-aware)

```python
res = get_group_differences_by_position(
    seqdata=seqdata,
    group=group,
    cmprange=(-2, 2),
    with_missing=True,
    weighted=True,
)
```

### 4) Common pitfall

```python
# Wrong: window too wide for sequence length can yield no valid positions
# get_group_differences_by_position(seqdata, group, cmprange=(-50, 50))
```
Choose `cmprange` compatible with sequence length.

## TraMineR Mapping

- **Closest R function:** `seqdiff()`
- **Mapping note:** Direct adaptation of position-wise discrepancy analysis logic.

## References

Studer, M., Ritschard, G., Gabadinho, A., & Müller, N. S. (2011). Discrepancy analysis of state sequences.

## Key Features

- Position-wise dynamics of group difference strength.
- Sliding-window flexibility for local vs smooth interpretation.
- Compatible with weighted and missing-aware workflows.
- Native bridge to discrepancy plotting functions.

## Authors

- Code: Yuqi Liang
- Documentation: Yuqi Liang

## R Counterpart

- `TraMineR::seqdiff()`
