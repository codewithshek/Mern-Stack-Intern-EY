import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import RestaurantCard from '../components/RestaurantCard';

interface Restaurant {
  _id: string;
  name: string;
  cuisine: string;
  rating: number;
  imageUrl: string;
  openingHours: {
    open: string;
    close: string;
  };
}

const Home: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        setError('');
        
        console.log('Fetching restaurants...');
        const mockData = [
          {
            _id: '1',
            name: 'North Indian Kitchen',
            cuisine: 'North Indian',
            rating: 4.5,
            imageUrl: 'https://images.unsplash.com/photo-1587899897387-091ebd01a6b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            openingHours: { open: '10:00 AM', close: '10:00 PM' }
          },
          {
            _id: '2',
            name: 'Dosa Paradise',
            cuisine: 'South Indian',
            rating: 4.3,
            imageUrl: 'https://images.unsplash.com/photo-1630383249896-483b1756eb6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            openingHours: { open: '08:00 AM', close: '09:00 PM' }
          },
          {
            _id: '3',
            name: 'Royal Biryani House',
            cuisine: 'Mughlai',
            rating: 4.7,
            imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            openingHours: { open: '11:00 AM', close: '11:00 PM' }
          }
        ];
        
        setRestaurants(mockData);
        setFilteredRestaurants(mockData);
        
      } catch (err) {
        console.error('Failed to fetch restaurants:', err);
        // Set a more descriptive error message
        setError('Unable to load restaurants. Please try again later.');
        
        // Use mock data as fallback
        const mockData = [
          {
            _id: '1',
            name: 'Spice Garden',
            cuisine: 'North Indian',
            rating: 4.5,
            imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            openingHours: { open: '10:00 AM', close: '10:00 PM' }
          },
          {
            _id: '2',
            name: 'South Indian Delights',
            cuisine: 'South Indian',
            rating: 4.3,
            imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            openingHours: { open: '08:00 AM', close: '09:00 PM' }
          },
          {
            _id: '3',
            name: 'Biryani House',
            cuisine: 'Mughlai',
            rating: 4.7,
            imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            openingHours: { open: '11:00 AM', close: '11:00 PM' }
          },
          {
            _id: '4',
            name: 'Punjabi Dhaba',
            cuisine: 'North Indian',
            rating: 4.2,
            imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            openingHours: { open: '10:00 AM', close: '10:30 PM' }
          },
          {
            _id: '5',
            name: 'Dosa Corner',
            cuisine: 'South Indian',
            rating: 4.4,
            imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            openingHours: { open: '07:00 AM', close: '09:00 PM' }
          },
          {
            _id: '6',
            name: 'Tandoori Nights',
            cuisine: 'North Indian',
            rating: 4.6,
            imageUrl: 'https://images.unsplash.com/photo-1542367592-8849eb7cbdd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            openingHours: { open: '12:00 PM', close: '11:00 PM' }
          }
        ];
        setRestaurants(mockData);
        setFilteredRestaurants(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    // Filter restaurants based on search term and cuisine
    const filtered = restaurants.filter((restaurant) => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCuisine = cuisineFilter === '' || restaurant.cuisine === cuisineFilter;
      return matchesSearch && matchesCuisine;
    });
    setFilteredRestaurants(filtered);
  }, [searchTerm, cuisineFilter, restaurants]);

  // Get unique cuisines for filter
  const cuisines = [...new Set(restaurants.map((restaurant) => restaurant.cuisine))];

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl">
              Delicious Food Delivered to Your Door
            </h1>
            <p className="mt-4 text-xl">
              Order from the best Indian restaurants in your area
            </p>
            
            {/* Search Bar */}
            <div className="mt-8 max-w-xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-600 focus:ring-white focus:border-white"
                  placeholder="Search for restaurants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Listing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Restaurants</h2>
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                cuisineFilter === '' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              onClick={() => setCuisineFilter('')}
            >
              All
            </button>
            {cuisines.map((cuisine) => (
              <button
                key={cuisine}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  cuisineFilter === cuisine ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                onClick={() => setCuisineFilter(cuisine)}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>

        {/* Restaurant Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-gray-600 py-8">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant._id}
                id={restaurant._id}
                name={restaurant.name}
                cuisine={restaurant.cuisine}
                rating={restaurant.rating}
                imageUrl={restaurant.imageUrl}
                openingHours={restaurant.openingHours}
              />
            ))}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-orange-600 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mt-4">Fast Delivery</h3>
              <p className="text-gray-600 mt-2">
                We deliver your food as quickly as possible to ensure it arrives hot and fresh.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-orange-600 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mt-4">Quality Food</h3>
              <p className="text-gray-600 mt-2">
                We partner with the best restaurants to ensure you get the highest quality food.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-orange-600 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mt-4">Easy Payment</h3>
              <p className="text-gray-600 mt-2">
                Multiple payment options available for a hassle-free ordering experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;