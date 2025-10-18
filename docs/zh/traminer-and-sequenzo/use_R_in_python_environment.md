<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-10-02 13:39:00
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-10-03 21:12:23
 * @FilePath: /SequenzoWebsite/docs/en/traminer-and-sequenzo/use_R_in_python_environment.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# 在一个 Jupyter Notebook 中将 Sequenzo（Python）与基于 R 的分析相结合

有时，即使你已经用 Python 完成了所有繁重的工作，你可能仍然想在分析的最后阶段使用 R。这可能是因为你的合作者是 R 用户，或者是因为某些专用模型或图表只能在 R 中使用。我们无需在 R 和 Python 工作环境之间来回导出 CSV 文件，而是可以直接在同一个 Jupyter Notebook 中让 Python 和 R 进行交互。

特别感谢 [Unchitta Kan](https://unchitta.com/)，乔治梅森大学计算社会科学博士生，他建议使用 Python 包 `rpy2` 来实现这一工作流程。

在跳入 [我们在 Google Colab 上的编码教程](https://colab.research.google.com/github/Liang-Team/Sequenzo/blob/main/Tutorials/use_R_in_python_environment/example_pairfam_family.ipynb)之前，你可能会发现首先阅读下面的背景部分会有所帮助。我们将介绍需要的关键软件包、我们使用的数据集，以及为什么某些高级回归模型目前在 R 中比在 Python 中更容易运行。

## `rpy2`是什么？

`rpy2` 是 Python 和 R 之间的桥梁。你可以把它想象成 Jupyter Notebook 里的**翻译器**：它允许你将 `pandas` DataFrame 传递给 R，直接运行 R 代码，并将结果返回到 Python。这是我们在编程教程中使用的包。

更多详细信息，请参阅 [官方 rpy2 文档](https://rpy2.github.io/doc/latest/html/index.html).

### 你应该记住什么？

* 你必须同时安装 Python 和 R，因为 `rpy2` 负责连接两者。
* 在 Jupyter 中，使用 `%load_ext rpy2.ipython` 加载一次扩展。
* 在单元格顶部使用 `%%R` 运行 R 代码。
* 使用 `%%R -i df` 将 Python 对象 (`df`) 发送到 R。
* 使用 `%%R -o results` 将结果返回到 Python。
* 始终记住你的对象当前位于过度的哪一侧。

### 什么是 R 回调？

有时你可能会在 Python 控制台中看到如下输出：

```python
R callback write-console: In addition:   
R callback write-console: Warning message:
  
R callback write-console: In eval(slot(family, "initialize")) :  
R callback write-console: 
   
R callback write-console:  response should be ordinal---see ordered()
```

`rpy2` 处理与 R 通信的方式如下：

* R 回调 write-console 是 `rpy2` 将 R 的输出（来自 `cat()`、`print()`、`warning()` 等）打印到 Python 中的常规方式。
* 这些消息并非错误。它们只是通过回调“中继”的 R 消息，因此你可以在 Python 环境中看到它们。

### 编码教程的 R 包安装故障排除

如果在安装 R 包时遇到问题，请参考以下几种方法：

**选项 1：通过 conda 安装（如果您使用 Anaconda/Miniconda，建议使用）**

```bash
conda install -c conda-forge r-vgam r-nnet r-mass
```

**选项 2：直接在 R 中安装**

```r
install.packages(c("VGAM", "nnet", "MASS"), repos = "https://cran.r-project.org/")
```

如果您在本编码教程之外使用`“rpy2”`，请将`“VGAM”`、`“nnet”`、`“MASS”`更改为您需要的其他包。

**选项 3：使用 Python 替代方案**

如果与 R 的集成仍然存在问题，可以使用等效的 Python 包：

* `statsmodels` 用于多项逻辑回归
* `scikit-learn` 用于通用分类模型
* `patsy` 用于公式式模型规范

常见问题及修复

1. **工作目录错误**：请确保 R 可以访问工作目录。
2. **软件包安装失败**：请尝试使用 conda 代替 R，以便更轻松地管理依赖项。
3. **内存问题**：如果遇到内存错误，请使用较小的数据集进行测试。

## 我们使用的数据集

在本教程中，我们使用内置的 [pairfam-family数据集](../datasets/pairfam-family.md). 

为什么？
* 它在社会科学实证环境中很常见（每月观察近 2,000 人）。
* 它包含丰富的关于家庭和伴侣关系转变的变量。

因此，它能够很好地代表人们实际分析的社会科学数据。我们用它来展示如何使用 Python 进行最常见的序列分析，以及如何使用`VGAM`在 R 中继续建模。

## 什么是`VGAM`以及为什么我们在编码教程中使用它？

[VGAM](https://cran.r-project.org/package=VGAM) 代表*向量广义线性和可加模型* (Yee, 2015)。它是一个 R 包，它统一了许多分类回归模型，例如多项式逻辑回归、比例优势模型、相邻类别模型、连续比率模型等。

为什么我们在这里用它来说明？

* 因为其中一些高级分类模型（例如相邻类别模型和连续比率模型）在 Python 中尚不可用。
* 在 Sequenzo 为你提供聚类成员关系表（谁属于哪种轨迹类型）后，通常希望运行回归分析来查看哪些因素可以预测聚类成员关系，反之亦然。这是社交序列分析中最常见的做法。

> **注意：**
> 在本教程中，为了方便起见，我们使用 R 中的多项式回归来演示模型，但实际上您已经可以使用 Python 轻松完成该操作（例如使用 `statsmodels` 包）。
>
> R 提供了其他包和模型系列，可能有助于进行更高级的分析，但这里我们仅展示 R 版本以供演示。
>
> 有关基于 Python 的多项式回归演练，请参阅 [Python 和 Statsmodels 中的多项式逻辑回归](https://medium.com/@rajeshneupane7/multinomial-logistic-regression-in-python-and-statsmodels-a674c890fe1c)。

## 最后说明

Sequenzo 现在让 Python 中的序列分析更加流畅。有了 `rpy2`，无需在 Python 或 R 工作环境之间做出选择，因为你可以在一个笔记本中同时使用这两种环境。

如果还有其他喜欢的 R 包或工作流程，并且认为它们对序列研究者有用，请随时告诉我们。我们将非常乐意添加更多教程，展示如何集成它们。

## 参考文献

Yee, T. W. (2015). Vector generalized linear and additive models: with an implementation in R (Vol. 10, pp. 978-1). New York, NY: springer.

---
_编辑：梁彧祺_

_翻译：曲思竹_