# `get_distance_matrix()`

## Overview

The `get_distance_matrix()` function compares categorical sequences and returns a distance matrix: a table of pairwise dissimilarities between sequences.

**Input:** A `SequenceData` object (your sequences).  
**Output:** A distance matrix. By default, it is an `n×n` DataFrame, where `n` is the number of sequences.

This matrix is the starting point for clustering, typologies, visualization, and downstream modeling.

> **New to sequence analysis?** Read the [dissimilarity measures guide](../tutorials/dissimilarity-measures.md) first. It explains *when* to use each measure in plain language.

---

## Supported Method Families

Each family answers a different version of "how different are these sequences?"

| Family | Methods | Focus |
|--------|---------|--------|
| **Edit-based (OM family)** | `OM`, `OMspell`, `OMspellRS`, `OMloc`, `OMslen`, `OMtspell`, `OMstran`, `TWED` | Insert/delete/substitute operations; sequencing and timing |
| **Positionwise** | `HAM`, `DHD` | Position-by-position comparison; equal length required |
| **Subsequence matching** | `LCS`, `NMS`, `NMSMST`, `SVRspell` | Longest common subsequence; ordered matching |
| **Prefix-based** | `LCP`, `RLCP`, `LCPspell`, `RLCPspell`, `LCPmst`, `RLCPmst`, `LCPprod`, `RLCPprod` | Common prefix (or suffix); early vs. late path similarity |
| **Distribution-based** | `CHI2`, `EUCLID` | Time spent in each state; ignores order |

---

## Choosing a Method

| Method | When to use | Notes |
|--------|-------------|-------|
| **OM** | General-purpose; you want a balance of sequencing and timing | Needs `sm` and optionally `indel`. Safe default: `sm="CONSTANT"`, `indel=1`. |
| **OMspell** | Durations matter; TraMineR-style spell OM | Operates on spells (runs); use `expcost` (≥ 0; `0` ignores duration). |
| **OMspellRS** | Spell OM with reference-scaled durations | Like `OMspell`, but duration terms are divided by `duration_ref` (τ) before `expcost` is applied; default τ = observation window *T*. |
| **OMloc** | Local context matters (neighboring states affect cost) | Uses `context` and `expcost`. If `context` is omitted, keep `expcost <= 0.5`. |
| **OMslen** | Spell length affects substitution cost | Uses `link` and `h`. |
| **OMstran** | You care about *transitions* (state changes) rather than raw states | Compares sequences of transitions. |
| **TWED** | Time-warped edit distance; elasticity in time | Requires `nu` (stiffness). |
| **HAM** | Strict positionwise; equal-length sequences | If `sm` not given, uses constant cost 1. |
| **DHD** | Like HAM but costs vary by position (early vs. late) | `sm="TRATE"` by default; builds time-varying costs. |
| **LCP / RLCP** | Emphasize early-path (LCP) or late-path (RLCP) similarity | No `sm` or `indel` needed. |
| **LCPspell / RLCPspell** | Same as LCP/RLCP but spell-aware | Use `expcost` (≥ 0) and optional `duration_ref` (default *T*). |
| **LCS** | Longest common subsequence; order matters, timing relaxed | No substitution costs. |
| **NMS / NMSMST / SVRspell** | Count matching subsequences; SVRspell adds spell weighting | More exhaustive than LCS. |
| **CHI2 / EUCLID** | Compare "time budgets" in each state; ignore order | Distribution-based; `norm` can only be `"auto"` or `"none"`. |

---

## Function Signature

