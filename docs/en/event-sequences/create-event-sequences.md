# `EventSequenceData()`

Use `EventSequenceData()` constructors to build event-sequence objects, similar to [`SequenceData()`](../function-library/sequence-data.md) for state sequences. 

## Constructor Usage

```python
EventSequenceData.from_tse(
    data=None,
    id=None,
    timestamp=None,
    event=None,
    end_event=None,
    event_labels_order=None
)

EventSequenceData.from_state_sequences(
    seqdata,
    event_representation="transition",
    use_labels=True,
    weighted=True,
    end_event=None,
    event_labels_order=None
)
```

## TraMineR Parameter Mapping

- `data` / `id` / `timestamp` / `event` -> TraMineR `data` / `id` / `timestamp` / `event`
- `seqdata` -> TraMineR `seqdata`
- `event_representation` -> TraMineR `tevent`
- `use_labels` -> TraMineR `use.labels`
- `weighted` -> TraMineR `weighted`
- `event_labels_order` -> TraMineR `alphabet`

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `data` | ✓* | DataFrame / SequenceData | Main input. Use either this, or provide `id` + `timestamp` + `event` directly. |
| `id` | ✓* | array-like | Person or case identifier. |
| `timestamp` | ✓* | array-like | Event time for each row. |
| `event` | ✓* | array-like | Event label for each row. |
| `end_event` | ✗ | str | Optional event label used as end marker. |
| `event_representation` | ✗ | str / np.ndarray | Conversion method from state to event sequence (`"transition"`, `"state"`, `"period"`). |
| `use_labels` | ✗ | bool | Use state labels when converting from state sequences. |
| `weighted` | ✗ | bool | Keep sequence weights when available. |
| `event_labels_order` | ✗ | list[str] | Optional custom order of event labels. |

`*` Provide either `data`, or (`id`, `timestamp`, `event`).

## What It Does

- Validates required columns and missing values.
- Sorts events by `id` and time.
- Builds a clean event dictionary and internal event codes.
- Returns an `EventSequenceData` object used by later functions.

## Examples

### 1. From timestamped event table (recommended)

```python
from sequenzo.event_sequences import EventSequenceData

eseq = EventSequenceData.from_tse(data=tse_df)
```

### 2. From vectors

```python
eseq = EventSequenceData.from_tse(
    id=df["id"],
    timestamp=df["timestamp"],
    event=df["event"]
)
```

### 3. From state sequences

```python
eseq = EventSequenceData.from_state_sequences(
    seqdata=seqdata,
    event_representation="transition"
)
```

## R Counterpart

- **Closest R function:** `seqecreate`
- **Mapping note:** Sequenzo follows the same core idea: build event-sequence objects from TSE-style input (`id`, `timestamp`, `event`) or from state sequences, via `EventSequenceData` constructors.

## Notes

- Input order does not need to be pre-sorted; the function sorts it for you.
- Event names with `(`, `)` or `,` may make subsequence string matching harder.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Ritschard, G., Burgin, R., & Studer, M. (2013). Exploratory Mining of Life Event Histories. In J. J. McArdle & G. Ritschard (Eds.), *Contemporary Issues in Exploratory Data Mining in the Behavioral Sciences* (pp. 221-253). Routledge.