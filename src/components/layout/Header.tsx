'use client';

import Link from 'next/link';
import { ShoppingCart, User, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('q') || '');
  const { state, isHydrated } = useCart();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams?.toString() || '');
    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim());
    } else {
      params.delete('q');
    }
    // Navigate to home page with search params
    router.push(`/?${params.toString()}`);
  };

  return (
    <header className="bg-primary text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Logo
        </Link>

        {/* Search Bar - Center (Hidden on small mobile, visible on sm and up) */}
        <div className="hidden sm:flex flex-1 max-w-md mx-4">
          <form onSubmit={handleSearch} className="w-full relative">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-md py-2 pl-10 pr-4 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
          </form>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-6">
          <Link href="/cart" className="relative flex items-center group">
            <ShoppingCart className="h-6 w-6" />
            <span className="ml-2 hidden md:block">Cart</span>
            {/* Cart Badge */}
            {mounted && isHydrated && totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Link>
          <button className="flex items-center hover:opacity-80 transition-opacity">
            <User className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      {/* Mobile Search - Visible only on extra small screens */}
      <div className="sm:hidden px-4 pb-3">
        <form onSubmit={handleSearch} className="w-full relative">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-md py-2 pl-10 pr-4 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
        </form>
      </div>
    </header>
  );
}