```python
get_distance_matrix(
    seqdata,              # required: SequenceData object
    method,               # required: one of the methods above
    refseq=None,          # optional: zero-based int index or [idx_list_A, idx_list_B]
    norm="none",          # optional: "auto", "none", "maxlength", "gmean", "maxdist", "YujianBo", "ElzingaStuder"
    indel="auto",         # for OM family: number | vector | "auto"
    sm=None,              # substitution costs: str or matrix (see below)
    full_matrix=True,     # True: n×n; False: condensed 1D for clustering
    tpow=1.0,             # OMspell, NMSMST, SVRspell: spell-length exponent
    expcost=0.5,          # OMloc, OMspell, OMspellRS, LCPspell, RLCPspell: duration weight (≥ 0)
    duration_ref=None,    # OMspellRS, LCPspell, RLCPspell: reference scale τ (default: observation window T)
    weighted=True,        # use sequence weights when building sm
    check_max_size=True,  # safety check for large datasets
    matrix_display="full",# "full" | "upper" | "lower" (display only)
    opts=None,            # pass parameters as a dict
    **kwargs              # method-specific (context, nu, link, h, euclid_backend, normalization_reference_index, ...)
)
```

> **Tip:** You rarely need all parameters. Pick a `method`, set `sm`/`indel` if required, and use `norm="auto"`. The function will choose sensible defaults.

---

## Parameters in Detail

### Common to All Methods

| Parameter | Required | Type | Description |
|-----------|----------|------|--------------|
| `seqdata` | ✓ | SequenceData | Your state-sequence object. |
| `method` | ✓ | str | One of: `OM`, `OMspell`, `OMspellRS`, `OMloc`, `OMslen`, `OMtspell`, `OMstran`, `TWED`, `HAM`, `DHD`, `LCS`, `LCP`, `RLCP`, `LCPspell`, `RLCPspell`, `LCPmst`, `RLCPmst`, `LCPprod`, `RLCPprod`, `NMS`, `NMSMST`, `SVRspell`, `CHI2`, `EUCLID`. |
| `refseq` | ✗ | int or list | **int:** zero-based reference row. **list `[A, B]`:** two index lists for a rectangular group-by-group distance table. If `None`, computes all pairwise distances. |
| `norm` | ✗ | str | Normalization mode: `"auto"`, `"none"`, `"maxlength"`, `"gmean"`, `"maxdist"`, `"YujianBo"`, or `"ElzingaStuder"`. See [normalizing sequences](../tutorials/normalizing-sequences.md). |
| `full_matrix` | ✗ | bool | If `True` (and `refseq=None`): return full `n×n` DataFrame. If `False`: return condensed 1D array (for clustering). Ignored when `refseq` is provided. |
| `weighted` | ✗ | bool | When building `sm` from data (e.g., `"TRATE"`), respect sequence weights. |
| `check_max_size` | ✗ | bool | Safety check against too many unique sequences. |
| `matrix_display` | ✗ | str | When the result is a full matrix: `"full"` (default), `"upper"`, or `"lower"`. The mask is applied after numeric computation and normalization, so it affects display only. |
| `opts` | ✗ | dict | Pass parameters as a bundle. |
| `**kwargs` | ✗ | - | Method-specific options such as `normalization_reference_index`, `euclid_backend`, `tokdep_coeff`, and OMstran settings. See the notes below. |

Additional notes:

- `norm="auto"` chooses a method-specific default. CHI2 and EUCLID only accept `"auto"` or `"none"`.
- `norm="ElzingaStuder"` applies the reference-based transformation from Elzinga and Studer (2019). It is not compatible with `refseq=[A, B]`.
- `with_missing` is ignored by `get_distance_matrix()` because missing values are always included by default.
- `normalization_reference_index` chooses the reference object for `norm="ElzingaStuder"`. It defaults to the single `refseq` index when one is supplied, otherwise to row `0`.
- `euclid_backend` can be `"auto"`, `"categorical"`, or `"dense"`.
- `tokdep_coeff` switches `OMspell` to `OMtspell`; OMstran-specific options include `transindel`, `otto`, `previous`, and `add_column`.

### Edit-based Measures: OM, OMspell, OMspellRS, OMloc, OMslen, OMstran, TWED

