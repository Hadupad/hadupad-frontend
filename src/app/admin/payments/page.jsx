'use client';

import { useState } from 'react';
import { CreditCard, DollarSign, TrendingUp, Download, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';

export default function AdminPayments() {
  const [dateRange, setDateRange] = useState('all');
  const [status, setStatus] = useState('all');
  const [paymentMethod, setPaymentMethod] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPayments, setExpandedPayments] = useState({});

  const togglePaymentExpansion = (paymentId) => {
    setExpandedPayments(prev => ({
      ...prev,
      [paymentId]: !prev[paymentId]
    }));
  };

  // Mock payment data
  const payments = [
    {
      id: 1,
      paymentId: '06c3774-7f5d-46ed-90a8',
      guest: 'Faith Oyeniyi',
      property: 'Home away from home',
      amount: 350000,
      paymentMethod: 'visa',
      cardLast4: '4242',
      date: '04/17/23',
      time: '8:25 PM',
      status: 'pending',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      paymentId: '06c3774-7f5d-46ed-90a8',
      guest: 'Tomi Ayeniko',
      property: 'Sunny side uptown home',
      amount: 350000,
      paymentMethod: 'mastercard',
      cardLast4: '2539',
      date: '04/17/23',
      time: '8:25 PM',
      status: 'declined',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      paymentId: '06c3774-7f5d-46ed-90a8',
      guest: 'Tomi Ayeniko',
      property: 'Sunny side uptown home',
      amount: 350000,
      paymentMethod: 'bank_transfer',
      cardLast4: null,
      date: '04/17/23',
      time: '8:25 PM',
      status: 'declined',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 4,
      paymentId: '06c3774-7f5d-46ed-90a8',
      guest: 'Faith Oyeniyi',
      property: 'Home away from home',
      amount: 350000,
      paymentMethod: 'visa',
      cardLast4: '4242',
      date: '04/17/23',
      time: '8:25 PM',
      status: 'succeeded',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 5,
      paymentId: '06c3774-7f5d-46ed-90a8',
      guest: 'Faith Oyeniyi',
      property: 'Home away from home',
      amount: 350000,
      paymentMethod: 'mastercard',
      cardLast4: '2539',
      date: '04/17/23',
      time: '8:25 PM',
      status: 'pending',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'succeeded':
        return 'bg-green-100 text-green-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodIcon = (method, cardLast4) => {
    switch (method) {
      case 'visa':
        return (
          <div className="flex items-center gap-2">
            <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">VISA</span>
            </div>
            <span className="text-sm">•••• {cardLast4}</span>
          </div>
        );
      case 'mastercard':
        return (
          <div className="flex items-center gap-2">
            <div className="w-8 h-5 bg-red-500 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">MC</span>
            </div>
            <span className="text-sm">•••• {cardLast4}</span>
          </div>
        );
      case 'bank_transfer':
        return (
          <div className="flex items-center gap-2">
            <div className="w-8 h-5 bg-blue-500 rounded flex items-center justify-center">
              <CreditCard className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm">Bank transfer</span>
          </div>
        );
      default:
        return method;
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.paymentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = status === 'all' || payment.status === status;
    const matchesMethod = paymentMethod === 'all' || payment.paymentMethod === paymentMethod;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Payments</h1>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <button className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
            <CreditCard className="w-4 h-4" />
            <span className="hidden sm:inline">Transfer Funds</span>
          </button>
          <button className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 text-sm">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Withdraw Funds</span>
          </button>
          <button className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download Report</span>
          </button>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Total Available Balance */}
        <div className="bg-gray-900 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-gray-700 rounded-lg">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <div>
            <p className="text-gray-300 text-sm mb-1">Total Available Balance</p>
            <p className="text-2xl font-bold">₦ 3,500,000</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-gray-400 text-sm">•••••• 1234••</span>
              <button className="text-gray-300 text-sm hover:text-white">View detail →</button>
            </div>
          </div>
        </div>

        {/* Host Payouts */}
        <div className="bg-gray-900 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-gray-700 rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <div>
            <p className="text-gray-300 text-sm mb-1">Host Payouts</p>
            <p className="text-2xl font-bold">₦ 2,500,000</p>
          </div>
        </div>

        {/* Caution Fee Payouts */}
        <div className="bg-gray-900 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-gray-700 rounded-lg">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>
          <div>
            <p className="text-gray-300 text-sm mb-1">Caution fee payouts</p>
            <p className="text-2xl font-bold">₦ 500,000</p>
          </div>
        </div>

        {/* Report Center */}
        <div className="bg-gray-900 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-gray-700 rounded-lg">
              <span className="text-sm font-bold">Report Center</span>
            </div>
          </div>
          <div className="flex items-center justify-center h-20">
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#374151"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeDasharray="30, 100"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="2"
                  strokeDasharray="25, 100"
                  strokeDashoffset="-30"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#6b7280"
                  strokeWidth="2"
                  strokeDasharray="20, 100"
                  strokeDashoffset="-55"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs mt-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>Paid</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>Payouts</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <span>Refunds</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Others</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dashboard Cards - Horizontal Scroll */}
      <div className="md:hidden">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {/* Total Available Balance */}
          <div className="bg-gray-900 text-white p-4 rounded-lg min-w-[280px] flex-shrink-0">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-gray-700 rounded-lg">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div>
              <p className="text-gray-300 text-xs mb-1">Total Available Balance</p>
              <p className="text-xl font-bold">₦ 3,500,000</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-gray-400 text-xs">•••••• 1234••</span>
                <button className="text-gray-300 text-xs hover:text-white">View detail →</button>
              </div>
            </div>
          </div>

          {/* Host Payouts */}
          <div className="bg-gray-900 text-white p-4 rounded-lg min-w-[280px] flex-shrink-0">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-gray-700 rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div>
              <p className="text-gray-300 text-xs mb-1">Host Payouts</p>
              <p className="text-xl font-bold">₦ 2,500,000</p>
            </div>
          </div>

          {/* Caution Fee Payouts */}
          <div className="bg-gray-900 text-white p-4 rounded-lg min-w-[280px] flex-shrink-0">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-gray-700 rounded-lg">
                <CreditCard className="w-5 h-5" />
              </div>
            </div>
            <div>
              <p className="text-gray-300 text-xs mb-1">Caution fee payouts</p>
              <p className="text-xl font-bold">₦ 500,000</p>
            </div>
          </div>

          {/* Report Center */}
          <div className="bg-gray-900 text-white p-4 rounded-lg min-w-[280px] flex-shrink-0">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-gray-700 rounded-lg">
                <span className="text-xs font-bold">Report Center</span>
              </div>
            </div>
            <div className="flex items-center justify-center h-16">
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#374151"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeDasharray="30, 100"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="2"
                    strokeDasharray="25, 100"
                    strokeDashoffset="-30"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#6b7280"
                    strokeWidth="2"
                    strokeDasharray="20, 100"
                    strokeDashoffset="-55"
                  />
                </svg>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs mt-2">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                <span className="text-xs">Paid</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                <span className="text-xs">Payouts</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="md:hidden">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3"/>
            </svg>
            <span>Sort by</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <span>Date range</span>
          <span>Status</span>
          <span>Payment Method</span>
        </div>
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Date range</span>
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All time</option>
              <option value="today">Today</option>
              <option value="week">This week</option>
              <option value="month">This month</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Status</span>
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="succeeded">Succeeded</option>
              <option value="declined">Declined</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">P. Method</span>
            <select 
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All</option>
              <option value="visa">Visa</option>
              <option value="mastercard">Mastercard</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
          </div>
        </div>

        <div className="max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by amount, payment method..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Desktop Payments Table */}
      <div className="hidden md:block bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name (Guest, Listing)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={payment.avatar}
                        alt={payment.guest}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face';
                        }}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{payment.property}</div>
                        <div className="text-sm text-gray-500">{payment.guest}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{payment.paymentId}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">₦ {payment.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    {getPaymentMethodIcon(payment.paymentMethod, payment.cardLast4)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div>{payment.date}</div>
                    <div className="text-xs text-gray-500">at {payment.time}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Payment Cards - Collapsible Accordion */}
      <div className="md:hidden space-y-3">
        {filteredPayments.map((payment) => {
          const isExpanded = expandedPayments[payment.id];
          return (
            <div key={payment.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div 
                className="flex items-start justify-between cursor-pointer"
                onClick={() => togglePaymentExpansion(payment.id)}
              >
                <div className="flex items-center space-x-3">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={payment.avatar}
                    alt={payment.guest}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face';
                    }}
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{payment.property}</div>
                    <div className="text-sm text-gray-500">{payment.guest}</div>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
              
              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Pay ID</span>
                    <span className="text-sm font-medium">{payment.paymentId.slice(0, 8)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Amount</span>
                    <span className="text-sm font-medium">₦ {payment.amount.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">P. Method</span>
                    <div className="text-sm">
                      {getPaymentMethodIcon(payment.paymentMethod, payment.cardLast4)}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Date</span>
                    <span className="text-sm">{payment.date} at {payment.time}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
