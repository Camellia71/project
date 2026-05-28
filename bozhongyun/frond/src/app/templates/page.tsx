'use client'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiSave, FiX } from 'react-icons/fi'
import { addTemplate, updateTemplate, deleteTemplate } from '@/store/slices/smsSlice'
import type { RootState, AppDispatch } from '@/store'

interface SMSTemplate {
  id: string
  name: string
  content: string
  type: 'verify' | 'notification' | 'marketing'
  status: 'active' | 'inactive'
}

export default function TemplatesPage() {
  const dispatch = useDispatch<AppDispatch>()
  const templates = useSelector((state: RootState) => state.sms.templates)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<SMSTemplate | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    content: '',
    type: 'verify' as SMSTemplate['type'],
    status: 'active' as SMSTemplate['status'],
  })

  const typeOptions = [
    { value: 'verify', label: '验证码' },
    { value: 'notification', label: '通知' },
    { value: 'marketing', label: '营销' },
  ]

  const handleOpenModal = (template?: SMSTemplate) => {
    if (template) {
      setEditingTemplate(template)
      setFormData({
        name: template.name,
        content: template.content,
        type: template.type,
        status: template.status,
      })
    } else {
      setEditingTemplate(null)
      setFormData({
        name: '',
        content: '',
        type: 'verify',
        status: 'active',
      })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTemplate(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.content) return

    if (editingTemplate) {
      dispatch(updateTemplate({
        ...editingTemplate,
        ...formData,
      }))
    } else {
      dispatch(addTemplate(formData))
    }
    handleCloseModal()
  }

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这个模板吗？')) {
      dispatch(deleteTemplate(id))
    }
  }

  const getTypeLabel = (type: string) => {
    const option = typeOptions.find(o => o.value === type)
    return option?.label || type
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'verify':
        return 'bg-blue-100 text-blue-700'
      case 'notification':
        return 'bg-green-100 text-green-700'
      case 'marketing':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusColor = (status: string) => {
    return status === 'active'
      ? 'bg-green-100 text-green-700'
      : 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">模板管理</h1>
            <p className="text-gray-500 mt-1">管理您的短信模板</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <FiPlus className="w-5 h-5" />
            添加模板
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">模板名称</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">类型</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">内容</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">状态</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {templates.map((template) => (
                <tr key={template.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-800">{template.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(template.type)}`}>
                      {getTypeLabel(template.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 max-w-xs truncate">{template.content}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(template.status)}`}>
                      {template.status === 'active' ? '启用' : '禁用'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="预览"
                      >
                        <FiEye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleOpenModal(template)}
                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="编辑"
                      >
                        <FiEdit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(template.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="删除"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {templates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">暂无模板，请添加新模板</p>
            </div>
          )}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">
                  {editingTemplate ? '编辑模板' : '添加模板'}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FiX className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">模板名称</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="请输入模板名称"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">模板类型</label>
                  <div className="flex flex-wrap gap-2">
                    {typeOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, type: option.value as SMSTemplate['type'] }))}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          formData.type === option.value
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">模板内容</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    placeholder="请输入模板内容，使用 {变量名} 作为占位符"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">状态</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, status: 'active' }))}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        formData.status === 'active'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      启用
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, status: 'inactive' }))}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        formData.status === 'inactive'
                          ? 'bg-gray-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      禁用
                    </button>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    disabled={!formData.name || !formData.content}
                    className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <FiSave className="w-5 h-5" />
                    {editingTemplate ? '保存修改' : '添加模板'}
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
