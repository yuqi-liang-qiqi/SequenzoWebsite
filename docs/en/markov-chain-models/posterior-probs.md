# `posterior_probs()`

`posterior_probs()` computes the probability of each hidden state at each time point, given the observed sequence. It uses the forward–backward algorithm and is useful when you need uncertainty about latent states, not just a single Viterbi path.

## Function Usage

```python
posterior_probs(
    model,
    newdata=None
)
```

## seqHMM Parameter Mapping

| Sequenzo | seqHMM `posterior_probs()` |
| --- | --- |
| `model` | Fitted `hmm` object |
| `newdata` | Optional new `stslist` |
| Return value | Long-format table of state probabilities |

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `model` | ✓ | `HMM` | Fitted model from [`build_hmm()`](./build-hmm.md) + [`fit_model()`](./fit-model.md). |
| `newdata` | ✗ | `SequenceData` / `None` | Sequences to score. If `None`, uses training data on the model. |

## What It Returns

A pandas `DataFrame` in long format with columns:

| Column | Description |
| --- | --- |
| `id` | Sequence index (0-based) |
| `time` | Time index within the sequence (1-based, matching R convention) |
| `state` | Hidden state index (0-based) |
| `probability` | Posterior probability of that state at that time point |

For each `(id, time)` pair, probabilities over `state` sum to 1.

## Example

```python
from sequenzo.seqhmm import build_hmm, fit_model, posterior_probs

hmm = build_hmm(seq, n_states=4, random_state=42)
hmm = fit_model(hmm)

probs = posterior_probs(hmm)
print(probs.head())

# Most probable state at each time point
idx = probs.groupby(["id", "time"])["probability"].idxmax()
most_probable = probs.loc[idx]
```

## R Counterpart

- **Closest R function:** seqHMM `posterior_probs()`
- **Mapping note:** Same long-format logic; time indexing is 1-based in both interfaces.

## Notes

- Requires a fitted model.
- Compare with [`predict()`](./predict.md): Viterbi gives one best path; posterior probabilities can split mass across states when the model is uncertain.
- For mixture models, use [`posterior_probs_mhmm()`](./posterior-probs-mhmm.md) for cluster membership.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. *Journal of Statistical Software*, 88(3), 1–32.
