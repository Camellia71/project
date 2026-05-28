import { Metadata } from 'next'
import Image from 'next/image'
import { FiUsers, FiUserPlus, FiSearch, FiEdit2, FiTrash2, FiDownload, FiPhone, FiMail, FiTag } from 'react-icons/fi'

export const metadata: Metadata = {
  title: '联系人',
  description: '联系人管理',
}

const contacts = [
  { id: 1, name: '张三', phone: '13800138001', email: 'zhangsan@example.com', group: 'VIP客户', status: 'active' },
  { id: 2, name: '李四', phone: '13800138002', email: 'lisi@example.com', group: '普通客户', status: 'active' },
  { id: 3, name: '王五', phone: '13800138003', email: 'wangwu@example.com', group: 'VIP客户', status: 'active' },
  { id: 4, name: '赵六', phone: '13800138004', email: 'zhaoliu@example.com', group: '潜在客户', status: 'inactive' },
  { id: 5, name: '钱七', phone: '13800138005', email: 'qianqi@example.com', group: '普通客户', status: 'active' },
  { id: 6, name: '孙八', phone: '13800138006', email: 'sunba@example.com', group: 'VIP客户', status: 'active' },
]

const groups = ['全部', 'VIP客户', '普通客户', '潜在客户']

export default function ContactsPage() {
  return (
    <div className="container-fluid g-0">
      {/* 页面标题 */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1">联系人管理</h1>
          <p className="text-muted mb-0">管理您的客户联系人，支持分组和批量操作</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary">
            <FiDownload className="me-2" />
            导入
          </button>
          <button className="btn btn-primary">
            <FiUserPlus className="me-2" />
            添加联系人
          </button>
        </div>
      </div>

      {/* 功能介绍 */}
      <div className="card shadow-sm mb-4 border-0 overflow-hidden">
        <div className="row g-0 align-items-center">
          <div className="col-lg-5 p-4 bg-light">
            <div className="text-center">
              <Image 
                src="/images/index/section-cover-1-a.png" 
                alt="联系人管理"
                width={300}
                height={180}
                className="img-fluid rounded-3"
              />
            </div>
          </div>
          <div className="col-lg-7 p-4 p-lg-5">
            <div className="d-flex align-items-center mb-3">
              <div className="bg-primary bg-opacity-10 rounded-3 p-3 me-3">
                <FiUsers size={32} className="text-primary" />
              </div>
              <div>
                <h4 className="mb-1 fw-bold">联系人管理</h4>
                <p className="text-muted mb-0">高效管理您的客户资源</p>
              </div>
            </div>
            <div className="row g-3">
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <span className="badge bg-success bg-opacity-10 text-success me-2">
                    <FiTag size={12} />
                  </span>
                  <span className="small">分组管理</span>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <span className="badge bg-success bg-opacity-10 text-success me-2">
                    <FiTag size={12} />
                  </span>
                  <span className="small">批量导入导出</span>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <span className="badge bg-success bg-opacity-10 text-success me-2">
                    <FiTag size={12} />
                  </span>
                  <span className="small">快速搜索</span>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <span className="badge bg-success bg-opacity-10 text-success me-2">
                    <FiTag size={12} />
                  </span>
                  <span className="small">一键发送</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            <div className="col-md-6">
              <div className="position-relative">
                <FiSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="搜索联系人姓名、手机号..."
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex gap-2 justify-content-md-end">
                {groups.map((group, idx) => (
                  <button 
                    key={group} 
                    className={`btn ${idx === 0 ? 'btn-primary' : 'btn-outline-secondary'} btn-sm`}
                  >
                    {group}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 联系人列表 */}
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center py-3">
          <span className="text-muted">共 {contacts.length} 个联系人</span>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="selectAll" />
            <label className="form-check-label small" htmlFor="selectAll">
              全选
            </label>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="fw-medium" style={{ width: '40px' }}></th>
                  <th className="fw-medium">姓名</th>
                  <th className="fw-medium">手机号</th>
                  <th className="fw-medium">邮箱</th>
                  <th className="fw-medium">分组</th>
                  <th className="fw-medium">状态</th>
                  <th className="fw-medium text-end">操作</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td>
                      <input className="form-check-input" type="checkbox" />
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                          <FiUsers size={20} className="text-primary" />
                        </div>
                        <span className="fw-medium">{contact.name}</span>
                      </div>
                    </td>
                    <td className="font-monospace">
                      <div className="d-flex align-items-center">
                        <FiPhone size={14} className="text-muted me-2" />
                        {contact.phone}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center text-muted">
                        <FiMail size={14} className="me-2" />
                        <span className="small">{contact.email}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${
                        contact.group === 'VIP客户' ? 'bg-warning bg-opacity-10 text-warning' :
                        contact.group === '普通客户' ? 'bg-primary bg-opacity-10 text-primary' :
                        'bg-secondary bg-opacity-10 text-secondary'
                      }`}>
                        {contact.group}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${
                        contact.status === 'active' ? 'bg-success' : 'bg-secondary'
                      }`}>
                        {contact.status === 'active' ? '活跃' : '未活跃'}
                      </span>
                    </td>
                    <td className="text-end">
                      <div className="btn-group">
                        <button className="btn btn-outline-secondary btn-sm" title="编辑">
                          <FiEdit2 size={16} />
                        </button>
                        <button className="btn btn-outline-danger btn-sm" title="删除">
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer bg-light">
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-muted small">已选择 0 项</span>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-danger btn-sm">批量删除</button>
              <button className="btn btn-primary btn-sm">批量发送短信</button>
            </div>
          </div>
        </div>
      </div>

      {/* 分页 */}
      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination mb-0">
            <li className="page-item disabled">
              <a className="page-link" href="#">上一页</a>
            </li>
            <li className="page-item active">
              <a className="page-link" href="#">1</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">2</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">3</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">下一页</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
