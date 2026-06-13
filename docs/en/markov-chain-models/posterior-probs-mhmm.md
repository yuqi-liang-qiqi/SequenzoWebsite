# `posterior_probs_mhmm()`

`posterior_probs_mhmm()` computes the probability that each sequence belongs to each mixture cluster, given its observed trajectory.

## Function Usage

```python
posterior_probs_mhmm(
    model,
    newdata=None,
    compress=False
)
```

## seqHMM Parameter Mapping

| Sequenzo | seqHMM `posterior_cluster_probabilities()` |
| --- | --- |
| `model` | Fitted `mhmm` object |
| `newdata` | Optional new sequences |
| Return value | Long-format cluster probabilities |

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `model` | ✓ | `MHMM` | Fitted mixture model. |
| `newdata` | ✗ | `SequenceData` / `None` | Sequences to score. Default: training data. |
| `compress` | ✗ | `bool` | Reuse likelihoods for repeated sequences when supported. Default `False`. |

## Returns

A pandas `DataFrame` with columns:

| Column | Description |
| --- | --- |
| `id` | Sequence identifier from `SequenceData.ids` when available, otherwise the sequence index |
| `cluster` | Cluster name or label from the fitted model |
| `probability` | Posterior probability of that cluster for the sequence |

For each `id`, probabilities over `cluster` sum to 1.

## Example

Assume `seq` is a prepared [`SequenceData`](../function-library/sequence-data.md) object with the observed sequences you want to model.

```python
from sequenzo.seqhmm import build_mhmm, fit_mhmm, posterior_probs_mhmm

mhmm = build_mhmm(seq, n_clusters=3, n_states=4, random_state=42)
mhmm = fit_mhmm(mhmm)

post = posterior_probs_mhmm(mhmm, compress=False)
print(post.head())

# Sequences with ambiguous membership (max prob < 0.7)
import pandas as pd
max_prob = post.groupby("id")["probability"].max()
ambiguous = max_prob[max_prob < 0.7].index.tolist()
```

## R Counterpart

- **Closest R function:** seqHMM `posterior_cluster_probabilities()`
- **Mapping note:** Same interpretation as R's cluster-level posteriors (one row per sequence × cluster).

## Notes

- Requires a fitted model.
- Compare with [`predict_mhmm()`](./predict-mhmm.md) for hard cluster labels.

## See Also

- [Markov Chain Models Introduction](/en/markov-chain-models/introduction) maps the full HMM-family workflow.
- [Model Comparison](/en/markov-chain-models/model-comparison) helps choose between fitted models.
- [Sequenzo and seqHMM Mapping](/en/markov-chain-models/seqhmm-function-mapping) gives the R correspondence.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. *Journal of Statistical Software*, 88(3), 1–32.
