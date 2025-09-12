# 将数值型数据转换为类别型数据

在序列分析（sequence analysis）里，我们通常处理的是 **类别状态（categorical states）**，比如“受教育（Education）”“就业（Employment）”“失业（Unemployed）”。  
但很多数据集给的是 **数值（numeric values）**，例如收入、CO₂ 排放、考试成绩（examination scores）。

要把这类数据用于序列分析，我们需要把数值先转换成 **类别状态（states）**。

## 为什么需要做成“类别”？

- 序列分析关注的是 **状态路径（paths of states）**。
- 数值往往太细（比如 CO₂ = 0.71 和 0.72），没法当成两个有意义的不同“状态”。
- 做成类别后，我们能研究更可解释的模式、轨迹与状态转移，而不是纠结在微小的数值差异上。

## 数值变成类别后，可以研究什么？

把数值转成类别状态后，就能把它们当作 **类别轨迹（categorical trajectories）** 来提问，例如：

### 1. 收入轨迹（Income Trajectories）

- **数值变量**：年收入（annual income，USD）。
- **类别转换**：收入十分位（income deciles：底部 10%、10–20% … 顶部 10%）。
- **研究问题**：
    - 个体在职业生涯中如何在不同收入档位间流动？
    - 是否存在“粘性地板（sticky floors）”或“玻璃天花板（glass ceilings）”？
    - 收入轨迹在性别、教育或地区之间有何差异？

### 2. 人均 CO₂ 排放（CO₂ Emissions per Capita）

- **数值变量**：年度人均 CO₂（metric tons）。
- **类别转换**：全球十分位（global deciles：very low → very high）。
- **研究问题**：
    - 各国随时间如何在排放类别之间移动？
    - 哪些地区在排放轨迹上“收敛（convergence）”或“发散（divergence）”？
    - 是否存在典型路径（例如工业化过程中从 low → middle → high）？

### 3. 考试成绩（Examination Scores）

- **数值变量**：标准化考试分数（0–100）。
- **类别转换**：表现组别（performance groups：Low、Average、High）。
- **研究问题**：
    - 学生常见的学习轨迹是什么？（长期高位、后期提升、前期下滑等）
    - 某些学生群体会不会逐渐 **收敛（converge）** 到相似的表现类别？
    - 干预措施（如辅导）如何改变表现状态的序列？

## 常见的数值 → 类别方法

1. **固定阈值（fixed thresholds，基于领域知识）**
    - 用有意义的标准来定档。
    - 例：BMI → 低体重（<18.5）、正常（18.5–24.9）、超重（25–29.9）、肥胖（≥30）。
    - 优点：易解释。缺点：需要专家知识，可能不贴合数据分布。

2. **分位数分箱（quantiles，数据驱动）**
    - 按百分位 / 四分位 / 五分位 / 十分位把数据等量切分。
    - 例：收入 → 底部 20% =“Low”，20–40% =“Lower-Middle” … 顶部 20% =“High”。
    - 优点：各组样本量均衡，便于比较。缺点：类别是相对于样本，不是绝对值。

3. **距均值的标准差（standard deviation from mean，z-scores）**
    - 按与均值的偏离程度来定类。**其中 σ（sigma）表示标准差（standard deviation），用于衡量数据围绕均值的离散程度。**
    - 例：成绩 → < −1σ 为 “Low Performer”，−1σ 到 +1σ 为 “Average”，> +1σ 为 “High Performer”。
    - 优点：数据近似正态时好用。
    - 缺点：对非技术读者不够直观。

## 示例：CO₂ 排放（用分位数）

假设我们有人均 CO₂（metric tons）：

| Country | Year | CO₂ per capita |
| ------- | ---- | -------------- |
| A       | 2000 | 0.8            |
| B       | 2000 | 2.5            |
| C       | 2000 | 7.2            |
| D       | 2000 | 15.0           |

### 使用十分位（deciles）

1. 收集全部数值：\[0.8, 2.5, 7.2, 15.0]。
2. 计算十分位切点（10 个等量分组）。为便于示意，假设：
    - 0–10% = 0.8
    - 10–20% = 1.5
    - 20–30% = 2.5
    - …
    - 90–100% = 15.0
3. 赋予类别状态：
    - Country A = 第 1 十分位（very low）
    - Country B = 第 3 十分位（low-middle）
    - Country C = 第 7 十分位（high）
    - Country D = 第 10 十分位（very high）

