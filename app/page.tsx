"use client";

import Link from "next/link";
import { PRODUCTS } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { motion } from "motion/react";

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 3);

  const categoryCounts = PRODUCTS.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categories = [
    { name: "Disinfectants", count: categoryCounts["Disinfectants"] || 0 },
    { name: "Personal Care", count: categoryCounts["Personal Care"] || 0 },
    { name: "Kitchen Care", count: categoryCounts["Kitchen Care"] || 0 },
    { name: "Laundry Care", count: categoryCounts["Laundry Care"] || 0 },
  ];

  return (
    <>
      <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full py-12 md:py-16 lg:py-20 bg-gradient-to-r from-teal-700 via-teal-800 to-indigo-900 rounded-3xl overflow-hidden shadow-xl shrink-0"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent)]"></div>
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-16 gap-8">
        <div className="max-w-xl text-center md:text-left z-10 flex-1">
          <div className="inline-flex items-center gap-2 bg-teal-400/20 text-teal-200 px-3 py-1 rounded-full text-xs font-semibold mb-6 backdrop-blur-md">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            TRUSTED BY 10,000+ HOMES & BUSINESSES
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Premium Cleaning Solutions <span className="text-teal-300 block mt-2">for Every Surface</span>
          </h1>
          <p className="text-teal-100 text-lg mb-8 leading-relaxed opacity-90 max-w-lg mx-auto md:mx-0">
            Professional-grade cleaning products designed specifically for your home and business.
          </p>
          <Link href="/bulk" className="inline-block bg-white text-teal-800 px-8 py-3.5 rounded-xl font-bold shadow-lg hover:bg-teal-50 hover:shadow-xl transition-all active:scale-95">
            Shop Bulk Packs
          </Link>
        </div>
        <div className="hidden md:flex ml-auto relative items-center justify-center flex-1 max-w-sm">
          <div className="w-72 h-72 bg-white/10 rounded-full blur-3xl absolute -top-10 -right-10"></div>
          <div className="relative z-10 w-full flex justify-center mt-8 md:mt-0 perspective-1000">
            <div className="w-56 h-72 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 transform rotate-2 hover:rotate-0 transition-all duration-500 shadow-2xl flex flex-col items-center justify-center p-6 group">
               <div className="w-28 h-40 bg-gradient-to-b from-teal-400 to-teal-600 rounded-2xl border-2 border-teal-300 relative shadow-xl flex items-end justify-center pb-4 group-hover:-translate-y-2 transition-transform duration-500">
                 <div className="absolute top-0 inset-x-6 h-4 bg-teal-200 rounded-b-sm"></div>
                 <div className="w-16 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                   <span className="text-white font-bold text-[10px] tracking-widest opacity-80">PURE</span>
                 </div>
               </div>
               <div className="mt-6 text-center">
                  <div className="text-white font-bold tracking-widest text-sm bg-black/20 px-3 py-1 rounded-md mb-1 inline-block">5L VALUE PACK</div>
                  <div className="text-teal-200 text-xs mt-1 font-medium">Premium Multipurpose</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-60 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-4 shadow-sm shrink-0">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Categories</h3>
          <div className="flex flex-col gap-1">
            {categories.map((cat, idx) => (
              <Link key={idx} href={`/products?category=${cat.name}`} className="flex items-center justify-between p-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                <span>{cat.name}</span>
                <span className="text-xs text-slate-400 bg-slate-100 px-1.5 rounded">{cat.count.toString().padStart(2, '0')}</span>
              </Link>
            ))}
          </div>
          
          <div className="mt-auto p-4 bg-teal-900 rounded-xl text-white">
            <p className="text-[10px] font-bold text-teal-400 uppercase mb-2">PROMO CODE</p>
            <p className="text-lg font-bold mb-1">CLEAN25</p>
            <p className="text-xs opacity-70">Save 25% on first order over ₹999</p>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * idx }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
