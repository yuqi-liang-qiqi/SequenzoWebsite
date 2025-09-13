# `SequenceData()`

After you have prepared your sequence dataset through preprocessing functions (or if your data are already clean, you may skip this step), the next stage is to **formally define the sequence data structure**. In other words, `SequenceData` is the **canonical entry point** for representing sequences in Sequenzo.

You might ask: why is this step necessary? Think of it as similar to how pandas (a Python package for data analysis) uses a `DataFrame`: before you can analyze tabular data efficiently, you first need a consistent container that standardizes how rows, columns, and metadata are stored.  

In the same way, `SequenceData()` creates a `SequenceData`, a dedicated data structure presenting sequences for social sequence analysis.  

By doing so, it ensures that your sequences are stored in a unified format with:  
- consistent **state definitions and ordering**,  
- reproducible **numeric encoding and color mapping**,  
- built-in methods to **summarize, validate, and visualize** the dataset.  

This formal definition is what allows all subsequent steps, such as distance computation, clustering, and visualization, to work reliably across different datasets and projects.

## Typical Workflow

1. Ensure your table has **one row per entity** (e.g., individual / firm / region / organization) and **one column per time point**.  
   Example input DataFrame:

| Entity ID | Y1  | Y2   | Y3   | Y4 |
|-----------|-----|------|------|----|
| 1         | EDU | EDU  | FT   | FT |
| 2         | EDU | UNEMP| UNEMP| FT |
| 3         | FT  | FT   | FT   | FT |

Each row represents an individual (a sequence), and each column represents a time point.

> ⚠️ **Note**:  
> It is recommended to clean column names during preprocessing so that time points are pure numbers (`1, 2, 3, 4`) instead of `Y1–Y4`.  
> Otherwise, in visualizations where the x-axis represents time, labels like `Y1, Y2, Y3, Y4` will appear, which may look less clean and less intuitive than `1–4`.
> For further instruction on how to clean your time columns in the dataframe, please refer to [`Clean time columns`](/en/data-preprocessing/clean_time_columns)

2. Provide the full, ordered list of states in the exact order you want them to appear in encodings and legends (e.g., 'Low', 'Medium', 'High' — not shuffled).
3. Optionally provide an ID column for stable indexing and clustering.  
4. Initialize `SequenceData`, then use `values` / `to_numeric()` for downstream algorithms or `get_legend()` / `get_colormap()` for plotting.

## Function Usage

```python
sequence = SequenceData(
    data=df,
    time_type='year',               # Use 'year' for calendar year; use 'age' when the time axis is age
    time=['1','2','3', ...],        # ordered time columns
    states=['EDU','FT','UNEMP'],    # full, ordered state space
    labels=['Education','Full-time','Unemployed'],  # optional display labels; the order must correspond one-to-one with states; if labels are not set, legends will fall back to the state names
    id_col='Entity ID',             # ID column; if missing, create one with assign_unique_ids
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
`id_col` | ✓ | str | Column name containing unique sequence IDs. If your data lacks such a column, create one with  [`assign_unique_ids`](https://github.com/Liang-Team/Sequenzo/search?q=assign_unique_ids)  prior to defining the sequence data. |
| `weights`                          | ✗        | ndarray   | Row weights. Default = all ones.                        |
| `start`                            | ✗        | int       | Starting index in summaries. Default = 1.               |
| `custom_colors`                    | ✗        | list      | User-specified color list. Must match `states`.         |

> **Note**

> Here, *summaries* (the same “summaries” mentioned in the `start` parameter description) refers to the dataset overview produced after initializing `SequenceData`, typically printed via `describe()` (and related methods). It includes state distributions, missing-value overview, sequence length, etc. See Examples below for concrete outputs. The `start` parameter sets the starting index shown in these summaries (e.g., start at 1 rather than 0).


## Key Features

### Validation

* Ensures all `states` exist in the data.
* Confirms `id_col` uniqueness (if provided).
* Checks `labels` length and type.
* Validates `weights` length; defaults to 1 if omitted.

### Missing Values

* Detects NA cells automatically.
* If your `states` list doesn’t include `"Missing"` but the data contains missing values, Sequenzo will auto-add `"Missing"` so those cells are clearly labeled as missing.
* Maps missing cells to the last integer code.
* Recommendation: explicitly include `"Missing"` in your `states` and `labels`.

### Encoding & Colors

* States are mapped in user-provided order → integer codes 1...N (where N is the total number of states).
* This order controls:

  * integer encoding
  * colormap assignment
  * legend order

### Color Management

* If `custom_colors` is given, its length must match `states`; `custom_colors` is a list whose elements can be hex color codes (e.g., `#BD462D`).
* Otherwise, the default option is seaborn `"Spectral"` (≤20 states) or `"cubehelix"`.
* Colors reversed by default for contrast.

