"use client";

import { useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { motion, AnimatePresence } from "motion/react";

const CATEGORIES = ["All Products", "Disinfectants", "Personal Care", "Kitchen Care", "Laundry Care"];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filteredProducts = PRODUCTS.filter(
    (product) => activeCategory === "All Products" || product.category === activeCategory
  );

  return (
    <div className="flex flex-col gap-6 w-full py-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-slate-800">Products</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-600 outline-none w-full sm:w-auto focus:ring-2 focus:ring-teal-500">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Best Selling</option>
          </select>
          <button 
            className="md:hidden bg-teal-50 border border-teal-100 text-teal-600 px-4 py-2 rounded-lg font-medium"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            Filters
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 relative">
        <div className={`
          w-full md:w-64 bg-white rounded-2xl border border-slate-200 p-6 flex-col gap-4 shadow-sm shrink-0 md:flex
          ${isMobileMenuOpen ? 'flex absolute top-0 left-0 right-0 z-20 shadow-xl' : 'hidden'}
        `}>
          <div className="flex items-center justify-between md:hidden mb-2">
            <h3 className="font-bold text-slate-800">Filters</h3>
            <button title="Close Filters" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-500 p-2 hover:bg-slate-100 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest hidden md:block">Categories</h3>
          <div className="flex flex-col gap-1">
            {CATEGORIES.map(category => (
              <button 
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between p-2 rounded-lg font-semibold transition-colors ${
                  activeCategory === category 
                    ? "bg-teal-50 text-teal-700" 
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>{category}</span>
                <span className={`text-xs px-1.5 rounded ${activeCategory === category ? "bg-teal-200" : "text-slate-400"}`}>
                   {category === "All Products" ? PRODUCTS.length : PRODUCTS.filter(p => p.category === category).length}
                </span>
              </button>
            ))}
          </div>
          
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-4">Availability</h3>
          <div className="flex flex-col gap-3 mt-1">
             <label className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer">
               <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
               In Stock Only
             </label>
             <label className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer">
               <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
               Bulk Sizes
             </label>
          </div>
        </div>

        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">No products found</h3>
              <p className="text-slate-500">We couldn't find any products in this category.</p>
              <button 
                onClick={() => setActiveCategory("All Products")}
                className="mt-4 text-teal-600 font-semibold hover:underline"
              >
                View all products
              </button>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    key={product.id}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-10 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
}
