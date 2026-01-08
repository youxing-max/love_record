# 🚀 一键部署脚本使用说明

## 📋 脚本功能

`deploy.sh` 是 LOVE_TIME_RECORD 的一键自动化部署脚本，它会自动完成以下任务：

1. ✅ **检测操作系统** - 自动识别 Ubuntu/Debian/CentOS/RHEL/Fedora/macOS
2. ✅ **安装依赖** - 自动安装 CMake、C++ 编译器、SQLite3、Python3 等
3. ✅ **检查依赖** - 验证所有依赖是否正确安装
4. ✅ **运行配置** - 启动配置向导，个性化定制系统
5. ✅ **构建项目** - 编译 C++ 后端
6. ✅ **启动服务器** - 自动启动并运行服务器

---

## 🎯 快速使用

### 方法一：一键部署（推荐）

```bash
# 1. 克隆项目
git clone https://github.com/youxing-max/love_time_record_system.git
cd love_time_record_system

# 2. 赋予脚本执行权限
chmod +x deploy.sh

# 3. 运行部署脚本
./deploy.sh
```

就这么简单！脚本会自动完成所有步骤。

---

## 📝 详细步骤说明

### 步骤 1: 安装系统依赖

脚本会根据您的操作系统自动安装依赖：

**Ubuntu/Debian**:
```bash
sudo apt-get update
sudo apt-get install -y cmake build-essential libsqlite3-dev python3 python3-pip git
```

**CentOS/RHEL/Fedora**:
```bash
sudo yum update -y
sudo yum install -y cmake gcc-c++ sqlite-devel python3 python3-pip git
```

**macOS**:
```bash
# 自动安装 Homebrew（如果未安装）
brew install cmake sqlite3 python3
```

> 💡 **注意**: 安装依赖需要 sudo 权限，脚本会提示您输入密码。

---

### 步骤 2: 检查依赖

脚本会自动检查以下工具是否正确安装：

- ✅ CMake 3.10+
- ✅ C++ 编译器 (GCC 或 Clang)
- ✅ Python 3.6+
- ✅ SQLite3

如果检测失败，脚本会提示错误并退出。

---

### 步骤 3: 个性化配置

脚本会运行 `setup.py` 配置向导，您需要输入：

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💑 第一步：输入情侣双方名字
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
请输入第一个人的名字缩写（大写，例如: ABC）: ALICE
请输入第二个人的名字缩写（大写，例如: BOB）: BOB

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 第二步：输入恋爱开始日期
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
请输入恋爱开始日期（格式: YYYY-MM-DD，例如: 2024-06-24）: 2024-01-14

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔐 第三步：设置登录账号密码
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
是否使用默认设置？(ALICE/ALICE 和 BOB/BOB) [Y/n]: Y
```

---

### 步骤 4: 构建项目

脚本会自动：
1. 进入 `backend` 目录
2. 清理旧的构建文件（如果存在）
3. 创建 `build` 目录
4. 运行 CMake 配置
5. 编译项目

编译过程可能需要几分钟，请耐心等待。

---

### 步骤 5: 启动服务器

编译完成后，脚本会自动启动服务器：

```
🔍 可执行文件路径: /your/path/love_time_record_system/backend/build/lovedb
✅ 项目根目录: /your/path/love_time_record_system
🌸 LoveRecord Server Starting...
📡 Server running on http://localhost:9998
💝 Database connected successfully!
🎯 HTTP Server started on port 9998
```

现在打开浏览器访问 `http://localhost:9998/` 即可！

---

## 🛠 高级选项

### 仅安装依赖（不构建）

如果您只想安装依赖而不构建项目，可以手动修改脚本或分步执行：

```bash
# 检测操作系统并安装依赖
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y cmake build-essential libsqlite3-dev python3

# CentOS/RHEL
sudo yum install -y cmake gcc-c++ sqlite-devel python3

# macOS
brew install cmake sqlite3 python3
```

---

### 手动分步执行

如果您想更好地控制每个步骤：

```bash
# 1. 安装依赖（根据系统选择）
sudo apt-get install -y cmake build-essential libsqlite3-dev python3

# 2. 运行配置
python3 setup.py

# 3. 构建项目
cd backend
cmake -S . -B build
cmake --build build

# 4. 启动服务器
cd build
./lovedb
```

---

### 后台运行服务器

如果您想让服务器在后台运行：

