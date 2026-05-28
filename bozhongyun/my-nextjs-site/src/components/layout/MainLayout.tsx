'use client'

import Header from './Header'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f5f7fb' }}>
      {/* 顶部导航栏 */}
      <Header />
      
      {/* 主内容区域 */}
      <main className="pt-4 pb-8">
        <div className="container">
          <div className="animate-fadeInUp">
            {children}
          </div>
        </div>
      </main>
      
      {/* 页脚 */}
      <footer className="bg-white border-top py-4 mt-auto">
        <div className="container">
          <div className="text-center text-muted small">
            <p className="mb-1 fw-medium">短信服务平台</p>
            <p className="mb-0">© 2025 版权所有</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
