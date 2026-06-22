# `extract_sequence_features()`

`extract_sequence_features()` builds duration, timing, and sequencing feature matrices from `SequenceData`. It does **not** run Boruta or fit a predictive model.

## Function Usage

```python
extract_sequence_features(
    seqdata,
    *,
    state_groups=None,
    timing_bin_width=12.0,
    time_unit_hint="same_as_labels",
    timing_include_start=True,
    timing_include_end=True,
    timing_count_method="any",
    timing_bin_include_left=True,
    end_time_mode="last_observed",
    sequencing_max_k=3,
    sequencing_min_support=0.05,
    sequencing_top_mined_subsequences=1000,
    sequencing_count_method="presence",
    sequencing_event_label_mode="state",
    sequencing_weighted=False,
    ids=None,
)
```

## R / Literature Parameter Mapping

| Sequenzo | R / packages | Notes |
| --- | --- | --- |
| Duration block | `TraMineR::seqistatd()`; `WeightedCluster::seqpropclust(..., properties="duration")` | Spell-step totals |
| Timing block | Custom bins on spell start/end (Unterlerchner 2023) | No single TraMineR equivalent |
| Sequencing block | `TraMineR::seqecreate()` → `TraMineR::seqefsub()` → `TraMineR::seqeapplysub()`; `WeightedCluster::seqpropclust(..., properties="pattern")` | DSS spell path |
| Spell conversion | `TraMineR::seqdss()`, `TraMineR::seqdur()`, `TraMineR::seqformat(..., to="SPELL")` | Via `convert_seqdata_to_spells` |

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `seqdata` | ✓ | `SequenceData` | Input sequences. |
| `state_groups` | ✗ | `dict` / `None` | Map group labels to lists of states. Default: one group per state. |
| `timing_bin_width` | ✗ | `float` | Bin width in the **same unit as** `seqdata.time` (e.g. `12.0` for monthly grids, `1.0` for yearly age labels). |
| `time_unit_hint` | ✗ | `"month"` / `"year"` / `"same_as_labels"` | Metadata only; stored in results for reproducibility and self-documentation. Does not change bins; set `timing_bin_width` explicitly. |
| `timing_include_start` | ✗ | `bool` | Include `START_*` timing features. |
| `timing_include_end` | ✗ | `bool` | Include `END_*` timing features. |
| `timing_count_method` | ✗ | `str` | How to count events per bin (default `"any"`). |
| `timing_bin_include_left` | ✗ | `bool` | Left-inclusive bin edges for timing. |
| `end_time_mode` | ✗ | `"last_observed"` / `"exit_time"` | How spell end times are defined. |
| `sequencing_max_k` | ✗ | `int` | Maximum subsequence length to mine. |
| `sequencing_min_support` | ✗ | `int` / `float` | Minimum support for mined subsequences. |
| `sequencing_top_mined_subsequences` | ✗ | `int` / `None` | Cap on number of mined subsequences (default `1000`). |
| `sequencing_count_method` | ✗ | `str` | Subsequence count method (default `"presence"`). |
| `sequencing_event_label_mode` | ✗ | `str` | Event label mode (default `"state"`). |
| `sequencing_weighted` | ✗ | `bool` | Weighted mining; currently raises `NotImplementedError`. |
| `ids` | ✗ | `list` / `None` | Row index for output DataFrames. |

## Returns

A `dict` with:

| Key | Type | Description |
| --- | --- | --- |
| `time_unit_hint` | `str` | Echo of the hint argument. |
| `timing_bin_width` | `float` | Bin width used. |
| `end_time_mode` | `str` | Spell end mode used. |
| `X_duration` | `DataFrame` | Duration features only. |
| `X_timing` | `DataFrame` | Timing features only. |
| `X_sequencing` | `DataFrame` | Sequencing features only. |
| `X_full` | `DataFrame` | Horizontally stacked full matrix. |
| `all_feature_names` | `list` | Column names for `X_full`. |

## Example

### Monthly grid (Unterlerchner-style timing)

```python
from sequenzo import extract_sequence_features

features = extract_sequence_features(
    seqdata,
    timing_bin_width=12.0,
    time_unit_hint="month",
    timing_include_end=True,
    end_time_mode="exit_time",
    sequencing_max_k=3,
    sequencing_min_support=0.05,
)

print(features["X_full"].shape)
print(features["all_feature_names"][:5])
```

### Yearly age labels

```python
features = extract_sequence_features(
    seqdata,
    timing_bin_width=1.0,
    time_unit_hint="year",
    timing_include_end=True,
    end_time_mode="exit_time",
)
```

## R Counterpart

- **Closest R bundle:** `WeightedCluster::seqpropclust(..., prop.only=TRUE)`
- **Mapping note:** Sequenzo implements duration, timing bins, and sequencing explicitly in Python rather than calling a single R function.

## Notes

- Sequencing is mined on the **spell-state sequence** (DSS), not the raw panel.
- `timing_bin_width=12.0` means twelve **time-label units** per bin, not necessarily twelve calendar months unless your grid is monthly.
- Weighted sequencing (`sequencing_weighted=True`) is not wired through this entrypoint.

## See Also

- [Section overview](/en/sequence-feature-selection-and-extraction/introduction) maps the surrounding workflow and related functions.
- [Typical Workflow](/en/basics/typical-workflow) shows where this method fits in the full analysis.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Bolano, D., & Studer, M. (2020). The link between previous life trajectories and a later life outcome: A feature selection approach.

Unterlerchner, L., Studer, M., & Gomensoro, A. (2023). Back to the features. Investigating the relationship between educational pathways and income using sequence analysis and feature extraction and selection approach. Swiss journal of sociology, 49(2), 417-446.
