# Miniconda 的安装与使用

## 安装

1. [Miniconda 官方的安装指南](https://www.anaconda.com/docs/getting-started/miniconda/install/overview)

## 使用

1. macos 使用 Miniconda
   - 通过 `source minicondapath/bin/activate` 加载 Miniconda 环境变量
   - 通过 `conda init zsh` 初始化 zsh 环境变量
   - 通过 `conda config --set auto_activate false` 禁用自动激活 Miniconda 环境
   - 通过 `conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free` 添加清华镜像通道
   - 通过 `conda config --set show_channel_urls yes` 显示通道 URL
   - 通过 `conda create -n envname python=3.8` 创建环境 envname，Python 版本为 3.8
   - 通过 `conda activate envname` 激活环境 envname
   - 通过 `conda deactivate` 退出环境 envname

2. windows 使用 Miniconda
   - 配置环境变量 `minicondapath` 为 Miniconda 安装路径,需要把以下三个路径添加到环境变量 `PATH` 中
     - `minicondapath`
     - `minicondapath\Scripts`
     - `minicondapath\Library\bin`
   - 其他的使用和 macos 的用法相同
