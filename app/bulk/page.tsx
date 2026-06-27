"use client";

import { useState } from "react";

export default function BulkOrdersPage() {
  const [orderType, setOrderType] = useState<"company" | "shop">("shop");

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto py-8">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Bulk Orders & Wholesale</h1>
        <p className="text-slate-600 text-lg">Partner with PureClean for commercial-grade hygiene solutions at wholesale prices. Perfect for offices, clinics, hotels, and restaurants.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
           <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
           </div>
           <h3 className="font-bold text-slate-800 mb-2">Volume Discounts</h3>
           <p className="text-sm text-slate-500">Get up to 40% off on retail prices when you order in bulk.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
           <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
           </div>
           <h3 className="font-bold text-slate-800 mb-2">Certified Quality</h3>
           <p className="text-sm text-slate-500">All products are tested and certified for commercial use.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
           <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
           </div>
           <h3 className="font-bold text-slate-800 mb-2">Priority Shipping</h3>
           <p className="text-sm text-slate-500">Fast and reliable delivery across all major cities.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 md:p-12 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Request a Wholesale Quote</h2>
        
        <div className="flex justify-center mb-8">
          <div className="bg-slate-100 p-1 rounded-xl flex gap-1 w-full max-w-sm">
            <button
              onClick={() => setOrderType("shop")}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                orderType === "shop" ? "bg-white text-teal-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Shop / Seller
            </button>
            <button
              onClick={() => setOrderType("company")}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                orderType === "company" ? "bg-white text-teal-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Company
            </button>
          </div>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto" onSubmit={(e) => e.preventDefault()}>
          {orderType === "shop" ? (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">Shop Name <span className="text-red-500">*</span></label>
                <input type="text" required className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 transition-shadow" placeholder="Your Shop Name" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">Contact Person <span className="text-red-500">*</span></label>
                <input type="text" required className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 transition-shadow" placeholder="John Doe" />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-700">Shop Address <span className="text-red-500">*</span></label>
                <input type="text" required className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 transition-shadow" placeholder="123 Market Street, City" />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">Company Name <span className="text-red-500">*</span></label>
                <input type="text" required className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 transition-shadow" placeholder="Your Company Ltd" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">Contact Person <span className="text-red-500">*</span></label>
                <input type="text" required className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 transition-shadow" placeholder="John Doe" />
              </div>
            </>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">Email Address <span className="text-slate-400 font-normal">(Optional)</span></label>
            <input type="email" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 transition-shadow" placeholder="john@example.com" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">Phone Number <span className="text-red-500">*</span></label>
            <input type="tel" required className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 transition-shadow" placeholder="+91 98765 43210" />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">Interested Products (approx. quantity)</label>
            <textarea className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 transition-shadow h-32 resize-none" placeholder="E.g., 50x 5L Premium Phenyle, 100x 1L Dish Wash..."></textarea>
          </div>
          <div className="md:col-span-2 flex justify-center mt-4">
            <button type="submit" className="bg-teal-600 text-white font-bold py-3 px-12 rounded-xl hover:bg-teal-700 transition-colors shadow-lg active:scale-[0.99] w-full sm:w-auto">
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
