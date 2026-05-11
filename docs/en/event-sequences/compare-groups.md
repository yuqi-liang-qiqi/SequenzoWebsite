# `compare_groups()`

`compare_groups()` checks which subsequences differ most across groups.

## Function Usage

```python
compare_groups(
    subseq,
    group_labels,
    test_method="chisq",
    pvalue_threshold=None,
    weighted=True
)
```

## TraMineR Parameter Mapping

- `subsequence_results` -> TraMineR `fsub`
- `group_labels` -> TraMineR `group`
- `test_method` -> TraMineR `method`
- `pvalue_threshold` -> TraMineR `pvalue.limit`
- `weighted` -> TraMineR weighted behavior

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `subseq` (`subsequence_results`) | ✓ | SubsequenceList | The mined subsequences to test across groups. |
| `group_labels` | ✓ | array-like | Group label for each sequence (same length as input sequences). |
| `test_method` | ✗ | str | `"chisq"` or `"bonferroni"`. |
| `pvalue_threshold` | ✗ | float | Keep results with p-value at or below this threshold. |
| `weighted` | ✗ | bool | Use sequence weights if available. |

## What It Does

- Tests each subsequence across groups.
- Keeps subsequences that pass the p-value filter.
- Sorts results by test strength.

## Example

```python
discriminating = compare_groups(
    fsubseq,
    group=df["gender"],
    pvalue_threshold=0.05
)
```

## R Counterpart

- **Closest R function:** `seqecmpgroup`
- **Mapping note:** Both functions identify subsequences that best separate groups using chi-square based testing.

## Notes

- `group_labels` length must match the number of sequences.
- `scipy` is required for statistical testing.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Ritschard, G., Burgin, R., & Studer, M. (2013). Exploratory Mining of Life Event Histories. In J. J. McArdle & G. Ritschard (Eds.), *Contemporary Issues in Exploratory Data Mining in the Behavioral Sciences* (pp. 221-253). Routledge.
