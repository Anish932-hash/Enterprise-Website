"use client";

import { useCart } from "@/components/CartProvider";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, cartTotal, cartCount } = useCart();
  const [step, setStep] = useState<"details" | "payment" | "success">("details");

  if (items.length === 0 && step !== "success") {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-400">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-8">Add some products to your cart to checkout.</p>
        <Link href="/products" className="bg-teal-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-teal-700 transition-colors">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto w-full pt-4 pb-12 flex flex-col lg:flex-row gap-8">
      {step === "success" ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center max-w-2xl mx-auto w-full"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">Order Confirmed!</h2>
          <p className="text-slate-600 mb-8 text-base sm:text-lg">Thank you for your purchase. We've sent a confirmation email with your order details.</p>
          <div className="bg-slate-50 rounded-2xl p-6 w-full mb-8 text-left border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-2">Order #PC-{Math.floor(Math.random() * 1000000)}</h3>
            <p className="text-sm text-slate-500 mb-1">Expected Delivery: 3-5 Business Days</p>
          </div>
          <Link href="/" className="bg-teal-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-teal-700 transition-colors w-full sm:w-auto">
            Return to Home
          </Link>
        </motion.div>
      ) : (
        <>
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex items-center gap-4 mb-2">
              <button 
                onClick={() => setStep("details")}
                className={`flex items-center gap-2 transition-colors ${step === "details" ? "text-teal-600 font-bold" : "text-slate-500 hover:text-slate-800"}`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step === "details" ? "bg-teal-600 text-white shadow-md shadow-teal-600/20" : "bg-slate-200 text-slate-600"}`}>1</div>
                Details
              </button>
              <div className="h-px bg-slate-200 flex-1"></div>
              <button 
                onClick={() => setStep("payment")}
                disabled={step === "details"}
                className={`flex items-center gap-2 transition-colors ${step === "payment" ? "text-teal-600 font-bold" : "text-slate-500"}`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step === "payment" ? "bg-teal-600 text-white shadow-md shadow-teal-600/20" : "bg-slate-200 text-slate-600"}`}>2</div>
                Payment
              </button>
            </div>

            {step === "details" && (
              <motion.form 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-6"
                onSubmit={(e) => { e.preventDefault(); setStep("payment"); }}
              >
                <h2 className="text-xl font-bold text-slate-800">Shipping Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">First Name <span className="text-red-500">*</span></label>
                    <input type="text" required className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 transition-shadow" placeholder="John" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">Last Name <span className="text-red-500">*</span></label>
                    <input type="text" required className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 transition-shadow" placeholder="Doe" />
                  </div>
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label className="text-sm font-semibold text-slate-700">Email Address <span className="text-red-500">*</span></label>
                    <input type="email" required className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 transition-shadow" placeholder="john@example.com" />
                  </div>
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label className="text-sm font-semibold text-slate-700">Address <span className="text-red-500">*</span></label>
                    <input type="text" required className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 transition-shadow" placeholder="123 Main St, Apartment 4B" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">City <span className="text-red-500">*</span></label>
                    <input type="text" required className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 transition-shadow" placeholder="City" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">Postal Code <span className="text-red-500">*</span></label>
                    <input type="text" required className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 transition-shadow" placeholder="10001" />
                  </div>
                </div>
                <button 
                  type="submit"
                  className="bg-teal-600 text-white w-full py-4 rounded-xl font-bold hover:bg-teal-700 transition-colors mt-2 shadow-md shadow-teal-600/20 active:scale-[0.99]"
                >
                  Continue to Payment
                </button>
              </motion.form>
            )}

            {step === "payment" && (
              <motion.form 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-6"
                onSubmit={(e) => { e.preventDefault(); setStep("success"); }}
              >
                <div className="flex items-center gap-4 mb-2">
                  <button type="button" onClick={() => setStep("details")} className="text-slate-400 hover:text-slate-600 bg-slate-50 p-2 rounded-full hover:bg-slate-100 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                  </button>
                  <h2 className="text-xl font-bold text-slate-800">Payment Method</h2>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="border-2 border-teal-500 bg-teal-50/30 p-4 rounded-2xl flex items-center justify-between cursor-pointer transition-colors shadow-sm">
                    <div className="flex items-center gap-3">
                      <input type="radio" name="payment" defaultChecked className="w-4 h-4 text-teal-600 focus:ring-teal-500" />
                      <span className="font-semibold text-teal-900">Credit / Debit Card</span>
                    </div>
                    <div className="flex gap-1.5">
                      <div className="w-8 h-5 bg-white border border-slate-200 shadow-sm rounded flex items-center justify-center font-bold text-[8px] text-slate-600">VISA</div>
                      <div className="w-8 h-5 bg-white border border-slate-200 shadow-sm rounded flex items-center justify-center font-bold text-[8px] text-slate-600">MC</div>
                    </div>
                  </label>

                  <label className="border border-slate-200 p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:border-slate-300 hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <input type="radio" name="payment" className="w-4 h-4 text-teal-600 focus:ring-teal-500" />
                      <span className="font-medium text-slate-700">UPI / QR Code</span>
                    </div>
                    <div className="w-8 h-5 bg-white border border-slate-200 shadow-sm rounded flex items-center justify-center font-bold text-[8px] text-slate-600">UPI</div>
                  </label>

                  <label className="border border-slate-200 p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:border-slate-300 hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <input type="radio" name="payment" className="w-4 h-4 text-teal-600 focus:ring-teal-500" />
                      <span className="font-medium text-slate-700">Cash on Delivery</span>
                    </div>
                    <div className="w-8 h-5 bg-white border border-slate-200 shadow-sm rounded flex items-center justify-center font-bold text-[8px] text-slate-600">COD</div>
                  </label>
                </div>

                <div className="mt-2 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">Card Number <span className="text-red-500">*</span></label>
                    <input type="text" required className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 transition-shadow" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-slate-700">Expiry Date <span className="text-red-500">*</span></label>
                      <input type="text" required className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 transition-shadow" placeholder="MM/YY" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-slate-700">CVV <span className="text-red-500">*</span></label>
                      <input type="password" required className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 transition-shadow" placeholder="123" />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="bg-slate-900 text-white w-full py-4 rounded-xl font-bold hover:bg-black transition-colors mt-4 shadow-lg shadow-slate-900/20 active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                  Pay ₹{cartTotal + 50} Securely
                </button>
              </motion.form>
            )}
          </div>

          <div className="w-full lg:w-96">
            <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200 lg:sticky lg:top-24">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Order Summary</h2>
              
              <div className="flex flex-col gap-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-white rounded-lg border border-slate-200 flex items-center justify-center shrink-0">
                      {item.image || <div className="w-8 h-8 bg-teal-100 rounded-full"></div>}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-slate-800 line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-slate-500 mb-1">Qty: {item.quantity}</p>
                      <p className="font-bold text-teal-900 text-sm">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-200 pt-4 flex flex-col gap-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Subtotal ({cartCount} items)</span>
                  <span className="font-semibold text-slate-800">₹{cartTotal}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Shipping</span>
                  <span className="font-semibold text-slate-800">₹50</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Taxes</span>
                  <span className="font-semibold text-green-600">Included</span>
                </div>
                <div className="h-px bg-slate-200 my-1"></div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Total</span>
                  <span className="text-2xl font-bold text-teal-900">₹{cartTotal + 50}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
