# Normalization in Sequence Analysis

Raw sequence distances are measured on the scale created by your distance method, sequence length, alphabet, and cost settings. A distance of `10` can mean a large difference for short sequences and a modest difference for long sequences. Normalization rescales distances so that comparisons are easier to read across sequences, groups, or study contexts.

Normalization is not only a repair for unequal sequence lengths. Elzinga and Studer (2019) show that normalization also matters when the goal is to interpret distance as dissimilarity, compare cohorts or regions, or study sequences whose complexity differs across contexts. The practical question is therefore not whether normalization is good in general. The question is what comparison you want the distance to support.

## When to Normalize

Use normalization when raw distances would be hard to compare directly.

| Situation | Why normalization helps | Typical choice |
| --- | --- | --- |
| Sequences have different lengths | Longer sequences can accumulate larger edit costs | `norm="auto"` or a method-specific choice |
| You compare cohorts, regions, or periods | Sequence complexity can differ across contexts | `norm="auto"`; consider `norm="ElzingaStuder"` for reference-based comparisons |
| You need distance to behave like dissimilarity | A bounded scale supports statements such as similarity = 1 - distance | `norm="ElzingaStuder"` when its assumptions fit |
| You work with DSS-style sequences | Removing repeated adjacent states changes sequence length and complexity | A reference-based normalization can be useful |
| The distance method already normalizes internally | Extra normalization may not add useful information | Check the function reference before overriding |

You might keep raw distances when all sequences have the same length, come from the same context, and the analysis is exploratory. In that case, report that distances are unnormalized and explain what the raw scale means.

## What Normalization Changes

A raw distance depends on at least three design choices.

1. **Length.** More positions can create more opportunities for mismatches, insertions, or deletions.
2. **Alphabet.** A sequence with three states has a different range of possible substitutions than a sequence with ten states.
3. **Cost structure.** Optimal Matching distances depend on substitution costs (`sm`) and insertion or deletion costs (`indel`).

Normalization does not remove these design choices. It rescales the resulting distances after those choices have been made. You still need to justify the distance measure and cost settings before interpreting a normalized matrix.

## Common Normalization Methods

Sequenzo follows the normalization options exposed by `get_distance_matrix()`. The table below gives the practical reading of each option.

| Option | Main idea | Typical use |
| --- | --- | --- |
| `norm="none"` | Return raw distances | Diagnostics, exploratory checks, or when another method handles scaling |
| `norm="maxlength"` | Divide by the longer sequence length | OM, HAM, and DHD style comparisons |
| `norm="gmean"` | Normalize similarity by the geometric mean of self-similarities | LCS, LCP, and RLCP style measures |
| `norm="maxdist"` | Divide by a theoretical pairwise maximum | Spell and prefix variants where `gmean` can be unstable |
| `norm="YujianBo"` | Apply an edit-distance correction | OM variants where metric behavior matters |
| `norm="ElzingaStuder"` | Use the reference-based transformation from Elzinga and Studer (2019) | Comparisons where similarity = 1 - distance is part of the interpretation |
| `norm="auto"` | Let Sequenzo choose a method-specific option | Default recommendation when you do not need a specific normalization |

`norm="auto"` is explicit. The function signature defaults to `norm="none"`, so pass `norm="auto"` when you want Sequenzo to select a method-specific normalization.

## LCP-Family Rules

The LCP family has method-specific normalization rules. These are enforced by the public API, so unsupported combinations now raise clear errors instead of silently producing questionable values.

| Method family | `norm="auto"` selects | Supported choices |
| --- | --- | --- |
| `LCP`, `RLCP` | `gmean` | `none`, `maxlength`, `gmean`, `maxdist`, `YujianBo`, `auto`, `ElzingaStuder` |
| `LCPspell`, `RLCPspell` | `maxdist` | `none`, `maxdist`, `auto`, `ElzingaStuder` |
| `LCPmst`, `RLCPmst` | `maxdist` | `none`, `gmean`, `maxdist`, `YujianBo`, `auto`, `ElzingaStuder` |
| `LCPprod`, `RLCPprod` | `none` | `none`, `auto` |

For `LCPspell` and `RLCPspell`, `duration_ref` is a design-level reference scale. Use the observation window or another pre-specified upper bound. If `norm="maxdist"` and `expcost>0`, Sequenzo checks that `duration_ref` is at least the largest observed active spell duration.

`LCPprod` and `RLCPprod` return raw squared-duration dissimilarities. They are useful for the product-duration definition, but they are not normalized to a bounded scale.

