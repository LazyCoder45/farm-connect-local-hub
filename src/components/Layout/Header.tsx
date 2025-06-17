
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Sprout, User, LogOut, Plus, Truck } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-farm-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Sprout className="h-8 w-8 text-farm-600" />
            <span className="text-2xl font-bold text-farm-700">FarmConnect</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/crops" className="text-farm-600 hover:text-farm-800 font-medium">
              Browse Crops
            </Link>
            <Link to="/transport" className="text-farm-600 hover:text-farm-800 font-medium">
              Transport
            </Link>
            {user?.role === 'farmer' && (
              <Link to="/post-crop" className="text-farm-600 hover:text-farm-800 font-medium">
                Post Crop
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {user?.role === 'farmer' && (
                  <Button asChild className="bg-farm-600 hover:bg-farm-700">
                    <Link to="/post-crop">
                      <Plus className="h-4 w-4 mr-2" />
                      Post Crop
                    </Link>
                  </Button>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{user?.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    {user?.role === 'farmer' && (
                      <DropdownMenuItem asChild>
                        <Link to="/my-crops" className="flex items-center">
                          <Sprout className="h-4 w-4 mr-2" />
                          My Crops
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link to="/orders" className="flex items-center">
                        <Truck className="h-4 w-4 mr-2" />
                        Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="bg-farm-600 hover:bg-farm-700">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
