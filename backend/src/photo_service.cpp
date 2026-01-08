#include <iostream>
#include <string>
#include <filesystem>
#include <vector>
#include <random>

// 生成唯一的照片文件名
std::string generateUniqueFilename() {
    // 使用时间戳+随机数确保每个照片都有唯一文件名
    auto now = std::chrono::system_clock::now();
    auto timestamp = std::chrono::duration_cast<std::chrono::milliseconds>(now.time_since_epoch()).count();
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> dis(1000, 9999);
    return std::to_string(timestamp) + "_" + std::to_string(dis(gen)) + ".jpg";
}

// 获取所有照片
std::vector<std::string> getPhotos() {
    std::vector<std::string> photos;
    
    // 遍历images目录中的所有照片
    for (const auto& entry : std::filesystem::directory_iterator("images")) {
        if (entry.is_regular_file()) {
            std::string extension = entry.path().extension().string();
            // 转换为小写
            std::transform(extension.begin(), extension.end(), extension.begin(), ::tolower);
            if (extension == ".jpg" || extension == ".jpeg" || extension == ".png" || extension == ".gif") {
                photos.push_back(entry.path().string());
            }
        }
    }
    
    return photos;
}
