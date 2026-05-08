# `get_group_differences_overall()`

`get_group_differences_overall()` compares two predefined sequence groups at the whole-sequence level.

## Function Usage

```python
get_group_differences_overall(
    seqdata,
    seqdata2=None,
    group=None,
    set_var=None,
    s=100,
    seed=36963,
    stat="all",
    squared="LRTonly",
    weighted=True,
    opt=None,
    BFopt=None,
    method="OM",
    **kwargs
)
```

## TraMineR Parameter Mapping

- `seqdata`, `seqdata2`, `group`, `set_var` -> TraMineRextras `seqCompare` data/group inputs
- `s`, `seed`, `stat`, `squared`, `weighted`, `opt`, `BFopt` -> `seqCompare` control arguments

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `seqdata` | ✓ | SequenceData / DataFrame / list | Main input sequences. Can be one dataset or a list of datasets. |
| `seqdata2` | ✗ | SequenceData / DataFrame / list / None | Optional second sequence input. Required if `group` is not provided. |
| `group` | ✗ | array-like / None | Group labels used to split one `seqdata` into two groups. Must have exactly 2 valid levels. |
| `set_var` | ✗ | array-like / None | Optional strata variable. If provided, one result is computed per stratum. |
| `s` | ✗ | int | Resampling size used in the comparison engine. Use `0` for full comparison without sampling. |
| `seed` | ✗ | int | Random seed for reproducible resampling. |
| `stat` | ✗ | str | Which statistics to return: `"LRT"`, `"BIC"`, or `"all"`. |
| `squared` | ✗ | bool / str | If string, only `"LRTonly"` is valid. |
| `weighted` | ✗ | bool / str | Use weights (`True`/`False`) or `"by.group"` for group-wise normalization. |
| `opt` | ✗ | int / None | Internal sampling option. Leave as `None` unless you need low-level control. |
| `BFopt` | ✗ | int / None | Controls Bayes-factor output style in multi-sample settings. |
| `method` | ✗ | str | Distance method passed to `get_distance_matrix()` (for example `"OM"`). |
| `**kwargs` | ✗ | any | Extra distance-method arguments forwarded to `get_distance_matrix()`. |

## What It Returns

A NumPy array of test results:

- If `stat="LRT"`: `LRT`, `p-value`
- If `stat="BIC"`: `Delta BIC`, Bayes-factor output(s)
- If `stat="all"`: both LRT and BIC parts

When `set_var` is used, rows correspond to strata.

## Example

```python
from sequenzo.group_comparison import get_group_differences_overall

result = get_group_differences_overall(
    seqdata=seqdata,
    group=df["group"],
    stat="all",
    method="OM",
    indel=1,
    sm="CONSTANT"
)

print(result)
```

## R Counterpart

- **Closest R function:** TraMineRextras `seqCompare`
- **Mapping note:** Same one-group vs two-group comparison logic.

## Notes

- `group` and `seqdata2` cannot both be `None`.
- The function currently supports only two groups.
- Missing values in `group` (or in `set_var` when used) are removed before testing.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

