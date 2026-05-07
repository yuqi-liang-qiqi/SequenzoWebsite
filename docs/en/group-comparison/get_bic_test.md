<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2026-05-07 20:53:18
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2026-05-07 20:53:18
 * @FilePath: /SequenzoWebsite/docs/en/group-comparison/get_bic_test.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# `get_bic_test()`

Convenience function for users who only need BIC/Bayes-factor outputs.

## Function Usage

```python
get_bic_test(seqdata=seqdata, group=group)
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

- Delegates to `get_group_differences_overall(stat="BIC")`.
- Returns delta BIC and Bayes-factor style evidence summaries.
- Supports the same one-dataset or two-dataset workflows.

## Notes and Tips

- Use BIC when you want model-selection style evidence strength.
- BIC and LRT are often reported together in methodological papers.

## Examples

### 1) Minimal

```python
from sequenzo.group_comparison import get_bic_test
bic = get_bic_test(seqdata=seqdata, group=group)
```

### 2) Standard

```python
bic = get_bic_test(
    seqdata=seqdata,
    group=group,
    method="LCS",
    s=100,
)
print(bic)
```

### 3) Advanced (stratified BIC)

```python
bic = get_bic_test(
    seqdata=seqdata,
    group=group,
    set_var=cohort,
)
```

### 4) Common pitfall

```python
# Wrong: more than two groups in group labels
# get_bic_test(seqdata=seqdata, group=three_groups)
```

## TraMineR Mapping

- **Closest R function:** TraMineRextras `seqBIC()`

## Key Features

- Direct BIC/Bayes-factor interface.
- Works for one-dataset or two-dataset comparisons.
- Useful for evidence-strength reporting.

## Authors

- Code: Yuqi Liang
- Documentation: Yuqi Liang

## References

Liao, T. F., & Fasang, A. E. (2021). Comparing groups of life-course sequences using the Bayesian information criterion and the likelihood-ratio test. Sociological Methodology, 51(1), 44-85.

