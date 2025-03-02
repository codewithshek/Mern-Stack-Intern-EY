import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Clock, MapPin, CreditCard, Truck } from 'lucide-react';
import toast from 'react-hot-toast';

interface OrderItem {
  menuItem: {
    _id: string;
    name: string;
    imageUrl: string;
  };
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  restaurant: {
    _id: string;
    name: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
    phone: string;
  };
  items: OrderItem[];
  totalAmount: number;
  status: string;
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentMethod: string;
  paymentStatus: string;
  deliveryInstructions?: string;
  createdAt: string;
}

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/orders/${id}`);
        setOrder(response.data);
      } catch (err) {
        setError('Failed to fetch order details. Please try again later.');
        console.error('Error fetching order details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrderDetails();
    }
  }, [id]);

  const handleCancelOrder = async () => {
    if (!order) return;
    
    try {
      await axios.put(`/orders/${order._id}/cancel`);
      
      // Update the order status in the UI
      setOrder({
        ...order,
        status: 'cancelled'
      });
      
      toast.success('Order cancelled successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to cancel order');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'preparing':
        return 'bg-purple-100 text-purple-800';
      case 'out for delivery':
        return 'bg-indigo-100 text-indigo-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-red-600 py-8">{error || 'Order not found'}</div>
        <div className="text-center">
          <Link
            to="/my-orders"
            className="inline-flex items-center text-orange-600 hover:text-orange-700"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to My Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link
          to="/my-orders"
          className="inline-flex items-center text-orange-600 hover:text-orange-700"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to My Orders
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Order #{order._id.substring(0, 8)}
              </h1>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <Clock size={16} className="mr-1" />
                <span>{formatDate(order.createdAt)}</span>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Order Items</h2>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.menuItem.imageUrl}
                          alt={item.menuItem.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{item.menuItem.name}</h3>
                            <p className="ml-4">₹{(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">₹{item.price.toFixed(2)} each</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">Qty {item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <p>Subtotal</p>
                    <p>₹{(order.totalAmount - 40 - order.totalAmount * 0.05).toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <p>Delivery Fee</p>
                    <p>₹40.00</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <p>Tax (5%)</p>
                    <p>₹{(order.totalAmount * 0.05).toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total</p>
                    <p>₹{order.totalAmount.toFixed(2)}</p>
                  </div>
                </div>
                
                {(order.status === 'pending' || order.status === 'confirmed') && (
                  <div className="mt-6">
                    <button
                      onClick={handleCancelOrder}
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                      Cancel Order
                    </button>
                  </div>
                )}
              </div>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-4">Restaurant</h2>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-medium text-gray-900">{order.restaurant.name}</h3>
                    <p className="text-gray-600 mt-2">
                      {order.restaurant.address.street}, {order.restaurant.address.city}, {order.restaurant.address.state} {order.restaurant.address.zipCode}
                    </p>
                    <p className="text-gray-600 mt-1">{order.restaurant.phone}</p>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold mb-4">Delivery Information</h2>
                  <div className="bg-gray-50 p-4 rounded-md space-y-4">
                    <div>
                      <div className="flex items-start">
                        <MapPin size={16} className="mr-2 mt-1 flex-shrink-0 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Delivery Address</p>
                          <p className="text-gray-900">
                            {order.deliveryAddress.street}, {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-start">
                        <CreditCard size={16} className="mr-2 mt-1 flex-shrink-0 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Payment Method</p>
                          <p className="text-gray-900 capitalize">{order.paymentMethod}</p>
                          <p className="text-sm text-gray-500 mt-1">Payment Status</p>
                          <p className="text-gray-900 capitalize">{order.paymentStatus}</p>
                        </div>
                      </div>
                    </div>
                    
                    {order.deliveryInstructions && (
                      <div>
                        <div className="flex items-start">
                          <Truck size={16} className="mr-2 mt-1 flex-shrink-0 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500">Delivery Instructions</p>
                            <p className="text-gray-900">{order.deliveryInstructions}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;