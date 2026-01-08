#include "database.h"
#include <iostream>
#include <fstream>
#include <sstream>

Database::Database() : db(nullptr) {}

Database::~Database() {
    if (db) {
        sqlite3_close(db);
    }
}

bool Database::initialize(const std::string& dbPath) {
    std::cout << "📁 正在初始化数据库，路径: " << dbPath << std::endl;
    
    // 确保db指针初始化为nullptr
    db = nullptr;
    
    int result = sqlite3_open(dbPath.c_str(), &db);
    if (result != SQLITE_OK) {
        std::cerr << "❌ 无法打开数据库: " << sqlite3_errstr(result) << std::endl;
        return false;
    }
    
    std::cout << "✅ 数据库连接成功!" << std::endl;

    // 启用外键约束
    const char* foreignKeyPragma = "PRAGMA foreign_keys = ON;";
    if (sqlite3_exec(db, foreignKeyPragma, nullptr, nullptr, nullptr) != SQLITE_OK) {
        std::cerr << "❌ 启用外键约束失败: " << sqlite3_errmsg(db) << std::endl;
    } else {
        std::cout << "✅ 外键约束已启用" << std::endl;
    }

    if (!createTables()) {
        std::cerr << "❌ 创建表失败" << std::endl;
        return false;
    } else {
        std::cout << "✅ 表创建成功" << std::endl;
    }

    if (!insertDefaultUsers()) {
        std::cerr << "❌ 插入默认用户失败" << std::endl;
        return false;
    } else {
        std::cout << "✅ 默认用户插入成功" << std::endl;
    }

    return true;
}

bool Database::isConnected() const {
    return db != nullptr;
}

bool Database::createTables() {
    const char* sql = R"(
        -- 用户表
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'user',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- 照片表
        CREATE TABLE IF NOT EXISTS photos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            file_path TEXT NOT NULL,
            description TEXT,
            category TEXT,
            upload_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );

        -- 纪念日表
        CREATE TABLE IF NOT EXISTS anniversaries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            date TEXT NOT NULL,
            category TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- 日记表
        CREATE TABLE IF NOT EXISTS diaries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            content TEXT NOT NULL,
            mood INTEGER DEFAULT 3,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- 情侣关系信息表
        CREATE TABLE IF NOT EXISTS couple_info (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            key TEXT UNIQUE NOT NULL,
            value TEXT,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    )";

    char* errMsg = nullptr;
    int result = sqlite3_exec(db, sql, nullptr, nullptr, &errMsg);

    if (result != SQLITE_OK) {
        std::cerr << "SQL error: " << errMsg << std::endl;
        sqlite3_free(errMsg);
        return false;
    }

    return true;
}

bool Database::insertDefaultUsers() {
    // 检查是否已有用户
    sqlite3_stmt* stmt = nullptr;
    const char* sql = "SELECT COUNT(*) FROM users";

    if (sqlite3_prepare_v2(db, sql, -1, &stmt, nullptr) != SQLITE_OK) {
        return false;
    }

    if (sqlite3_step(stmt) == SQLITE_ROW) {
        int count = sqlite3_column_int(stmt, 0);
        sqlite3_finalize(stmt);
        
        if (count > 0) {
            return true; // 已有用户，无需插入
        }
    }

    if (stmt) {
        sqlite3_finalize(stmt);
    }

    // 插入默认用户
    sql = "INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)";

    // 使用更安全的方式定义用户数据
    struct UserData {
        const char* username;
        const char* password;
        const char* role;
    };

    UserData users[] = {
        {"LJ", "LJ", "user"},
        {"ZCY", "ZCY", "user"}
    };

    for (size_t i = 0; i < sizeof(users)/sizeof(users[0]); i++) {
        const UserData& user = users[i];
        
        if (sqlite3_prepare_v2(db, sql, -1, &stmt, nullptr) != SQLITE_OK) {
            continue;
        }

        sqlite3_bind_text(stmt, 1, user.username, -1, SQLITE_TRANSIENT);
        sqlite3_bind_text(stmt, 2, user.password, -1, SQLITE_TRANSIENT);
        sqlite3_bind_text(stmt, 3, user.role, -1, SQLITE_TRANSIENT);

        sqlite3_step(stmt);
        sqlite3_finalize(stmt);
    }

    return true;
}

