import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FiTrendingUp, FiActivity, FiBarChart2, FiPieChart, FiArrowRight, FiDownload, FiCalendar } from 'react-icons/fi'

export const metadata: Metadata = {
  title: '数据统计',
  description: '短信发送数据统计',
}

const stats = [
  { label: '今日发送', value: '1,234', change: '+12%', icon: FiTrendingUp, color: 'text-success', trend: 'up' },
  { label: '本周发送', value: '8,567', change: '+8%', icon: FiActivity, color: 'text-primary', trend: 'up' },
  { label: '本月发送', value: '32,890', change: '+15%', icon: FiBarChart2, color: 'text-info', trend: 'up' },
  { label: '到达率', value: '99.2%', change: '+0.3%', icon: FiPieChart, color: 'text-warning', trend: 'up' },
]

const recentActivity = [
  { time: '10:32', phone: '138****8888', content: '验证码模板', status: '成功' },
  { time: '10:28', phone: '139****6666', content: '通知模板', status: '成功' },
  { time: '10:15', phone: '137****5555', content: '营销模板', status: '成功' },
  { time: '09:58', phone: '136****4444', content: '验证码模板', status: '成功' },
  { time: '09:45', phone: '135****3333', content: '通知模板', status: '失败' },
]

export default function AnalyticsPage() {
  return (
    <div className="container-fluid g-0">
      {/* 页面标题 */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1">数据统计</h1>
          <p className="text-muted mb-0">查看短信发送数据报表和分析</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary">
            <FiCalendar className="me-2" />
            选择日期
          </button>
          <button className="btn btn-primary">
            <FiDownload className="me-2" />
            导出报告
          </button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="row g-4 mb-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="col-6 col-lg-3">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <stat.icon size={32} className={stat.color} />
                  <span className={`badge ${stat.trend === 'up' ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="fw-bold mb-1">{stat.value}</h3>
                <p className="text-muted mb-0 small">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 图表区域 */}
      <div className="row g-4 mb-4">
        {/* 发送趋势图 */}
        <div className="col-lg-8">
          <div className="card shadow-sm h-100">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold">发送趋势</h5>
              <div className="btn-group btn-group-sm">
                <button className="btn btn-outline-secondary active">本周</button>
                <button className="btn btn-outline-secondary">本月</button>
                <button className="btn btn-outline-secondary">本年</button>
              </div>
            </div>
            <div className="card-body">
              <div className="text-center py-5">
                <Image 
                  src="/images/index/section-cover-2-a.png" 
                  alt="发送趋势图"
                  width={600}
                  height={300}
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 模板使用分布 */}
        <div className="col-lg-4">
          <div className="card shadow-sm h-100">
            <div className="card-header">
              <h5 className="mb-0 fw-bold">模板使用分布</h5>
            </div>
            <div className="card-body">
              <div className="text-center">
                <Image 
                  src="/images/index/section-cover-2-b.png" 
                  alt="模板使用分布"
                  width={280}
                  height={200}
                  className="img-fluid"
                />
              </div>
              <div className="mt-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="small">验证码模板</span>
                  <span className="badge bg-primary">45%</span>
                </div>
                <div className="progress mb-3" style={{ height: '8px' }}>
                  <div className="progress-bar bg-primary" style={{ width: '45%' }}></div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="small">通知模板</span>
                  <span className="badge bg-success">30%</span>
                </div>
                <div className="progress mb-3" style={{ height: '8px' }}>
                  <div className="progress-bar bg-success" style={{ width: '30%' }}></div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="small">营销模板</span>
                  <span className="badge bg-warning">25%</span>
                </div>
                <div className="progress" style={{ height: '8px' }}>
                  <div className="progress-bar bg-warning" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 第二行图表 */}
      <div className="row g-4 mb-4">
        {/* 运营商分布 */}
        <div className="col-lg-4">
          <div className="card shadow-sm h-100">
            <div className="card-header">
              <h5 className="mb-0 fw-bold">运营商分布</h5>
            </div>
            <div className="card-body">
              <div className="text-center">
                <Image 
                  src="/images/index/section-cover-2-c.png" 
                  alt="运营商分布"
                  width={280}
                  height={180}
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 地区分布 */}
        <div className="col-lg-8">
          <div className="card shadow-sm h-100">
            <div className="card-header">
              <h5 className="mb-0 fw-bold">地区分布 TOP 5</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>排名</th>
                      <th>地区</th>
                      <th>发送量</th>
                      <th>占比</th>
                      <th>趋势</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span className="badge bg-danger">1</span></td>
                      <td>广东省</td>
                      <td>12,345</td>
                      <td>15.2%</td>
                      <td><FiTrendingUp size={16} className="text-success" /></td>
                    </tr>
                    <tr>
                      <td><span className="badge bg-warning">2</span></td>
                      <td>北京市</td>
                      <td>10,234</td>
                      <td>12.6%</td>
                      <td><FiTrendingUp size={16} className="text-success" /></td>
                    </tr>
                    <tr>
                      <td><span className="badge bg-secondary">3</span></td>
                      <td>上海市</td>
                      <td>9,876</td>
                      <td>12.2%</td>
                      <td><FiTrendingUp size={16} className="text-success" /></td>
                    </tr>
                    <tr>
                      <td><span className="badge bg-secondary">4</span></td>
                      <td>浙江省</td>
                      <td>8,765</td>
                      <td>10.8%</td>
                      <td><FiTrendingUp size={16} className="text-success" /></td>
                    </tr>
                    <tr>
                      <td><span className="badge bg-secondary">5</span></td>
                      <td>江苏省</td>
                      <td>7,654</td>
                      <td>9.4%</td>
                      <td><FiTrendingUp size={16} className="text-danger" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 最近发送记录 */}
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">最近发送记录</h5>
          <Link href="/" className="btn btn-link btn-sm text-primary p-0">
            查看全部 <FiArrowRight size={14} className="ms-1" />
          </Link>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="fw-medium">时间</th>
                  <th className="fw-medium">手机号</th>
                  <th className="fw-medium">模板</th>
                  <th className="fw-medium">状态</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((item, idx) => (
                  <tr key={idx}>
                    <td className="text-nowrap">{item.time}</td>
                    <td className="font-monospace">{item.phone}</td>
                    <td>{item.content}</td>
                    <td>
                      <span className={`badge ${item.status === '成功' ? 'bg-success' : 'bg-danger'}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
