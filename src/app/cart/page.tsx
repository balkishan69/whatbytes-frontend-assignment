'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { state, dispatch, isHydrated } = useCart();

  if (!isHydrated) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: newQuantity } });
  };

  const handleRemove = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const subtotal = state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 10 : 0; // Flat $10 shipping
  const total = subtotal + shipping;

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center flex-1 flex flex-col items-center justify-center">
        <div className="bg-gray-100 rounded-full p-6 mb-6">
          <Trash2 className="h-12 w-12 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven&apos;t added anything to your cart yet.</p>
        <Link 
          href="/"
          className="bg-primary hover:bg-[#08376b] text-white px-8 py-3 rounded-lg transition-colors inline-flex items-center"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 flex-1">
      <h1 className="text-3xl font-bold text-[#0a4687] mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <ul className="divide-y divide-gray-100">
              {state.items.map((item) => (
                <li key={item.product.id} className="p-6 flex flex-col sm:flex-row items-center gap-6 hover:bg-gray-50/50 transition-colors">
                  <div className="relative w-24 h-24 bg-gray-50 rounded-md flex-shrink-0 border border-gray-100">
                    <Image
                      src={item.product.image}
                      alt={item.product.title}
                      fill
                      className="object-contain p-2"
                      sizes="96px"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col w-full text-center sm:text-left">
                    <Link href={`/product/${item.product.id}`} className="hover:text-primary transition-colors">
                      <h3 className="font-semibold text-lg text-gray-900">{item.product.title}</h3>
                    </Link>
                    <p className="text-gray-500 text-sm mb-2">{item.product.category}</p>
                    <p className="font-bold text-gray-900 sm:hidden">${item.product.price}</p>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center border border-gray-300 rounded-md bg-white">
                      <button 
                        onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4 text-gray-600" />
                      </button>
                      <span className="w-10 text-center font-medium text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>

                    <div className="hidden sm:block font-bold w-20 text-right text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>

                    <button 
                      onClick={() => handleRemove(item.product.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-primary hover:bg-[#08376b] text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
