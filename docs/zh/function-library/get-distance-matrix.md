# `get_distance_matrix()`：计算距离矩阵
`get_distance_matrix()` 是 Sequenzo 里做**序列比较的核心函数**。它把一组分类序列（比如职业路径、家庭轨迹、健康状态）两两对比，产出一个矩阵，告诉你每两条序列有多不一样。这个不一样的数叫**非相似度（dissimilarity）**，用来算它的算法叫**非相似度度量（dissimilarity measure）**。

需要强调一下：`get_distance_matrix()` 的输出始终是一个` n × n `的矩阵，n 是你数据里的序列条数。这个距离矩阵常作为很多下游分析的起点，例如聚类（clustering）。在文献中，聚类得到的组别也常被称为类型（typologies）。此外，它也常用于可视化（visualization）以及在序列数据上做回归（regression）。

想系统了解各种算法怎么选、各参数什么意思，建议先看这份[《非相似度度量指南》](../tutorials/dissimilarity-measures.md)。如果你先认真读完，再来阅读这个函数文档的话，就会省时又省力。

已经熟悉了？那直接往下看用法就行。

## 算法速查（method cheatsheet）：什么时候用哪个？

* **OM（Optimal Matching）**：通用的状态编辑距离（`edit distance` 类算法）。支持自定义 `sm`（替换成本）与 `indel`（插入／删除成本）。它之所以被称为“编辑距离”，是因为它通过替换、插入和删除等编辑操作来比较序列。

* **OMspell**：与 OM 类似，但在片段／连续段上操作；当持续时长重要的时候更合适。

* **HAM（Hamming-like positional distance）**：简单的按位置替换；要求等长。

* **DHD（Dynamic Hamming with time-varying costs）**：类似 HAM，但成本可以随着位置变化（基于转移率 transition rates）。

* **LCP／RLCP**：基于公共前缀的距离；用于强调早期路径相似（LCP）或者它的反方向（RLCP）。

## 函数用法

可用的算法有多种（[详见指南](../tutorials/dissimilarity-measures.md)）。由于 `get_distance_matrix()` 需要同时支持所有这些算法，参数看起来会比较多。但在实际使用中，每一种相异度算法只需要少量的关键参数，刚刚我们括号里提到的指南对这些参数都有清晰的说明。

简单来说，要先定好要用哪种度量，然后设定 `method`，再配上与这个算法相关的少数几个参数就行。比如常见的最优匹配（Optimal Matching，`method="OM"`），主要就是决定替换与插入/删除成本（`sm` 与 `indel`），以及可选的归一化方案（`norm`）。

**提示**：下面的代码块再配上与这个算法相关的少数几个参数就行；在我们实际使用中通常不需要全部设置。另外，我们在这里先给大家展示所有参数，让大家有个印象，之后会对每种算法所需要的参数挨个讲解。

```python
om = get_distance_matrix(
    seqdata=sequence_data,   # SequenceData 对象
    method="OM",             # "OM", "OMspell", "HAM", "DHD", "LCP", 或 "RLCP"
    sm="TRATE",              # 替换成本的规格或矩阵（见下文）
    indel="auto",            # number | vector | "auto"（仅用于 OM/OMspell）
    norm="auto",             # "none" | "auto" | "maxlength" | "gmean" | "maxdist" | "YujianBo"
    full_matrix=True,        # 返回完整 n×n 矩阵
    refseq=None,             # 或传入两个索引集合：[idx_list_A, idx_list_B]
    tpow=1.0,                # 仅用于 OMspell：片段长度指数（spell-length exponent）
    expcost=0.5,             # 仅用于 OMspell：片段变形成本（spell transform cost）
    weighted=True,           # 在从数据构建 sm（如 "TRATE"）时考虑序列权重
    check_max_size=True      # 针对极多非重复序列的安全检查
)
```
##  根据不同算法来展示各自的所属参数
首先，我们来看各个算法的默认设置。把默认参数搞明白，后面就好理解，也好选择、调整相应的参数。一般来说，需要你按照自己的研究问题或理论假设去选择算法修改参数，但如果你暂时还没有明确的想法，一个稳妥的起点是 `method = "OM"`，`sm="CONSTANT"`（任意状态替换成本为 2），indel=1。更多解释见[指南](../tutorials/dissimilarity-measures.md)。

* **OM（Optimal Matching，通用）**：`sm` 由用户设定，`indel="auto"`，`norm="auto"`。

