"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  MessageSquare, 
  Star,
  Search,
  Filter,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  LayoutDashboard,
  Settings,
  LogOut,
  Package,
  Plus,
  Truck,
  Home,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

const salesData = [
  { name: 'Jan', total: 4200 },
  { name: 'Feb', total: 3800 },
  { name: 'Mar', total: 5100 },
  { name: 'Apr', total: 4800 },
  { name: 'May', total: 6200 },
  { name: 'Jun', total: 7400 },
  { name: 'Jul', total: 8500 },
];

const categoryData = [
  { name: 'Disinfectants', value: 45 },
  { name: 'Kitchen Care', value: 25 },
  { name: 'Personal Care', value: 20 },
  { name: 'Laundry Care', value: 10 },
];
const COLORS = ['#0d9488', '#0f766e', '#115e59', '#134e4a'];

const feedbacks = [
  { id: 1, user: "Sarah J.", rating: 5, product: "PureClean 5L Multi-Surface", text: "Excellent product for our clinic. Will reorder soon.", sentiment: "positive", date: "2 hours ago" },
  { id: 2, user: "Michael T.", rating: 4, product: "Hand Sanitizer Gel 500ml", text: "Good consistency, doesn't dry hands out too much.", sentiment: "positive", date: "5 hours ago" },
  { id: 3, user: "Elena R.", rating: 2, product: "Floor Cleaner 1L", text: "Scent is a bit too strong for my preference.", sentiment: "negative", date: "1 day ago" },
  { id: 4, user: "David C.", rating: 5, product: "Medical Grade Disinfectant Wipes", text: "Very durable wipes, great value for money.", sentiment: "positive", date: "2 days ago" },
];

const trackingSteps = [
  { id: 0, title: "Order Placed", icon: ShoppingBag },
  { id: 1, title: "Processing", icon: Package },
  { id: 2, title: "Shipped", icon: Truck },
  { id: 3, title: "Out for Delivery", icon: Home },
  { id: 4, title: "Delivered", icon: CheckCircle2 },
];

