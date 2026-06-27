"use client";

import { useCart } from "@/components/CartProvider";
import { useWishlist } from "@/components/WishlistProvider";
import { motion } from "motion/react";
import React from "react";
import Link from "next/link";

export type Product = {
  id: number;
  name: string;
  category: string;
  desc: string;
  size: string;
  rating: number;
  reviews: number;
  price: number;
  oldPrice?: number;
  tag?: string;
  tagColor?: string;
  image: React.ReactNode;
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const isWishlisted = isInWishlist(product.id);

  return (
    <Link href={`/products/${product.id}`} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-3xl">
      <motion.div 
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="bg-white rounded-3xl border border-slate-200 p-3 shadow-sm hover:shadow-xl hover:border-teal-200 transition-all group flex flex-col h-full relative overflow-hidden"
      >
        {/* Top Image Section */}
        <div className="h-56 bg-slate-50/80 rounded-2xl mb-4 relative overflow-hidden flex items-center justify-center transition-colors group-hover:bg-teal-50/50">
          <motion.div whileHover={{ scale: 1.08 }} className="flex items-center justify-center w-full h-full transition-transform duration-500">
            {product.image}
          </motion.div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.tag && (
              <div className={`text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md w-fit ${product.tagColor}`}>
                {product.tag}
              </div>
            )}
            {product.oldPrice && (
              <div className="text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md bg-red-100 text-red-600 w-fit">
                {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (isWishlisted) {
                removeFromWishlist(product.id);
              } else {
                addToWishlist(product);
              }
            }}
            className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 transform ${isWishlisted ? 'bg-red-50 text-red-500 hover:bg-red-100 scale-100' : 'bg-white/80 text-slate-400 hover:text-red-500 hover:bg-white scale-95 hover:scale-100'} shadow-sm hover:shadow z-10`}
          >
            <svg className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </button>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 px-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md uppercase tracking-wide">{product.category}</span>
            <div className="flex items-center text-amber-400 bg-amber-50 px-1.5 py-0.5 rounded-md">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <span className="text-[11px] ml-1 text-amber-700 font-bold">{product.rating}</span>
              <span className="text-[10px] ml-1 text-amber-600/70">({product.reviews})</span>
            </div>
          </div>

          <h4 className="font-bold text-slate-800 text-lg mb-1.5 group-hover:text-teal-600 transition-colors leading-tight line-clamp-1">{product.name}</h4>
          
          <p className="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed flex-1">{product.desc}</p>
          
          <div className="flex items-end justify-between mt-auto mb-4">
            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-slate-400 mb-0.5">{product.size}</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-slate-900 tracking-tight">₹{product.price}</span>
                {product.oldPrice && (
                  <span className="text-sm font-semibold text-slate-400 line-through">₹{product.oldPrice}</span>
                )}
              </div>
            </div>
          </div>

          <motion.button 
            title="Add to Cart"
            whileTap={{ scale: 0.97 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
            className="w-full bg-slate-900 text-white py-3 px-4 rounded-xl font-bold hover:bg-teal-600 transition-all duration-300 shadow-sm flex items-center justify-center gap-2 group/btn relative z-10"
          >
            <svg className="w-5 h-5 group-hover/btn:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            <span>Add to Cart</span>
          </motion.button>
        </div>
      </motion.div>
    </Link>
  );
}
