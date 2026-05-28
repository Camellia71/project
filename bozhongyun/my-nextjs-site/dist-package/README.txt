# 短信服务平台

## 环境要求

- Node.js 18 或更高版本

## 快速启动

### macOS / Linux
```bash
chmod +x start.sh
./start.sh
```

### Windows
直接双击 `start.bat` 运行

## 启动说明

脚本会自动启动两个服务：
- **前端服务**: http://localhost:3000 (Next.js)
- **后端服务**: http://localhost:3001 (Express API)

## 配置

后端配置文件位于 `server/.env`，可以修改以下内容：
- `PORT`: 后端服务端口（默认 3001）
- `JWT_SECRET`: JWT 密钥（生产环境请修改）
- `DATABASE_URL`: 数据库路径

## 停止服务

按 `Ctrl+C` 停止服务（macOS/Linux）
或关闭所有命令行窗口（Windows）
