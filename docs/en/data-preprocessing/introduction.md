# Data Preprocessing

Use these pages before creating a `SequenceData` object or before running a workflow that expects clean IDs, time columns, and sequence states.

## Choose a Task

| Task | Start with |
| --- | --- |
| Convert sequence data between wide and long formats | [Wide and Long Format Conversion](/en/data-preprocessing/wide-long-format) |
| Check missing values before analysis | [Check Missing Values](/en/data-preprocessing/missing-values) |
| Create stable IDs when the source data do not have them | [Assign Unique IDs](/en/data-preprocessing/assign-unique-ids) |
| Standardize time-column names | [Clean Time Columns](/en/data-preprocessing/clean-time-columns) |
| Replace numeric cluster IDs with readable labels | [Replace Cluster ID by Labels](/en/data-preprocessing/replace-cluster-id-by-labels) |

## Recommended Order

For most projects, convert the data to wide format if needed, clean the time-column names, make sure IDs are stable, check missing values, and then create [`SequenceData`](/en/function-library/sequence-data). Replacing cluster IDs with labels comes later, after clustering.

## Authors

