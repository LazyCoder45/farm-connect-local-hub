
import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-farm-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Sprout className="h-8 w-8" />
              <span className="text-2xl font-bold">FarmConnect</span>
            </div>
            <p className="text-farm-200">
              Connecting farmers directly with consumers for fresh, local produce.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-farm-300 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-farm-300 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-farm-300 hover:text-white cursor-pointer" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For Farmers</h3>
            <ul className="space-y-2 text-farm-200">
              <li><Link to="/post-crop" className="hover:text-white">Post Your Crops</Link></li>
              <li><Link to="/my-crops" className="hover:text-white">Manage Listings</Link></li>
              <li><Link to="/transport" className="hover:text-white">Find Transport</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For Consumers</h3>
            <ul className="space-y-2 text-farm-200">
              <li><Link to="/crops" className="hover:text-white">Browse Crops</Link></li>
              <li><Link to="/orders" className="hover:text-white">My Orders</Link></li>
              <li><Link to="/profile" className="hover:text-white">Profile</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2 text-farm-200">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-farm-700 mt-8 pt-8 text-center text-farm-300">
          <p>&copy; 2024 FarmConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
