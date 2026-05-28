'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { 
  FiHome, 
  FiMessageSquare, 
  FiFileText, 
  FiPieChart,
  FiUsers,
  FiSettings,
  FiMenu,
  FiX,
  FiBell,
  FiUser
} from 'react-icons/fi'

const menuItems = [
  { path: '/', name: '首页', icon: FiHome },
  { path: '/sms', name: '短信服务', icon: FiMessageSquare },
  { path: '/templates', name: '模板管理', icon: FiFileText },
  { path: '/analytics', name: '数据统计', icon: FiPieChart },
  { path: '/contacts', name: '联系人', icon: FiUsers },
  { path: '/settings', name: '系统设置', icon: FiSettings },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`top-navigation sticky-top z-30 ${scrolled ? 'shadow-md' : ''}`}>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light py-3">
          <div className="container-fluid">
            {/* Logo 区域 */}
            <Link href="/" className="navbar-brand logo-container d-flex align-items-center animate-fadeIn">
              <div className="me-2">
                <Image 
                  src="/images/header/logo3.png" 
                  alt="Logo" 
                  width={150} 
                  height={45} 
                  priority
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>
            </Link>

            {/* 桌面端导航菜单 */}
            <div className="d-none d-lg-flex align-items-center gap-1">
              {menuItems.map((item, index) => {
                const isActive = pathname === item.path
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`nav-link-item d-flex align-items-center px-4 py-3 rounded-3 mx-1 animate-slideInDown ${isActive ? 'active' : ''}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <item.icon className="nav-link-icon me-2" size={18} />
                    <span className="fw-medium">{item.name}</span>
                  </Link>
                )
              })}
            </div>

            {/* 用户操作区域 */}
            <div className="d-flex align-items-center gap-3">
              {/* 通知按钮 */}
              <button className="btn btn-light position-relative d-none d-md-flex align-items-center gap-2 animate-fadeIn animation-delay-300 hover-shadow">
                <FiBell size={20} className="text-gray-600" />
                <span className="position-absolute top-0 end-0 translate-middle p-1 bg-danger border border-light rounded-circle">
                  <span className="visually-hidden">新通知</span>
                </span>
              </button>

              {/* 用户按钮 */}
              <button className="btn btn-primary d-none d-md-flex align-items-center gap-2 animate-fadeIn animation-delay-400 animate-gradientMove" style={{
                background: 'linear-gradient(135deg, #0052d9 0%, #3671e9 100%)',
                backgroundSize: '200% 200%'
              }}>
                <FiUser size={18} />
                <span className="fw-medium">登录</span>
              </button>

              {/* 移动端菜单按钮 */}
              <button
                className="btn btn-light d-lg-none animate-fadeIn animation-delay-300"
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </nav>

        {/* 移动端菜单 */}
        {mobileMenuOpen && (
          <div className="mobile-menu d-lg-none bg-white border-top">
            <div className="container py-3">
              <div className="row g-2">
                {menuItems.map((item, index) => {
                  const isActive = pathname === item.path
                  return (
                    <div key={item.path} className="col-12">
                      <Link
                        href={item.path}
                        className={`nav-link-item d-flex align-items-center px-4 py-3 rounded-3 animate-scaleIn ${isActive ? 'active' : ''}`}
                        style={{ animationDelay: `${index * 50}ms` }}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <item.icon className="nav-link-icon me-3" size={20} />
                        <span className="fw-medium">{item.name}</span>
                      </Link>
                    </div>
                  )
                })}
              </div>
              
              {/* 移动端用户按钮 */}
              <div className="mt-4 pt-4 border-top">
                <button className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 animate-gradientMove" style={{
                  background: 'linear-gradient(135deg, #0052d9 0%, #3671e9 100%)',
                  backgroundSize: '200% 200%'
                }}>
                  <FiUser size={18} />
                  <span className="fw-medium">登录</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