## Using Normalization in Sequenzo

The example below uses `SequenceData(...)`, which is the constructor exposed by the current package source.

```python
from sequenzo import SequenceData, get_distance_matrix

time_cols = ["T1", "T2", "T3", "T4"]
states = ["Education", "Employment", "Unemployment"]

seqdata = SequenceData(
    data=df,
    time=time_cols,
    id_col="id",
    states=states,
)

dist_auto = get_distance_matrix(
    seqdata=seqdata,
    method="OM",
    sm="CONSTANT",
    indel=1,
    norm="auto",
)
```

For a reference-based normalization, pass `norm="ElzingaStuder"` and specify the reference sequence by index. The reference should match the question. A medoid, a template sequence, or a deliberately chosen baseline can all be defensible choices, but they answer different questions.

```python
dist_ref = get_distance_matrix(
    seqdata=seqdata,
    method="OM",
    sm="CONSTANT",
    indel=1,
    norm="ElzingaStuder",
    normalization_reference_index=0,
)
```

With `norm="ElzingaStuder"`, the normalized distance from the reference object to any non-reference object is scaled through the reference-based formula. This can be useful when the analysis asks how far sequences depart from a selected baseline.

When using `norm="ElzingaStuder"`, prefer computing the full pairwise matrix and setting `normalization_reference_index`. A single `refseq` is allowed, but all non-zero distances to that same reference collapse to 1 after the reference-based post-processing, so it is usually less informative.

## How to Choose

Start with the research question, then choose the distance, costs, and normalization in that order.

| Research need | Practical choice |
| --- | --- |
| Standard OM workflow with no special normalization argument | Use `method="OM"`, specify `sm` and `indel`, and set `norm="auto"` |
| Direct comparison with TraMineR-style OM defaults | Consider `norm="maxlength"` and report the cost settings |
| LCS or common-prefix comparisons | Use `norm="auto"` or inspect the `gmean` choice explicitly |
| Spell-based variants | Check the method family: OM-style spell measures often use `YujianBo`; LCPspell and LCPmst use `maxdist`; LCPprod remains raw |
| A baseline or template is substantively meaningful | Consider `norm="ElzingaStuder"` with a named reference |

Avoid using normalization to hide missing-data problems. If sequences are censored or contain structural gaps, address that in preprocessing or sensitivity analysis first. Normalization can make distances comparable, but it does not decide whether the observed data are comparable.

## Reporting Normalized Distances

A short report should state:

1. the distance method;
2. substitution and indel costs, when relevant;
3. the normalization method;
4. the reference sequence, if `norm="ElzingaStuder"` is used;
5. whether sensitivity checks with another normalization changed the substantive conclusion.

For example:

> We computed Optimal Matching distances with constant substitution cost `2`, indel cost `1`, and `norm="auto"`. As a sensitivity check, we repeated the analysis with raw distances and with `norm="ElzingaStuder"` using the sample medoid as reference. The main cluster interpretation was unchanged.

## See Also

- [Dissimilarity Measures](./dissimilarity-measures.md) explains the distances being normalized.
- [Matrices in Dissimilarity Measures](./matrix-in-dissimilarity-measures.md) separates the matrices involved.
- [`get_distance_matrix()`](/en/function-library/get-distance-matrix) documents the `norm` parameter.

## References

Abbott, A., & Forrest, J. (1986). Optimal matching methods for historical sequences. *Journal of Interdisciplinary History*, 16(3), 471-494. https://doi.org/10.2307/204500

Elzinga, C. H., & Studer, M. (2015). Spell sequences, state proximities, and distance metrics. *Sociological Methods & Research*, 44(1), 3-47. https://doi.org/10.1177/0049124114540707

Elzinga, C. H., & Studer, M. (2019). Normalization of distance and similarity in sequence analysis. *Sociological Methods & Research*, 48(4), 877-904. https://doi.org/10.1177/0049124117701487

Gabadinho, A., Ritschard, G., Muller, N. S., & Studer, M. (2011). Analyzing and visualizing state sequences in R with TraMineR. *Journal of Statistical Software*, 40(4), 1-37. https://doi.org/10.18637/jss.v040.i04

Studer, M., & Ritschard, G. (2016). What matters in differences between life trajectories: A comparative review of sequence dissimilarity measures. *Journal of the Royal Statistical Society: Series A*, 179(2), 481-511. https://doi.org/10.1111/rssa.12125

*Author: Yuqi Liang*
