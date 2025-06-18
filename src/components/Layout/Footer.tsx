
import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-farm-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Sprout className="h-8 w-8 text-farm-400" />
              <span className="text-xl font-bold">FarmConnect</span>
            </div>
            <p className="text-farm-200 mb-4">
              Connecting farmers directly with consumers for fresh, quality produce. 
              Supporting local agriculture and sustainable farming practices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/crops" className="text-farm-200 hover:text-white transition-colors">
                  Browse Crops
                </Link>
              </li>
              <li>
                <Link to="/transport" className="text-farm-200 hover:text-white transition-colors">
                  Transport Services
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-farm-200 hover:text-white transition-colors">
                  Join as Farmer
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-farm-200 hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-farm-200 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-farm-200 hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-farm-700 mt-8 pt-8 text-center">
          <p className="text-farm-200">
            © 2024 FarmConnect. All rights reserved. Empowering farmers, connecting communities.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
