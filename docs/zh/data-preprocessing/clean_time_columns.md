# 清洗时间列

这篇指南会教你如何一步步把时间列里的 `Y1、Y2、Y3、Y4` 变成纯数字标签 `1、2、3、4`。

这样处理后，你的序列数据看起来就会更整洁、更直观。

## 这些状态编码代表什么？

在这篇指南的例子里，我们自定义了几个简短好记的状态编码：

- `EDU` = 上学中（Education/Schooling）
- `FT` = 有全职工作（Full-time employment）
- `UNEMP` = 失业（Unemployment）

这只是几个小示例哈。

在你的数据集里，你可以自己来编写各种各样的分类编码（比如 `HOME`， `WORK`， `LEAVE`，或者数字编码），用来表示一定的状态。

**注意**：这里我们说“清洗”，是只改变那些表示时间的列的名字（比如把 `Y1` 改成 `1`），至于表格里填的那些状态值（像 `EDU` 、 `FT` 这些），保持不动。
## 示例（输入下列数据作为案例）

| Entity ID | Y1    | Y2    | Y3    | Y4    |
|-----------|-------|-------|-------|-------|
| 1         | EDU   | EDU   | FT    | FT    |
| 2         | EDU   | UNEMP | UNEMP | FT    |
| 3         | FT    | FT    | FT    | FT    |

我们的目标是把 `Y1…Y4` 变成 `1…4` 。

## 方法一：手动更改时间列的名称（简单又安全）

**适合什么时候用？**  
你知道哪些是时间列（例如，你已经知道时间列是 `["Y1","Y2","Y3","Y4"]`）。

**怎么做**  
找到每个关于时间的列，操作：
- 去掉不是数字的字符（比如字母、符号），只保留数字： `"Y01"` -->`"01"` ；
- 把数字进行标准化： `"01"` --> `"1"` 。

**代码示例**

```python
import re
import pandas as pd

# 样例数据
df = pd.DataFrame({
    "Entity ID": [1, 2, 3],
    "Y1": ["EDU", "EDU", "FT"],
    "Y2": ["EDU", "UNEMP", "FT"],
    "Y3": ["FT", "UNEMP", "FT"],
    "Y4": ["FT", "FT", "FT"]
})

time_cols = ["Y1", "Y2", "Y3", "Y4"]     # 你来指定哪些是时间列

# 构建重命名的方向: "Y1"->"1", "Y2"->"2", ...
rename_map = {}
for c in time_cols:
    digits = re.sub(r"\D+", "", c)       # 只保留数字
    digits = str(int(digits))            # 去掉前面多余的零，比如 "01" -->"1"
    rename_map[c] = digits

df_clean = df.rename(columns=rename_map).copy()
print(df_clean.columns.tolist())         # 输出: ['Entity ID', '1', '2', '3', '4']
````

**步骤解析**

* `re.sub(r"\\D+", "", c)`：用来去掉所有不是数字的字符；
* `int(digits)`：把前一步操作后保留下来的数字字符 `digital` 转成整数，并去掉数字前面多余的零（实现 `"01"` --> `"1"`）；
* `str(...)`：把去零后的数字再转成字符串，让列名保持统一的文本格式（实现 `1` --> `'1'`）；
* `rename(...)`：重新取名。

**注意事项**

* 需要保证每个时间列的名称（ `time_cols`）里都包含了数字，否则进行 `int(digits)` 步骤时会报错；
* 不要把不是时间的列（如 `Entity ID`）放进 `time_cols`里 。

**重命名后要检查列的顺序是否正确、有没有重名情况**

```python
assert len(set(df_clean.columns)) == len(df_clean.columns)
assert all(col == str(i) for i, col in enumerate(df_clean.columns[1:], start=1))
```

## 方法二：自动检测并清洗时间列（更灵活）

**适合什么时候用？**  
- 你的数据集里混杂了各种各样的关于时间的列名（比如Y、T、Year 等）；
- 你发现手动去改每一个时间列的名称太累了。

**怎么做**  
- 函数要扫一遍所有的列（除了要保护的列，比如 `Entity ID` ）；
- 然后找到列名中的第一个数字，作为新的列名；
- 要是发现列名里没有数字，就保持它的名称不变。

**复制这个函数即可使用🌟**  
你只用复制下面的代码并粘贴到你的代码脚本里就行。   
你基本不用对代码再做改动，但是可以看看这些地方有没有要调整的：
- `protect` --> 设置的保护列，里面的列绝对不会被修改（比如 `Entity ID`）；
- `min_time`, `max_time` --> 你要选取的时间范围（比如只留 1 到 120 之间的数作为有效的时间）；
- 正则表达式 --> 现在用的是 `(\d+)` 。它能专门找列名里出现的第一串连续的数字（比如在 `"Year2023"` 里找到 `"2023"`)。

```python
import re
import pandas as pd