这样，每个国家的排放史就能用 **类别状态序列（sequence of categorical states）** 来表示，而不是原始数字。

- 有了类别，我们可以说：
    - Country A 连续 20 年处在 “very low”。
    - Country C 在 1990 年后从 “middle” 走到 “high”。
- 没有类别的话，比较 0.71 和 0.72 并不会产生有意义的模式。

想进一步了解在 Python 里如何计算，我们有完整指南与代码：  
[`CO₂ Emissions Dataset (1800–2022) 🌍`](/en/datasets/CO2-emissions)

## 要点总结

- 序列分析需要 **类别状态**，因此数值必须 **分组**。
- 可选做法：专家阈值（expert-defined）、分位数（quantiles）、统计阈值（如 z-scores）。
- **十分位（deciles）** 常常兼顾细致与易用：粒度够看出差异，又不至于类别太多而难分析。

## 练习：把数值型数据转为类别

### 练习 1：为什么要分成“类别”？
你记录了穿戴设备的每日步数（比如 9,950 vs 10,020）。  
为什么在序列分析里不该把每个精确数值都当作不同状态？

### 练习 2：家庭用电
四个家庭的月用电量（kWh）：

| Household | Consumption |
|-----------|-------------|
| A         | 120         |
| B         | 220         |
| C         | 350         |
| D         | 800         |

1) 请你把这些数值分成四分位（quartiles，4 组）。
2) 请你给每个家庭分配类别：`Q1 = Very Low`，`Q2 = Low-Medium`，`Q3 = Medium-High`，`Q4 = Very High`。

### 练习 3：血压分级
收缩压（systolic blood pressure）是心脏收缩、把血泵入动脉时的**最高血压**，体检里常叫“上压”，单位为 mmHg。  

现在我们有 4 位病人，他们的收缩压数值分别为 110、125、138、162（单位均为 mmHg）。请根据以下临床阈值（clinical thresholds）进行分组：

- 正常（Normal）：< 120
- 升高（Elevated）：120–129
- 高血压 1 级（Hypertension Stage 1）：130–139
- 高血压 2 级（Hypertension Stage 2）：≥ 140

请你为每位病人分配一个类别（category）。

### 练习 4：学生缺勤（z-scores）
每年缺勤天数：2、4、6、8、12。  
均值 = 6.4，标准差 = 3.4。定义类别：
- < −1σ → “Very Low Absence”
- −1σ 到 +1σ → “Typical Absence”
- +1σ → “High Absence”

请你为每名学生分配类别。

### 练习 5：水体污染水平
两地区的平均硝酸盐（mg/L）：

| Region | 2000 | 2010 | 2020 |
|--------|------|------|------|
| A      | 0.5  | 1.2  | 2.8  |
| B      | 6.0  | 6.5  | 7.5  |

1) 用等宽分箱（equal-width binning）定义三类：Low: 0–2；Medium: 2–5；High: >5。
2) 把每个地区的时间序列表示成状态序列。

## 参考答案与解释

### 练习 1
像 9,950 与 10,020 这样的微小差异并不代表行为差异。  
序列分析看的是离散状态路径（例如 “Sedentary”“Moderately Active”“Highly Active”）。做成类别能让模式更可解释。

### 练习 2
排序：\[120, 220, 350, 800]。  
四分位分配：
- Q1 = 120 → Very Low
- Q2 = 220 → Low-Medium
- Q3 = 350 → Medium-High
- Q4 = 800 → Very High

### 练习 3
- 110 → Normal (<120)
- 125 → Elevated (120–129)
- 138 → Hypertension Stage 1 (130–139)
- 162 → Hypertension Stage 2 (≥140)

### 练习 4
Z 分数 = (value − mean) / σ：
- 2 → (2 − 6.4)/3.4 ≈ −1.29 → Very Low Absence
- 4 → −0.70 → Typical Absence
- 6 → −0.12 → Typical Absence
- 8 → 0.47 → Typical Absence
- 12 → 1.65 → High Absence

### 练习 5
分箱：Low (0–2)、Medium (2–5)、High (>5)。
- Region A：0.5（Low）→ 1.2（Low）→ 2.8（Medium）→ 序列 = [Low, Low, Medium]
- Region B：6.0（High）→ 6.5（High）→ 7.5（High）→ 序列 = [High, High, High]

解读：
- Region A 从 Low 升到 Medium。
- Region B 始终处于 High。

_作者：梁彧祺_

_翻译：明煜坤_

_校对：梁彧祺_
