import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Food Delivery</h3>
            <p className="text-gray-300 mb-4">
              Delivering delicious Indian cuisine right to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/restaurants" className="text-gray-300 hover:text-white">Restaurants</Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-300 hover:text-white">Cart</Link>
              </li>
              <li>
                <Link to="/my-orders" className="text-gray-300 hover:text-white">My Orders</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Contact Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Terms & Conditions</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span className="text-gray-300">123 Food Street, Flavor City</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span className="text-gray-300">+91 1234567890</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <span className="text-gray-300">info@fooddelivery.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Food Delivery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;