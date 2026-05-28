'use client'

import { useState } from 'react'
import { FiUser, FiBell, FiShield, FiKey, FiDatabase, FiCheck, FiX } from 'react-icons/fi'

type TabType = 'profile' | 'notifications' | 'security' | 'api' | 'database'

interface SettingsState {
  systemName: string
  apiKey: string
  email: string
  signature: string
  smsNotifications: boolean
  errorAlerts: boolean
  weeklyReport: boolean
  twoFactorAuth: boolean
  sessionTimeout: string
}

export default function SettingsClient() {
  const [activeTab, setActiveTab] = useState<TabType>('profile')
  const [settings, setSettings] = useState<SettingsState>({
    systemName: '短信服务平台',
    apiKey: 'sk_test_xxxxxxxxxxxxx',
    email: 'admin@example.com',
    signature: '【博众云】',
    smsNotifications: true,
    errorAlerts: true,
    weeklyReport: false,
    twoFactorAuth: false,
    sessionTimeout: '30',
  })

  const tabs = [
    { id: 'profile' as TabType, label: '个人信息', icon: FiUser },
    { id: 'notifications' as TabType, label: '通知设置', icon: FiBell },
    { id: 'security' as TabType, label: '安全设置', icon: FiShield },
    { id: 'api' as TabType, label: 'API配置', icon: FiKey },
    { id: 'database' as TabType, label: '数据库', icon: FiDatabase },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="mb-0 fw-bold">
                <FiUser className="me-2" />
                个人信息
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3 text-center mb-4 mb-md-0">
                  <div className="position-relative d-inline-block">
                    <div className="bg-primary bg-opacity-10 rounded-circle p-5">
                      <FiUser size={64} className="text-primary" />
                    </div>
                    <button className="btn btn-primary btn-sm position-absolute bottom-0 start-50 translate-middle-x rounded-pill">
                      修改头像
                    </button>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-medium">用户名称</label>
                      <input type="text" className="form-control" defaultValue="管理员" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium">邮箱地址</label>
                      <input type="email" className="form-control" defaultValue="admin@example.com" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium">手机号码</label>
                      <input type="text" className="form-control" defaultValue="138****8888" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium">公司名称</label>
                      <input type="text" className="form-control" defaultValue="博众云科技" />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-medium">个人简介</label>
                      <textarea className="form-control" rows={3} defaultValue="企业级短信服务平台管理员" />
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-4" />
              <div className="d-flex gap-2">
                <button className="btn btn-primary">
                  <FiCheck className="me-2" />
                  保存修改
                </button>
                <button className="btn btn-outline-secondary">
                  <FiX className="me-2" />
                  取消
                </button>
              </div>
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="mb-0 fw-bold">
                <FiBell className="me-2" />
                通知设置
              </h5>
            </div>
            <div className="card-body">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h6 className="mb-1 fw-bold">短信发送通知</h6>
                    <p className="text-muted small mb-0">当短信发送成功或失败时发送通知</p>
                  </div>
                  <div className="form-check form-switch">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      checked={settings.smsNotifications}
                      onChange={(e) => setSettings({...settings, smsNotifications: e.target.checked})}
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h6 className="mb-1 fw-bold">错误警报</h6>
                    <p className="text-muted small mb-0">当系统出现错误时发送警报通知</p>
                  </div>
                  <div className="form-check form-switch">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      checked={settings.errorAlerts}
                      onChange={(e) => setSettings({...settings, errorAlerts: e.target.checked})}
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h6 className="mb-1 fw-bold">每周报告</h6>
                    <p className="text-muted small mb-0">每周发送短信发送统计数据报告</p>
                  </div>
                  <div className="form-check form-switch">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      checked={settings.weeklyReport}
                      onChange={(e) => setSettings({...settings, weeklyReport: e.target.checked})}
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex gap-2">
                <button className="btn btn-primary">
                  <FiCheck className="me-2" />
                  保存设置
                </button>
              </div>
            </div>
          </div>
        )

      case 'security':
        return (
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="mb-0 fw-bold">
                <FiShield className="me-2" />
                安全设置
              </h5>
            </div>
            <div className="card-body">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h6 className="mb-1 fw-bold">双因素认证</h6>
                    <p className="text-muted small mb-0">启用后登录需要输入手机验证码</p>
                  </div>
                  <div className="form-check form-switch">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      checked={settings.twoFactorAuth}
                      onChange={(e) => setSettings({...settings, twoFactorAuth: e.target.checked})}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-medium">会话超时时间</label>
                <select 
                  className="form-select" 
                  value={settings.sessionTimeout}
                  onChange={(e) => setSettings({...settings, sessionTimeout: e.target.value})}
                >
                  <option value="15">15 分钟</option>
                  <option value="30">30 分钟</option>
                  <option value="60">1 小时</option>
                  <option value="120">2 小时</option>
                </select>
                <div className="form-text">无操作后自动退出登录的时间</div>
              </div>

              <hr className="my-4" />
              
              <div className="mb-4">
                <h6 className="fw-bold mb-3">修改密码</h6>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">当前密码</label>
                    <input type="password" className="form-control" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">新密码</label>
                    <input type="password" className="form-control" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">确认新密码</label>
                    <input type="password" className="form-control" />
                  </div>
                </div>
              </div>

              <div className="d-flex gap-2">
                <button className="btn btn-primary">
                  <FiCheck className="me-2" />
                  更新密码
                </button>
              </div>
            </div>
          </div>
        )

      case 'api':
        return (
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="mb-0 fw-bold">
                <FiKey className="me-2" />
                API配置
              </h5>
            </div>
            <div className="card-body">
              <div className="alert alert-info">
                <strong>API文档：</strong> 请参考 
                <a href="#" className="alert-link"> API使用指南</a> 
                了解更多接口信息。
              </div>

              <div className="mb-4">
                <label className="form-label fw-medium">API密钥</label>
                <div className="input-group">
                  <input
                    type="password"
                    className="form-control font-monospace"
                    value={settings.apiKey}
                    readOnly
                  />
                  <button className="btn btn-outline-secondary" type="button">
                    显示
                  </button>
                  <button className="btn btn-primary" type="button">
                    重新生成
                  </button>
                </div>
                <div className="form-text text-danger">
                  <FiShield className="me-1" />
                  请妥善保管您的API密钥，不要泄露给他人
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-medium">API限流</label>
                <div className="d-flex align-items-center">
                  <input type="range" className="form-range flex-grow-1 me-3" min="100" max="10000" defaultValue="1000" />
                  <span className="badge bg-primary">1000/分钟</span>
                </div>
              </div>

              <div className="mb-4">
                <h6 className="fw-bold mb-3">IP白名单</h6>
                <div className="input-group mb-2">
                  <input type="text" className="form-control" placeholder="输入IP地址" />
                  <button className="btn btn-outline-primary">添加</button>
                </div>
                <div className="form-text">留空表示不限制IP访问</div>
              </div>

              <div className="d-flex gap-2">
                <button className="btn btn-primary">
                  <FiCheck className="me-2" />
                  保存配置
                </button>
              </div>
            </div>
          </div>
        )

      case 'database':
        return (
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="mb-0 fw-bold">
                <FiDatabase className="me-2" />
                数据库管理
              </h5>
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-4">
                  <div className="card bg-light">
                    <div className="card-body text-center">
                      <h3 className="text-primary">3</h3>
                      <p className="mb-0 text-muted">数据表数量</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card bg-light">
                    <div className="card-body text-center">
                      <h3 className="text-success">1,234</h3>
                      <p className="mb-0 text-muted">用户数量</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card bg-light">
                    <div className="card-body text-center">
                      <h3 className="text-warning">5,678</h3>
                      <p className="mb-0 text-muted">短信记录</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h6 className="fw-bold mb-3">数据备份</h6>
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-primary">
                    立即备份
                  </button>
                  <button className="btn btn-outline-secondary">
                    设置自动备份
                  </button>
                </div>
              </div>

              <hr className="my-4" />

              <div className="card border-danger">
                <div className="card-header bg-danger bg-opacity-10">
                  <h6 className="mb-0 fw-bold text-danger">
                    <FiShield className="me-2" />
                    危险操作
                  </h6>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <h6 className="fw-bold">清空发送历史</h6>
                    <p className="text-muted small mb-2">清空后所有发送记录将被永久删除，此操作不可恢复。</p>
                    <button className="btn btn-outline-danger btn-sm">
                      清空历史记录
                    </button>
                  </div>
                  <div className="mb-3">
                    <h6 className="fw-bold">重置数据库</h6>
                    <p className="text-muted small mb-2">重置将删除所有数据并恢复到初始状态，此操作不可恢复！</p>
                    <button className="btn btn-danger btn-sm">
                      重置数据库
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="container-fluid g-0">
      <div className="mb-4">
        <h1 className="h3 fw-bold mb-1">系统设置</h1>
        <p className="text-muted mb-0">配置系统参数和账户信息</p>
      </div>

      <div className="row g-4">
        <div className="col-lg-3">
          <div className="list-group shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`list-group-item list-group-item-action d-flex align-items-center ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="me-3" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="col-lg-9">
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}
