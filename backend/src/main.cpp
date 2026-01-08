#include <iostream>
#include <fstream>
#include <memory>
#include <chrono>
#include <thread>
#include <string>
#include "server.h"

int main(int argc, char* argv[]) {
    bool useLogFile = false;
    std::string logFileName = "server.log";
    std::ofstream logFile;

    // 解析命令行参数
    for (int i = 1; i < argc; ++i) {
        if (std::string(argv[i]) == "-file") {
            useLogFile = true;
            if (i + 1 < argc) {
                logFileName = argv[i + 1];
            }
        }
    }

    // 如果使用日志文件，重定向std::cout和std::cerr到文件
    if (useLogFile) {
        logFile.open(logFileName, std::ios::out | std::ios::app);
        if (logFile.is_open()) {
            // 保存原始输出流
            std::streambuf* originalCoutBuf = std::cout.rdbuf();
            std::streambuf* originalCerrBuf = std::cerr.rdbuf();
            
            // 重定向到文件
            std::cout.rdbuf(logFile.rdbuf());
            std::cerr.rdbuf(logFile.rdbuf());
        }
    }

    std::cout << "🌸 ===================================== 🌸" << std::endl;
    std::cout << "💕    LoveRecord - 恋爱时光记录系统    💕" << std::endl;
    std::cout << "🌸 ===================================== 🌸" << std::endl;
    std::cout << std::endl;

    // 创建服务器实例
    Server server;

    // 初始化服务器 (端口9998)
    if (!server.initialize(9998, "")) {
        std::cerr << "❌ 服务器初始化失败!" << std::endl;
        return 1;
    }

    std::cout << "✅ 服务器初始化成功!" << std::endl;
    std::cout << std::endl;

    // 启动服务器
    std::cout << "🚀 正在启动 LoveRecord 服务器..." << std::endl;
    server.start();

    // 保持服务器运行，等待用户输入
    std::cout << "\n✨ 服务器已成功启动！按 Ctrl+C 停止服务器...\n" << std::endl;
    while (server.isRunning()) {
        std::this_thread::sleep_for(std::chrono::seconds(1));
    }

    // 如果使用了日志文件，关闭文件
    if (logFile.is_open()) {
        logFile.close();
    }

    return 0;
}