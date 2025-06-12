---
title:
description:
pubDate: 2025-05-01
lastModDate: 2025-05-01
toc: true
share: true
ogImage: true
---


### 💡 What's the difference between `requirements-3.x.txt` and `pyproject.toml` dependencies?

#### 🧱 `pyproject.toml` — **For building and installing the package**
- This file defines the **core dependencies** needed when users install Sequenzo via `pip install .`.
- It's used by **build tools (like setuptools)** and is the official way to declare a package’s metadata and install requirements.
- These dependencies are **runtime requirements**: what your package needs to *run* properly.

#### 🧪 `requirements-3.x.txt` — **For development, testing, or debugging**
- This file is used for **local development** or **contributing**, and often includes:
    - All runtime dependencies (mirroring or superseding what's in `pyproject.toml`)
    - Additional tools: linters, testing frameworks, profilers (e.g. `pytest`, `flake8`, `memory-profiler`)
    - Version pinning (`==`) to ensure reproducible environments
- It helps contributors set up an environment tailored to **their Python version**, like 3.10 or 3.11, avoiding version mismatches.




Absolutely! Here's the full explanation rewritten in **clear English**, suitable for documentation or inclusion in a Jupyter Notebook markdown cell.

---

## ✅ What Can You Do with `result_df` *Without* a Group Comparison?

Even if your study design does **not** involve comparing groups (like gender or SES), `result_df` is still very valuable for **individual-level**, **data-driven**, or **exploratory** analysis.

---

### 📘 What Does Each Column in `result_df` Mean?

| Column         | Description                                                                                        |
| -------------- | -------------------------------------------------------------------------------------------------- |
| `ObservedDist` | The actual average distance between sequences in the polyad (i.e., similarity).                    |
| `U`            | The difference between random and observed distances: `U = mean_random - observed`.                |
| `V`            | The proportion of random distances greater than the observed one. A proxy for significance.        |
| `V>0.95`       | A binary indicator: 1 if `V > 0.95`, meaning the polyad is significantly more similar than random. |

---

### 🔍 What You Can Do With It:

#### 1. **Identify highly linked polyads (significant similarity)**

```python
result_df[result_df["V>0.95"] == 1].sort_values("V", ascending=False).head()
```

→ Spot families with strongly shared trajectories.

---

#### 2. **Sort or rank polyads by `U` or `V`**

```python
result_df.sort_values("U", ascending=True).head(10)
```

→ Find polyads with unexpectedly low or high cohesion.

---

#### 3. **Visualize the overall similarity distribution**

```python
import seaborn as sns
import matplotlib.pyplot as plt

sns.kdeplot(result_df["V"])
plt.title("Distribution of V across all polyads")
plt.xlabel("V (Proportion of random distances > observed)")
plt.show()
```

→ Understand how most families compare to random expectation.

---

#### 4. **Use `V` to filter cases for qualitative or visual exploration**

```python
significant_ids = result_df.index[result_df["V>0.95"] == 1].tolist()
```

→ Then use `merged_seqdata` to retrieve their sequences.

---

#### 5. **Use `U`, `V`, or `ObservedDist` as inputs for clustering**

Even without predefined groups, you can apply unsupervised clustering:

```python
from sklearn.cluster import KMeans

X = result_df[["U", "V"]]
kmeans = KMeans(n_clusters=3, random_state=123).fit(X)
result_df["Cluster"] = kmeans.labels_
```

---

### ✅ Summary: What `result_df` Enables (without groups)

| Use Case               | Example                                                |
| ---------------------- | ------------------------------------------------------ |
| Descriptive statistics | `.mean()`, `.hist()`, `.kdeplot()`                     |
| Case selection         | `V > 0.95` or top `U`/`V` polyads                      |
| Exploratory ranking    | `.sort_values("U")`                                    |
| Clustering/grouping    | Use `U`, `V`, or distance as features                  |
| Targeted visualization | Use `.index` to access sequences from `merged_seqdata` |

