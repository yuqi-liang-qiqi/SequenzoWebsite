<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2026-05-06 16:34:11
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2026-05-06 16:34:11
 * @FilePath: /SequenzoWebsite/docs/en/event-sequences/find_frequent_subsequences.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# `find_frequent_subsequences()`

`find_frequent_subsequences()` finds event patterns that appear often enough in your event sequences.

## Function Usage

```python
find_frequent_subsequences(
    event_sequences,
    target_subsequences=None,
    min_support=None,
    min_support_ratio=None,
    search_constraint=None,
    max_k=-1,
    weighted=True
)
```

## TraMineR Parameter Mapping

- `event_sequences` -> TraMineR `eseq`
- `target_subsequences` -> TraMineR `str.subseq`
- `min_support_ratio` -> TraMineR `pmin.support`
- `search_constraint` -> TraMineR `constraint`
- `weighted` -> TraMineR `weighted`

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `event_sequences` | ✓ | EventSequenceData / EventSequenceList | Your full event-sequence dataset (the object returned by `EventSequenceData.from_tse()` or `EventSequenceData.from_state_sequences()`). |
| `target_subsequences` | ✗ | list[str] | Optional list of specific subsequences to search for directly. |
| `min_support` | ✗ | float | Minimum number of supporting sequences (or weighted support). |
| `min_support_ratio` | ✗ | float | Minimum support ratio (0 to 1). |
| `search_constraint` | ✗ | EventSequenceConstraint | Time and counting constraints. |
| `max_k` | ✗ | int | Maximum number of events in a subsequence (`-1` means no limit). |
| `weighted` | ✗ | bool | Use sequence weights if available. |

## What It Does

- Scans event sequences for recurring subsequences.
- Keeps only subsequences that pass your support threshold.
- Returns a `SubsequenceList` with support and count information.

## Examples

```python
# At least 20 supporting sequences
fsubseq = find_frequent_subsequences(event_sequences, min_support=20)

# At least 5% support
fsubseq = find_frequent_subsequences(event_sequences, min_support_ratio=0.05)

# Search only selected patterns
fsubseq = find_frequent_subsequences(
    event_sequences,
    target_subsequences=["(EnterUni)-(Graduate)", "(Graduate)-(FindJob)"]
)
```

## R Counterpart

- **Closest R function:** `seqefsub`
- **Mapping note:** Both functions search for frequent event subsequences using support thresholds and optional time constraints.

## Notes

- You must provide `min_support` or `min_support_ratio` when `target_subsequences` is not given.
- Weighted support uses sequence weights from `event_sequences`.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Ritschard, G., Burgin, R., & Studer, M. (2013). Exploratory Mining of Life Event Histories. In J. J. McArdle & G. Ritschard (Eds.), *Contemporary Issues in Exploratory Data Mining in the Behavioral Sciences* (pp. 221-253). Routledge.
