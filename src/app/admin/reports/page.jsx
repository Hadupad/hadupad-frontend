'use client';

import { useState } from 'react';
import { Download, TrendingUp, Users, DollarSign, BarChart3, PieChart, Activity } from 'lucide-react';

export default function AdminReports() {
  const [selectedYear, setSelectedYear] = useState('2025');

  // Mock data for charts
  const monthlyData = [
    { month: 'Jan', listings: 220, bookings: 180 },
    { month: 'Feb', listings: 260, bookings: 220 },
    { month: 'Mar', listings: 200, bookings: 160 },
    { month: 'Apr', listings: 340, bookings: 280 },
    { month: 'May', listings: 380, bookings: 320 },
    { month: 'Jun', listings: 360, bookings: 300 },
    { month: 'Jul', listings: 320, bookings: 260 },
    { month: 'Aug', listings: 280, bookings: 220 },
    { month: 'Sep', listings: 400, bookings: 340 },
    { month: 'Oct', listings: 420, bookings: 360 },
    { month: 'Nov', listings: 380, bookings: 320 },
    { month: 'Dec', listings: 460, bookings: 400 }
  ];

  const profitData = [
    { month: 'Jan', profit: 180000 },
    { month: 'Feb', profit: 220000 },
    { month: 'Mar', profit: 160000 },
    { month: 'Apr', profit: 280000 },
    { month: 'May', profit: 320000 },
    { month: 'Jun', profit: 300000 },
    { month: 'Jul', profit: 260000 },
    { month: 'Aug', profit: 220000 },
    { month: 'Sep', profit: 340000 },
    { month: 'Oct', profit: 360000 },
    { month: 'Nov', profit: 320000 },
    { month: 'Dec', profit: 400000 }
  ];

  const maxValue = Math.max(...monthlyData.map(d => Math.max(d.listings, d.bookings)));
  const maxProfit = Math.max(...profitData.map(d => d.profit));

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Reports</h1>
        </div>
        <button className="flex items-center gap-2 px-3 md:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Download Report</span>
        </button>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden space-y-6">
        {/* Listings in the year - Mobile */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Listings in the year</h3>
              <p className="text-xs text-gray-500">1024 Listings</p>
            </div>
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-xs bg-red-50 text-red-600"
            >
              <option value="2025">2025</option>
            </select>
          </div>
          
          {/* Mobile Bar Chart */}
          <div className="h-48 flex items-end justify-between gap-1 mb-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="flex items-end gap-0.5 h-32 w-full justify-center">
                  <div 
                    className="bg-red-500 rounded-t w-2"
                    style={{ height: `${(data.listings / maxValue) * 100}%` }}
                  ></div>
                  <div 
                    className="bg-gray-800 rounded-t w-2"
                    style={{ height: `${(data.bookings / maxValue) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 mt-1">{data.month}</span>
              </div>
            ))}
          </div>

          {/* Mobile Stats */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t text-center">
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <Users className="w-3 h-3 text-red-500" />
                <span className="text-xs font-medium">Total Guests</span>
              </div>
              <p className="text-sm font-bold">10,508</p>
              <p className="text-xs text-green-600">↑ 5%</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <Activity className="w-3 h-3 text-red-500" />
                <span className="text-xs font-medium">Total Views</span>
              </div>
              <p className="text-sm font-bold">10,508</p>
              <p className="text-xs text-green-600">↑ 5%</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="w-3 h-3 text-red-500" />
                <span className="text-xs font-medium">Super Host</span>
              </div>
              <p className="text-sm font-bold">Faith Oyeniyi</p>
              <p className="text-xs text-green-600">↑ 5%</p>
            </div>
          </div>
        </div>

        {/* Outgoing Payments - Mobile */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Outgoing</h3>
              <p className="text-xs text-gray-500">Payments</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
              </svg>
            </button>
          </div>

          {/* Mobile Donut Chart */}
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#f3f4f6"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3"
                  strokeDasharray="60, 100"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#374151"
                  strokeWidth="3"
                  strokeDasharray="25, 100"
                  strokeDashoffset="-60"
                />
              </svg>
            </div>
          </div>

          {/* Mobile Legend */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
              <span>GUESTS (60%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>HOSTS (40%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span>SERVICES (15%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <span>OTHERS (10%)</span>
            </div>
          </div>
        </div>

        {/* Mobile Metric Cards Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-xs font-medium text-gray-600 mb-2">Sales Account</h3>
            <p className="text-lg font-bold text-gray-900">$192,065</p>
            <p className="text-xs text-gray-500 mb-2">$192,000 last year</p>
            <p className="text-xs text-green-600">↑ 3%</p>
            <div className="h-8 flex items-center mt-2">
              <svg className="w-full h-full" viewBox="0 0 60 20">
                <polyline fill="none" stroke="#ef4444" strokeWidth="1.5" points="0,15 12,12 24,10 36,8 48,6 60,4"/>
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-xs font-medium text-gray-600 mb-2">Churn Rate</h3>
            <p className="text-lg font-bold text-gray-900">$192,065</p>
            <p className="text-xs text-gray-500 mb-2">$192,000 last year</p>
            <p className="text-xs text-green-600">↑ 3%</p>
            <div className="h-8 flex items-center mt-2">
              <svg className="w-full h-full" viewBox="0 0 60 20">
                <polyline fill="none" stroke="#ef4444" strokeWidth="1.5" points="0,12 12,10 24,8 36,10 48,8 60,6"/>
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-xs font-medium text-gray-600 mb-2">General Leads</h3>
            <p className="text-lg font-bold text-gray-900">$192,065</p>
            <p className="text-xs text-gray-500 mb-2">$192,000 last year</p>
            <p className="text-xs text-green-600">↑ 3%</p>
            <div className="h-8 flex items-center mt-2">
              <svg className="w-full h-full" viewBox="0 0 60 20">
                <polyline fill="none" stroke="#ef4444" strokeWidth="1.5" points="0,16 12,14 24,12 36,10 48,8 60,6"/>
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-xs font-medium text-gray-600 mb-2">Returning users</h3>
            <p className="text-lg font-bold text-gray-900">$192,065</p>
            <p className="text-xs text-gray-500 mb-2">$192,000 last year</p>
            <p className="text-xs text-green-600">↑ 3%</p>
            <div className="h-8 flex items-center mt-2">
              <svg className="w-full h-full" viewBox="0 0 60 20">
                <polyline fill="none" stroke="#ef4444" strokeWidth="1.5" points="0,14 12,12 24,10 36,8 48,6 60,4"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Mobile Profit Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">Profit</h3>
            <select className="border border-gray-300 rounded px-2 py-1 text-xs bg-red-50 text-red-600">
              <option>2025</option>
            </select>
          </div>
          <div className="mb-4">
            <p className="text-xl font-bold text-gray-900">$1,068,900</p>
            <p className="text-xs text-green-600">↑ 3%</p>
          </div>
          
          {/* Mobile Profit Bar Chart */}
          <div className="h-32 flex items-end justify-between gap-1">
            {profitData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="flex items-end gap-0.5 h-24 w-full justify-center">
                  <div 
                    className="bg-red-500 rounded-t w-2"
                    style={{ height: `${(data.profit / maxProfit) * 100}%` }}
                  ></div>
                  <div 
                    className="bg-gray-800 rounded-t w-2"
                    style={{ height: `${((data.profit * 0.7) / maxProfit) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 mt-1">{data.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Listings in the year - Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Listings in the year</h3>
              <p className="text-sm text-gray-500">1024 Listings</p>
            </div>
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm bg-red-50 text-red-600"
            >
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>
          
          {/* Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-2 mb-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="flex items-end gap-1 h-48 w-full justify-center">
                  <div 
                    className="bg-red-500 rounded-t w-3"
                    style={{ height: `${(data.listings / maxValue) * 100}%` }}
                  ></div>
                  <div 
                    className="bg-gray-800 rounded-t w-3"
                    style={{ height: `${(data.bookings / maxValue) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 mt-2">{data.month}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-red-500" />
              <div>
                <p className="text-sm font-medium">Total Guests</p>
                <p className="text-lg font-bold">10,508</p>
                <p className="text-xs text-green-600">↑ 5%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-red-500" />
              <div>
                <p className="text-sm font-medium">Total Views</p>
                <p className="text-lg font-bold">10,508</p>
                <p className="text-xs text-green-600">↑ 5%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-red-500" />
              <div>
                <p className="text-sm font-medium">Super Host</p>
                <p className="text-lg font-bold">Faith Oyeniyi</p>
                <p className="text-xs text-green-600">↑ 5%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Outgoing Payments - Donut Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Outgoing</h3>
              <p className="text-sm text-gray-500">Payments</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
              </svg>
            </button>
          </div>

          {/* Donut Chart */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#f3f4f6"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3"
                  strokeDasharray="60, 100"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#374151"
                  strokeWidth="3"
                  strokeDasharray="25, 100"
                  strokeDashoffset="-60"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="3"
                  strokeDasharray="15, 100"
                  strokeDashoffset="-85"
                />
              </svg>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                <span className="text-sm">GUESTS (60%)</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm">HOSTS (40%)</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span className="text-sm">SERVICES (15%)</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span className="text-sm">OTHERS (10%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row - Profit Cards and Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Profit Card with Bar Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Profit</h3>
            <select className="text-xs border border-gray-300 rounded px-2 py-1 bg-red-50 text-red-600">
              <option>2025</option>
            </select>
          </div>
          <div className="mb-4">
            <p className="text-2xl font-bold text-gray-900">$1,068,900</p>
            <p className="text-sm text-green-600">↑ 3%</p>
          </div>
          {/* Mini Bar Chart */}
          <div className="h-16 flex items-end justify-between gap-1">
            {profitData.slice(0, 12).map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="bg-red-500 rounded-t w-full"
                  style={{ height: `${(data.profit / maxProfit) * 100}%` }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Profit Trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-4">Profit</h3>
          <div className="mb-4">
            <p className="text-2xl font-bold text-gray-900">$192,065</p>
            <p className="text-sm text-gray-500">$192,000 last year</p>
            <p className="text-sm text-green-600">↑ 3%</p>
          </div>
          {/* Trend Line */}
          <div className="h-16 flex items-center">
            <svg className="w-full h-full" viewBox="0 0 100 40">
              <polyline
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                points="0,30 20,25 40,20 60,15 80,10 100,5"
              />
            </svg>
          </div>
        </div>

        {/* General Leads */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-4">General Leads</h3>
          <div className="mb-4">
            <p className="text-2xl font-bold text-gray-900">$192,065</p>
            <p className="text-sm text-gray-500">$192,000 last year</p>
            <p className="text-sm text-green-600">↑ 3%</p>
          </div>
          {/* Trend Line */}
          <div className="h-16 flex items-center">
            <svg className="w-full h-full" viewBox="0 0 100 40">
              <polyline
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                points="0,35 20,30 40,25 60,20 80,15 100,10"
              />
            </svg>
          </div>
        </div>

        {/* Churn Rate */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-4">Churn rate</h3>
          <div className="mb-4">
            <p className="text-2xl font-bold text-gray-900">$192,065</p>
            <p className="text-sm text-gray-500">$192,000 last year</p>
            <p className="text-sm text-green-600">↑ 3%</p>
          </div>
          {/* Trend Line */}
          <div className="h-16 flex items-center">
            <svg className="w-full h-full" viewBox="0 0 100 40">
              <polyline
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                points="0,20 20,25 40,30 60,25 80,20 100,15"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Second Row - Profit Bar Chart and Returning Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profit Bar Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Profit</h3>
            <select className="border border-gray-300 rounded px-3 py-1 text-sm bg-red-50 text-red-600">
              <option>2025</option>
            </select>
          </div>
          
          {/* Bar Chart */}
          <div className="h-48 flex items-end justify-between gap-2">
            {profitData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="flex items-end gap-1 h-40 w-full justify-center">
                  <div 
                    className="bg-red-500 rounded-t w-4"
                    style={{ height: `${(data.profit / maxProfit) * 100}%` }}
                  ></div>
                  <div 
                    className="bg-gray-800 rounded-t w-4"
                    style={{ height: `${((data.profit * 0.7) / maxProfit) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 mt-2">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Returning Users */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-4">Returning Users</h3>
          <div className="mb-4">
            <p className="text-2xl font-bold text-gray-900">$192,065</p>
            <p className="text-sm text-gray-500">$192,000 last year</p>
            <p className="text-sm text-green-600">↑ 3%</p>
          </div>
          {/* Trend Line */}
          <div className="h-32 flex items-center">
            <svg className="w-full h-full" viewBox="0 0 100 80">
              <polyline
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                points="0,60 15,55 30,50 45,45 60,40 75,35 100,30"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
