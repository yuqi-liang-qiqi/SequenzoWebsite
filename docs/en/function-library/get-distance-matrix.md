# `get_distance_matrix()`

## Overview

The `get_distance_matrix()` function is the **heart of sequence comparison** in Sequenzo. It takes categorical sequences (careers, family trajectories, health states, etc.) and produces a **distance matrix**, a table of numbers that quantify how different each sequence is from every other sequence.

**Input:** A `SequenceData` object (your sequences).  
**Output:** A distance matrix. By default, it is an `n×n` DataFrame, where `n` is the number of sequences.

This matrix is the starting point for clustering (typologies), visualization, and regression on sequence data.

> 💡 **New to sequence analysis?** Read the [dissimilarity measures guide](../tutorials/dissimilarity-measures.md) first. It explains *when* to use each measure in plain language.

---

## Architecture: Method Families at a Glance

Supported methods fall into several families. Each family answers a slightly different question about "how different" two sequences are:

| Family | Methods | Focus |
|--------|---------|--------|
| **Edit-based (OM family)** | `OM`, `OMspell`, `OMloc`, `OMslen`, `OMspellNew`, `OMtspell`, `OMstran`, `TWED` | Insert/delete/substitute operations; sequencing and timing |
| **Positionwise** | `HAM`, `DHD` | Position-by-position comparison; equal length required |
| **Subsequence matching** | `LCS`, `NMS`, `NMSMST`, `SVRspell` | Longest common subsequence; ordered matching |
| **Prefix-based** | `LCP`, `RLCP`, `LCPspell`, `RLCPspell`, `LCPmst`, `RLCPmst`, `LCPprod`, `RLCPprod` | Common prefix (or suffix); early vs. late path similarity |
| **Distribution-based** | `CHI2`, `EUCLID` | Time spent in each state; ignores order |

---

## Method Cheatsheet: When to Use What

| Method | When to use | Notes |
|--------|-------------|-------|
| **OM** | General-purpose; you want a balance of sequencing and timing | Needs `sm` and optionally `indel`. Safe default: `sm="CONSTANT"`, `indel=1`. |
| **OMspell** | Durations matter (e.g., long vs. short unemployment spells) | Operates on spells (runs); use `expcost` to control duration sensitivity. |
| **OMloc** | Local context matters (neighboring states affect cost) | Uses `context` and `expcost`. |
| **OMslen** | Spell length affects substitution cost | Uses `link` and `h`. |
| **OMstran** | You care about *transitions* (state changes) rather than raw states | Compares sequences of transitions. |
| **TWED** | Time-warped edit distance; elasticity in time | Requires `nu` (stiffness). |
| **HAM** | Strict positionwise; equal-length sequences | If `sm` not given, uses constant cost 1. |
| **DHD** | Like HAM but costs vary by position (early vs. late) | `sm="TRATE"` by default; builds time-varying costs. |
| **LCP / RLCP** | Emphasize early-path (LCP) or late-path (RLCP) similarity | No `sm` or `indel` needed. |
| **LCPspell / RLCPspell** | Same as LCP/RLCP but spell-aware | Use `expcost` for duration sensitivity. |
| **LCS** | Longest common subsequence; order matters, timing relaxed | No substitution costs. |
| **NMS / NMSMST / SVRspell** | Count matching subsequences; SVRspell adds spell weighting | More exhaustive than LCS. |
| **CHI2 / EUCLID** | Compare "time budgets" in each state; ignore order | Distribution-based; `norm` can only be `"auto"` or `"none"`. |

---

## Function Signature

```python
get_distance_matrix(
    seqdata,              # required: SequenceData object
    method,               # required: one of the methods above
    refseq=None,          # optional: int (index) or [idx_list_A, idx_list_B]
    norm="none",          # optional: "auto", "none", "maxlength", "gmean", "maxdist", "YujianBo"
    indel="auto",         # for OM family: number | vector | "auto"
    sm=None,              # substitution costs: str or matrix (see below)
    full_matrix=True,     # True: n×n; False: condensed 1D for clustering
    tpow=1.0,             # OMspell, etc.: spell-length exponent
    expcost=0.5,          # OMspell, LCPspell, etc.: spell transform cost
    weighted=True,        # use sequence weights when building sm
    check_max_size=True,  # safety check for large datasets
    matrix_display="full",# "full" | "upper" | "lower" (display only)
    opts=None,            # pass parameters as a dict
    **kwargs              # method-specific (context, nu, link, h, etc.)
)
```

