# `predict()`

`predict()` decodes the most likely hidden-state path for each sequence using the Viterbi algorithm. This is the standard way to assign a latent regime label at every time point after fitting an HMM.

## Function Usage

```python
predict(
    model,
    newdata=None
)
```

## seqHMM Parameter Mapping

| Sequenzo | seqHMM |
| --- | --- |
| `model` | Fitted `hmm` object |
| `newdata` | New observed sequences (`stslist`) |
| Return value | Closest to `hidden_paths()` / internal Viterbi decoding |

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `model` | ✓ | `HMM` | Fitted model from [`build_hmm()`](./build-hmm.md) + [`fit_model()`](./fit-model.md). |
| `newdata` | ✗ | `SequenceData` / `None` | Sequences to decode. If `None`, uses the training `observations` stored on the model. |

## Returns

A NumPy array of predicted hidden-state indices. Values are **0-based** state indices, flattened across all sequences and time points (concatenated in sequence order).

To recover per-sequence paths, split the array using `model.sequence_lengths`.

For soft (probabilistic) assignments, use [`posterior_probs()`](./posterior-probs.md) instead.

## Example

Assume `seq` is a prepared [`SequenceData`](../function-library/sequence-data.md) object with the observed sequences you want to model.

```python
from sequenzo.seqhmm import build_hmm, fit_model, predict

hmm = build_hmm(seq, n_states=4, random_state=42)
hmm = fit_model(hmm)

# Most likely hidden state at each time point (all sequences concatenated)
paths = predict(hmm)

# Split into per-sequence paths
import numpy as np
offset = 0
for i, length in enumerate(hmm.sequence_lengths):
    seq_path = paths[offset : offset + length]
    offset += length
    print(f"Sequence {i}: {seq_path}")
```

## R Counterpart

- **Closest R function:** seqHMM `hidden_paths()`
- **Mapping note:** R returns a list aligned with input sequences; Sequenzo returns one flat array, split by `sequence_lengths`.

## Notes

- Raises an error if the model has not been fitted (`log_likelihood` is `None`).
- Viterbi paths are **hard** assignments (one state per time point). They can differ from the state with highest posterior probability at isolated time points.
- For new data, pass a `SequenceData` object with the same alphabet as the training data.

## See Also

- [Markov Chain Models Introduction](/en/markov-chain-models/introduction) maps the full HMM-family workflow.
- [Model Comparison](/en/markov-chain-models/model-comparison) helps choose between fitted models.
- [Sequenzo and seqHMM Mapping](/en/markov-chain-models/seqhmm-function-mapping) gives the R correspondence.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. *Journal of Statistical Software*, 88(3), 1–32.
