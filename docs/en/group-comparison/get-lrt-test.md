# `get_lrt_test()`

`get_lrt_test()` compares two predefined sequence groups and returns only the likelihood ratio test (LRT), not BIC.

## Function Usage

```python
get_lrt_test(
    seqdata,
    seqdata2=None,
    group=None,
    set_var=None,
    s=100,
    seed=36963,
    squared="LRTonly",
    weighted=True,
    opt=None,
    BFopt=None,
    method="OM",
    **kwargs
)
```

## TraMineR Parameter Mapping

- `seqdata`, `seqdata2`, `group`, `set_var` -> TraMineRextras `seqLRT` data/group inputs
- `s`, `seed`, `squared`, `weighted`, `opt` -> `seqLRT` control arguments

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `seqdata` | ✓ | SequenceData / DataFrame / list | Main input sequences. |
| `seqdata2` | ✗ | SequenceData / DataFrame / list / None | Optional second sequence input. |
| `group` | ✗ | array-like / None | Two-group labels used when splitting one dataset. |
| `set_var` | ✗ | array-like / None | Optional stratification variable. |
| `s` | ✗ | int | Resampling size (`0` means full comparison). |
| `seed` | ✗ | int | Random seed. |
| `squared` | ✗ | bool / str | If string, only `"LRTonly"` is valid. |
| `weighted` | ✗ | bool / str | Use weights (`True`/`False`) or `"by.group"`. |
| `opt` | ✗ | int / None | Internal sampling option. |
| `BFopt` | ✗ | int / None | Reserved Bayes-factor option passed through the engine. |
| `method` | ✗ | str | Distance method (for example `"OM"`). |
| `**kwargs` | ✗ | any | Extra distance-method arguments. |

## What It Returns

A NumPy array with two columns:

- `LRT`
- `p-value`

If `set_var` is provided, each row corresponds to one stratum.

## Example

```python
from sequenzo.group_comparison import get_lrt_test

lrt = get_lrt_test(
    seqdata=seqdata,
    group=df["group"],
    method="OM",
    indel=1,
    sm="CONSTANT"
)

print(lrt)
```

## R Counterpart

- **Closest R function:** TraMineRextras `seqLRT`
- **Mapping note:** LRT-only wrapper of the same two-group comparison engine.

## Notes

- Internally this function calls `get_group_differences(..., stat="LRT")`.
- The same input constraints apply: exactly two groups among valid cases.
- `group` and `seqdata2` cannot both be missing.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Liao, T. F., & Fasang, A. E. (2021). Comparing groups of life-course sequences using the Bayesian information criterion and the likelihood-ratio test. Sociological Methodology, 51(1), 44-85.