'use client';

import { useState } from 'react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { Minus, Plus } from 'lucide-react';

export function ProductDetailClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  };

  return (
    <div className="mt-8">
      <div className="flex items-center space-x-4 mb-6">
        <span className="font-semibold text-gray-700">Quantity:</span>
        <div className="flex items-center border border-gray-300 rounded-md">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-2 hover:bg-gray-100 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4 text-gray-600" />
          </button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="p-2 hover:bg-gray-100 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>
      
      <button 
        onClick={handleAddToCart}
        className="w-full md:w-auto bg-primary hover:bg-[#08376b] text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg"
      >
        Add to Cart
      </button>
    </div>
  );
}
