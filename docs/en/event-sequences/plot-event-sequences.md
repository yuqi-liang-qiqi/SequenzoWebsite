# Event Sequence Plotting Functions

Sequenzo provides three dedicated plotting functions for event-sequence analysis.

## 1) `plot_event_parallel_coordinates()`

- **What it does:** Parallel-coordinate visualization of event ordering patterns.
- **TraMineR counterpart:** `seqpcplot` / `plot.seqelist(type="pc")`
- **Docs:** [`plot_event_parallel_coordinates`](./plot-event-parallel-coordinates)

## 2) `plot_subsequence_group_contrasts()`

- **What it does:** Group contrast visualization for discriminating subsequences.
- **TraMineR counterpart:** `plot.subseqelistchisq`
- **Docs:** [`plot_subsequence_group_contrasts`](./plot-subsequence-group-contrasts)

## 3) `plot_event_dynamics()`

- **What it does:** Survival-style or binned event-rate visualization of event timing patterns.
- **TraMineR counterpart:** TraMineRextras `seqedplot`
- **Docs:** [`plot_event_dynamics`](./plot-event-dynamics)

## See Also

- [Event Sequences Introduction](/en/event-sequences/introduction) explains the workflow and data structures.
- [Quickstart Example](/en/event-sequences/example) shows a complete event-mining run.
- [Helper Functions](/en/event-sequences/event-sequence-helpers) lists supporting utilities.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang


## Reference

Ritschard, G., Bürgin, R., & Studer, M. (2013). Exploratory Mining of Life Event Histories. In J. J. McArdle & G. Ritschard (Eds.), Contemporary Issues in Exploratory Data Mining in the Behavioral Sciences (pp. 221–253). Routledge.
