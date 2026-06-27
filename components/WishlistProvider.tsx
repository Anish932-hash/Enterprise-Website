"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type WishlistItem = {
  id: number;
  name: string;
  price: number;
  image?: React.ReactNode;
  category: string;
  desc: string;
};

type WishlistContextType = {
  items: WishlistItem[];
  addToWishlist: (product: any) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  wishlistCount: number;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) {
      try {
        // Since images are React nodes in our mock data, they don't serialize well.
        // We'll just rely on the IDs for a real app, but for now we'll parse what we can.
        // Actually, just storing IDs would be better and then map from lib/data.tsx,
        // but since we only have client components, let's just use the state directly.
        setItems(JSON.parse(saved));
      } catch (e) {}
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      // Don't save React nodes to localStorage, just the primitive fields
      const itemsToSave = items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        category: item.category,
        desc: item.desc
      }));
      localStorage.setItem("wishlist", JSON.stringify(itemsToSave));
    }
  }, [items, isLoaded]);

  const addToWishlist = (product: any) => {
    setItems((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const isInWishlist = (id: number) => {
    return items.some((item) => item.id === id);
  };

  const wishlistCount = items.length;

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
