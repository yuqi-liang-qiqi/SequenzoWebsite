# `bootstrap_model()`

`bootstrap_model()` resamples sequences with replacement, refits the model on each bootstrap sample, and collects parameter estimates for uncertainty quantification.

## Function Usage

```python
bootstrap_model(
    model,
    n_sim=100,
    method="nonparametric",
    random_state=None,
    verbose=True,
    n_jobs=1
)
```

## seqHMM Parameter Mapping

| Sequenzo | seqHMM `bootstrap_coefs()` |
| --- | --- |
| `model` | Fitted `hmm`, `mhmm`, or `nhmm` |
| `n_sim` | Number of bootstrap replicates |
| `method="nonparametric"` | Resample sequences (nonparametric bootstrap) |
| Return `summary` | Percentile confidence intervals |

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `model` | ✓ | `HMM` / `MHMM` / `NHMM` | Fitted model. |
| `n_sim` | ✗ | `int` | Bootstrap replicates. Default `100`. |
| `method` | ✗ | `str` | `"nonparametric"` (default). `"parametric"` not yet implemented. |
| `random_state` | ✗ | `int` / `None` | RNG seed. |
| `verbose` | ✗ | `bool` | Show progress bar when `tqdm` is available. Default `True`. |
| `n_jobs` | ✗ | `int` | Parallel jobs (not yet implemented; always 1). |

## Returns

A `dict`:

| Key | Description |
| --- | --- |
| `bootstrap_samples` | List of parameter dicts per replicate |
| `original_model` | Input fitted model |
| `n_sim`, `method` | Settings used |
| `n_successful` | Number of bootstrap refits that completed successfully |
| `summary` | Means, standard deviations, and percentile CIs (e.g. `ci_95`) |

## Example

Assume `seq` is a prepared [`SequenceData`](../function-library/sequence-data.md) object with the observed sequences you want to model.

```python
from sequenzo.seqhmm import build_hmm, fit_model, bootstrap_model

hmm = build_hmm(seq, n_states=4, random_state=42)
hmm = fit_model(hmm)

boot = bootstrap_model(hmm, n_sim=100, verbose=True)
ci = boot["summary"]["initial_probs"]["ci_95"]
print(ci)
```

## R Counterpart

- **Closest R function:** seqHMM `bootstrap_coefs()`
- **Mapping note:** R's function targets NHMM/MNHMM coefficients; Sequenzo bootstraps full refits for HMM, MHMM, and NHMM.

## Notes

- Computationally expensive: each replicate refits the full model.
- Failed refits on a replicate are skipped silently in the bootstrap loop.
- Use moderate `n_sim` (50–200) for exploratory intervals; increase for publication-grade precision.

## See Also

- [Markov Chain Models Introduction](/en/markov-chain-models/introduction) maps the full HMM-family workflow.
- [Model Comparison](/en/markov-chain-models/model-comparison) helps choose between fitted models.
- [Sequenzo and seqHMM Mapping](/en/markov-chain-models/seqhmm-function-mapping) gives the R correspondence.

## Authors

Code: Yuqi Liang, Yapeng Wei

Documentation: Yuqi Liang

## References

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. *Journal of Statistical Software*, 88(3), 1–32.
