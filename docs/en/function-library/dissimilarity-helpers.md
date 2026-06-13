# Dissimilarity Helper Functions

Most users should start with [`get_distance_matrix()`](/en/function-library/get-distance-matrix). It provides the main public interface for sequence dissimilarities.

This page documents helper functions that are useful when you need to inspect cost matrices, reproduce a TraMineR-style calculation, or build custom diagnostics around a distance method.

## When to Use Helpers

| Need | Helper |
| --- | --- |
| Build a substitution-cost matrix | `get_substitution_cost_matrix()` |
| Inspect common-prefix length for two sequences | `get_LCP_length_for_2_seq()` |
| Inspect OMstran backend construction | `build_omstran_substitution_matrix()` |
| Compute chi-square Euclidean distances | `chi2_euclid_distances()` |
| Convert a list of sequence rows to a distance-ready form | lower-level utilities in `sequenzo.dissimilarity_measures` |

## Substitution-Cost Matrices

```python
from sequenzo import get_substitution_cost_matrix

sm = get_substitution_cost_matrix(seqdata, method="CONSTANT", cval=2)
```

Substitution-cost matrices are passed to optimal-matching methods through `get_distance_matrix()` or to lower-level alignment diagnostics such as [`pairwise_sequence_alignment()`](/en/function-library/sequence-operations#pairwise-alignment-details).

```python
from sequenzo import get_distance_matrix, pairwise_sequence_alignment

diss = get_distance_matrix(seqdata, method="OM", sm=sm, indel=1)
alignment = pairwise_sequence_alignment(seqdata, indices=[0, 1], indel=1, sm=sm)
```

## Prefix Helpers

Prefix-based distances such as `LCP` and suffix-based variants such as `RLCP` are usually computed through `get_distance_matrix()`. If you need the common-prefix length for a pair of sequences, use:

```python
from sequenzo import get_LCP_length_for_2_seq

length = get_LCP_length_for_2_seq(seq_a, seq_b)
```

For full prefix/suffix tree analysis, use the [Prefix and Suffix Trees](/en/sequence-characteristics-indicators/prefix-and-suffix-trees) page.

## Specialized Distance Backends

Some distance routines exist as lower-level backend exports because they are useful for validation, benchmarking, or method development. They are not the recommended user-facing route for ordinary analyses.

```python
from sequenzo.dissimilarity_measures.measures_implemented_with_python import (
    build_omstran_substitution_matrix,
    chi2_euclid_distances,
)
```

In normal documentation examples, prefer:

```python
diss = get_distance_matrix(seqdata, method="OMstran")
```

or the corresponding method name in `get_distance_matrix()` when it is available.

`build_omstran_substitution_matrix()` is an internal-facing backend helper. It expects intermediate OMstran objects such as transition-state data and precomputed substitution/indel costs, so most users should call `get_distance_matrix(..., method="OMstran")` instead.

## Professional Workflow Guidance

- Use `get_distance_matrix()` for production analyses.
- Use helper functions when you need to expose an intermediate object, such as a substitution-cost matrix.
- Keep the cost matrix, indel cost, normalization, and missing-value handling together in your project notes; these choices are part of the statistical specification, not only coding details.
- When validating against TraMineR, compare both the distance matrix and the cost matrix used to produce it.

## See Also

- [`get_distance_matrix()`](/en/function-library/get-distance-matrix) is the main entry point these helpers support.
- [Matrices in Dissimilarity Measures](/en/tutorials/matrix-in-dissimilarity-measures) explains the matrices involved.

## Authors

Code: Yuqi Liang

