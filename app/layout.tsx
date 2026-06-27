import type {Metadata} from 'next';
import './globals.css';
import { CartProvider } from '@/components/CartProvider';
import { WishlistProvider } from '@/components/WishlistProvider';
import AppLayout from '@/components/layout/AppLayout';

export const metadata: Metadata = {
  title: 'PureClean - Cleaning Products',
  description: 'Elite Hygiene Solutions',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans text-slate-900 bg-[#F8FAFC]" suppressHydrationWarning>
        <CartProvider>
          <WishlistProvider>
            <AppLayout>
              {children}
            </AppLayout>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}

