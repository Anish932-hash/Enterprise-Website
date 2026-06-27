"use client";

import { useCart } from "./CartProvider";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div 
          key="cart-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )}
      {isCartOpen && (
        <motion.div 
          key="cart-drawer"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-50 flex flex-col"
        >
          <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              Your Cart
            </h2>
            <button 
              title="Close"
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-4 bg-slate-50">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                </div>
                <p>Your cart is empty.</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-teal-600 font-semibold hover:underline"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="bg-white border border-slate-200 p-3 sm:p-4 rounded-xl flex gap-4 shadow-sm items-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                    {item.image || <div className="w-8 h-8 bg-teal-100 rounded-full"></div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-800 truncate text-sm sm:text-base">{item.name}</h4>
                    <div className="text-xs text-slate-500 mb-2">{item.size}</div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-teal-900">₹{item.price}</span>
                      <div className="flex items-center gap-2 sm:gap-3 bg-slate-100 rounded-lg p-1">
                        <button 
                          title="Decrease quantity"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center bg-white rounded-md text-slate-600 shadow-sm hover:text-teal-600"
                        >
                          -
                        </button>
                        <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                        <button 
                          title="Increase quantity"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center bg-white rounded-md text-slate-600 shadow-sm hover:text-teal-600"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button 
                    title="Remove item"
                    onClick={() => removeFromCart(item.id)}
                    className="text-slate-400 hover:text-red-500 p-2 sm:p-1 self-start"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-slate-100 bg-white">
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-500 font-medium">Subtotal</span>
                <span className="text-xl font-bold text-slate-800">₹{cartTotal}</span>
              </div>
              <p className="text-xs text-slate-500 mb-4 text-center">Shipping and taxes calculated at checkout.</p>
              <Link href="/checkout" onClick={() => setIsCartOpen(false)} className="w-full block text-center bg-teal-600 text-white font-bold py-3 sm:py-4 rounded-xl hover:bg-teal-700 transition-colors shadow-lg active:scale-[0.98]">
                Checkout
              </Link>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
