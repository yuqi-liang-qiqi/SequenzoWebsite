<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-12 14:40:49
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-12 17:25:56
 * @FilePath: /SequenzoWebsite/docs/en/function-library/get-distance-matrix.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# `get_distance_matrix()`

The `get_distance_matrix()` function is the **heart of sequence comparison** in Sequenzo. It takes a set of categorical sequences (careers, family trajectories, health states, etc.) and produces a matrix of numbers that say how different each sequence is from every other sequence. These numbers are called dissimilarities.

Think of it as creating a “map of differences” across your entire dataset:

* If two people have very similar trajectories, their distance is close to 0.
* If they lived very different lives, their distance is larger.

There are several important aspects to understand, because this function is flexible:

1. **What exactly are you comparing?**

   By default, the function computes distances between *all sequences* in your dataset, returning an `n×n` matrix. 
   
   But sometimes you only want to compare two groups (e.g., men vs. women, treated vs. control). In that case, you can pass `refseq=[idxs_A, idxs_B]`, where each element is a list of row indices. The result will be an `|A|×|B|` table comparing only those two groups.

> ⚡ **About the `refseq` parameter**
>
> The parameter `refseq` already exists in TraMineR (the R library for sequence analysis). Its original meaning is reference sequence (as the name indicates):
>
> * If `refseq` is a single sequence (or its index), distances are computed **from all sequences to this reference.
>
> In Sequenzo, we extend this idea:
>
> * If `refseq` is a list of two sets of indices `[A, B]`, the function computes all pairwise distances between the two groups.
>
>   * The output is a rectangular `|A| × |B|` distance table.
>   * This is especially useful when directly comparing two populations (e.g., treated vs. control, men vs. women).

2. **How are differences measured? (Choice of method)**

   Different dissimilarity measures capture different aspects of sequences:

   * Some focus on **timing** (exact ages or years when things happen).
   * Some focus on **duration** (how long states last).
   * Some focus on **sequencing** (the order of events).
     
    For example:
   * Optimal Matching (OM) treats differences as “edit operations” (insert/delete/substitute) needed to turn one sequence into another.
   * Hamming distance (HAM) compares positions one by one (very timing-sensitive).
   * OMspell compares sequences of spells (runs of states), emphasizing duration.
     
    Each method has its own strengths, so the choice depends on what matters in your research (e.g., your research questions and theories that you use in your research).

3. **Normalization (making distances comparable)**

   Raw distances can be influenced by sequence length or by the set of possible states (e.g., having 3 states vs. 10 states can change the maximum possible distance). To make them comparable, you can normalize them. This means rescaling distances so they lie on a common scale (often between 0 and 1). It is an important point but many studies have neglected it. 

   You can choose from `"none"`, `"maxlength"`, `"gmean"`, `"maxdist"`, `"YujianBo"`, or let the function decide automatically with `"auto"`.
   For example:

   * `"maxlength"` divides by the maximum possible distance for the longest sequence.
   * `"gmean"` uses the geometric mean (often for common-prefix measures).
   * `"YujianBo"` applies a mathematical correction for edit distances.
   * `"auto"` selects the most sensible default based on the chosen method.
     
    In this way, users don’t need to know the formulas — they just get distances that are comparable across their dataset.

4. **Substitution and indel costs (how much a change “costs”)**
   
   For edit-based measures (like OM), the distance depends on how costly it is to insert, delete, or substitute states.

   * You can set them manually (e.g., indel=1, sm="CONSTANT", and when sm is set to "CONSTANT", sm = 2).
   * Or you can let the function derive them automatically (e.g., `sm="TRATE"`, `indel="auto"`, we will explain what they mean later in this guide).

    Automatic costs are calculated from your data: for example, frequent transitions get lower substitution costs, while rare transitions get higher costs. Similarly, the indel cost can be set as half of the maximum substitution cost, which is a common rule of thumb.
    
    This makes the function practical even if you don’t want to decide the numbers yourself. 

5. **Output format**
   
   By default, you get a full `n×n` DataFrame with distances between all sequences. For large datasets, you can also request a reduced matrix over unique sequences only, which saves memory. And if you used `refseq`, you’ll get a rectangular `|A|×|B|` DataFrame comparing just those two groups.

So in short:

* **You feed in sequences** (`SequenceData` object).
* **You choose a method** (OM, HAM, etc.), which defines what “difference” means.
* **You decide on normalization and costs** (or let the function handle them automatically).
* **You get back a matrix** that quantifies differences between every pair (or between two groups).

This distance matrix is the starting point for many other analyses, including clustering, visualization, typologies, or regression models on sequence data.

## Function usage

