# Group Comparison: Sequenzo and TraMineR Mapping

This page maps Sequenzo group-comparison functions to their closest TraMineR or TraMineRextras counterparts.

## What This Section Covers

This section focuses on predefined two-group sequence comparison using LRT/BIC logic.

For TraMineR users, this matches the TraMineRextras `seqCompare` workflow (overall test plus LRT-only and BIC-only wrappers; R may expose these as `seqCompare`, `seqLRT`, `seqBIC`).

## Mapping Table

| Sequenzo function | TraMineR counterpart | Notes |
| --- | --- | --- |
| [`conceptual-guide`](./conceptual-guide) | `seqCompare` methodological framework | Conceptual explanation of one-group vs two-group comparison and interpretation of LRT/BIC evidence. |
| [`get_group_differences`](./get-group-differences) | `seqCompare` | Main overall two-group comparison interface; returns LRT/BIC outputs depending on `stat`. |
| [`get_lrt_test`](./get-lrt-test) | `seqLRT` | LRT-focused wrapper built on the same overall comparison engine. |
| [`get_bic_test`](./get-bic-test) | `seqBIC` | BIC-focused wrapper built on the same overall comparison engine. |

## Author

Code and documentation: Yuqi Liang


## References

Liao, T. F., & Fasang, A. E. (2021). Comparing groups of life-course sequences using the Bayesian information criterion and the likelihood-ratio test. Sociological Methodology, 51(1), 44-85.