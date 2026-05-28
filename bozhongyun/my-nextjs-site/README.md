# 短信服务平台

企业级短信服务管理平台，提供短信发送、模板管理、历史记录查询等功能。采用前后端分离架构，前端使用 Next.js + React，后端使用 Node.js + Express + SQLite。

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Next.js | 16.2.6 | React 框架，支持 SSR/SSG |
| React | 19.2.4 | UI 库 |
| TypeScript | 5.x | 类型安全 |
| Redux Toolkit | 2.12.0 | 状态管理 |
| Bootstrap | 5.3.8 | UI 框架 |
| Express | 4.18.2 | 后端框架 |
| SQLite | 3.x | 数据库 |
| JWT | - | 身份认证 |
| bcryptjs | - | 密码加密 |

## 功能特性

- ✅ 短信发送（手机号验证、字符计数）
- ✅ 发送历史记录（实时更新、分页）
- ✅ 短信模板管理（3个默认模板）
- ✅ 用户认证（JWT Token）
- ✅ 响应式设计（移动端适配）
- ✅ Redux 状态管理
- ✅ RESTful API
- ✅ TypeScript 类型安全
- ✅ 自定义动画效果
- ✅ SQLite 数据库持久化

## 快速开始

### 环境要求

- Node.js >= 18.x
- npm >= 9.x

### 安装依赖

```bash
# 安装前端依赖
npm install

# 安装后端依赖
cd server && npm install
cd ..
```

### 配置环境变量

创建 `.env.local` 文件：

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
PORT=3001
JWT_SECRET=your-secret-key-here-change-in-production
```

### 启动开发服务器

```bash
# 同时启动前后端（推荐）
npm run dev

# 或分别启动
npm run dev:next      # 前端 (http://localhost:3000)
npm run dev:server    # 后端 (http://localhost:3001)
```

## 项目结构

```
my-nextjs-site/
├── src/                              # 前端源码
│   ├── app/                         # Next.js App Router
│   │   ├── page.tsx                # 首页（包含 Hero、功能卡片、统计数据）
│   │   ├── layout.tsx              # 根布局
│   │   └── globals.scss            # 全局样式（自定义动画、主题）
│   ├── components/                  # React 组件
│   │   ├── layout/                 # 布局组件
│   │   │   ├── Header.tsx
│   │   │   ├── MainLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── ClientLayout.tsx    # Redux Provider
│   │   └── sms/                   # 短信组件
│   │       ├── SendSMSForm.tsx    # 发送表单（增强UI）
│   │       └── SMSHistory.tsx     # 历史记录（分页、状态图标）
│   ├── store/                     # Redux Store
│   │   ├── index.ts               # Store 配置
│   │   └── slices/
│   │       ├── authSlice.ts       # 认证状态
│   │       └── smsSlice.ts       # 短信状态
│   └── lib/                      # 工具库
│       └── axios.ts              # Axios 实例配置
├── server/                       # Express 后端
│   ├── index.ts                  # 服务入口
│   ├── db/
│   │   └── index.ts              # SQLite 数据库（用户、短信历史、模板）
│   ├── routes/
│   │   ├── auth.ts               # 认证路由
│   │   └── sms.ts               # 短信路由
│   ├── controllers/
│   │   ├── authController.ts     # 认证控制器（登录、注册）
│   │   └── smsController.ts     # 短信控制器（发送、历史、模板）
│   └── middleware/
│       └── auth.ts               # JWT 认证中间件
├── docs/                        # 详细文档
│   ├── API.md                  # API 接口文档
│   ├── COMPONENTS.md           # 组件使用文档
│   └── DEPLOYMENT.md          # 部署指南
├── package.json               # 前端依赖
└── tsconfig.json            # TypeScript 配置
```

## 核心功能模块

### 1. 用户认证系统

- **JWT Token 认证**：安全的用户身份验证
- **密码加密**：bcryptjs 密码哈希
- **登录/注册**：完整的用户管理流程

### 2. 短信发送 (SendSMSForm)

功能特性：
- 手机号输入验证（中国大陆手机号格式）
- 字符实时计数
- 模板快速选择（3个默认模板）
- 发送成功/失败提示
- 加载状态显示

```typescript
import SendSMSForm from '@/components/sms/SendSMSForm';

<SendSMSForm />
```

### 3. 发送历史 (SMSHistory)

功能特性：
- 自动加载历史记录
- 手动刷新功能
- 状态图标展示（已发送/失败/待发送）
- 时间格式化
- 响应式表格
- 分页显示

```typescript
import SMSHistory from '@/components/sms/SMSHistory';

