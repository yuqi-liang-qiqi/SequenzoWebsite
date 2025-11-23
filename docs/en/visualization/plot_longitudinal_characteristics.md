# `plot_longitudinal_characteristics()`

`plot_longitudinal_characteristics()` creates a horizontal bar chart showing four key sequence characteristics for selected sequences.

This function calculates and visualizes four important sequence characteristics:

1. **Transitions:** How many times sequences change from one state to another
2. **Entropy:** How diverse/varied the sequences are
3. **Turbulence:** How chaotic or unpredictable the sequences are
4. **Complexity:** How complex the overall pattern is

All values are normalized to 0-1 scale for easy comparison. This makes it easy to identify sequences with different patterns: high-transition sequences, highly diverse sequences, turbulent sequences, or complex sequences.

If you run it in a Jupyter Notebook, the figure appears under the cell. If you run it as a Python script, a window will pop up. You can also save the figure to a file with `save_as`.

## Function Usage

A minimal example with only the required parameters (sufficient for most use cases):

```python
metrics = plot_longitudinal_characteristics(sequence_data)
```

A complete example with all available parameters (for advanced customization):

```python
metrics = plot_longitudinal_characteristics(
    sequence_data,
    pick_ids=None,              # optional, default = None
    k=9,                        # optional, default = 9
    selection='first',          # optional, default = 'first'
    order_by="complexity",      # optional, default = "complexity"
    figsize=(8, 6),             # optional, default = (8, 6)
    fontsize=12,                # optional, default = 12
    title=None,                 # optional, default = None
    show_title=True,            # optional, default = True
    xlabel="Normalized Values", # optional, default = "Normalized Values"
    ylabel="Sequence ID",       # optional, default = "Sequence ID"
    save_as=None,               # optional, default = None
    dpi=200,                    # optional, default = 200
    custom_colors=None,         # optional, default = None
    show_sequence_ids=False,    # optional, default = False
    id_as_column=True           # optional, default = True
)
```

## Entry Parameters

| Parameter | Required | Type           | Description                                                           |
| --------- | -------- | -------------- | --------------------------------------------------------------------- |
| `seqdata` | ✓        | `SequenceData` | A `SequenceData` object containing the sequences you want to analyze. |
| `pick_ids` | ✗        | list           | Specific sequence IDs you want to plot. If provided, only these sequences will be shown. If None, automatically selects sequences based on `selection` and `k`. Example: `[1, 5, 10, 23]` |
| `k` | ✗        | int            | Number of sequences to display when `pick_ids` is None. Warning: Using more than 15 may make the plot hard to read. Default = `9`. |
| `selection` | ✗    | str            | How to select sequences when `pick_ids` is None: `'first'` (show k sequences with highest values for `order_by` metric) or `'last'` (show k sequences with lowest values). Default = `'first'`. |
| `order_by` | ✗      | str            | Which metric to use for sorting sequences when `pick_ids` is None: `'transitions'`, `'entropy'`, `'turbulence'`, or `'complexity'`. Default = `'complexity'`. |
| `figsize` | ✗      | tuple          | Size of the plot as (width, height) in inches. Example: `(10, 8)` for a larger plot. Default = `(8, 6)`. |
| `fontsize` | ✗     | int            | Base font size for labels, ticks, and legend. Title uses `fontsize+2`. Default = `12`. |
| `title` | ✗          | str            | Title to display at the top of the plot. If None, no title is shown. Example: `"Sequence Characteristics Comparison"` |
| `show_title` | ✗       | bool           | Whether to display the title. If False, no title will be shown regardless of the `title` parameter value. Default = `True`. |
| `xlabel` | ✗        | str            | Label for the horizontal axis (x-axis). Default = `"Normalized Values"`. |
| `ylabel` | ✗        | str            | Label for the vertical axis (y-axis). Default = `"Sequence ID"`. |
| `save_as` | ✗       | str            | File path to save the plot. If None, plot will only be displayed. Supported formats: `.png`, `.jpg`, `.jpeg`, `.pdf`, `.svg`. If no extension provided, `.png` will be added automatically. |
| `dpi` | ✗          | int            | Resolution (dots per inch) for saved image. Higher values result in better quality but larger file sizes. Default = `200`. |
| `custom_colors` | ✗    | dict/list      | Colors for the four bars. If dict, keys can include `{'Transitions', 'Entropy', 'Turbulence', 'Complexity'}`. If list/tuple of length 4, maps to the above order. Default = `None` (uses default colors). |
| `show_sequence_ids` | ✗ | bool           | If True, y-axis shows actual sequence IDs (when available). If False, shows 1..N index positions. Default = `False`. |
| `id_as_column` | ✗    | bool           | If True, the returned DataFrame includes ID as a separate column. If False, IDs will be used as the DataFrame index. Default = `True`. |

## What It Does

* Calculates four normalized metrics (0-1 scale) for all sequences:
  - **Transitions:** Normalized count of state changes
  - **Entropy:** Normalized within-sequence diversity
  - **Turbulence:** Normalized sequence unpredictability
  - **Complexity:** Normalized overall sequence complexity

