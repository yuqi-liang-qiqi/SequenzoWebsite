# Pairfam 家庭形成轨迹数据

本数据包含 **1,027** 名受访者的德国家庭形成轨迹（月度抽取）。它来自 [Sequence Analysis（Raab & Struffolino, 2022）](https://sa-book.github.io/) 配套的教学用家庭史数据。配套网站写明：示例数据来自 **German Family Panel（pairfam）Release 10.0**，并经 pairfam 团队许可用于书中教学示例。

我们提供两个版本：
- **年度数据**：22 个年度观测，状态为缩写文本
- **月度数据**：264 个月（约 18–40 岁），状态为数值编码 1–9

::: warning 重要说明
- 年度与月度数据的 **`id` 不可直接对应**。
- **编码形式不同**：年度用缩写（如 `"S"`, `"LAT"`），月度用数字 1–9。
- 月度 **家庭** 与 **活动** 文件共享同一批 1,027 个受访者 ID，可按 ID 做多通道对齐；各自的年度 `id` 不能直接对接。
:::

## 数据来源与处理

* **来源**：Raab & Struffolino（2022）配套教学数据，基于 [pairfam](http://www.pairfam.de) **Release 10.0**（GESIS ZA5678，DOI [10.4232/pairfam.5678.10.0.0](https://doi.org/10.4232/pairfam.5678.10.0.0)）。

* **样本量**：配套 `PartnerBirthbio` 文件有 1,866 条记录；Sequenzo 月度文件发布的是书中多通道 / 18–40 岁教学用的 **1,027** 人抽取（与 `Activitybio` / `MultiChannel` 相同 ID）。Sequenzo 打包脚本未再重新做该样本筛选。

* **原书处理**：伴侣与生育状态被编码为九个家庭状态（见下表）。

* **我们的预处理**：仅重命名时间列（`family1`…`family264` 或 `state1`…`state264` → `1`…`264`）。**未对状态整数重新编码。**

* **核验**：与配套 `PartnerBirthbio` 对照，**1,027 个匹配 ID** 在全部 **264 个月**上状态码完全一致（交叉表为对角；一致率 = 1.0）。

## 家庭状态编码

数值码遵循 Raab & Struffolino 配套数据（原始 Stata value labels）。传入 `SequenceData` 的 `labels` 须按此顺序。

| 数值码 | 缩写 | 含义 |
| ------ | ---- | ---------------------------- |
| 1      | S    | Single, no child             |
| 2      | Sc   | Single, with child(ren)      |
| 3      | LAT  | Living apart together, no child |
| 4      | LATc | LAT, with child(ren)         |
| 5      | COH  | Cohabiting, no child         |
| 6      | COHc | Cohabiting, with child(ren)  |
| 7      | MAR  | Married, no child            |
| 8      | MARc1| Married, 1 child             |
| 9      | MARc2+| Married, 2+ children        |

## 在 Sequenzo 中加载

```python
from sequenzo import load_dataset, SequenceData

df = load_dataset("pairfam_family_by_month")

time_list = [str(i) for i in range(1, 265)]
states = list(range(1, 10))
labels = [
    "Single, no child",
    "Single, with child(ren)",
    "Living apart together, no child",
    "LAT, with child(ren)",
    "Cohabiting, no child",
    "Cohabiting, with child(ren)",
    "Married, no child",
    "Married, 1 child",
    "Married, 2+ children",
]

seq = SequenceData(
    df,
    time=time_list,
    id_col="id",
    states=states,
    labels=labels,
    weights=df["weight40"].to_numpy(),
)
```

## 相关数据

- [pairfam 活动轨迹](./pairfam-activity.md)
