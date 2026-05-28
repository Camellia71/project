import apiClient from './apiClient'
import { ENDPOINTS } from '@/config'

export interface SMSSendRequest {
  phone: string
  content: string
  templateId?: string
}

export interface SMSMessage {
  id: string
  phone: string
  content: string
  status: 'pending' | 'sent' | 'failed'
  createdAt: string
  sentAt?: string
  error?: string
}

export interface SMSTemplate {
  id: string
  name: string
  content: string
  type: 'verify' | 'notification' | 'marketing'
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export interface SMSStatistics {
  totalSent: number
  successRate: number
  todaySent: number
  pendingCount: number
  failedCount: number
}

export const smsService = {
  async sendSMS(data: SMSSendRequest): Promise<SMSMessage> {
    return apiClient.post<SMSMessage>(ENDPOINTS.SMS.SEND, data)
  },

  async getHistory(params?: { page?: number; limit?: number }): Promise<{
    messages: SMSMessage[]
    total: number
    page: number
    totalPages: number
  }> {
    return apiClient.get(ENDPOINTS.SMS.HISTORY, { params })
  },

  async getTemplates(): Promise<SMSTemplate[]> {
    return apiClient.get<SMSTemplate[]>(ENDPOINTS.SMS.TEMPLATES)
  },

  async getStatistics(): Promise<SMSStatistics> {
    return apiClient.get<SMSStatistics>(ENDPOINTS.SMS.STATISTICS)
  },

  async createTemplate(data: Omit<SMSTemplate, 'id' | 'createdAt' | 'updatedAt'>): Promise<SMSTemplate> {
    return apiClient.post<SMSTemplate>(ENDPOINTS.SMS.TEMPLATES, data)
  },

  async updateTemplate(id: string, data: Partial<SMSTemplate>): Promise<SMSTemplate> {
    return apiClient.put<SMSTemplate>(`${ENDPOINTS.SMS.TEMPLATES}/${id}`, data)
  },

  async deleteTemplate(id: string): Promise<void> {
    return apiClient.delete(`${ENDPOINTS.SMS.TEMPLATES}/${id}`)
  },
}

export default smsService
