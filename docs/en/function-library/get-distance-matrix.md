<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-12 14:40:49
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-13 09:35:01
 * @FilePath: /SequenzoWebsite/docs/en/function-library/get-distance-matrix.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# `get_distance_matrix()`

The `get_distance_matrix()` function is the **heart of sequence comparison** in Sequenzo. It takes a set of categorical sequences (careers, family trajectories, health states, etc.) and produces a matrix of numbers that say how different each sequence is from every other sequence. These numbers are called **dissimilarities**, and the algorithms used to compute them are known as **dissimilarity measures**. 

It is important to remember that the output of `get_distance_matrix()` is aways a `n x n` matrix, in which n is the number of sequences that you have in the data. This distance matrix is the starting point for many downstream analyses. For example, clustering (and in the literature the resulting clusters are often referred to as typologies), as well as visualization and regression on sequence data.

If you are a beginner in sequence analysis or you would like to learn more about it, please refer to [the guide on dissimilarity measures](../tutorials/dissimilarity-measures.md). We highly recommend you to read it carefully before you go through this function documentation. 

If you are already familiar with these concepts and measures, feel free to skip ahead to the documentation below.

## Method cheatsheet (when to use what)

* **OM (Optimal Matching):** General-purpose `edit-distance` family on states. Supports custom `sm` (substitution costs) and `indel` (insertion/deletion costs). It is called an “edit distance” because it compares sequences via substitution, insertion, and deletion operations.
* **OMspell:** like OM but operates on spells/runs; good when durations matter.
* **HAM (Hamming-like positional distance):** simple positionwise substitutions; equal lengths required.
* **DHD (Dynamic Hamming with time-varying costs):** like HAM but costs can change over positions (via transition rates).
* **LCP / RLCP:** common-prefix based distances; useful to emphasize early-path similarity (Longest Common Prefixes, LCP) or its reverse (RLCP).

## Function usage

There are several algorithms available (see [this guide](../tutorials/dissimilarity-measures.md) for details). Because `get_distance_matrix()` is designed to support all of them, you may notice that the function has many parameters. Don’t worry — in practice, each dissimilarity measure only requires a few key arguments, and we explain them clearly in the guide.

In short: once you know which measure you want to use, calling this function usually involves just setting method, choosing a few parameters that are related to it. For instance, one of the most common options would be the standard optimal matching (`OM`), so the parameters mainly include how to handle substitution/indel costs (`sm` and `indel`), and optionally picking a normalization scheme (`norm`).

**Note:** The code block below enumerates all supported parameters and typical values for reference; in day-to-day use you won’t set them all. For which parameters to choose (and why) for each algorithm, please keep reading the guide.

```python
om = get_distance_matrix(
    seqdata=sequence_data,   # SequenceData object
    method="OM",             # "OM", "OMspell", "HAM", "DHD", "LCP", or "RLCP"
    sm="TRATE",              # substitution-costs spec or matrix (see below)
    indel="auto",            # OM/OMspell only: number | vector | "auto"
    norm="auto",             # "none" | "auto" | "maxlength" | "gmean" | "maxdist" | "YujianBo"
    full_matrix=True,        # return full n×n matrix
    refseq=None,             # or two index sets: [idx_list_A, idx_list_B]
    tpow=1.0,                # OMspell only: spell-length exponent
    expcost=0.5,             # OMspell only: spell transform cost
    weighted=True,           # use sequence weights when building sm where relevant
    check_max_size=True      # safety check against huge unique-sequence counts
)
```

## Entry parameters (by method family)

First, let’s look at the default settings for each algorithm. Understanding these defaults helps you build deeper intuition about how each algorithm behaves. You might want to adjust these values according to your research questions and theoretical considerations. If you don’t have a strong prior, a safe baseline is to use `method= "OM"` with `sm="CONSTANT"` (substitution cost = 2 for any state change) and indel = 1 (insert/delete cost). [This guide](../tutorials/dissimilarity-measures.md) explains more regarding how to understand it further.  

