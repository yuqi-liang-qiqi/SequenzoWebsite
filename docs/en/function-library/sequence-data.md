# `SequenceData()`

After you have prepared your sequence dataset through preprocessing functions (or if your data are already clean, you may skip this step), the next stage is to **formally define the sequence data structure**. In other words, `SequenceData` is the **canonical entry point** for representing sequences in Sequenzo.

You might ask: why is this step necessary? Think of it as similar to how pandas (a Python package for data analysis) uses a `DataFrame`: before you can analyze tabular data efficiently, you first need a consistent container that standardizes how rows, columns, and metadata are stored.  

In the same way, `SequenceData)` creates a `SequenceData`, a dedicated data structure presenting sequences for social sequence analysis.  

By doing so, it ensures that your sequences are stored in a unified format with:  
- consistent **state definitions and ordering**,  
- reproducible **numeric encoding and color mapping**,  
- built-in methods to **summarize, validate, and visualize** the dataset.  

This formal definition is what allows all subsequent steps, such as distance computation, clustering, and visualization, to work reliably across different datasets and projects.

## Typical Workflow

1. Ensure your table has **one row per entity** and **one column per time point**.  
   Example input DataFrame:

   | Entity ID | Y1    | Y2    | Y3    | Y4    |
   |-----------|-------|-------|-------|-------|
   | 1         | EDU   | EDU   | FT    | FT    |
   | 2         | EDU   | UNEMP | UNEMP | FT    |
   | 3         | FT    | FT    | FT    | FT    |

   Each row represents an individual (a sequence), and each column represents a time point.

> ⚠️ **Note**:  
> It is recommended to clean column names during preprocessing so that time points are pure numbers (`1, 2, 3, 4`) instead of `Y1–Y4`.  
> Otherwise, in visualizations where the x-axis represents time, labels like `Y1, Y2, Y3, Y4` will appear, which may look less clean and less intuitive than `1–4`.
> For further instruction on how to clean your time columns in the dataframe, please refer to [`Clean time columns`](/en/data-preprocessing/clean_time_columns)

2. Provide the **complete, ordered list of states** you want to recognize (even if some do not appear in this subset).  
3. Optionally provide an **ID column** for stable indexing and clustering.  
4. Initialize `SequenceData`, then use `values` / `to_numeric()` for downstream algorithms or `get_legend()` / `get_colormap()` for plotting.

## Function Usage

```python
sequence = SequenceData(data=df,
                        time_type='year',               # or 'age'
                        time=['1','2','3', ...],     # ordered time columns
                        states=['EDU','FT','UNEMP'],    # full, ordered state space
                        labels=['Education','Full-time','Unemployed'],  # optional
                        id_col='Entity ID',             # optional but recommended
                        weights=None,                   # optional (defaults to 1 per row)
                        start=1,                        # start index used in summaries
                        custom_colors=None              # optional list of colors
                        )
````

## Entry Parameters

| Parameter                          | Required | Type      | Description                                             |
| ---------------------------------- | -------- | --------- | ------------------------------------------------------- |
| `data`                             | ✓        | DataFrame | Input dataset with rows = entities, cols = time points. |
| `time_type`                        | ✓        | str       | `'year'` or `'age'`.                                    |
| `time`                             | ✓        | list      | Ordered list of time column names.                      |
| `states`                           | ✓        | list      | Ordered state space. Controls encoding & colors.        |
| `labels`                           | ✗        | list      | Human-readable names, same length as `states`.          |
`id_col` | ✓ | str | Column name containing unique sequence IDs. If your data lacks such a column, create one with `assign_unique_ids` prior to defining the sequence data. |
| `weights`                          | ✗        | ndarray   | Row weights. Default = all ones.                        |
| `start`                            | ✗        | int       | Starting index in summaries. Default = 1.               |
| `custom_colors`                    | ✗        | list      | User-specified color list. Must match `states`.         |

## Key Features

### Validation

* Ensures all `states` exist in the data.
* Confirms `id_col` uniqueness (if provided).
* Checks `labels` length and type.
* Validates `weights` length; defaults to 1 if omitted.

### Missing Values

* Detects NA cells automatically.
* If `Missing` is not in `states`, appends it for compatibility.
* Maps missing cells to the last integer code.
* Recommendation: explicitly include `"Missing"` in your `states` & `labels`.

### Encoding & Colors

* States are mapped **in user-provided order** → integer codes 1..N.
* This order controls:

  * integer encoding
  * colormap assignment
  * legend order

### Color Management

* If `custom_colors` is given → must match `states`.
* Otherwise → seaborn `"Spectral"` (≤20 states) or `"cubehelix"`.
* Colors reversed by default for contrast.

## Core Attributes

* `seq.seqdata` → integer-coded DataFrame of sequences.
* `seq.states`, `seq.labels`, `seq.alphabet` → canonical state space.
* `seq.ids` → entity IDs.
* `seq.n_sequences` → number of sequences.
* `seq.n_steps` → sequence length.
* `seq.weights` → row weights (NumPy array).

## Key Methods

| Method              | Returns            | Description                                        |
| ------------------- | ------------------ | -------------------------------------------------- |
| `values()`          | np.ndarray (int32) | Alias for `to_numeric()`.                          |
| `to_numeric()`      | np.ndarray (int32) | Matrix of integer-coded sequences.                 |
| `to_dataframe()`    | DataFrame          | Coded sequences with IDs as index.                 |
| `flatten()`         | np.ndarray         | 1D vector of sequences row-wise.                   |
| `flatten_weights()` | np.ndarray         | Repeated weights aligned to `flatten()`.           |
| `get_xtabs(other)`  | np.ndarray         | Cross-tabulation matrix vs another `SequenceData`. |
| `get_colormap()`    | ListedColormap     | Colormap aligned to codes 1..N.                    |
| `get_legend()`      | (handles, labels)  | Prebuilt legend for plotting.                      |
| `describe()`        | print              | Dataset summary with missing overview.             |
| `plot_legend()`     | figure             | Renders or saves the state legend.                 |

## Examples

### 1. Minimal Construction

```python
states = ['EDU','FT','UNEMP','Missing']
labels = ['Education','Full-time','Unemployed','Missing']

sequence_data = SequenceData(
    data=df,
    time_type='year',
    time=[f'{t}' for t in range(1, 11)],
    states=states,
    labels=labels,
    id_col='Entity ID'
)

X = seq.to_numeric()
cm = seq.get_colormap()
handles, labs = seq.get_legend()
```

### 2. Add IDs If Missing

```python
from sequenzo.utils import assign_unique_ids
df = assign_unique_ids(df, id_col_name='Entity ID')

sequence = SequenceData(
    df,
    time_type='year',
    time=year_cols,
    states=states,
    id_col='Entity ID'
)
```

### 3. Cross-Tab Two Domains

```python
seq_a = SequenceData(df_a, 'year', year_cols, states_a, id_col='Entity ID')
seq_b = SequenceData(df_b, 'year', year_cols, states_b, id_col='Entity ID')

xt = seq_a.get_xtabs(seq_b, weighted=True)
```

## Author(s)

Code: Yuqi Liang

Documentation: Yuqi Liang

Edited by: Yuqi Liang