'use client'

import { FiX } from 'react-icons/fi'
import { navItems } from '@/config/navigation'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed left-0 top-16 bottom-0 w-64 bg-white shadow-lg z-50 lg:translate-x-0 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-gray-100">
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-600" />
          </button>
          <p className="hidden lg:block text-sm font-medium text-gray-500 mt-2">菜单导航</p>
        </div>
        <nav className="p-3">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors mb-1"
              onClick={onClose}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4">
            <p className="text-sm font-medium text-gray-700">升级到专业版</p>
            <p className="text-xs text-gray-500 mt-1">解锁更多高级功能</p>
            <button className="mt-3 w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
              立即升级
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