* **OMspell（片段时长敏感）**：`sm` 由用户设定，`indel="auto"`，`tpow=1.0`，`expcost=0.5`，`norm="auto"`。

* **HAM（Hamming，严格按位置）**：若没有设定 `sm`，默认使用常数替换矩阵，所有成本为 1（`sm="CONSTANT", cval=2`），`norm="auto"`。该算法要求所有序列等长；例如，你的数据中每条序列都覆盖恰好10个时间点/年份。

* **DHD（Dynamic Hamming，按位置且成本随时间变化）**：默认 `sm="TRATE"`，`norm="auto"`。要求序列等长。

* **LCP / RLCP（Longest Common Prefix / Reversed LCP，前缀相似）**：`norm="auto"`，不需要 `sm` 或 `indel`。

### 所有算法通用的参数
| 参数               | 必填 | 数据类型         | 说明                                                                                                               |
| ---------------- | -- |--------------|------------------------------------------------------------------------------------------------------------------|
| `seqdata`        | ✓  | SequenceData | Sequenzo 的状态序列对象。                                                                                                |
| `method`         | ✓  | str          | `"OM"`、`"OMspell"`、`"HAM"`、`"DHD"`、`"LCP"`、`"RLCP"` 之一。                                                          |
| `refseq`         | ✗  | list         | 两个索引列表 \[A, B]。返回 `A × B` 的距离表。如果为 `None`，计算所有成对距离。                                                              |
| `norm`           | ✗  | str          | `"none"`、`"auto"`、`"maxlength"`、`"gmean"`、`"maxdist"`、`"YujianBo"`。`"auto"` 会按方法选择合理默认值。                         |
| `full_matrix`    | ✗  | bool         | 当 `"refseq=None"` 时，`"full_matrix=True"` 就给你完整的 `n×n`，`"full_matrix=False"` 就给非重复序列的方形矩阵。如果是 `"refseq，full_matrix"` 就可以忽略。 |
| `weighted`       | ✗  | bool         | 当从数据构建 `sm`（例如 `"TRATE"`）时，如果有权重则予以考虑。                                                                           |
| `check_max_size` | ✗  | bool         | 如果非重复序列数量可能导致计算过大，将提前停止。                                                                                         |
| `opts`           | ✗  | dict         | 用字典方式成组传参。                                                                                                       |
| `**kwargs`       | ✗  | —            | `with_missing` 被忽略；缺失值会始终作为额外状态在内部处理。                                                                            |

### 基于编辑的度量：OM、OMspell
| 参数        | 必填                  | 类型             | 适用方法        | 说明                                                                     |
| --------- | ------------------- |----------------| ----------- |------------------------------------------------------------------------|
| `sm`      | `OM` 与 `OMspell` 必填 | str 或矩阵        | OM, OMspell | 替换成本。可用 `"TRATE"`（基于转移）、`"CONSTANT"`（单一常数，即 `sm=2`），或提供方形的矩阵（状态 × 状态）。 |
| `indel`   | ✗                   | 数字、向量或 `"auto"` | OM, OMspell | 插入/删除成本。数字表示常数；向量为按状态设置（长度需等于状态数，包含缺失）；`"auto"` 会依据 `sm` 推导一致的值。       |
| `norm`    | ✗                   | str            | OM, OMspell | 推荐默认：`OM 为 "maxlength"`，`OMspell 为 "YujianBo"`。                        |
| `tpow`    | ✗                   | float          | OMspell     | 片段长度指数权重，控制对长片段的强调程度。                                                  |
| `expcost` | ✗                   | float（正数）      | OMspell     | 片段的变形成本，值越大，对片段拉伸或压缩的惩罚越强。                                             |

OMspell 常见于文献。它比较的是**片段（spells，指同一状态的连续片段）** 而非单个位置，因此当持续时长很重要时更合适。

**OMspell 参数的实用提示**