| Parameter | Required | Type | Description |
|-----------|----------|------|--------------|
| `sm` | ✓ for OM, OMspell, OMspellRS, OMloc, OMslen, OMstran, TWED | str or matrix | Substitution costs. **str:** `"TRATE"`, `"CONSTANT"`, `"INDELS"`, `"INDELSLOG"`, `"FUTURE"`, `"FEATURES"`. **matrix:** custom square matrix (states×states). For DHD: 3D array (time-varying). |
| `indel` | ✗ | number \| vector \| `"auto"` | Insertion/deletion cost(s). With `"auto"`, Sequenzo derives indel from `sm`, often as half the maximum substitution cost. Explicit vectors must match the number of states, including missing. For TWED with matrix `sm`, `"auto"` uses `2*max(sm)+nu+h`. |
| `tpow` | ✗ | float | `OMspell`, `NMSMST`, `SVRspell`: spell-length exponent (default 1.0). `OMspellRS`, `LCPspell`, `RLCPspell`, `LCPmst`, `RLCPmst`, `LCPprod`, and `RLCPprod` require `tpow=1.0`. |
| `expcost` | ✗ | float | Duration weight λ (default 0.5, **≥ 0**). For `OMspell`, `OMspellRS`, `LCPspell`, `RLCPspell`: `expcost=0` removes duration-related terms. `OMloc` also uses `expcost` (with additional constraints on `context`). Higher λ = stronger duration sensitivity. |
| `duration_ref` | ✗ | float | Reference scale τ for `OMspellRS`, `LCPspell`, and `RLCPspell`. The default is the observation window *T*. Choose τ before computation and use a design-based scale. For normalized LCPspell/RLCPspell with `expcost>0`, τ must be at least the largest observed active spell duration. |
| `context` | ✗ | float | OMloc only: local context. If omitted, Sequenzo uses `1 - 2*expcost`; with the default `expcost=0.5`, this gives `context=0`. Pass `context >= 0` explicitly when using larger `expcost`. |
| `link`, `h` | ✗ | str, float | OMslen only: `link` in `["mean","gmean"]`, `h` ≥ 0. |
| `nu`, `h` | ✗ | float | TWED only: `nu` (stiffness) required, `h` (gap penalty) default 0.5. |
| `tokdep_coeff` | ✗ | array | OMtspell: token-dependent coefficients (switches from OMspell when provided). |

**OMspell vs. OMspellRS:** `OMspell` uses TraMineR-style spell costs. `OMspellRS` divides duration terms by τ (`duration_ref`) before applying λ (`expcost`). Use `OMspellRS` when duration penalties should be expressed relative to a fixed observation window.

**OMspell / OMspellRS practical tips:**

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
| `norm` | ✗ | str | `"auto"` → `"gmean"` for LCP/RLCP; `"maxdist"` for LCPspell/RLCPspell and LCPmst/RLCPmst; `"none"` for LCPprod/RLCPprod. See the support table below. |
| `expcost` | ✗ | float | LCPspell/RLCPspell only: duration weight (≥ 0; `0` ignores duration). |
| `duration_ref` | ✗ | float | LCPspell/RLCPspell only: τ (default *T*). Same interpretation as for `OMspellRS`. |

**Note:** No `sm` or `indel` needed for prefix-based measures. LCP MST/product variants derive duration information internally; users do not pass a separate duration array to `get_distance_matrix()`.

### LCP-Family Normalization Support

| Method | Supported normalizations | Notes |
| --- | --- | --- |
| `LCP`, `RLCP` | `none`, `maxlength`, `gmean`, `maxdist`, `YujianBo`, `auto`, `ElzingaStuder` | `auto` selects `gmean`. Position-wise LCP/RLCP treat state code `0` as an ordinary state, not padding. |
| `LCPspell`, `RLCPspell` | `none`, `maxdist`, `auto`, `ElzingaStuder` | `auto` selects `maxdist`. With `norm="maxdist"` and `expcost>0`, `duration_ref` must be at least the largest observed active spell duration. |
| `LCPmst`, `RLCPmst` | `none`, `gmean`, `maxdist`, `YujianBo`, `auto`, `ElzingaStuder` | `auto` selects `maxdist`. `norm="maxlength"` is rejected. |
| `LCPprod`, `RLCPprod` | `none`, `auto` | Product-duration dissimilarity is raw squared-duration dissimilarity. No bounded normalization is defined. |

