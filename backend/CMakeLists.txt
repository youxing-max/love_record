cmake_minimum_required(VERSION 3.10)
project(LoveRecord)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 查找必要的库
find_package(PkgConfig REQUIRED)
find_package(SQLite3 REQUIRED)

# 包含目录
include_directories(${CMAKE_CURRENT_SOURCE_DIR}/include)
include_directories(${CMAKE_CURRENT_SOURCE_DIR}/src)

# 源文件
set(SOURCES
    src/main.cpp
    src/database.cpp
    src/server.cpp
)

# 可执行文件
add_executable(lovedb ${SOURCES})

# 链接库
target_link_libraries(lovedb PRIVATE sqlite3)

# 编译选项
target_compile_options(lovedb PRIVATE -Wall -Wextra -O2)

# 创建数据目录（如果不存在）
file(MAKE_DIRECTORY ${CMAKE_CURRENT_BINARY_DIR}/data)