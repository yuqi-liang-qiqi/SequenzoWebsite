<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-16 11:44:52
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-16 11:45:10
 * @FilePath: /SequenzoWebsite/docs/en/tutorials/understanding_clara.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
### Why does CLARA still use `get_distance_matrix()` if it is for clustering?

CLARA is a clustering method for large datasets, but it still needs distances to work. What CLARA avoids is the full `N×N` distance matrix for all sequences at once. Instead, it computes only the distances it actually needs, in small pieces.

Inside each CLARA iteration there are two small distance jobs:

1. On a random subsample of size n, CLARA computes a full n×n matrix so k-medoids (PAM) can find good medoids on that tiny set.
2. After picking medoids, it computes distances from all `N` sequences to just those K medoids (an N×K panel) to assign every sequence.

Both steps use your chosen measure (OM, OMspell, Hamming, etc.), so the code calls `get_distance_matrix()`—once on the subsample, and once with “reference sequences” set to the medoids (that’s why you see `refseq` being passed). CLARA repeats this R times with new subsamples and keeps the best result.

So the workflow is still “distance → cluster,” just chunked and repeated:

```
subsample → get_distance_matrix (n×n) → PAM → get_distance_matrix to K medoids (N×K) → assign → repeat R → best
```

Why this scales better: the full matrix needs about N(N−1)/2 distances and must live in memory. With CLARA you do roughly R × (n² + N×K). Example: N=100,000; n=2,000; K=6; R=200. Full matrix ≈ 5.0×10^9 pairwise distances and huge memory. CLARA computes about 200 × (4.0×10^6 + 6.0×10^5) ≈ 9.2×10^8 targeted distances, and only keeps small pieces in memory at a time. That’s the point: not “no distances,” but “only the distances you need, where you need them.”