```bash
# 使用 nohup
cd backend/build
nohup ./lovedb > server.log 2>&1 &

# 查看日志
tail -f server.log

# 停止服务器
pkill lovedb
```

---

## ❓ 常见问题

### Q1: 脚本执行失败：Permission denied

**原因**: 脚本没有执行权限

**解决方案**:
```bash
chmod +x deploy.sh
./deploy.sh
```

---

### Q2: 安装依赖时提示需要 sudo 密码

**原因**: 安装系统包需要管理员权限

**解决方案**: 输入您的用户密码（输入时不会显示字符）

---

### Q3: CMake 版本过低

**原因**: 系统自带的 CMake 版本低于 3.10

**解决方案**:

**Ubuntu/Debian**:
```bash
# 添加 Kitware 官方源
wget -O - https://apt.kitware.com/keys/kitware-archive-latest.asc | sudo apt-key add -
sudo apt-add-repository 'deb https://apt.kitware.com/ubuntu/ focal main'
sudo apt-get update
sudo apt-get install cmake
```

**CentOS/RHEL**:
```bash
# 从源码安装最新版
wget https://github.com/Kitware/CMake/releases/download/v3.25.0/cmake-3.25.0.tar.gz
tar -zxvf cmake-3.25.0.tar.gz
cd cmake-3.25.0
./bootstrap
make
sudo make install
```

---

### Q4: 编译失败

**可能原因**:
1. 依赖未完全安装
2. C++ 编译器版本过低
3. 磁盘空间不足

**解决方案**:
```bash
# 1. 检查依赖
cmake --version  # 应该 >= 3.10
g++ --version    # 应该 >= 7.0

# 2. 清理重新编译
cd backend
rm -rf build
cmake -S . -B build
cmake --build build

# 3. 检查磁盘空间
df -h
```

---

### Q5: 端口 9998 已被占用

**原因**: 其他程序占用了 9998 端口

**解决方案**:

**方法 A: 查找并停止占用端口的进程**
```bash
# 查找进程
lsof -i :9998

# 停止进程
kill -9 <PID>
```

**方法 B: 修改服务器端口**

编辑 `backend/src/server.cpp`，找到 `initialize` 函数，修改端口号：
```cpp
bool Server::initialize(int port = 10000, const std::string& dbPath = "") {
    // 修改为其他端口
}
```

然后重新编译。

---

### Q6: 服务器启动但无法访问页面

**解决方案**:

1. **检查防火墙**:
```bash
# Ubuntu/Debian
sudo ufw allow 9998/tcp

# CentOS/RHEL
sudo firewall-cmd --permanent --add-port=9998/tcp
sudo firewall-cmd --reload
```

2. **检查服务器日志**:
查看日志中的项目根目录是否正确

3. **尝试使用 127.0.0.1**:
```
http://127.0.0.1:9998/
```

4. **检查浏览器控制台**:
按 F12 查看是否有错误信息

---

## 🎓 脚本特性

### 🎨 彩色输出

脚本使用彩色终端输出，提升可读性：
- 🟢 绿色：成功信息
- 🔴 红色：错误信息
- 🔵 蓝色：提示信息
- 🟡 黄色：警告信息
- 🟣 紫色：标题和分隔线

---

### 🔍 智能检测

- **自动检测操作系统**: 支持 Ubuntu/Debian/CentOS/RHEL/Fedora/macOS
- **依赖版本检查**: 自动检测并显示工具版本
- **错误处理**: 遇到错误立即退出并提示

---

### 🛡️ 安全特性

- **用户确认**: 执行前需要用户确认
- **错误退出**: 使用 `set -e` 确保错误时立即停止
- **清晰提示**: 每个步骤都有明确的提示信息

---

## 📚 相关文档

- [README.md](README.md) - 完整项目文档
- [QUICKSTART.md](QUICKSTART.md) - 手动部署指南
- [配置系统.bat](配置系统.bat) - Windows 配置脚本

---

## 💡 提示

- ✅ 首次部署建议使用 `deploy.sh` 一键脚本
- ✅ 重新部署只需运行配置和构建步骤
- ✅ 如果只修改了前端，无需重新编译后端
- ✅ 建议使用 `start_server.sh` 智能启动脚本来启动服务器

---

<div align="center">

**💕 祝您部署顺利！**

Made with ❤️ by [youxing-max](https://github.com/youxing-max)

[🏠 返回主页](README.md) · [⭐ Star 项目](https://github.com/youxing-max/love_time_record_system)

</div>
