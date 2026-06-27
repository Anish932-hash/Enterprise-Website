"use client";

import Link from "next/link";
import { CheckCircle, Package, Download } from "lucide-react";
import { jsPDF } from "jspdf";

export default function OrderSuccessPage({ params }: { params: { id: string } }) {
  const handleDownloadInvoice = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Invoice", 20, 20);
    doc.setFontSize(12);
    doc.text(`Order ID: ${params.id}`, 20, 30);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 40);
    
    doc.text("Item", 20, 70);
    doc.text("Amount", 150, 70);
    doc.line(20, 72, 190, 72);
    
    doc.text("PureClean 5L Multi-Surface", 20, 80);
    doc.text("Rs. 1,250", 150, 80);
    
    doc.line(20, 90, 190, 90);
    doc.setFontSize(14);
    doc.text("Total:", 120, 100);
    doc.text("Rs. 1,250", 150, 100);

    doc.save(`Invoice_${params.id}.pdf`);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center max-w-lg w-full">
        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-500 mb-6">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-8 flex items-center justify-center space-x-3 text-sm text-gray-700">
          <Package className="w-5 h-5 text-gray-400" />
          <span>Order ID: <span className="font-semibold">{params.id}</span></span>
        </div>

        <div className="space-y-3">
          <button 
            onClick={handleDownloadInvoice}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition"
          >
            <Download className="w-4 h-4" />
            Download Invoice
          </button>
          <Link href={`/tracking`} className="block w-full bg-white text-gray-700 border border-gray-300 font-medium py-3 rounded-lg hover:bg-gray-50 transition">
            Track Order
          </Link>
          <Link href="/products" className="block w-full bg-white text-gray-700 border border-gray-300 font-medium py-3 rounded-lg hover:bg-gray-50 transition">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
