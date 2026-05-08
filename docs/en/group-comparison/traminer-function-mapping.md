# Group Comparison: Sequenzo and TraMineR Mapping

This page maps Sequenzo group-comparison functions to their closest TraMineR or TraMineRextras counterparts.

## What This Section Covers

This section focuses on predefined two-group sequence comparison using LRT/BIC logic.

For TraMineR users, this is the `seqCompare` family workflow (overall test plus LRT-only and BIC-only wrappers).

## Mapping Table

| Sequenzo function | TraMineR counterpart | Notes |
| --- | --- | --- |
| [`bic-lrt-conceptual-guide`](./bic-lrt-conceptual-guide) | `seqCompare` methodological framework | Conceptual explanation of one-group vs two-group comparison and interpretation of LRT/BIC evidence. |
| [`get_group_differences_overall`](./get_group_differences_overall) | `seqCompare` | Main overall two-group comparison interface; returns LRT/BIC outputs depending on `stat`. |
| [`get_lrt_test`](./get_lrt_test) | `seqLRT` | LRT-focused wrapper built on the same overall comparison engine. |
| [`get_bic_test`](./get_bic_test) | `seqBIC` | BIC-focused wrapper built on the same overall comparison engine. |

## Author

Code and documentation: Yuqi Liang