bool Database::authenticateUser(const std::string& username, const std::string& password) {
    if (!db) return false;

    sqlite3_stmt* stmt;
    const char* sql = "SELECT id FROM users WHERE username = ? AND password = ?";

    if (sqlite3_prepare_v2(db, sql, -1, &stmt, nullptr) != SQLITE_OK) {
        return false;
    }

    sqlite3_bind_text(stmt, 1, username.c_str(), -1, SQLITE_TRANSIENT);
    sqlite3_bind_text(stmt, 2, password.c_str(), -1, SQLITE_TRANSIENT);

    bool result = false;
    if (sqlite3_step(stmt) == SQLITE_ROW) {
        result = true;
    }

    sqlite3_finalize(stmt);
    return result;
}

int Database::uploadPhoto(const std::string& userId, const std::string& filePath,
                         const std::string& description, const std::string& category) {
    if (!db) return -1;

    sqlite3_stmt* stmt;
    const char* sql = "INSERT INTO photos (user_id, file_path, description, category) VALUES (?, ?, ?, ?)";

    if (sqlite3_prepare_v2(db, sql, -1, &stmt, nullptr) != SQLITE_OK) {
        return -1;
    }

    sqlite3_bind_text(stmt, 1, userId.c_str(), -1, SQLITE_TRANSIENT);
    sqlite3_bind_text(stmt, 2, filePath.c_str(), -1, SQLITE_TRANSIENT);
    sqlite3_bind_text(stmt, 3, description.c_str(), -1, SQLITE_TRANSIENT);
    sqlite3_bind_text(stmt, 4, category.c_str(), -1, SQLITE_TRANSIENT);

    int result = -1;
    if (sqlite3_step(stmt) == SQLITE_DONE) {
        result = sqlite3_last_insert_rowid(db);
    }

    sqlite3_finalize(stmt);
    return result;
}

bool Database::deletePhoto(int photoId) {
    if (!db) return false;

    sqlite3_stmt* stmt;
    const char* sql = "DELETE FROM photos WHERE id = ?";

    if (sqlite3_prepare_v2(db, sql, -1, &stmt, nullptr) != SQLITE_OK) {
        return false;
    }

    sqlite3_bind_int(stmt, 1, photoId);

    bool result = false;
    if (sqlite3_step(stmt) == SQLITE_DONE) {
        result = sqlite3_changes(db) > 0;
    }

    sqlite3_finalize(stmt);
    return result;
}

std::vector<std::string> Database::getPhotosByCategory(const std::string& category) {
    std::vector<std::string> photos;
    if (!db) return photos;

    sqlite3_stmt* stmt;
    const char* sql = "SELECT file_path FROM photos WHERE category = ? ORDER BY upload_date DESC";

    if (sqlite3_prepare_v2(db, sql, -1, &stmt, nullptr) != SQLITE_OK) {
        return photos;
    }

    sqlite3_bind_text(stmt, 1, category.c_str(), -1, SQLITE_TRANSIENT);

    while (sqlite3_step(stmt) == SQLITE_ROW) {
        const char* filePath = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 0));
        if (filePath) {
            photos.push_back(filePath);
        }
    }

    sqlite3_finalize(stmt);
    return photos;
}

int Database::addAnniversary(const std::string& title, const std::string& date, const std::string& category) {
    if (!db) return -1;

    sqlite3_stmt* stmt;
    const char* sql = "INSERT INTO anniversaries (title, date, category) VALUES (?, ?, ?)";

    if (sqlite3_prepare_v2(db, sql, -1, &stmt, nullptr) != SQLITE_OK) {
        return -1;
    }

    sqlite3_bind_text(stmt, 1, title.c_str(), -1, SQLITE_TRANSIENT);
    sqlite3_bind_text(stmt, 2, date.c_str(), -1, SQLITE_TRANSIENT);
    sqlite3_bind_text(stmt, 3, category.c_str(), -1, SQLITE_TRANSIENT);

    int result = -1;
    if (sqlite3_step(stmt) == SQLITE_DONE) {
        result = sqlite3_last_insert_rowid(db);
    }

    sqlite3_finalize(stmt);
    return result;
}

