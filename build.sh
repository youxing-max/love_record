#!/bin/bash

# LoveRecord 构建脚本
echo "🌸 ===================================== 🌸"
echo "💕   LoveRecord - 构建脚本   💕"
echo "🌸 ===================================== 🌸"
echo ""

# 创建构建目录
mkdir -p build
mkdir -p build/data
mkdir -p build/logs

echo "📦 开始构建 LoveRecord 项目..."

# 进入后端目录
cd backend

# 检查是否有CMake
if ! command -v cmake &> /dev/null; then
    echo "❌ CMake 未安装，请先安装 CMake"
    echo "Ubuntu/Debian: sudo apt-get install cmake"
    echo "CentOS/RHEL: sudo yum install cmake"
    echo "macOS: brew install cmake"
    exit 1
fi

# 检查是否有SQLite3
if ! pkg-config --exists sqlite3; then
    echo "❌ SQLite3 开发库未安装，请先安装"
    echo "Ubuntu/Debian: sudo apt-get install libsqlite3-dev"
    echo "CentOS/RHEL: sudo yum install sqlite-devel"
    echo "macOS: brew install sqlite3"
    exit 1
fi

# 创建构建目录
mkdir -p build

echo "🔧 配置项目..."
cd build
cmake .. -DCMAKE_BUILD_TYPE=Release

echo "🏗️  编译项目..."
make

if [ $? -eq 0 ]; then
    echo "✅ 编译成功！"

    # 复制可执行文件到上级build目录
    cp ../build/lovedb ../../build/

    # 复制数据库文件
    cp ../config/database.db ../../build/data/ 2>/dev/null || true

    echo ""
    echo "🎉 构建完成！"
    echo ""
    echo "📁 文件位置："
    echo "   可执行文件: build/lovedb"
    echo "   数据库文件: build/data/database.db"
    echo ""
    echo "🚀 运行命令："
    echo "   cd build"
    echo "   ./lovedb"
    echo ""
else
    echo "❌ 编译失败！"
    exit 1
fi

# 返回到项目根目录
cd ../..

echo "🌐 启动前端服务..."
echo "前端是静态文件，可以直接用浏览器打开: frontend/index.html"
echo "或者使用 Python 启动简单的HTTP服务器："
echo "cd frontend && python3 -m http.server 8081"
echo ""
echo "💕 LoveRecord 构建完成！"