| 参数           | 常见取值           | 含义                                 | 实用建议                                                    |
| ------------ | -------------- |------------------------------------|---------------------------------------------------------|
| `expcost`（δ） | 0、0.1、0.5、1    | 将片段长度扩大或缩小 1 个时间单位的成本，控制对持续时间的敏感度。 | `0`：基本忽略时长，只看状态顺序。`0.1–0.5`：对时长有中等敏感度（常用）。`1`：强烈关注长短差异。 |
| `tpow`       | 0.5–2          | 基于片段时长的指数权重。                       | `1.0`：线性（默认）。小于 1：弱化长片段，强调短片段；大于 1：放大长片段影响。             |
| `indel`      | 1–5            | 相对替换的插入/删除成本。                      | 值越高越强调精确对齐（少对齐）；值越低允许更多平移，更关注顺序与时长形态。                   |
| `sm`         | `"TRATE"` 或固定值 | 替换成本策略。                            | `"TRATE"` 常与 `indel="auto"` 联用；固定值 2 是不使用转移成本时的常见基线。    |

**OMspell 使用指引**

* 主要看顺序（sequencing）：将 `expcost` 设为接近 0。

* 同时看顺序和持续时长（duration）：取中等 `expcost`（0.1–0.5），并配合 `tpow ≈ 1`。

* 研究长短差异（长段 vs 短段）：使用较高的 `expcost`（≈ 1），并设置 `tpow > 1`。例如长期失业 vs 反复短期失业。

说明

* 当 `sm` 为 `TRATE` 的时候，替换成本会从你的数据中学习；另一情况下，当 `indel` 为 `auto` 的时候，会自动给出与 `sm` 一致的 `indel` 值。

* OMspell 使用片段（spell，连续相同状态的片段）与片段时长；你可以通过 `tpow` 与 `expcost` 为片段长度加权。如果你关注片段持续时间的差异，按照 Studer 与 Ritschard（2016）的建议，应选择 OMspell；因为它会显式考虑状态持续多久，而不仅仅是状态的先后顺序。
### 基于位置度量（Position-wise measures）：HAM、DHD
| 参数     | 必填与否               | 类型           | 适用方法     | 说明                                                                                                             |
| ------ | ------------------ | ------------ | -------- |----------------------------------------------------------------------------------------------------------------|
| `sm`   | `HAM` 非必填，`DHD` 必填 | str 或矩阵或三维数组 | HAM, DHD | HAM：如果为 `None`，若未指定 `sm`，将自动创建一个常数替换成本矩阵，常数为 2（即任意状态替换成本均为 2，`"cval=2"`）；DHD：使用 `"TRATE"`，或提供三维数组（随时间位置变化的成本）。 |
| `norm` | ✗                  | str          | HAM, DHD | 推荐在 `norm="auto"` 下使用 `"maxlength"`。                                                                           |

说明

* DHD 在 HAM 的基础上做了推广，允许成本随时间位置变化（例如可以对早期与晚期差异赋予不同权重）。

* 所有序列必须等长（按位置比较）。

### 前缀为基础的度量：LCP、RLCP
| 参数     | 必填 | 类型  | 适用方法      | 说明                                  |
| ------ | -- | --- | --------- | ----------------------------------- |
| `norm` | ✗  | str | LCP, RLCP | 在 `norm="auto"` 下，推荐默认值为 `"gmean"`。 |

说明

* 这里不需要替换成本或插入／删除成本（substitution／indel／Cost）。

* LCP 强调原始顺序中的公共前缀；RLCP 在序列反转后强调公共前缀（即原序列中的公共后缀）。

* 当你关注早期路径相似度（或通过 RLCP 关注晚期路径相似度）时很有用。

## 这个函数做了什么

1. 校验输入与支持的方法

   支持的方法：OM、OMspell、HAM、DHD、LCP、RLCP。
    
2. 构建替换成本与插入／删除成本

   * 当传入 `sm="TRATE"` 时，成本来自你的数据中的转移率（在 DHD 中会随时间位置变化）。

   * 当在 HAM 中传入 `sm="CONSTANT"` 时，使用简单的常也就是`sm=2`数替换成本。

   * 当 `indel="auto"` 且 `sm` 已知时，会推导出与 `sm` 一致的 `indel`。

   * 你也可以提供自定义的 `sm` 替换成本矩阵，一个方形矩阵（k × k），其中 k 为状态数，`sm[i][j]` 表示从状态 i 到状态 j 的替换成本（通常设为对称，但并非必须）。对于 DHD，你可以提供按时间位置的三维数组 T × k × k（time × state × state），允许成本随时间变化。


3. 按照你研究设计的需要（normalization）

   * `norm="auto"` 时会自动选择：

     * OM、HAM、DHD → `"maxlength"`

     * LCP／RLCP → `"gmean"`

     * OMspell → `"YujianBo"`

   * 你也可以改为列表中的其他可用归一化方式（不适用的除外）。

