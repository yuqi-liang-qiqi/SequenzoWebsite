<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-11 17:41:19
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-11 17:44:31
 * @FilePath: /SequenzoWebsite/docs/en/function-library/cluster_results.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# `ClusterResults` — export and visualize results

A small helper that takes your existing `Cluster` object and turns it into simple tables and an easy bar chart.

## How to create it

“Constructor” just means “how you make the object.” For beginners, say “Create the object.”

```python
# you already have:
# clu = Cluster(matrix=D, entity_ids=ids, clustering_method="average")

cluster_results = ClusterResults(clu)
```

## What you can do with it

1. Get a membership table

```python
members = cluster_results.get_cluster_memberships(num_clusters=K)
```

Returns a tidy two-column DataFrame you can merge back to your original data:

```
Entity ID | Cluster
----------|--------
1001      | 3
1002      | 1
1003      | 3
...
```

Typical use:

```python
df_labeled = df.merge(members, on="Entity ID", how="left")
```

2. Get a cluster size summary

```python
dist = cluster_results.get_cluster_distribution(num_clusters=K)
```

Returns counts and percentages per cluster:

```
Cluster | Count | Percentage
--------|-------|-----------
1       | 412   | 20.6
2       | 538   | 26.9
3       | 1,046 | 52.5
```

3. Plot a bar chart of cluster sizes

```python
cluster_results.plot_cluster_distribution(
    num_clusters=K,
    save_as="cluster_sizes.png",   # set a path to save; use None to just show
    title=None,                    # default shows "N = ..."
    style="whitegrid",             # optional
    dpi=200,
    figsize=(10, 6)
)
```

Notes for beginners

* K is the number of clusters you decided to keep (for example from `ClusterQuality`).
* `Entity ID` must be the same IDs you used to build the distance matrix.
* If you change K later, regenerate both the membership table and the distribution.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

Edited by: Yuqi Liang