* Selects sequences to display:
  - If `pick_ids` is provided: Shows only those specific sequences
  - If `pick_ids` is None: Selects top/bottom k sequences based on `order_by` metric

* Creates a horizontal grouped bar chart with four bars per sequence:
  - Each bar represents one characteristic
  - All values are normalized to 0-1 for easy comparison

* Returns a DataFrame containing the calculated metrics for all plotted sequences

* Optionally saves the plot to a file if `save_as` is specified

## Examples

### 1. Basic example (plot 9 most complex sequences)

```python
from sequenzo.visualization.plot_characteristics import plot_longitudinal_characteristics

# Plot 9 sequences with highest complexity
metrics = plot_longitudinal_characteristics(sequence_data)
print(metrics)
```

Output shows a horizontal bar chart with four bars for each of the 9 sequences, and returns:

```
   ID  Transitions  Entropy  Turbulence  Complexity
0   1        0.750    0.823       0.654       0.742
1   2        0.625    0.789       0.612       0.698
2   3        0.875    0.856       0.723       0.812
...
```

### 2. Plot specific sequences by ID

```python
metrics = plot_longitudinal_characteristics(
    sequence_data, 
    pick_ids=[1, 5, 10, 15]
)
```

This shows only sequences with IDs 1, 5, 10, and 15, regardless of their characteristic values.

### 3. Plot 5 sequences with highest number of transitions

```python
metrics = plot_longitudinal_characteristics(
    sequence_data, 
    k=5, 
    order_by='transitions'
)
```

This selects the 5 sequences with the most state changes and displays all four characteristics for them.

### 4. Customize the plot appearance

```python
metrics = plot_longitudinal_characteristics(
    sequence_data,
    k=6,
    figsize=(12, 8),
    title="My Sequence Analysis",
    xlabel="Characteristic Scores",
    ylabel="Person ID",
    fontsize=14
)
```

This creates a larger plot with custom labels and title.

### 5. Plot without title

```python
metrics = plot_longitudinal_characteristics(
    sequence_data, 
    show_title=False
)
```

This hides the title even if a `title` parameter is provided.

### 6. Custom colors

```python
# Using a dictionary
metrics = plot_longitudinal_characteristics(
    sequence_data,
    custom_colors={
        'Transitions': '#FF5733',
        'Entropy': '#33FF57',
        'Turbulence': '#3357FF',
        'Complexity': '#FF33F5'
    }
)

# Or using a list (maps in order: Transitions, Entropy, Turbulence, Complexity)
metrics = plot_longitudinal_characteristics(
    sequence_data,
    custom_colors=['#FF5733', '#33FF57', '#3357FF', '#FF33F5']
)
```

### 7. Save plot to file

```python
metrics = plot_longitudinal_characteristics(
    sequence_data,
    save_as="sequence_characteristics.png",
    dpi=300
)
```

This saves a high-resolution PNG file.

### 8. Save as PDF

```python
metrics = plot_longitudinal_characteristics(
    sequence_data,
    save_as="characteristics_analysis.pdf"
)
```

### 9. Show actual sequence IDs on y-axis

```python
metrics = plot_longitudinal_characteristics(
    sequence_data,
    pick_ids=[101, 205, 310],
    show_sequence_ids=True
)
```

This displays the actual IDs (101, 205, 310) instead of indices (1, 2, 3) on the y-axis.

### 10. Return DataFrame with ID as index

```python
metrics = plot_longitudinal_characteristics(
    sequence_data,
    id_as_column=False
)
print(metrics)
```

Output:

```
     Transitions  Entropy  Turbulence  Complexity
ID                                               
1           0.750    0.823       0.654       0.742
2           0.625    0.789       0.612       0.698
...
```

**Interpretation:**

The four characteristics help you understand different aspects of your sequences:

- **Transitions** (higher = more state changes): Identifies sequences with frequent changes between states. Example: Employment sequences with many job changes.

- **Entropy** (higher = more diversity): Identifies sequences with diverse states. Example: Life course sequences experiencing many different life stages.

- **Turbulence** (higher = more unpredictable): Identifies sequences with irregular, chaotic patterns. Example: Health sequences with unpredictable status changes.

- **Complexity** (higher = more complex patterns): Identifies sequences with complex overall patterns combining transitions and diversity. Example: Educational sequences with complex progression patterns.

All values range from 0 to 1, making them easy to compare. A value close to 1 means the sequence is among the most extreme in that characteristic, while a value close to 0 means it's among the least extreme.

## Notes and Tips

* All metric values are automatically normalized to 0-1 scale for comparability.

* If you try to plot more than 15 sequences, you'll get a warning about potential overplotting (too crowded to read clearly).

* The function returns a DataFrame with the calculated metrics, so you can use these values for further analysis.

* Use `pick_ids` when you want to compare specific sequences (e.g., outliers or interesting cases).

* Use `order_by` and `selection` when you want to explore sequences with extreme values for a particular characteristic.

* The plot uses horizontal bars, which makes it easy to compare multiple characteristics across sequences.

* Default colors are soft and publication-friendly. You can customize them for presentations or to match your organization's color scheme.

## Author
Code: Yuqi Liang

Documentation: Yuqi Liang
