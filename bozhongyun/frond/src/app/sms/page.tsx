'use client'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiSend, FiPhone, FiFileText, FiClock, FiCheckCircle, FiAlertCircle, FiLoader, FiAlertTriangle } from 'react-icons/fi'
import { sendSMS } from '@/store/slices/smsSlice'
import type { RootState, AppDispatch } from '@/store'
import { validatePhone, validateSMSContent, VALIDATION_RULES, calculateSMSParts } from '@/utils/validation'

export default function SmsPage() {
  const dispatch = useDispatch<AppDispatch>()
  const messages = useSelector((state: RootState) => state.sms.messages)
  const templates = useSelector((state: RootState) => state.sms.templates)

  const [formData, setFormData] = useState({
    phone: '',
    content: '',
    templateId: '',
  })
  const [isSending, setIsSending] = useState(false)
  const [errors, setErrors] = useState<{ phone?: string; content?: string }>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: { phone?: string; content?: string } = {}

    const phoneValidation = validatePhone(formData.phone)
    if (!phoneValidation.isValid) {
      newErrors.phone = phoneValidation.error
    }

    const contentValidation = validateSMSContent(formData.content)
    if (!contentValidation.isValid) {
      newErrors.content = contentValidation.error
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    setSubmitSuccess(false)

    if (!validateForm()) {
      return
    }

    setIsSending(true)

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.9) {
            reject(new Error('网络连接失败，请稍后重试'))
          } else {
            resolve(true)
          }
        }, 1000)
      })

      dispatch(sendSMS({
        phone: formData.phone,
        content: formData.content,
      }))

      setFormData({ phone: '', content: '', templateId: '' })
      setSubmitSuccess(true)

      setTimeout(() => {
        setSubmitSuccess(false)
      }, 3000)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : '发送失败，请稍后重试')
    } finally {
      setIsSending(false)
    }
  }

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId)
    if (template) {
      setFormData(prev => ({
        ...prev,
        templateId,
        content: template.content,
      }))
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <FiCheckCircle className="w-5 h-5 text-green-500" />
      case 'failed':
        return <FiAlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <FiLoader className="w-5 h-5 text-yellow-500 animate-spin" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'sent':
        return '已发送'
      case 'failed':
        return '发送失败'
      default:
        return '发送中'
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">短信发送</h1>
          <p className="text-gray-500 mt-1">发送短信给您的客户</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    手机号码
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, phone: e.target.value }))
                        if (errors.phone) {
                          setErrors(prev => ({ ...prev, phone: undefined }))
                        }
                      }}
                      placeholder="请输入手机号码，多个号码用逗号分隔"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <FiAlertTriangle className="w-4 h-4" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    选择模板
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleTemplateSelect('')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        !formData.templateId
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      自定义内容
                    </button>
                    {templates.map((template) => (
                      <button
                        key={template.id}
                        type="button"
                        onClick={() => handleTemplateSelect(template.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          formData.templateId === template.id
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {template.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    短信内容
                  </label>
                  <div className="relative">
                    <FiFileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      value={formData.content}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, content: e.target.value }))
                        if (errors.content) {
                          setErrors(prev => ({ ...prev, content: undefined }))
                        }
                      }}
                      placeholder="请输入短信内容"
                      rows={4}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none ${
                        errors.content ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.content && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <FiAlertTriangle className="w-4 h-4" />
                      {errors.content}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-2 text-right">
                    {formData.content.length}/{VALIDATION_RULES.MAX_SMS_LENGTH} (约{calculateSMSParts(formData.content)}条短信)
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSending || !formData.phone || !formData.content}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSending ? (
                    <>
                      <FiLoader className="w-5 h-5 animate-spin" />
                      发送中...
                    </>
                  ) : submitSuccess ? (
                    <>
                      <FiCheckCircle className="w-5 h-5" />
                      发送成功
                    </>
                  ) : (
                    <>
                      <FiSend className="w-5 h-5" />
                      发送短信
                    </>
                  )}
                </button>

                {submitError && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                    <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm">{submitError}</p>
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">发送记录</h3>
              {messages.length === 0 ? (
                <p className="text-gray-500 text-center py-8">暂无发送记录</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {messages.slice(0, 10).map((message) => (
                    <div key={message.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-800">{message.phone}</span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <FiClock className="w-3 h-3" />
                          {new Date(message.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{message.content}</p>
                      <div className="flex items-center gap-2 text-sm">
                        {getStatusIcon(message.status)}
                        <span className={
                          message.status === 'sent' ? 'text-green-600' :
                          message.status === 'failed' ? 'text-red-600' : 'text-yellow-600'
                        }>
                          {getStatusText(message.status)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