> **Tip:** You rarely need all parameters. Pick a `method`, set `sm`/`indel` if required, and use `norm="auto"` — the function will choose sensible defaults.

---

## Parameters in Detail

### Common to All Methods

| Parameter | Required | Type | Description |
|-----------|----------|------|--------------|
| `seqdata` | ✓ | SequenceData | Your state-sequence object. |
| `method` | ✓ | str | One of: `OM`, `OMspell`, `OMloc`, `OMslen`, `OMspellNew`, `OMtspell`, `OMstran`, `TWED`, `HAM`, `DHD`, `LCS`, `LCP`, `RLCP`, `LCPspell`, `RLCPspell`, `LCPmst`, `RLCPmst`, `LCPprod`, `RLCPprod`, `NMS`, `NMSMST`, `SVRspell`, `CHI2`, `EUCLID`. |
| `refseq` | ✗ | int or list | **int:** index of a reference sequence; distances from all sequences to this one. **list `[A, B]`:** two index lists; returns `|A|×|B|` distance table (e.g., group A vs. group B). If `None`, computes all pairwise distances. |
| `norm` | ✗ | str | `"auto"`, `"none"`, `"maxlength"`, `"gmean"`, `"maxdist"`, `"YujianBo"`. `"auto"` picks a sensible default per method. CHI2/EUCLID only accept `"auto"` or `"none"`. |
| `full_matrix` | ✗ | bool | If `True` (and `refseq=None`): return full `n×n` DataFrame. If `False`: return condensed 1D array (for clustering). Ignored when `refseq` is provided. |
| `weighted` | ✗ | bool | When building `sm` from data (e.g., `"TRATE"`), respect sequence weights. |
| `check_max_size` | ✗ | bool | Safety check against too many unique sequences. |
| `matrix_display` | ✗ | str | When result is full matrix: `"full"` (default), `"upper"`, or `"lower"`. Affects display only; underlying distances unchanged. |
| `opts` | ✗ | dict | Pass parameters as a bundle. |
| `**kwargs` | ✗ | — | `with_missing` is ignored (missing values are always included). |

### Edit-based Measures: OM, OMspell, OMloc, OMslen, OMstran, TWED

| Parameter | Required | Type | Description |
|-----------|----------|------|--------------|
| `sm` | ✓ for OM, OMspell, OMloc, OMslen, OMstran, TWED | str or matrix | Substitution costs. **str:** `"TRATE"`, `"CONSTANT"`, `"INDELS"`, `"INDELSLOG"`, `"FUTURE"`, `"FEATURES"`. **matrix:** custom square matrix (states×states). For DHD: 3D array (time-varying). |
| `indel` | ✗ | number \| vector \| `"auto"` | Insertion/deletion cost(s). **Default `"auto"`** — the function derives indel from `sm` automatically (e.g., half of max substitution cost when using `"TRATE"`). You can omit it; you do not need to specify both `sm` and `indel` manually. Vector length must match number of states (incl. missing) when passed explicitly. |
| `tpow` | ✗ | float | OMspell, etc.: spell-length exponent (default 1.0). |
| `expcost` | ✗ | float | OMspell, LCPspell, RLCPspell: spell transform cost (default 0.5). Higher = more duration-sensitive. |
| `context` | ✗ | float | OMloc only: local context (default `1 - 2*expcost`). |
| `link`, `h` | ✗ | str, float | OMslen only: `link` in `["mean","gmean"]`, `h` ≥ 0. |
| `nu`, `h` | ✗ | float | TWED only: `nu` (stiffness) required, `h` (gap penalty) default 0.5. |
| `tokdep_coeff` | ✗ | array | OMtspell: token-dependent coefficients (switches from OMspell when provided). |

**OMspell practical tips:**