* **OM (general purpose):** `sm` is set by user, `indel="auto"`, `norm="auto"`.
* **OMspell (durations matter):** `sm` is set by user, `indel="auto"`, `tpow=1.0`, `expcost=0.5`, `norm="auto"`.
* **HAM (strict positionwise):** if `sm` is not defined, it defaults to a constant substitution matrix with all costs = 1 (`sm="CONSTANT"`, `cval=2`). `norm="auto"`. This algorithm requires equal-length sequences; e.g., each sequence spans exactly 10 time points/years.
* **DHD (positionwise with time-varying costs):** `sm="TRATE"` if not defined, `norm="auto"`. Equal lengths required.
* **LCP / RLCP (prefix similarity):** `norm="auto"`. No `sm` or `indel` needed.

### Common to all methods

| Parameter        | Required | Data Type    | Description                                                                                                     |
| ---------------- | -------- |--------------| --------------------------------------------------------------------------------------------------------------- |
| `seqdata`          | ✓        | SequenceData | A Sequenzo state-sequence object.                                                                               |
| `method`           | ✓        | str          | One of: `"OM"`, `"OMspell"`, `"HAM"`, `"DHD"`, `"LCP"`, `"RLCP"`.                                                           |
| `refseq`           | ✗        | list         | Two index lists \[A, B]. Returns an A×B distance table. If None, computes all pairwise distances.               |
| `norm`             | ✗        | str          | `"none"`, `"auto"`, `"maxlength"`, `"gmean"`, `"maxdist"`, `"YujianBo"`. `"auto"` picks a sensible default per method.        |
| `full_matrix`     | ✗        | bool         | If True (and `"refseq=None"`), return full `n×n` matrix. If False (and `refseq=None`), return a unique-sequence matrix. Ignored when `refseq` is provided. |
| `weighted`         | ✗        | bool         | When building `sm` from data (e.g., `"TRATE"`), respect sequence weights if available.                              |
| `check_max_size` | ✗        | bool         | Stop early if the number of unique sequences would make computation too large.                                  |
| `opts`             | ✗        | dict         | Alternative way to pass the same parameters as a bundle.                                                        |
| `**kwargs`       | ✗        | —            | `with_missing` is ignored; missing is always included as an extra state internally.                              |

### Edit-based measures: OM, OMspell

| Parameter | Required                | Type                       | Applies to  | Description                                                                                                                   |
| --------- | ----------------------- | -------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `sm`        | ✓ for OM and OMspell | str or matrix              | OM, OMspell | Substitution costs. Use `"TRATE"` (from transitions), `"CONSTANT"` (single constant, i.e., `sm`=2), or provide a square matrix (states×states). |
| `indel`     | ✗                       | number or vector or `"auto"` | OM, OMspell | Insertion/deletion cost(s). Number = constant; vector = per-state (length must equal number of states incl. missing); `"auto"` derives a coherent value from `sm`.     |
| `norm`      | ✗                       | str                        | OM, OMspell | Recommended defaults: `OM → "maxlength"`; `OMspell → "YujianBo"`.                                                                 |
| `tpow`      | ✗                       | float                      | OMspell     | Spell-length exponent. Controls how strongly long spells are emphasized.                                                      |
| `expcost`   | ✗                       | float (positive)           | OMspell     | Spell transform cost. Higher values penalize breaking or stretching spells.                                                   |

OMspell is frequently used in existing literature. Thus, it is necessary to explain more on it. OMspell compares **spells (runs of the same state)** instead of individual positions, making it suitable when **durations matter**.

**OMspell parameters: practical tips**

