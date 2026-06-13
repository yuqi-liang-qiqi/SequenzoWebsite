# Hierarchical and Relational Sequence Analysis

Hierarchical and relational sequence analysis studies trajectories defined by a pair of entities, such as region by technology, country by product, organization by role, or drug by indication. Each observed sequence is a level-1 by level-2 pair followed over time.

The module is designed for two linked questions:

1. **Decomposition:** How much similarity among pair trajectories comes from level-1 structure, level-2 structure, or the specific pair?
2. **Typology:** What common pair-level trajectory types appear at scale?

## At a Glance

| Question | Guidance |
| --- | --- |
| Use this when | Each trajectory belongs to a meaningful pair of entities, such as region by technology or country by product. |
| You need before starting | A long panel with level-1 ID, level-2 ID, time, and state columns. |
| Do not use this when | Your data are ordinary one-person sequences with no relational or multilevel pair structure. |
| Next step | Start with `run_hierarchical_sequence_analysis()` for a full workflow, or `cluster_pair_trajectories()` for scalable typologies. |

## Core Workflow

| Step | Function or class | Purpose |
| --- | --- | --- |
| Build relational sequences | `make_relational_sequences()`, `RelationalSequenceData` | Convert a long panel into pair trajectories |
| Validate and describe data | `validate_relational_sequence_data()`, `summarize_distance_by_structure()` | Check panel structure and distance patterns |
| Compute distances | `compute_relational_distance_matrix()`, `RelationalDistanceMatrix` | Pairwise distances among relational trajectories |
| Decompose structure | `hierarchical_sequence_discrepancy()`, `additive_sequence_discrepancy()` | Estimate level and residual shares |
| Run crossed decomposition | `crossed_sequence_discrepancy()` | Estimate crossed level effects |
| Test effects | `permutation_test_level_effect()`, `permutation_test_crossed_effect()` | Permutation inference |
| Find pair typologies | `cluster_pair_sequences()`, `cluster_pair_trajectories()` | Cluster pair trajectories |
| Cluster level profiles | `cluster_level_1_profiles()`, `cluster_level_2_profiles()` | Summarize higher-level profiles |
| Flag exceptional pairs | `compute_pair_residuals()` | Identify pair-specific deviations |
| Run the full workflow | `run_hierarchical_sequence_analysis()` | End-to-end analysis |

## Import

```python
from sequenzo.hierarchical import (
    make_relational_sequences,
    compute_relational_distance_matrix,
    hierarchical_sequence_discrepancy,
    compute_pair_residuals,
    cluster_pair_trajectories,
    run_hierarchical_sequence_analysis,
)
```

## End-to-End Example

```python
from sequenzo.hierarchical import run_hierarchical_sequence_analysis

result = run_hierarchical_sequence_analysis(
    data,
    level_1_col="region_id",
    level_2_col="technology_id",
    time_col="year",
    state_col="state",
    distance_method="HAM",
    n_perm=999,
)

print(result.summary())
result.plot_decomposition()
result.plot_outliers()
```

The result object stores decomposition output, optional distance matrices, typology output, and plotting helpers when the selected analysis mode supports them.

## Exact, Sampled, and Typology-Only Modes

| Mode | Use when | Notes |
| --- | --- | --- |
| `exact` | The full pairwise distance matrix is feasible | Enables full decomposition, profiles, residuals, and outlier tables |
| `sampled` | The number of pair trajectories is too large for a full matrix | Uses stratified pairwise sampling for scalable structural summaries |
| `typology_only` | You need common pair trajectory types at scale | Uses CLARA-style typology without storing a full distance matrix |

For large relational panels, start with `typology_only` or `sampled`, then run an exact analysis on a smaller subset if interpretation requires pair-level residuals.

In sampled mode, `sample_pairwise_distances()` constructs the stratified pair sample and `sequence_discrepancy_by_level_sampled()` reports scalable structural summaries without storing a full distance matrix.

## Typology at Scale

```python
from sequenzo.hierarchical import make_relational_sequences, cluster_pair_trajectories

sequences = make_relational_sequences(
    data,
    level_1_col="region_id",
    level_2_col="technology_id",
    time_col="year",
    state_col="state",
)

typology = cluster_pair_trajectories(
    sequences,
    k=8,
    algorithm="clara",
    sample_size=5000,
    n_iterations=100,
    distance_method="HAM",
)

print(typology.to_dataframe())
```

## Interpreting Decomposition

The additive decomposition distinguishes marginal and pair-specific structure:

- `level_1_share` and `level_2_share` are partial or marginal quantities.
- `joint_share + residual_share = 1` is the variance-style split.
- A high residual share suggests that specific level-1 by level-2 pairs matter beyond either level alone.

## Result Objects

Important result classes include:

- `HierarchicalSequenceResult`
- `CrossedDecompositionResult`
- `HierarchicalClusterResult`
- `RelationalSequenceData`
- `RelationalDistanceMatrix`

These classes are usually created by workflow functions rather than instantiated manually.

## Authors

Code: Yuqi Liang

