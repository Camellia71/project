'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { sendSMS, getTemplates } from '@/store/slices/smsSlice';
import { FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

export default function SendSMSForm() {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, templates } = useSelector((state: RootState) => state.sms);

  useEffect(() => {
    dispatch(getTemplates());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(sendSMS({ phone, message })).then(() => {
      setPhone('');
      setMessage('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    });
  };

  const handleTemplateSelect = (templateContent: string) => {
    setMessage(templateContent);
  };

  return (
    <div className="card p-4 shadow-sm hover-shadow">
      <div className="d-flex align-items-center mb-4">
        <div className="bg-primary bg-opacity-10 rounded-3 p-2 me-3">
          <FiSend size={24} className="text-primary" />
        </div>
        <div>
          <h3 className="mb-0 fw-bold">发送短信</h3>
          <p className="text-muted small mb-0">快速发送短信给您的客户</p>
        </div>
      </div>
      
      {error && (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <FiAlertCircle className="me-2" />
          <span>{error}</span>
        </div>
      )}

      {showSuccess && (
        <div className="alert alert-success d-flex align-items-center animate-fadeIn" role="alert">
          <FiCheckCircle className="me-2" />
          <span>短信发送成功！</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-medium">手机号码</label>
          <input
            type="text"
            className="form-control form-control-lg"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="请输入手机号码"
            required
          />
        </div>

        {templates.length > 0 && (
          <div className="mb-3">
            <label className="form-label fw-medium">使用模板</label>
            <div className="d-flex flex-wrap gap-2">
              {templates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  className="btn btn-outline-primary btn-sm px-3"
                  onClick={() => handleTemplateSelect(template.content)}
                >
                  {template.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="form-label fw-medium">短信内容</label>
          <textarea
            className="form-control form-control-lg"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="请输入短信内容..."
            required
          />
          <div className="form-text text-end">
            {message.length} 字符
          </div>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary btn-lg w-100 fw-medium" 
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              发送中...
            </>
          ) : (
            <>
              <FiSend className="me-2" />
              立即发送
            </>
          )}
        </button>
      </form>
    </div>
  );
}
