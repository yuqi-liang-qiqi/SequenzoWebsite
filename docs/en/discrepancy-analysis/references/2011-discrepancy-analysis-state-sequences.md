# Discrepancy Analysis of State Sequences

This reference note points to the article that underpins Sequenzo's discrepancy-analysis module.

## Citation

Studer, M., Ritschard, G., Gabadinho, A., & Müller, N. S. (2011). Discrepancy analysis of state sequences. *Sociological Methods & Research*, 40(3), 471-510. https://doi.org/10.1177/0049124111415372

## Why This Paper Matters for Sequenzo

Studer, Ritschard, Gabadinho, and Müller define a distance-based framework for testing how covariates explain variation among state sequences. Their work connects pairwise dissimilarity matrices with pseudo-R2 summaries, permutation tests, group comparison, time-window analysis, and sequence regression trees.

Sequenzo's discrepancy-analysis pages translate this framework into Python functions for single-factor association, multifactor association, permutation inference, local group differences, and distance-based trees.

## Related Sequenzo Pages

- [Discrepancy Analysis](../introduction.md)
- [Conceptual Guide](../conceptual-guide.md)
- [`single_factor_association()` and related tools](../get-group-distance-association.md)
- [`compare_groups_across_positions()`](../get-group-differences-by-position.md)
- [`distance_tree()`](../build-distance-tree.md)
