"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "@/components/CartProvider";
import { 
  ShoppingBag, 
  Heart, 
  Bell, 
  Award, 
  LogOut,
  RefreshCw,
  Package,
  TrendingDown,
  Gift
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const pastOrders = [
  { id: "PC-84729103", date: "Aug 12, 2024", total: "₹1,250", status: "Delivered", items: [{ name: "PureClean 5L Multi-Surface", qty: 1, price: 1250 }] },
  { id: "PC-74728101", date: "Jul 05, 2024", total: "₹850", status: "Delivered", items: [{ name: "Hand Sanitizer Gel 500ml", qty: 2, price: 425 }] }
];

const wishlistItems = [
  { id: 1, name: "Premium Microfiber Cloths (Pack of 5)", price: 450, stock: "In Stock", priceDrop: true },
  { id: 2, name: "Air Purifier Spray 250ml", price: 320, stock: "Out of Stock", priceDrop: false }
];

const notifications = [
  { id: 1, title: "Price Drop Alert!", message: "Premium Microfiber Cloths is now 15% off.", date: "2 hours ago", unread: true },
  { id: 2, title: "Order Delivered", message: "Your order PC-84729103 has been delivered.", date: "2 days ago", unread: false }
];

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("orders");
  const { addToCart, setIsCartOpen } = useCart();
  const router = useRouter();

  const handleReorder = (order: any) => {
    order.items.forEach((item: any) => {
      addToCart({
        id: item.name,
        name: item.name,
        price: item.price,
        image: "https://picsum.photos/seed/clean/200/200"
      }, item.qty);
    });
    setIsCartOpen(true);
  };

  const NavItem = ({ icon: Icon, label, id, badge }: any) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-colors w-full text-left ${activeTab === id ? 'bg-teal-50 text-teal-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700 font-medium'}`}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 shrink-0" />
        <span className="truncate">{label}</span>
      </div>
      {badge && (
        <span className="bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full text-xs font-bold">{badge}</span>
      )}
    </button>
  );

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-7xl mx-auto min-h-[70vh] p-4 md:p-6 lg:p-8">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white rounded-3xl border border-slate-200 p-4 shrink-0 flex flex-col h-max overflow-x-auto md:overflow-x-visible hide-scrollbar">
        <div className="flex md:flex-col items-center md:items-start gap-4 mb-6 p-2 min-w-max md:min-w-0">
          <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold text-xl shrink-0">
            JD
          </div>
          <div>
            <h2 className="font-bold text-slate-800">John Doe</h2>
            <p className="text-sm text-slate-500">Gold Member</p>
          </div>
        </div>
        
        <div className="flex md:flex-col gap-2 min-w-max md:min-w-0 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
          <NavItem icon={ShoppingBag} label="Order History" id="orders" />
          <NavItem icon={Heart} label="Wishlist" id="wishlist" />
          <NavItem icon={Bell} label="Notifications" id="notifications" badge="1" />
          <NavItem icon={Award} label="Loyalty Points" id="loyalty" />
        </div>

        <div className="hidden md:block mt-8 pt-4 border-t border-slate-100">
          <button 
            onClick={() => router.push('/')}
            className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-rose-50 hover:text-rose-600 rounded-xl font-medium transition-colors w-full"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 lg:p-8 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === "orders" && (
            <motion.div key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">Order History</h2>
              <div className="flex flex-col gap-4">
                {pastOrders.map(order => (
                  <div key={order.id} className="border border-slate-100 rounded-2xl p-4 sm:p-5 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-4">
                      <div>
                        <h3 className="font-bold text-slate-800 text-base md:text-lg">{order.id}</h3>
                        <p className="text-xs sm:text-sm text-slate-500">Placed on {order.date}</p>
                      </div>
                      <div className="text-left sm:text-right flex flex-row-reverse sm:flex-col justify-between w-full sm:w-auto items-center sm:items-end">
                        <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">{order.status}</span>
                        <p className="font-bold text-slate-800 mt-0 sm:mt-2">{order.total}</p>
                      </div>
                    </div>
                    <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="text-sm text-slate-600 w-full sm:w-auto">
                        {order.items.map(item => (
                          <div key={item.name} className="truncate">{item.qty}x {item.name}</div>
                        ))}
                      </div>
                      <button 
                        onClick={() => handleReorder(order)}
                        className="flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl font-semibold hover:bg-teal-600 transition-colors w-full sm:w-auto shrink-0"
                      >
                        <RefreshCw className="w-4 h-4" /> Reorder
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "wishlist" && (
            <motion.div key="wishlist" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">My Wishlist</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wishlistItems.map(item => (
                  <div key={item.id} className="border border-slate-100 rounded-2xl p-4 sm:p-5 hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div>
                      {item.priceDrop && (
                        <span className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded-md mb-2">
                          <TrendingDown className="w-3 h-3" /> Price Drop Alert
                        </span>
                      )}
                      <h3 className="font-bold text-slate-800 line-clamp-2 text-sm sm:text-base">{item.name}</h3>
                      <div className="flex items-center justify-between sm:justify-start gap-3 mt-2">
                        <span className="font-black text-slate-800">₹{item.price}</span>
                        <span className={`text-[10px] sm:text-xs font-bold px-2 py-1 rounded ${item.stock === 'In Stock' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                          {item.stock}
                        </span>
                      </div>
                    </div>
                    <button 
                      disabled={item.stock !== 'In Stock'}
                      className="mt-4 w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-xl font-semibold hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "notifications" && (
            <motion.div key="notifications" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">Notification Center</h2>
              <div className="flex flex-col gap-3">
                {notifications.map(notif => (
                  <div key={notif.id} className={`p-4 rounded-2xl border ${notif.unread ? 'bg-teal-50/50 border-teal-100' : 'bg-white border-slate-100'} flex gap-3 sm:gap-4`}>
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${notif.unread ? 'bg-teal-100 text-teal-600' : 'bg-slate-100 text-slate-500'}`}>
                      <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h3 className={`font-bold text-sm sm:text-base ${notif.unread ? 'text-teal-900' : 'text-slate-800'}`}>{notif.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{notif.message}</p>
                      <span className="text-[10px] sm:text-xs text-slate-400 mt-2 block">{notif.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "loyalty" && (
            <motion.div key="loyalty" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col items-center py-4 sm:py-8 text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-amber-50 rounded-full flex items-center justify-center mb-6 relative">
                <Award className="w-10 h-10 sm:w-12 sm:h-12 text-amber-500" />
                <span className="absolute -bottom-2 -right-2 bg-slate-900 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-lg">GOLD</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mb-2">1,250 Points</h2>
              <p className="text-sm sm:text-base text-slate-500 mb-8 max-w-md px-4">You are a Gold member! You earn 2x points on every purchase and get early access to sales.</p>
              
              <div className="w-full max-w-md bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4 text-left text-sm sm:text-base">Available Rewards</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-white rounded-xl border border-slate-200 gap-3">
                    <div className="flex items-center gap-3">
                      <Gift className="w-5 h-5 text-teal-600 shrink-0" />
                      <span className="font-semibold text-sm">₹100 Off Coupon</span>
                    </div>
                    <button className="w-full sm:w-auto text-sm font-bold text-teal-600 bg-teal-50 px-3 py-2 sm:py-1 rounded-lg hover:bg-teal-100">Redeem (500 pts)</button>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-white rounded-xl border border-slate-200 gap-3">
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5 text-teal-600 shrink-0" />
                      <span className="font-semibold text-sm">Free Shipping</span>
                    </div>
                    <button className="w-full sm:w-auto text-sm font-bold text-teal-600 bg-teal-50 px-3 py-2 sm:py-1 rounded-lg hover:bg-teal-100">Redeem (800 pts)</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
