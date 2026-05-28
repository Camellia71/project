'use client'

import { useState, useEffect, useCallback } from 'react'
import { FiUser, FiBell, FiShield, FiSettings, FiGlobe, FiHelpCircle, FiSave, FiCheckCircle } from 'react-icons/fi'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [saved, setSaved] = useState(false)

  const handleSave = useCallback(() => {
    setSaved(true)
  }, [])

  useEffect(() => {
    if (saved) {
      const timer = setTimeout(() => {
        setSaved(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [saved])

  const tabs = [
    { id: 'profile', label: '个人信息', icon: FiUser },
    { id: 'notification', label: '通知设置', icon: FiBell },
    { id: 'security', label: '安全设置', icon: FiShield },
    { id: 'appearance', label: '外观设置', icon: FiSettings },
    { id: 'language', label: '语言设置', icon: FiGlobe },
    { id: 'help', label: '帮助与支持', icon: FiHelpCircle },
  ]

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">系统设置</h1>
          <p className="text-gray-500 mt-1">管理您的账户和系统设置</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {activeTab === 'profile' && (
                <>
                  <h2 className="text-lg font-semibold text-gray-800 mb-6">个人信息</h2>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                        <FiUser className="w-10 h-10 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">点击更换头像</p>
                        <p className="text-sm text-gray-500">支持 JPG、PNG 格式，最大 2MB</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">用户名</label>
                        <input
                          type="text"
                          defaultValue="张三"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
                        <input
                          type="email"
                          defaultValue="zhangsan@example.com"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">手机号</label>
                        <input
                          type="tel"
                          defaultValue="138****1234"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">公司名称</label>
                        <input
                          type="text"
                          defaultValue="示例公司"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'notification' && (
                <>
                  <h2 className="text-lg font-semibold text-gray-800 mb-6">通知设置</h2>
                  <div className="space-y-4">
                    {[
                      { label: '短信发送成功通知', desc: '当短信发送成功时发送通知' },
                      { label: '短信发送失败通知', desc: '当短信发送失败时发送通知' },
                      { label: '账户余额不足通知', desc: '当账户余额低于设定值时发送通知' },
                      { label: '新功能发布通知', desc: '当有新功能发布时发送通知' },
                      { label: '系统维护通知', desc: '当系统进行维护时发送通知' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">{item.label}</p>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                        <button className="w-12 h-6 bg-indigo-600 rounded-full relative">
                          <span className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full"></span>
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeTab === 'security' && (
                <>
                  <h2 className="text-lg font-semibold text-gray-800 mb-6">安全设置</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">两步验证</p>
                          <p className="text-sm text-gray-500">增强账户安全性</p>
                        </div>
                        <button className="w-12 h-6 bg-gray-300 rounded-full relative">
                          <span className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"></span>
                        </button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">修改密码</label>
                        <input
                          type="password"
                          placeholder="当前密码"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-3"
                        />
                        <input
                          type="password"
                          placeholder="新密码"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-3"
                        />
                        <input
                          type="password"
                          placeholder="确认新密码"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'appearance' && (
                <>
                  <h2 className="text-lg font-semibold text-gray-800 mb-6">外观设置</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">主题模式</label>
                      <div className="flex gap-3">
                        {['浅色', '深色', '系统'].map((theme, index) => (
                          <button
                            key={theme}
                            className={`flex-1 py-3 rounded-lg text-sm font-medium transition-colors ${
                              index === 0
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {theme}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">字体大小</label>
                      <div className="flex gap-3">
                        {['小号', '默认', '大号', '特大'].map((size, index) => (
                          <button
                            key={size}
                            className={`flex-1 py-3 rounded-lg text-sm font-medium transition-colors ${
                              index === 1
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'language' && (
                <>
                  <h2 className="text-lg font-semibold text-gray-800 mb-6">语言设置</h2>
                  <div className="space-y-3">
                    {[
                      { lang: '简体中文', code: 'zh-CN' },
                      { lang: 'English', code: 'en-US' },
                      { lang: '繁體中文', code: 'zh-TW' },
                      { lang: '日本語', code: 'ja-JP' },
                    ].map((item, index) => (
                      <button
                        key={item.code}
                        className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
                          index === 0
                            ? 'bg-indigo-50 border border-indigo-200'
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <span className="font-medium text-gray-800">{item.lang}</span>
                        {index === 0 && (
                          <FiCheckCircle className="w-5 h-5 text-indigo-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {activeTab === 'help' && (
                <>
                  <h2 className="text-lg font-semibold text-gray-800 mb-6">帮助与支持</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-800 mb-2">帮助中心</h3>
                      <p className="text-sm text-gray-500 mb-3">查看常见问题解答和使用指南</p>
                      <button className="text-indigo-600 font-medium hover:underline">
                        访问帮助中心
                      </button>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-800 mb-2">联系客服</h3>
                      <p className="text-sm text-gray-500 mb-3">工作时间：周一至周五 9:00-18:00</p>
                      <button className="text-indigo-600 font-medium hover:underline">
                        联系我们
                      </button>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-800 mb-2">服务条款</h3>
                      <p className="text-sm text-gray-500 mb-3">查看我们的服务条款和隐私政策</p>
                      <button className="text-indigo-600 font-medium hover:underline">
                        阅读条款
                      </button>
                    </div>
                  </div>
                </>
              )}

              <div className="mt-8 flex justify-end gap-3">
                <button className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                  重置
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  {saved ? (
                    <>
                      <FiCheckCircle className="w-5 h-5" />
                      已保存
                    </>
                  ) : (
                    <>
                      <FiSave className="w-5 h-5" />
                      保存更改
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
