import { Metadata } from 'next'
import SettingsClient from './SettingsClient'

export const metadata: Metadata = {
  title: '系统设置',
  description: '系统配置管理',
}

export default function SettingsPage() {
  return <SettingsClient />
}