def clean_time_columns_auto(
    df: pd.DataFrame,
    protect=("Entity ID",),              # 这些列的名字保持不变
    min_time=1, max_time=None            # 选择时间的范围
) -> pd.DataFrame:
    rename_map = {}
    for c in df.columns:
        if c in protect:
            continue

        m = re.search(r"(\d+)", str(c))
        if not m:
            # No digits found: skip renaming
            continue

        new_label = str(int(m.group(1))) # 标准化 "01" --> "1"

        # 可选的限制条件（取决于你要不要加）
        if max_time is not None:
            t = int(new_label)
            if t < min_time or t > max_time:
                continue

        rename_map[c] = new_label

    # 防错设计：避免列与列之间的重名冲突
    if len(set(rename_map.values())) != len(rename_map.values()):
        raise ValueError(
            f"Name collision detected: {rename_map}. "
            f"Please adjust regex or time range."
        )

    return df.rename(columns=rename_map).copy()
````

**示例数据**

```python
# Example dataset
df = pd.DataFrame({
    "Entity ID": [1, 2, 3],
    "Y1": ["EDU", "EDU", "FT"],
    "T2": ["EDU", "UNEMP", "FT"],
    "Year3": ["FT", "UNEMP", "FT"],
    "Y4": ["FT", "FT", "FT"]
})

# 调用清理函数
df_clean = clean_time_columns_auto(df, protect=("Entity ID",))

print(df_clean.head())
```

**输出结果：**

```text
   Entity ID    1      2      3     4
0          1  EDU    EDU     FT    FT
1          2  EDU  UNEMP  UNEMP    FT
2          3   FT     FT     FT    FT
```

这段函数代码适合**直接复制到你当前做数据预处理的代码脚本**里使用。   
但使用后请务必多多检查以下结果：
* 所有要改名的时间列都改了吗？
* 不用改名的列有没有不小心被改了？
* 在进入下一步前用 `df_clean.head()` 先检查一下当前输出的结果。

## 保留列名的更改记录，方便检查（推荐⭐️）

如果你需要记录“旧列名 --> 新列名”的对应关系（写日志或方便未来复现），可以这样做：

```python
# 这里用方法1做示例
old_to_new = rename_map.copy()
# 存到电脑本地
pd.Series(old_to_new).to_csv("time_col_rename_map.csv", header=["new_name"])
```

## 整合到Sequenzo里

清洗时间列的任务完成后，你需要把这些清洗后得出的数字标签整合到 `SequenceData` 数据集中。

记得使用字符串格式（比如 `'1'` 而不是 `1`），免得 pandas 把时间列的数字标签当成普通数字来处理，造成混淆。

具体操作如下：
```python
from sequenzo import SequenceData

states = ["EDU", "FT", "UNEMP", "Missing"]
labels = ["Education", "Full-time", "Unemployed", "Missing"]

seq = SequenceData(
    data=df_clean,
    time_type="year",
    time=[str(i) for i in range(1, 5)],  # ['1','2','3','4']
    states=states,
    labels=labels,
    id_col="Entity ID"
)
```

## 快速检查清单

* 时间列选对了吗？有没有把它们的名字变成纯数字？（ `"Y2"` -->`"2"` )
* 重命名后的时间列标签是唯一的吗？是不是按顺序来的？(`'1','2','3',...`).
* 不属于时间的列（如 `Entity ID`）的名字千万别改；
* 存一张旧列名与新列名的对照表，方便你之后查看；
* 记得在文档开头写清楚你定义的状态代码是什么意思哦~

## 作者
代码：梁彧祺

文档：梁彧祺

编辑：梁彧祺

翻译：杨子婷