## Core Attributes

* `seq.states`, `seq.labels` → canonical state space.
* `seq.ids` → entity IDs.
* `seq.n_sequences` → number of sequences.
* `seq.n_steps` → sequence length.
* `seq.weights` → row weights (NumPy array).

## Key Methods

| Method              | Returns            | Description                                        |
| ------------------- | ------------------ |----------------------------------------------------|
| `get_colormap()`    | ListedColormap     | Colormap aligned to codes 1...N.                   |
| `get_legend()`      | (handles, labels)  | Prebuilt legend for plotting.                      |
| `describe()`        | print              | Dataset summary with missing overview.             |
| `plot_legend()`     | figure             | Renders or saves the state legend.                 |

> **Note**  
> We list key attributes and key methods here, but you’ll **rarely need to call them directly**. After you initialize `SequenceData()`, a **dataset summary is printed automatically**. These are mainly for:
> 1) **inspecting details** (e.g., missingness, encodings, weights);
> 2) **plotting utilities** (e.g., `get_legend()` / `get_colormap()`);
> 3) **exporting data** for downstream algorithms via `to_numeric()` / `to_dataframe()`.

## Examples

### 1. Minimal Construction (with missing values)

```python
# Create a SequenceData object
<<<<<<< HEAD

# Define the time-span variable
time_list = list(df.columns)[1:]

# We choose to use 'D1 (Very Low)', 'D10 (Very High)' for readability and interpretation.
# Note: the order of states controls encodings and legend order.
# states = ['Very Low', 'Low', 'Middle', 'High', 'Very High']
states = ['D1 (Very Low)', 'D10 (Very High)', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9']

sequence_data = SequenceData(
    df,
    time=time_list,
    time_type="year",   # Use 'year' for calendar year; use 'age' when the time axis is age
    id_col="country",
    states=states,
    labels=states       # labels must correspond one-to-one with states; if omitted, legends fall back to state names
)

sequence_data
```
Output:
=======

# Define the time-span variable
time_list = list(df.columns)[1:]

# We choose to use 'D1 (Very Low)', 'D10 (Very High)' as the states for readability and interpretation. 
# states = ['Very Low', 'Low', 'Middle', 'High', 'Very High']
states = ['D1 (Very Low)', 'D10 (Very High)', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9']

sequence_data = SequenceData(df, 
                             time=time_list, 
                             time_type="year", 
                             id_col="country", 
                             states=states,
                             labels=states)

sequence_data
```

Output:

>>>>>>> b658d86aa9fd2b126669a347d761cf8e04f59839
```python
[!] Detected missing values (empty cells) in the sequence data.
    → Automatically added 'Missing' to `states` and `labels` for compatibility.
    However, it's strongly recommended to manually include it when defining `states` and `labels`.
    For example:

        states = ['At Home', 'Left Home', 'Missing']
        labels = ['At Home', 'Left Home', 'Missing']

    This ensures consistent color mapping and avoids unexpected visualization errors.

[>] SequenceData initialized successfully! Here's a summary:
[>] Number of sequences: 194
[>] Number of time points: 223
[>] Min/Max sequence length: 216 / 223
[>] There are 7 missing values across 1 sequences.
    First few missing sequence IDs: ['Panama'] ...
[>] Top sequences with the most missing time points:
    (Each row shows a sequence ID and its number of missing values)

             Missing Count
Sequence ID               
Panama                   7
[>] States: ['D1 (Very Low)', 'D10 (Very High)', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'Missing']
[>] Labels: ['D1 (Very Low)', 'D10 (Very High)', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'Missing']
SequenceData(194 sequences, States: ['D1 (Very Low)', 'D10 (Very High)', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'Missing'])
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

## Author(s)

_Code: Yuqi Liang_

_Documentation: Yuqi Liang_

_Edited by: Yuqi Liang, Yukun Ming_