```python
om = get_distance_matrix(
    seqdata=sequence_data,   # SequenceData object
    method="OM",             # "OM", "OMspell", "HAM", "DHD", "LCP", or "RLCP"
    sm="TRATE",              # substitution-costs spec or matrix (see below)
    indel="auto",            # number | vector | "auto" (OM/OMspell only)
    norm="auto",             # "none" | "auto" | "maxlength" | "gmean" | "maxdist" | "YujianBo"
    full_matrix=True,        # return full n×n matrix
    refseq=None,             # or two index sets: [idx_list_A, idx_list_B]
    tpow=1.0,                # spell-length exponent (OMspell only)
    expcost=0.5,             # spell transform cost (OMspell)
    weighted=True,           # use sequence weights when building sm where relevant
    check_max_size=True      # safety check against huge unique-sequence counts
)
```

## Entry parameters
| Parameter | Required | Type | Description |
| --------- | -------- | ---- | ----------- |
| `seqdata` | ✓ | SequenceData | Predefined state-sequence object (Sequenzo). |
| `method` | ✓ | str | Dissimilarity measure: `"OM"`, `"OMspell"`, `"HAM"`, `"DHD"`, `"LCP"`, or `"RLCP"`. |
| `refseq` | ✗ | list | Two subsets of row indices: `[idxs_A, idxs_B]`. Computes an \| A \| × \| B \| distance table. If `None`, computes all pairwise distances. |
| `norm` | ✗ | str | `"none"`, `"auto"`, `"maxlength"`, `"gmean"`, `"maxdist"`, or `"YujianBo"`. |
| `indel` | ✗ | number / vector / `"auto"` | Insertion/deletion cost for OM/OMspell. number = constant; vector = per-state costs (alphabet order); `"auto"` derives from `sm`. |
| `sm` | ✗ | str / matrix / array | Substitution costs. Strings: `"TRATE"`, `"CONSTANT"`. Or provide a square matrix (states×states). For `DHD`, a 3-D array (time-varying) is supported. |
| `full_matrix` | ✗ | bool | If `True` (and `refseq=None`), returns full n×n matrix; if `False` (and `refseq=None`), returns unique-sequence matrix. |
| `tpow` | ✗ | float | Spell-length exponent for `"OMspell"`. |
| `expcost` | ✗ | float | Spell transform cost for `"OMspell"`; must be positive. |
| `weighted` | ✗ | bool | Use sequence weights when building `sm` where relevant. |
| `check_max_size` | ✗ | bool | Stop early if unique-sequence count would make the job too large. |
| `opts` | ✗ | dict | Pass the same parameters as a bundle. |
| `**kwargs` | ✗ | — | `with_missing` is ignored (missing states are always included). |

## What it does

1. Validates inputs and supported methods
   
   Supported here: OM, OMspell, HAM, DHD, LCP, RLCP.
   
   Notes:
   * HAM and DHD require equal sequence length (they are positionwise comparisons).
   * OMspell uses spells (runs) and spell durations; you can weight spell length via `tpow` and `expcost`.

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
   * For `refseq=None`: returns either a full `n×n` matrix (`full_matrix=True`) or a reduced square matrix over unique sequences (`full_matrix=False`).
   * For `refseq=[idxs_A, idxs_B]`: returns a `|A|×|B|` DataFrame whose row/column labels are your original IDs.

6. Safety and edge behavior

   * If there are empty sequences, you get a warning (or an error for methods that cannot handle them).
   * If `full_matrix=False` and `refseq is not None`, a full matrix is returned (informational message printed).
   * If unique sequences exceed a safe bound, the function raises a clear error unless `check_max_size=False`.

## Key features

* Multiple classic measures in one place: OM, OMspell (spell-aware), HAM, DHD (time-varying costs), LCP, RLCP.
* Cost convenience: `"TRATE"` and `"CONSTANT"` builders, plus automatic indel choices.
* Smart normalization defaults per method.
* Fast: unique-sequence compression plus C++ kernels.
* Flexible output: full matrix, reduced unique-sequence matrix, or group-to-group distances via `refseq`.

## Method cheatsheet (when to use what)

* **OM (Optimal Matching):** general-purpose edit distance on states; supports custom `sm` and `indel`.
* **OMspell:** like OM but operates on spells/runs; good when durations matter.
* **HAM (Hamming-like positional distance):** simple positionwise substitutions; equal lengths required.
* **DHD (Dynamic Hamming with time-varying costs):** like HAM but costs can change over positions (via transition rates).
* **LCP / RLCP:** common-prefix based distances; useful to emphasize early-path similarity (Longest Common Prefixes, LCP) or its reverse (RLCP).

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

* n×n if `refseq=None` and `full_matrix=True`
* u×u if `refseq=None` and `full_matrix=False` (u = number of unique sequences)
* |A|×|B| if `refseq=[idxs_A, idxs_B]`

Row/column labels are taken from `seqdata.ids`.

## Authors

Code: Xinyi Li

Documentation: Yuqi Liang

Edited by: Yuqi Liang

## References

Studer, Matthias, and Gilbert Ritschard. "What matters in differences between life trajectories: A comparative review of sequence dissimilarity measures." Journal of the Royal Statistical Society Series A: Statistics in Society 179, no. 2 (2016): 481-511.
