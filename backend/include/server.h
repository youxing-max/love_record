#ifndef SERVER_H
#define SERVER_H

#include <string>
#include <functional>
#include <memory>
#include <map>

class Server {
public:
    Server();
    ~Server();

    bool initialize(int port, const std::string& dbPath);
    void start();
    void stop();
    bool isRunning() const;

private:
    class ServerImpl;
    std::unique_ptr<ServerImpl> pImpl;

    // 路由处理
    void setupRoutes();

    // API处理函数
    void handleLogin(const std::string& body, std::string& response);
    void handlePhotoUpload(const std::string& body, std::string& response);
    void handlePhotoDelete(const std::string& body, std::string& response);
    void handlePhotoList(const std::string& body, std::string& response);
    void handleAnniversaryAdd(const std::string& body, std::string& response);
    void handleAnniversaryList(const std::string& body, std::string& response);
    void handleDiaryAdd(const std::string& body, std::string& response);
    void handleDiaryList(const std::string& body, std::string& response);
    void handleStats(const std::string& body, std::string& response);

    // API处理函数
    std::string handleLoginRequest(const std::string& body);
    std::string handleLoveDaysRequest();
    std::string handleGetPhotosRequest();
    std::string handlePostPhotosRequest(const std::string& body);
    std::string handlePhotoUploadRequest(const std::string& body, const std::string& filePath);
    std::string handleGetAnniversariesRequest();
    std::string handlePostAnniversariesRequest(const std::string& body);
    std::string handleDeleteAnniversariesRequest(const std::string& body);
    std::string handleGetDiariesRequest();
    std::string handlePostDiariesRequest(const std::string& body);
    std::string handleDeleteDiariesRequest(const std::string& body);
    std::string handleGetWishesRequest();
    std::string handlePostWishesRequest(const std::string& body);
    
    // 数据持久化相关函数
    void initializeAnniversaryStorage();
    void loadAnniversariesFromFile();
    void safeLoadAnniversariesFromFile();
    void saveAnniversariesToFile();
    void safeLoadActivitiesFromFile();
    void saveActivitiesToFile();
    void safeLoadWishesFromFile();
    void saveWishesToFile();
    void safeLoadDiariesFromFile();
    void saveDiariesToFile();
    std::string handleDeleteWishesRequest(const std::string& body);
    std::string handleCompleteWishRequest(const std::string& body);
    std::string handleGetStatsRequest();
    std::string handleGetActivitiesRequest();
    std::string handlePostActivitiesRequest(const std::string& body);
    std::string handleDeletePhotosRequest(const std::string& body);
    
    // 静态文件服务
    std::string serveStaticFile(const std::string& filePath);
    
    // 辅助函数
    bool endsWith(const std::string& str, const std::string& suffix);
    std::string getMimeType(const std::string& filePath);
    std::map<std::string, std::string> parseHttpRequest(const std::string& request);
    std::string handleGetRequest(const std::string& path);
    std::string handlePostRequest(const std::string& path, const std::string& body);
    std::string handleOptionsRequest(const std::string& path);
    void runSimpleServer();
    std::string getCurrentTime();
};

#endif // SERVER_H
