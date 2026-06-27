"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  Home, 
  ShoppingBag,
  Search,
  MapPin,
  Clock,
  ArrowRight,
  Download
} from "lucide-react";
import Link from "next/link";

const trackingSteps = [
  { id: 0, title: "Order Placed", description: "We have received your order", icon: ShoppingBag },
  { id: 1, title: "Processing", description: "Your items are being packed", icon: Package },
  { id: 2, title: "Shipped", description: "Your package is on the way", icon: Truck },
  { id: 3, title: "Out for Delivery", description: "Your package is out for delivery", icon: Home },
  { id: 4, title: "Delivered", description: "Your package has been delivered", icon: CheckCircle2 },
];

export default function OrderTrackingPage() {
  const [trackingId, setTrackingId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [orderFound, setOrderFound] = useState(false);
  const [currentStep, setCurrentStep] = useState(2);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      setOrderFound(true);
      // Random step for demo purposes if specific tracking ID is entered, otherwise step 2
      setCurrentStep(trackingId === "DELIVERED" ? 4 : 2);
    }, 1200);
  };

  return (
    <div className="flex-1 w-full bg-slate-50 min-h-screen pb-12">
      {/* Hero Section */}
      <div className="bg-teal-900 text-white py-12 px-4 sm:px-6 mb-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4 tracking-tight">Track Your Order</h1>
          <p className="text-teal-100 mb-8 max-w-xl mx-auto">
            Enter your tracking number or order ID below to get real-time updates on your delivery status.
          </p>
          
          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="e.g. PC-84729103"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="w-full bg-white text-slate-900 rounded-full pl-12 pr-32 py-4 outline-none focus:ring-4 focus:ring-teal-500/30 transition-all font-medium text-lg shadow-lg"
            />
            <button 
              type="submit"
              disabled={isSearching}
              className="absolute right-2 top-2 bottom-2 bg-teal-600 hover:bg-teal-500 text-white px-6 rounded-full font-bold transition-colors flex items-center gap-2 disabled:opacity-70"
            >
              {isSearching ? "Searching..." : "Track"}
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {!orderFound && !isSearching && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Package className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">No active tracking selected</h2>
            <p className="text-slate-500 mb-6 max-w-sm mx-auto">
              Please enter your order ID in the search bar above to view the delivery progress.
            </p>
            <div className="text-sm text-slate-400 bg-slate-50 p-4 rounded-xl inline-block">
              Demo tip: Enter any ID to see "Shipped" status, or "DELIVERED" for completed status.
            </div>
          </div>
        )}

        {isSearching && (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-600 font-medium animate-pulse">Locating your package...</p>
          </div>
        )}

        {orderFound && !isSearching && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Order Summary Card */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-4 pb-4 border-b border-slate-100">Order Details</h3>
                
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Order ID</p>
                    <p className="text-slate-800 font-bold">{trackingId || "PC-84729103"}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Estimated Delivery</p>
                    <p className="text-teal-600 font-bold text-lg">Thursday, Aug 14</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Carrier</p>
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-700 font-medium">Express Logistics</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100">
                    <button 
                      onClick={() => alert("Invoice downloaded successfully.")}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download Invoice
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-4 pb-4 border-b border-slate-100">Delivery Address</h3>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-slate-800 font-bold">John Doe</p>
                    <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                      123 Innovation Drive<br />
                      Tech Park, Block B<br />
                      Bangalore, KA 560001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Tracking */}
            <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-800">Delivery Status</h2>
                <div className="flex items-center gap-2 text-sm font-semibold text-teal-600 bg-teal-50 px-3 py-1.5 rounded-lg">
                  <Clock className="w-4 h-4" />
                  {currentStep === 4 ? "Delivered" : "In Transit"}
                </div>
              </div>

              <div className="relative pl-4 sm:pl-8 py-4">
                {/* Vertical Line */}
                <div className="absolute left-8 sm:left-12 top-8 bottom-12 w-0.5 bg-slate-100 rounded-full"></div>
                
                {/* Active Line Progress */}
                <motion.div 
                  className="absolute left-8 sm:left-12 top-8 w-0.5 bg-teal-500 rounded-full origin-top"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  style={{ 
                    height: currentStep === 0 ? "0%" : `${(currentStep / (trackingSteps.length - 1)) * 100}%` 
                  }}
                ></motion.div>

                <div className="flex flex-col gap-8 relative z-10">
                  {trackingSteps.map((step, index) => {
                    const isCompleted = currentStep >= index;
                    const isCurrent = currentStep === index;
                    const Icon = step.icon;
                    
                    return (
                      <motion.div 
                        key={step.id} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.1 }}
                        className={`flex gap-4 sm:gap-6 ${!isCompleted && !isCurrent ? 'opacity-50 grayscale' : ''}`}
                      >
                        {/* Icon Node */}
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 border-4 ${
                          isCompleted 
                            ? 'bg-teal-500 border-teal-100 text-white' 
                            : isCurrent 
                              ? 'bg-white border-teal-500 text-teal-600 shadow-lg shadow-teal-500/20' 
                              : 'bg-white border-slate-200 text-slate-400'
                        } relative z-10 transition-colors duration-500`}>
                          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isCurrent ? 'animate-pulse' : ''}`} />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 pt-1 sm:pt-2 pb-6">
                          <h4 className={`text-base sm:text-lg font-bold ${isCompleted ? 'text-slate-800' : 'text-slate-500'}`}>
                            {step.title}
                          </h4>
                          <p className={`text-sm mt-1 ${isCompleted ? 'text-slate-600' : 'text-slate-400'}`}>
                            {step.description}
                          </p>
                          
                          {/* Fake Dates for demo */}
                          {isCompleted && (
                            <p className="text-xs font-semibold text-slate-400 mt-2 flex items-center gap-1.5">
                              {index === 0 && "Aug 12, 10:00 AM"}
                              {index === 1 && "Aug 12, 02:30 PM"}
                              {index === 2 && "Aug 13, 09:15 AM"}
                              {index === 3 && "Aug 14, 08:00 AM"}
                              {index === 4 && "Aug 14, 01:45 PM"}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
