# `build_hmm()`

`build_hmm()` creates an unfitted Hidden Markov Model from `SequenceData`. You specify the number of latent states (or provide starting probabilities), then fit the model with [`fit_model()`](./fit-model.md).

## Function Usage

```python
build_hmm(
    observations,
    n_states=None,
    initial_probs=None,
    transition_probs=None,
    emission_probs=None,
    state_names=None,
    channel_names=None,
    random_state=None
)
```

## seqHMM Parameter Mapping

| Sequenzo | seqHMM `build_hmm()` |
| --- | --- |
| `observations` | Observed sequences (`stslist` or list of `stslist` for multichannel) |
| `n_states` | Number of hidden states |
| `initial_probs` | Initial state distribution |
| `transition_probs` | Transition matrix |
| `emission_probs` | Emission matrix (or list of matrices per channel) |
| `state_names` | Names for hidden states |
| `channel_names` | Channel labels (multichannel only) |
| `random_state` | Random initialization seed |

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `observations` | ✓ | `SequenceData` / `List[SequenceData]` | Observed sequences. Pass a list for multichannel HMM (one `SequenceData` per channel). |
| `n_states` | ✗* | `int` / `None` | Number of hidden states. Required unless all probability matrices are supplied. |
| `initial_probs` | ✗ | `ndarray` / `None` | Initial state probabilities, shape `(n_states,)`. Random uniform if omitted. |
| `transition_probs` | ✗ | `ndarray` / `None` | Transition matrix, shape `(n_states, n_states)`. Rows must sum to 1. |
| `emission_probs` | ✗ | `ndarray` / `List[ndarray]` / `None` | Emission matrix `(n_states, n_symbols)` for single-channel, or one matrix per channel for multichannel. |
| `state_names` | ✗ | `List[str]` / `None` | Labels for hidden states. Default: `"State 1"`, `"State 2"`, … |
| `channel_names` | ✗ | `List[str]` / `None` | Labels for channels (multichannel only). |
| `random_state` | ✗ | `int` / `None` | Seed for random initialization of unspecified parameters. |

\*Provide `n_states` or at least one of `initial_probs`, `transition_probs`, `emission_probs` so the model dimension is identifiable.

## Returns

An `HMM` object (not yet fitted). Key attributes after building:

- `n_states`, `n_symbols`, `n_channels`, `n_sequences`
- `initial_probs`, `transition_probs`, `emission_probs` (starting values)
- `observations` (training data reference)
- `log_likelihood` is `None` until you call `fit_model()`

## Example

```python
from sequenzo import SequenceData, load_dataset
from sequenzo.seqhmm import build_hmm

df = load_dataset("mvad")
time_cols = list(df.columns[14:])
states = ["employment", "FE", "HE", "joblessness", "school", "training"]

seq = SequenceData(
    df,
    time=time_cols,
    states=states,
)

# Step 1: build with 4 hidden states
hmm = build_hmm(seq, n_states=4, random_state=42)

# Step 2: fit (see fit_model.md)
from sequenzo.seqhmm import fit_model
hmm = fit_model(hmm, n_iter=100, verbose=True)
```

### Multichannel example

```python
hmm_mc = build_hmm(
    [seq_marriage, seq_parenthood, seq_residence],
    n_states=5,
    channel_names=["Marriage", "Parenthood", "Residence"],
    random_state=42,
)
```

## R Counterpart

- **Closest R function:** seqHMM `build_hmm()`
- **Mapping note:** Multichannel list input maps to a list of TraMineR `stslist` objects.

## Notes

- Building does not estimate parameters; always follow with [`fit_model()`](./fit-model.md).
- For multichannel models, each channel can have its own alphabet size; emission_probs is a list of matrices.
- If initialization is unstable, try different `random_state` values or supply custom starting probabilities.

## See Also

- [Markov Chain Models Introduction](/en/markov-chain-models/introduction) maps the full HMM-family workflow.
- [Model Comparison](/en/markov-chain-models/model-comparison) helps choose between fitted models.
- [Sequenzo and seqHMM Mapping](/en/markov-chain-models/seqhmm-function-mapping) gives the R correspondence.

## Authors

Code: Yuqi Liang, Yapeng Wei

Documentation: Yuqi Liang

## References

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. *Journal of Statistical Software*, 88(3), 1–32.
