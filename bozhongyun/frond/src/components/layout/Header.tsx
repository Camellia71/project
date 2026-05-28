'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FiMenu, FiX, FiBell, FiUser } from 'react-icons/fi'
import { navItems, APP_NAME } from '@/config/navigation'

interface HeaderProps {
  onToggleSidebar: () => void
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiMenu className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <Image
              src="/images/header/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {APP_NAME}
            </span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-4 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <FiBell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity">
            <FiUser className="w-4 h-4" />
            <span className="font-medium">登录</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? (
              <FiX className="w-6 h-6 text-gray-600" />
            ) : (
              <FiMenu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block px-4 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <button className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg mx-2">
            登录
          </button>
        </div>
      )}
    </header>
  )
}
