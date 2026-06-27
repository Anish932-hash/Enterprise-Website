"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { useWishlist } from "@/components/WishlistProvider";
import { motion, AnimatePresence } from "motion/react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <nav className="sticky top-0 bg-white/80 backdrop-blur-lg border-b border-slate-200 shrink-0 shadow-sm z-30 transition-all">
      <div className="h-16 px-4 md:px-8 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2" title="PureClean Home">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-teal-900 italic">PURECLEAN</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link>
            <Link href="/products" className="hover:text-teal-600 transition-colors">Products</Link>
            <Link href="/bulk" className="hover:text-teal-600 transition-colors">Bulk Orders</Link>
            <Link href="/about" className="hover:text-teal-600 transition-colors">About</Link>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative hidden lg:block">
            <input type="text" placeholder="Search products..." className="bg-slate-100 border-none rounded-full py-2 px-4 text-sm w-64 focus:ring-2 focus:ring-teal-500 transition-all outline-none" />
          </div>
          <div className="flex items-center gap-1 md:gap-3 lg:border-l border-slate-200 lg:pl-4">
            <Link href="/wishlist" title="My Wishlist" className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">{wishlistCount}</span>
              )}
            </Link>
            <button 
              onClick={() => setIsCartOpen(true)}
              title="Shopping Cart"
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-teal-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">{cartCount}</span>
              )}
            </button>
            <Link href="/account" title="My Account" className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors hidden sm:block">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </Link>
            
            {/* Mobile Menu Toggle */}
            <button 
              title="Menu"
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-white border-t border-slate-100 px-4 py-4 absolute top-16 left-0 right-0 shadow-lg flex flex-col gap-4"
          >
            <div className="relative w-full">
              <input type="text" placeholder="Search products..." className="bg-slate-100 border-none rounded-lg py-2 px-4 text-sm w-full focus:ring-2 focus:ring-teal-500 transition-all outline-none" />
            </div>
            <div className="flex flex-col font-medium text-slate-600">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="py-3 border-b border-slate-50 hover:text-teal-600 transition-colors">Home</Link>
              <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="py-3 border-b border-slate-50 hover:text-teal-600 transition-colors">Products</Link>
              <Link href="/bulk" onClick={() => setIsMobileMenuOpen(false)} className="py-3 border-b border-slate-50 hover:text-teal-600 transition-colors">Bulk Orders</Link>
              <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="py-3 border-b border-slate-50 hover:text-teal-600 transition-colors flex items-center justify-between">
                Wishlist
                {wishlistCount > 0 && <span className="bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">{wishlistCount}</span>}
              </Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="py-3 border-b border-slate-50 hover:text-teal-600 transition-colors">About</Link>
              <Link href="/account" onClick={() => setIsMobileMenuOpen(false)} className="py-3 hover:text-teal-600 transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                My Account
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