| Parameter | Typical range | Advice |
|-----------|---------------|--------|
| `expcost` | 0, 0.1, 0.5, 1 | 0 = ignore durations; 0.1–0.5 = moderate; 1 = strong duration sensitivity. |
| `tpow` | 0.5–2 | 1.0 = linear; &lt;1 = downweight long spells; &gt;1 = amplify long spells. |
| `indel` | 1–5 | Higher = emphasize timing; lower = allow more shifting. |
| `sm` | `"TRATE"` or `"CONSTANT"` | `"TRATE"` = data-driven; `"CONSTANT"` (cval=2) = baseline. |

### Positionwise Measures: HAM, DHD

| Parameter | Required | Type | Description |
|-----------|----------|------|--------------|
| `sm` | ✗ for HAM, ✓ for DHD | str or matrix | HAM: If not specified, uses constant cost 1. DHD: `"TRATE"` or 3D array (time-varying). Note: `"CONSTANT"` not applicable for DHD. |

**Note:** HAM and DHD require **equal-length sequences**.

### Prefix-based Measures: LCP, RLCP, LCPspell, RLCPspell, LCPmst, RLCPmst, LCPprod, RLCPprod

| Parameter | Required | Type | Description |
|-----------|----------|------|--------------|
| `norm` | ✗ | str | `"auto"` → `"gmean"` for LCP/RLCP; `"maxdist"` for LCPspell/RLCPspell. |
| `expcost` | ✗ | float | LCPspell/RLCPspell only: duration sensitivity (≥ 0). |
| `durations` | ✗ | array | LCPmst, RLCPmst, LCPprod, RLCPprod: position-wise durations (default 1.0). |

**Note:** No `sm` or `indel` needed for prefix-based measures.

### Distribution-based: CHI2, EUCLID

| Parameter | Required | Type | Description |
|-----------|----------|------|--------------|
| `norm` | ✗ | str | Only `"auto"` or `"none"`. |
| `step`, `breaks`, `overlap` | ✗ | int, array, bool | Optional; see `**kwargs` in source. |

---

## Default Normalization per Method (`norm="auto"`)

| Method | Default norm |
|--------|--------------|
| OM, HAM, DHD | `"maxlength"` |
| LCS, LCP, RLCP, LCPmst, RLCPmst, LCPprod, RLCPprod | `"gmean"` |
| LCPspell, RLCPspell | `"maxdist"` |
| OMloc, OMslen, OMspell, OMspellNew, OMtspell, OMstran, TWED, NMS, NMSMST, SVRspell | `"YujianBo"` |
| CHI2, EUCLID | Uses internal normalization (sqrt of n_breaks) |

---

## What the Function Does (Internal Steps)

1. **Validates inputs** — Checks `seqdata`, `method`, and method-specific arguments.
2. **Builds substitution and indel costs** — From `sm` (e.g., `"TRATE"`, `"CONSTANT"`) or your custom matrix. If `indel="auto"`, derives indel from `sm`.
3. **Normalizes** — Applies chosen normalization (or `"auto"` default).
4. **Deduplicates** — Compresses to unique sequences for faster C++ computation, then expands to requested output shape.
5. **Computes distances** — Uses compiled C++ backend.
6. **Handles edge cases** — Empty sequences → warning; `refseq` provided with `full_matrix=False` → returns full table (info printed).

---

## Examples

### 1) OM with transition-rate costs (general default)

```python
om = get_distance_matrix(
    seqdata=sequence_data,
    method="OM",
    sm="TRATE",
    indel="auto",
    norm="auto",
    full_matrix=True
)
```

### 2) OM with constant costs (safe baseline)

```python
om = get_distance_matrix(
    seqdata=sequence_data,
    method="OM",
    sm="CONSTANT",   # substitution cost = 2
    indel=1,
    norm="auto"
)
```

### 3) OMspell (durations matter)

```python
omspell = get_distance_matrix(
    seqdata=sequence_data,
    method="OMspell",
    sm="TRATE",
    indel="auto",
    tpow=1.0,
    expcost=0.5,
    norm="auto"
)
```

### 4) HAM (equal-length sequences)

```python
ham = get_distance_matrix(
    seqdata=sequence_data_equal_length,
    method="HAM",
    norm="auto"   # sm auto-generated with constant cost 1 if not specified
)
```

