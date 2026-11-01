# Pairfam 活动轨迹数据

本数据包含 **1,027** 名受访者的就业/活动轨迹（月度抽取）。它来自 [Sequence Analysis（Raab & Struffolino, 2022）](https://sa-book.github.io/) 配套教学数据。配套网站写明：示例数据来自 **German Family Panel（pairfam）Release 10.0**，并经 pairfam 团队许可用于书中教学示例（GESIS ZA5678，DOI [10.4232/pairfam.5678.10.0.0](https://doi.org/10.4232/pairfam.5678.10.0.0)）。

月度文件与 [pairfam 家庭轨迹](./pairfam-family.md) 共享同一批 **1,027** 个原始 ID，可按 ID 对齐做多通道分析；年度数据的 `id` 不可直接对接。

## 活动状态编码

| 数值码 | 缩写     | 含义                     |
| ------ | -------- | ------------------------ |
| 1      | EDU      | Education                |
| 2      | MIL/CS   | Military/Civil Service   |
| 3      | PT       | Part-time Employment     |
| 4      | FT       | Full-time Employment     |
| 5      | SELF     | Self-employed            |
| 6      | PLEAVE   | Parental Leave           |
| 7      | MARGINAL | Marginal Employment      |
| 8      | UNEMP    | Unemployed               |

该编码已与配套文本状态序列逐月交叉表核对（对角一致）。部分旧教程使用了另一套八状态表述，请以本表为准。

我们的预处理仅重命名时间列，不改变状态整数。英文完整说明见 [pairfam-activity (EN)](../../en/datasets/pairfam-activity.md)。
