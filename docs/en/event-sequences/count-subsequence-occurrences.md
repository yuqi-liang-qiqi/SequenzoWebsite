# `count_subsequence_occurrences()`

`count_subsequence_occurrences()` counts how many times each subsequence appears in each sequence.

## Function Usage

```python
count_subsequence_occurrences(
    subsequence_results,
    counting_method=None,
    search_constraint=None,
    include_rules=False
)
```

## TraMineR Parameter Mapping

- `subsequence_results` -> TraMineR `fsub`
- `counting_method` -> TraMineR `countMethod` in `seqeconstraint()`
- `search_constraint` -> TraMineR `constraint`
- `include_rules` -> optional rule-mining behavior when counting within subsequences

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `subsequence_results` | ✓ | SubsequenceList | The mined subsequences you want to count (usually from `find_frequent_subsequences()`). |
| `counting_method` | ✗ | str / int | Counting method, such as `"presence"` (0/1) or `"count"` (frequency). |
| `search_constraint` | ✗ | EventSequenceConstraint | Optional constraint override. |
| `include_rules` | ✗ | bool | If `True`, count inside subsequences (rule-mining use case). |

## Returns

A matrix with shape `(n_sequences, n_subsequences)`.

- Each row is one sequence.
- Each column is one subsequence.
- Cell values are counts based on your chosen method.

## Examples

```python
fsubseq = find_frequent_subsequences(event_sequences, min_support_ratio=0.05)

# Presence/absence matrix
presence = count_subsequence_occurrences(fsubseq, counting_method="presence")

# Distinct-count matrix
counts = count_subsequence_occurrences(fsubseq, counting_method="count")
```

## R Counterpart

- **Closest R function:** `seqeapplysub`
- **Mapping note:** Both functions count subsequence matches per sequence, including presence/count-style outputs.

## Notes

- If `counting_method` is not provided, the function uses the method in `search_constraint`.
- The output is a NumPy array for easy downstream analysis.

## See Also

- [Event Sequences Introduction](/en/event-sequences/introduction) explains the workflow and data structures.
- [Quickstart Example](/en/event-sequences/example) shows a complete event-mining run.
- [Helper Functions](/en/event-sequences/event-sequence-helpers) lists supporting utilities.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Ritschard, G., Bürgin, R., & Studer, M. (2013). Exploratory Mining of Life Event Histories. In J. J. McArdle & G. Ritschard (Eds.), *Contemporary Issues in Exploratory Data Mining in the Behavioral Sciences* (pp. 221-253). Routledge.
