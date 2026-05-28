export const VALIDATION_RULES = {
  PHONE_REGEX: /^1[3-9]\d{9}$/,
  MAX_SMS_LENGTH: 70,
  MAX_PHONE_COUNT: 100,
}

export interface ValidationResult {
  isValid: boolean
  error?: string
}

export function validatePhone(phone: string): ValidationResult {
  if (!phone.trim()) {
    return { isValid: false, error: '请输入手机号码' }
  }

  const phones = phone.split(/[,，]/).map(p => p.trim()).filter(p => p)

  if (phones.length > VALIDATION_RULES.MAX_PHONE_COUNT) {
    return { isValid: false, error: `手机号码数量不能超过${VALIDATION_RULES.MAX_PHONE_COUNT}个` }
  }

  const invalidPhones = phones.filter(p => !VALIDATION_RULES.PHONE_REGEX.test(p))
  if (invalidPhones.length > 0) {
    return { isValid: false, error: `以下手机号码格式不正确: ${invalidPhones.slice(0, 3).join(', ')}${invalidPhones.length > 3 ? '...' : ''}` }
  }

  return { isValid: true }
}

export function validateSMSContent(content: string): ValidationResult {
  if (!content.trim()) {
    return { isValid: false, error: '请输入短信内容' }
  }

  if (content.length > VALIDATION_RULES.MAX_SMS_LENGTH) {
    return { isValid: false, error: `短信内容不能超过${VALIDATION_RULES.MAX_SMS_LENGTH}个字符` }
  }

  return { isValid: true }
}

export function formatPhoneNumber(phone: string): string {
  return phone.replace(/[^\d]/g, '').substring(0, 11)
}

export function calculateSMSParts(content: string): number {
  const chineseRegex = /[\u4e00-\u9fa5]/
  const hasChinese = chineseRegex.test(content)

  if (!hasChinese) {
    return Math.ceil(content.length / 160)
  }

  return Math.ceil(content.length / 70)
}
