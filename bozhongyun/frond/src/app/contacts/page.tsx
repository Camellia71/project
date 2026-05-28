'use client'

import { useState } from 'react'
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiPhone, FiMail, FiHome, FiX, FiSave } from 'react-icons/fi'

interface Contact {
  id: string
  name: string
  phone: string
  email: string
  company: string
  tags: string[]
}

export default function ContactsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    tags: '',
  })

  const allTags = ['VIP', '客户', '合作伙伴', '供应商', '内部']

  const contacts: Contact[] = [
    { id: '1', name: '张三', phone: '138****1234', email: 'zhangsan@example.com', company: '阿里巴巴', tags: ['VIP', '客户'] },
    { id: '2', name: '李四', phone: '139****5678', email: 'lisi@example.com', company: '腾讯', tags: ['客户'] },
    { id: '3', name: '王五', phone: '137****9012', email: 'wangwu@example.com', company: '百度', tags: ['合作伙伴'] },
    { id: '4', name: '赵六', phone: '136****3456', email: 'zhaoliu@example.com', company: '美团', tags: ['VIP', '供应商'] },
    { id: '5', name: '钱七', phone: '135****7890', email: 'qianqi@example.com', company: '京东', tags: ['客户'] },
    { id: '6', name: '孙八', phone: '134****2345', email: 'sunba@example.com', company: '字节跳动', tags: ['内部'] },
  ]

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesTags = selectedTags.length === 0 || 
      contact.tags.some(tag => selectedTags.includes(tag))
    
    return matchesSearch && matchesTags
  })

  const handleOpenModal = (contact?: Contact) => {
    if (contact) {
      setEditingContact(contact)
      setFormData({
        name: contact.name,
        phone: contact.phone.replace(/\*/g, ''),
        email: contact.email,
        company: contact.company,
        tags: contact.tags.join(','),
      })
    } else {
      setEditingContact(null)
      setFormData({ name: '', phone: '', email: '', company: '', tags: '' })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingContact(null)
  }

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">联系人管理</h1>
            <p className="text-gray-500 mt-1">管理您的联系人列表</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <FiPlus className="w-5 h-5" />
            添加联系人
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜索联系人姓名、电话或邮箱..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">姓名</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">电话</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">邮箱</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">公司</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">标签</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-800">{contact.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600 flex items-center gap-2">
                      <FiPhone className="w-4 h-4 text-gray-400" />
                      {contact.phone}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600 flex items-center gap-2">
                      <FiMail className="w-4 h-4 text-gray-400" />
                      {contact.email}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600 flex items-center gap-2">
                      <FiHome className="w-4 h-4 text-gray-400" />
                      {contact.company}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {contact.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleOpenModal(contact)}
                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <FiEdit2 className="w-5 h-5" />
                      </button>
                      <button
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredContacts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">暂无联系人，请添加新联系人</p>
            </div>
          )}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">
                  {editingContact ? '编辑联系人' : '添加联系人'}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FiX className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <form className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">姓名</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="请输入姓名"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">电话</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="请输入电话号码"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="请输入邮箱地址"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">公司</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="请输入公司名称"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">标签</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="多个标签用逗号分隔"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <FiSave className="w-5 h-5" />
                    {editingContact ? '保存修改' : '添加联系人'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
