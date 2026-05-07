# `get_modal_state_sequence()`

`get_modal_state_sequence()` computes the modal (most frequent) state at each time position.

## Function Usage

```python
from sequenzo import get_modal_state_sequence
result = get_modal_state_sequence(seqdata, weighted=True, with_missing=False)
```

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `seqdata` | ✓ | `SequenceData` | Input sequence dataset. |
| `weighted` | ✗ | bool | Use sequence weights. |
| `with_missing` | ✗ | bool | Include missing values in modal computation. |

## What It Does

- Finds the most frequent state at each time point.
- Supports weighted modal computation.
- Returns a `DataFrame` describing the modal sequence over time.

## Examples

```python
from sequenzo import get_modal_state_sequence

modal = get_modal_state_sequence(seqdata, weighted=True)
print(modal)
```

## R Counterpart

- **Closest TraMineR function:** `seqmodst`
- **Mapping note:** This is a direct conceptual match; Sequenzo wraps modal-state computation with optional weighting and missing-state handling.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang
