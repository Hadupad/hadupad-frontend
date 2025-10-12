'use client';

import { useState } from 'react';
import { Search, Plus, Eye, Printer, MoreVertical, Filter, ChevronDown, ChevronUp, X } from 'lucide-react';

export default function AdminSupport() {
  const [activeMainTab, setActiveMainTab] = useState('dashboard');
  const [activeTicketTab, setActiveTicketTab] = useState('all');
  const [isTicketDropdownOpen, setIsTicketDropdownOpen] = useState(false);
  const [expandedTickets, setExpandedTickets] = useState({});
  const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({
    customerName: '',
    ticketNumber: '',
    category: '',
    subject: '',
    description: '',
    assignedPerson: ''
  });

  // Mock ticket data
  const tickets = [
    {
      id: 1,
      name: 'Faith Oyeniyi',
      email: 'faithoyeniyi92@gmail.com',
      ticketNo: '12FKLYSBYG7',
      ticketType: 'Profile Update Issue',
      date: '04/17/23',
      time: '8:25 PM',
      status: 'In progress',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Tomi Ayeniko',
      email: 'faithoyeniyi92@gmail.com',
      ticketNo: '12FKLYSBYG7',
      ticketType: 'Login Problem',
      date: '04/17/23',
      time: '8:25 PM',
      status: 'Resolved',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Tomi Ayeniko',
      email: 'faithoyeniyi92@gmail.com',
      ticketNo: '12FKLYSBYG7',
      ticketType: 'Payment Issue',
      date: '04/17/23',
      time: '8:25 PM',
      status: 'New',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'Faith Oyeniyi',
      email: 'faithoyeniyi92@gmail.com',
      ticketNo: '12FKLYSBYG7',
      ticketType: 'Account Access',
      date: '04/17/23',
      time: '8:25 PM',
      status: 'Resolved',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 5,
      name: 'Faith Oyeniyi',
      email: 'faithoyeniyi92@gmail.com',
      ticketNo: '12FKLYSBYG7',
      ticketType: 'Caution fee',
      date: '04/17/23',
      time: '8:25 PM',
      status: 'In progress',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 6,
      name: 'Tomi Ayeniko',
      email: 'faithoyeniyi92@gmail.com',
      ticketNo: '12FKLYSBYG7',
      ticketType: 'Account Access',
      date: '04/17/23',
      time: '8:25 PM',
      status: 'In progress',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 7,
      name: 'Tomi Ayeniko',
      email: 'faithoyeniyi92@gmail.com',
      ticketNo: '12FKLYSBYG7',
      ticketType: 'Account Access',
      date: '04/17/23',
      time: '8:25 PM',
      status: 'New',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 8,
      name: 'Faith Oyeniyi',
      email: 'faithoyeniyi92@gmail.com',
      ticketNo: '12FKLYSBYG7',
      ticketType: 'Account Access',
      date: '04/17/23',
      time: '8:25 PM',
      status: 'Resolved',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'In progress':
        return 'bg-orange-100 text-orange-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      case 'New':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const ticketTabs = [
    { id: 'all', label: 'All Tickets' },
    { id: 'new', label: 'New Tickets' },
    { id: 'resolved', label: 'Resolved Tickets' },
    { id: 'progress', label: 'In Progress' }
  ];

  const filteredTickets = tickets.filter(ticket => {
    if (activeTicketTab === 'all') return true;
    if (activeTicketTab === 'new') return ticket.status === 'New';
    if (activeTicketTab === 'resolved') return ticket.status === 'Resolved';
    if (activeTicketTab === 'progress') return ticket.status === 'In progress';
    return true;
  });

  const toggleTicketExpansion = (ticketId) => {
    setExpandedTickets(prev => ({
      ...prev,
      [ticketId]: !prev[ticketId]
    }));
  };

  const handleCreateTicket = () => {
    setIsCreateTicketModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateTicketModalOpen(false);
    setNewTicket({
      customerName: '',
      ticketNumber: '',
      category: '',
      subject: '',
      description: '',
      assignedPerson: ''
    });
  };

  const handleSubmitTicket = () => {
    // Handle ticket submission logic here
    console.log('Submitting ticket:', newTicket);
    handleCloseModal();
  };

  const handleInputChange = (field, value) => {
    setNewTicket(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Customer Support</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Search className="w-4 h-4" />
          </button>
          {activeMainTab === 'tickets' && (
            <button 
              onClick={handleCreateTicket}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveMainTab('dashboard')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeMainTab === 'dashboard'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveMainTab('tickets')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeMainTab === 'tickets'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Tickets
          </button>
        </nav>
      </div>

      {/* Dashboard Tab Content */}
      {activeMainTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div className="bg-gradient-to-br from-[#FFF] to-[#FFEED8] rounded-lg border border-gray-200 p-3 lg:p-6 relative overflow-hidden">
              <div className="flex items-start justify-between mb-2 lg:mb-4">
                <div className="p-1.5 lg:p-2 bg-red-100 rounded-lg">
                  <img 
                    src="/images/icons/Active.png" 
                    alt="Active Tickets" 
                    className="w-4 h-4 lg:w-6 lg:h-6"
                  />
                </div>
              </div>
              <div className="mb-2 lg:mb-4">
                <p className="text-xs lg:text-sm font-medium text-gray-900 mb-1">Active Ticket</p>
                <p className="text-xs text-gray-500 mb-2 lg:mb-3">Increased Number of Tickets by 7%</p>
                <p className="text-2xl lg:text-4xl font-bold text-red-600">178</p>
              </div>
              {/* Decorative background graphic */}
              <div className="absolute bottom-2 right-2 lg:bottom-4 lg:right-4 w-12 h-12 lg:w-16 lg:h-16 opacity-10">
                <img 
                  src="/images/icons/Active.png" 
                  alt="" 
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-gray-200 p-3 lg:p-6 relative overflow-hidden">
              <div className="flex items-start justify-between mb-2 lg:mb-4">
                <div className="p-1.5 lg:p-2 bg-orange-100 rounded-lg">
                  <img 
                    src="/images/icons/Resolved.png" 
                    alt="Resolved Tickets" 
                    className="w-4 h-4 lg:w-6 lg:h-6"
                  />
                </div>
              </div>
              <div className="mb-2 lg:mb-4">
                <p className="text-xs lg:text-sm font-medium text-gray-900 mb-1">Resolved Ticket</p>
                <p className="text-xs text-gray-500 mb-2 lg:mb-3">Increased Number of Tickets by 12%</p>
                <p className="text-2xl lg:text-4xl font-bold text-orange-600">178</p>
              </div>
              {/* Decorative background graphic */}
              <div className="absolute bottom-2 right-2 lg:bottom-4 lg:right-4 w-12 h-12 lg:w-16 lg:h-16 opacity-10">
                <img 
                  src="/images/icons/Resolved.png" 
                  alt="" 
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg border border-gray-200 p-3 lg:p-6 relative overflow-hidden">
              <div className="flex items-start justify-between mb-2 lg:mb-4">
                <div className="p-1.5 lg:p-2 bg-pink-100 rounded-lg">
                  <img 
                    src="/images/icons/Urgent.png" 
                    alt="Urgent Tickets" 
                    className="w-4 h-4 lg:w-6 lg:h-6"
                  />
                </div>
              </div>
              <div className="mb-2 lg:mb-4">
                <p className="text-xs lg:text-sm font-medium text-gray-900 mb-1">Urgent Ticket</p>
                <p className="text-xs text-gray-500 mb-2 lg:mb-3">Increased Number of Tickets by 5%</p>
                <p className="text-2xl lg:text-4xl font-bold text-pink-600">08</p>
              </div>
              {/* Decorative background graphic */}
              <div className="absolute bottom-2 right-2 lg:bottom-4 lg:right-4 w-12 h-12 lg:w-16 lg:h-16 opacity-10">
                <img 
                  src="/images/icons/Urgent.png" 
                  alt="" 
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-gray-200 p-3 lg:p-6 relative overflow-hidden">
              <div className="flex items-start justify-between mb-2 lg:mb-4">
                <div className="p-1.5 lg:p-2 bg-orange-100 rounded-lg">
                  <img 
                    src="/images/icons/Other.png" 
                    alt="Other Team" 
                    className="w-4 h-4 lg:w-6 lg:h-6"
                  />
                </div>
              </div>
              <div className="mb-2 lg:mb-4">
                <p className="text-xs lg:text-sm font-medium text-gray-900 mb-1">Other Teams</p>
                <p className="text-xs text-gray-500 mb-2 lg:mb-3">Increased Number of Tickets by 20%</p>
                <p className="text-2xl lg:text-4xl font-bold text-orange-600">178</p>
              </div>
              {/* Decorative background graphic */}
              <div className="absolute bottom-2 right-2 lg:bottom-4 lg:right-4 w-12 h-12 lg:w-16 lg:h-16 opacity-10">
                <img 
                  src="/images/icons/Other.png" 
                  alt="" 
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tickets Main Category Chart */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-900">Tickets Main Category</h3>
                <button className="flex items-center gap-1 text-xs text-gray-600 border border-gray-300 rounded px-2 py-1">
                  <Filter className="w-3 h-3" />
                  Select Filters
                </button>
              </div>
              <p className="text-xs text-gray-500 mb-4">Categories on basis of ticket percentage</p>
              
              {/* Line Chart */}
              <div className="h-48 relative bg-gray-50 rounded p-4">
                <svg className="w-full h-full" viewBox="0 0 320 180">
                  {/* Line chart with points */}
                  <polyline
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                    points="40,140 80,110 120,80 160,95 200,60 240,85 280,45"
                  />
                  <circle cx="40" cy="140" r="4" fill="#ef4444" />
                  <circle cx="80" cy="110" r="4" fill="#ef4444" />
                  <circle cx="120" cy="80" r="4" fill="#ef4444" />
                  <circle cx="160" cy="95" r="4" fill="#ef4444" />
                  <circle cx="200" cy="60" r="4" fill="#ef4444" />
                  <circle cx="240" cy="85" r="4" fill="#ef4444" />
                  <circle cx="280" cy="45" r="4" fill="#ef4444" />
                  
                  {/* Y-axis labels positioned around the chart */}
                  <text x="25" y="145" className="text-xs fill-gray-500" fontSize="10">40% Error</text>
                  <text x="25" y="115" className="text-xs fill-gray-500" fontSize="10">High Cost</text>
                  <text x="25" y="85" className="text-xs fill-gray-500" fontSize="10">Screen Stuck</text>
                  <text x="25" y="55" className="text-xs fill-gray-500" fontSize="10">Not Delivered</text>
                  
                  {/* X-axis labels */}
                  <text x="40" y="170" textAnchor="middle" className="text-xs fill-gray-500" fontSize="10">Slow Loading</text>
                  <text x="120" y="170" textAnchor="middle" className="text-xs fill-gray-500" fontSize="10">Late Delivery</text>
                  <text x="200" y="170" textAnchor="middle" className="text-xs fill-gray-500" fontSize="10">Crashing</text>
                  <text x="280" y="170" textAnchor="middle" className="text-xs fill-gray-500" fontSize="10">Payment Issue</text>
                </svg>
              </div>
            </div>

            {/* Tickets Main Duration Heatmap */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-900">Tickets Main Duration</h3>
                <button className="flex items-center gap-1 text-xs text-gray-600 border border-gray-300 rounded px-2 py-1">
                  <Filter className="w-3 h-3" />
                  Select Filters
                </button>
              </div>
              <p className="text-xs text-gray-500 mb-4">This is based on last highest tickets duration</p>
              
              {/* Heatmap */}
              <div className="bg-gray-50 rounded p-4">
                <div className="space-y-2">
                  {[
                    [3, 2, 4, 3, 5, 2, 1], // Week 1
                    [2, 4, 3, 4, 2, 3, 2], // Week 2
                    [4, 3, 5, 4, 3, 4, 3], // Week 3
                    [3, 4, 2, 5, 4, 3, 4], // Week 4
                    [2, 3, 4, 3, 5, 2, 3], // Week 5
                    [4, 2, 3, 4, 2, 4, 2], // Week 6
                    [3, 4, 2, 3, 4, 3, 4]  // Week 7
                  ].map((week, weekIndex) => (
                    <div key={weekIndex} className="flex gap-1 justify-center">
                      {week.map((intensity, dayIndex) => {
                        let bgColor = 'bg-red-100';
                        if (intensity === 5) bgColor = 'bg-red-600';
                        else if (intensity === 4) bgColor = 'bg-red-500';
                        else if (intensity === 3) bgColor = 'bg-red-400';
                        else if (intensity === 2) bgColor = 'bg-red-300';
                        else if (intensity === 1) bgColor = 'bg-red-200';
                        
                        return (
                          <div
                            key={dayIndex}
                            className={`w-6 h-6 rounded ${bgColor}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
                
                {/* Days labels */}
                <div className="flex justify-center gap-1 text-xs text-gray-500 mt-3">
                  <span className="w-6 text-center">Mon</span>
                  <span className="w-6 text-center">Tue</span>
                  <span className="w-6 text-center">Wed</span>
                  <span className="w-6 text-center">Thu</span>
                  <span className="w-6 text-center">Fri</span>
                  <span className="w-6 text-center">Sat</span>
                  <span className="w-6 text-center">Sun</span>
                </div>
              </div>
            </div>

            {/* Updates Section */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-900">Updates</h3>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
              <p className="text-xs text-gray-500 mb-4">Added on 30th January at 1:30 PM</p>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Number of Tickets dropped significantly to 10%</p>
                </div>
                
                <div className="border-t border-red-200 pt-3">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Is Problem is in our end?</h4>
                  <p className="text-xs text-gray-600 mb-2 leading-relaxed">
                    If the issue is on our end, please send an apology to the customer along with a small compensation amount.
                  </p>
                  <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                    Make sure to acknowledge the error and express our sincere apologies for any inconvenience caused.
                  </p>
                  <button className="px-3 py-1.5 bg-red-600 text-white text-xs rounded hover:bg-red-700 font-medium">
                    Assign Person
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tickets Tab Content */}
      {activeMainTab === 'tickets' && (
        <div className="space-y-6">
          {/* Desktop Ticket Sub-tabs */}
          <div className="hidden md:flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {ticketTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTicketTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTicketTab === tab.id
                    ? 'bg-red-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Mobile Ticket Sub-tabs Dropdown */}
          <div className="md:hidden">
            <div className="relative">
              <button
                onClick={() => setIsTicketDropdownOpen(!isTicketDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg text-left"
              >
                <span className="text-sm font-medium text-gray-900">
                  {ticketTabs.find(tab => tab.id === activeTicketTab)?.label}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isTicketDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isTicketDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  {ticketTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTicketTab(tab.id);
                        setIsTicketDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                        activeTicketTab === tab.id ? 'bg-red-50 text-red-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Tickets Table */}
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
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ticket No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ticket Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-gray-50">
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
                            src={ticket.avatar}
                            alt={ticket.name}
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{ticket.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{ticket.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{ticket.ticketNo}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{ticket.ticketType}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div>{ticket.date}</div>
                        <div className="text-xs text-gray-500">at {ticket.time}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="text-gray-400 hover:text-gray-600">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Printer className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Tickets Accordion */}
          <div className="md:hidden space-y-3">
            {filteredTickets.map((ticket) => (
              <div key={ticket.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Ticket Header - Always Visible */}
                <div 
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => toggleTicketExpansion(ticket.id)}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={ticket.avatar}
                      alt={ticket.name}
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{ticket.name}</div>
                      <div className="text-xs text-gray-500">{ticket.ticketType}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                    {expandedTickets[ticket.id] ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedTickets[ticket.id] && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="space-y-3 pt-3">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Email address</div>
                        <div className="text-sm text-gray-900">{ticket.email}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Ticket No</div>
                        <div className="text-sm text-gray-900">{ticket.ticketNo}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Ticket Type</div>
                        <div className="text-sm text-gray-900">{ticket.ticketType}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Date</div>
                        <div className="text-sm text-gray-900">{ticket.date} at {ticket.time}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Status</div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-2">Action</div>
                        <div className="flex items-center gap-3">
                          <button className="text-gray-400 hover:text-gray-600">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Printer className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Ticket Modal */}
      {isCreateTicketModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Customer Report - Ticket Creation</h2>
                <p className="text-sm text-gray-600 mt-1">Create and manage tickets for customers based on their queries and issues. Enter the customer's details, choose the category, and provide a brief subject and description to ensure the ticket is resolved efficiently.</p>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Row 1: Customer Name, Ticket Number, Category */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                  <input
                    type="text"
                    value={newTicket.customerName}
                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                    placeholder="Sarah Thompson"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ticket Number</label>
                  <input
                    type="text"
                    value={newTicket.ticketNumber}
                    onChange={(e) => handleInputChange('ticketNumber', e.target.value)}
                    placeholder="CUST-004963"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newTicket.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">Caution fee</option>
                    <option value="technical">Technical Issue</option>
                    <option value="billing">Billing</option>
                    <option value="account">Account Access</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Ticket Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ticket Subject</label>
                <input
                  type="text"
                  value={newTicket.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder="Issues with my verification code"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              {/* Row 3: Ticket Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ticket Description</label>
                <textarea
                  value={newTicket.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={6}
                  placeholder="Issues with my verification code Issues with my verification code Issues with my verification code Issues with my verification code Issues with my verification code Issues with my verification code Issues with my verification code Issues with my verification code Issues with my verification code Issues with my verification code Issues with my verification code Issues with my verification code Issues with my verification code Issues with my verification code Issues with my verification code Issues with my verification code Issues with my verification code Issues with my verification code Issues with my verification code"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                />
              </div>

              {/* Row 4: Assign People */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assign People</label>
                <select
                  value={newTicket.assignedPerson}
                  onChange={(e) => handleInputChange('assignedPerson', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Assign People</option>
                  <option value="john">John Doe</option>
                  <option value="jane">Jane Smith</option>
                  <option value="mike">Mike Johnson</option>
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Clear
              </button>
              <button
                onClick={handleSubmitTicket}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Submit Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
