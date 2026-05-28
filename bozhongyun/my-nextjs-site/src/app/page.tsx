import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SendSMSForm from '@/components/sms/SendSMSForm'
import SMSHistory from '@/components/sms/SMSHistory'
import { 
  FiZap, 
  FiGlobe, 
  FiShield, 
  FiActivity,
  FiCheckCircle,
  FiMessageSquare,
  FiTrendingUp,
  FiArrowRight,
  FiSend
} from 'react-icons/fi'

export const metadata: Metadata = {
  title: '短信服务平台 - 首页',
  description: '企业级短信发送服务，支持模板管理和发送历史',
}

const features = [
  { 
    icon: FiZap, 
    title: '快速发送', 
    desc: '高速短信通道，秒级到达',
    image: '/images/index/a-light.png'
  },
  { 
    icon: FiGlobe, 
    title: '全国覆盖', 
    desc: '支持三大运营商，全国覆盖',
    image: '/images/index/b-light.png'
  },
  { 
    icon: FiShield, 
    title: '安全稳定', 
    desc: '企业级安全保障，服务稳定',
    image: '/images/index/c-light.png'
  },
  { 
    icon: FiActivity, 
    title: '实时监控', 
    desc: '发送状态实时追踪，历史记录完整',
    image: '/images/index/d-light.png'
  },
  { 
    icon: FiMessageSquare, 
    title: '模板管理', 
    desc: '丰富的短信模板，支持自定义编辑',
    image: '/images/index/e-light.png'
  },
  { 
    icon: FiTrendingUp, 
    title: '数据分析', 
    desc: '详细的数据报表，助力业务决策',
    image: '/images/index/f-light.png'
  },
]

