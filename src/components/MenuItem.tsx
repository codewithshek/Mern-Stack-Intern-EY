import React from 'react';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isVegetarian: boolean;
  spiceLevel: string;
  restaurantId: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  isVegetarian,
  spiceLevel,
  restaurantId
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(
      {
        id,
        name,
        price,
        imageUrl,
        restaurantId
      },
      restaurantId
    );
  };

  const getSpiceLevelColor = () => {
    switch (spiceLevel) {
      case 'mild':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hot':
        return 'bg-orange-100 text-orange-800';
      case 'extra hot':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden mb-4">
      <div className="md:w-1/4 h-48 md:h-auto">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 md:w-3/4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
            <div className="flex items-center space-x-2">
              {isVegetarian && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Veg
                </span>
              )}
              <span className={`text-xs px-2 py-1 rounded ${getSpiceLevelColor()}`}>
                {spiceLevel.charAt(0).toUpperCase() + spiceLevel.slice(1)}
              </span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mt-1">{description}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-gray-800 font-bold">₹{price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="bg-orange-600 text-white px-3 py-1 rounded-md flex items-center hover:bg-orange-700 transition-colors"
          >
            <Plus size={16} className="mr-1" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;