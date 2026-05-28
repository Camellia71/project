# 短信服务平台 - 完整技术文档

## 目录

1. [项目概述](#1-项目概述)
2. [技术架构](#2-技术架构)
3. [安装与配置](#3-安装与配置)
4. [项目结构](#4-项目结构)
5. [核心功能实现](#5-核心功能实现)
6. [API 接口文档](#6-api-接口文档)
7. [组件开发指南](#7-组件开发指南)
8. [Redux 状态管理](#8-redux-状态管理)
9. [开发指南](#9-开发指南)
10. [测试](#10-测试)
11. [部署](#11-部署)
12. [性能优化](#12-性能优化)
13. [安全](#13-安全)
14. [后续规划](#14-后续规划)

---

## 1. 项目概述

### 1.1 项目简介

短信服务平台是一个企业级的短信服务管理应用，提供短信发送、模板管理、历史记录查询等功能。系统采用前后端分离架构，前端使用 Next.js + React，后端使用 Node.js + Express。

### 1.2 核心功能

- ✅ 短信发送功能
- ✅ 发送模板管理
- ✅ 发送历史记录
- ✅ 用户认证（待完善）
- ✅ 响应式界面
- ✅ RESTful API

### 1.3 目标用户

- 企业营销团队
- 客服部门
- 系统管理员

---

## 2. 技术架构

### 2.1 技术栈总览

| 层级 | 技术选型 | 版本 | 说明 |
|------|---------|------|------|
| 前端框架 | Next.js | 16.2.6 | React 全栈框架 |
| UI 库 | React | 19.2.4 | UI 组件库 |
| 语言 | TypeScript | 5.x | 类型安全 |
| 状态管理 | Redux Toolkit | 2.12.0 | 全局状态管理 |
| UI 框架 | Bootstrap | 5.3.8 | 响应式 UI |
| 后端框架 | Express | 4.18.2 | Node.js Web 框架 |
| 运行时 | Node.js | 18+ | JavaScript 运行时 |
| 包管理 | npm | 9.x | 依赖管理 |

### 2.2 架构图

```
┌─────────────────────────────────────────┐
│           前端 (Next.js)                │
│  ┌─────────────────────────────────┐   │
│  │     React Components            │   │
│  │  - SendSMSForm                 │   │
│  │  - SMSHistory                  │   │
│  └─────────────────────────────────┘   │
│  ┌─────────────────────────────────┐   │
│  │     Redux Store                 │   │
│  │  - auth: 用户认证状态           │   │
│  │  - sms: 短信状态                │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
                  │
                  │ HTTP API
                  ▼
┌─────────────────────────────────────────┐
│           后端 (Express)                │
│  ┌─────────────────────────────────┐   │
│  │     API Routes                  │   │
│  │  - /api/auth                   │   │
│  │  - /api/sms                    │   │
│  └─────────────────────────────────┘   │
│  ┌─────────────────────────────────┐   │
│  │     Controllers                 │   │
│  │  - authController              │   │
│  │  - smsController               │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### 2.3 数据流

```
用户操作 → React组件 → dispatch(action) → Redux Store → 触发API请求 
                                                            ↓
UI 更新 ← React组件 ← dispatch(action) ← Redux Store ← API响应
```

---

## 3. 安装与配置

### 3.1 环境要求

- Node.js >= 18.x
- npm >= 9.x
- Git

### 3.2 安装步骤

#### 步骤 1：克隆项目

```bash
git clone <repository-url>
cd my-nextjs-site
```

#### 步骤 2：安装前端依赖

```bash
npm install
```

#### 步骤 3：安装后端依赖

```bash
cd server
npm install
cd ..
```

#### 步骤 4：配置环境变量

创建 `.env.local` 文件：

```env
# 前端环境变量
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# 后端环境变量
PORT=3001
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### 3.3 启动开发服务器

```bash
# 同时启动前后端（推荐）
npm run dev

# 或分别启动
npm run dev:next      # 前端： http://localhost:3000
npm run dev:server    # 后端： http://localhost:3001
```

---

## 4. 项目结构

### 4.1 目录结构

```
my-nextjs-site/
├── src/                              # 前端源码
│   ├── app/                         # Next.js App Router
│   │   ├── page.tsx                # 首页
│   │   ├── layout.tsx              # 根布局
│   │   └── globals.scss            # 全局样式
│   ├── components/                  # React 组件
│   │   ├── layout/                 # 布局组件
│   │   │   ├── ClientLayout.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── MainLayout.tsx
│   │   │   └── Sidebar.tsx
│   │   └── sms/                   # 短信组件
│   │       ├── SendSMSForm.tsx
│   │       └── SMSHistory.tsx
│   ├── store/                      # Redux Store
│   │   ├── index.ts               # Store 配置
│   │   └── slices/                # Redux Slices
│   │       ├── authSlice.ts
│   │       └── smsSlice.ts
│   └── types/                      # 类型定义
├── server/                         # Express 后端
│   ├── index.ts                   # 服务入口
│   ├── routes/                    # API 路由
│   │   ├── auth.ts
│   │   └── sms.ts
│   └── controllers/               # 业务逻辑
│       ├── authController.ts
│       └── smsController.ts
├── docs/                          # 文档
│   ├── API.md                    # API 接口文档
│   ├── COMPONENTS.md            # 组件文档
│   └── DEPLOYMENT.md            # 部署文档
├── package.json                  # 前端依赖
├── tsconfig.json                # TypeScript 配置
├── README.md                    # 项目说明
├── TECHNICAL_DOCUMENTATION.md   # 本文档
├── QUICKSTART.md                # 快速开始
└── CHANGELOG.md                 # 更新日志
```

### 4.2 核心文件说明

| 文件路径 | 说明 | 重要程度 |
|---------|------|---------|
| src/store/index.ts | Redux Store 配置 | ⭐⭐⭐ |
| src/store/slices/smsSlice.ts | 短信状态管理 | ⭐⭐⭐ |
| src/components/sms/SendSMSForm.tsx | 发送表单 | ⭐⭐⭐ |
| src/components/sms/SMSHistory.tsx | 历史记录 | ⭐⭐⭐ |
| server/index.ts | 后端服务入口 | ⭐⭐⭐ |
| server/controllers/smsController.ts | 短信控制器 | ⭐⭐⭐ |

---

## 5. 核心功能实现

### 5.1 短信发送

#### 前端实现

**组件**: `SendSMSForm.tsx`

- 使用 React hooks 管理表单状态
- 调用 Redux action 发送请求
- 显示加载状态和错误信息
- 支持模板快速填充

#### 后端实现

**控制器**: `smsController.ts`

```typescript
export const sendSMS = (req: Request, res: Response) => {
  const { phone, message } = req.body;
  
  // 创建新记录
  const newSMS = {
    id: Date.now().toString(),
    phone,
    message,
    status: 'sent',
    createdAt: new Date().toISOString(),
  };
  
  // 添加到历史记录
  mockHistory.unshift(newSMS);
  
  res.json(newSMS);
};
```

### 5.2 历史记录

#### 前端实现

**组件**: `SMSHistory.tsx`

- 页面加载时自动获取历史
- 刷新按钮手动更新
- 表格展示，支持时间格式化

#### 后端实现

```typescript
export const getSMSHistory = (req: Request, res: Response) => {
  res.json(mockHistory);
};
```

### 5.3 模板管理

#### 预定义模板

```typescript
const mockTemplates = [
  { id: '1', name: '验证码', content: '您的验证码是：{code}，请在5分钟内使用。', category: '验证码' },
  { id: '2', name: '营销', content: '尊敬的客户，感谢您的支持！', category: '营销' },
];
```

---

## 6. API 接口文档

### 6.1 认证接口

#### 用户登录
- **端点**: `POST /api/auth/login`
- **请求**: `{ email, password }`
- **响应**: `{ user, token }`

#### 用户注册
- **端点**: `POST /api/auth/register`
- **请求**: `{ email, password, name }`
- **响应**: `{ message }`

### 6.2 短信接口

#### 发送短信
- **端点**: `POST /api/sms/send`
- **请求**: `{ phone, message }`
- **响应**: `{ id, phone, message, status, createdAt }`

#### 获取历史
- **端点**: `GET /api/sms/history`
- **响应**: `[{ id, phone, message, status, createdAt }]`

#### 获取模板
- **端点**: `GET /api/sms/templates`
- **响应**: `[{ id, name, content, category }]`

详细接口文档请查看 [docs/API.md](docs/API.md)

---

## 7. 组件开发指南

### 7.1 组件规范

1. **文件命名**: PascalCase (如: `SendSMSForm.tsx`)
2. **组件命名**: PascalCase (如: `SendSMSForm`)
3. **客户端组件**: 添加 `'use client'` 指令
4. **TypeScript**: 必须定义 Props 接口

### 7.2 创建新组件

```typescript
// src/components/example/ExampleComponent.tsx
'use client';

import { useState } from 'react';

interface ExampleProps {
  title: string;
  onSubmit?: (data: any) => void;
}

export default function ExampleComponent({ title, onSubmit }: ExampleProps) {
  const [data, setData] = useState('');

  return (
    <div className="card p-4">
      <h3>{title}</h3>
      <input 
        className="form-control"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <button 
        className="btn btn-primary mt-3"
        onClick={() => onSubmit?.(data)}
      >
        提交
      </button>
    </div>
  );
}
```

详细组件文档请查看 [docs/COMPONENTS.md](docs/COMPONENTS.md)

---

## 8. Redux 状态管理

### 8.1 Store 配置

**文件**: `src/store/index.ts`

```typescript
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import smsReducer from './slices/smsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sms: smsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 8.2 SMS Slice

**文件**: `src/store/slices/smsSlice.ts`

```typescript
export const sendSMS = createAsyncThunk(
  'sms/send',
  async (data: { phone: string; message: string }) => {
    const response = await axios.post('/api/sms/send', data);
    return response.data;
  }
);

export const getSMSHistory = createAsyncThunk(
  'sms/history',
  async () => {
    const response = await axios.get('/api/sms/history');
    return response.data;
  }
);

export const getTemplates = createAsyncThunk(
  'sms/templates',
  async () => {
    const response = await axios.get('/api/sms/templates');
    return response.data;
  }
);
```

### 8.3 使用 Hooks

```typescript
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';

function MyComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const { history, loading } = useSelector((state: RootState) => state.sms);
  
  const handleSend = () => {
    dispatch(sendSMS({ phone: '13800138000', message: '测试' }));
  };
  
  return (
    <div>
      {loading && <div>加载中...</div>}
      {history.map(item => (
        <div key={item.id}>{item.message}</div>
      ))}
    </div>
  );
}
```

---

## 9. 开发指南

### 9.1 添加新功能

#### 1. 前端新组件

1. 在 `src/components/` 创建组件文件
2. 定义 Props 接口
3. 实现组件逻辑
4. 在页面中使用

#### 2. 后端新接口

1. 在 `server/controllers/` 创建控制器
2. 在 `server/routes/` 创建路由
3. 在 `server/index.ts` 注册路由
4. 添加对应的 Redux action

### 9.2 代码规范

- ✅ 使用 TypeScript 类型
- ✅ 组件使用 `'use client'` (如需要)
- ✅ Redux actions 使用 `createAsyncThunk`
- ✅ 使用 Bootstrap 类名进行样式设计
- ❌ 避免使用 `any` 类型
- ❌ 避免内联样式

### 9.3 Git 工作流

```bash
# 创建功能分支
git checkout -b feature/new-feature

# 提交代码
git add .
git commit -m "feat: 添加新功能"

# 推送到远程
git push origin feature/new-feature

# 创建 Pull Request
```

---

## 10. 测试

### 10.1 手动测试

#### 前端测试

1. 启动开发服务器
2. 访问 http://localhost:3000
3. 测试发送短信功能
4. 测试历史记录刷新

#### 后端测试

1. 启动后端服务
2. 访问 http://localhost:3001/api/health
3. 使用 Postman 测试 API

### 10.2 API 测试

```bash
# 发送短信
curl -X POST http://localhost:3001/api/sms/send \
  -H "Content-Type: application/json" \
  -d '{"phone": "13800138000", "message": "测试"}'

# 获取历史
curl http://localhost:3001/api/sms/history

# 健康检查
curl http://localhost:3001/api/health
```

---

## 11. 部署

### 11.1 生产环境部署

#### 前端部署

```bash
# 构建
npm run build

# 启动
npm start
```

#### 后端部署

```bash
cd server
npm run build
pm2 start dist/index.js --name sms-api
```

详细部署文档请查看 [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

### 11.2 环境要求

- Node.js >= 18.x
- 2GB RAM
- 10GB 磁盘空间

---

## 12. 性能优化

### 12.1 前端优化

- 使用 `React.memo` 优化组件渲染
- 使用 `useMemo` 和 `useCallback` 缓存计算结果
- 图片使用 Next.js Image 组件优化
- 启用 SSR 和 SSG

### 12.2 后端优化

- 启用 Gzip 压缩
- 使用 Redis 缓存热点数据
- 添加数据库索引
- 使用 PM2 集群模式

### 12.3 数据库优化

- 创建合适的索引
- 分页查询避免全表扫描
- 定期清理历史数据

---

## 13. 安全

### 13.1 认证与授权

- 使用 JWT Token
- 密码加密存储 (bcryptjs)
- 敏感接口添加权限验证

### 13.2 输入验证

- 手机号格式验证
- 短信内容长度限制
- SQL 注入防护
- XSS 防护

### 13.3 API 安全

- CORS 配置
- 请求频率限制
- HTTPS 强制使用
- 错误信息脱敏

---

## 14. 后续规划

### 14.1 短期计划

- [ ] 完善用户认证系统
- [ ] 集成真实短信服务商 (阿里云/腾讯云)
- [ ] 添加数据库支持
- [ ] 实现批量发送

### 14.2 中期计划

- [ ] 定时发送功能
- [ ] 数据统计报表
- [ ] 用户权限管理
- [ ] 消息队列集成

### 14.3 长期计划

- [ ] 多租户支持
- [ ] 微服务架构
- [ ] 移动端应用
- [ ] 国际化和多语言

---

## 附录

### A. 相关资源

- [Next.js 文档](https://nextjs.org/docs)
- [React 文档](https://react.dev)
- [Redux 文档](https://redux.js.org)
- [TypeScript 文档](https://www.typescriptlang.org/docs)
- [Express 文档](https://expressjs.com)

### B. 联系方式

如有问题，请提交 Issue 或联系开发团队。

### C. 许可证

MIT License

---

**文档版本**: 1.0.0  
**最后更新**: 2024-01-01  
**维护者**: 开发团队