const stats = [
  { number: '1000万+', label: '短信发送量' },
  { number: '99.9%', label: '到达成功率' },
  { number: '500+', label: '企业客户' },
  { number: '24/7', label: '技术支持' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero 区域 - 参照 promo-1.png 样式 */}
      <section className="position-relative overflow-hidden mb-6" 
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '0 0 50px 50px',
          marginTop: '-20px',
          paddingTop: '60px'
        }}>
        {/* 背景装饰 */}
        <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden" style={{ pointerEvents: 'none' }}>
          <div className="position-absolute rounded-circle" 
            style={{
              width: '300px', height: '300px', 
              background: 'rgba(255,255,255,0.1)',
              top: '-100px', right: '-50px'
            }} />
          <div className="position-absolute rounded-circle" 
            style={{
              width: '200px', height: '200px',
              background: 'rgba(255,255,255,0.08)',
              bottom: '50px', left: '10%'
            }} />
        </div>

        <div className="container position-relative">
          <div className="row align-items-center g-5">
            {/* 左侧文字内容 */}
            <div className="col-lg-6 text-white">
              <div className="animate-fadeInUp">
                <span className="badge bg-white bg-opacity-20 text-white px-3 py-2 mb-3 rounded-pill fw-normal">
                  <FiZap size={14} className="me-1" /> 企业级短信服务平台
                </span>
                <h1 className="display-5 fw-bold mb-4 lh-base" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                  快速、稳定、安全的
                  <br />
                  <span style={{ color: '#ffd700' }}>短信解决方案</span>
                </h1>
                <p className="lead mb-5 opacity-90" style={{ fontSize: '1.1rem' }}>
                  助力企业数字化转型，支持验证码、通知、营销等全场景短信服务
                </p>
                <div className="d-flex gap-3 flex-wrap">
                  <Link href="#sms-form" className="btn btn-light btn-lg px-4 fw-medium d-inline-flex align-items-center">
                    <FiSend className="me-2" />
                    立即发送
                  </Link>
                  <button className="btn btn-outline-light btn-lg px-4 fw-medium d-inline-flex align-items-center">
                    了解更多
                    <FiArrowRight className="ms-2" />
                  </button>
                </div>
              </div>
            </div>

            {/* 右侧图片展示 */}
            <div className="col-lg-6">
              <div className="position-relative animate-float">
                {/* 主展示图 */}
                <div className="position-relative">
                  <Image 
                    src="/images/header/promo-1.png" 
                    alt="短信平台功能展示" 
                    width={600} 
                    height={450}
                    className="img-fluid rounded-4 shadow-lg"
                    style={{ 
                      objectFit: 'cover',
                      border: '4px solid rgba(255,255,255,0.2)'
                    }}
                    priority
                  />
                  
                  {/* 悬浮卡片 - 发送成功 */}
                  <div className="position-absolute bg-white rounded-3 shadow-lg p-3 animate-fadeInUp" 
                    style={{ 
                      bottom: '-20px', 
                      left: '-20px',
                      animationDelay: '0.3s'
                    }}>
                    <div className="d-flex align-items-center gap-2">
                      <div className="bg-success bg-opacity-10 rounded-circle p-2">
                        <FiCheckCircle size={24} className="text-success" />
                      </div>
                      <div>
                        <div className="fw-bold small">发送成功</div>
                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>138****8888 已送达</div>
                      </div>
                    </div>
                  </div>

                  {/* 悬浮卡片 - 统计数据 */}
                  <div className="position-absolute bg-white rounded-3 shadow-lg p-3" 
                    style={{ 
                      top: '20px', 
                      right: '-30px',
                      animationDelay: '0.5s'
                    }}>
                    <div className="d-flex align-items-center gap-2">
                      <div className="bg-primary bg-opacity-10 rounded-circle p-2">
                        <FiActivity size={24} className="text-primary" />
                      </div>
                      <div>
                        <div className="fw-bold small">实时监控</div>
                        <div className="text-success" style={{ fontSize: '0.75rem' }}>99.9% 到达率</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部波浪装饰 */}
        <div className="position-absolute bottom-0 start-0 w-100">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* 统计数据 */}
      <section className="mb-6 mt-5">
        <div className="row g-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="col-6 col-lg-3">
              <div className="card h-100 text-center shadow-sm hover-shadow animate-fadeInUp" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="card-body py-4">
                  <div className="h2 fw-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted fw-medium">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 功能特性 */}
      <section className="mb-6">
        <div className="text-center mb-5">
          <h2 className="h1 fw-bold mb-3">我们的核心优势</h2>
          <p className="text-muted lead">为您提供全方位的短信服务解决方案</p>
        </div>
        <div className="row g-4">
          {features.map((feature, idx) => (
            <div key={idx} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm hover-shadow animate-fadeInUp" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="card-body p-4">
                  <div className="mb-3">
                    <Image 
                      src={feature.image} 
                      alt={feature.title}
                      width={60}
                      height={60}
                      className="mb-3"
                    />
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <feature.icon size={24} className="text-primary me-2" />
                    <h5 className="card-title mb-0 fw-bold">{feature.title}</h5>
                  </div>
                  <p className="card-text text-muted mb-0">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 短信功能区域 */}
      <section className="mb-6" id="sms-form">
        <div className="text-center mb-5">
          <h2 className="h1 fw-bold mb-3">开始使用短信服务</h2>
          <p className="text-muted lead">简单几步，即可发送您的第一条短信</p>
        </div>
        <div className="row g-4">
          <div className="col-12 col-lg-5">
            <div className="animate-fadeInUp animation-delay-200">
              <SendSMSForm />
            </div>
          </div>
          <div className="col-12 col-lg-7">
            <div className="animate-fadeInUp animation-delay-300">
              <SMSHistory />
            </div>
          </div>
        </div>
      </section>

      {/* 特色展示 */}
      <section className="mb-6">
        <div className="card shadow-sm overflow-hidden border-0">
          <div className="row g-0 align-items-center">
            <div className="col-lg-6 p-5 p-lg-6">
              <div className="animate-fadeInUp">
                <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 mb-3 rounded-pill">
                  智能管理
                </span>
                <h2 className="h2 fw-bold mb-4">智能短信管理</h2>
                <ul className="list-unstyled mb-4">
                  <li className="d-flex align-items-start mb-3">
                    <FiCheckCircle size={20} className="text-success me-3 mt-1 flex-shrink-0" />
                    <span>可视化操作界面，简单易用</span>
                  </li>
                  <li className="d-flex align-items-start mb-3">
                    <FiCheckCircle size={20} className="text-success me-3 mt-1 flex-shrink-0" />
                    <span>批量发送，效率提升10倍</span>
                  </li>
                  <li className="d-flex align-items-start mb-3">
                    <FiCheckCircle size={20} className="text-success me-3 mt-1 flex-shrink-0" />
                    <span>实时状态追踪，安心无忧</span>
                  </li>
                  <li className="d-flex align-items-start">
                    <FiCheckCircle size={20} className="text-success me-3 mt-1 flex-shrink-0" />
                    <span>详细数据报表，助力决策</span>
                  </li>
                </ul>
                <Link href="/analytics" className="btn btn-primary d-inline-flex align-items-center">
                  查看数据分析
                  <FiArrowRight className="ms-2" />
                </Link>
              </div>
            </div>
            <div className="col-lg-6 p-4 bg-light">
              <div className="text-center">
                <Image 
                  src="/images/index/dashboard.png" 
                  alt="Dashboard"
                  width={500}
                  height={350}
                  className="img-fluid rounded shadow-sm animate-float"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 信任我们的客户 */}
      <section className="mb-6">
        <div className="card shadow-sm border-0">
          <div className="card-body p-5 p-lg-6">
            <div className="text-center mb-5">
              <h2 className="h2 fw-bold mb-2">值得信赖的合作伙伴</h2>
              <p className="text-muted">众多企业选择我们的短信服务</p>
            </div>
            <div className="row g-4 align-items-center justify-content-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="col-6 col-md-4 col-lg-2 text-center">
                  <div className="p-3 bg-light rounded-3 animate-pulse" style={{ animationDelay: `${i * 100}ms` }}>
                    <Image 
                      src={`/images/index/flag-${i}.png`}
                      alt={`Partner ${i}`}
                      width={80}
                      height={50}
                      className="opacity-75"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 底部 CTA */}
      <section className="mb-6">
        <div className="card bg-primary text-white shadow-lg" 
          style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20px'
          }}>
          <div className="card-body text-center py-5">
            <h2 className="h2 fw-bold mb-3">准备好开始了吗？</h2>
            <p className="lead mb-4 opacity-90">立即注册，开始使用我们的短信服务</p>
            <Link href="#sms-form" className="btn btn-light btn-lg px-5 fw-medium d-inline-flex align-items-center">
              <FiSend className="me-2" />
              立即体验
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
