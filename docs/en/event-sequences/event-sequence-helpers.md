# Event Sequence Helper Functions

These small helper functions make quick checks and summaries easier.

## `is_event_sequence(obj)`

Checks whether `obj` is a single event sequence.

```python
is_event_sequence(eseq[0])
```

### R Counterpart

- **Closest R function:** `TraMineR::is.eseq()`
- **Mapping note:** Same intent: check whether an object is one event sequence.

## `is_event_sequence_collection(obj)`

Checks whether `obj` is an event-sequence collection.

```python
is_event_sequence_collection(eseq)
```

### R Counterpart

- **Closest R function:** `TraMineR::is.seqelist()`
- **Mapping note:** Same intent: check whether an object is an event-sequence collection.

## `get_event_sequence_lengths(obj)`

Returns:

- an integer for one event sequence, or
- an array of lengths for an event-sequence list.

```python
one_len = get_event_sequence_lengths(eseq[0])
all_len = get_event_sequence_lengths(eseq)
```

### R Counterpart

- **Closest R function:** `TraMineR::seqelength()`
- **Mapping note:** Same helper purpose: retrieve event-sequence lengths.

## `get_event_sequence_weights(obj)`

Returns sequence weights from an event-sequence list.

```python
w = get_event_sequence_weights(eseq)
```

### R Counterpart

- **Closest R function:** `TraMineR::seqeweight()`
- **Mapping note:** Same helper purpose: retrieve event-sequence weights.

## See Also

- [Event Sequences Introduction](/en/event-sequences/introduction) explains the workflow and data structures.
- [Quickstart Example](/en/event-sequences/example) shows a complete event-mining run.
- [Helper Functions](/en/event-sequences/event-sequence-helpers) lists supporting utilities.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## Reference

Ritschard, G., Bürgin, R., & Studer, M. (2013). Exploratory Mining of Life Event Histories. In J. J. McArdle & G. Ritschard (Eds.), Contemporary Issues in Exploratory Data Mining in the Behavioral Sciences (pp. 221–253). Routledge.
