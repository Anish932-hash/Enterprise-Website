import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Users, Settings, PackageOpen } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="text-xl font-bold text-gray-900">Admin Panel</span>
        </div>
        <div className="flex-1 py-6 flex flex-col space-y-1">
          <Link href="/admin" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
            <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
            <ShoppingBag className="w-5 h-5 mr-3" /> Products
          </Link>
          <Link href="/admin/orders" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
            <PackageOpen className="w-5 h-5 mr-3" /> Orders
          </Link>
          <Link href="/admin/customers" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
            <Users className="w-5 h-5 mr-3" /> Customers
          </Link>
          <Link href="/admin/settings" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 mt-auto">
            <Settings className="w-5 h-5 mr-3" /> Settings
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