| Parameter     | Typical range                  | Meaning                                                                                           | Practical advice                                                                                                                                                                                                                    |
| ------------- | ------------------------------ | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `expcost` (δ) | 0, 0.1, 0.5, 1                 | Cost of expanding/compressing a spell by 1 time unit. Controls sensitivity to **spell duration**. | • `0`: ignore durations, focus only on order of distinct states. <br>• `0.1–0.5`: moderate sensitivity to duration (often recommended). <br>• `1`: strong sensitivity to spell lengths (use if long vs short episodes are central). |
| `tpow`        | 0.5 – 2                        | Exponent for weighting spell durations.                                                           | • `1.0`: linear weight (default). <br>• `<1`: downweight long spells, emphasize shorter ones. <br>• `>1`: amplify the influence of long spells.                                                                                     |
| `indel`       | 1 – 5       | Insertion/deletion cost relative to substitution.                                                 | • Higher values: emphasize exact timing (align less). <br>• Lower values: allow more shifting, focus on sequencing and duration patterns.                                                                                           |
| `sm`          | `"TRATE"` or fixed (default 2) | Substitution cost strategy.                                                                       | • `"TRATE"`: data-driven, often combined with `indel="auto"`. <br>• Fixed = 2: standard baseline if you don’t want transition-based costs.                                                                                          |

**Guideline for OMspell:**

* Use **low `expcost` (\~0)** when you mainly care about sequencing.
* Use **moderate `expcost` (0.1–0.5) with `tpow ≈ 1`** when you want both sequencing and durations.
* Use **higher `expcost` (\~1) with `tpow > 1`** if your research focuses on differences in long vs short episodes (e.g. long-term unemployment vs repeated short-term unemployment).

Notes

* If `sm` is `TRATE`, costs are learned from your data; if `indel` is `auto`, an `indel` value consistent with `sm` is chosen.
* OMspell internally compares sequences of spells (runs) and can weight durations via `tpow` and `expcost`. According to Studer & Ritschard (2016), you should choose OMspell if you care about differences in spell durations, since it explicitly accounts for how long states last, not just their order. 

### Positionwise measures: HAM, DHD

