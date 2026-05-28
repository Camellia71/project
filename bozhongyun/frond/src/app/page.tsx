'use client'

import { useSelector } from 'react-redux'
import Image from 'next/image'
import { FiArrowRight, FiPlay, FiShield, FiZap, FiGlobe, FiBarChart, FiCheckCircle, FiChevronRight } from 'react-icons/fi'
import type { RootState } from '@/store'
import { APP_NAME } from '@/config/navigation'

export default function HomePage() {
  const statistics = useSelector((state: RootState) => state.sms.statistics)

  const features = [
    {
      icon: FiZap,
      title: '快速发送',
      description: '毫秒级响应，实时送达，支持大批量短信发送',
      image: '/images/index/a-light.png',
    },
    {
      icon: FiGlobe,
      title: '全国覆盖',
      description: '覆盖全国31省市，支持三网合一发送',
      image: '/images/index/b-light.png',
    },
    {
      icon: FiShield,
      title: '安全稳定',
      description: '银行级加密传输，99.99%服务可用性',
      image: '/images/index/c-light.png',
    },
    {
      icon: FiBarChart,
      title: '实时监控',
      description: '实时追踪短信状态，详细数据统计分析',
      image: '/images/index/d-light.png',
    },
    {
      icon: FiCheckCircle,
      title: '模板管理',
      description: '灵活的模板管理，快速创建和使用',
      image: '/images/index/e-light.png',
    },
    {
      icon: FiPlay,
      title: '数据分析',
      description: '丰富的数据分析报表，助力业务决策',
      image: '/images/index/f-light.png',
    },
  ]

  const stats = [
    { value: statistics.totalSent.toLocaleString(), label: '累计发送', suffix: '条' },
    { value: statistics.successRate, label: '成功率', suffix: '%' },
    { value: statistics.todaySent.toLocaleString(), label: '今日发送', suffix: '条' },
    { value: statistics.pendingCount, label: '待处理', suffix: '条' },
  ]

  const solutions = [
    { title: '电商行业', description: '订单通知、物流提醒、促销活动' },
    { title: '金融行业', description: '验证码、账户安全、交易提醒' },
    { title: '教育行业', description: '课程通知、考试提醒、家校沟通' },
    { title: '医疗行业', description: '挂号提醒、就诊通知、健康关怀' },
    { title: '企业服务', description: '会议通知、考勤提醒、内部公告' },
    { title: '零售行业', description: '会员营销、活动通知、售后服务' },
  ]

  const faqs = [
    {
      question: '短信发送需要多长时间？',
      answer: '短信发送通常在几秒钟内完成，具体时间取决于运营商网络状况。我们平台采用智能路由技术，确保最快送达。',
    },
    {
      question: '支持哪些类型的短信？',
      answer: '我们支持验证码短信、通知短信、营销短信等多种类型。验证码短信最快可在3秒内送达。',
    },
    {
      question: '如何保证短信的安全性？',
      answer: '我们采用银行级加密传输，数据全程加密存储，通过ISO27001信息安全认证，确保您的数据安全。',
    },
    {
      question: '支持发送到哪些国家？',
      answer: '目前支持中国大陆地区所有运营商号码。国际短信服务正在开发中，即将上线。',
    },
  ]

  const processSteps = [
    { step: '01', title: '注册账号', description: '快速注册，即时开通' },
    { step: '02', title: '配置模板', description: '创建并审核短信模板' },
    { step: '03', title: '充值余额', description: '灵活的充值方式' },
    { step: '04', title: '开始发送', description: '批量发送，实时监控' },
  ]

  return (
    <div className="pt-16">
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        <div className="absolute inset-0 bg-[url('/images/index/dots-row-14.png')] bg-repeat opacity-20"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 py-16 lg:py-24 relative">
          <div className="row align-items-center g-8">
            <div className="col-lg-6 text-white">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
                企业级短信服务
                <span className="block text-yellow-300">高效稳定安全</span>
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-lg">
                专业的短信平台解决方案，助力企业高效触达客户。毫秒级响应，99.99%可用性，覆盖全国所有运营商。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-100 transition-all hover:shadow-lg">
                  免费试用
                  <FiArrowRight className="inline-block w-5 h-5 ml-2" />
                </button>
                <button className="px-8 py-4 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-all backdrop-blur-sm">
                  查看演示
                </button>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="relative">
                <Image
                  src="/images/index/banner-cover.png"
                  alt="短信平台控制台"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                  priority
                />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <FiCheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">短信发送成功</p>
                      <p className="text-sm text-gray-500">刚刚发送了 1,234 条</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="row g-4">
            {stats.map((stat, index) => (
              <div key={index} className="col-6 col-lg-3">
                <div className="text-center p-6">
                  <p className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.value}
                    <span className="text-lg">{stat.suffix}</span>
                  </p>
                  <p className="text-gray-500 mt-2">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              核心功能
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              全方位的短信服务功能，满足企业多样化需求
            </p>
          </div>
          <div className="row g-6">
            {features.map((feature, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-7 h-7 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="row align-items-center g-8">
            <div className="col-lg-5">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                行业解决方案
              </h2>
              <p className="text-gray-500 mb-8">
                深耕各行业，提供定制化短信解决方案，助力企业数字化转型。
              </p>
              <div className="grid grid-cols-2 gap-4">
                {solutions.map((solution, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 transition-colors cursor-pointer"
                  >
                    <h4 className="font-semibold text-gray-800 mb-1">{solution.title}</h4>
                    <p className="text-sm text-gray-500">{solution.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-7">
              <Image
                src="/images/index/dashboard.png"
                alt="Dashboard"
                width={700}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              使用流程
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              简单四步，快速开启短信服务之旅
            </p>
          </div>
          <div className="row g-8">
            {processSteps.map((step, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-3 text-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{step.step}</span>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-white/30"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-white/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              常见问题
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              解答您最关心的问题
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-100 pb-6 mb-6 last:border-0 last:pb-0 last:mb-0">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-sm font-bold text-indigo-600">
                    {index + 1}
                  </span>
                  {faq.question}
                </h3>
                <p className="text-gray-500 pl-10">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 lg:p-12 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              准备好开始了吗？
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              立即注册，免费获得100条测试短信，体验专业的短信服务
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-100 transition-all hover:shadow-lg">
                免费注册
                <FiArrowRight className="inline-block w-5 h-5 ml-2" />
              </button>
              <button className="px-8 py-4 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-all backdrop-blur-sm">
                联系销售
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="row g-8">
            <div className="col-12 col-md-6 col-lg-3">
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/images/header/logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <span className="text-xl font-bold">短信平台</span>
              </div>
              <p className="text-gray-400 text-sm">
                专业的企业级短信服务平台，助力企业高效触达客户。
              </p>
            </div>
            <div className="col-6 col-md-3 col-lg-2">
              <h4 className="font-semibold mb-4">产品服务</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">短信发送</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">模板管理</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">数据分析</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API接口</a></li>
              </ul>
            </div>
            <div className="col-6 col-md-3 col-lg-2">
              <h4 className="font-semibold mb-4">解决方案</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">电商行业</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">金融行业</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">教育行业</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">医疗行业</a></li>
              </ul>
            </div>
            <div className="col-12 col-md-6 col-lg-5">
              <h4 className="font-semibold mb-4">联系我们</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>服务热线：400-888-8888</li>
                <li>商务邮箱：business@smsplatform.com</li>
                <li>工作时间：周一至周五 9:00-18:00</li>
              </ul>
              <div className="mt-4 flex gap-4">
                <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <FiChevronRight className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <FiChevronRight className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <FiChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>2024 短信平台. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
