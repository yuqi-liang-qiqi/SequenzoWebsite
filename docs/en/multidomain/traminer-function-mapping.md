<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2026-05-06 11:02:38
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2026-05-06 11:09:04
 * @FilePath: /SequenzoWebsite/docs/en/multidomain/traminer-function-mapping.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# Multidomain Functions: Sequenzo and TraMineR Mapping

This page maps Sequenzo multidomain functions to their closest TraMineR counterparts for users migrating from R.

## What This Section Covers

This section follows the four multidomain strategies discussed by Ritschard et al. (2023):
- IDCD (independence from domain costs and distances)
- CAT (cost additive trick)
- DAT (distance additive trick)
- CombT (combined typology approach)

## Mapping by Multidomain Strategy

| Strategy | Sequenzo function(s) | TraMineR counterpart(s) | Notes |
| --- | --- | --- | --- |
| **CAT** | [`compute_cat_distance_matrix`](./cat-distance-matrix) | `seqMD(..., what="cost"/"diss")` (or `seqdistmc`) | Direct conceptual match for CAT-style multidomain costs and CAT-based distances. |
| **DAT** | [`compute_dat_distance_matrix`](./dat-distance-matrix) | No direct one-function equivalent | In TraMineR this is usually done as a multi-step workflow: compute domain distances, then combine them. |
| **IDCD** | [`create_idcd_sequence_from_csvs`](./idcd-sequence) + MD-level distance step | Closest step: `seqMD(..., what="MDseq")`, then `seqdist` at MD level | Implemented in Sequenzo for constructing combined-state MD sequences from multiple CSV files. Distances are then computed explicitly in the next step (for example, `get_distance_matrix`). |
| **CombT** | [`get_interactive_combined_typology`](./combined-typology), [`merge_sparse_combt_types`](./merge-sparse-combt-types) | No direct one-function equivalent | Usually done as a workflow: cluster each domain, cross-classify domain cluster labels, then optionally merge sparse combined types. |

## Supporting Functions Around the Four Strategies

| Purpose | Sequenzo function(s) | TraMineR counterpart(s) | Notes |
| --- | --- | --- | --- |
| Check whether CAT/DAT assumptions are plausible | [`get_association_between_domains`](./association-between-domains) | `dissdomassoc` (distance-association perspective) / custom state cross-tabs | Not one of the four strategies itself, but useful before choosing CAT or DAT. |
| Linked polyads (separate framework) | [`linked_polyadic_sequence_analysis`](./linked-polyadic-sequence-analysis) | No direct one-function equivalent in TraMineR core | Related multidomain context, but not one of the four strategies in Ritschard et al. (2023). |

## Beginner Migration Tips

- First choose your strategy (IDCD, CAT, DAT, or CombT), then choose function(s).
- If your R script mainly used `seqMD(..., what="diss")`, you are usually closest to **CAT** in Sequenzo.
- For **IDCD**, think in two steps: build MD sequences first, then compute MD distances.
- In papers/reports, always name the strategy explicitly (IDCD/CAT/DAT/CombT), because assumptions differ.

## Author

Documentation: Yuqi Liang

## References

Ritschard, G., Liao, T. F., & Struffolino, E. (2023). Strategies for multidomain sequence analysis in social research. Sociological Methodology, 53(2), 288-322.