const recentOrders = [
  { id: "PC-84729103", customer: "John Doe", date: "Aug 12, 2024", total: "₹1,250", status: 2, items: 3, address: "Bangalore, KA" },
  { id: "PC-84729104", customer: "Sarah Smith", date: "Aug 13, 2024", total: "₹3,400", status: 1, items: 12, address: "Mumbai, MH" },
  { id: "PC-84729105", customer: "Michael T.", date: "Aug 14, 2024", total: "₹850", status: 4, items: 2, address: "Delhi, DL" },
  { id: "PC-84729106", customer: "Clinic Care", date: "Aug 14, 2024", total: "₹12,500", status: 0, items: 45, address: "Pune, MH" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [ordersList, setOrdersList] = useState(recentOrders);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState("");

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedOrders(ordersList.map(o => o.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders(prev => [...prev, id]);
    } else {
      setSelectedOrders(prev => prev.filter(orderId => orderId !== id));
    }
  };

  const handleBulkAction = () => {
    if (!bulkAction || selectedOrders.length === 0) return;
    
    setOrdersList(prev => prev.map(order => {
      if (selectedOrders.includes(order.id)) {
        return { ...order, status: parseInt(bulkAction) };
      }
      return order;
    }));
    setSelectedOrders([]);
    setBulkAction("");
  };

  const NavItem = ({ icon: Icon, label, id, badge }: any) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-colors ${activeTab === id ? 'bg-teal-50 text-teal-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700 font-medium'}`}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5" />
        {label}
      </div>
      {badge && (
        <span className="bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full text-xs font-bold">{badge}</span>
      )}
    </button>
  );

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center shadow-sm">
              <ShoppingBag className="text-white w-4 h-4" />
            </div>
            <span className="text-lg font-bold text-slate-800 tracking-tight">PureAdmin</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1">
          <NavItem icon={LayoutDashboard} label="Overview" id="overview" />
          <NavItem icon={ShoppingBag} label="Orders" id="orders" />
          <NavItem icon={Package} label="Products" id="products" />
          <NavItem icon={Users} label="Customers" id="customers" />
          <NavItem icon={MessageSquare} label="Feedback" id="feedback" badge="4" />
        </div>

        <div className="p-4 border-t border-slate-100 flex flex-col gap-1">
          <NavItem icon={Settings} label="Settings" id="settings" />
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-rose-50 hover:text-rose-600 rounded-xl font-medium transition-colors w-full mt-2">
            <LogOut className="w-5 h-5" />
            Logout
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Admin Header */}
        <div className="h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4 md:hidden">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center shadow-sm">
              <ShoppingBag className="text-white w-4 h-4" />
            </div>
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold text-slate-800 leading-tight capitalize">
              {activeTab === 'overview' ? 'Dashboard Overview' : activeTab}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="pl-9 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none w-48 xl:w-64 transition-all"
              />
            </div>
            <div className="w-9 h-9 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold text-sm shadow-sm border border-teal-200 cursor-pointer hover:bg-teal-200 transition-colors">
              AD
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 w-full">
          <div className="max-w-7xl mx-auto flex flex-col gap-6">
            
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div 
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-6"
                >
                  {/* KPI Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                          <ArrowUpRight className="w-3 h-3 mr-1" /> +12.5%
                        </span>
                      </div>
                      <h3 className="text-slate-500 text-sm font-medium">Total Revenue</h3>
                      <p className="text-2xl font-black text-slate-800 mt-1">₹1,24,500</p>
                    </div>
                    
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                          <ShoppingBag className="w-5 h-5" />
                        </div>
                        <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                          <ArrowUpRight className="w-3 h-3 mr-1" /> +8.2%
                        </span>
                      </div>
                      <h3 className="text-slate-500 text-sm font-medium">Active Orders</h3>
                      <p className="text-2xl font-black text-slate-800 mt-1">342</p>
                    </div>
                    
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                          <Users className="w-5 h-5" />
                        </div>
                        <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                          <ArrowUpRight className="w-3 h-3 mr-1" /> +5.4%
                        </span>
                      </div>
                      <h3 className="text-slate-500 text-sm font-medium">Total Customers</h3>
                      <p className="text-2xl font-black text-slate-800 mt-1">1,893</p>
                    </div>
                    
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
                          <MessageSquare className="w-5 h-5" />
                        </div>
                        <span className="flex items-center text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-md">
                          <ArrowDownRight className="w-3 h-3 mr-1" /> -2.1%
                        </span>
                      </div>
                      <h3 className="text-slate-500 text-sm font-medium">Pending Feedback</h3>
                      <p className="text-2xl font-black text-slate-800 mt-1">28</p>
                    </div>
                  </div>

                  {/* Charts Area */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-800">Revenue Overview</h3>
                        <select className="bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-1.5 outline-none text-slate-600 font-medium">
                          <option>Last 7 Months</option>
                          <option>This Year</option>
                        </select>
                      </div>
                      <div className="h-64 sm:h-72 w-full min-h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                            <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                            <Bar dataKey="total" fill="#0d9488" radius={[6, 6, 0, 0]} maxBarSize={40} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col min-h-[350px]">
                      <h3 className="text-lg font-bold text-slate-800 mb-6">Sales by Category</h3>
                      <div className="flex-1 w-full relative flex items-center justify-center min-h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={categoryData}
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                          <span className="text-2xl font-black text-slate-800">4</span>
                          <span className="text-xs text-slate-500 font-medium">Categories</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mt-4 shrink-0">
                        {categoryData.map((cat, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx] }}></div>
                            <span className="text-xs font-medium text-slate-600 truncate" title={cat.name}>{cat.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Feedback Analysis Section */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">Recent Feedback</h3>
                        <p className="text-sm text-slate-500 mt-1">Customer reviews requiring attention</p>
                      </div>
                      <button 
                        onClick={() => setActiveTab('feedback')}
                        className="text-sm font-semibold text-teal-600 bg-teal-50 px-4 py-2 rounded-lg hover:bg-teal-100 transition-colors"
                      >
                        View All
                      </button>
                    </div>
                    
                    <div className="overflow-x-auto w-full pb-2">
                      <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                          <tr className="border-b border-slate-100">
                            <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Customer</th>
                            <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Product</th>
                            <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Rating</th>
                            <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider max-w-[200px]">Feedback</th>
                            <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Sentiment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {feedbacks.slice(0, 3).map((fb) => (
                            <tr key={fb.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                              <td className="py-4 pr-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs shrink-0">
                                    {fb.user.charAt(0)}
                                  </div>
                                  <div>
                                    <p className="font-semibold text-slate-800 text-sm whitespace-nowrap">{fb.user}</p>
                                    <p className="text-xs text-slate-400 whitespace-nowrap">{fb.date}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 pr-4 text-sm font-medium text-slate-700">{fb.product}</td>
                              <td className="py-4 pr-4">
                                <div className="flex items-center gap-1 text-amber-400">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className={`w-3.5 h-3.5 shrink-0 ${i < fb.rating ? 'fill-current' : 'text-slate-200'}`} />
                                  ))}
                                </div>
                              </td>
                              <td className="py-4 pr-4 text-sm text-slate-600 max-w-[250px] truncate" title={fb.text}>{fb.text}</td>
                              <td className="py-4 pr-4">
                                <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold whitespace-nowrap ${
                                  fb.sentiment === 'positive' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                                }`}>
                                  {fb.sentiment === 'positive' ? 'Positive' : 'Needs Review'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "orders" && (
                <motion.div key="orders" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">Orders Management</h2>
                      <p className="text-sm text-slate-500 mt-1">View and manage customer orders and tracking status.</p>
                    </div>
                    <div className="flex gap-3">
                      {selectedOrders.length > 0 && (
                        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                          <select 
                            value={bulkAction} 
                            onChange={(e) => setBulkAction(e.target.value)}
                            className="bg-white border border-slate-200 text-sm rounded-lg px-3 py-1.5 outline-none text-slate-700 font-medium h-full"
                          >
                            <option value="">Bulk Action</option>
                            <option value="0">Mark Placed</option>
                            <option value="1">Mark Processing</option>
                            <option value="2">Mark Shipped</option>
                            <option value="3">Mark Out for Delivery</option>
                            <option value="4">Mark Delivered</option>
                          </select>
                          <button onClick={handleBulkAction} className="px-3 py-1.5 bg-slate-800 text-white text-sm font-semibold rounded-lg hover:bg-slate-700 transition-colors">Apply</button>
                        </div>
                      )}
                      <button className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors">Export Orders</button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center px-6 py-2">
                      <input 
                        type="checkbox" 
                        checked={selectedOrders.length === ordersList.length && ordersList.length > 0} 
                        onChange={handleSelectAll}
                        className="w-5 h-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500 mr-4 cursor-pointer"
                      />
                      <span className="text-sm font-semibold text-slate-600">Select All ({selectedOrders.length} selected)</span>
                    </div>
                    {ordersList.map((order) => (
                      <div key={order.id} className={`bg-white rounded-2xl border ${selectedOrders.includes(order.id) ? 'border-teal-400 shadow-md ring-1 ring-teal-400' : 'border-slate-200 shadow-sm'} p-6 flex flex-col gap-6 hover:shadow-md transition-all`}>
                        <div className="flex flex-wrap gap-4 items-center justify-between border-b border-slate-100 pb-4">
                          <div className="flex items-center gap-4">
                            <input 
                              type="checkbox" 
                              checked={selectedOrders.includes(order.id)}
                              onChange={(e) => handleSelectOrder(order.id, e.target.checked)}
                              className="w-5 h-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
                            />
                            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                              <ShoppingBag className="w-6 h-6 text-slate-400" />
                            </div>
                            <div>
                              <h3 className="font-bold text-slate-800 text-lg">{order.id}</h3>
                              <p className="text-sm text-slate-500">Placed on {order.date} • {order.customer}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="font-bold text-slate-800 text-lg">{order.total}</span>
                            <span className="text-sm text-slate-500">{order.items} Items • {order.address}</span>
                          </div>
                        </div>

                        {/* Tracking Timeline */}
                        <div className="relative pt-2 pb-6 px-4 sm:px-8 overflow-x-auto min-w-full hidden md:block">
                          <div className="absolute left-8 right-8 top-6 h-1 bg-slate-100 rounded-full"></div>
                          <div 
                            className="absolute left-8 top-6 h-1 bg-teal-500 rounded-full transition-all duration-500"
                            style={{ width: `calc(${(order.status / (trackingSteps.length - 1)) * 100}% - ${order.status === trackingSteps.length - 1 ? 0 : 32}px)` }}
                          ></div>
                          
                          <div className="flex justify-between relative z-10 min-w-[500px]">
                            {trackingSteps.map((step, index) => {
                              const isCompleted = order.status >= index;
                              const isCurrent = order.status === index;
                              const Icon = step.icon;
                              
                              return (
                                <div key={step.id} className="flex flex-col items-center gap-2 -mt-4 group w-1/5">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 transition-colors duration-300 ${
                                    isCompleted 
                                      ? 'bg-teal-500 border-teal-100 text-white' 
                                      : isCurrent 
                                        ? 'bg-white border-teal-500 text-teal-600 shadow-sm' 
                                        : 'bg-white border-slate-200 text-slate-400'
                                  }`}>
                                    <Icon className="w-5 h-5" />
                                  </div>
                                  <span className={`text-sm font-semibold text-center ${isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>
                                    {step.title}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Mobile Tracking Timeline (Vertical) */}
                        <div className="md:hidden flex flex-col gap-6 relative pl-6 py-4">
                          <div className="absolute left-10 top-6 bottom-8 w-0.5 bg-slate-100 rounded-full"></div>
                          <div 
                            className="absolute left-10 top-6 w-0.5 bg-teal-500 rounded-full"
                            style={{ height: `${(order.status / (trackingSteps.length - 1)) * 100}%` }}
                          ></div>
                          
                          {trackingSteps.map((step, index) => {
                              const isCompleted = order.status >= index;
                              const isCurrent = order.status === index;
                              const Icon = step.icon;
                              
                              return (
                                <div key={step.id} className="flex items-center gap-4 relative z-10">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-4 transition-colors duration-300 ${
                                    isCompleted 
                                      ? 'bg-teal-500 border-teal-100 text-white' 
                                      : isCurrent 
                                        ? 'bg-white border-teal-500 text-teal-600 shadow-sm' 
                                        : 'bg-white border-slate-200 text-slate-400'
                                  }`}>
                                    <Icon className="w-4 h-4" />
                                  </div>
                                  <span className={`text-sm font-semibold ${isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>
                                    {step.title}
                                  </span>
                                </div>
                              );
                          })}
                        </div>
                        
                        <div className="flex justify-end pt-2 border-t border-slate-100">
                          <button className="flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors">
                            Manage Order <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "products" && (
                <motion.div key="products" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-center min-h-[400px]">
                  <Package className="w-12 h-12 text-slate-300 mb-4" />
                  <h2 className="text-xl font-bold text-slate-800 mb-2">Products Management</h2>
                  <p className="text-slate-500 max-w-sm text-center">Add new products, update inventory, and manage product categories.</p>
                  <button className="mt-6 px-6 py-2 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Product
                  </button>
                </motion.div>
              )}

              {activeTab === "customers" && (
                <motion.div key="customers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-center min-h-[400px]">
                  <Users className="w-12 h-12 text-slate-300 mb-4" />
                  <h2 className="text-xl font-bold text-slate-800 mb-2">Customer Database</h2>
                  <p className="text-slate-500 max-w-sm text-center">View customer details, purchase history, and manage accounts.</p>
                  <div className="mt-6 flex gap-4">
                    <button className="px-6 py-2 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors">Import</button>
                    <button className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors">Export List</button>
                  </div>
                </motion.div>
              )}

              {activeTab === "feedback" && (
                <motion.div key="feedback" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col min-h-[400px]">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">All Feedback Analysis</h3>
                      <p className="text-sm text-slate-500 mt-1">Customer reviews and sentiment tracking</p>
                    </div>
                    <button className="flex items-center gap-2 text-sm font-semibold text-teal-600 bg-teal-50 px-4 py-2 rounded-lg hover:bg-teal-100 transition-colors w-full sm:w-auto justify-center">
                      <Filter className="w-4 h-4" /> Filter Ratings
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto w-full pb-2">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                      <thead>
                        <tr className="border-b border-slate-100">
                          <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Customer</th>
                          <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Product</th>
                          <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Rating</th>
                          <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider max-w-[200px]">Feedback</th>
                          <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Sentiment</th>
                          <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {feedbacks.map((fb) => (
                          <tr key={fb.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                            <td className="py-4 pr-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs shrink-0">
                                  {fb.user.charAt(0)}
                                </div>
                                <div>
                                  <p className="font-semibold text-slate-800 text-sm whitespace-nowrap">{fb.user}</p>
                                  <p className="text-xs text-slate-400 whitespace-nowrap">{fb.date}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 pr-4 text-sm font-medium text-slate-700">{fb.product}</td>
                            <td className="py-4 pr-4">
                              <div className="flex items-center gap-1 text-amber-400">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star key={i} className={`w-3.5 h-3.5 shrink-0 ${i < fb.rating ? 'fill-current' : 'text-slate-200'}`} />
                                ))}
                              </div>
                            </td>
                            <td className="py-4 pr-4 text-sm text-slate-600 max-w-[250px] truncate" title={fb.text}>{fb.text}</td>
                            <td className="py-4 pr-4">
                              <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold whitespace-nowrap ${
                                fb.sentiment === 'positive' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                              }`}>
                                {fb.sentiment === 'positive' ? 'Positive' : 'Needs Review'}
                              </span>
                            </td>
                            <td className="py-4 text-right">
                              <button className="text-slate-400 hover:text-teal-600 transition-colors p-1 rounded-md hover:bg-teal-50 opacity-0 group-hover:opacity-100 focus:opacity-100">
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === "settings" && (
                <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col min-h-[400px]">
                  <div className="flex items-center gap-3 mb-6">
                    <Settings className="w-6 h-6 text-teal-600" />
                    <h2 className="text-xl font-bold text-slate-800">Portal Settings</h2>
                  </div>
                  <div className="max-w-2xl flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-slate-700">Admin Name</label>
                      <input type="text" defaultValue="Admin User" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-teal-500" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-slate-700">Admin Email</label>
                      <input type="email" defaultValue="admin@pureclean.com" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-teal-500" disabled />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-slate-700">Notification Preferences</label>
                      <div className="flex items-center gap-3 mt-2">
                        <input type="checkbox" id="notif1" defaultChecked className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded" />
                        <label htmlFor="notif1" className="text-sm text-slate-600">Email me when a new order is placed</label>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <input type="checkbox" id="notif2" defaultChecked className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded" />
                        <label htmlFor="notif2" className="text-sm text-slate-600">Email me on negative feedback</label>
                      </div>
                    </div>
                    <button className="mt-4 px-6 py-2.5 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors w-fit">Save Settings</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
    </div>
  );
}

