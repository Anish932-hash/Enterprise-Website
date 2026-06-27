import React from "react";

export const PRODUCTS = [
  {
    id: 1,
    name: "Premium Phenyle",
    category: "Disinfectants",
    desc: "Deep clean, floral fragrance, 99.9% germ kill.",
    size: "5 Liters",
    rating: 4.9,
    reviews: 320,
    price: 449,
    oldPrice: 599,
    tag: "BEST SELLER",
    tagColor: "bg-green-500",
    image: (
      <div className="w-24 h-32 bg-gradient-to-b from-blue-100 to-blue-200 rounded-t-lg border-x border-t border-blue-300 relative">
        <div className="absolute inset-x-2 top-2 h-10 bg-white/60 rounded-sm"></div>
      </div>
    )
  },
  {
    id: 2,
    name: "Active Dish Wash",
    category: "Kitchen Care",
    desc: "Lemon power, tough on grease, gentle on hands.",
    size: "1 Liter",
    rating: 4.8,
    reviews: 120,
    price: 189,
    tag: "NEW",
    tagColor: "bg-blue-500 text-white",
    image: (
      <div className="w-20 h-28 bg-gradient-to-b from-blue-400 to-blue-500 rounded-full border-4 border-blue-200 relative"></div>
    )
  },
  {
    id: 3,
    name: "Bleaching Powder",
    category: "Disinfectants",
    desc: "Ultra disinfection for toilets and bathrooms.",
    size: "1 kg",
    rating: 4.5,
    reviews: 45,
    price: 125,
    oldPrice: 149,
    tag: "LOW STOCK",
    tagColor: "bg-red-500 text-white",
    image: (
      <div className="w-24 h-24 bg-white shadow-inner rounded-md border-2 border-slate-200 flex flex-col items-center justify-center">
        <div className="w-12 h-2 bg-slate-200 rounded mb-1"></div>
        <div className="text-[10px] font-bold text-slate-400">POWDER</div>
      </div>
    )
  },
  {
    id: 4,
    name: "Glass Cleaner",
    category: "Kitchen Care",
    desc: "Streak-free shine, removes tough stains and dust.",
    size: "500 ml",
    rating: 4.7,
    reviews: 89,
    price: 99,
    image: (
      <div className="w-20 h-24 bg-gradient-to-b from-blue-200 to-blue-300 rounded-lg border-2 border-blue-400 relative">
        <div className="absolute inset-x-2 top-2 h-6 bg-white/60 rounded-sm"></div>
      </div>
    )
  },
  {
    id: 5,
    name: "Floor Cleaner",
    category: "Disinfectants",
    desc: "Lavender breeze, kills 99.9% germs.",
    size: "2 Liters",
    rating: 4.9,
    reviews: 230,
    price: 249,
    oldPrice: 299,
    image: (
      <div className="w-24 h-24 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full border-4 border-white shadow-md relative"></div>
    )
  },
  {
    id: 6,
    name: "Hand Sanitizer",
    category: "Personal Care",
    desc: "70% Alcohol, kills germs instantly without water.",
    size: "500 ml",
    rating: 4.9,
    reviews: 512,
    price: 150,
    image: (
      <div className="w-16 h-28 bg-gradient-to-t from-slate-100 to-slate-200 rounded-xl border border-slate-300 relative">
        <div className="absolute top-0 inset-x-4 h-4 bg-blue-400 rounded-t-sm"></div>
      </div>
    )
  },
  {
    id: 7,
    name: "Liquid Detergent",
    category: "Laundry Care",
    desc: "Tough on stains, gentle on clothes. Machine wash safe.",
    size: "5 Liters",
    rating: 4.8,
    reviews: 140,
    price: 599,
    oldPrice: 799,
    tag: "VALUE PACK",
    tagColor: "bg-indigo-500 text-white",
    image: (
      <div className="w-24 h-32 bg-gradient-to-b from-indigo-400 to-indigo-600 rounded-2xl border border-indigo-300 relative flex items-end justify-center pb-2">
         <div className="w-16 h-12 bg-white/20 rounded-lg"></div>
      </div>
    )
  }
];
