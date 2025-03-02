import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import toast from 'react-hot-toast';

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  category: string;
  restaurant: {
    _id: string;
    name: string;
  };
  isVegetarian: boolean;
  isAvailable: boolean;
  imageUrl: string;
}

interface Restaurant {
  _id: string;
  name: string;
}

const AdminMenuItems: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [restaurantFilter, setRestaurantFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentMenuItem, setCurrentMenuItem] = useState<Partial<MenuItem> | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    restaurant: '',
    imageUrl: '',
    isVegetarian: false,
    isAvailable: true,
    spiceLevel: 'medium'
  });

  useEffect(() => {
    fetchMenuItems();
    fetchRestaurants();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      // In a real app, you would fetch all menu items
      // For this demo, we'll simulate it with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockMenuItems = [
        {
          _id: '1',
          name: 'Butter Chicken',
          price: 350,
          category: 'Main Course',
          restaurant: {
            _id: '1',
            name: 'Spice Garden'
          },
          isVegetarian: false,
          isAvailable: true,
          imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
          _id: '2',
          name: 'Paneer Tikka',
          price: 280,
          category: 'Starters',
          restaurant: {
            _id: '1',
            name: 'Spice Garden'
          },
          isVegetarian: true,
          isAvailable: true,
          imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
          _id: '3',
          name: 'Masala Dosa',
          price: 120,
          category: 'Breakfast',
          restaurant: {
            _id: '2',
            name: 'South Indian Delights'
          },
          isVegetarian: true,
          isAvailable: true,
          imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
          _id: '4',
          name: 'Chicken Biryani',
          price: 320,
          category: 'Main Course',
          restaurant: {
            _id: '3',
            name: 'Biryani House'
          },
          isVegetarian: false,
          isAvailable: true,
          imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
          _id: '5',
          name: 'Gulab Jamun',
          price: 100,
          category: 'Desserts',
          restaurant: {
            _id: '1',
            name: 'Spice Garden'
          },
          isVegetarian: true,
          isAvailable: true,
          imageUrl: 'https://images.unsplash.com/photo-1601303516534-bf0b1eb70866?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        }
      ];
      
      setMenuItems(mockMenuItems);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      toast.error('Failed to fetch menu items');
    } finally {
      setLoading(false);
    }
  };

  const fetchRestaurants = async () => {
    try {
      // In a real app, you would fetch all restaurants
      // For this demo, we'll use mock data
      const mockRestaurants = [
        { _id: '1', name: 'Spice Garden' },
        { _id: '2', name: 'South Indian Delights' },
        { _id: '3', name: 'Biryani House' }
      ];
      
      setRestaurants(mockRestaurants);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      toast.error('Failed to fetch restaurants');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: checked
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
    
    try {
      const menuItemData = {
        ...formData,
        price: parseFloat(formData.price)
      };
      
      if (currentMenuItem?._id) {
        // Update existing menu item
        await axios.put(`/menu/${currentMenuItem._id}`, menuItemData);
        toast.success('Menu item updated successfully');
      } else {
        // Create new menu item
        await axios.post('/menu', menuItemData);
        toast.success('Menu item added successfully');
      }
      
      // Refresh menu item list
      fetchMenuItems();
      
      // Close modal and reset form
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving menu item:', error);
      toast.error('Failed to save menu item');
    }
  };

  const handleEdit = (menuItem: MenuItem) => {
    setCurrentMenuItem(menuItem);
    setFormData({
      name: menuItem.name,
      description: '',
      price: menuItem.price.toString(),
      category: menuItem.category,
      restaurant: menuItem.restaurant._id,
      imageUrl: menuItem.imageUrl,
      isVegetarian: menuItem.isVegetarian,
      isAvailable: menuItem.isAvailable,
      spiceLevel: 'medium'
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      try {
        await axios.delete(`/menu/${id}`);
        toast.success('Menu item deleted successfully');
        fetchMenuItems();
      } catch (error) {
        console.error('Error deleting menu item:', error);
        toast.error('Failed to delete menu item');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      restaurant: '',
      imageUrl: '',
      isVegetarian: false,
      isAvailable: true,
      spiceLevel: 'medium'
    });
    setCurrentMenuItem(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  // Get unique categories for filter
  const categories = [...new Set(menuItems.map(item => item.category))];

  // Filter menu items based on search term, restaurant, and category
  const filteredMenuItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRestaurant = restaurantFilter === '' || item.restaurant._id === restaurantFilter;
    const matchesCategory = categoryFilter === '' || item.category === categoryFilter;
    
    return matchesSearch && matchesRestaurant && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Menu Items</h1>
        <button
          onClick={openAddModal}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          <Plus size={16} className="mr-2" />
          Add Menu Item
        </button>
      </div>
      
      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div>
          <select
            className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            value={restaurantFilter}
            onChange={(e) => setRestaurantFilter(e.target.value)}
          >
            <option value="">All Restaurants</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant._id} value={restaurant._id}>
                {restaurant.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <select
            className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Menu Items List */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : filteredMenuItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No menu items found. Add a new menu item to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Restaurant
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMenuItems.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={item.imageUrl}
                            alt={item.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">
                            {item.isVegetarian ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Veg
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Non-Veg
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">₹{item.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.restaurant.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {item.isAvailable ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Add/Edit Menu Item Modal */}
      {showModal && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    {currentMenuItem?._id ? 'Edit Menu Item' : 'Add Menu Item'}
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Item Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                          Price (₹)
                        </label>
                        <input
                          type="number"
                          id="price"
                          name="price"
                          min="0"
                          step="0.01"
                          value={formData.price}
                          onChange={handleChange}
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                          Category
                        </label>
                        <input
                          type="text"
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="restaurant" className="block text-sm font-medium text-gray-700">
                        Restaurant
                      </label>
                      <select
                        id="restaurant"
                        name="restaurant"
                        value={formData.restaurant}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      >
                        <option value="">Select a restaurant</option>
                        {restaurants.map((restaurant) => (
                          <option key={restaurant._id} value={restaurant._id}>
                            {restaurant.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                        Image URL
                      </label>
                      <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="spiceLevel" className="block text-sm font-medium text-gray-700">
                        Spice Level
                      </label>
                      <select
                        id="spiceLevel"
                        name="spiceLevel"
                        value={formData.spiceLevel}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      >
                        <option value="mild">Mild</option>
                        <option value="medium">Medium</option>
                        <option value="hot">Hot</option>
                        <option value="extra hot">Extra Hot</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isVegetarian"
                        name="isVegetarian"
                        checked={formData.isVegetarian}
                        onChange={handleChange}
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isVegetarian" className="ml-2 block text-sm text-gray-900">
                        Vegetarian
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isAvailable"
                        name="isAvailable"
                        checked={formData.isAvailable}
                        onChange={handleChange}
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isAvailable" className="ml-2 block text-sm text-gray-900">
                        Available
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {currentMenuItem?._id ? 'Update' : 'Add'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMenuItems;