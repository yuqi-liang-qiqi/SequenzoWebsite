# Functions Comparison

This page gives a compact map for users who know the R sequence-analysis ecosystem and want to find the closest Sequenzo entry points in Python.

Sequenzo is not a line-by-line clone of TraMineR, WeightedCluster, TraMineRextras, or seqHMM. The goal is to preserve the main analytical workflows while using Python-style objects such as `SequenceData`, NumPy arrays, pandas data frames, and matplotlib-based plotting.

## Core Workflow

| R workflow | Sequenzo entry point | Where to read next |
| --- | --- | --- |
| Define state sequences with `seqdef()` | `SequenceData` | [SequenceData](/en/function-library/sequence-data) |
| Compute sequence distances with `seqdist()` | `get_distance_matrix()` | [Get Distance Matrix](/en/function-library/get-distance-matrix) |
| Hierarchical clustering with a distance matrix | `Cluster` / `ClusterResults` | [Hierarchical Clustering](/en/function-library/hierarchical-clustering) |
| PAM / medoid clustering | `KMedoids` | [KMedoids](/en/function-library/KMedoids) |
| Cluster quality evaluation | `ClusterQuality` | [Cluster Quality](/en/function-library/cluster-quality) |

## Module-Level Mapping Pages

| Topic | Mapping page |
| --- | --- |
| Sequence indicators | [Sequence Characteristics: Sequenzo-TraMineR Mapping](/en/sequence-characteristics-indicators/traminer-function-mapping) |
| Statistical summaries | [Statistical Helpers: Sequenzo and TraMineR Mapping](/en/statistics/traminer-function-mapping) |
| Visualization | [Visualization Functions: Sequenzo and TraMineR Mapping](/en/visualization/traminer-function-mapping) |
| Event sequences | [Event Sequences: Sequenzo and TraMineR Mapping](/en/event-sequences/traminer-function-mapping) |
| Multidomain / polyadic analysis | [Multidomain: Sequenzo and TraMineR Mapping](/en/multidomain/traminer-function-mapping) |
| Discrepancy analysis | [Discrepancy Analysis: Sequenzo and TraMineR Mapping](/en/discrepancy-analysis/traminer-function-mapping) |
| Group comparison | [Group Comparison: Sequenzo and TraMineRextras Mapping](/en/group-comparison/traminer-function-mapping) |
| Hidden Markov models | [Markov Chain Models: Sequenzo and seqHMM Mapping](/en/markov-chain-models/seqhmm-function-mapping) |

## Naming Notes

- R arguments such as `alphabet` are often represented by `states` in Sequenzo, because `SequenceData` stores the categorical state space explicitly.
- Sequenzo uses snake_case function names, while R functions often use compact names such as `seqdss`, `seqdur`, or `dissassoc`.
- Many Sequenzo pages include a local "R Counterpart" or "TraMineR Parameter Mapping" section for argument-level translation.

For a runnable end-to-end path, start with the [Quickstart](/en/basics/quickstart) and then use the [Typical Workflow](/en/basics/typical-workflow).
