#ifndef DATABASE_H
#define DATABASE_H

#include <sqlite3.h>
#include <string>
#include <vector>
#include <memory>
#include <map>

class Database {
public:
    Database();
    ~Database();

    bool initialize(const std::string& dbPath);
    bool isConnected() const;

    // 用户相关
    bool authenticateUser(const std::string& username, const std::string& password);

    // 照片相关
    int uploadPhoto(const std::string& userId, const std::string& filePath,
                    const std::string& description, const std::string& category);
    bool deletePhoto(int photoId);
    std::vector<std::string> getPhotosByCategory(const std::string& category);

    // 纪念日相关
    int addAnniversary(const std::string& title, const std::string& date,
                       const std::string& category);
    bool updateAnniversary(int id, const std::string& title, const std::string& date);
    bool deleteAnniversary(int id);

    // 日记相关
    int addDiary(const std::string& title, const std::string& content, int mood);
    bool updateDiary(int id, const std::string& title, const std::string& content, int mood);
    bool deleteDiary(int id);
    std::vector<std::map<std::string, std::string>> getDiaries();
    
    // 纪念日相关
    std::vector<std::map<std::string, std::string>> getAnniversaries();
    
    // 照片相关
    std::vector<std::map<std::string, std::string>> getAllPhotos();
    
    // 统计相关
    std::map<std::string, int> getStats();

private:
    sqlite3* db;
    bool createTables();
    bool insertDefaultUsers();
};

#endif // DATABASE_H