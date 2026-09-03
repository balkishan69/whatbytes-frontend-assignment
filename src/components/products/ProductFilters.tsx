'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Home'];

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams?.get('category') || 'All';
  const currentPrice = searchParams?.get('price') || '1000';

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString() || '');
      if (value && value !== 'All') {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleCategoryChange = (category: string) => {
    router.push(`/?${createQueryString('category', category)}`);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(`/?${createQueryString('price', e.target.value)}`);
  };

  return (
    <div className="bg-primary text-white p-6 rounded-lg shadow-md w-full md:w-64 flex-shrink-0">
      <h2 className="text-xl font-bold mb-6">Filters</h2>

      <div className="mb-8">
        <h3 className="font-semibold mb-3">Category</h3>
        <ul className="space-y-2">
          {CATEGORIES.map((category) => (
            <li key={category}>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={currentCategory === category || (category === 'All' && !searchParams?.get('category'))}
                  onChange={() => handleCategoryChange(category)}
                  className="form-radio text-white bg-transparent border-white/40 focus:ring-white/50 h-4 w-4"
                />
                <span className="text-sm">{category}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Price</h3>
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={currentPrice}
          onChange={handlePriceChange}
          className="w-full accent-white"
        />
        <div className="flex justify-between text-xs mt-2 text-white/80">
          <span>0</span>
          <span>{currentPrice}</span>
        </div>
      </div>
    </div>
  );
}
