import { FiLayout, FiMessageSquare, FiFileText, FiBarChart, FiUsers, FiSettings } from 'react-icons/fi'
import { IconType } from 'react-icons'

export interface NavItem {
  icon: IconType
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { icon: FiLayout, label: '首页', href: '/' },
  { icon: FiMessageSquare, label: '短信发送', href: '/sms' },
  { icon: FiFileText, label: '模板管理', href: '/templates' },
  { icon: FiBarChart, label: '数据分析', href: '/analytics' },
  { icon: FiUsers, label: '联系人', href: '/contacts' },
  { icon: FiSettings, label: '系统设置', href: '/settings' },
]

export const APP_NAME = '短信平台'
export const APP_VERSION = '1.0.0'
