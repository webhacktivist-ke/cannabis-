import React from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { useApp } from '../App';
import { Link } from 'react-router-dom';

export const CartSidebar: React.FC = () => {
  const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity, cartTotal } = useApp();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={toggleCart}
      />

      {/* Sidebar */}
      <div className="relative w-full max-w-md bg-white shadow-2xl flex flex-col h-full animate-slideIn">
        <div className="p-4 flex items-center justify-between border-b">
          <h2 className="text-lg font-bold flex items-center gap-2">
            Your Cart <span className="text-sm font-normal text-stone-500">({cart.length} items)</span>
          </h2>
          <button onClick={toggleCart} className="p-2 hover:bg-stone-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-12 text-stone-500">
              <p className="mb-4">Your cart is empty.</p>
              <button onClick={toggleCart} className="text-brand-green font-medium hover:underline">
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4 last:border-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-20 h-20 object-cover rounded-lg bg-stone-100"
                />
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium line-clamp-1">{item.name}</h3>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-stone-400 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-stone-500 mb-2">{item.type} • {item.thc}% THC</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center border rounded-lg">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 px-2 hover:bg-stone-100"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 px-2 hover:bg-stone-100"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="font-bold text-brand-dark">
                      ${((item.salePrice || item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t bg-stone-50">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Subtotal</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Taxes (Est.)</span>
                <span className="font-medium">${(cartTotal * 0.15).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                <span>Total</span>
                <span className="text-brand-green">${(cartTotal * 1.15).toFixed(2)}</span>
              </div>
            </div>
            <Link 
              to="/checkout"
              onClick={toggleCart}
              className="block w-full bg-brand-green text-white text-center py-3 rounded-xl font-bold hover:bg-brand-dark transition-colors shadow-lg shadow-brand-green/30"
            >
              Checkout Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};