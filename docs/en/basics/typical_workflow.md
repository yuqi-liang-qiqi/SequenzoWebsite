# Typical workflow


Sequences → Distance Measure → Distance Matrix → CLARA/PAM → Clusters

## Distances vs. Clustering: Don’t Mix Them Up

When working with sequence analysis, it is easy to confuse **how we measure dissimilarities** (distances) with **how we group sequences** (clustering algorithms). They are two separate steps:

| Step                           | What it does                                                  | Examples in Sequenzo                               | Role in CLARA                                                                                 |
| ------------------------------ | ------------------------------------------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **1. Compute dissimilarities** | Compare every pair of sequences to see how different they are | Optimal Matching (OM), OMspell, Hamming, LCP, etc. | Passed via `dist_args` and used to build the distance matrix                                  |
| **2. Cluster the sequences**   | Group similar sequences together into “types”                 | PAM (Partitioning Around Medoids), k-medoids       | CLARA always uses k-medoids (PAM) on a subsample, then extends the result to the full dataset |

So:

* **OM (or any distance)** tells us *how different* two trajectories are.
* **CLARA / PAM** uses those differences to *form groups*.

Think of it this way: the distance measure is the **ruler**, while the clustering algorithm is the **grouping strategy**. CLARA doesn’t “include OM” — it just takes whatever distances you choose and runs a medoid-based clustering on them.

### Crisp, Fuzzy, and Representativeness

Studer (2024) shows that CLARA can be extended to three clustering modes:

* **Crisp (hard) clustering**: each sequence goes into exactly one group.
* **Fuzzy clustering**: each sequence has partial membership in several groups.
* **Representativeness**: evaluates how well each sequence is represented by the medoids, useful for spotting outliers.

These are clustering **algorithms**, independent of which **distance measure** you choose.
