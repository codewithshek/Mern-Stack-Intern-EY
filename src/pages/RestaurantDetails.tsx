import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, MapPin, Phone, Mail } from 'lucide-react';
import MenuItem from '../components/MenuItem';

interface Restaurant {
  _id: string;
  name: string;
  description: string;
  cuisine: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone: string;
  email: string;
  rating: number;
  imageUrl: string;
  openingHours: {
    open: string;
    close: string;
  };
}

interface MenuItemType {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  isVegetarian: boolean;
  spiceLevel: string;
  restaurant: string;
}

const RestaurantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    const fetchRestaurantAndMenu = async () => {
      try {
        setLoading(true);
        setError('');
        
        const mockMenus = {
          '1': [ // North Indian Kitchen
            {
              _id: '101',
              name: 'Butter Chicken',
              description: 'Tender chicken in rich tomato-butter gravy',
              price: 350,
              category: 'Main Course',
              imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
              isVegetarian: false,
              spiceLevel: 'medium',
              restaurant: '1'
            },
            {
              _id: '102',
              name: 'Dal Makhani',
              description: 'Creamy black lentils',
              price: 250,
              category: 'Main Course',
              imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
              isVegetarian: true,
              spiceLevel: 'mild',
              restaurant: '1'
            },
            {
              _id: '103',
              name: 'Naan',
              description: 'Fresh baked Indian bread',
              price: 50,
              category: 'Breads',
              imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
              isVegetarian: true,
              spiceLevel: 'none',
              restaurant: '1'
            }
          ],
          '2': [ // Dosa Paradise
            {
              _id: '201',
              name: 'Masala Dosa',
              description: 'Crispy dosa with potato filling',
              price: 120,
              category: 'Main Course',
              imageUrl: 'https://images.unsplash.com/photo-1668236543090-82d9c1ba8e0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
              isVegetarian: true,
              spiceLevel: 'medium',
              restaurant: '2'
            },
            {
              _id: '202',
              name: 'Idli Sambar',
              description: 'Steamed rice cakes with lentil soup',
              price: 100,
              category: 'Breakfast',
              imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc',
              isVegetarian: true,
              spiceLevel: 'mild',
              restaurant: '2'
            }
          ],
          '3': [ // Royal Biryani House
            {
              _id: '301',
              name: 'Chicken Biryani',
              description: 'Fragrant rice with spiced chicken',
              price: 300,
              category: 'Main Course',
              imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
              isVegetarian: false,
              spiceLevel: 'hot',
              restaurant: '3'
            },
            {
              _id: '302',
              name: 'Mutton Korma',
              description: 'Tender mutton in rich gravy',
              price: 400,
              category: 'Main Course',
              imageUrl: 'https://images.unsplash.com/photo-1662638378780-62b91d1d5aa7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
              isVegetarian: false,
              spiceLevel: 'medium',
              restaurant: '3'
            }
          ]
        };

        const mockRestaurants = {
          '1': {
            _id: '1',
            name: 'North Indian Kitchen',
            description: 'Authentic North Indian cuisine with a modern twist',
            cuisine: 'North Indian',
            address: {
              street: '123 Curry Lane',
              city: 'Mumbai',
              state: 'Maharashtra',
              zipCode: '400001'
            },
            phone: '+91 98765 43210',
            email: 'info@northindiankitchen.com',
            rating: 4.5,
            imageUrl: 'https://images.unsplash.com/photo-1587899897387-091ebd01a6b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            openingHours: { open: '10:00 AM', close: '10:00 PM' }
          },
          '2': {
            _id: '2',
            name: 'Dosa Paradise',
            description: 'Best South Indian cuisine in town',
            cuisine: 'South Indian',
            address: {
              street: '456 Dosa Street',
              city: 'Chennai',
              state: 'Tamil Nadu',
              zipCode: '600001'
            },
            phone: '+91 98765 43211',
            email: 'info@dosaparadise.com',
            rating: 4.2,
            imageUrl: 'https://images.unsplash.com/photo-1625398407796-82780939df0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            openingHours: { open: '8:00 AM', close: '10:00 PM' }
          },
          '3': {
            _id: '3',
            name: 'Royal Biryani House',
            description: 'Famous for authentic Mughlai cuisine',
            cuisine: 'Mughlai',
            address: {
              street: '789 Biryani Blvd',
              city: 'Hyderabad',
              state: 'Telangana',
              zipCode: '500001'
            },
            phone: '+91 98765 43212',
            email: 'info@royalbiryani.com',
            rating: 4.7,
            imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            openingHours: { open: '11:00 AM', close: '11:00 PM' }
          }
        };

        const restaurantData = mockRestaurants[id as keyof typeof mockRestaurants];
        const menuData = mockMenus[id as keyof typeof mockMenus];

        if (restaurantData && menuData) {
          setRestaurant(restaurantData);
          setMenuItems(menuData);
          // Set the first category as active
          const firstCategory = [...new Set(menuData.map(item => item.category))][0];
          setActiveCategory(firstCategory);
        } else {
          setError('Restaurant not found');
        }

      } catch (err) {
        setError('Failed to fetch restaurant details. Please try again later.');
        console.error('Error fetching restaurant details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRestaurantAndMenu();
    }
  }, [id]);

  // Get unique categories
  const categories = [...new Set(menuItems.map(item => item.category))];
  
  // Filter menu items by active category
  const filteredMenuItems = activeCategory
    ? menuItems.filter(item => item.category === activeCategory)
    : menuItems;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-red-600 py-8">{error || 'Restaurant not found'}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Restaurant Header */}
      <div className="h-64 w-full relative">
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold">{restaurant.name}</h1>
            <p className="mt-2 text-xl">{restaurant.cuisine} Cuisine</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Restaurant Info */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                {restaurant.rating.toFixed(1)} ★
              </div>
              <div className="ml-4 flex items-center text-gray-600">
                <Clock size={16} className="mr-1" />
                <span>{restaurant.openingHours.open} - {restaurant.openingHours.close}</span>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">{restaurant.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Contact</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Phone size={16} className="mr-2" />
                    <span>{restaurant.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail size={16} className="mr-2" />
                    <span>{restaurant.email}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Location</h3>
                <div className="flex items-start text-gray-600">
                  <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
                  <span>
                    {restaurant.address.street}, {restaurant.address.city}, {restaurant.address.state} {restaurant.address.zipCode}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Categories */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Menu</h2>
          
          {filteredMenuItems.length === 0 ? (
            <div className="text-center text-gray-600 py-8">
              No menu items available in this category.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMenuItems.map((item) => (
                <MenuItem
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  isVegetarian={item.isVegetarian}
                  spiceLevel={item.spiceLevel}
                  restaurantId={restaurant._id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;