# 前端响应式布局设计文档

## 目录
1. [参考网站布局分析](#参考网站布局分析)
2. [响应式布局架构](#响应式布局架构)
3. [布局组件设计](#布局组件设计)
4. [响应式断点设计](#响应式断点设计)

---

## 参考网站布局分析

### 参考网站信息
- **网址**: https://cn.textboostsms.com
- **分析日期**: 短信服务平台

### 布局结构分析

参考网站采用了典型的企业营销型网站布局，包含以下主要部分：

```
┌─────────────────────────────────────────────────────────────┐
│  Header / Navigation (Logo + Nav Links + CTA Button        │
├─────────────────────────────────────────────────────────────┤
│  Hero Section (Banner + Headline + 主展示区       │
├─────────────────────────────────────────────────────────────┤
│  Features Section (Features + Cards 功能特性区              │
├─────────────────────────────────────────────────────────────┤
│  Solutions Section (Industry Solutions 行业解决方案        │
├─────────────────────────────────────────────────────────────┤
│  Products Section (Product Showcase 产品展示区            │
├─────────────────────────────────────────────────────────────┤
│  Advantages Section (Company Advantages 企业优势        │
├─────────────────────────────────────────────────────────────┤
│  FAQ Section (Frequently Asked Questions 常见问题      │
├─────────────────────────────────────────────────────────────┤
│  Process Section (Use Process 使用流程              │
├─────────────────────────────────────────────────────────────┤
│  CTA Section (Call to Action 行动召唤)            │
├─────────────────────────────────────────────────────────────┤
│  Footer (Links + Contact + Copyright)                    │
└─────────────────────────────────────────────────────────────┘
```

### 设计特点总结

1. **视觉层次清晰，采用渐变色为主
2. **卡片式布局**，功能模块化
3. **响应式设计**，适配多设备
4. **动画效果**，提升用户体验
5. **国际化支持**，多语言内容

---

## 响应式布局架构

### 技术栈

- **框架**: Next.js 15+
- **UI框架**: Bootstrap 5
- **样式方案**: SCSS
- **图标库**: react-icons/fi (Feather Icons)
- **图片优化**: Next.js Image Component

### 布局架构图

```
RootLayout (layout.tsx)
├── Metadata (SEO + Open Graph)
├── Viewport (Responsive Setup
├── ClientLayout
│   ├── Redux Provider
│   ├── MainLayout
│   │   ├── Header (Navigation)
│   │   ├── Sidebar (Optional)
│   │   └── Main Content
│   └── Global Styles
└── Global Fonts
```

### 响应式设计原则

1. **移动优先 (Mobile First)
2. **渐进增强
3. **弹性布局
4. **断点适配
5. **图片优化
6. **性能优先

---

## 布局组件设计

### 1. RootLayout (根布局)

**文件**: `src/app/layout.tsx`

**功能**:
- 设置元数据 (Metadata)
- 视口配置 (Viewport)
- 全局样式引入
- 客户端布局包装

**关键配置**:

```typescript
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}
```

### 2. ClientLayout (客户端布局)

**文件**: `src/components/layout/ClientLayout.tsx`

**功能**:
- Redux Store Provider
- 包裹 MainLayout

### 3. MainLayout (主布局)

**文件**: `src/components/layout/MainLayout.tsx`

**结构**:
- Header (顶部导航)
- Sidebar (侧边栏)
- Main Content (主内容区)

### 4. Header (头部导航)

**文件**: `src/components/layout/Header.tsx`

**响应式适配**:

| 断点 | 导航样式 |
|------|----------|
| < 768px | 汉堡菜单 |
| >= 768px | 完整导航 |

---

## 响应式断点设计

### Bootstrap 5 断点配置

```scss
$grid-breakpoints: (
  xs: 0,        // 超小屏
  sm: 576px,    // 小屏
  md: 768px,    // 平板
  lg: 992px,    // 桌面
  xl: 1200px,   // 大屏
  xxl: 1400px   // 超大屏
);
```

### 断点适配策略

#### 1. 栅格系统使用

```tsx
{/* 响应式列布局 */}
<div className="row g-4">
  <div className="col-12 col-md-6 col-lg-4">
    {/* 内容 */}
  </div>
</div>
```

#### 2. 显示/隐藏类

```tsx
{/* 仅在移动端显示 */}
<div className="d-block d-md-none">
  移动端内容
</div>

{/* 仅在桌面端显示 */}
<div className="d-none d-md-block">
  桌面端内容
</div>
```

#### 3. 响应式间距

```tsx
<div className="mb-3 mb-md-5">
  响应式边距
</div>
```

#### 4. 响应式字体

```scss
font-size: clamp(1.5rem, 3vw, 2.5rem);
```

### 首页布局响应式设计

#### Hero 区域布局

```tsx
<section className="position-relative overflow-hidden">
  <div className="container">
    <div className="row align-items-center g-5">
      {/* 左侧文字 - 小屏占满，大屏占一半 */}
      <div className="col-lg-6">
        <h1>标题</h1>
        <p>描述</p>
      </div>
      
      {/* 右侧图片 - 小屏在下，大屏在右 */}
      <div className="col-lg-6">
        <Image src="" alt="" />
      </div>
    </div>
  </div>
</section>
```

#### 卡片布局

```tsx
<div className="row g-4">
  {features.map((feature, idx) => (
    <div 
      key={idx} 
      className="col-12 col-md-6 col-lg-4"
    >
      <Card>内容</Card>
    </div>
  )}
</div>
```

#### 统计数据布局

```tsx
<div className="row g-4">
  {stats.map((stat, idx) => (
    <div 
      key={idx} 
      className="col-6 col-lg-3"
    >
      <StatCard />
    </div>
  )}
</div>
```

---

## 响应式实现细节

### 1. 图片响应式处理

```tsx
import Image from 'next/image'

<Image
  src="/images/banner.png"
  alt="Banner"
  width={1200}
  height={600}
  className="img-fluid"
  priority
  sizes="(max-width: 768px) 100vw,
         (max-width: 1200px) 50vw,
         33vw"
/>
```

### 2. 背景响应式

```scss
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
  @media (max-width: 768px) {
    padding: 40px 0;
  }
  
  @media (min-width: 768px) {
    padding: 80px 0;
  }
}
```

### 3. 导航响应式

```tsx
{/* 桌面导航 */}
<nav className="d-none d-lg-flex">
  {/* 桌面导航项 */}
</nav>

{/* 移动导航 */}
<div className="d-lg-none">
  <MobileMenu />
</div>
```

### 4. 内容排版响应式

```scss
h1 {
  font-size: 2rem;
  
  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (min-width: 1200px) {
    font-size: 3.5rem;
  }
}
```

### 5. Flex 布局响应式

```tsx
<div className="d-flex flex-column flex-md-row gap-3">
  <Button>按钮1</Button>
  <Button>按钮2</Button>
</div>
```

---

## 性能优化策略

### 1. 图片懒加载

```tsx
<Image
  src="/images/feature.png"
  alt="Feature"
  width={400}
  height={300}
  loading="lazy"
/>
```

### 2. 关键路径优化

```scss
// 关键样式内联
// 非关键样式延迟加载
```

### 3. 媒体查询优化

```scss
// 移动优先
.component {
  // 移动样式
  
  @media (min-width: 768px) {
    // 平板样式
  }
  
  @media (min-width: 992px) {
    // 桌面样式
  }
}
```

---

## 测试清单

- [ ] 在不同设备尺寸下的布局测试
- [ ] 移动端导航菜单交互
- [ ] 图片加载和显示
- [ ] 字体大小适配
- [ ] 触摸目标尺寸
- [ ] 性能指标
- [ ] SEO 元数据
