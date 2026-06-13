# Installing Sequenzo

If you haven't installed Python, please follow [Yuqi's tutorial about how to set up Python and your virtual environment](https://www.yuqi-liang.tech/blog/setup-python-virtual-environment/).

You can install and use Sequenzo from any environment: a plain terminal, VS Code, Jupyter, or any Python IDE. The only required step is the `pip install` command below. If you are new to Python and not sure what to use, we recommend [PyCharm](https://www.jetbrains.com/pycharm/download/) as your IDE (Integrated Development Environment, the place where you open your folder and files to work with Python). PyCharm includes built-in virtual-environment management, which helps keep package installations isolated and reproducible.

In PyCharm, please make sure to select a virtual environment using Python 3.9, 3.10, 3.11, 3.12, 3.13, or 3.14 as these versions are supported by `sequenzo`. Windows wheels are currently available through Python 3.13.

Then, you can open the built-in terminal by clicking the Terminal icon
<img src="https://github.com/user-attachments/assets/1e9e3af0-4286-47ba-aa88-29c3288cb7cb" alt="terminal icon" width="30" style="display:inline; vertical-align:middle;">
in the left sidebar (usually near the bottom). It looks like a small command-line window icon.

Once it’s open, type the following to install `sequenzo`:

```bash
python -m pip install sequenzo
```

If you have installation issues, it may be because both Python 2 and Python 3 are installed on your computer. In this case, use the Python 3 interpreter explicitly:

```bash
python3 -m pip install sequenzo
```

For more information about the latest stable release and required dependencies, please refer to [PyPI](https://pypi.org/project/sequenzo/). 

To confirm the installed version:

```bash
python -c "import sequenzo; print(sequenzo.__version__)"
```

After installation, run the [Quickstart](/en/basics/quickstart) or open the [coding tutorials in Colab](/en/basics/view-tutorials-online).

*Author: Yuqi Liang*