| Parameter       | Required             | Type                       | Applies to | Description                                                                                                                          |
| --------------- | -------------------- | -------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `sm`              | ✗ for `HAM`, ✓ for `DHD` | str or matrix or 3-D array | HAM, DHD   | HAM: If `sm` is not specified, a constant substitution-cost matrix will be created with constant 2 (i.e., every substitution costs 2, `"cval=2`"). DHD: use `"TRATE"` or provide a 3-D array (time-varying costs over positions). |
| `norm`            | ✗                    | str                        | HAM, DHD   | Recommended default with `"auto"`: `"maxlength"`.                                                                                        |

Notes

* DHD generalizes HAM by allowing costs to vary across time positions (e.g., early vs late differences can be weighted differently).
* All sequences must have equal length (positionwise comparison). 

### Prefix-based measures: LCP, RLCP

| Parameter | Required | Type | Applies to | Description                                                                                                                                                         |
| --------- | -------- | ---- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `norm`      | ✗        | str  | LCP, RLCP  | Recommended default with `"auto"`: `"gmean"`.                                                                                                                           |

Notes

* No substitution or indel costs are needed here.
* LCP emphasizes common prefixes in the original order; RLCP emphasizes common prefixes when the sequences are reversed (i.e., common suffixes in the original time).
* Useful when early-path similarity (or late-path similarity via RLCP) is the focus.

## What it does

1. Validates inputs and supported methods
   
   Supported here: OM, OMspell, HAM, DHD, LCP, RLCP.

2. Builds substitution and indel costs

   * If you pass `sm="TRATE"`, costs are derived from observed transition rates in your data (time-varying for DHD).
   * If you pass `sm="CONSTANT"` with HAM, a simple constant substitution cost is used.
   * If `indel="auto"` and `sm` is known, indel costs are derived to be coherent with `sm`.
   * You may also pass your own `sm` matrix (states×states), or for DHD a 3D array over time positions.

3. Normalizes distances when requested

   * `norm="auto"` selects:
     * `"maxlength"` for OM, HAM, DHD
     * `"gmean"` for LCP/RLCP
     * `"YujianBo"` for OMspell
   * You can override with any of the listed normalization options except where not applicable.

4. Deduplicates identical sequences internally

   * The function compresses to unique sequences to speed up C++ distance computation.
   * After computing unique-to-unique distances, it expands back to your requested output shape.

5. Computes distances with a compiled backend

   * All heavy lifting is done in C++ for speed.
   * For `refseq=None`: returns either a full `n×n` matrix `full_matrix=True` or a reduced square matrix over unique sequences `full_matrix=False`.
   * For `refseq=[idxs_A, idxs_B]`: returns a `|A|×|B|` DataFrame whose row/column labels are your original IDs.

6. Safety and edge behavior

   * If there are empty sequences, you get a warning (or an error for methods that cannot handle them).
   * If `full_matrix=False` and `refseq is not None`, a full matrix is returned (informational message printed).
   * If unique sequences exceed a safe bound, the function raises a clear error unless `check_max_size=False`.

## Examples

### 1) OM with transition-rate costs (general, safe default)

```python
om = get_distance_matrix(
    seqdata=sequence_data,
    method="OM",
    sm="TRATE",     # build costs from observed transitions
    indel="auto",
    norm="auto",    # becomes "maxlength" for OM
    full_matrix=True
)
```

### 2) Spell-aware OM (durations matter)

```python
omspell = get_distance_matrix(
    seqdata=sequence_data,
    method="OMspell",
    sm="TRATE",
    indel="auto",
    tpow=1.0,
    expcost=0.5,
    norm="auto"     # becomes "YujianBo" for OMspell
)
```

### 3) HAM (equal-length sequences)

```python
ham = get_distance_matrix(
    seqdata=sequence_data_equal_length,
    method="HAM",
    sm="CONSTANT",   # constant substitution cost
    norm="auto"      # becomes "maxlength"
)
```

### 4) DHD with time-varying costs (equal-length)

```python
dhd = get_distance_matrix(
    seqdata=sequence_data_equal_length,
    method="DHD",
    sm="TRATE",     # builds a position-specific 3D cost array internally
    norm="auto"
)
```

### 5) LCP and RLCP (emphasize early path vs. reversed)

```python
lcp = get_distance_matrix(seqdata=sequence_data, method="LCP", norm="gmean")
rlcp = get_distance_matrix(seqdata=sequence_data, method="RLCP", norm="gmean")
```

### 6) Distances between two groups (A vs B)

```python
idxs_A = list(range(0, 100))     # first 100 entities
idxs_B = [10, 50, 250, 400]      # a comparison set
ab = get_distance_matrix(
    seqdata=sequence_data,
    method="OM",
    sm="TRATE",
    refseq=[idxs_A, idxs_B],     # returns |A|×|B| DataFrame
    full_matrix=True             # ignored here; full table is returned
)
```

### 7) Reduced unique-sequence matrix to save memory

```python
reduced = get_distance_matrix(
    seqdata=sequence_data,
    method="OM",
    sm="TRATE",
    full_matrix=False            # returns a square matrix over unique sequences
)
```

## Tips and common pitfalls

* Ensure sequence lengths match for HAM/DHD; otherwise you will get an explicit error.
* If you provide a vector for `indel`, its length must match the number of states in `seqdata.states` (alphabet order).
* For very large datasets, prefer `full_matrix=False` to inspect structure over unique sequences first.
* `with_missing` is no longer a parameter; missing values are handled consistently by default.

## Return value

Pandas DataFrame of distances.
Shape:

* `n×n` if `refseq=None` and `full_matrix=True`
* `u×u` if `refseq=None` and `full_matrix=False` (u = number of unique sequences)
* `|A|×|B|` if `refseq=[idxs_A, idxs_B]`

Row/column labels are taken from `seqdata.ids`.

## Authors

_Code: Xinyi Li_

_Documentation: Yuqi Liang_

_Edited by: Yuqi Liang_

## References

Studer, Matthias, and Gilbert Ritschard. "What matters in differences between life trajectories: A comparative review of sequence dissimilarity measures." Journal of the Royal Statistical Society Series A: Statistics in Society 179, no. 2 (2016): 481-511.
