'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: { product } });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col overflow-hidden h-full">
      <Link href={`/product/${product.id}`} className="block relative aspect-square w-full bg-gray-50 p-4">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>
      
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg text-gray-900 leading-tight mb-1 hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="font-bold text-gray-900 mb-2">${product.price}</p>
        
        {/* Rating */}
        {product.rating && (
          <div className="flex items-center mb-3 text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(product.rating!) ? 'fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
        )}
        
        {/* Description Snippet (matching reference visual spacing) */}
        <p className="text-sm text-gray-500 line-clamp-2 mb-2 flex-1">
          {product.description}
        </p>
        
        <p className="text-xs text-gray-400 mb-4 uppercase tracking-wider">
          Category: {product.category}
        </p>

        <button 
          onClick={handleAddToCart}
          className="w-full bg-primary hover:bg-[#08376b] text-white font-medium py-2 px-4 rounded transition-colors mt-auto"
          aria-label={`Add ${product.title} to cart`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

