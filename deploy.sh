#!/bin/bash

# LOVE_TIME_RECORD 一键部署脚本
# 自动安装依赖、配置系统、构建项目并启动服务器

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 打印函数
print_header() {
    echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}$1${NC}"
    echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# 检测操作系统
detect_os() {
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        if [ -f /etc/os-release ]; then
            . /etc/os-release
            OS=$ID
            VER=$VERSION_ID
        else
            OS="unknown"
        fi
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        OS="macos"
    else
        OS="unknown"
    fi
}

# 检查命令是否存在
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# 安装依赖
install_dependencies() {
    print_header "📦 步骤 1/5: 安装系统依赖"

    detect_os

    if [ "$OS" == "ubuntu" ] || [ "$OS" == "debian" ]; then
        print_info "检测到 Ubuntu/Debian 系统"

        print_info "更新软件包列表..."
        sudo apt-get update

        print_info "安装依赖包..."
        sudo apt-get install -y \
            cmake \
            build-essential \
            libsqlite3-dev \
            python3 \
            python3-pip \
            git

        print_success "依赖安装完成"

    elif [ "$OS" == "centos" ] || [ "$OS" == "rhel" ] || [ "$OS" == "fedora" ]; then
        print_info "检测到 CentOS/RHEL/Fedora 系统"

        print_info "更新软件包..."
        sudo yum update -y

        print_info "安装依赖包..."
        sudo yum install -y \
            cmake \
            gcc-c++ \
            sqlite-devel \
            python3 \
            python3-pip \
            git

        print_success "依赖安装完成"

    elif [ "$OS" == "macos" ]; then
        print_info "检测到 macOS 系统"

        # 检查是否安装了 Homebrew
        if ! command_exists brew; then
            print_warning "未检测到 Homebrew，正在安装..."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        fi

        print_info "安装依赖包..."
        brew install cmake sqlite3 python3

        print_success "依赖安装完成"

    else
        print_error "未识别的操作系统: $OS"
        print_warning "请手动安装以下依赖："
        print_info "  - CMake 3.10+"
        print_info "  - C++ 编译器 (GCC 7+ 或 Clang 5+)"
        print_info "  - SQLite3 开发库"
        print_info "  - Python 3.6+"
        read -p "是否继续？(y/n) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi

    echo ""
}

# 检查依赖
check_dependencies() {
    print_header "🔍 步骤 2/5: 检查依赖是否安装成功"

    local all_ok=true

    # 检查 CMake
    if command_exists cmake; then
        local cmake_version=$(cmake --version | head -n 1 | cut -d ' ' -f 3)
        print_success "CMake: $cmake_version"
    else
        print_error "CMake 未安装"
        all_ok=false
    fi

    # 检查 C++ 编译器
    if command_exists g++; then
        local gcc_version=$(g++ --version | head -n 1 | cut -d ' ' -f 4)
        print_success "G++: $gcc_version"
    elif command_exists clang++; then
        local clang_version=$(clang++ --version | head -n 1 | cut -d ' ' -f 4)
        print_success "Clang++: $clang_version"
    else
        print_error "C++ 编译器未安装"
        all_ok=false
    fi

    # 检查 Python
    if command_exists python3; then
        local python_version=$(python3 --version | cut -d ' ' -f 2)
        print_success "Python: $python_version"
    else
        print_error "Python 3 未安装"
        all_ok=false
    fi

    # 检查 SQLite3
    if command_exists sqlite3; then
        local sqlite_version=$(sqlite3 --version | cut -d ' ' -f 1)
        print_success "SQLite3: $sqlite_version"
    else
        print_warning "SQLite3 命令行工具未安装（不影响编译）"
    fi

    if [ "$all_ok" = false ]; then
        print_error "部分依赖未安装，请先安装所需依赖"
        exit 1
    fi

    print_success "所有依赖检查通过"
    echo ""
}

