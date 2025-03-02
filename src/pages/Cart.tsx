import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart: React.FC = () => {
  const { items, totalItems, totalAmount, updateQuantity, removeFromCart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  if (totalItems === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Cart</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <div className="flow-root">
            <ul className="-my-6 divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="py-6 flex">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.name}</h3>
                        <p className="ml-4">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">₹{item.price.toFixed(2)} each</p>
                    </div>
                    
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center border rounded-md">
                        <button
                          type="button"
                          className="p-2 text-gray-600 hover:text-gray-900"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-2">{item.quantity}</span>
                        <button
                          type="button"
                          className="p-2 text-gray-600 hover:text-gray-900"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        type="button"
                        className="font-medium text-red-600 hover:text-red-500 flex items-center"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={16} className="mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
            <p>Subtotal</p>
            <p>₹{totalAmount.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
            <p>Delivery Fee</p>
            <p>₹40.00</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
            <p>Tax</p>
            <p>₹{(totalAmount * 0.05).toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-lg font-bold text-gray-900 mb-4 pt-4 border-t">
            <p>Total</p>
            <p>₹{(totalAmount + 40 + totalAmount * 0.05).toFixed(2)}</p>
          </div>
          <div className="mt-6 space-y-4">
            <button
              type="button"
              className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
            <button
              type="button"
              className="w-full flex justify-center items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              onClick={() => clearCart()}
            >
              Clear Cart
            </button>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{' '}
              <Link to="/" className="font-medium text-orange-600 hover:text-orange-500">
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;