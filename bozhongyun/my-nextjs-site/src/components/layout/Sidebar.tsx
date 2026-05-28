'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { 
  FiHome, 
  FiMessageSquare, 
  FiFileText, 
  FiPieChart,
  FiUsers,
  FiSettings 
} from 'react-icons/fi'

const menuItems = [
  { path: '/', name: '首页', icon: FiHome },
  { path: '/sms', name: '短信服务', icon: FiMessageSquare },
  { path: '/templates', name: '模板管理', icon: FiFileText },
  { path: '/analytics', name: '数据统计', icon: FiPieChart },
  { path: '/contacts', name: '联系人', icon: FiUsers },
  { path: '/settings', name: '系统设置', icon: FiSettings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className="d-flex flex-column vh-100 p-4 bg-white border-end shadow-sm">
      {/* Logo区域 */}
      <div className="mb-5 text-center animate-fadeIn">
        <Link href="/" className="d-block">
          <Image 
            src="/images/header/logo3.png" 
            alt="Logo" 
            width={160} 
            height={45} 
            priority
            className="mb-2"
            style={{ width: 'auto', height: 'auto' }}
          />
        </Link>
      </div>
      
      {/* 导航菜单 */}
      <ul className="nav nav-pills flex-column mb-auto">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.path
          return (
            <li key={item.path} className="nav-item mb-1">
              <Link
                href={item.path}
                className={`nav-link d-flex align-items-center px-3 py-3 rounded-2 transition-all animate-fadeInUp animation-delay-${(index + 1) * 100} ${
                  isActive 
                    ? 'active bg-primary text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-light hover:text-primary'
                }`}
              >
                <item.icon className="me-3" size={20} />
                <span className="fw-medium">{item.name}</span>
              </Link>
            </li>
          )
        })}
      </ul>
      
      {/* 页脚区域 */}
      <hr className="my-4" />
      <div className="text-center small text-muted">
        <div className="fw-medium">短信服务平台</div>
        <div className="mt-1">© 2025 版权所有</div>
      </div>
    </nav>
  )
}