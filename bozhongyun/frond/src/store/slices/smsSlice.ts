import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SMS {
  id: string
  phone: string
  content: string
  status: 'pending' | 'sent' | 'failed'
  createdAt: string
}

interface SMSTemplate {
  id: string
  name: string
  content: string
  type: 'verify' | 'notification' | 'marketing'
  status: 'active' | 'inactive'
}

interface SMSState {
  messages: SMS[]
  templates: SMSTemplate[]
  statistics: {
    totalSent: number
    successRate: number
    todaySent: number
    pendingCount: number
  }
}

const initialState: SMSState = {
  messages: [],
  templates: [
    { id: '1', name: '验证码模板', content: '您的验证码是：{code}，有效期5分钟。', type: 'verify', status: 'active' },
    { id: '2', name: '订单通知', content: '您的订单{orderNo}已发货，快递单号：{trackingNo}。', type: 'notification', status: 'active' },
    { id: '3', name: '促销活动', content: '限时特惠！全场商品{discount}折起，点击查看详情。', type: 'marketing', status: 'active' },
  ],
  statistics: {
    totalSent: 125800,
    successRate: 99.8,
    todaySent: 3256,
    pendingCount: 12,
  },
}

const smsSlice = createSlice({
  name: 'sms',
  initialState,
  reducers: {
    sendSMS: (state, action: PayloadAction<{ phone: string; content: string }>) => {
      const newMessage: SMS = {
        id: Date.now().toString(),
        phone: action.payload.phone,
        content: action.payload.content,
        status: 'pending',
        createdAt: new Date().toISOString(),
      }
      state.messages.unshift(newMessage)
    },
    addTemplate: (state, action: PayloadAction<Omit<SMSTemplate, 'id'>>) => {
      const newTemplate: SMSTemplate = {
        ...action.payload,
        id: Date.now().toString(),
      }
      state.templates.push(newTemplate)
    },
    updateTemplate: (state, action: PayloadAction<SMSTemplate>) => {
      const index = state.templates.findIndex(t => t.id === action.payload.id)
      if (index !== -1) {
        state.templates[index] = action.payload
      }
    },
    deleteTemplate: (state, action: PayloadAction<string>) => {
      state.templates = state.templates.filter(t => t.id !== action.payload)
    },
  },
})

export const { sendSMS, addTemplate, updateTemplate, deleteTemplate } = smsSlice.actions
export default smsSlice.reducer
