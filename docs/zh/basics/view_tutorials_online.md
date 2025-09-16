<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-12 10:17:49
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-16 15:09:11
 * @FilePath: /SequenzoWebsite/docs/zh/basics/if_you_cannot_render_ipynb_on_github.md
-->
# 在线查看我们的代码教程

我们的很多代码教程都在[这个仓库](https://github.com/Liang-Team/Sequenzo/tree/main/Tutorials)里。想要最快、零配置的体验，建议使用下方表格里的 “Open in Colab” 链接在 Google Colab 打开。

Colab 完全在浏览器中运行，不需要在本地安装 Python 或 IDE（集成开发环境）。

你也可以在 GitHub 上浏览教程，但较大的 Jupyter 笔记本有时会无法预览；本页末尾有失败示例。想下载任意教程，先在 GitHub 打开，然后点击右上角的向下箭头图标保存到本地。

> [!TIP] 推荐：使用 Colab 打开
> 你只需要点击表格里 “在 Colab 打开” 栏的 Open 链接，可以立刻运行、编辑，并将副本保存到你的 Google Drive。

## 笔记本（Colab 打开）

| 教程 | 简介 | 在 Colab 打开 | 在 GitHub 查看 |
| --- | --- | --- | --- |
| Quickstart | 安装、载入数据并完成第一次分析。 | [Open](https://colab.research.google.com/github/Liang-Team/Sequenzo/blob/main/Tutorials/01_quickstart.ipynb) | [Source](https://github.com/Liang-Team/Sequenzo/blob/main/Tutorials/01_quickstart.ipynb) |
| Dissimilarity Measures | 计算并对比序列的非相似度量。 | [Open](https://colab.research.google.com/github/Liang-Team/Sequenzo/blob/main/Tutorials/dissimilarity_measures/dissimilarity_measures.ipynb) | [Source](https://github.com/Liang-Team/Sequenzo/blob/main/Tutorials/dissimilarity_measures/dissimilarity_measures.ipynb) |
| Hierarchical Clustering | 对序列做层次聚类并查看树状图。 | [Open](https://colab.research.google.com/github/Liang-Team/Sequenzo/blob/main/Tutorials/hierarchical_clustering.ipynb) | [Source](https://github.com/Liang-Team/Sequenzo/blob/main/Tutorials/hierarchical_clustering.ipynb) |
| Local vs. Global Quintiles | 比较本地分位数与全局分位数的分箱映射。 | [Open](https://colab.research.google.com/github/Liang-Team/Sequenzo/blob/main/Tutorials/local_global_quintiles/comparison_local_global_quintiles.ipynb) | [Source](https://github.com/Liang-Team/Sequenzo/blob/main/Tutorials/local_global_quintiles/comparison_local_global_quintiles.ipynb) |
| Multidomain Sequence Analysis: Main tutorial | 跨多个领域的端到端分析流程。 | [Open](https://colab.research.google.com/github/Liang-Team/Sequenzo/blob/main/Tutorials/multidomain_sequence_analysis/main_tutorial.ipynb) | [Source](https://github.com/Liang-Team/Sequenzo/blob/main/Tutorials/multidomain_sequence_analysis/main_tutorial.ipynb) |
| Polyadic Sequence Analysis | 分析多主体（多参与者）序列。 | [Open](https://colab.research.google.com/github/Liang-Team/Sequenzo/blob/main/Tutorials/multidomain_sequence_analysis/polyadic_tutorial.ipynb) | [Source](https://github.com/Liang-Team/Sequenzo/blob/main/Tutorials/multidomain_sequence_analysis/polyadic_tutorial.ipynb) |

## Python 脚本

| 脚本 | 简介 | 在 Colab 打开 | 在 GitHub 查看 |
| --- | --- | --- | --- |
| Multidomain Sequence Analysis: CombT | 多领域序列的 CombT 分析流程。 | [Open](https://colab.research.google.com/github/Liang-Team/Sequenzo/blob/main/Tutorials/multidomain_sequence_analysis/CombT_analysis.py) | [Source](https://github.com/Liang-Team/Sequenzo/blob/main/Tutorials/multidomain_sequence_analysis/CombT_analysis.py) |
| Polyadic Sequence Analysis | 多主体分析的脚本版本。 | [Open](https://colab.research.google.com/github/Liang-Team/Sequenzo/blob/main/Tutorials/multidomain_sequence_analysis/polyadic.py) | [Source](https://github.com/Liang-Team/Sequenzo/blob/main/Tutorials/multidomain_sequence_analysis/polyadic.py) |

## 为什么 GitHub 预览会失败

有时 GitHub 无法渲染笔记本（`.ipynb`），会显示：

```
Unable to render code block
```

你可能会看到这样的页面：

![render_failure_example](/en/basics/img/render_failure_github.png)

这属于 GitHub 预览在大输出或复杂笔记本上的已知限制。

想下载教程，请点击这里：

![click_for_download](/en/basics/img/click_for_download.png)

*原文作者 & 翻译：梁彧祺*
