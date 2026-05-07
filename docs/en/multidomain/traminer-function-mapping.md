# Multidomain Functions: Sequenzo and TraMineR Mapping

This page maps Sequenzo multidomain functions to their closest TraMineR workflows for users migrating from R.

## What This Section Covers

This section follows the four multidomain strategies discussed by Ritschard et al. (2023):

- IDCD: independence from domain costs and distances
- CAT: cost additive trick
- DAT: distance additive trick
- CombT: combined typology approach

These strategies differ in what is combined: states, costs, distances, or typologies.

## Quick Strategy Guide

| Strategy | What is combined? | Main idea | Best used when |
| --- | --- | --- | --- |
| **IDCD** | States first, then costs/distances at MD level | Treat combined states as regular sequence states | You want to avoid additive assumptions and compute distances directly at the multidomain level |
| **CAT** | Domain costs | Build MD costs by additively combining domain-level costs | You want multidomain costs to reflect additive domain-level differences |
| **DAT** | Domain distances | Add separate distance matrices | You want a simple linear combination of domain-specific dissimilarities |
| **CombT** | Domain typologies | Cross-classify separately derived domain clusters | You want the joint typology to remain directly interpretable as combinations of domain-specific clusters |

## Mapping by Multidomain Strategy

| Strategy | Sequenzo function(s) | TraMineR counterpart(s) | Notes |
| --- | --- | --- | --- |
| **CAT** | [`compute_cat_distance_matrix`](./cat-distance-matrix) | `seqMD(..., what="cost"/"diss")`; related multichannel workflows may also use `seqdistmc` | Direct conceptual match for CAT-style multidomain costs and CAT-based distances. |
| **DAT** | [`compute_dat_distance_matrix`](./dat-distance-matrix) | No direct one-function equivalent | In TraMineR this is usually done manually: compute one distance matrix per domain with `seqdist()`, then add or linearly combine the matrices outside `seqdist()`. |
| **IDCD** | [`create_idcd_sequence_from_csvs`](./idcd-sequence) + MD-level distance step | Closest workflow: build combined-state sequences with `seqMD(..., what="MDseq")`, then apply `seqdist()` directly to the resulting MD sequences with costs set at the MD level | Implemented in Sequenzo for constructing combined-state MD sequences from multiple CSV files. Distances are then computed explicitly in the next step (for example, `get_distance_matrix`). |
| **CombT** | [`get_interactive_combined_typology`](./combined-typology), [`merge_sparse_combt_types`](./merge-sparse-combt-types) | No direct one-function equivalent | Usually done as a workflow: cluster each domain, cross-classify domain cluster labels, then optionally merge sparse combined types. |

## Supporting Functions Around the Four Strategies

| Purpose | Sequenzo function(s) | TraMineR counterpart(s) | Notes |
| --- | --- | --- | --- |
| Check state association between domains (especially relevant for CAT) | [`get_association_between_domains`](./association-between-domains) | custom state cross-tabs | A useful diagnostic before choosing a strategy. This diagnoses state co-occurrence, not trajectory association between domain distance matrices. |
| Linked polyads (separate framework) | [`linked_polyadic_sequence_analysis`](./linked-polyadic-sequence-analysis) | No direct one-function equivalent in TraMineR core | Related multidomain context, but not one of the four strategies in Ritschard et al. (2023). |

## Beginner Migration Tips

- First choose your strategy (IDCD, CAT, DAT, or CombT), then choose function(s).
- If your R script used `seqMD(..., what="diss")` with costs derived from domain-level costs, you are usually closest to **CAT** in Sequenzo.
- For **IDCD**, think in two steps: build MD sequences first, then compute MD distances.
- Use `get_association_between_domains()` to diagnose state co-occurrence. For DAT, trajectory association is more directly assessed by correlating domain-specific distance matrices.
- In papers/reports, always name the strategy explicitly (IDCD/CAT/DAT/CombT), because assumptions differ.

## Author

Documentation: Yuqi Liang

## References

Ritschard, G., Liao, T. F., & Struffolino, E. (2023). Strategies for multidomain sequence analysis in social research. Sociological Methodology, 53(2), 288-322.