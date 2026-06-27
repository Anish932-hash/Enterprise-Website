"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { PRODUCTS } from "@/lib/data";
import { useCart } from "@/components/CartProvider";
import { useWishlist } from "@/components/WishlistProvider";
import { motion } from "motion/react";
import Link from "next/link";

type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
};

// Initial mock reviews
const initialReviews: Record<number, Review[]> = {
  1: [
    { id: "r1", author: "Rajesh K.", rating: 5, date: "2023-10-15", content: "Excellent cleaning power. Very satisfied with the product!" },
    { id: "r2", author: "Sneha M.", rating: 4, date: "2023-09-28", content: "Good product, pleasant smell." }
  ],
  2: [
    { id: "r3", author: "Amit P.", rating: 5, date: "2023-11-02", content: "Tough on grease, gentle on hands. Will buy again." }
  ]
};

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id);
  const product = PRODUCTS.find((p) => p.id === productId);

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 5, content: "", name: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "reviews">("details");

  useEffect(() => {
    // Load reviews from local storage or fallback to initial
    const storedReviews = localStorage.getItem(`reviews_${productId}`);
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    } else {
      setReviews(initialReviews[productId] || []);
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Product Not Found</h2>
        <Link href="/products" className="bg-teal-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-teal-700 transition-colors">
          Back to Products
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : product.rating || 0;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.content.trim() || !newReview.name.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const review: Review = {
        id: Date.now().toString(),
        author: newReview.name,
        rating: newReview.rating,
        date: new Date().toISOString().split('T')[0],
        content: newReview.content
      };
      
      const updatedReviews = [review, ...reviews];
      setReviews(updatedReviews);
      localStorage.setItem(`reviews_${productId}`, JSON.stringify(updatedReviews));
      
      setNewReview({ rating: 5, content: "", name: "" });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto py-4">
      {/* Navigation & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back
        </button>
        <nav className="hidden sm:flex items-center text-sm text-slate-500 font-medium">
          <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-teal-600 transition-colors">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 line-clamp-1 max-w-[200px]">{product.name}</span>
        </nav>
      </div>

      {/* Main Product Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 bg-white p-6 sm:p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm">
        <div className="bg-slate-50 rounded-2xl aspect-square flex items-center justify-center relative overflow-hidden group">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full flex items-center justify-center"
          >
            {product.image}
          </motion.div>
          {product.tag && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-teal-600 to-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
              {product.tag}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-sm font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-md">{product.category}</span>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <span className="text-sm font-bold text-slate-700">{averageRating}</span>
              <span className="text-sm text-slate-500">({product.reviews + reviews.length} reviews)</span>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{product.name}</h1>
          <div className="text-3xl font-black text-teal-900 mb-6">₹{product.price}</div>
          
          <p className="text-slate-600 mb-8 leading-relaxed">
            {product.desc} Experience the premium quality of our cleaning solutions designed for both residential and commercial use. 
            Highly effective, pleasantly scented, and formulated to tackle the toughest stains while being safe for surfaces.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-8 border-t border-slate-100">
            <button
              title="Add to Cart"
              onClick={() => addToCart(product)}
              className="flex-1 bg-teal-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-teal-700 transition-colors shadow-md shadow-teal-600/20 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              Add to Cart
            </button>
            <button
              title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              onClick={() => isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
              className={`px-6 py-4 rounded-xl font-bold border-2 transition-all active:scale-[0.98] flex items-center justify-center gap-2
                ${isWishlisted ? 'border-red-500 text-red-500 bg-red-50' : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-white hover:bg-slate-50'}
              `}
            >
              <svg className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              {isWishlisted ? 'Wishlisted' : 'Wishlist'}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-100">
          <button
            onClick={() => setActiveTab("details")}
            className={`flex-1 py-4 font-bold text-sm transition-colors ${activeTab === "details" ? "text-teal-600 border-b-2 border-teal-600 bg-teal-50/30" : "text-slate-500 hover:bg-slate-50"}`}
          >
            Product Details
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`flex-1 py-4 font-bold text-sm transition-colors flex items-center justify-center gap-2 ${activeTab === "reviews" ? "text-teal-600 border-b-2 border-teal-600 bg-teal-50/30" : "text-slate-500 hover:bg-slate-50"}`}
          >
            Reviews & Feedback
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === "reviews" ? "bg-teal-100 text-teal-700" : "bg-slate-100 text-slate-500"}`}>{product.reviews + reviews.length}</span>
          </button>
        </div>

        <div className="p-6 md:p-8">
          {activeTab === "details" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-slate-600 space-y-6">
              <div>
                <h3 className="font-bold text-slate-800 mb-2">About this item</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Formulated with powerful active ingredients for deep cleaning.</li>
                  <li>Suitable for regular household and commercial applications.</li>
                  <li>Leaves a refreshing, long-lasting fragrance.</li>
                  <li>Manufactured maintaining high industry quality standards.</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-slate-800 mb-2">Directions for Use</h3>
                <p>Dilute according to the severity of cleaning required. For regular cleaning, mix 1 part of the solution with 10 parts water. Apply with a mop or cloth and wipe clean.</p>
              </div>
            </motion.div>
          )}

          {activeTab === "reviews" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col lg:flex-row gap-10">
              {/* Write Review Form */}
              <div className="w-full lg:w-1/3 flex flex-col gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100 h-fit">
                <h3 className="font-bold text-slate-800 text-lg">Write a Review</h3>
                <p className="text-sm text-slate-500 mb-2">Share your thoughts and feedback about this product.</p>
                
                <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700">Rating</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors focus:outline-none ${newReview.rating >= star ? 'text-amber-400 hover:text-amber-500' : 'text-slate-300 hover:text-amber-200'}`}
                        >
                          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500 transition-shadow text-sm" 
                      placeholder="John Doe" 
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700">Your Review</label>
                    <textarea 
                      required
                      value={newReview.content}
                      onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                      className="bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 transition-shadow h-28 resize-none text-sm" 
                      placeholder="What did you like or dislike?"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-slate-800 text-white font-bold py-3 px-4 rounded-xl hover:bg-slate-900 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              </div>

              {/* Reviews List */}
              <div className="flex-1 flex flex-col gap-6">
                <h3 className="font-bold text-slate-800 text-lg border-b border-slate-100 pb-4">Customer Reviews</h3>
                
                {reviews.length === 0 ? (
                  <div className="py-8 text-center text-slate-500">
                    <p>No reviews yet. Be the first to review this product!</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="flex flex-col gap-2 pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800">{review.author}</span>
                          <span className="text-xs text-slate-400 font-medium">{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-0.5 mb-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} className={`w-4 h-4 ${review.rating >= star ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                          ))}
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">{review.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
