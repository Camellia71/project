import { Metadata } from 'next'
import Image from 'next/image'
import { FiPlus, FiEdit2, FiTrash2, FiCopy, FiCheck, FiFileText } from 'react-icons/fi'

export const metadata: Metadata = {
  title: '模板管理',
  description: '短信模板管理',
}

const templates = [
  { id: 1, name: '验证码', content: '您的验证码是：{code}，请在5分钟内使用。', category: '验证码', usage: 1234 },
  { id: 2, name: '营销', content: '尊敬的客户，感谢您的支持！', category: '营销', usage: 856 },
  { id: 3, name: '通知', content: '您好，您的订单已发货，请注意查收。', category: '通知', usage: 2341 },
  { id: 4, name: '预约提醒', content: '您好，您预约的服务将于{time}开始，请准时到达。', category: '提醒', usage: 567 },
  { id: 5, name: '活动邀请', content: '【{activity}】活动即将开始，诚邀您的参与！', category: '营销', usage: 423 },
  { id: 6, name: '账户变动', content: '您的账户发生变动：{detail}，如有疑问请联系客服。', category: '通知', usage: 789 },
]

const categories = ['全部', '验证码', '营销', '通知', '提醒']

export default function TemplatesPage() {
  return (
    <div className="container-fluid g-0">
      {/* 页面标题区 */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1">模板管理</h1>
          <p className="text-muted mb-0">管理您的短信模板，支持创建、编辑和删除</p>
        </div>
        <button className="btn btn-primary">
          <FiPlus className="me-2" />
          新建模板
        </button>
      </div>

      {/* 功能介绍区 */}
      <div className="card shadow-sm mb-4 border-0 overflow-hidden">
        <div className="row g-0 align-items-center">
          <div className="col-lg-7 p-4 p-lg-5">
            <div className="d-flex align-items-center mb-3">
              <div className="bg-primary bg-opacity-10 rounded-3 p-3 me-3">
                <FiFileText size={32} className="text-primary" />
              </div>
              <div>
                <h4 className="mb-1 fw-bold">智能模板管理</h4>
                <p className="text-muted mb-0">快速创建和管理您的短信模板</p>
              </div>
            </div>
            <div className="row g-3">
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <FiCheck size={16} className="text-success me-2" />
                  <span className="small">可视化编辑</span>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <FiCheck size={16} className="text-success me-2" />
                  <span className="small">变量替换</span>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <FiCheck size={16} className="text-success me-2" />
                  <span className="small">分类管理</span>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <FiCheck size={16} className="text-success me-2" />
                  <span className="small">一键复制</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 p-4 bg-light">
            <div className="text-center">
              <Image 
                src="/images/index/section-cover-1.png" 
                alt="模板管理"
                width={350}
                height={200}
                className="img-fluid rounded-3"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 分类筛选 */}
      <div className="d-flex gap-2 mb-4 flex-wrap">
        {categories.map((cat, idx) => (
          <button 
            key={cat} 
            className={`btn ${idx === 0 ? 'btn-primary' : 'btn-outline-secondary'} btn-sm`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 模板列表 */}
      <div className="row g-4">
        {templates.map((template) => (
          <div key={template.id} className="col-md-6 col-lg-4">
            <div className="card shadow-sm h-100">
              <div className="card-header d-flex justify-content-between align-items-center py-3">
                <div className="d-flex align-items-center">
                  <span className="badge bg-primary bg-opacity-10 text-primary me-2">
                    {template.category}
                  </span>
                  <h5 className="mb-0 fw-bold">{template.name}</h5>
                </div>
                <div className="dropdown">
                  <button className="btn btn-link text-muted p-0" data-bs-toggle="dropdown">
                    <FiEdit2 size={18} />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button className="dropdown-item d-flex align-items-center">
                        <FiEdit2 className="me-2" size={16} /> 编辑
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item d-flex align-items-center">
                        <FiCopy className="me-2" size={16} /> 复制
                      </button>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item d-flex align-items-center text-danger">
                        <FiTrash2 className="me-2" size={16} /> 删除
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-body">
                <div className="bg-light rounded-3 p-3 mb-3">
                  <p className="mb-0 text-secondary small font-monospace" style={{ wordBreak: 'break-all' }}>
                    {template.content}
                  </p>
                </div>
                <div className="d-flex justify-content-between text-muted small">
                  <span>使用次数：{template.usage.toLocaleString()}</span>
                  <button className="btn btn-link btn-sm text-primary p-0">
                    <FiCopy className="me-1" size={14} /> 复制
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 分页 */}
      <div className="d-flex justify-content-center mt-5">
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