bool Database::updateAnniversary(int id, const std::string& title, const std::string& date) {
    if (!db) return false;

    sqlite3_stmt* stmt;
    const char* sql = "UPDATE anniversaries SET title = ?, date = ? WHERE id = ?";

    if (sqlite3_prepare_v2(db, sql, -1, &stmt, nullptr) != SQLITE_OK) {
        return false;
    }

    sqlite3_bind_text(stmt, 1, title.c_str(), -1, SQLITE_TRANSIENT);
    sqlite3_bind_text(stmt, 2, date.c_str(), -1, SQLITE_TRANSIENT);
    sqlite3_bind_int(stmt, 3, id);

    bool result = false;
    if (sqlite3_step(stmt) == SQLITE_DONE) {
        result = sqlite3_changes(db) > 0;
    }

    sqlite3_finalize(stmt);
    return result;
}

bool Database::deleteAnniversary(int id) {
    if (!db) return false;

    sqlite3_stmt* stmt;
    const char* sql = "DELETE FROM anniversaries WHERE id = ?";

    if (sqlite3_prepare_v2(db, sql, -1, &stmt, nullptr) != SQLITE_OK) {
        return false;
    }

    sqlite3_bind_int(stmt, 1, id);

    bool result = false;
    if (sqlite3_step(stmt) == SQLITE_DONE) {
        result = sqlite3_changes(db) > 0;
    }

    sqlite3_finalize(stmt);
    return result;
}

int Database::addDiary(const std::string& title, const std::string& content, int mood) {
    if (!db) return -1;

    sqlite3_stmt* stmt;
    const char* sql = "INSERT INTO diaries (title, content, mood) VALUES (?, ?, ?)";

    if (sqlite3_prepare_v2(db, sql, -1, &stmt, nullptr) != SQLITE_OK) {
        return -1;
    }

    sqlite3_bind_text(stmt, 1, title.c_str(), -1, SQLITE_TRANSIENT);
    sqlite3_bind_text(stmt, 2, content.c_str(), -1, SQLITE_TRANSIENT);
    sqlite3_bind_int(stmt, 3, mood);

    int result = -1;
    if (sqlite3_step(stmt) == SQLITE_DONE) {
        result = sqlite3_last_insert_rowid(db);
    }

    sqlite3_finalize(stmt);
    return result;
}

bool Database::updateDiary(int id, const std::string& title, const std::string& content, int mood) {
    if (!db) return false;

    sqlite3_stmt* stmt;
    const char* sql = "UPDATE diaries SET title = ?, content = ?, mood = ? WHERE id = ?";

    if (sqlite3_prepare_v2(db, sql, -1, &stmt, nullptr) != SQLITE_OK) {
        return false;
    }

    sqlite3_bind_text(stmt, 1, title.c_str(), -1, SQLITE_TRANSIENT);
    sqlite3_bind_text(stmt, 2, content.c_str(), -1, SQLITE_TRANSIENT);
    sqlite3_bind_int(stmt, 3, mood);
    sqlite3_bind_int(stmt, 4, id);

    bool result = false;
    if (sqlite3_step(stmt) == SQLITE_DONE) {
        result = sqlite3_changes(db) > 0;
    }

    sqlite3_finalize(stmt);
    return result;
}

bool Database::deleteDiary(int id) {
    if (!db) return false;

    sqlite3_stmt* stmt;
    const char* sql = "DELETE FROM diaries WHERE id = ?";

    if (sqlite3_prepare_v2(db, sql, -1, &stmt, nullptr) != SQLITE_OK) {
        return false;
    }

    sqlite3_bind_int(stmt, 1, id);

    bool result = false;
    if (sqlite3_step(stmt) == SQLITE_DONE) {
        result = sqlite3_changes(db) > 0;
    }

    sqlite3_finalize(stmt);
    return result;
}

