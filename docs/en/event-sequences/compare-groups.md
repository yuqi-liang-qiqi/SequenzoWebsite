# `compare_groups()`

`compare_groups()` checks which subsequences differ most across groups.

## Function Usage

```python
compare_groups(
    subsequence_results,
    group_labels,
    test_method="chisq",
    p_adjust_method=None,
    pvalue_threshold=None,
    weighted=True
)
```

## TraMineR Parameter Mapping

- `subsequence_results` -> TraMineR `fsub`
- `group_labels` -> TraMineR `group`
- `test_method` -> Conceptually corresponds to the chi-square association test used by `seqecmpgroup()`
- `pvalue_threshold` -> TraMineR `pvalue.limit`
- `weighted` -> TraMineR weighted behavior

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `subsequence_results` | ✓ | SubsequenceList | The mined subsequences to test across groups. |
| `group_labels` | ✓ | array-like | Group label for each sequence (same length as input sequences). |
| `test_method` | ✗ | str | Statistical association test used to compare subsequence presence across groups. Currently `"chisq"` is supported. |
| `p_adjust_method` | ✗ | str / None | Optional multiple-testing correction method, such as `"bonferroni"`. |
| `pvalue_threshold` | ✗ | float | Keep results with p-value at or below this threshold. |
| `weighted` | ✗ | bool | Use sequence weights if available. |

## What It Does

For each subsequence, `compare_groups()` creates a presence/absence indicator showing whether the subsequence occurs in each sequence. It then cross-tabulates this indicator with the group labels and computes a chi-square association statistic. Subsequence patterns are then filtered by the p-value threshold, if provided, and sorted by their strength of association with the grouping variable.

## Returns

`sequenzo.event_sequences.core.SubsequenceList`. SubsequenceList object filtered to discriminating subsequences

## Example

```python
discriminating = compare_groups(
    subsequence_results=fsubseq,
    group_labels=df["gender"],
    pvalue_threshold=0.05
)
```

## R Counterpart

- **Closest R function:** `seqecmpgroup`
- **Mapping note:** Both functions identify subsequences that best separate groups using chi-square based testing.

## Notes

- `group_labels` length must match the number of sequences.
- `scipy` is required for statistical testing.

## See Also

- [Event Sequences Introduction](/en/event-sequences/introduction) explains the workflow and data structures.
- [Quickstart Example](/en/event-sequences/example) shows a complete event-mining run.
- [Helper Functions](/en/event-sequences/event-sequence-helpers) lists supporting utilities.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Ritschard, G., Bürgin, R., & Studer, M. (2013). Exploratory Mining of Life Event Histories. In J. J. McArdle & G. Ritschard (Eds.), *Contemporary Issues in Exploratory Data Mining in the Behavioral Sciences* (pp. 221-253). Routledge.
