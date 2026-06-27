"use client";

import { useCartStore } from "@/store/cart";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotals } = useCartStore();
  const { subtotal, tax, total } = getTotals();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trash2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/products" className="block w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <ul className="divide-y divide-gray-100">
                {items.map((item) => (
                  <li key={item.variantId} className="p-6 flex flex-col sm:flex-row sm:items-center gap-6">
                    <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <Link href={`/products/${item.productId}`} className="font-semibold text-gray-900 hover:text-blue-600 transition">
                          {item.name}
                        </Link>
                        <span className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">Variant: {item.variantName}</p>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center border border-gray-200 rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.variantId, Math.max(1, item.quantity - 1))}
                            className="px-3 py-1 text-gray-500 hover:text-blue-600 hover:bg-gray-50 rounded-l-md transition"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-3 py-1 font-medium text-gray-900 border-x border-gray-200 text-sm">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="px-3 py-1 text-gray-500 hover:text-blue-600 hover:bg-gray-50 rounded-r-md transition"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.variantId)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center transition"
                        >
                          <Trash2 className="w-4 h-4 mr-1" /> Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-sm text-gray-600 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-blue-600">${total.toFixed(2)}</span>
                </div>
              </div>
              
              <button 
                onClick={() => router.push("/checkout")}
                className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center shadow-sm"
              >
                Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              
              <div className="mt-4 text-center">
                <Link href="/products" className="text-sm text-gray-500 hover:text-blue-600 transition">
                  or Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