std::vector<std::map<std::string, std::string>> Database::getDiaries() {
    std::vector<std::map<std::string, std::string>> diaries;
    if (!db) return diaries;

    sqlite3_stmt* stmt;
    const char* sql = "SELECT id, title, content, mood, created_at FROM diaries ORDER BY created_at DESC";

    if (sqlite3_prepare_v2(db, sql, -1, &stmt, nullptr) != SQLITE_OK) {
        return diaries;
    }

    while (sqlite3_step(stmt) == SQLITE_ROW) {
        std::map<std::string, std::string> diary;
        
        // 获取各字段值
        diary["id"] = std::to_string(sqlite3_column_int(stmt, 0));
        
        const char* title = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 1));
        diary["title"] = title ? title : "无标题";
        
        const char* content = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 2));
        diary["content"] = content ? content : "";
        
        diary["mood"] = std::to_string(sqlite3_column_int(stmt, 3));
        
        const char* createdAt = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 4));
        diary["createdAt"] = createdAt ? createdAt : "";
        
        diaries.push_back(diary);
    }

    sqlite3_finalize(stmt);
    return diaries;
}

std::vector<std::map<std::string, std::string>> Database::getAnniversaries() {
    std::vector<std::map<std::string, std::string>> anniversaries;
    if (!db) return anniversaries;

    sqlite3_stmt* stmt;
    const char* sql = "SELECT id, title, date, category, created_at FROM anniversaries ORDER BY date ASC";

    if (sqlite3_prepare_v2(db, sql, -1, &stmt, nullptr) != SQLITE_OK) {
        return anniversaries;
    }

    while (sqlite3_step(stmt) == SQLITE_ROW) {
        std::map<std::string, std::string> anniversary;
        
        anniversary["id"] = std::to_string(sqlite3_column_int(stmt, 0));
        
        const char* title = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 1));
        anniversary["title"] = title ? title : "";
        
        const char* date = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 2));
        anniversary["date"] = date ? date : "";
        
        const char* category = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 3));
        anniversary["category"] = category ? category : "自定义";
        
        const char* createdAt = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 4));
        anniversary["createdAt"] = createdAt ? createdAt : "";
        
        anniversaries.push_back(anniversary);
    }

    sqlite3_finalize(stmt);
    return anniversaries;
}

std::vector<std::map<std::string, std::string>> Database::getAllPhotos() {
    std::vector<std::map<std::string, std::string>> photos;
    if (!db) return photos;

    sqlite3_stmt* stmt;
    const char* sql = "SELECT id, file_path, description, category, upload_date FROM photos ORDER BY upload_date DESC";

    if (sqlite3_prepare_v2(db, sql, -1, &stmt, nullptr) != SQLITE_OK) {
        return photos;
    }

    while (sqlite3_step(stmt) == SQLITE_ROW) {
        std::map<std::string, std::string> photo;
        
        photo["id"] = std::to_string(sqlite3_column_int(stmt, 0));
        
        const char* filePath = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 1));
        photo["url"] = filePath ? filePath : "";
        
        const char* description = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 2));
        photo["name"] = description ? description : "";
        
        const char* category = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 3));
        photo["category"] = category ? category : "其他";
        
        const char* uploadDate = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 4));
        photo["uploadDate"] = uploadDate ? uploadDate : "";
        
        photos.push_back(photo);
    }

    sqlite3_finalize(stmt);
    return photos;
}

std::map<std::string, int> Database::getStats() {
    std::map<std::string, int> stats;
    if (!db) return stats;

    // 获取各表的记录数量
    std::vector<std::string> tables = {"photos", "anniversaries", "diaries"};
    
    for (const auto& table : tables) {
        sqlite3_stmt* stmt;
        std::string sql = "SELECT COUNT(*) FROM " + table;
        
        if (sqlite3_prepare_v2(db, sql.c_str(), -1, &stmt, nullptr) != SQLITE_OK) {
            continue;
        }
        
        if (sqlite3_step(stmt) == SQLITE_ROW) {
            stats[table] = sqlite3_column_int(stmt, 0);
        }
        
        sqlite3_finalize(stmt);
    }
    
    return stats;
}