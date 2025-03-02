import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Users, ShoppingBag, Store, DollarSign } from 'lucide-react';

interface DashboardStats {
  totalOrders: number;
  totalUsers: number;
  totalRestaurants: number;
  totalRevenue: number;
  recentOrders: Array<{
    _id: string;
    user: {
      name: string;
    };
    restaurant: {
      name: string;
    };
    totalAmount: number;
    status: string;
    createdAt: string;
  }>;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalUsers: 0,
    totalRestaurants: 0,
    totalRevenue: 0,
    recentOrders: []
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch this data from your API
    // For this demo, we'll simulate it with a timeout
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setStats({
          totalOrders: 156,
          totalUsers: 89,
          totalRestaurants: 12,
          totalRevenue: 45680,
          recentOrders: [
            {
              _id: '1',
              user: { name: 'John Doe' },
              restaurant: { name: 'Spice Garden' },
              totalAmount: 450,
              status: 'delivered',
              createdAt: new Date().toISOString()
            },
            {
              _id: '2',
              user: { name: 'Jane Smith' },
              restaurant: { name: 'Tandoori Nights' },
              totalAmount: 780,
              status: 'preparing',
              createdAt: new Date().toISOString()
            },
            {
              _id: '3',
              user: { name: 'Mike Johnson' },
              restaurant: { name: 'Curry House' },
              totalAmount: 320,
              status: 'confirmed',
              createdAt: new Date().toISOString()
            },
            {
              _id: '4',
              user: { name: 'Sarah Williams' },
              restaurant: { name: 'Delhi Delights' },
              totalAmount: 560,
              status: 'out for delivery',
              createdAt: new Date().toISOString()
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

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
      month: 'short',
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-orange-100 rounded-md p-3">
              <ShoppingBag className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                <dd>
                  <div className="text-lg font-semibold text-gray-900">{stats.totalOrders}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                <dd>
                  <div className="text-lg font-semibold text-gray-900">{stats.totalUsers}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
              <Store className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Restaurants</dt>
                <dd>
                  <div className="text-lg font-semibold text-gray-900">{stats.totalRestaurants}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                <dd>
                  <div className="text-lg font-semibold text-gray-900">₹{stats.totalRevenue.toLocaleString()}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Restaurant
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.recentOrders.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.restaurant.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{order.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to={`/admin/orders/${order._id}`} className="text-orange-600 hover:text-orange-900">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-200">
          <Link to="/admin/orders" className="text-sm font-medium text-orange-600 hover:text-orange-500">
            View all orders
          </Link>
        </div>
      </div>
      
      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/restaurants" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Restaurants</h3>
          <p className="text-gray-600">Add, edit, or remove restaurants from the platform.</p>
        </Link>
        
        <Link to="/admin/menu-items" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Menu Items</h3>
          <p className="text-gray-600">Update menu items, prices, and availability.</p>
        </Link>
        
        <Link to="/admin/orders" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Orders</h3>
          <p className="text-gray-600">View and update order status and details.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;