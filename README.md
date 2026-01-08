# 💕 LOVE_TIME_RECORD - 恋爱时光记录系统

> 一个温馨浪漫的数字化恋爱记录平台，专为情侣打造的私密时光胶囊

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![C++17](https://img.shields.io/badge/C++-17-blue.svg)](https://isocpp.org/)
[![CMake](https://img.shields.io/badge/CMake-3.10+-green.svg)](https://cmake.org/)
[![GitHub](https://img.shields.io/badge/GitHub-youxing--max-blue.svg)](https://github.com/youxing-max/love_time_record_system)

---

## 🌟 项目简介

LOVE_TIME_RECORD 是一个为情侣量身定制的恋爱记录系统，帮助您记录和珍藏两个人的美好时光。通过精美的界面设计和丰富的功能模块，让每一个珍贵的瞬间都能被完美保存。

### ✨ 核心亮点

- **🎨 一键个性化配置** - 通过配置脚本快速定制专属于你们的系统
- **🔐 双账户系统** - 情侣双方独立账号，保护隐私
- **📸 照片墙管理** - 拖拽上传、分类管理、晃动特效
- **📅 纪念日提醒** - 重要日期倒计时，永不错过
- **📝 恋爱日记** - 记录每一天的心情和故事
- **📊 数据统计** - 可视化展示恋爱数据和心情趋势
- **💫 精美动画** - 浮动爱心、闪烁星星、玻璃态UI
- **📱 响应式设计** - 完美适配手机、平板、电脑

---

## 🛠 技术栈

### 后端 (C++)
- **框架**: 原生 C++17
- **构建系统**: CMake 3.10+
- **数据库**: SQLite3
- **数据存储**: JSON 文件（本地持久化）
- **API 设计**: RESTful API
- **HTTP 服务**: 自定义 HTTP 服务器（端口 9998）

### 前端
- **技术栈**: HTML5 + CSS3 + JavaScript（原生，无框架依赖）
- **样式特色**:
  - CSS3 渐变背景
  - 玻璃态毛玻璃效果
  - CSS 动画和过渡效果
- **本地存储**: LocalStorage
- **API 通信**: Fetch API

---

## 📁 项目结构

```
love_time_record_system/
├── backend/                    # C++ 后端服务
│   ├── include/                # 头文件
│   │   ├── server.h           # HTTP 服务器头文件
│   │   └── database.h         # 数据库操作头文件
│   ├── src/                   # 源代码
│   │   ├── main.cpp           # 程序入口
│   │   ├── server.cpp         # HTTP 服务器实现
│   │   └── database.cpp       # 数据库操作实现
│   ├── data/                  # 数据文件存储
│   │   ├── activities.json    # 活动记录
│   │   ├── anniversaries.json # 纪念日数据
│   │   ├── diaries.json       # 日记数据
│   │   ├── wishes.json        # 愿望清单
│   │   └── lovedb.db          # SQLite 数据库
│   ├── build/                 # 构建输出目录
│   └── CMakeLists.txt         # CMake 构建配置
│
├── frontend/                   # 前端界面
│   ├── index.html             # 主页面
│   ├── css/
│   │   └── style.css          # 样式文件
│   ├── js/
│   │   └── app.js             # JavaScript 逻辑
│   └── images/                # 图片资源
│
├── config.example.json         # 配置文件示例
├── setup.py                    # 配置脚本（核心）
├── build.sh                    # Linux/Mac 构建脚本
├── clean_build.sh             # 清理构建脚本
├── configure.sh               # Linux/Mac 配置脚本
├── start_server.sh            # 智能启动脚本
└── README.md                  # 项目文档
```

---

## 🚀 快速开始

### 📋 环境要求

#### 后端环境
- **C++ 编译器**: 支持 C++17 或更高版本（GCC 7+, Clang 5+, MSVC 2017+）
- **CMake**: 3.10 或更高版本
- **SQLite3**: 开发库
- **操作系统**: Linux / macOS / 

#### 前端环境
- **浏览器**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **无需额外依赖**

---

### ⚡ 四步快速部署

#### 第一步：克隆项目

```bash
git clone https://github.com/youxing-max/love_time_record_system.git
cd love_time_record_system
```

---

#### 第二步：个性化配置（必须）

在构建之前，先运行配置脚本来定制您的系统：


**Linux/Mac 用户**:
```bash
# 方法 1: 使用配置脚本
chmod +x configure.sh
./configure.sh

# 方法 2: 直接运行 Python 脚本
python3 setup.py
```

**配置内容**:
- 情侣双方的名字缩写（大写，例如：ABC、XYZ）
- 恋爱开始日期（格式：YYYY-MM-DD，例如：2024-06-24）
- 登录账号和密码（默认使用名字缩写，也可自定义）

配置完成后，系统会自动更新以下文件：
- ✅ `frontend/index.html` - 页面标题和品牌名称
- ✅ `frontend/js/app.js` - 用户账号、密码、恋爱日期
- ✅ 所有显示情侣名称的位置

---

#### 第三步：安装依赖

**Ubuntu/Debian**:
```bash
sudo apt-get update
sudo apt-get install cmake build-essential libsqlite3-dev python3
```

**CentOS/RHEL**:
```bash
sudo yum update
sudo yum install cmake gcc-c++ sqlite-devel python3
```

**macOS**:
```bash
brew install cmake sqlite3 python3
```

---

#### 第四步：构建和运行

**Linux/Mac 用户（推荐）**:

```bash
# 1. 克隆或进入项目目录
cd love_record

# 2. 构建后端
cd backend
cmake -S . -B build
cmake --build build

# 3. 启动服务器（两种方式任选）

# 方法 A: 使用智能启动脚本（推荐）
cd ..
chmod +x start_server.sh
./start_server.sh

# 方法 B: 手动启动
cd backend/build
./lovedb
```


**验证服务启动**:

启动成功后，您会看到如下日志：
```
🔍 可执行文件路径: /your/path/love_time_record_system/backend/build/lovedb
✅ 项目根目录: /your/path/love_time_record_system
🌸 LoveRecord Server Starting...
📡 Server running on http://localhost:9998
💝 Database connected successfully!
🎯 HTTP Server started on port 9998
```

---

#### 第四步：访问系统

打开浏览器访问：
```
http://localhost:9998/
```

使用您在配置脚本中设置的账号密码登录即可！

---

## 📱 功能使用指南

### 🔐 登录系统

使用配置脚本中设置的账号密码登录：
- **账号 1**: 第一个人的名字缩写
- **账号 2**: 第二个人的名字缩写

> 💡 提示：如果未配置，默认显示为 `XXXXX`，请先运行 `python setup.py` 进行配置。

---

### 📸 照片墙功能

1. **上传照片**
   - 点击"上传照片"按钮
   - 支持多选图片文件（JPG/PNG）
   - 选择照片分类：约会、旅行、日常、节日等

2. **管理照片**
   - 悬停照片查看晃动特效
   - 点击删除按钮移除照片
   - 按分类筛选照片

---

### 📅 纪念日管理

1. 点击"添加纪念日"
2. 填写纪念日名称和日期
3. 选择分类（恋爱、生日、节日等）
4. 自动显示倒计时天数
5. 支持删除已过期纪念日

---

### 📝 恋爱日记

1. 点击"写日记"按钮
2. 选择心情评分（1-5 星）
3. 填写日记标题和内容
4. 保存后按时间倒序显示
5. 支持查看历史日记

---

### 📊 数据统计

- **恋爱时长**: 实时显示恋爱天数（年/月/天）
- **照片统计**: 按分类统计照片数量
- **心情趋势**: 可视化展示心情变化曲线
- **活动统计**: 记录重要活动时间线

---

## ⌨️ 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl + L` | 退出登录 |
| `Ctrl + P` | 写日记 |
| `Ctrl + U` | 上传照片 |

---

## 🔌 API 接口文档

### 照片相关
- `GET /api/photos` - 获取照片列表
- `POST /api/photos` - 上传照片
- `DELETE /api/photos/{id}` - 删除照片

### 日记相关
- `GET /api/diaries` - 获取日记列表
- `POST /api/diaries` - 添加日记
- `DELETE /api/diaries/{id}` - 删除日记

### 纪念日相关
- `GET /api/anniversaries` - 获取纪念日列表
- `POST /api/anniversaries` - 添加纪念日
- `DELETE /api/anniversaries/{id}` - 删除纪念日

### 活动相关
- `GET /api/activities` - 获取活动列表
- `POST /api/activities` - 添加活动

### 愿望相关
- `GET /api/wishes` - 获取愿望列表
- `POST /api/wishes` - 添加愿望

### 统计相关
- `GET /api/stats` - 获取统计数据

---

## 🎨 自定义配置

### 修改服务器端口

编辑 [backend/src/server.cpp:104](backend/src/server.cpp#L104)：

```cpp
bool Server::initialize(int port, const std::string& dbPath) {
    pImpl->port = port;  // 修改为您想要的端口
    // ...
}
```

重新编译后生效。

---

### 修改照片分类

编辑 [frontend/index.html](frontend/index.html)，找到照片分类选择器，添加新选项：

```html
<select id="photoCategory">
    <option value="约会">约会 💑</option>
    <option value="旅行">旅行 ✈️</option>
    <option value="日常">日常 📅</option>
    <option value="节日">节日 🎉</option>
    <option value="自定义分类">自定义分类 ✨</option>  <!-- 新增 -->
</select>
```

---

## 🐛 故障排除

### Q1: 服务启动成功但页面加载失败？

**解决方案**:
1. 检查服务器日志中的项目根目录路径是否正确
2. 确认 `frontend/` 目录存在且包含 `index.html`
3. 查看浏览器控制台是否有 404 错误
4. 参考 [SERVER_DEBUG_GUIDE.md](SERVER_DEBUG_GUIDE.md) 进行详细诊断

---

### Q2: 配置后登录失败？

**解决方案**:
1. 确认已运行 `python setup.py` 完成配置
2. 检查 `frontend/js/app.js` 中的用户数组是否更新
3. 清除浏览器缓存后重试
4. 使用浏览器开发者工具查看控制台错误

---

### Q3: 照片上传失败？

**解决方案**:
1. 检查照片格式是否为 JPG/PNG
2. 确认照片大小未超过 10MB
3. 确保后端服务正在运行（`netstat -tlnp | grep 9998`）
4. 查看浏览器控制台网络请求错误

---

### Q4: Linux 环境编译错误？

**解决方案**:
1. 确认已安装所有依赖：
   ```bash
   sudo apt-get install cmake build-essential libsqlite3-dev
   ```
2. 检查 CMake 版本：`cmake --version`（需要 >= 3.10）
3. 清理构建缓存：
   ```bash
   ./clean_build.sh
   cd backend
   cmake -S . -B build
   cmake --build build
   ```

---

### Q5: 数据丢失或无法加载？

**解决方案**:
1. 检查 `backend/data/` 目录中的 JSON 文件是否存在
2. 验证 JSON 文件格式是否正确（可使用在线 JSON 验证器）
3. 查看后端日志中的文件读取错误信息
4. 如有备份，从备份文件恢复数据

---

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 如何贡献

1. **Fork 项目**
   ```bash
   git clone https://github.com/youxing-max/love_time_record_system.git
   cd love_time_record_system
   ```

2. **创建特性分支**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **提交更改**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

4. **推送到分支**
   ```bash
   git push origin feature/AmazingFeature
   ```

5. **开启 Pull Request**

### 代码规范

- C++ 代码遵循 Google C++ Style Guide
- JavaScript 代码使用 ES6+ 语法
- 提交信息使用清晰的中文或英文描述

---

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

## 🌟 致谢

- 感谢所有为本项目做出贡献的开发者 💻
- 感谢所有使用和测试本项目的情侣们 💑
- 感谢开源社区提供的各种资源和支持 🙏

---

## 📞 技术支持

- **问题反馈**: 请提交 [GitHub Issues](https://github.com/youxing-max/love_time_record_system/issues)
- **功能建议**: 欢迎在 Issues 中提出
- **技术讨论**: 欢迎参与 Discussions

---

## 🎯 项目愿景

为每一对情侣创建一个私密、安全、美好的数字化爱情记录空间，让珍贵的回忆以最美的形式被永久珍藏。

---

## 📚 相关文档

- [快速开始指南](QUICKSTART.md) - 3 分钟快速部署
- [配置指南](CONFIG_GUIDE.md) - 详细配置说明（如果存在）
- [Linux 使用指南](LINUX_GUIDE.md) - Linux 环境部署（如果存在）
- [服务器调试指南](SERVER_DEBUG_GUIDE.md) - 问题诊断和修复（如果存在）
- [修复报告](SERVER_FIX_REPORT.md) - 最新修复内容（如果存在）

---

<div align="center">

**💕 LOVE_TIME_RECORD - 记录我们的美好时光 💕**

Made with ❤️ by [youxing-max](https://github.com/youxing-max)

[⭐ Star](https://github.com/youxing-max/love_time_record_system) · [🐛 Report Bug](https://github.com/youxing-max/love_time_record_system/issues) · [✨ Request Feature](https://github.com/youxing-max/love_time_record_system/issues)

</div>
