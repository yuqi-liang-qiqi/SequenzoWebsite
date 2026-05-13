# `predict_mhmm()`

`predict_mhmm()` assigns each sequence to its most likely mixture cluster (hard classification).

## Function Usage

```python
predict_mhmm(
    model,
    newdata=None
)
```

## seqHMM Parameter Mapping

| Sequenzo | seqHMM |
| --- | --- |
| `model` | Fitted `mhmm` object |
| `newdata` | New `stslist` |
| Return value | `most_probable_cluster()` |

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `model` | ✓ | `MHMM` | Fitted model from [`build_mhmm()`](./build-mhmm.md) + [`fit_mhmm()`](./fit-mhmm.md). |
| `newdata` | ✗ | `SequenceData` / `None` | Sequences to classify. Default: training data. |

## What It Returns

A NumPy array of cluster indices (0-based), one value per sequence.

For probabilistic membership, use [`posterior_probs_mhmm()`](./posterior-probs-mhmm.md).

## Example

```python
from sequenzo.seqhmm import build_mhmm, fit_mhmm, predict_mhmm

mhmm = build_mhmm(seq, n_clusters=3, n_states=4, random_state=42)
mhmm = fit_mhmm(mhmm)

labels = predict_mhmm(mhmm)
print(labels)  # e.g. [0, 2, 1, 0, ...]
```

## R Counterpart

- **Closest R function:** seqHMM `most_probable_cluster()`
- **Mapping note:** Returns integer cluster indices; map to `cluster_names` on the model if you set them at build time.

## Notes

- Requires a fitted model.
- Hard assignments ignore uncertainty; prefer [`posterior_probs_mhmm()`](./posterior-probs-mhmm.md) when sequences sit near cluster boundaries.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. *Journal of Statistical Software*, 88(3), 1–32.
