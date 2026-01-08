# ⚡ 快速开始

> 最简单的方式部署 LOVE_TIME_RECORD

---

## 🚀 一键部署

```bash
# 1. 克隆项目
git clone https://github.com/youxing-max/love_time_record_system.git
cd love_time_record_system

# 2. 运行部署脚本
chmod +x deploy.sh
./deploy.sh
```

**就这么简单！** 脚本会自动完成：安装依赖 → 配置系统 → 编译项目 → 启动服务器

部署完成后，打开浏览器访问：**http://localhost:9998**

---

## 📝 手动部署（可选）

如果您更喜欢手动控制每一步：

```bash
# 1. 配置系统
python3 setup.py

# 2. 编译后端
cd backend
cmake -S . -B build && cmake --build build
cd ..

# 3. 启动服务器
cd backend/build
./lovedb
```

---

## 🔧 启动选项

### 前台运行（默认）

```bash
cd backend/build
./lovedb
```

按 `Ctrl+C` 停止服务器。

---

### 后台运行（推荐生产环境）

**使用 nohup**：

```bash
cd backend/build
nohup ./lovedb > ../../logs/server.log 2>&1 &

# 查看日志
tail -f ../../logs/server.log

# 停止服务器
pkill lovedb
```

**日志位置**：`love_time_record_system/logs/server.log`

---

**使用自定义日志文件**：

```bash
# 指定日志文件名
nohup ./lovedb > ../../logs/server_$(date +%Y%m%d_%H%M%S).log 2>&1 &

# 分离标准输出和错误输出
nohup ./lovedb > ../../logs/output.log 2> ../../logs/error.log &
```

---

### 使用 systemd（开机自启）

**1. 创建服务文件**：

```bash
sudo nano /etc/systemd/system/love_time_record.service
```

**2. 添加以下内容**：

```ini
[Unit]
Description=LOVE_TIME_RECORD Server
After=network.target

[Service]
Type=simple
User=你的用户名
WorkingDirectory=/完整路径/love_time_record_system/backend/build
ExecStart=/完整路径/love_time_record_system/backend/build/lovedb
Restart=on-failure
StandardOutput=append:/完整路径/love_time_record_system/logs/server.log
StandardError=append:/完整路径/love_time_record_system/logs/error.log

[Install]
WantedBy=multi-user.target
```

**3. 启用并启动服务**：

```bash
sudo systemctl daemon-reload
sudo systemctl enable love_time_record
sudo systemctl start love_time_record

# 查看状态
sudo systemctl status love_time_record

# 查看日志
journalctl -u love_time_record -f
```

**日志位置**：
- 服务日志：`love_time_record_system/logs/server.log`
- 错误日志：`love_time_record_system/logs/error.log`
- 系统日志：`journalctl -u love_time_record`

---

## 📊 日志管理

### 创建日志目录

```bash
mkdir -p logs
```

### 查看实时日志

```bash
# 实时查看
tail -f logs/server.log

# 查看最后 100 行
tail -n 100 logs/server.log

# 查看并过滤错误
grep "ERROR\|❌" logs/server.log
```

### 日志轮转（防止日志文件过大）

**创建日志轮转配置**：

```bash
sudo nano /etc/logrotate.d/love_time_record
```

**添加以下内容**：

```
/完整路径/love_time_record_system/logs/*.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    create 0640 你的用户名 你的用户组
}
```

日志会每天轮转，保留 7 天。

---

## 🛠 常用命令

### 检查服务状态

```bash
# 检查进程是否运行
ps aux | grep lovedb

# 检查端口是否监听
lsof -i :9998
# 或
netstat -tlnp | grep 9998
```

---

### 重启服务

```bash
# 如果使用 systemd
sudo systemctl restart love_time_record

# 如果使用 nohup
pkill lovedb
cd backend/build
nohup ./lovedb > ../../logs/server.log 2>&1 &
```

---

### 停止服务

```bash
# 如果使用 systemd
sudo systemctl stop love_time_record

# 如果使用 nohup
pkill lovedb
```

---

## ❓ 常见问题

### 端口被占用？

```bash
# 查找占用进程
lsof -i :9998

# 杀死进程
kill -9 <PID>
```

---

### 无法访问页面？

```bash
# 检查防火墙
sudo ufw allow 9998/tcp

# 或使用
sudo firewall-cmd --permanent --add-port=9998/tcp
sudo firewall-cmd --reload
```

---

### 配置错误？

```bash
# 重新运行配置
python3 setup.py

# 重新编译
cd backend
rm -rf build
cmake -S . -B build && cmake --build build
```

---

## 📚 更多文档

- [完整文档](README.md) - 详细功能介绍
- [部署指南](DEPLOY_GUIDE.md) - deploy.sh 详细说明
- [问题反馈](https://github.com/youxing-max/love_time_record_system/issues)

---

<div align="center">

**💕 祝您使用愉快！**

[⭐ Star](https://github.com/youxing-max/love_time_record_system) · [🐛 Issues](https://github.com/youxing-max/love_time_record_system/issues)

</div>
