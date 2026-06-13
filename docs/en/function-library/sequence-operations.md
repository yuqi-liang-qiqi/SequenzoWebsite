# Sequence Operations

Sequenzo includes a small set of sequence-operation helpers for reshaping, recoding, comparing, and aligning sequences. These functions are useful when you need to prepare data before distance analysis, translate TraMineR workflows into Python, or inspect pairwise relationships between individual sequences.

These helpers are lower-level than the typical workflow pages. Use them when the operation itself is the research step: recoding states, converting sequence objects to numeric matrices, finding exact sequence occurrences, or computing pairwise alignment details.

## When to Use This Page

| Task | Function |
| --- | --- |
| Turn each row into one sequence string | `concatenate_sequences()` |
| Split concatenated sequence strings back into columns | `decompose_concatenated_sequences()` |
| Insert separators into fixed-width sequence strings | `split_fixed_width_sequences()` |
| Recode state alphabets | `recode_sequence_states()` |
| Shift a sequence with missing-value padding | `shift_sequence_with_missing_padding()` |
| Convert `SequenceData` to numeric state codes | `convert_sequences_to_numeric_matrix()` |
| Compare two sequences by common prefix length | `longest_common_prefix_length()` |
| Compare two sequences by longest common subsequence length | `longest_common_subsequence_length()` |
| Find exact sequence occurrences | `find_sequence_occurrences()` |
| Inspect one optimal-matching alignment path | `pairwise_sequence_alignment()` |

## Import

Most users can import these helpers from the package top level:

```python
from sequenzo import (
    concatenate_sequences,
    decompose_concatenated_sequences,
    split_fixed_width_sequences,
    recode_sequence_states,
    shift_sequence_with_missing_padding,
    convert_sequences_to_numeric_matrix,
    longest_common_prefix_length,
    longest_common_subsequence_length,
    find_sequence_occurrences,
    pairwise_sequence_alignment,
)
```

## Basic Sequence Reshaping

```python
from sequenzo import concatenate_sequences, decompose_concatenated_sequences

combined = concatenate_sequences(seqdata, sep="-", vname="trajectory")
wide_again = decompose_concatenated_sequences(combined, sep="-")
```

`concatenate_sequences()` accepts a `SequenceData` object, a DataFrame, a NumPy array, or list-like rows. Missing values and the configured void marker can be skipped during concatenation.

Use `split_fixed_width_sequences()` when the input is a compact string such as `"AABBCC"` and each state code has the same width:

```python
split_fixed_width_sequences(["AABBCC", "AACCDD"], sl=2, sep="-")
# ["AA-BB-CC", "AA-CC-DD"]
```

## Recoding States

`recode_sequence_states()` mirrors the TraMineR `seqrecode()` idea. For `SequenceData` input, it returns a new `SequenceData` object with the recoded alphabet; for DataFrame-like input, it returns a DataFrame.

```python
from sequenzo import recode_sequence_states

recoded = recode_sequence_states(
    seqdata,
    recodes={
        "in_school": ["school", "training", "HE", "FE"],
        "in_work": ["employment"],
        "out": ["joblessness"],
    },
    otherwise="other",
)
```

This is helpful before computing distances when the original state alphabet is too detailed for the substantive question.

## Numeric Matrices and Missing Values

```python
from sequenzo import convert_sequences_to_numeric_matrix

X = convert_sequences_to_numeric_matrix(seqdata, with_missing=False)
```

State codes start at `0` in the returned NumPy array. When `with_missing=False`, missing-state codes are converted to `NaN`; when `with_missing=True`, missing states receive numeric codes like other states.

## Prefix, Subsequence, and Occurrence Helpers

```python
from sequenzo import (
    longest_common_prefix_length,
    longest_common_subsequence_length,
    find_sequence_occurrences,
)

lcp = longest_common_prefix_length(seqdata, seqdata, index1=0, index2=1)
lcs = longest_common_subsequence_length(seqdata, seqdata, index1=0, index2=1)
matches = find_sequence_occurrences(seqdata, seqdata)
```

`find_sequence_occurrences()` returns 1-based indices to stay close to TraMineR's `which(...)` convention.

## Pairwise Alignment Details

For diagnostic work, `pairwise_sequence_alignment()` exposes the actual edit path between two sequences under an optimal-matching cost setup.

```python
from sequenzo import get_substitution_cost_matrix, pairwise_sequence_alignment

sm = get_substitution_cost_matrix(seqdata, method="CONSTANT", cval=2)
alignment = pairwise_sequence_alignment(seqdata, indices=[0, 1], indel=1, sm=sm)

print(alignment.operation)
print(alignment.seq1)
print(alignment.seq2)
print(alignment.cost)
```

The tie-breaking follows TraMineR-style dynamic programming: substitution or match first, then insertion, then deletion.

## TraMineR Mapping

| TraMineR idea | Sequenzo function |
| --- | --- |
| `seqconc()` | `concatenate_sequences()` |
| `seqdecomp()` | `decompose_concatenated_sequences()` |
| `seqsep()` | `split_fixed_width_sequences()` |
| `seqrecode()` | `recode_sequence_states()` |
| `seqshift()` | `shift_sequence_with_missing_padding()` |
| `seqasnum()` | `convert_sequences_to_numeric_matrix()` |
| `seqLLCP()` | `longest_common_prefix_length()` |
| `seqLLCS()` | `longest_common_subsequence_length()` |
| `seqfind()` | `find_sequence_occurrences()` |
| `seqalign()` | `pairwise_sequence_alignment()` |

## See Also

- [Prefix and Suffix Trees](/en/sequence-characteristics-indicators/prefix-and-suffix-trees) analyze the structures these operations produce.
- [Dissimilarity Helper Functions](/en/function-library/dissimilarity-helpers) cover cost-matrix utilities.
- [`SequenceData`](/en/function-library/sequence-data) defines the objects being operated on.

## Authors

Code: Yuqi Liang


