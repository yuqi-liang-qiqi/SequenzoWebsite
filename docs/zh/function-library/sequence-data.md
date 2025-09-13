# `SequenceData()`：把表格变成标准的序列数据结构

在完成预处理（preprocessing）后，下一步是正式定义序列数据结构。换句话说，`SequenceData` 是 Sequenzo 中表示（represent）序列的标准入口（canonical entry point）。

你可能会问：为啥要多这一步？就像在 pandas 的 DataFrame 里先把数据装好一样，想要高效分析，得先用一个统一的容器把行、列和元数据的摆放方式定下来。

`SequenceData()` 做的就是这件事：建立一个专门用于序列分析的结构，保证数据被统一存放，并且：

- **状态定义与顺序一致**（consistent state definitions & ordering）
- **整数编码与颜色映射可复现**（reproducible numeric encoding & color mapping）
- 自带**数据概览、校验、可视化**方法（summarization / validation / visualization）

有了这个正式定义，后续的距离计算（distance computation）、聚类（clustering）和可视化（visualization）才能在不同数据集和项目场景之中稳定运行。

## 常见工作流（Typical Workflow）

1) 你的表格应当是一行一个实体（entity，例如个人 individual / 企业 firm / 地区 region / 组织 organization），一列一个时间点（time point）。  
   示例输入（DataFrame）：

| Entity ID | 1   | 2     | 3     | 4  |
|-----------|-----|-------|-------|----|
| 1         | EDU | EDU   | FT    | FT |
| 2         | EDU | UNEMP | UNEMP | FT |
| 3         | FT  | FT    | FT    | FT |

每一行代表一个人（individual），也就是一条序列（sequence）；每一列代表一个时间点（time point）。

> ⚠️ 注意  
> 预处理阶段**建议把时间列名清理成纯数字**（1, 2, 3, 4），而不是 `Y1–Y4`。否则画图时 x 轴会显示 `Y1, Y2, Y3, Y4`，可读性不如 `1–4`。如何清理时间列，可参考文档 [`Clean time columns`](/en/data-preprocessing/clean_time_columns)

2) 提供完整且有序的状态列表（states），并按你希望的顺序排列；这个顺序会影响可视化的图例（legend）展示，例如 “Low”、“Medium”、“High”，而不是乱序。


3) 可选：提供一个ID 列（id_col）作为稳定索引，便于聚类与对齐。

4) 初始化 `SequenceData`，随后可用：
    - `values()` / `to_numeric()` 给下游算法使用；
    - `get_legend()` / `get_colormap()` 直接用于绘图。

## 用法（Function Usage）

```python
sequence = SequenceData(
    data=df,
    time_type='year',                 # 年份用 'year'，年龄用 'age'
    time=['1','2','3', ...],          # 按时间顺序的列名
    states=['EDU','FT','UNEMP'],      # 完整、有序的状态空间（state space）
    labels=['Education','Full-time','Unemployed'],  # 可选的显示标签（display labels）；labels元素顺序需与 states一一对应；未设置 labels 时，图例将使用 states 的名称
    id_col='Entity ID',               #  ID 列；若缺失可用 assign_unique_ids 创建
    weights=None,                     # 可选（默认每行权重为 1）
    start=1,                          # 数据概览里显示的起始序号
    custom_colors=None                # 可选的颜色列表（需与 states 对齐）
)
````
## 参数说明（Entry Parameters）

| 参数（Parameter）     | 必填（Required） | 类型（Type） | 说明（Description） |
| -------------------- | :--------------: | ----------- | ------------------- |
| `data`               |        ✓         | DataFrame   | 输入数据集，**行 = 实体（entities）**，**列 = 时间点（time points）**。 |
| `time_type`          |        ✓         | str         | `'year'` 或 `'age'`。 |
| `time`               |        ✓         | list        | 按时间顺序排列的时间列名列表。 |
| `states`             |        ✓         | list        | **有序**的状态空间（state space），决定编码（encoding）与颜色（colors）。 |
| `labels`             |        ✗         | list        | 人类可读名称（human-readable names），长度与 `states` 相同。 |
| `id_col`             |        ✓         | str         | 含唯一序列 ID（sequence IDs）的列名；如果没有该列，请在定义序列数据前用  [`assign_unique_ids`](https://github.com/Liang-Team/Sequenzo/search?q=assign_unique_ids) 创建。 |
| `weights`            |        ✗         | ndarray     | 行权重（row weights），默认全为 1。 |
| `start`              |        ✗         | int         | 数据概览（summaries）中的起始索引，默认 1。 |
| `custom_colors`      |        ✗         | list        | 用户自定颜色列表（custom color list），长度需与 `states` 一致。 |

> **说明**

> 这里的summaries（即在 `start` 的说明里提到的 “summaries”）指在初始化 `SequenceData` 之后，通过 `describe()` 等内置方法生成的数据概览（例如状态分布、缺失情况、序列长度等）。具体输出示例见下文 Examples。参数 `start` 用来设置这些概览里显示的起始索引（比如从 1 开始而不是 0）。


## 关键特性（Key Features）

### 校验（Validation）

- 确认所有 `states` 在数据中可识别。
- 如果提供了 `id_col`，检查其唯一性（uniqueness）。
- 检查 `labels` 的长度与类型是否正确。
- 校验 `weights` 的长度；未提供时默认全为 1。

### 缺失值（Missing Values）

- 自动检测 NA 单元格（NA，即缺失值，missing）。
- 如果你没在 `states` 里包含 `"Missing"`，但数据里又检测到缺失值，Sequenzo 会自动帮你把 `"Missing"` 加进去，这样这些单元格就能被明确标成“缺失”。
- 将缺失单元映射到最后一个整数编码。
- 建议在 `states` 与 `labels` 里显式包含 `"Missing"`。

### 编码与颜色（Encoding & Colors）

- 状态按 **用户提供的顺序** 映射为整数1...N（其中 N 表示状态总数）。
- 该顺序同时决定：
    - 整数编码（integer encoding）
    - 色图分配（colormap assignment）
    - 图例顺序（legend order）

### 颜色管理（Color Management）

- 若提供 `custom_colors`，其长度必须与 `states` 对齐；`custom_colors` 是一个列表，元素可写为十六进制颜色代码（hex color code），例如 `#BD462D`。
- 否则将使用 seaborn 的 `"Spectral"`（≤ 20 个状态）或 `"cubehelix"`；为增强对比，默认反转颜色（reversed colors）。

