import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Checkout: React.FC = () => {
  const { user } = useAuth();
  const { items, totalAmount, restaurantId, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    deliveryAddress: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      zipCode: user?.address?.zipCode || ''
    },
    paymentMethod: 'cash',
    deliveryInstructions: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof typeof formData] as Record<string, unknown>,
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!restaurantId) {
      toast.error('No restaurant selected');
      return;
    }
    
    setLoading(true);
    
    try {
      // Calculate total with tax and delivery fee
      const deliveryFee = 40;
      const tax = totalAmount * 0.05;
      const finalTotal = totalAmount + deliveryFee + tax;
      
      // Format order items
      const orderItems = items.map(item => ({
        menuItem: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }));
      
      // Create order
      const orderData = {
        restaurant: restaurantId,
        items: orderItems,
        totalAmount: finalTotal,
        deliveryAddress: formData.deliveryAddress,
        paymentMethod: formData.paymentMethod,
        deliveryInstructions: formData.deliveryInstructions
      };
      
      const response = await axios.post('/orders', orderData);
      
      // Clear cart after successful order
      clearCart();
      
      // Navigate to success page with order ID
      navigate('/order-success', { state: { orderId: response.data._id } });
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate totals
  const deliveryFee = 40;
  const tax = totalAmount * 0.05;
  const finalTotal = totalAmount + deliveryFee + tax;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Delivery and Payment Form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="deliveryAddress.street" className="block text-sm font-medium text-gray-700">
                      Street Address
                    </label>
                    <input
                      type="text"
                      id="deliveryAddress.street"
                      name="deliveryAddress.street"
                      value={formData.deliveryAddress.street}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="deliveryAddress.city" className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        id="deliveryAddress.city"
                        name="deliveryAddress.city"
                        value={formData.deliveryAddress.city}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="deliveryAddress.state" className="block text-sm font-medium text-gray-700">
                        State
                      </label>
                      <input
                        type="text"
                        id="deliveryAddress.state"
                        name="deliveryAddress.state"
                        value={formData.deliveryAddress.state}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="deliveryAddress.zipCode" className="block text-sm font-medium text-gray-700">
                      ZIP / Postal Code
                    </label>
                    <input
                      type="text"
                      id="deliveryAddress.zipCode"
                      name="deliveryAddress.zipCode"
                      value={formData.deliveryAddress.zipCode}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="cash"
                      name="paymentMethod"
                      type="radio"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleChange}
                      className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300"
                    />
                    <label htmlFor="cash" className="ml-3 block text-sm font-medium text-gray-700">
                      Cash on Delivery
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="card"
                      name="paymentMethod"
                      type="radio"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                      className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300"
                    />
                    <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700">
                      Credit/Debit Card
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="upi"
                      name="paymentMethod"
                      type="radio"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleChange}
                      className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300"
                    />
                    <label htmlFor="upi" className="ml-3 block text-sm font-medium text-gray-700">
                      UPI
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Delivery Instructions</h2>
                
                <div>
                  <textarea
                    id="deliveryInstructions"
                    name="deliveryInstructions"
                    rows={3}
                    value={formData.deliveryInstructions}
                    onChange={handleChange}
                    placeholder="Any special instructions for delivery? (Optional)"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-orange-400"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Place Order'
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-6">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="flow-root">
                <ul className="-my-4 divide-y divide-gray-200">
                  {items.map((item) => (
                    <li key={item.id} className="py-4 flex">
                      <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between text-sm font-medium text-gray-900">
                            <h3>{item.name}</h3>
                            <p className="ml-4">₹{(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="flex-1 flex items-end justify-between text-sm">
                          <p className="text-gray-500">Qty {item.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <p>Subtotal</p>
                  <p>₹{totalAmount.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <p>Delivery Fee</p>
                  <p>₹{deliveryFee.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <p>Tax (5%)</p>
                  <p>₹{tax.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total</p>
                  <p>₹{finalTotal.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;