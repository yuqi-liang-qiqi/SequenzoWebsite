# `create_idcd_sequence_from_csvs()`

`create_idcd_sequence_from_csvs()` creates a multidomain sequence dataset using the IDCD (Individual Domain Combined Data) strategy. This approach combines sequence data from multiple CSV files (each representing one domain) into a single multidomain sequence object by creating composite states from observed combinations.

Unlike CAT or DAT which work with separate domain sequences and combine them during distance computation, IDCD creates the combined sequences upfront. Each time point in the resulting sequences represents a combination of states from all domains (e.g., "Employed+Married" if combining employment and family domains).

This is useful when you want to work with the combined sequences directly, or when your data comes from separate CSV files that you need to merge into a unified sequence format.

## Function Usage

A minimal example with only the required parameters:

```python
sequence_data = create_idcd_sequence_from_csvs(csv_paths, time_cols)
```

A complete example with all available parameters:

```python
sequence_data = create_idcd_sequence_from_csvs(
    csv_paths,                        # required: list of CSV file paths
    time_cols,                        # required: list of time column names
    id_col="id",                      # optional: ID column name
    domain_state_labels=None          # optional: label mappings for each domain
)
```

## Entry Parameters

| Parameter | Required | Type | Description |
| --------- | -------- | ---- | ----------- |
| `csv_paths` | ✓ | `list[str]` | A list of file paths to CSV files, one for each domain. Each CSV should contain the same ID column and the same time columns. The number of rows (individuals) must be the same across all CSVs, and IDs must match across files. |
| `time_cols` | ✓ | `list[str]` | A list of column names representing time points. These columns must exist in all CSV files specified in `csv_paths`. The order in this list determines the order of time points in the resulting sequences. |
| `id_col` | ✗ | `str` | The name of the ID column used to align individuals across CSV files. Must exist in all CSV files. Default = `"id"`. |
| `domain_state_labels` | ✗ | `list[dict]` or `None` | A list of dictionaries, one for each domain, that maps raw state values to human-readable labels. Each dictionary maps the state values found in that domain's CSV to their labels. If `None`, raw state values are used as labels. Default = `None`. |

## What It Does

The function performs the following steps:

1. **Loads CSV files:** Reads each CSV file specified in `csv_paths` and validates that required columns exist.

2. **Aligns data:** Sorts all dataframes by the ID column to ensure individuals are aligned in the same order across domains.

3. **Creates composite states:** For each individual and each time point, combines states from all domains using the "+" separator. For example:
   - If domain 1 has state "A" and domain 2 has state "B" at time T1, the composite state becomes "A+B"
   - If using numeric codes like 0 and 1, the composite might be "0+1"

4. **Identifies observed states:** Only keeps composite states that actually appear in your data. Unlike CAT which creates all possible combinations, IDCD only uses combinations that are observed.

5. **Builds labels (optional):** If `domain_state_labels` is provided, creates human-readable labels for each composite state. For example, "0+1" might become "Employed + Married".

6. **Creates SequenceData object:** Returns a `SequenceData` object containing:
   - Combined sequences with composite states
   - An alphabet consisting only of observed composite states
   - Labels for these states (if provided)
   - Individual IDs

7. **Prints frequency table:** Displays a table showing how frequently each observed composite state appears in your data.

## Examples

### 1. Basic usage with two domains

```python
from sequenzo.multidomain.idcd import create_idcd_sequence_from_csvs

# Paths to your CSV files
csv_paths = [
    "employment_domain.csv",  # Domain 1: Employment
    "family_domain.csv"       # Domain 2: Family
]

# Time columns that exist in both CSVs
time_cols = ["Y1", "Y2", "Y3", "Y4"]

# Create IDCD sequence data
sequence_data = create_idcd_sequence_from_csvs(
    csv_paths=csv_paths,
    time_cols=time_cols,
    id_col="id"
)
```

Your CSV files should look like this:

**employment_domain.csv:**
```
id,Y1,Y2,Y3,Y4
1,Employed,Employed,Unemployed,Employed
2,Employed,Unemployed,Unemployed,Employed
3,Unemployed,Unemployed,Employed,Employed
```

**family_domain.csv:**
```
id,Y1,Y2,Y3,Y4
1,Single,Single,Married,Married
2,Married,Married,Married,Married
3,Single,Married,Married,Married
```

The resulting sequences will have composite states like "Employed+Single", "Employed+Married", "Unemployed+Single", "Unemployed+Married".

### 2. Using numeric states with labels

If your CSVs use numeric codes (0, 1, etc.) and you want readable labels:

```python
# Define label mappings for each domain
domain_state_labels = [
    {0: "Employed", 1: "Unemployed"},    # Domain 1 labels
    {0: "Single", 1: "Married"}          # Domain 2 labels
]

sequence_data = create_idcd_sequence_from_csvs(
    csv_paths=csv_paths,
    time_cols=time_cols,
    id_col="id",
    domain_state_labels=domain_state_labels
)
```

Your CSV files would use numeric codes:

**employment_domain.csv:**
```
id,Y1,Y2,Y3,Y4
1,0,0,1,0
2,0,1,1,0
3,1,1,0,0
```

