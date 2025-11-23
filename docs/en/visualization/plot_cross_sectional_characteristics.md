# `plot_cross_sectional_characteristics()`

`plot_cross_sectional_characteristics()` visualizes how diverse the population is at each time point by plotting cross-sectional entropy over time.

This function shows how **cross-sectional entropy** changes across time points. Cross-sectional entropy measures how evenly distributed the population is across different states at each time point. 

- **Higher entropy** (closer to 1): The population is more evenly distributed across states (more diversity)
- **Lower entropy** (closer to 0): One state dominates the population (less diversity)

This is useful for understanding temporal patterns like "at which time point are states most diverse?" or "when does one state become dominant?"

If you run it in a Jupyter Notebook, the figure appears under the cell. If you run it as a Python script, a window will pop up. You can also save the figure to a file with `save_as`.

## Function Usage

A minimal example with only the required parameters (sufficient for most use cases):

```python
plot_cross_sectional_characteristics(sequence_data)
```

A complete example with all available parameters (for advanced customization):

```python
result = plot_cross_sectional_characteristics(
    sequence_data,
    figsize=(10, 6),                              # optional, default = (10, 6)
    fontsize=12,                                  # optional, default = 12
    title="Cross-sectional entropy over time",    # optional, default = "Cross-sectional entropy over time"
    show_title=True,                              # optional, default = True
    xlabel="Time",                                # optional, default = "Time"
    ylabel="Entropy (0-1)",                       # optional, default = "Entropy (0-1)"
    line_color="#74C9B4",                         # optional, default = "#74C9B4"
    save_as=None,                                 # optional, default = None
    dpi=200,                                      # optional, default = 200
    return_data=False,                            # optional, default = False
    custom_state_colors=None                      # optional, default = None
)
```

## Entry Parameters

| Parameter | Required | Type           | Description                                                           |
| --------- | -------- | -------------- | --------------------------------------------------------------------- |
| `seqdata` | ✓        | `SequenceData` | A `SequenceData` object containing the sequences you want to analyze. |
| `figsize` | ✗        | tuple          | Size of the plot as (width, height) in inches. Default = `(10, 6)`. |
| `fontsize` | ✗       | int            | Base font size for labels, ticks, and axes. Title uses `fontsize+1`. Default = `12`. |
| `title` | ✗          | str            | Title for the entropy plot. If `show_title=False`, this is ignored. Default = `"Cross-sectional entropy over time"`. |
| `show_title` | ✗       | bool           | Whether to display the title. If False, no title will be shown regardless of the `title` parameter value. Default = `True`. |
| `xlabel` | ✗        | str            | Label for the x-axis. Default = `"Time"`. |
| `ylabel` | ✗        | str            | Label for the y-axis. Default = `"Entropy (0-1)"`. |
| `line_color` | ✗      | str            | Color for the entropy line. Can be any valid matplotlib color including hex colors like `"#FF5733"`, named colors like `"red"`, or RGB tuples. Default = `"#74C9B4"`. |
| `save_as` | ✗       | str            | File path to save the plot. If None, plot will only be displayed. Supported formats: `.png`, `.jpg`, `.jpeg`, `.pdf`, `.svg`. If no extension provided, `.png` will be added automatically. |
| `dpi` | ✗          | int            | Resolution (dots per inch) for saved image. Higher values result in better quality but larger file sizes. Default = `200`. |
| `return_data` | ✗     | bool           | Whether to return the computed data. If False, only displays the plot. If True, returns a dictionary with frequencies, entropy, and valid states. Default = `False`. |
| `custom_state_colors` | ✗ | dict           | Custom color mapping for states. Keys should match your state labels. If None, uses the colors defined in your `SequenceData` object. Note: This parameter is maintained for compatibility but not used in entropy plot. Default = `None`. |

## What It Does

* Calculates cross-sectional entropy for each time point:
  - At each time point, measures how evenly distributed the population is across states
  - Normalizes entropy to 0-1 scale for easy interpretation

* Creates a line plot showing entropy over time:
  - X-axis: Time points
  - Y-axis: Entropy values (0-1)

* Uses index plot styling with clean borders and subtle grid

* Optionally returns computed data if `return_data=True`

