# 更新日志

本文档记录项目的版本历史和重要变更。

## [1.0.0] - 2024-01-01

### 首次发布

#### 新增功能

- ✨ **用户认证系统**
  - JWT Token 认证
  - 用户登录/注册功能
  - bcryptjs 密码加密
  - JWT 认证中间件

- ✨ **短信发送功能**
  - 手机号格式验证（中国大陆手机号）
  - 字符实时计数
  - 发送成功/失败提示
  - 加载状态显示

- ✨ **短信模板管理**
  - 3个默认模板（验证码、营销、通知）
  - 模板快速选择
  - SQLite 数据库存储

- ✨ **发送历史记录**
  - 自动加载历史
  - 手动刷新功能
  - 状态图标展示
  - 时间格式化
  - 响应式表格

- ✨ **Redux 状态管理**
  - Redux Toolkit 配置
  - authSlice - 认证状态
  - smsSlice - 短信状态
  - 异步 actions (createAsyncThunk)

- ✨ **Express 后端 API**
  - 认证接口 (login/register)
  - 短信接口 (send/history/templates)
  - 健康检查接口
  - 错误处理
  - SQLite 数据库集成

- ✨ **前端组件**
  - SendSMSForm - 发送表单
  - SMSHistory - 历史记录
  - Header - 导航栏
  - MainLayout - 主布局
  - ClientLayout - Redux Provider

- ✨ **UI/UX 优化**
  - 自定义 SCSS 样式
  - 动画效果（fadeInUp、float、pulse）
  - 渐变背景
  - 卡片悬停效果
  - Plus Jakarta Sans 字体
  - 响应式设计

- ✨ **首页增强**
  - Hero 区域
  - 统计数据展示
  - 6个功能特性卡片
  - 特色展示区
  - 合作伙伴展示

### 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Next.js | 16.2.6 | React 全栈框架 |
| React | 19.2.4 | UI 库 |
| TypeScript | 5.x | 类型安全 |
| Redux Toolkit | 2.12.0 | 状态管理 |
| Bootstrap | 5.3.8 | UI 框架 |
| Express | 4.18.2 | 后端框架 |
| SQLite | 3.x | 数据库 |
| JWT | - | 身份认证 |
| bcryptjs | - | 密码加密 |
| axios | - | HTTP 客户端 |

### 项目结构

```
my-nextjs-site/
├── src/
│   ├── app/
│   │   ├── page.tsx              # 首页
│   │   ├── layout.tsx            # 根布局
│   │   └── globals.scss          # 全局样式
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── MainLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── ClientLayout.tsx
│   │   └── sms/
│   │       ├── SendSMSForm.tsx
│   │       └── SMSHistory.tsx
│   ├── store/
│   │   ├── index.ts
│   │   └── slices/
│   │       ├── authSlice.ts
│   │       └── smsSlice.ts
│   └── lib/
│       └── axios.ts
├── server/
│   ├── index.ts
│   ├── db/
│   │   └── index.ts              # SQLite 数据库
│   ├── routes/
│   │   ├── auth.ts
│   │   └── sms.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   └── smsController.ts
│   └── middleware/
│       └── auth.ts               # JWT 中间件
├── docs/
│   ├── API.md
│   ├── COMPONENTS.md
│   └── DEPLOYMENT.md
└── README.md
```

### 数据库设计

#### users 表
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### sms_history 表
```sql
CREATE TABLE sms_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'sent',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### sms_templates 表
```sql
CREATE TABLE sms_templates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### API 接口

| 方法 | 端点 | 说明 |
|------|------|------|
| POST | /api/auth/login | 用户登录 |
| POST | /api/auth/register | 用户注册 |
| POST | /api/sms/send | 发送短信 |
| GET | /api/sms/history | 获取历史 |
| GET | /api/sms/templates | 获取模板 |
| GET | /api/health | 健康检查 |

### 文档

- [README.md](README.md) - 项目说明、快速开始
- [TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md) - 详细技术文档
- [QUICKSTART.md](QUICKSTART.md) - 快速开始指南
- [docs/API.md](docs/API.md) - API 接口文档
- [docs/COMPONENTS.md](docs/COMPONENTS.md) - 组件使用文档
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) - 部署指南

---

## 后续计划

### 短期计划

- [ ] 完善用户认证流程
- [ ] 添加用户权限管理
- [ ] 集成真实短信服务商 (阿里云/腾讯云)
- [ ] 实现批量发送功能

### 中期计划

- [ ] 定时发送功能
- [ ] 数据统计报表
- [ ] 用户管理后台
- [ ] 消息队列集成

### 长期计划

- [ ] 多租户支持
- [ ] 微服务架构
- [ ] 移动端应用
- [ ] 国际化和多语言