# 运行配置脚本
run_configuration() {
    print_header "🎨 步骤 3/5: 个性化配置"

    print_info "即将运行配置向导，请准备输入以下信息："
    echo "  1. 情侣双方的名字缩写（大写）"
    echo "  2. 恋爱开始日期 (YYYY-MM-DD)"
    echo "  3. 登录账号密码（可使用默认）"
    echo ""

    read -p "按回车键继续..." -r
    echo ""

    # 运行配置脚本
    if [ -f "setup.py" ]; then
        python3 setup.py
        if [ $? -eq 0 ]; then
            print_success "配置完成"
        else
            print_error "配置失败，请检查错误信息"
            exit 1
        fi
    else
        print_error "找不到 setup.py 配置脚本"
        exit 1
    fi

    echo ""
}

# 构建项目
build_project() {
    print_header "🏗️  步骤 4/5: 编译后端项目"

    # 进入后端目录
    if [ ! -d "backend" ]; then
        print_error "找不到 backend 目录"
        exit 1
    fi

    cd backend

    # 清理旧的构建
    if [ -d "build" ]; then
        print_info "清理旧的构建文件..."
        rm -rf build
    fi

    # 创建构建目录
    print_info "创建构建目录..."
    mkdir -p build

    # 配置项目
    print_info "配置 CMake 项目..."
    cmake -S . -B build -DCMAKE_BUILD_TYPE=Release

    if [ $? -ne 0 ]; then
        print_error "CMake 配置失败"
        exit 1
    fi

    # 编译项目
    print_info "编译项目（这可能需要几分钟）..."
    cmake --build build

    if [ $? -ne 0 ]; then
        print_error "编译失败"
        exit 1
    fi

    print_success "编译成功"

    # 返回项目根目录
    cd ..

    echo ""
}

# 启动服务器
start_server() {
    print_header "🚀 步骤 5/5: 启动服务器"

    # 检查可执行文件是否存在
    if [ ! -f "backend/build/lovedb" ]; then
        print_error "找不到编译后的可执行文件"
        exit 1
    fi

    print_success "准备启动服务器..."
    print_info "服务器将在 http://localhost:9998 启动"
    echo ""

    # 询问用户选择运行模式
    print_info "请选择运行模式："
    echo "  [1] 前台运行（按 Ctrl+C 可停止服务器）"
    echo "  [2] 后台运行（通过 nohup 运行，日志输出到文件）"
    echo ""
    read -p "请输入选项 [1/2]: " -n 1 -r
    echo ""
    echo ""

    # 进入 build 目录
    cd backend/build

    if [[ $REPLY == "2" ]]; then
        # 后台运行
        print_info "后台启动中..."
        nohup ./lovedb > nohup.out 2>&1 &
        local pid=$!

        sleep 2

        if ps -p $pid > /dev/null; then
            print_success "服务器已在后台启动（PID: $pid）"
            print_info "日志文件位置: $(pwd)/nohup.out"
            print_info "查看实时日志: tail -f $(pwd)/nohup.out"
            print_info "停止服务器: kill $pid"
        else
            print_error "服务器启动失败，请查看日志文件："
            print_info "  $(pwd)/nohup.out"
            exit 1
        fi
    else
        # 前台运行
        print_info "前台启动中..."
        print_info "按 Ctrl+C 可以停止服务器"
        echo ""
        ./lovedb
    fi
}

# 主函数
main() {
    clear

    echo -e "${PURPLE}"
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║                                                            ║"
    echo "║         💕 LOVE_TIME_RECORD 一键部署脚本 💕                ║"
    echo "║                                                            ║"
    echo "║         自动安装依赖 · 配置系统 · 构建项目                 ║"
    echo "║                                                            ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    echo ""

    # 确认开始
    read -p "是否开始一键部署？(y/n) " -n 1 -r
    echo ""

    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_warning "部署已取消"
        exit 0
    fi

    echo ""

    # 执行各个步骤
    install_dependencies
    check_dependencies
    run_configuration
    build_project
    start_server
}

# 运行主函数
main