4. 内部去重相同序列

   * 函数会把数据压缩为非重复序列，从而加速 C++ 距离计算。

   * 计算完非重复序列之间的距离后，再展开回你请求的输出形状。

5. 使用编译后端计算距离

   * 计算核心由 C++ 完成以提升速度。

   * 当 `refseq=None`： `full_matrix=True` 返回完整 `n×n` 矩阵；`full_matrix=False` 返回“非重复序列”的方形矩阵。

   * 当 `refseq=[idxs_A, idxs_B]`：返回一个 `|A|×|B|` 的数据框架，行／列标签来自你的原始 ID。

6. 安全与边界行为

   * 若存在空序列，会给出警告（或对不支持该情形的方法报错）。

   * 若 `full_matrix=False` 且 `refseq is not None`，仍会返回完整矩阵（并打印说明信息）。

   * 若非重复序列数量超过安全上限，函数会抛出清晰的错误，除非设置 `check_max_size=False`。


## 示例

### 1) 基于转移率成本的 OM

```python
om = get_distance_matrix(
seqdata=sequence_data,
method="OM",
sm="TRATE",     # 从观测到的转移构建成本
indel="auto",
norm="auto",    # 对 OM 会选 "maxlength"
full_matrix=True
)
```

### 2) 片段敏感的 OM（时长重要）

```python
omspell = get_distance_matrix(
seqdata=sequence_data,
method="OMspell",
sm="TRATE",
indel="auto",
tpow=1.0,
expcost=0.5,
norm="auto"     # 对 OMspell 会选 "YujianBo"
)
```

### 3) HAM（等长序列）

```python
ham = get_distance_matrix(
    seqdata=sequence_data_equal_length,
    method="HAM",
    sm="CONSTANT",   # 常数替换成本
    norm="auto"      # 对 HAM 会选 "maxlength"
)
```

### 4) DHD（等长，成本随位置而变化）

```python
dhd = get_distance_matrix(
    seqdata=sequence_data_equal_length,
    method="DHD",
    sm="TRATE",     # 内部构建按位置的三维成本数组
    norm="auto"
)
```

### 5） LCP 与 RLCP（强调早期路径或它的反方向）

```python
lcp = get_distance_matrix(seqdata=sequence_data, method="LCP",  norm="gmean")
rlcp = get_distance_matrix(seqdata=sequence_data, method="RLCP", norm="gmean")
```

### 6） 两组之间的距离（A 对 B）

```python
idxs_A = list(range(0, 100))     # 前 100 个实体
idxs_B = [10, 50, 250, 400]      # 比较集合
ab = get_distance_matrix(
    seqdata=sequence_data,
    method="OM",
    sm="TRATE",
    refseq=[idxs_A, idxs_B],     # 返回 |A|×|B| 的 DataFrame
    full_matrix=True             # 此处被忽略；总是返回完整表
)
```

### 7） 仅计算“非重复序列”方形矩阵以节省内存

```python
reduced = get_distance_matrix(
seqdata=sequence_data,
method="OM",
sm="TRATE",
full_matrix=False            # 返回非重复序列的方形矩阵
)
```
## 小贴士与常见坑
* 对于 HAM／DHD，请确保序列长度一致；否则会触发明确的报错。

* 若为 `indel` 提供了一个向量，其长度必须与 `seqdata.states` 中的状态数量一致（按字母表顺序，包含缺失）。

* 面对超大数据集，建议先用 `full_matrix=False` 查看非重复序列的结构。

* `with_missing` 参数已移除；缺失值会被一致地默认处理。

## 返回值

返回一个距离的 Pandas DataFrame。
形状如下：

* 当 `refseq=None` 且 `full_matrix=True`：`n×n`；

* 当 `refseq=None` 且 `full_matrix=False`：`u×u`（u 为非重复序列数量）；

* 当 `refseq=[idxs_A, idxs_B]`：`|A|×|B|`。

* 行／列标签取自 `seqdata.ids`。



## 
_代码：李欣怡_

_文档：梁彧祺_

_编辑：梁彧祺_

_翻译：明煜坤_

## 参考文献
Studer, Matthias, and Gilbert Ritschard. "What matters in differences between life trajectories: A comparative review of sequence dissimilarity measures." Journal of the Royal Statistical Society Series A: Statistics in Society 179, no. 2 (2016): 481-511.