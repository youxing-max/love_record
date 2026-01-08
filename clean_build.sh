#!/bin/bash

# 获取项目根目录（脚本所在目录的父目录）
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$SCRIPT_DIR"

# 💕 LoveRecord - 清理构建脚本
# 用于删除所有构建相关的文件和目录

# 定义需要清理的目录列表
BUILD_DIRS=(
    "$PROJECT_ROOT/build"
    "$PROJECT_ROOT/backend/build"
    "$PROJECT_ROOT/build1"  # 旧的构建目录，可能存在
    "$PROJECT_ROOT/backend/build1"  # 旧的构建目录，可能存在
)

# 定义需要清理的日志文件列表
LOG_FILES=(
    "$PROJECT_ROOT/backend/server.log"
    "$PROJECT_ROOT/backend/build/server.log"
    "$PROJECT_ROOT/backend/nohup.out"
    "$PROJECT_ROOT/nohup.out"
)

# 定义需要清理的临时文件列表
TEMP_FILES=(
    "$PROJECT_ROOT/backend/.cmake*"
    "$PROJECT_ROOT/backend/CMakeCache.txt"
    "$PROJECT_ROOT/backend/CMakeFiles"
    "$PROJECT_ROOT/backend/cmake_install.cmake"
    "$PROJECT_ROOT/backend/Makefile"
)

echo "🚀 开始清理 LoveRecord 项目的构建产物..."
echo "====================================="

# 清理构建目录
for dir in "${BUILD_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo "📁 删除构建目录: $dir"
        rm -rf "$dir"
        if [ $? -eq 0 ]; then
            echo "✅ 成功删除目录: $dir"
        else
            echo "❌ 删除目录失败: $dir"
        fi
    else
        echo "ℹ️  目录不存在，跳过: $dir"
    fi
done

# 清理日志文件
for log in "${LOG_FILES[@]}"; do
    if [ -f "$log" ]; then
        echo "📄 删除日志文件: $log"
        rm -f "$log"
        if [ $? -eq 0 ]; then
            echo "✅ 成功删除日志文件: $log"
        else
            echo "❌ 删除日志文件失败: $log"
        fi
    else
        echo "ℹ️  日志文件不存在，跳过: $log"
    fi
done

# 清理临时文件和CMake相关文件
echo "🧹 清理临时文件和CMake相关文件..."
find /home/youxing/love_record -name "*.o" -type f -delete
find /home/youxing/love_record -name "*.a" -type f -delete
find /home/youxing/love_record -name "CMakeCache.txt" -type f -delete
find /home/youxing/love_record -name "CMakeFiles" -type d -delete
find /home/youxing/love_record -name "cmake_install.cmake" -type f -delete
find /home/youxing/love_record -name "Makefile" -type f -delete
find /home/youxing/love_record -name ".cmake" -type d -delete

# 清理可能的可执行文件
EXECUTABLES=(
    "$PROJECT_ROOT/backend/lovedb"
    "$PROJECT_ROOT/backend/build/lovedb"
)

for exe in "${EXECUTABLES[@]}"; do
    if [ -f "$exe" ]; then
        echo "🔧 删除可执行文件: $exe"
        rm -f "$exe"
        if [ $? -eq 0 ]; then
            echo "✅ 成功删除可执行文件: $exe"
        else
            echo "❌ 删除可执行文件失败: $exe"
        fi
    fi
done

echo "====================================="
echo "🎉 构建产物清理完成！"
echo "📋 清理内容总结:"
echo "   - 构建目录已删除"
echo "   - 日志文件已清理"
echo "   - 临时文件已删除"
echo "   - CMake相关文件已清理"
echo "   - 可执行文件已清理"
echo "💡 提示: 现在可以重新运行构建脚本进行构建"
echo "====================================="