### 5) DHD (time-varying costs)

```python
dhd = get_distance_matrix(
    seqdata=sequence_data_equal_length,
    method="DHD",
    sm="TRATE",
    norm="auto"
)
```

### 6) LCP and RLCP

```python
lcp = get_distance_matrix(seqdata=sequence_data, method="LCP", norm="auto")
rlcp = get_distance_matrix(seqdata=sequence_data, method="RLCP", norm="auto")
```

### 7) Distances between two groups

```python
idxs_A = list(range(0, 100))
idxs_B = [10, 50, 250, 400]
ab = get_distance_matrix(
    seqdata=sequence_data,
    method="OM",
    sm="TRATE",
    refseq=[idxs_A, idxs_B]   # returns |A|×|B| DataFrame
)
```

### 8) Condensed matrix (for clustering, saves memory)

```python
reduced = get_distance_matrix(
    seqdata=sequence_data,
    method="OM",
    sm="TRATE",
    full_matrix=False   # returns 1D condensed array (scipy squareform format)
)
```

### 9) Display only upper triangle

```python
om = get_distance_matrix(
    seqdata=sequence_data,
    method="OM",
    sm="TRATE",
    matrix_display="upper"   # cleaner display; distances unchanged
)
```

---

## Tips and Common Pitfalls

* **HAM/DHD:** All sequences must have the same length; otherwise you get an explicit error.
* **indel vector:** If you pass a vector, its length must match the number of states (including missing).
* **LCPspell/RLCPspell:** Prefer `norm="maxdist"` or `norm="none"`; `norm="gmean"` can yield distances outside [0, 1].
* **CHI2/EUCLID:** `norm` can only be `"auto"` or `"none"`.
* **with_missing:** This parameter no longer exists; missing values are always included by default.

---

## Return Value

| Condition | Shape | Type |
|-----------|-------|------|
| `refseq=None`, `full_matrix=True` | `n×n` | pandas DataFrame |
| `refseq=None`, `full_matrix=False` | Condensed 1D (length `u×(u-1)/2`, u = unique sequences) | numpy array (scipy squareform format) |
| `refseq=[A, B]` | `|A|×|B|` | pandas DataFrame |

Row and column labels come from `seqdata.ids`.

---

## Authors

_Code: Xinyi Li, Yuqi Liang_

_Documentation: Yuqi Liang_

_Edited by: Yuqi Liang, Yukun Ming_

## References

Studer, M., & Ritschard, G. (2016). What matters in differences between life trajectories: A comparative review of sequence dissimilarity measures. Journal of the Royal Statistical Society Series A: Statistics in Society, 179(2), 481-511.

Studer, M., & Ritschard, G. (2014). A comparative review of sequence dissimilarity measures. LIVES Working Papers, 33, 1-47.

Elzinga, C. H. (2007). Sequence analysis: Metric representations of categorical time series. Manuscript, Dept of Social Science Research Methods, Vrije Universiteit, Amsterdam.

Elzinga, C. H., & Liefbroer, A. C. (2007). De-standardization of Family-Life Trajectories of Young Adults: A Cross-National Comparison Using Sequence Analysis: Dé-standardisation des trajectoires de vie familiale des jeunes adultes: comparaison entre pays par analyse séquentielle. European Journal of Population/Revue européenne de démographie, 23(3), 225-250.

Elzinga, C. H., & Studer, M. (2015). Spell sequences, state proximities, and distance metrics. Sociological Methods & Research, 44(1), 3-47.

Biemann, T. (2011). A transition-oriented approach to optimal matching. Sociological Methodology, 41(1), 195-221.

Halpin, B. (2014). Three narratives of sequence analysis. In Advances in sequence analysis: Theory, method, applications (pp. 75-103). Cham: Springer International Publishing.

Hamming, R. W. (1950). Error detecting and error correcting codes. The Bell system technical journal, 29(2), 147-160.

Hollister, M. (2009). Is optimal matching suboptimal?. Sociological methods & research, 38(2), 235-264.

Lesnard, L. (2010). Setting cost in optimal matching to uncover contemporaneous socio-temporal patterns. Sociological methods & research, 38(3), 389-419.