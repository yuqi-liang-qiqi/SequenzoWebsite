<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2026-05-06 16:36:01
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2026-05-06 16:36:01
 * @FilePath: /SequenzoWebsite/docs/en/event-sequences/event_sequence_helpers.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# Event Sequence Helper Functions

These small helper functions make quick checks and summaries easier.

## `is_event_sequence(obj)`

Checks whether `obj` is a single event sequence.

```python
is_event_sequence(eseq[0])
```

### R Counterpart

- **Closest R function:** `is.eseq`
- **Mapping note:** Same intent: check whether an object is one event sequence.

## `is_event_sequence_collection(obj)`

Checks whether `obj` is an event-sequence collection.

```python
is_event_sequence_collection(eseq)
```

### R Counterpart

- **Closest R function:** `is.seqelist`
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

- **Closest R function:** `seqelength`
- **Mapping note:** Same helper purpose: retrieve event-sequence lengths.

## `get_event_sequence_weights(obj)`

Returns sequence weights from an event-sequence list.

```python
w = get_event_sequence_weights(eseq)
```

### R Counterpart

- **Closest R function:** `seqeweight`
- **Mapping note:** Same helper purpose: retrieve event-sequence weights.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

