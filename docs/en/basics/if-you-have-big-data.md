# If You Have Big Data

In sequence analysis, computational difficulty is not determined only by the number of rows. Four features matter together:

- The number of sequences.
- The number of unique sequences.
- The sequence length.
- The number of states.

Datasets with many repeated sequences can be much easier than datasets with the same number of rows but many unique trajectories. Long sequences and large state alphabets also make distance computation more expensive.

## First Checks

Before choosing a large-scale workflow, inspect the data:

- Use an [index plot](/en/visualization/index-plot) to see whether trajectories are highly varied.
- Use a [most frequent sequences plot](/en/visualization/plot-most-frequent-sequences) to check repetition.
- Use a [relative frequency plot](/en/visualization/plot-relative-frequency) to inspect common trajectory patterns.

## Recommended Path

Before choosing CLARA, continue to [Big Data Tools](/en/big-data/introduction). That page puts the checks in order: inspect uniqueness first, then decide whether ordinary distance-based analysis is still feasible. Use CLARA for single-domain workflows; for multidomain data, use the scaling guide to choose IDCD, CAT, or DAT and pilot memory and runtime before full analysis.

If the full distance matrix is too large or too slow, use [`clara()`](/en/big-data/clara). CLARA repeatedly samples the data, finds medoids in each sample, and assigns the full dataset to the best medoid set. This keeps the analysis close to PAM while avoiding the memory cost of full medoid clustering on the entire distance matrix.

For the standard sequence-analysis pipeline, see [Typical Workflow](/en/basics/typical-workflow).
