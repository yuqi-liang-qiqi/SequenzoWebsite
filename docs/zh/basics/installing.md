# 安装 Sequenzo

如果您尚未安装 Python，请参考[ Yuqi 关于如何设置 Python 及虚拟环境的教程](https://www.yuqi-liang.tech/blog/setup-python-virtual-environment/)。

Python 安装后，我们强烈推荐使用 [PyCharm](https://www.jetbrains.com/pycharm/download/) 作为您的 IDE（集成开发环境，您在这里打开文件夹和文件以使用 Python），而非 Visual Studio 。PyCharm 内置了卓越的虚拟环境管理支持，能让您的工作流程更加轻松可靠。

在 PyCharm 中，请确保选择使用 Python 3.9、3.10 或 3.11 的虚拟环境，因为 `sequenzo` 完全支持这些版本。

随后，您可以通过点击左侧边栏（通常在底部附近）的终端图标
<img src="https://github.com/user-attachments/assets/1e9e3af0-4286-47ba-aa88-29c3288cb7cb" alt="terminal icon" width="30" style="display:inline; vertical-align:middle;">
来打开内置终端。

终端打开后，请输入以下命令来安装 `sequenzo` ：

```
pip install sequenzo
```

如果您在安装过程中遇到问题，可能是因为您的电脑上同时安装了 Python 2 和 Python 3。在这种情况下，您可以尝试使用 `pip3` 来代替 `pip` 安装该软件包。

```
pip3 install sequenzo
```

有关最新稳定版本和所需依赖项的更多信息，请参阅 [PyPI](https://pypi.org/project/sequenzo/)。
