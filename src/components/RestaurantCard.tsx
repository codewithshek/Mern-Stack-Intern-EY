import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';

interface RestaurantCardProps {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  imageUrl: string;
  openingHours: {
    open: string;
    close: string;
  };
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  cuisine,
  rating,
  imageUrl,
  openingHours
}) => {
  return (
    <Link to={`/restaurants/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-gray-600 text-sm">{cuisine}</p>
          
          <div className="flex items-center mt-2">
            <div className="flex items-center bg-green-100 px-2 py-1 rounded text-sm">
              <Star size={16} className="text-yellow-500 mr-1" />
              <span className="font-medium">{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center ml-3 text-gray-600 text-sm">
              <Clock size={14} className="mr-1" />
              <span>{openingHours.open} - {openingHours.close}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;