## 核心属性（Core Attributes）

- `seq.states`、`seq.labels`→ 标准化的状态空间（canonical state space）。
- `seq.ids` → 实体 ID（entity IDs）。
- `seq.n_sequences` → 序列数量（number of sequences）。
- `seq.n_steps` → 序列长度（sequence length）。
- `seq.weights` → 行权重（row weights，NumPy array）。
## 关键方法（Key Methods）

| 方法（Method）        | 返回值（Returns）   | 说明（Description）            |
| --------------------- | ------------------ |----------------------------|
| `get_colormap()`      | ListedColormap     | 与编码 1...N 对齐的色图（colormap）。 |
| `get_legend()`        | (handles, labels)  | 预构建的绘图图例元素与标签。             |
| `describe()`          | print              | 打印数据集的缺失值概览。               |
| `plot_legend()`       | figure             | 渲染或保存状态图例。                 |
> **说明**  
> 我们列出了 关键属性（Key attributes）和 关键方法（Key methods），但多数情况下你不需要手动调用。初始化并运行 `SequenceData()` 之后，系统会自动打印整体验证与概要信息（summary）。这些属性与方法主要用于：
> 1) 查看细节（如缺失情况、编码、权重）；
> 2) 绘图辅助（比如需要图例或色图时，用 `get_legend()` / `get_colormap()`）；
> 3) 导出数据给下游算法（用 `to_numeric()` / `to_dataframe()`）

## 示例（Examples）

### 1）最简构造（含缺失值）（Minimal Construction with Missing Values）

```python
# 创建 SequenceData 对象（Create a SequenceData object）

# 定义时间跨度列（time-span）
time_list = list(df.columns)[1:]

# 为了便于阅读与解释，我们使用 'D1 (Very Low)'、'D10 (Very High)' 这类命名。
# 注意：states 的顺序会影响编码与图例（legend）顺序。
# states = ['Very Low', 'Low', 'Middle', 'High', 'Very High']
states = ['D1 (Very Low)', 'D10 (Very High)', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9']

sequence_data = SequenceData(
    df,
    time=time_list,
    time_type="year",   # 年份用 'year'；如果时间轴是年龄，用 'age' 
    id_col="country",
    states=states,
    labels=states       # labels 的元素顺序需与 states 一一对应；如未设置 labels，图例会显示 states 的名称
)

sequence_data
```
输出（Output）：
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

### 2. 如果缺少 ID，先补上（Add IDs If Missing）
```python
from sequenzo.utils import assign_unique_ids

df = assign_unique_ids(df, id_col_name='Entity ID')

seq = SequenceData(
    df,
    time_type='year',
    time=year_cols,
    states=states,
    id_col='Entity ID'
)
```


_代码：梁彧祺_

_文档：梁彧祺_

_编辑：梁彧祺_

_翻译：明煜坤_
