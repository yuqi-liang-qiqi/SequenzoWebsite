# Model Comparison: `aic()`, `bic()`, and `compare_models()`

After fitting one or more HMMs, use information criteria to compare specifications (for example different numbers of hidden states or clusters). Lower AIC or BIC generally indicates a better trade-off between fit and complexity.

## `aic()`

### Function Usage

```python
aic(model, log_likelihood=None)
```

### seqHMM Mapping

Equivalent to `stats::AIC(logLik(model))` in R after fitting a seqHMM object.

### Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `model` | ✓ | `HMM` / `MHMM` / `NHMM` / `MNHMM` | Fitted model. |
| `log_likelihood` | ✗ | `float` / `None` | Override log-likelihood; default uses `model.log_likelihood`. |

### Returns

`float`: AIC = −2 × log-likelihood + 2 × n_parameters.

---

## `bic()`

### Function Usage

```python
bic(model, log_likelihood=None)
```

### seqHMM Mapping

Equivalent to `stats::BIC(logLik(model))` in R.

### Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `model` | ✓ | `HMM` / `MHMM` / `NHMM` / `MNHMM` | Fitted model. |
| `log_likelihood` | ✗ | `float` / `None` | Override log-likelihood. |

### Returns

`float`: BIC = −2 × log-likelihood + log(n_observations) × n_parameters.

BIC penalizes complexity more strongly than AIC when the sample is large.

---

## `compare_models()`

### Function Usage

```python
compare_models(models, criterion="BIC")
```

### seqHMM Mapping

No single exported R function; typical workflow compares `logLik`, `AIC`, and `BIC` across fitted models manually.

### Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `models` | ✓ | `list` | List of fitted `HMM`, `MHMM`, `NHMM`, or `MNHMM` objects. |
| `criterion` | ✗ | `str` | `"AIC"` or `"BIC"`. Default `"BIC"`. |

### Returns

A `dict`:

| Key | Description |
| --- | --- |
| `criterion` | `"AIC"` or `"BIC"` |
| `models` | Sorted list of dicts with `model`, `log_likelihood`, `n_parameters`, `n_observations`, and criterion value |
| `best_model` | Label of the lowest-criterion model (`"Model 1"`, …) |

---

## Helper Functions

### `compute_n_parameters(model)`

Counts model parameters used internally by `aic()` and `bic()`. For basic HMM and MHMM probability matrices, this follows the usual simplex-constraint logic. For NHMM and MNHMM specifications, counts reflect the coefficient arrays or fixed probability arrays represented by the current Sequenzo object.

### `compute_n_observations(model)`

Counts effective observations. For multichannel HMM, each fully observed time point counts as one observation (channels are pooled per seqHMM convention).

---

## Example: Choose the Number of Hidden States

```python
from sequenzo import SequenceData, load_dataset
from sequenzo.seqhmm import build_hmm, fit_model, aic, bic, compare_models

df = load_dataset("mvad")
time_cols = list(df.columns[14:])
states = ["employment", "FE", "HE", "joblessness", "school", "training"]
seq = SequenceData(df, time=time_cols, states=states)

models = []
for n in [3, 4, 5, 6]:
    hmm = build_hmm(seq, n_states=n, random_state=42)
    hmm = fit_model(hmm, verbose=False)
    models.append(hmm)

comparison = compare_models(models, criterion="BIC")
print(comparison["best_model"])

for i, m in enumerate(models):
    print(f"n_states={3+i}: AIC={aic(m):.1f}, BIC={bic(m):.1f}")
```

## Notes

- All models must be fitted before comparison.
- Compare models fit on the **same data** and intended for the **same question**. Avoid mixing HMM, MHMM, NHMM, and MNHMM results unless the comparison directly answers your model-selection question.
- AIC/BIC are safest when the candidate models use comparable estimation paths. Interpret comparisons involving fixed-probability MNHMMs or very different covariate specifications with care.
- BIC is often preferred for choosing the number of states/clusters; AIC can be less conservative.

## See Also

- [Markov Chain Models Introduction](/en/markov-chain-models/introduction) maps the full HMM-family workflow.
- [Model Comparison](/en/markov-chain-models/model-comparison) helps choose between fitted models.
- [Sequenzo and seqHMM Mapping](/en/markov-chain-models/seqhmm-function-mapping) gives the R correspondence.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. *Journal of Statistical Software*, 88(3), 1–32.
