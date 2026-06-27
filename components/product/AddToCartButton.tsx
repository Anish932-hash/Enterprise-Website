"use client";

import { useState } from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/cart";

export default function AddToCartButton({ product }: { product: any }) {
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  
  const selectedVariant = product.variants.find((v: any) => v.id === selectedVariantId);

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      variantName: selectedVariant.name,
      price: selectedVariant.price,
      image: product.images[0] || "https://picsum.photos/seed/product/400/400",
      quantity
    });
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
      <div className="mb-6">
        <div className="flex justify-between items-end mb-4">
          <h3 className="font-semibold text-gray-900">Select Size/Variant:</h3>
          <span className="text-3xl font-bold text-gray-900">
            ${selectedVariant?.price.toFixed(2)}
          </span>
        </div>
        <div className="flex flex-wrap gap-3">
          {product.variants.map((variant: any) => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariantId(variant.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                selectedVariantId === variant.id
                  ? "bg-blue-600 text-white border-2 border-blue-600 shadow-md"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300"
              }`}
            >
              {variant.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center bg-white border border-gray-300 rounded-lg h-12">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-gray-50 rounded-l-lg transition"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center font-medium text-gray-900">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-gray-50 rounded-r-lg transition"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <button 
          onClick={handleAddToCart}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-lg font-medium flex items-center justify-center transition shadow-sm hover:shadow-md"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