<SMSHistory />
```

### 4. Redux Store

状态管理，包含认证和短信两个模块：

```typescript
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';

// 使用 dispatch
const dispatch = useDispatch<AppDispatch>();

// 选择 state
const { history, loading } = useSelector((state: RootState) => state.sms);
```

### 5. 数据库 (SQLite)

包含三张表：
- `users`：用户表（id, email, password, name, created_at）
- `sms_history`：短信历史表（id, user_id, phone, message, status, created_at）
- `sms_templates`：短信模板表（id, user_id, name, content, category, created_at）

默认插入3个模板：验证码、营销、通知

## 后端 API

### 认证接口

- `POST /api/auth/login` - 用户登录
- `POST /api/auth/register` - 用户注册

### 短信接口

- `POST /api/sms/send` - 发送短信（手机号验证）
- `GET /api/sms/history` - 获取历史
- `GET /api/sms/templates` - 获取模板

### 健康检查

- `GET /api/health` - 服务健康检查

详细接口文档请查看 [docs/API.md](docs/API.md)

## 页面结构

首页包含以下部分：

1. **Hero 区域**：主横幅 + CTA 按钮
2. **统计数据**：4个关键指标展示
3. **功能特性**：6个核心优势卡片
4. **特色展示**：产品特性图文介绍
5. **短信功能**：发送表单 + 历史记录
6. **合作伙伴**：信任背书展示

## 自定义样式

项目使用自定义 SCSS 样式，包括：

- **动画效果**：fadeInUp、float、pulse 等
- **渐变背景**：主题色渐变
- **卡片悬停**：阴影和位移效果
- **自定义字体**：Plus Jakarta Sans
- **响应式设计**：支持移动端到超大屏

## 开发指南

### 添加新组件

1. 在 `src/components/` 创建组件文件
2. 使用 TypeScript 定义 Props 接口
3. 添加 `'use client'` 指令（如需要 Redux）
4. 导出为默认导出

### 添加新的 API

1. 在 `server/controllers/` 添加控制器
2. 在 `server/routes/` 添加路由
3. 在 `server/index.ts` 注册路由

### 数据库操作

使用 `server/db/index.ts` 提供的函数：

```typescript
import { createUser, findUserByEmail, createSMSRecord } from '../db';
```

## 环境变量

### 前端环境变量

| 变量名 | 说明 | 示例 |
|--------|------|------|
| NEXT_PUBLIC_API_URL | API 基础 URL | http://localhost:3001 |

### 后端环境变量

| 变量名 | 说明 | 示例 |
|--------|------|------|
| PORT | 服务器端口 | 3001 |
| NODE_ENV | 运行环境 | production |
| JWT_SECRET | JWT 密钥 | your-secret-key |

## 构建部署

```bash
# 构建前端
npm run build

# 启动生产环境
npm start
```

详细部署指南请查看 [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## 代码规范

- ✅ 使用 TypeScript 严格模式
- ✅ 组件使用 `'use client'` 指令（需要 Redux 时）
- ✅ Redux actions 使用 `createAsyncThunk`
- ✅ 使用 Bootstrap 类名 + 自定义 SCSS
- ✅ 遵循 React Hooks 规范
- ❌ 避免使用 `any` 类型
- ❌ 避免内联样式（特殊情况除外）

## 数据库管理

SQLite 数据库文件位于 `server/database.sqlite`

### 手动操作数据库

```bash
# 启动 SQLite
sqlite3 server/database.sqlite

# 查看表
sqlite> .tables

# 查看表结构
sqlite> .schema users

# 查询数据
sqlite> SELECT * FROM sms_history;
```

## 性能优化

- React.memo 优化组件渲染
- useMemo 和 useCallback 缓存计算
- 图片使用 Next.js Image 组件
- 启用 SSR 和 SSG
- Gzip 压缩
- PM2 集群模式

## 安全特性

- JWT Token 认证
- 密码 bcryptjs 加密
- 手机号格式验证
- SQL 注入防护
- CORS 配置
- 错误信息脱敏

## 许可证

MIT License

## 文档

- [技术文档](TECHNICAL_DOCUMENTATION.md) - 完整技术说明
- [快速开始](QUICKSTART.md) - 快速启动指南
- [API 文档](docs/API.md) - 接口详细说明
- [组件文档](docs/COMPONENTS.md) - 组件使用指南
- [部署指南](docs/DEPLOYMENT.md) - 多种部署方案
- [更新日志](CHANGELOG.md) - 版本历史