* Optionally saves the plot to a file if `save_as` is specified

## Examples

### 1. Basic example (displays plot only)

```python
from sequenzo.visualization.plot_characteristics import plot_cross_sectional_characteristics

# Display entropy plot
plot_cross_sectional_characteristics(sequence_data)
```

This creates a line plot showing how entropy changes over time.

### 2. Custom title and size

```python
plot_cross_sectional_characteristics(
    sequence_data,
    figsize=(12, 6),
    title="Population Diversity Over Time"
)
```

### 3. Plot without title

```python
plot_cross_sectional_characteristics(
    sequence_data, 
    show_title=False
)
```

This hides the title even if a `title` parameter is provided.

### 4. Custom labels

```python
plot_cross_sectional_characteristics(
    sequence_data,
    xlabel="Years",
    ylabel="Diversity Index"
)
```

### 5. Custom line color (hex color)

```python
plot_cross_sectional_characteristics(
    sequence_data,
    line_color="#2E86AB"
)
```

### 6. Custom line color (named color)

```python
plot_cross_sectional_characteristics(
    sequence_data,
    line_color="red"
)
```

### 7. Save plot to file

```python
plot_cross_sectional_characteristics(
    sequence_data, 
    save_as="entropy_plot.png",
    dpi=300
)
```

This saves a high-resolution PNG file.

### 8. Save as PDF

```python
plot_cross_sectional_characteristics(
    sequence_data,
    save_as="entropy_analysis.pdf"
)
```

### 9. Get data when needed

```python
result = plot_cross_sectional_characteristics(
    sequence_data, 
    return_data=True
)

# Access the computed data
entropy_values = result['Entropy']        # Series with entropy for each time point
frequencies = result['Frequencies']       # DataFrame with state frequencies by time
valid_n = result['ValidStates']           # Series with sample sizes per time point

print(entropy_values)
print(frequencies.head())
```

Output:

```
Y1    0.726
Y2    0.918
Y3    0.543
Name: per_time_entropy_norm, dtype: float64

        Y1        Y2        Y3
A  0.666667  0.333333  0.333333
B  0.333333  0.333333  0.333333
C  0.000000  0.333333  0.333333
```

**Interpretation:**

**Cross-sectional entropy** measures how diverse the population is at each time point. Values range from 0 to 1:

- **0**: Everyone is in the same state (no diversity). Example: At time Y5, 100% of the population is in state "A".

- **1**: Population is equally distributed across all possible states (maximum diversity). Example: At time Y2, 33.3% are in state "A", 33.3% in "B", and 33.3% in "C".

**How to read the plot:**

- **Rising entropy** over time: The population is becoming more diverse (states are becoming more evenly distributed).

- **Falling entropy** over time: One state is becoming dominant (the population is converging).

- **Peak entropy** time: The time point when states are most diverse (e.g., early career might have more variation).

- **Lowest entropy** time: The time point when one state dominates (e.g., later career might converge to one dominant state).

**Example use cases:**

- **Employment sequences:** "At which career stage are employment patterns most diverse?" - Early career might show high entropy (many different employment states), while later career shows low entropy (convergence to full-time employment).

- **Health status sequences:** "When does health status become most diverse?" - Certain age groups might show higher entropy due to transition periods.

- **Educational sequences:** "At what point do educational paths converge?" - Early stages might be diverse, while later stages converge to specific paths.

## Notes and Tips

* Cross-sectional entropy is different from within-sequence entropy:
  - **Cross-sectional entropy** (this function): How diverse the population is at each time point
  - **Within-sequence entropy** (used in `plot_longitudinal_characteristics`): How diverse each individual sequence is

* The plot uses index plot styling with clean borders, consistent with other Sequenzo visualization functions.

* For state distribution visualization (showing proportions of each state over time), use the dedicated `plot_state_distribution` function.

* Values are automatically normalized to 0-1 scale for easy interpretation.

* The function optionally returns computed data if you need to use the entropy values or frequencies for further analysis.

* Default line color is a soft green (`#74C9B4`), which is publication-friendly. You can customize it for presentations or to match your organization's color scheme.

## Author
Code: Yuqi Liang

Documentation: Yuqi Liang
