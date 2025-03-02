import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface LocationState {
  orderId: string;
}

const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  
  useEffect(() => {
    // If no order ID is provided, redirect to home
    if (!state || !state.orderId) {
      navigate('/');
    }
  }, [state, navigate]);

  if (!state || !state.orderId) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-md overflow-hidden p-8 text-center">
        <div className="flex justify-center">
          <CheckCircle size={64} className="text-green-500" />
        </div>
        
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Order Placed Successfully!</h1>
        
        <p className="mt-2 text-gray-600">
          Thank you for your order. Your order has been received and is being processed.
        </p>
        
        <div className="mt-6 bg-gray-50 p-4 rounded-md inline-block">
          <p className="text-gray-700">Order ID: <span className="font-semibold">{state.orderId}</span></p>
        </div>
        
        <div className="mt-8 space-y-4">
          <Link
            to={`/orders/${state.orderId}`}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            View Order Details
          </Link>
          
          <div className="flex justify-center">
            <Link
              to="/my-orders"
              className="inline-flex items-center text-orange-600 hover:text-orange-700"
            >
              View All Orders
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-gray-600">
            You will receive an email confirmation shortly at your registered email address.
          </p>
          
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;