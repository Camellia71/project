'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { FiTrendingUp, FiTrendingDown, FiUsers, FiMessageSquare, FiClock, FiCalendar } from 'react-icons/fi'
import type { RootState } from '@/store'

export default function AnalyticsPage() {
  const statistics = useSelector((state: RootState) => state.sms.statistics)
  const [timeRange, setTimeRange] = useState('7days')

  const timeRanges = [
    { value: 'today', label: '今日' },
    { value: '7days', label: '近7天' },
    { value: '30days', label: '近30天' },
    { value: '90days', label: '近90天' },
  ]

  const chartData = [
    { day: '周一', sent: 1200, success: 1180, failed: 20 },
    { day: '周二', sent: 1500, success: 1485, failed: 15 },
    { day: '周三', sent: 1800, success: 1782, failed: 18 },
    { day: '周四', sent: 1300, success: 1287, failed: 13 },
    { day: '周五', sent: 2000, success: 1980, failed: 20 },
    { day: '周六', sent: 800, success: 792, failed: 8 },
    { day: '周日', sent: 600, success: 594, failed: 6 },
  ]

  const topSenders = [
    { name: '张三', count: 3500, rate: 99.5 },
    { name: '李四', count: 2800, rate: 98.8 },
    { name: '王五', count: 2100, rate: 99.2 },
    { name: '赵六', count: 1800, rate: 99.0 },
    { name: '钱七', count: 1500, rate: 98.5 },
  ]

  const maxSent = Math.max(...chartData.map(d => d.sent))

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">数据分析</h1>
            <p className="text-gray-500 mt-1">查看短信发送数据统计</p>
          </div>
          <div className="flex items-center gap-2">
            <FiCalendar className="w-5 h-5 text-gray-400" />
            <div className="flex bg-gray-100 rounded-lg p-1">
              {timeRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setTimeRange(range.value)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    timeRange === range.value
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">总发送量</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {statistics.totalSent.toLocaleString()}
                </p>
                <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                  <FiTrendingUp className="w-4 h-4" />
                  +12.5% 较上周
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FiMessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">成功率</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {statistics.successRate}%
                </p>
                <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                  <FiTrendingUp className="w-4 h-4" />
                  +0.5% 较上周
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FiTrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">今日发送</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {statistics.todaySent.toLocaleString()}
                </p>
                <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                  <FiTrendingUp className="w-4 h-4" />
                  +8.3% 较昨日
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <FiClock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">活跃用户</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">1,234</p>
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <FiTrendingDown className="w-4 h-4" />
                  -2.1% 较上周
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <FiUsers className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">发送趋势</h3>
            <div className="flex items-end justify-between h-64 gap-4">
              {chartData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col gap-2 items-end mb-2">
                    <div className="w-full h-48 relative">
                      <div
                        className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg transition-all"
                        style={{ height: `${(data.sent / maxSent) * 100}%` }}
                      />
                      <div
                        className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-green-500 to-green-300 rounded-t-lg transition-all"
                        style={{ height: `${(data.success / maxSent) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{data.sent}</span>
                  </div>
                  <span className="text-sm text-gray-600">{data.day}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">发送量</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">成功量</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Top 发送用户</h3>
            <div className="space-y-4">
              {topSenders.map((sender, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 ? 'bg-yellow-100 text-yellow-700' :
                    index === 1 ? 'bg-gray-100 text-gray-700' :
                    index === 2 ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-50 text-gray-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{sender.name}</p>
                    <p className="text-sm text-gray-500">{sender.count.toLocaleString()} 条</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${sender.rate >= 99 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {sender.rate}%
                    </p>
                    <p className="text-xs text-gray-500">成功率</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
