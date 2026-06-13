# `get_group_differences()`

`get_group_differences()` compares two predefined sequence groups at the whole-sequence level using LRT and/or BIC.

## Function Usage

```python
get_group_differences(
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

## Returns

A NumPy array of numeric results (column layout follows the internal table built before return):

- If `stat="LRT"`: `LRT`, `p-value`
- If `stat="BIC"`: `Delta BIC`, Bayes-factor column(s)
- If `stat="all"`: LRT columns plus BIC columns

When resampling produces multiple subsamples (`multsple`), extra Bayes-factor columns may appear depending on `BFopt` (see source). When `set_var` is used, rows correspond to strata.

## Example

```python
from sequenzo.group_comparison import get_group_differences

result = get_group_differences(
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
- Only two groups are supported among valid cases.
- Missing values in `group` (or in `set_var` when used) are removed before testing.

## See Also

- [Section overview](/en/group-comparison/conceptual-guide) maps the surrounding workflow and related functions.
- [Typical Workflow](/en/basics/typical-workflow) shows where this method fits in the full analysis.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Liao, T. F., & Fasang, A. E. (2021). Comparing groups of life-course sequences using the Bayesian information criterion and the likelihood-ratio test. Sociological Methodology, 51(1), 44-85.