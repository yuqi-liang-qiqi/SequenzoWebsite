<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2026-05-06 16:17:07
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2026-05-06 16:17:07
 * @FilePath: /SequenzoWebsite/docs/en/statistics/traminer-function-mapping.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# Statistical Helpers: Sequenzo and TraMineR Mapping

This page maps Sequenzo statistics functions to their closest TraMineR counterparts for users migrating from R.

## What This Section Covers

The `statistics` section focuses on aggregation and reporting helpers after core sequence indicators are computed.

- `sequence-characteristics-indicators` asks: **"Which value does each sequence get?"**
- `statistics` asks: **"How do we summarize those values and distributions?"**

## Mapping Table

| Sequenzo function | TraMineR counterpart | Notes |
| --- | --- | --- |
| [`get_distinct_state_sequences`](./distinct-state-sequences) | `seqdss` | In code, implemented via `seqdss` (`sequence_statistics.py`). |
| [`get_state_spell_durations`](./state-spell-durations) | `seqdur` | In code, implemented via `seqdur` (`sequence_statistics.py`). |
| [`get_mean_time_by_state`](./mean-time-by-state) | `seqmeant` | In code/docstring marked equivalent to `seqmeant`. |
| [`get_individual_state_distribution`](./individual-state-distribution) | `seqistatd` | In code/docstring marked equivalent to `seqistatd`. |
| [`get_modal_state_sequence`](./modal-state-sequence) | `seqmodst` | In code/docstring marked equivalent to `seqmodst`. |
| [`get_sequence_length_summary`](./sequence-length-summary) | `seqlength` (summary table added in Sequenzo) | Sequenzo computes `seqlength`-style values, then returns summary stats (`count`, `mean`, `median`, `q1`, `q3`, etc.). |
| [`get_transition_count_summary`](./transition-count-summary) | `seqtransn` (summary table added in Sequenzo) | Sequenzo computes `seqtransn`-style values, then returns summary stats (`count`, `mean`, `median`, `q1`, `q3`, etc.). |
| [`get_weighted_mean`](./weighted-mean) | `weighted.mean` | In code/docstring marked equivalent to `weighted.mean` helper behavior. |
| [`get_weighted_variance`](./weighted-variance) | `weighted.var` | In code/docstring marked equivalent to `weighted.var` helper behavior. |
| [`get_weighted_five_number_summary`](./weighted-five-number-summary) | `weighted.fivenum` | In code/docstring marked equivalent to `weighted.fivenum` helper behavior. |