### Distribution-based: CHI2, EUCLID

| Parameter | Required | Type | Description |
|-----------|----------|------|--------------|
| `norm` | ✗ | str | Only `"auto"` or `"none"`. |
| `step`, `breaks`, `overlap` | ✗ | int, array, bool | Optional time-window controls. |
| `euclid_backend` | ✗ | str | EUCLID only: `"auto"` (default), `"categorical"` (fast C++ path when data are complete equal-length sequences with `step=1`, no custom `breaks`, no overlap, no missing values), or `"dense"` (portable CHI2-style backend). |

---

## Default Normalization per Method (`norm="auto"`)

| Method | Default norm |
|--------|--------------|
| OM, HAM, DHD | `"maxlength"` |
| LCS, LCP, RLCP | `"gmean"` |
| LCPspell, RLCPspell, LCPmst, RLCPmst | `"maxdist"` |
| LCPprod, RLCPprod | `"none"` (raw squared-duration dissimilarity; no method-specific upper bound) |
| OMloc, OMslen, OMspell, OMspellRS, OMtspell, OMstran, TWED, NMS, NMSMST, SVRspell | `"YujianBo"` |
| CHI2, EUCLID | Uses internal normalization (sqrt of n_breaks) |

---

## What the Function Does (Internal Steps)

1. **Validates inputs**: Checks `seqdata`, `method`, and method-specific arguments.
2. **Builds substitution and indel costs**: From `sm` (e.g., `"TRATE"`, `"CONSTANT"`) or your custom matrix. If `indel="auto"`, derives indel from `sm`.
3. **Normalizes**: Applies per-method normalization during C++ computation (or `"auto"` default). `norm="ElzingaStuder"` is applied afterward on the full matrix (or condensed vector). `matrix_display` masking is applied after numeric work.
4. **Deduplicates**: Compresses to unique sequences for faster C++ computation, then expands to requested output shape.
5. **Computes distances**: Uses compiled C++ backend (Python fallback for some CHI2/EUCLID cases).
6. **Handles edge cases**: Empty sequences → warning (error for `OMloc`); `refseq` provided with `full_matrix=False` → returns full table (info printed).

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

### 3b) OMspellRS (reference-scaled spell durations)

