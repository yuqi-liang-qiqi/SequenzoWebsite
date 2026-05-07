# `get_group_differences_overall()`

This function compares two sequence groups at the whole-trajectory level using
Likelihood Ratio Test (LRT), Bayesian Information Criterion (BIC), or both.

## Function Usage

Minimal usage with one dataset and a two-group variable:

```python
get_group_differences_overall(seqdata=seqdata, group=group)
```

Two explicit sequence sets:

```python
get_group_differences_overall(seqdata=seqdata_A, seqdata2=seqdata_B, stat="all")
```

## Entry Parameters

| Parameter | Required | Type | Default | Typical Range / Options | Description |
| --- | --- | --- | --- | --- | --- |
| `seqdata` | ✓ | SequenceData/DataFrame | - | one dataset or list | First dataset / full dataset. |
| `seqdata2` | ✗ | SequenceData/DataFrame | `None` | second dataset | Optional direct two-sample comparison dataset. |
| `group` | ✗ | array-like | `None` | exactly two groups | Group labels when splitting one dataset. |
| `set_var` | ✗ | array-like | `None` | cohort/strata labels | Optional stratified comparisons. |
| `stat` | ✗ | str | `"all"` | `"LRT"`, `"BIC"`, `"all"` | Which statistics to compute. |
| `s` | ✗ | int | `100` | `0` or positive int | Bootstrap sample size. |
| `seed` | ✗ | int | `36963` | integer | Random seed. |
| `squared` | ✗ | bool/str | `"LRTonly"` | `True`, `False`, `"LRTonly"` | Distance-power mode. |
| `weighted` | ✗ | bool/str | `True` | `True`, `False`, `"by.group"` | Weight-handling mode. |
| `method` | ✗ | str | `"OM"` | `"OM"`, `"LCS"`, `"HAM"`, ... | Distance method. |

## What It Does

- Builds group-specific comparison setup (or two-input setup).
- Computes sequence distances and discrepancy-based statistics.
- Produces LRT, p-values, BIC, and Bayes-factor style evidence.
- Supports bootstrapped averaging for stable estimates.

## Notes and Tips

- Use `stat="all"` during exploration; then report only needed statistics.
- If you have exactly two groups in one dataset, `group` mode is simplest.
- For cohort-wise comparisons, pass `set_var` to get one result per cohort.

## Examples

### 1) Minimal

```python
from sequenzo.group_comparison import get_group_differences_overall
res = get_group_differences_overall(seqdata=seqdata, group=group)
```

### 2) Standard (all statistics)

```python
res = get_group_differences_overall(
    seqdata=seqdata,
    group=group,
    stat="all",
    method="LCS",
    s=100,
)
print(res)
```

### 3) Advanced (stratified comparisons)

```python
res = get_group_differences_overall(
    seqdata=seqdata,
    group=group,
    set_var=cohort,
    stat="BIC",
)
```

### 4) Common pitfall

```python
# Wrong: more than 2 groups are not supported
# get_group_differences_overall(seqdata=seqdata, group=three_group_label)
```

## TraMineR Mapping

- **Closest R function:** TraMineRextras `seqCompare()`
- **Mapping note:** Same high-level purpose: overall comparison of sequence groups via LRT/BIC.

## References

Liao, T. F., & Fasang, A. E. (2021). Comparing groups of life-course sequences using the Bayesian information criterion and the likelihood-ratio test. Sociological Methodology, 51(1), 44-85.

## Key Features

- Unified LRT/BIC API for overall group differences.
- One-dataset split mode and two-dataset mode.
- Optional stratified comparison by cohort/set.
- Supports weighted and bootstrap workflows.

## Authors

- Code: Yuqi Liang
- Documentation: Yuqi Liang

