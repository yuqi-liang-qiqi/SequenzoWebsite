
# `replace_cluster_id_by_labels()`：
# 替换簇 ID 为标签

`replace_cluster_id_by_labels()` 是一个辅助函数，能够帮助你把 `DataFrame` 里原本属于数字类型的聚类 ID（ `cluster ID`）替换成你自己定义的标签，还能按照你的实际需要，给标识列（也就是 `Entity ID` 列）和聚类列（ `Cluster column`）进行重命名。  
聚类分析跑完后，要是你不想用干巴巴的数字 ID、想给聚类起个好懂的名字（比如 `「Group A」` `「Group B」`），用这个函数就特别省事。
## 函数的用法

```python
new_df = replace_cluster_id_by_labels(
    df,
    mapping={1: "A", 2: "B", 3: "C"},   # 选填参数
    new_cluster_column_name="Cluster",  # 选填参数
    new_id_column_name="Entity ID"      # 选填参数
)
```

## 输入参数
| 参数名称                | 是否必填 | 数据类型           | 参数说明                                                                                                                                     |
|-------------------------|----------|----------------|------------------------------------------------------------------------------------------------------------------------------------------|
| `df`                       | ✓        | 数据表（DataFrame） | 你要处理的原始数据表，必须包含两列：<br>- `Entity ID` ：每个对象的唯一标识（比如编号、ID 号）<br>- `Cluster` ：存放聚类结果的列（里面是数字 ID，比如 `1、2、3`）                                  |
| `mapping`                  | ✗        | 字典（dict）       | 用来设定 “旧 ID 换新标签” 的对应关系，格式像 `{1: "A", 2: "B"}`：<br>- 左边的数字（比如 `1、2`）是原来的聚类 ID<br>- 右边的文字（比如 `"A"、"B"`）是你想换成的标签<br>没写进字典里的 ID（比如 `3`）会保持原样不变 |
| `new_cluster_column_name` | ✗        | 字符串（str）       | 给聚类列改个新名字（比如想叫 `"分组"`、 `"类型"`），不填的话默认叫 `Cluster `                                                                                        |
| `new_id_column_name`     | ✗        | 字符串（str）       | 给个体 ID 列改个新名字（比如分析人时叫 `"人员 ID"`，分析商品时叫 `"商品编号"`），不填的话默认叫 `Entity ID`                                                                          |

## 这个函数会做什么？

* 会检查你输入的 `DataFrame` 里，是不是同时有 `Entity ID` 和 `Cluster` 这两列（少一列都不行）。
* 再验证：你在 `mapping` 里写的 `“Cluster ID”` （比如 ` 1、2、3` ），是不是都能在 `DataFrame` 的聚类列里找到（避免你写错 ID 导致白映射）。
* 按照 `mapping` 里的对应关系，把聚类列里的数字 ID 换成你自定义的标签（比如把 `1` 换成 `"A"`）。

    * 要是有些 `Cluster ID` 没在 `mapping` 里写，就保留它原来的数字值，不瞎改。
* 如果你给了新的列名（比如把 `"Entity ID"` 改成 `"Person"`），就会给 `Entity ID` 列和聚类列( `Cluster` )重命名。
* 最后返回一个新的、改好的 `DataFrame`。不会动你原来的原始数据，不用担心改乱。

## 这个函数有哪些特点？

* **自定义标签**：可以把数字 ID 换成 `"Group A"` `"高活跃用户"` 这种好懂的名字，后续你看结果、跟别人讲都更省事。
* **有效性校验**：如果你在 `mapping` 里写了个不存在的 ID（比如数据里只有 `1、2`，你写了个 `3`），函数会主动提醒你，避免映射错了都不知道。
* **灵活重命名**：可根据你的分析流程，自定义 `"Entity ID"` 和 `"Cluster"` 列的名称，比如分析 `"人"` 就把 `"Entity ID"` 改成 `"Person"`，分析 `"商品"` 就把名称改成 `"Product ID"`。
* **安全处理**：没有映射的 ID 不会强行改变，也不会因为少个标签就让程序报错、数据损坏，新手用着也放心。

## 示例

### 1. 用自定义的标签替换聚类 ID

```python
import pandas as pd
# 导入数据分析库 pandas

# 创建原始 DataFrame
original_df = pd.DataFrame({
    "Entity ID": [1, 2, 3],        # 每个个体的唯一标识（统一替换为 "Entity ID"）
    "Cluster": [1, 2, 3]           # 原始的数字型聚类 ID
})

# 定义“聚类 ID → 自定义标签”的映射关系
mapping = {1: "A", 2: "B", 3: "C"}

# 调用函数替换聚类 ID
new_df = replace_cluster_id_by_labels(original_df, mapping)
print(new_df)                      # 打印结果
```

输出结果：

```
   Entity ID Cluster
0          1       A
1          2       B
2          3       C
```

### 2. 替换聚类 ID 并修改列名

```python
# 调用函数，同时给列改新名字
new_df = replace_cluster_id_by_labels(original_df,
                                      mapping={1: "A", 2: "B", 3: "C"},   # 映射关系不变
                                      new_cluster_column_name="Group",    # 聚类列改名叫 "Group"
                                      new_id_column_name="Person")        # 个体 ID 列改名叫 "Person"
print(new_df)
```

输出结果：

```
   Person Group
0       1     A
1       2     B
2       3     C
```

## 作者信息

代码：梁彧祺

文档：梁彧祺

编辑：梁彧祺

翻译：杨子婷