```python
omspell_rs = get_distance_matrix(
    seqdata=sequence_data,
    method="OMspellRS",
    sm="TRATE",
    indel="auto",
    expcost=0.5,
    duration_ref=None,   # default: observation window T (e.g. 20 years)
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
* **OMloc:** If `context` is omitted, Sequenzo sets `context = 1 - 2*expcost`. Therefore `expcost > 0.5` requires an explicit non-negative `context`.
* **OMspellRS / LCPspell / RLCPspell:** Set `duration_ref` before pairwise computation, preferably from the study-design observation window *T*. For normalized LCPspell/RLCPspell with `expcost>0`, τ must be at least the largest observed active spell duration.
* **LCPspell/RLCPspell:** Supported normalizations are `none`, `maxdist`, `auto`, and `ElzingaStuder`. `gmean`, `maxlength`, and `YujianBo` are rejected for these methods.
* **LCPmst/RLCPmst:** `norm="maxlength"` is rejected. Use `norm="auto"`/`"maxdist"` for bounded distances, or choose `none`, `gmean`, `YujianBo`, or `ElzingaStuder` deliberately.
* **LCPprod/RLCPprod:** Auto default is `norm="none"`. Other normalizations are rejected because product-duration weighting has no method-specific upper bound.
* **tpow:** Keep `tpow=1.0` for `OMspellRS` and the full LCP spell/MST/product family. Non-default `tpow` is rejected for these methods.
* **CHI2/EUCLID:** `norm` can only be `"auto"` or `"none"`.
* **ElzingaStuder:** Prefer a full pairwise matrix (`refseq=None`) and choose `normalization_reference_index` deliberately (empty sequence, medoid, or index 0). With a single `refseq`, non-zero distances collapse to 1 after reference-based post-processing. See [normalizing sequences](../tutorials/normalizing-sequences.md).
* **with_missing:** This parameter no longer exists; missing values are always included by default.

---

## Returns

| Condition | Shape | Type |
|-----------|-------|------|
| `refseq=None`, `full_matrix=True` | `n×n` | pandas DataFrame |
| `refseq=None`, `full_matrix=False` | Condensed 1D (length `n×(n-1)/2`) | numpy array (scipy squareform format) |
| `refseq=[A, B]` | `|A|×|B|` | pandas DataFrame |
| `refseq=int` | `n` distances | pandas Series |

Row and column labels come from `seqdata.ids`.

---

## See Also

- [Dissimilarity Measures](/en/tutorials/dissimilarity-measures) explains how to choose a method.
- [Normalizing Sequences](/en/tutorials/normalizing-sequences) explains the `norm` options.
- [Matrices in Dissimilarity Measures](/en/tutorials/matrix-in-dissimilarity-measures) separates costs, transition rates, and distances.
- [`Cluster()`](/en/function-library/hierarchical-clustering) consumes the resulting matrix.

## Authors

Code: Xinyi Li, Yuqi Liang

Documentation: Yuqi Liang

Edited by: Yuqi Liang, Yukun Ming

*Acknowledgements: We gratefully acknowledge Professor Gilbert Ritschard for his helpful comments and review suggestions.*

## References

Studer, M., & Ritschard, G. (2016). What matters in differences between life trajectories: A comparative review of sequence dissimilarity measures. Journal of the Royal Statistical Society: Series A, 179(2), 481-511.

Studer, M., & Ritschard, G. (2014). A comparative review of sequence dissimilarity measures. LIVES Working Papers, 33, 1-47.

Elzinga, C. H. (2007). Sequence analysis: Metric representations of categorical time series. Manuscript, Dept of Social Science Research Methods, Vrije Universiteit, Amsterdam.

Elzinga, C. H., & Liefbroer, A. C. (2007). De-standardization of Family-Life Trajectories of Young Adults: A Cross-National Comparison Using Sequence Analysis: Dé-standardisation des trajectoires de vie familiale des jeunes adultes: comparaison entre pays par analyse séquentielle. European Journal of Population/Revue européenne de démographie, 23(3), 225-250.

Elzinga, C. H., & Studer, M. (2015). Spell sequences, state proximities, and distance metrics. Sociological Methods & Research, 44(1), 3-47.

Biemann, T. (2011). A transition-oriented approach to optimal matching. Sociological Methodology, 41(1), 195-221.

Halpin, B. (2014). Three narratives of sequence analysis. In Advances in sequence analysis: Theory, method, applications (pp. 75-103). Cham: Springer International Publishing.

Hamming, R. W. (1950). Error detecting and error correcting codes. The Bell system technical journal, 29(2), 147-160.

Hollister, M. (2009). Is optimal matching suboptimal?. Sociological methods & research, 38(2), 235-264.

Lesnard, L. (2010). Setting cost in optimal matching to uncover contemporaneous socio-temporal patterns. Sociological methods & research, 38(3), 389-419.

Liang, Y. and J. Meyerhoff-Liang. 2026. Measuring Divergence and Convergence in Sequence Analysis: A Spell-based Extension of Longest Common Prefixes. Retrieved (osf.io/preprints/socarxiv/3pyhr_v1).
