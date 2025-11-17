# 如何在 Windows 上使用 Sequenzo

> [!TIP] 前置条件：
> ☐ Python 3.12 版本（3.9～3.12 均可）<br>
> ☐ IDE（VS Code 或 PyCharm）<br>
> ☐ 下载 Sequenzo<br>
> ☐ 下载 `quickstart.ipynb`<br>

## 使用指南
| 如果你                          | 跳转到                                         |
|------------------------------|---------------------------------------------|
| 是纯小白                         | [这里](#如果你是纯小白)                              |
| 之前下载了 Sequenzo               | [这里](#如果你之前下载了-sequenzo)                    |
| 已经有 Python，但是没有指定的 Python 版本 | [这里](#如果你已经有-python-但没有指定版本的-python)        |
| 已经有了指定 Python，且用 VS Code     | [这里](#如果你已经有了指定-python-且用-vs-code)          |
| 打算用 PyCharm                  | [这里](#如果你打算用-pycharm)                       |
| 虚拟环境使用的是 conda/pyenv/virtualenv  | [这里](#如果你用的是-conda-pyenv-virtualenv-python)*如果你不知道虚拟环境是什么以及如何使用，[这里](https://www.yuqi-liang.tech/blog/virtual-environment/)。* |

我们建议先通读一遍教程，然后再开始实操。先通读教程，可以帮助你知道整个流程大概是怎么回事。
比如，你会知道大概的步骤都有哪些、配置的环境是什么样子、可能出现哪些问题，以及常见的解决方案。
遇到问题时，也能更快在教程的 [Q&As](#q-as) 里找到答案。

也同样建议学习 [多 Python 版本管理](#_1-多-python-版本管理)，
这样你可以知道 Python 究竟安装到了哪里、虚拟环境在哪里、下载的包又去了哪里，以及如何管理多个不同版本的 Python 项目。

## 如果你是纯小白
### Step 1：下载 Python 解释器

（解释解释器，英文也要写）

（有的人有 Python，但是不知道自己是什么版本）

我们这里直接在官网下载，对应的虚拟环境工具是 venv。如果你想使用 conda/pyenv/virtualelv，请 [跳转](#如果你用的是-conda-pyenv-virtualenv-python)。


进入 [Python 官网](https://www.python.org/downloads/release/python-31011/)，滚轮滚到页面最下面，选择 Windows 平台上的 Python 解释器：

![图1](./img/Windows_tutorial_img/w1.png)

![图2](./img/Windows_tutorial_img/w2.png)

![图3](./img/Windows_tutorial_img/w3.png)

*PS：有时即使勾选了添加到 PATH，系统也不会真的将其加进去，因此基本都需要手动配置 PATH。*

![图4](./img/Windows_tutorial_img/w4.png)

![图5](./img/Windows_tutorial_img/w5.png)

（安装在你清晰的位置，既能帮助你xxx，也能帮你在日后学习 Python xxx，事半功倍）

![图6](./img/Windows_tutorial_img/w6.png)

![图7](./img/Windows_tutorial_img/w7.png)

![图8](./img/Windows_tutorial_img/w8.png)

![图9](./img/Windows_tutorial_img/w9.png)

---
### Step 2：设置 Python 环境变量

（千万不要紧张）
（系统变量是什么，有什么效果，作用是什么）
![图10](./img/Windows_tutorial_img/w10.png)

![图11](./img/Windows_tutorial_img/w11.png)

![图12](./img/Windows_tutorial_img/w12.png)

![图13](./img/Windows_tutorial_img/w13.png)

接下来让我们将刚刚下载的 Python 添加到系统变量里。

---
我们要复制两个文件（夹）的路径。<br>
这是第一个 ↓：

![图](./img/Windows_tutorial_img/w14.png)

![图](./img/Windows_tutorial_img/w15.png)

---
这是第二个 ↓：

![图](./img/Windows_tutorial_img/w16.png)

![图](./img/Windows_tutorial_img/w17.png)

---

将这两个路径添加到刚才打开的 PATH 里：

![图](./img/Windows_tutorial_img/w18.png)

![图](./img/Windows_tutorial_img/w19.png)

然后一路“确认”。

![图](./img/Windows_tutorial_img/w20.png)

![图](./img/Windows_tutorial_img/w21.png)

---
验证 Python 是否安装成功。打开 CMD 或者 PowerShell，输入 `python3.10 --version`，如果输出如下，则成功。

![图](./img/Windows_tutorial_img/w22.png)

---
### Step 3：下载 VS Code

> [!TIP] <span style="font-weight: normal;">如果你已经下载了 VS Code，跳过此步。</span>

官方下载地址为：[VS Code 官网](https://code.visualstudio.com/)。

![图](./img/Windows_tutorial_img/w23.png)

![图](./img/Windows_tutorial_img/w24.png)

![图](./img/Windows_tutorial_img/w25.png)

![图](./img/Windows_tutorial_img/w26.png)

![图](./img/Windows_tutorial_img/w27.png)

![图](./img/Windows_tutorial_img/w28.png)

---

下面是 VS Code 的欢迎界面：（你们的界面应该是英文版，如果想要中文，请移步 [Q&As](#q-as)）。

![图](./img/Windows_tutorial_img/w29.png)

因为是第一次下载 VS Code，所以 VS Code 也会提供熟悉其界面的新手教程，建议不要跳过。

---
### Step 4：下载 Extension 拓展

由于 VS Code 是一款轻量级的 IDE（Integration Development Environment，集成开发环境），
所以只有基础功能，额外的功能则需要通过插件实现，这些插件我们称之为扩展（Extension）。

为保证 VS Code 顺利运行 Sequenzo，我们需要在 VS Code 里下载：
- Python
- Jupyter

> [!TIP] <span style="font-weight: normal;">即使你已经下载或使用过了 VS Code，也请检查是否已经下载了这两个扩展。</span>

但由于 Python 和 Jupyter 扩展的文件体积较大，可能会遇到下载时间可能会久一点。
如果微软 CDN（Content Delivery Network，内容分发网络。是微软提供的一种全球分布式网络服务，用于加速网站、应用或文件的访问速度） 恰好不稳定，
而且 VS Code 也没走代理（即 VPN/梯子/魔法）的话，大概需要 5-10 分钟。

一般情况下，下载很快就会完成。

![图](./img/Windows_tutorial_img/w30.png)

![图](./img/Windows_tutorial_img/w31.png)

这步最容易遇到的错误，是由网络原因导致的下载慢或者下载失败。
如果遇到了这种情况，移步 [Q&As](#q-as)。

---
### Step 5：配置项目环境
#### 1. 创建项目并打开
正因为 VS Code 是一款轻量级的 IDE，它本身并不提供直接创建新项目的功能，因此我们需要先在本地手动创建项目文件夹。

![图](./img/Windows_tutorial_img/w32.png)

创建好后，回到 VS Code：

![图](./img/Windows_tutorial_img/w33.png)

![图](./img/Windows_tutorial_img/w34.png)

---
#### 2. 创建虚拟环境
虚拟环境是一个独立的 Python 运行空间，用来管理项目所需的 Python 版本和依赖库。
Sequenzo 就是一个 Python 包，需要在虚拟环境里下载。

我们这里使用 `venv` 创建虚拟环境，如果你想用 `conda/pyenv/virtualenv`，请移步 [这里](#如果你用的是-conda/pyenv/virtualenv)。

打开终端，在项目根目录下，创建虚拟环境：

```powershell
python3.10 -m venv sequenzo_project
```
注意这里的命名，这是一个良好的编程习惯， 我们建议不同的项目用不同的虚拟环境。<br>
比如，如果想用虚拟环境在其他的项目里，就换个名字，比如 `sequence_analysis`。

![图](./img/Windows_tutorial_img/w35.png)

![图](./img/Windows_tutorial_img/w36.png)

激活终端的虚拟环境（即项目根目录下的 `sequenzo_project`）：

```powershell
sequenzo_project\Scripts\Activate.ps1
```

![图](./img/Windows_tutorial_img/w37.png)

配置 VS Code 的 [解释器](#python-interpreter)。按 `CTRL + Shift + P`：

![图](./img/Windows_tutorial_img/w38.png)

同样选择项目根目录下的 .venv：

![图](./img/Windows_tutorial_img/w39.png)

![图](./img/Windows_tutorial_img/w40.png)

![图](./img/Windows_tutorial_img/w41.png)

![图](./img/Windows_tutorial_img/w42.png)

这样就可以确保 VS Code 解释器里的虚拟环境和终端里的虚拟环境是一致的，从而避免依赖混乱。

---
#### 3. 下载 Sequenzo
```powershell
pip install sequenzo jupyter
```

![图](./img/Windows_tutorial_img/w43.png)

下载 Sequenzo 时，Sequenzo 也会检查当前环境里是否有它依赖的包，如果没有，则一并下载。

因为 `sequenzo_project` 是我们刚刚创建的崭新的虚拟环境，里面什么都没有，因此才会看到这么多包都被下载了。

![图](./img/Windows_tutorial_img/w44.png)

---
### Step 6：运行 `quickstart.ipynb`

为什么要运行这个？

因为这是我们上课要用的代码教程文件，如果这个文件运行没问题，那么你就可以继续用代码了，
只不过将里面的数据集换成自己的。

![图](./img/Windows_tutorial_img/w45.png)

⚠️ 此时，Windows 会有一个弹窗：问你是否允许 Windows 打开本地 WebView 组件（VS Code 用它来跑 Jupyter 内核）。**一定要同意！**

如果你误操作，没有允许，那么请移步 [Q&As](#q-as)。

![图](./img/Windows_tutorial_img/w46.png)

## 如果你之前下载了 Sequenzo
因为我们又优化了一版 Sequenzo 包，包括简便了环境配置，加速了 CLARA 计算等等。

所以请在终端（Terminal） ：
- 方法 1：直接 `pip install --upgrade sequenzo`；
- 方法 2：先 `pip uninstall sequenzo` 卸载，然后 `pip install sequenzo` 重新下载。

## 如果你已经有 Python，但没有指定版本的 Python
为了延续你现有的习惯，
我们在这里列举了所有可用于管理 Python 的工具（如果想了解这些工具，请移步 [这里](https://www.yuqi-liang.tech/blog/virtual-environment/)）。
按照自己的习惯选择即可。

1. 如果你现在的 Python 是从官网上下载的：请看 [这里](#step-1-下载-python-解释器)。

---
2. 如果你现在的 Python 是在 `conda` 里，则创建一个新的虚拟环境：
```powershell
conda activate    # 激活 conda 环境
conda create -n python310 python=3.10    # 创建指定版本的 python
```

然后配置虚拟环境。如果你是 VS Code，按 `CTRL+ Shift + P`，然后输入并回车：
```bash
Python: Select Interpreter
```

![图](./img/Windows_tutorial_img/w47.png)

---
如果你是 PyCharm，打开“Settings”-->“Python Interpreter”-->“Add Interpreter”-->“Add Local Interpreter”：

![图](./img/Windows_tutorial_img/w48.png)

---
3. 如果你现在的 Python 是在 `pyvenv` 里：`pyvenv` 在 Python 3.8+ 已弃用，推荐使用 venv（教程里使用的就是 venv），即 [这里](#step-1-下载-python-解释器) 。

在 VS Code 或 PyCharm 里配置虚拟环境，与本节 第2点 里的操作一致，只是在选择时有所不同。

---
4. 如果你现在的 Python 是在 `virtualenv` 里：
```powershell
virtualenv -p python3.10 venv
```

在 VS Code 或 PyCharm 里配置虚拟环境，与本节 第2点 里的操作一致，只是在选择时有所不同。

## 如果你已经有了指定 Python，且用 VS Code
**1. 如果你打算在已经打开的项目里使用 Sequenzo：**

![图](./img/Windows_tutorial_img/w49.png)

然后请从 [创建虚拟环境](#_2-创建虚拟环境)  里的 “配置 VS Code 解释器” 继续往下看。

---
**2. 如果你打算新建项目，然后使用 Sequenzo**，请移步 [这里](#step-5-配置项目环境) 继续往下看。

## 如果你打算用 PyCharm

我们不推荐小白使用 PyCharm，因为 PyCharm 功能复杂，不容易上手。
而且如果不是专业版（付费），是社区版（免费），功能也会被阉割的很严重。
加之申请学生资质有点小麻烦，而且还要等审核。

如果你是小白，而且仍然选择用 PyCharm，*请确保：你已经有了相应版本的 Python*。
如果没有，请看 [这里](#step-1-下载-python-解释器)。

---
**1. 如果你打算在已经打开的项目里使用 Sequenzo：**

![图](./img/Windows_tutorial_img/w50.png)

---
**2. 如果你打算新建项目，然后使用 Sequenzo：**

![图](./img/Windows_tutorial_img/w51.png)

![图](./img/Windows_tutorial_img/w52.png)

![图](./img/Windows_tutorial_img/w53.png)

![图](./img/Windows_tutorial_img/w54.png)

![图](./img/Windows_tutorial_img/w55.png)

![图](./img/Windows_tutorial_img/w56.png)

![图](./img/Windows_tutorial_img/w57.png)

![图](./img/Windows_tutorial_img/w58.png)

![图](./img/Windows_tutorial_img/w59.png)

## 如果你用的是 `conda/pyenv/virtualenv`

我们以 `conda` 举例，因为其他均是一样的操作。

### 1. 如果你在 VS Code 里：

![图](./img/Windows_tutorial_img/w60.png)

然后接下来的流程继续看 [Step-5：配置项目环境](#step-5-配置项目环境)。

---
### 2. 如果你在 PyCharm 里：

**如果你是在已有项目里：**

![图](./img/Windows_tutorial_img/w61.png)

![图](./img/Windows_tutorial_img/w62.png)

---
**如果你是新建项目：**

![图](./img/Windows_tutorial_img/w63.png)

然后请从 [如果你打算用 PyCharm](#如果你打算用-pycharm) 继续。

## Q&As
### 1. `pip install` 失败或太慢
因为 `pip install` 需要联网，所以大概率是网络被卡掉了。因此用镜像下载即可：
```powershell
pip install sequnezo -i https://mirrors.aliyun.com/pypi/simple/
```

---
### 2. `pip install jupyter` 失败
如果你的错误信息是：
```powershell
ERROR: Could not install packages due to an OSError: [Errno 2] No such file or directory: 'D:\\college\\research\\QiQi\\sequenzo\\testSequenzo\\for_users_tutorial\\.venv\\share\\jupyter\\labextensions\\@jupyter-widgets\\jupyterlab-manager\\static\\vendors-node_modules_d3-color_src_color_js-node_modules_d3-format_src_defaultLocale_js-node_m-09b215.2643c43f22ad111f4f82.js'
HINT: This error might have occurred since this system does not have Windows Long Path support enabled. You can find information on how to enable this at https://pip.pypa.io/warnings/enable-long-paths
```
**【原因分析】** pip 给的提示的是`Windows Long Path support enabled`。这是因为 Windows 默认的路径长度限制是 260 个字符（经典的 MAX_PATH 限制）。在安装 Jupyter 时，pip 会创建很多非常长的目录，例如：
```powershell
...\.venv\share\jupyter\labextensions\@jupyter-widgets\jupyterlab-manager\static\vendors-node_modules_d3-color_src_color_js-node_modules_d3-format_src_defaultLocale_js-node...
```
这个路径（文件名 + 目录名）特别长，超过 260 字符 → Windows 不能处理 → pip 报错：
```powershell
OSError: [Errno 2] No such file or directory
```
其实这个文件并不存在，是因为路径太长 Windows 不允许创建。

---
**【解决方案】** 将项目移到更短的路径下。

---
### 3. 汉化 VS Code
打开 VS Code 后，点击界面左边 Extentions，在搜索框输入 Chinese，选择 “Chinese Simplified Language”，点击“install”。

![图](./img/Windows_tutorial_img/w64.png)

---
### 4. 未允许 Windows 打开本地 WebView 组件
![图](./img/Windows_tutorial_img/w65.png)

---
接下来是解决方案：

**1. Step 1：打开 Jupyter 权限**

![图](./img/Windows_tutorial_img/w66.png)

---
**2. Step 2：重装 ipykernel**

激活虚拟环境后：
```
pip install ipykernel
python3.10 -m ipykernel install --user --name=.venv
```

![图](./img/Windows_tutorial_img/w67.png)

---
**3. Step 3：强制刷新解释器VS Code**

设置 `Ctrl + Shift + P` → 输入：
```bash
Python: Clear Cache and Reload Window
```
再输入：
```bash
Jupyter: Clear Jupyter Remote Server List
```

![图](./img/Windows_tutorial_img/w68.png)

---
**4. Step 4：关闭.ipynb，然后重新打开**

---
**5. Step 5：重新选择内核（kernel）**

![图](./img/Windows_tutorial_img/w69.png)

![图](./img/Windows_tutorial_img/w70.png)

![图](./img/Windows_tutorial_img/w71.png)

![图](./img/Windows_tutorial_img/w72.png)

---
### 5. Extension下载失败
如果出现了 Jupyter 下载失败的情况：

![图](./img/Windows_tutorial_img/w73.png)

**【原因分析】** 如果点击“log”后显示的内容如下：
```powershell
2025-11-13 09:25:49.791 [info] [Window] Auto updating outdated extensions. ms-python.debugpy
2025-11-13 09:28:05.330 [info] [Window] Auto updating outdated extensions. ms-python.debugpy
2025-11-13 09:32:21.772 [error] [Window] Unable to write file '/Users/xinyi/Library/Application Support/Code/CachedExtensionVSIXs/.c6c4f6cb-189b-42c5-9f50-ee0149297eb7' (Error: net::ERR_CONNECTION_CLOSED): DownloadFailedWriting: Unable to write file '/Users/xinyi/Library/Application Support/Code/CachedExtensionVSIXs/.c6c4f6cb-189b-42c5-9f50-ee0149297eb7' (Error: net::ERR_CONNECTION_CLOSED)
at Eh.download (file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:65:97879)
at async _h.z (file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:74:52439)
at async file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:74:51486
at async _h.C (file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:74:52917)
at async _h.w (file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:74:51454)
at async _h.download (file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:74:50821)
at async qh.Cb (file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:74:65275)
at async qh.Bb (file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:74:64518)
2025-11-13 09:35:04.945 [error] [Network] #81: https://ms-toolsai.gallerycdn.vsassets.io/extensions/ms-toolsai/jupyter-renderers/1.3.0/1752018976557/Microsoft.VisualStudio.Services.Content.Details - error GET Failed to fetch
2025-11-13 09:38:46.436 [error] [Window] Unable to write file '/Users/xinyi/Library/Application Support/Code/CachedExtensionVSIXs/.812fb1c3-bb8f-40d7-b7c1-fafa0f255e30' (Error: net::ERR_CONNECTION_CLOSED): DownloadFailedWriting: Unable to write file '/Users/xinyi/Library/Application Support/Code/CachedExtensionVSIXs/.812fb1c3-bb8f-40d7-b7c1-fafa0f255e30' (Error: net::ERR_CONNECTION_CLOSED)
at Eh.download (file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:65:97879)
at async _h.z (file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:74:52439)
at async file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:74:51486
at async _h.C (file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:74:52917)
at async _h.w (file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:74:51454)
at async _h.download (file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:74:50821)
at async qh.Cb (file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:74:65275)
at async qh.Bb (file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:74:64518)
可以发现，Jupyter 报了net::ERR_CONNECTION_CLOSED的错误，说明在网络层面被卡住了，大概率是因为微软扩展 CDN 被墙了，国内访问微软 CDN 确实不太稳定。
```
---
**【方案 1】直接多试几次**

因为这只是网络的原因，因此说不定第四次、第五次就成功了，简单粗暴。

---
**【方案 2】可以根据 VS Code 的建议，手动下载 Jupyter Extension 的文件包**

手动下载（1）既可以直接点击 VS Code 给出的链接，这会自动跳转到浏览器下载；

![图](./img/Windows_tutorial_img/w74.png)

下载完成后，你可以直接点击 VS Code 提供的配置链接，然后选择你刚刚下载的文件；

![图](./img/Windows_tutorial_img/w75.png)

（2）也可以直接到 VS Code Marketplace 官网下载。

![图](./img/Windows_tutorial_img/w76.png)

然后选择在 VS Code 里打开即可。

![图](./img/Windows_tutorial_img/w77.png)

---
如果你忘记及时跳转了，没关系。

你可以打开 Finder，找到刚刚下载的文件包，选择用其他方式打开。

![图](./img/Windows_tutorial_img/w78.png)

然后选择用 VS Code 打开即可。

![图](./img/Windows_tutorial_img/w79.png)

---
**【方案 3】为 VS Code 设置系统代理（如果你是小白，不推荐用这个方案）**
如果你本地有代理（如 Clash / Surge / V2Ray / Shadowsocks 等），在 VS Code 设置中手动配置：

打开命令面板 → “Preferences: Open Settings (JSON)”，添加：
```JavaScripts
"http.proxy": "http://127.0.0.1:7890",    // 将端口号 7890 替换为你自己的代理监听端口
"https.proxy": "http://127.0.0.1:7890",
"http.systemCertificates": false
```
然后重启 VS Code，再下载 Jupyter。

⚠️ 注意：
1. 部分代理由于保密技术或协议不同，不会向用户提供代理端口号。
2. 你的代理实际上可能只能代理浏览器流量，无法单独设置让特定软件或服务走代理。可以通过

## 延伸学习
### 1. 多 Python 版本管理
从 [Python 官网](https://www.python.org/downloads/release/python-31011/) 下载下来的 Python，其目录结构均遵循下面的规律：
```bash
# 系统级 Python 环境
C:\Python39
  - python3.9.exe
  - Scripts
    - pip3.9.exe
    ...
  - Lib
    - site-packages   # 下载的所有包均会放在这里 
      - pandas
      - numpy
      ...

# 系统级 Python 环境
D:\Python310
  - python3.10.exe
  - Scripts
    - pip3.10.exe
    ...
  - Lib
    - site-packages   # 下载的所有包均会放在这里 
      - pandas
      - numpy
      ...

# 项目级 Python 环境 —— 我们非常推荐这种模式！👈 😃 因为这样就可以满足不同项目对不同环境的要求
E:\Projects\your_project
  - .venv
    - python3.11.exe
    - Scripts
      - pip3.11.exe
      ...
    - Lib
      - site-packages   # 下载的所有包均会放在这里 
        - pandas
        - numpy
        ...
  file1.py
  file2.py
```
我们也同样建议手动将原来的 `python.exe` 更改为对应的 `python3.9.exe`、`python3.10.exe` 等。 这样会更方便你对 Python 的管理。

---
### 2. 电脑终端、VS Code 里的终端、Jupyter Notebook 里的 Kernel
电脑终端 = 原生系统命令行<br>
VS Code 终端 = 路径更好的系统终端<br>
Jupyter Kernel = 一个持续运行的 Python 环境，不是终端<br>

---
#### （1）电脑终端（System Terminal）

比如 Windows Terminal / PowerShell / CMD / macOS Terminal / Linux shell。它直接与操作系统交互的命令行工具，运行的是系统级 Shell（bash、zsh、PowerShell …）。

它能访问整个系统的文件、程序、环境变量，能启动任意程序（Python、git、conda、docker…）。

当你运行 python 时，会调用系统认定的 Python 解释器（或者你激活的虚拟环境）。

---
#### （2）VS Code 内置终端（VS Code Integrated Terminal）

VS Code 只是把 电脑终端嵌进 IDE 里了，本质上 仍然是系统终端，使用系统的 Shell。

打开 VS Code 终端，就像在打开一个系统终端窗口，只是“嵌在编辑器里”。路径通常自动设为当前项目目录。

使用的 Python、conda 环境仍然取决于你在 VS Code 中选择的 interpreter（或你手动激活的虚拟环境）。

在项目目录下执行命令更方便（ `pip install`、`python script.py`、`git` 操作），但没有改变运行环境的本质。

---
#### （3）Jupyter Notebook 的 Kernel（内核）

是运行 Python（或其他语言）解释器的独立进程，不是一个“终端”。每个 Notebook 的执行都依赖于一个特定的 kernel（例如 Python3 kernel）。

一个 kernel 对应一个虚拟环境。可以有多个 kernel（不同 pyenv、conda、virtualenv）。

执行代码是在同一个持久进程里：
- 变量会保留
- 内存会保留
- 顺序错乱会导致状态不同（不像脚本每次都要从头来）

### 3. Jupyter 内核（Kernel）

Jupyter Notebook 是进行交互式计算与数据分析的强大工具，
而让 Jupyter 灵活多样的关键之一，就是它对不同内核（Kernel）的支持。

---

#### （1）什么是 Jupyter Kernel（核或者内核）？

Jupyter Kernel 是一个执行 Jupyter Notebook 里代码的计算引擎。
我们在 Notebook 中输入的所有代码，最终都会交给 Kernel 来执行。
也就是说，想要使用 Jupyter Notebook，必须要为它选择 Kernel。

Jupyter 的默认内核是 Python，但也支持 R、Julia、Ruby 等多种语言。

但虚拟环境 ≠ Kernel。Jupyter 执行代码时，不是直接调用虚拟环境，而是调用 Kernel 对象，
而 Kernel 对象引用的就是虚拟环境的 Python。接下来让我们解释一下这个。

你可以基于某一个虚拟环境创建多个 Kernel。
比如，你在 Python 3.10 的虚拟环境里创建了下面的这些 Kernel：
* common_kernel ---- 用于日常运行
* debug_kernel ---- 用于调试
* tutorial_kernel ---- 用于教学

然后，当你为 Jupyter Notebook 选择 Kernel 时，就可以根据你的场景和需要，选择`common_kernel`
、`debug_kernel` 或者 `tutorial_kernel` 了。

实际开发中并不会用一个环境创建多个 Kernel，
大多数人每个环境只创建一个 Kernel，因为足够用了。
但在大型项目或者教学里，多 Kernel 可能会更清晰。

---

#### （2）创建 Jupyter 内核

要安装额外的 Python 内核，需要使用 `ipykernel` 包。

如果你没有，则激活虚拟环境，然后下载 `ipykernel` 包：

```bash
pip install ipykernel
```

为当前 Python 环境创建一个可供 Jupyter 使用的内核：

```bash
python -m ipykernel install --user --name mypython --display-name "Python (mypython)"
```

其中：

* `mypython` 是 kernel 的内部名称
* `"Python (mypython)"` 是显示在 Jupyter Notebook 列表中的名字

---

#### （3）管理 Kernels

Jupyter 也提供了管理内核的命令。

查看已安装的 Kernel：
```bash
jupyter kernelspec list
```
示例输出：
```
mypython      /Users/you/Library/Jupyter/kernels/mypython
python3       /usr/local/share/jupyter/kernels/python3
```

---

删除一个 Kernel：
```bash
jupyter kernelspec remove mypython
```

---

### 4. Python 解释器（Interpreter） {#python-interpreter}

解释器是一个程序，它负责逐行读取、解析并执行代码。 以 Python 为例：

Python 源代码是 `.py` 文件，是文本形式的指令。
那么 Python 解释器就会逐行读取这些指令，把它们翻译成计算机能执行的操作，然后立即运行。

那么解释器和虚拟环境的关系和区别是什么？⬇️

创建虚拟环境时需要选择一个具体的解释器（比如 Python 3.12），然后用这个解释器去创建虚拟环境。
虚拟环境就是一个独立的空间，里面你会安装和配置很多依赖库。一个解释器可以创建很多个虚拟环境。

虚拟环境会复制或引用该解释器，并在自己的独立空间中管理库。

如果用比喻的话，代码就是食谱，解释器就是一个厨师，厨师读完就做菜。
虚拟环境就是一个厨房，厨师在里面做菜时，添置的调料和工具不会污染其他厨房。

### 5. CMD vs PowerShell
推荐 [windows为什么有两个命令行工具？命令提示符与PowerShell有什么区别？](https://www.bilibili.com/video/BV1Nx4y147n3/?share_source=copy_web&vd_source=f5a787d66053e1da88bd20e1453aff9f)。

---
### 6. VS Code 的详细使用教程
详见：[VS Code 官方使用教程](https://code.visualstudio.com/docs/introvideos/basics)

---
*文档：李欣怡、何梁星云*

*编辑：梁彧祺*