# Timing Uncertainty

Timing uncertainty analysis asks how sensitive sequence results are to possible errors in the reported timing of transitions. This matters when states are measured in surveys, administrative panels, or retrospective histories where a transition may be recorded slightly earlier or later than it actually happened.

Sequenzo's first uncertainty workflow follows Ritschard and Liao's Monte Carlo approach for transition-timing errors. It repeatedly perturbs transition timing, recomputes distances, and summarizes how stable the pairwise distance matrix is.

## At a Glance

| Question | Guidance |
| --- | --- |
| Use this when | Transition timing may be measured with error and distance-based conclusions need a robustness check. |
| You need before starting | A `SequenceData` object and a distance specification that already makes substantive sense. |
| Do not use this when | The problem is missing states, sampling design, or model uncertainty rather than transition timing. |
| Next step | Compare the uncertainty summary with your clustering, discrepancy, or group-comparison results. |

## Main Workflow

| Step | Function | Output |
| --- | --- | --- |
| Simulate timing perturbations | `get_timing_perturbed_sequences()` | Replicated `SequenceData` objects |
| Compute distances for replicates | `get_distance_matrices_per_replicate()` | List of distance matrices |
| Summarize replicate distance matrices | `get_distance_matrix_stability()` | Mean and SD matrices |
| Estimate distance uncertainty directly | `get_distance_timing_uncertainty()` | `DistMCResult` |
| Print or summarize results | `print_distance_uncertainty()`, `summarize_distance_uncertainty()` | Console and table summaries |
| Plot uncertainty | `plot_distance_uncertainty_heatmap()` | Heatmap |
| Inspect timing-error probabilities | `get_timing_error_distribution()` | Shift-probability vector |

## Import

```python
from sequenzo import (
    get_timing_perturbed_sequences,
    get_timing_error_distribution,
    get_distance_matrices_per_replicate,
    get_distance_matrix_stability,
    get_distance_timing_uncertainty,
    print_distance_uncertainty,
    summarize_distance_uncertainty,
    plot_distance_uncertainty_heatmap,
)
```

## Quick Example

```python
from sequenzo import (
    get_distance_timing_uncertainty,
    print_distance_uncertainty,
    summarize_distance_uncertainty,
)

result = get_distance_timing_uncertainty(
    seqdata,
    method="LCS",
    J=1,
    R=50,
    model="keep.dss",
    n_jobs=-1,
    rng=25,
)

print_distance_uncertainty(result)
summary = summarize_distance_uncertainty(result)
```

`J` controls the size or distribution of timing shifts. `R` controls the number of Monte Carlo replicates.

## Perturbed Sequences First

If you want to inspect the perturbed datasets before computing distances:

```python
from sequenzo import get_timing_perturbed_sequences

replicates = get_timing_perturbed_sequences(
    seqdata,
    J=1,
    R=10,
    include_obs=True,
    model="keep.dss",
)
```

Then pass the replicate sequence sets into distance-matrix workflows.

## Key Parameters

| Parameter | Meaning |
| --- | --- |
| `J` | Maximum timing shift, or an odd-length probability vector over possible shifts |
| `R` | Number of Monte Carlo replicates |
| `model` | Timing-error model: `"keep.dss"`, `"indep"`, or `"relative"` |
| `random_engine` | `"numpy"` by default; `"r"` for R random-draw parity |
| `n_jobs` | Parallel workers for distance-uncertainty estimation; `-1` uses all available cores |

Use `random_engine="r"` only when you need parity with the R implementation; it requires serial execution.

`get_timing_error_distribution()` is useful when you want to inspect the implied probability distribution over timing shifts before running the full Monte Carlo workflow.

## Interpreting Results

Timing uncertainty does not say whether one distance method is correct. It asks whether your substantive conclusions are stable under plausible transition-timing errors.

Use this workflow when:

- important transitions are reported at coarse intervals;
- respondents may round or misremember event timing;
- administrative records may lag actual transitions;
- clustering or group comparison results depend on small distance differences;
- you want to report a robustness check for timing measurement error.

## Related Pages

- [`get_distance_matrix()`](/en/function-library/get-distance-matrix)
- [Dissimilarity Measures](/en/tutorials/dissimilarity-measures)
- [Discrepancy Analysis](/en/discrepancy-analysis/introduction)
- [Group Comparison](/en/group-comparison/conceptual-guide)

## See Also

- [Big Data Tools](/en/big-data/introduction) explains scaling decisions that often accompany uncertainty checks.
- [Typical Workflow](/en/basics/typical-workflow) shows where this method fits in the full analysis.

## Authors

Code: Yuqi Liang
