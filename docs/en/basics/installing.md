<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-13 09:57:04
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-16 13:52:36
 * @FilePath: /SequenzoWebsite/docs/en/basics/installing.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# Installing Sequenzo

If you haven't installed Python, please follow [Yuqi's tutorial about how to set up Python and your virtual environment](https://www.yuqi-liang.tech/blog/setup-python-virtual-environment/).

Once Python is installed, we highly recommend using [PyCharm](https://www.jetbrains.com/pycharm/download/) as your IDE (Integrated Development Environment — the place where you open your folder and files to work with Python), rather than Visual Studio. PyCharm has excellent built-in support for managing virtual environments, making your workflow much easier and more reliable if you are a beginner.

In PyCharm, please make sure to select a virtual environment using Python 3.9, 3.10, or 3.11 as these versions are fully supported by `sequenzo`.

Then, you can open the built-in terminal by clicking the Terminal icon
<img src="https://github.com/user-attachments/assets/1e9e3af0-4286-47ba-aa88-29c3288cb7cb" alt="terminal icon" width="30" style="display:inline; vertical-align:middle;">
in the left sidebar (usually near the bottom). It looks like a small command-line window icon.

Once it’s open, type the following to install `sequenzo`:

```
pip install sequenzo
```

If you have some issues with the installation, it might because you have both Python 2 and Python 3 installed on your computer. In this case, you can try to use `pip3` instead of `pip` to install the package.

```
pip3 install sequenzo
```

For more information about the latest stable release and required dependencies, please refer to [PyPI](https://pypi.org/project/sequenzo/). 

*Author: Yuqi Liang*