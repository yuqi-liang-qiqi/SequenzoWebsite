<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2026-05-07 20:51:57
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2026-05-07 20:55:06
 * @FilePath: /SequenzoWebsite/docs/en/group-comparison/get_lrt_test.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# `get_lrt_test()`

Convenience function for users who only need LRT results.

## Function Usage

```python
get_lrt_test(seqdata=seqdata, group=group)
```

## Entry Parameters

| Parameter | Required | Type | Default | Typical Range / Options | Description |
| --- | --- | --- | --- | --- | --- |
| `seqdata` | ✓ | SequenceData/DataFrame | - | one dataset/list | First dataset or full dataset. |
| `seqdata2` | ✗ | SequenceData/DataFrame | `None` | second dataset | Optional second dataset. |
| `group` | ✗ | array-like | `None` | exactly two groups | Group labels for one-dataset mode. |
| `set_var` | ✗ | array-like | `None` | cohort/strata labels | Optional stratification variable. |
| `s` | ✗ | int | `100` | `0` or positive int | Bootstrap sample size. |
| `seed` | ✗ | int | `36963` | integer | Random seed. |
| `method` | ✗ | str | `"OM"` | `"OM"`, `"LCS"`, `"HAM"`, ... | Distance method. |
| Other kwargs | ✗ | mixed | - | distance options | Extra parameters forwarded to comparison engine. |

## What It Does

- Delegates to `get_group_differences_overall(stat="LRT")`.
- Returns only LRT and p-value columns.
- Keeps the same input flexibility as overall comparison.

## Notes and Tips

- Use this when BIC is not part of your reporting plan.
- Keep `method` consistent across analyses for comparability.

## Examples

### 1) Minimal

```python
from sequenzo.group_comparison import get_lrt_test
lrt = get_lrt_test(seqdata=seqdata, group=group)
```

### 2) Standard

```python
lrt = get_lrt_test(
    seqdata=seqdata,
    group=group,
    method="LCS",
    s=100,
)
print(lrt)
```

### 3) Advanced (two explicit datasets)

```python
lrt = get_lrt_test(seqdata=seqdata_A, seqdata2=seqdata_B, method="OM")
```

### 4) Common pitfall

```python
# Wrong: both seqdata2 and group are missing
# get_lrt_test(seqdata=seqdata)
```

## TraMineR Mapping

- **Closest R function:** TraMineRextras `seqLRT()`

## References

Liao, T. F., & Fasang, A. E. (2021). Comparing groups of life-course sequences using the Bayesian information criterion and the likelihood-ratio test. Sociological Methodology, 51(1), 44-85.

## Key Features

- Direct LRT-only interface.
- Same flexibility as `get_group_differences_overall`.
- Suitable for hypothesis-focused reports.

## Authors

- Code: Yuqi Liang
- Documentation: Yuqi Liang
