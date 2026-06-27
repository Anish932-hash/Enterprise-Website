"use client";

import { useWishlist } from "@/components/WishlistProvider";
import { useCart } from "@/components/CartProvider";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { motion } from "motion/react";
import { PRODUCTS } from "@/lib/data";

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  // Map wishlist IDs back to full products from data to restore images
  const fullProducts = items
    .map(item => PRODUCTS.find(p => p.id === item.id))
    .filter(Boolean) as typeof PRODUCTS;

  return (
    <div className="flex flex-col gap-6 w-full py-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-slate-800">My Wishlist</h1>
        <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full">
          {items.length} {items.length === 1 ? 'Item' : 'Items'}
        </span>
      </div>

      {fullProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6 text-red-400">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Your wishlist is empty</h2>
          <p className="text-slate-500 mb-8 max-w-md">Save items you love to your wishlist and they will appear here so you can review and purchase them later.</p>
          <Link href="/products" className="bg-teal-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-teal-700 transition-colors shadow-md shadow-teal-600/20 active:scale-[0.98]">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {fullProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              layout
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
