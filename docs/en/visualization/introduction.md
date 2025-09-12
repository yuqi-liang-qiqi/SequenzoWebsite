<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-12 13:21:00
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-12 14:21:44
 * @FilePath: /SequenzoWebsite/docs/en/visualization/introduction.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# Common Parameters and How Plots Work

All Sequenzo visualization functions share a few core ideas. If you understand this page, you can use any plot with confidence.

## Where the plot appears

* Jupyter Notebook → the figure shows under the cell.
* Python script → a window opens (depends on your environment).
* If a function has `show`, setting `show=False` suppresses on-screen display; you can still save via `save_as`.

## Saving figures

```python
save_as="figure.png"   # or "figure.pdf", "figure.jpg"
dpi=200                # 300+ for publication, if your machine can handle it
```

* If you omit the extension, `.png` is used.
* The file goes to your current working directory unless you provide an absolute path.

## Figure size

`figsize=(width, height)` in inches.

* Many groups or long time spans → larger figures (e.g., `(14, 8)`).
* Quick previews → smaller figures render faster.

## Colors and legends

* Colors come from your `SequenceData` object and stay consistent across plots.
* Legends also come from `SequenceData` (same labels, same colors).
* Want to tweak a color? Edit the palette before plotting, for example:

  ```python
  # Example: change the color for the "Education" state
  seqdata.color_map_by_label["Education"] = "#1f77b4"
  ```

## Time axis and units

* Time labels are taken from `SequenceData` (e.g., years/months/waves).
* Make sure axis labels match your unit (e.g., “Year”, “Month”, “Wave”).
* Some functions use percentages (0–100%), others use proportions (0–1). Axis labels tell you which it is.

## Grouping into panels

* `id_group_df` must map each “Entity ID” to a group.
* `categories` is the column in `id_group_df` that names the group variable.
* Layout:

  * `layout="column"` stacks groups vertically.
  * `layout="grid"` arranges groups in a grid; optionally set `nrows`/`ncols`.
* Order:

  * `group_order` fixes the panel order.
  * `sort_groups` controls automatic ordering (“auto”, “numeric”, “alpha”, “none”).

## Sorting sequences (where applicable)

* Some plots sort rows to reveal structure:

  * Lexicographic by time (default) or rules like `"transition_count"`, `"final_state"`, etc.
* Sorting changes only the display order, not your data.

## Performance tips

* Big datasets (many sequences/time points) → use `show=False` and save to file; open the image later.
* Prefer aggregated plots (e.g., modal state, distribution) when the index plot is too dense.
* Use vector formats (`.pdf`, `.svg`) for print; use `.png` for slides and docs.

## Quick presets (copy/paste)

```python
# Publication-ready PNG
save_as="figure.png"; dpi=300; figsize=(14, 8)

# Fast preview in Notebook
save_as=None; dpi=150; figsize=(10, 6)

# Batch export without popping windows
show=False; save_as="figure.png"
```

## Troubleshooting

* Blank or tiny plot:

  * Data may not match groups. Check that `id_group_df["Entity ID"]` aligns with `seqdata.ids`.
* Colors look wrong or inconsistent:

  * Ensure state labels in your data match `SequenceData` labels; adjust `color_map_by_label` before plotting.
* No legend or cut-off legend:

  * Some functions place the legend outside the axes. Increase figure width/height or save to PDF.
* “Nothing saved”:

  * Check `save_as` path and extension. Without extension, `.png` is added.

*Author: Yuqi Liang*
