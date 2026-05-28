# 组件文档

本文档说明项目中使用的 React 组件的用法和接口定义。

## 目录

1. [布局组件](#布局组件)
2. [短信组件](#短信组件)
3. [Redux Store](#redux-store)
4. [工具库](#工具库)
5. [创建新组件](#创建新组件)

---

## 布局组件

### 1. ClientLayout

根布局组件，包裹整个应用，提供 Redux Provider。

**文件位置**: `src/components/layout/ClientLayout.tsx`

**功能**:
- 提供 Redux Provider
- 包裹 MainLayout 组件

**使用方式**:

```typescript
// 在 layout.tsx 中自动使用，无需显式调用
```

---

### 2. Header

顶部导航栏组件。

**文件位置**: `src/components/layout/Header.tsx`

**Props 接口**:

```typescript
interface HeaderProps {
  toggleSidebar: () => void;  // 切换侧边栏的回调函数
  sidebarOpen: boolean;        // 侧边栏当前是否打开
}
```

**使用示例**:

```typescript
import Header from '@/components/layout/Header';

<Header 
  toggleSidebar={handleToggleSidebar}
  sidebarOpen={isSidebarOpen}
/>
```

---

### 3. MainLayout

主布局组件，包含 Header、Sidebar 和内容区域。

**文件位置**: `src/components/layout/MainLayout.tsx`

**Props 接口**:

```typescript
interface MainLayoutProps {
  children: React.ReactNode;  // 子组件内容
}
```

**使用示例**:

```typescript
import MainLayout from '@/components/layout/MainLayout';

<MainLayout>
  <YourContent />
</MainLayout>
```

---

## 短信组件

### 1. SendSMSForm

短信发送表单组件，提供完整的短信发送功能界面。

**文件位置**: `src/components/sms/SendSMSForm.tsx`

**功能特性**:

- 📱 手机号输入验证（中国大陆手机号格式：1开头的11位数字）
- 📝 字符实时计数显示
- 📋 模板快速选择（从3个默认模板中选择）
- ✅ 发送成功提示（3秒自动消失）
- ❌ 错误信息显示
- ⏳ 加载状态指示
- 🎨 响应式设计，适配移动端

**使用示例**:

```typescript
import SendSMSForm from '@/components/sms/SendSMSForm';

export default function SMSPage() {
  return (
    <div className="container">
      <SendSMSForm />
    </div>
  );
}
```

**依赖 Redux 状态**:

```typescript
interface SMSState {
  templates: SMSTemplate[];   // 短信模板列表
  loading: boolean;          // 发送状态
  error: string | null;     // 错误信息
}
```

**依赖 Redux Actions**:

- `getTemplates()` - 获取短信模板列表
- `sendSMS({ phone, message })` - 发送短信

**Props**: 无（自动从 Redux 获取数据）

**组件内部状态**:

```typescript
interface SendSMSFormState {
  phone: string;           // 手机号
  message: string;        // 短信内容
  showSuccess: boolean;   // 显示成功提示
}
```

**UI 结构**:

```
┌─────────────────────────────────┐
│ 📤 发送短信                      │
│ 快速发送短信给您的客户              │
├─────────────────────────────────┤
│ 手机号码                         │
│ ┌─────────────────────────────┐ │
│ │ 请输入手机号码                 │ │
│ └─────────────────────────────┘ │
│                                 │
│ 使用模板                         │
│ [验证码] [营销] [通知]           │
│                                 │
│ 短信内容                         │
│ ┌─────────────────────────────┐ │
│ │ 请输入短信内容...              │ │
│ │                             │ │
│ │                             │ │
│ └─────────────────────────────┘ │
│                        0 字符   │
│                                 │
│ ┌─────────────────────────────┐ │
│ │     📤 立即发送              │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

**成功提示**:

- 发送成功后显示绿色提示："短信发送成功！"
- 3秒后自动消失
- 同时清空表单内容

**错误处理**:

- 手机号格式错误：显示红色错误提示
- 网络错误：显示错误信息
- API 返回错误：显示后端错误消息

---

### 2. SMSHistory

短信发送历史记录组件，展示所有发送记录。

**文件位置**: `src/components/sms/SMSHistory.tsx`

**功能特性**:

- 📜 自动加载历史记录（组件挂载时）
- 🔄 手动刷新功能
- 📊 状态图标展示（已发送/失败/待发送）
- 📅 时间格式化显示
- 📱 响应式表格布局
- 🎨 动画效果
- 📈 记录统计

**使用示例**:

```typescript
import SMSHistory from '@/components/sms/SMSHistory';

export default function HistoryPage() {
  return (
    <div className="container">
      <SMSHistory />
    </div>
  );
}
```

**依赖 Redux 状态**:

```typescript
interface SMSState {
  history: SMSHistoryItem[];  // 历史记录列表
  loading: boolean;          // 加载状态
}
```

**依赖 Redux Actions**:

- `getSMSHistory()` - 获取历史记录

**Props**: 无（自动从 Redux 获取数据）

**数据结构**:

```typescript
interface SMSHistoryItem {
  id: number;           // 记录ID
  phone: string;        // 手机号
  message: string;      // 短信内容
  status: 'pending' | 'sent' | 'failed';  // 发送状态
  createdAt: string;    // 创建时间
}
```

**状态配置**:

| 状态 | 图标 | 颜色 | 文字 |
|------|------|------|------|
| sent | FiCheckCircle | text-success | 已发送 |
| failed | FiXCircle | text-danger | 失败 |
| pending | FiClock | text-warning | 待发送 |

**UI 结构**:

```
┌─────────────────────────────────────────┐
│ 📋 发送历史                [🔄 刷新]    │
│ 最近的短信发送记录                         │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ 手机号    │ 内容     │ 状态  │ 时间    │ │
│ ├─────────────────────────────────────┤ │
│ │ 139...   │ 尊敬... │ ✅已发送│ 12:30  │ │
│ │ 138...   │ 您的... │ ✅已发送│ 12:00  │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ 共 2 条记录          最后更新: 12:30    │
└─────────────────────────────────────────┘
```

**空状态**:

当没有历史记录时显示：

```
┌─────────────────────────────────┐
│ 📋                             │
│                                 │
│        暂无发送记录              │
│     发送短信后，记录将显示在这里     │
│                                 │
└─────────────────────────────────┘
```

**加载状态**:

```
┌─────────────────────────────────┐
│        🔄                       │
│       正在加载发送记录...          │
└─────────────────────────────────┘
```

**刷新功能**:

- 点击刷新按钮重新获取历史记录
- 刷新时图标旋转动画
- 自动添加到历史记录列表顶部

---

## Redux Store

### Store 配置

**文件位置**: `src/store/index.ts`

**Store 结构**:

```typescript
interface RootState {
  auth: AuthState;     // 认证状态
  sms: SMSState;      // 短信状态
}
```

**类型导出**:

```typescript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

**配置代码**:

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
```

---

### Auth Slice

用户认证状态管理。

**文件位置**: `src/store/slices/authSlice.ts`

**State 结构**:

```typescript
interface User {
  id: number;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;        // 当前用户
  token: string | null;      // JWT Token
  loading: boolean;          // 加载状态
  error: string | null;      // 错误信息
}
```

**Actions**:

```typescript
// 异步 actions
login(credentials: { email: string; password: string })

// 同步 actions
logout()
```

**使用示例**:

```typescript
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';

function LoginComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = async (email: string, password: string) => {
    await dispatch(login({ email, password }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {user ? (
        <div>欢迎, {user.name}!</div>
      ) : (
        <button onClick={() => handleLogin('test@example.com', 'password')}>
          登录
        </button>
      )}
    </div>
  );
}
```

---

### SMS Slice

短信状态管理。

**文件位置**: `src/store/slices/smsSlice.ts`

**State 结构**:

```typescript
interface SMSHistoryItem {
  id: number;
  phone: string;
  message: string;
  status: 'pending' | 'sent' | 'failed';
  createdAt: string;
}

interface SMSTemplate {
  id: string;
  name: string;
  content: string;
  category: string;
}

interface SMSState {
  history: SMSHistoryItem[];   // 历史记录
  templates: SMSTemplate[];     // 模板列表
  loading: boolean;             // 加载状态
  error: string | null;         // 错误信息
}
```

**Actions**:

```typescript
// 异步 actions
sendSMS(data: { phone: string; message: string })
getSMSHistory()
getTemplates()
```

**使用示例**:

```typescript
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';

function SMSComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const { history, templates, loading, error } = useSelector(
    (state: RootState) => state.sms
  );

  const handleSend = () => {
    dispatch(sendSMS({ phone: '13800138000', message: '测试' }));
  };

  const handleRefresh = () => {
    dispatch(getSMSHistory());
  };

  const handleLoadTemplates = () => {
    dispatch(getTemplates());
  };

  return (
    <div>
      <button onClick={handleSend} disabled={loading}>
        {loading ? '发送中...' : '发送短信'}
      </button>
      <button onClick={handleRefresh}>刷新历史</button>
      <button onClick={handleLoadTemplates}>加载模板</button>
      
      {error && <div className="error">{error}</div>}
      
      <div>
        <h3>历史记录</h3>
        {history.map((item) => (
          <div key={item.id}>
            {item.phone}: {item.message}
          </div>
        ))}
      </div>
      
      <div>
        <h3>模板</h3>
        {templates.map((template) => (
          <button key={template.id}>{template.name}</button>
        ))}
      </div>
    </div>
  );
}
```

---

## 工具库

### Axios 实例

**文件位置**: `src/lib/axios.ts`

配置好的 Axios 实例，用于 API 请求。

**配置**:

```typescript
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

**使用示例**:

```typescript
import axiosInstance from '@/lib/axios';

// GET 请求
const response = await axiosInstance.get('/api/sms/history');

// POST 请求
const response = await axiosInstance.post('/api/sms/send', {
  phone: '13800138000',
  message: '测试',
});
```

---

## 创建新组件

### 组件模板

```typescript
// src/components/example/ExampleComponent.tsx
'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { FiIcon } from 'react-icons/fi';

interface ExampleProps {
  title: string;
  onAction?: () => void;
}

export default function ExampleComponent({ title, onAction }: ExampleProps) {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.someState);

  useEffect(() => {
    // 初始化逻辑
  }, [dispatch]);

  return (
    <div className="card p-4 shadow-sm hover-shadow">
      <div className="d-flex align-items-center mb-4">
        <div className="bg-primary bg-opacity-10 rounded-3 p-2 me-3">
          <FiIcon size={24} className="text-primary" />
        </div>
        <div>
          <h3 className="mb-0 fw-bold">{title}</h3>
          <p className="text-muted small mb-0">描述信息</p>
        </div>
      </div>
      
      <p>Count: {count}</p>
      <button 
        className="btn btn-primary"
        onClick={() => setCount(count + 1)}
      >
        递增
      </button>
    </div>
  );
}
```

### 组件规范

#### 1. 命名规范

- **文件命名**: PascalCase (如: `SendSMSForm.tsx`)
- **组件名**: PascalCase (如: `SendSMSForm`)
- **Props 接口**: `ComponentNameProps` (如: `SendSMSFormProps`)

#### 2. 文件位置

- **页面组件**: `src/app/` 目录
- **布局组件**: `src/components/layout/`
- **业务组件**: `src/components/[module]/` (如: `sms/`, `auth/`)
- **通用组件**: `src/components/common/`

#### 3. 客户端组件

必须添加 `'use client'` 指令的情况：
- ✅ 使用 Redux (useDispatch, useSelector)
- ✅ 使用 React Hooks (useState, useEffect 等)
- ✅ 使用浏览器 API (window, localStorage 等)
- ✅ 使用事件监听器

可选（通常不添加）：
- 纯展示组件
- 只接收 props 的组件

#### 4. TypeScript 类型

```typescript
// ✅ 推荐：定义完整的 Props 接口
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

// ❌ 避免：使用 any
interface ButtonProps {
  label: any;
  onClick: any;
}
```

#### 5. 样式规范

- 优先使用 Bootstrap 类名
- 自定义样式使用 SCSS
- 使用 `hover-shadow` 等自定义类
- 避免内联样式（特殊情况除外）

#### 6. 导入顺序

```typescript
// 1. React 核心
import { useState, useEffect } from 'react';

// 2. 第三方库
import { useDispatch, useSelector } from 'react-redux';

// 3. 项目内部导入
import { AppDispatch, RootState } from '@/store';
import { sendSMS } from '@/store/slices/smsSlice';

// 4. 图标
import { FiSend } from 'react-icons/fi';
```

#### 7. Props 解构

```typescript
// ✅ 推荐：解构 props
export default function Component({ title, onAction }: ComponentProps) {
  return <div>{title}</div>;
}

// ✅ 如果 props 很多，可以单独使用
export default function Component(props: ComponentProps) {
  const { title, onAction, children } = props;
  return <div>{title}</div>;
}
```

---

## 附录：常用图标

项目使用 `react-icons/fi` (Feather Icons)：

| 图标 | 用途 |
|------|------|
| FiSend | 发送 |
| FiList | 列表 |
| FiRefreshCw | 刷新 |
| FiCheckCircle | 成功 |
| FiXCircle | 失败 |
| FiClock | 待处理 |
| FiAlertCircle | 警告 |
| FiZap | 快速 |
| FiGlobe | 全球 |
| FiShield | 安全 |
| FiActivity | 活动 |
| FiMessageSquare | 消息 |
| FiTrendingUp | 趋势 |