**family_domain.csv:**
```
id,Y1,Y2,Y3,Y4
1,0,0,1,1
2,1,1,1,1
3,0,1,1,1
```

The function will create composite states like "0+0", "0+1", "1+0", "1+1", but display them with labels like "Employed + Single", "Employed + Married", etc.

### 3. Three domains example

```python
csv_paths = [
    "employment_domain.csv",
    "family_domain.csv",
    "education_domain.csv"
]

time_cols = ["Y1", "Y2", "Y3"]

domain_state_labels = [
    {0: "Employed", 1: "Unemployed"},
    {0: "Single", 1: "Married"},
    {0: "Low", 1: "High"}
]

sequence_data = create_idcd_sequence_from_csvs(
    csv_paths=csv_paths,
    time_cols=time_cols,
    id_col="id",
    domain_state_labels=domain_state_labels
)
```

This will create composite states like "0+0+0", "0+1+1", etc., with labels like "Employed + Single + Low", "Employed + Married + High", etc.

### 4. Understanding the output

The function prints a frequency table showing observed states:

```
[IDCD] Observed Combined States Frequency Table:
        State       Label                    Frequency  Proportion (%)
  Employed+Single   Employed + Single              15            12.5
 Employed+Married   Employed + Married             45            37.5
Unemployed+Single   Unemployed + Single            10             8.3
Unemployed+Married  Unemployed + Married           50            41.7
```

This shows:
- Which composite states actually appear in your data
- How frequently each state appears
- The proportion of all observations accounted for by each state

### 5. Using the resulting SequenceData

After creating the IDCD sequence data, you can use it like any other `SequenceData` object:

```python
# Create IDCD sequences
sequence_data = create_idcd_sequence_from_csvs(
    csv_paths=csv_paths,
    time_cols=time_cols
)

# Use with distance computation
from sequenzo.dissimilarity_measures import get_distance_matrix

distance_matrix = get_distance_matrix(
    seqdata=sequence_data,
    method="OM",
    sm="TRATE",
    indel="auto"
)

# Use with clustering
from sequenzo.clustering.hierarchical_clustering import Cluster

cluster_result = Cluster(matrix=distance_matrix, entity_ids=sequence_data.ids)
labels = cluster_result.get_cluster_labels(num_clusters=3)
```

## Understanding IDCD vs Other Approaches

IDCD differs from CAT and DAT in important ways:

**IDCD (Individual Domain Combined Data):**
- Creates combined sequences upfront
- Uses only observed state combinations
- Simpler workflow: combine first, then analyze
- Good when you want to work directly with combined sequences
- Alphabet size depends on what combinations actually occur in your data

**CAT (Combined Alphabet Technique):**
- Keeps domains separate until distance computation
- Creates all possible state combinations for cost computation
- More complex: computes costs on composite states
- Better when you want explicit control over substitution costs
- Alphabet size is the product of domain alphabet sizes

**DAT (Distance Additive Trick):**
- Keeps domains separate throughout
- Adds domain-specific distance matrices
- Simplest: no composite states needed
- Most efficient computationally
- Doesn't consider cross-domain state combinations explicitly

**When to use IDCD:**
- Your data comes from separate CSV files that need to be combined
- You want to work with combined sequences directly
- You prefer a simpler workflow without complex cost calculations
- You only care about observed combinations, not all possible ones

## Important Notes

1. **File requirements:** All CSV files must have:
   - The same ID column (specified by `id_col`)
   - The same time columns (specified by `time_cols`)
   - The same number of rows (individuals)
   - Matching IDs across files (individuals must be in the same order after sorting)

2. **State separator:** The function uses "+" to join states from different domains. Make sure this character doesn't appear in your actual state values, or the parsing might fail.

3. **Observed states only:** Unlike other approaches that might consider all possible combinations, IDCD only uses combinations that actually appear in your data. This means:
   - If no individual has state combination "A+B+C", it won't be in the alphabet
   - Your alphabet size may be smaller than the product of domain alphabet sizes
   - This can be more efficient but might miss theoretically possible transitions

4. **Label mapping:** When providing `domain_state_labels`:
   - The list should have one dictionary per domain, in the same order as `csv_paths`
   - Each dictionary maps raw values (as they appear in the CSV) to labels
   - If a state value isn't in the dictionary, the raw value will be used as the label
   - Labels are only used for display; the actual states in sequences remain as composite strings

5. **Data alignment:** The function sorts all dataframes by ID before combining. Make sure IDs match across files. If an individual appears in one file but not another, you'll get a mismatch error.

6. **Missing values:** Handle missing values in your CSV files before using this function. Missing values might be converted to strings like "nan" in composite states, which may not be what you want.

## Common Use Cases

1. **Multiple survey waves:** When you have separate files for different domains measured across the same time periods.

2. **Data from different sources:** When employment, family, and education data come from different databases that need to be merged.

3. **Preliminary exploration:** When you want to quickly see what combined state combinations occur in your data before doing more complex multidomain analysis.

4. **Simplified workflow:** When you prefer combining domains first and then using standard sequence analysis tools, rather than using specialized multidomain distance computation methods.

## Author

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Ritschard, G., Liao, T. F., & Struffolino, E. (2023). Strategies for multidomain sequence analysis in social research. Sociological Methodology, 53(2), 288-322.