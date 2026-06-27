import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check, Star, ShieldCheck, Truck, ArrowLeft } from "lucide-react";
import AddToCartButton from "@/components/product/AddToCartButton";

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      variants: true,
      category: true,
    }
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/products" className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-8 transition">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Gallery */}
            <div className="p-8 md:border-r border-gray-100 bg-gray-50/50 flex flex-col justify-center items-center">
              <div className="relative w-full max-w-md aspect-square rounded-xl overflow-hidden shadow-lg bg-white">
                <Image 
                  src={product.images[0] || "https://picsum.photos/seed/product/800/800"} 
                  alt={product.name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex mt-6 space-x-4">
                {product.images.map((img, i) => (
                  <div key={i} className="relative w-20 h-20 rounded-md overflow-hidden border-2 border-blue-600 cursor-pointer">
                    <Image src={img} alt={`${product.name} view ${i}`} fill className="object-cover" referrerPolicy="no-referrer"/>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="p-8 md:p-12">
              <div className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">
                {product.category?.name}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                </div>
                <span className="text-gray-500 text-sm">(24 reviews)</span>
                <span className="text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded-md flex items-center">
                  <Check className="w-4 h-4 mr-1" /> In Stock
                </span>
              </div>

              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                {product.description}
              </p>

              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">Key Features:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add to Cart Component (Client Side logic) */}
              <AddToCartButton product={product} />

              <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  <span>Secure Payments</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
