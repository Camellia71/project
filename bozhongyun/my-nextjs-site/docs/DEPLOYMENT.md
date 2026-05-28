# 部署指南

本文档说明如何在不同环境中部署短信服务平台。

## 环境要求

- Node.js >= 18.x
- npm >= 9.x
- 2GB RAM (最低)
- 10GB 磁盘空间

## 开发环境部署

### 1. 克隆代码

```bash
git clone <repository-url>
cd my-nextjs-site
```

### 2. 安装依赖

```bash
# 安装前端依赖
npm install

# 安装后端依赖
cd server && npm install
cd ..
```

### 3. 配置环境变量

创建 `.env.local` 文件：

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
PORT=3001
JWT_SECRET=your-secret-key-here-change-in-production
```

### 4. 启动开发服务器

```bash
# 方式一：同时启动前后端
npm run dev

# 方式二：分别启动
npm run dev:next      # 前端
npm run dev:server    # 后端
```

访问 http://localhost:3000

## 生产环境部署

### 方案一：使用 Node.js 原生部署

#### 1. 构建前端

```bash
npm run build
```

#### 2. 配置后端

```bash
cd server
npm run build
```

#### 3. 创建生产环境配置

创建 `server/.env.production`:

```env
NODE_ENV=production
PORT=3001
JWT_SECRET=your-production-secret-key
DATABASE_URL=./database.sqlite
```

#### 4. 使用 PM2 部署后端

```bash
# 安装 PM2
npm install -g pm2

# 启动后端服务
cd server
pm2 start dist/index.js --name sms-api

# 保存进程列表
pm2 save

# 设置开机自启
pm2 startup
```

#### 5. 配置 Nginx

```nginx
# /etc/nginx/sites-available/sms-platform

upstream frontend {
    server 127.0.0.1:3000;
}

upstream backend {
    server 127.0.0.1:3001;
}

server {
    listen 80;
    server_name your-domain.com;

    # 前端静态文件
    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # API 代理
    location /api {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 443 ssl;
    server_name your-domain.com;

    # SSL 配置
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # ... 其他配置同上
}
```

#### 6. 重启 Nginx

```bash
sudo nginx -t
sudo systemctl restart nginx
```

### 方案二：使用 Docker 部署

#### 1. 创建 Dockerfile

根目录创建 `Dockerfile`:

```dockerfile
# 前端构建阶段
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 运行阶段
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app ./
RUN npm install -g serve

# 暴露端口
EXPOSE 3000 3001

# 启动命令
CMD ["sh", "-c", "npm run dev"]
```

#### 2. 创建 docker-compose.yml

```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:3001/api
    depends_on:
      - backend
    command: npm run dev:next

  backend:
    build: ./server
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - PORT=3001
      - JWT_SECRET=your-secret-key
    volumes:
      - ./server:/app
      - /app/node_modules

networks:
  default:
    name: sms-network
```

#### 3. 构建和启动

```bash
# 构建镜像
docker-compose build

# 启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f
```

### 方案三：部署到 Vercel

#### 1. 安装 Vercel CLI

```bash
npm i -g vercel
```

#### 2. 部署前端

```bash
vercel
```

#### 3. 单独部署后端

```bash
cd server
vercel
```

## 数据库配置

### SQLite (开发环境)

默认使用 SQLite，数据存储在 `server/database.sqlite`

### PostgreSQL (生产环境)

1. 安装 PostgreSQL
2. 创建数据库

```sql
CREATE DATABASE sms_platform;
CREATE USER sms_user WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE sms_platform TO sms_user;
```

3. 更新环境变量

```env
DATABASE_URL=postgresql://sms_user:your_password@localhost:5432/sms_platform
```

## 环境变量说明

### 前端环境变量

| 变量名 | 说明 | 示例 |
|--------|------|------|
| NEXT_PUBLIC_API_URL | API 基础 URL | http://localhost:3001/api |

### 后端环境变量

| 变量名 | 说明 | 示例 |
|--------|------|------|
| PORT | 服务器端口 | 3001 |
| NODE_ENV | 运行环境 | production |
| JWT_SECRET | JWT 密钥 | your-secret-key |
| DATABASE_URL | 数据库连接 | ./database.sqlite |

## SSL 证书配置

### 使用 Let's Encrypt

```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d your-domain.com

# 自动续期
sudo certbot renew --dry-run
```

## 性能优化

### 1. 启用 Gzip 压缩

在 Nginx 配置中添加：

```nginx
gzip on;
gzip_types text/plain application/json application/javascript text/css;
gzip_min_length 1000;
```

### 2. 配置缓存

```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 30d;
    add_header Cache-Control "public, immutable";
}
```

### 3. PM2 集群模式

```bash
# 使用负载均衡启动多个实例
pm2 start dist/index.js -i max --name sms-api
```

## 监控和日志

### PM2 监控

```bash
# 查看进程状态
pm2 status

# 查看日志
pm2 logs sms-api

# 监控资源使用
pm2 monit
```

### 日志管理

推荐使用 ELK Stack 或云服务日志管理

## 安全建议

1. **使用 HTTPS**: 生产环境必须启用
2. **环境变量**: 不要提交敏感信息到 Git
3. **JWT 密钥**: 使用强密钥并定期更换
4. **数据库**: 使用强密码，限制访问权限
5. **CORS**: 生产环境配置具体的域名白名单
6. **限流**: API 添加请求频率限制

## 备份策略

### 数据库备份

```bash
# SQLite 备份
cp server/database.sqlite server/backup_$(date +%Y%m%d).sqlite

# PostgreSQL 备份
pg_dump -U sms_user -d sms_platform > backup_$(date +%Y%m%d).sql
```

### 自动化备份

使用 cron job 每日备份：

```bash
# 编辑 crontab
crontab -e

# 添加定时任务（每天凌晨2点备份）
0 2 * * * /path/to/backup.sh
```

## 故障排查

### 常见问题

1. **端口被占用**: 
   ```bash
   lsof -i :3000
   kill -9 <PID>
   ```

2. **内存不足**:
   ```bash
   # 检查内存
   free -h
   
   # 增加 swap
   sudo fallocate -l 2G /swapfile
   ```

3. **权限问题**:
   ```bash
   # 修复权限
   sudo chown -R $USER:$USER /path/to/project
   ```

### 日志查看

```bash
# Nginx 日志
sudo tail -f /var/log/nginx/error.log

# PM2 日志
pm2 logs --lines 100

# 系统日志
journalctl -xe
```

## 扩展阅读

- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [PM2 使用指南](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Nginx 配置指南](https://nginx.org/en/docs/)
