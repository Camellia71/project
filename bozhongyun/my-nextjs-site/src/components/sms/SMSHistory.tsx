'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { getSMSHistory } from '@/store/slices/smsSlice';
import { FiList, FiRefreshCw, FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';

export default function SMSHistory() {
  const dispatch = useDispatch<AppDispatch>();
  const { history, loading } = useSelector((state: RootState) => state.sms);

  useEffect(() => {
    dispatch(getSMSHistory());
  }, [dispatch]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'sent':
        return { icon: FiCheckCircle, class: 'text-success', bgClass: 'bg-success bg-opacity-10', text: '已发送' };
      case 'failed':
        return { icon: FiXCircle, class: 'text-danger', bgClass: 'bg-danger bg-opacity-10', text: '失败' };
      default:
        return { icon: FiClock, class: 'text-warning', bgClass: 'bg-warning bg-opacity-10', text: '待发送' };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN');
  };

  return (
    <div className="card shadow-sm hover-shadow">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <div className="bg-primary bg-opacity-10 rounded-3 p-2 me-3">
            <FiList size={20} className="text-primary" />
          </div>
          <div>
            <h5 className="mb-0 fw-bold">发送历史</h5>
            <p className="text-muted small mb-0">最近的短信发送记录</p>
          </div>
        </div>
        <button 
          className="btn btn-outline-primary btn-sm d-flex align-items-center"
          onClick={() => dispatch(getSMSHistory())}
        >
          <FiRefreshCw size={16} className={`me-1 ${loading ? 'animate-spin' : ''}`} />
          刷新
        </button>
      </div>
      <div className="card-body">
        {loading ? (
          <div className="text-center py-8">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">加载中...</span>
            </div>
            <p className="text-muted mt-3">正在加载发送记录...</p>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-8 text-muted">
            <FiList size={48} className="mx-auto mb-3 opacity-30" />
            <p>暂无发送记录</p>
            <p className="small">发送短信后，记录将显示在这里</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr className="border-bottom">
                  <th className="fw-medium">手机号</th>
                  <th className="fw-medium">内容</th>
                  <th className="fw-medium">状态</th>
                  <th className="fw-medium">时间</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, index) => {
                  const statusConfig = getStatusConfig(item.status);
                  const StatusIcon = statusConfig.icon;
                  return (
                    <tr 
                      key={item.id} 
                      className="animate-fadeInUp"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="align-middle">
                        <span className="font-mono">{item.phone}</span>
                      </td>
                      <td className="align-middle">
                        <div className="text-truncate" style={{ maxWidth: '250px' }} title={item.message}>
                          {item.message}
                        </div>
                      </td>
                      <td className="align-middle">
                        <span className={`d-inline-flex align-items-center px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bgClass} ${statusConfig.class}`}>
                          <StatusIcon size={12} className="me-1" />
                          {statusConfig.text}
                        </span>
                      </td>
                      <td className="align-middle text-nowrap text-muted">
                        {formatDate(item.createdAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {history.length > 0 && (
        <div className="card-footer bg-light">
          <div className="d-flex justify-content-between text-muted small">
            <span>共 {history.length} 条记录</span>
            <span>最后更新: {new Date().toLocaleString('zh-CN')}</span>
          </div>
        </div>
      )}
    </div>
  );
}
