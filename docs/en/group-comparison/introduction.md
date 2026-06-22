# Group Comparison

Use group comparison when your groups are defined before the analysis, such as gender, cohort, region, treatment, or income group. The goal is not to discover clusters. The goal is to test whether two predefined groups have different sequence patterns.

## Choose a Page

| Goal | Start with |
| --- | --- |
| Understand the method | [Conceptual Guide](/en/group-comparison/conceptual-guide) |
| Compare two predefined groups | [`get_group_differences()`](/en/group-comparison/get-group-differences) |
| Read the likelihood-ratio test | [`get_LRT()`](/en/group-comparison/get-lrt-test) |
| Read the BIC evidence | [`get_BIC()`](/en/group-comparison/get-bic-test) |
| Coming from R | [Sequenzo and TraMineR Mapping](/en/group-comparison/traminer-function-mapping) |

## Typical Workflow

1. Define the grouping variable before looking at the results.
2. Build a `SequenceData` object and choose a distance measure.
3. Run the group comparison function for two groups.
4. Read LRT and BIC together.
5. Use plots to explain what differs in timing, duration, order, or states.

## Notes

- The current public API focuses on the two-group case.
- For three or more groups, compare theoretically meaningful pairs and report that design clearly.
- A significant test does not explain the difference by itself. Pair it with plots and descriptive sequence summaries.

## Authors
