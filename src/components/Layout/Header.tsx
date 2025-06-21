
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { Leaf, User, Settings, LogOut, Package, ShoppingCart, Star, Truck, List, BarChart3, Heart, Calendar } from 'lucide-react';

const Header = () => {
  const { isAuthenticated, profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-farm-600" />
            <span className="text-2xl font-bold text-farm-800">AgroConnect</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/crops" className="text-gray-700 hover:text-farm-600 transition-colors">
              Browse Crops
            </Link>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/top-farmers')}
              className="text-gray-700 hover:text-farm-600"
            >
              <Star className="h-4 w-4 mr-2" />
              Top Farmers
            </Button>
            <Link to="/transport" className="text-gray-700 hover:text-farm-600 transition-colors">
              <Truck className="h-4 w-4 mr-2 inline" />
              Transport
            </Link>
            <Link to="/consumer/nutrition" className="text-gray-700 hover:text-farm-600 transition-colors">
              <Heart className="h-4 w-4 mr-2 inline" />
              Nutrition
            </Link>
            <Link to="/consumer/calendar" className="text-gray-700 hover:text-farm-600 transition-colors">
              <Calendar className="h-4 w-4 mr-2 inline" />
              Crop Calendar
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/orders" className="text-gray-700 hover:text-farm-600 transition-colors">
                  <List className="h-4 w-4 mr-2 inline" />
                  My Orders
                </Link>
                {profile?.role === 'farmer' && (
                  <>
                    <Link to="/post-crop" className="text-gray-700 hover:text-farm-600 transition-colors">
                      <Package className="h-4 w-4 mr-2 inline" />
                      Post Crop
                    </Link>
                    <Link to="/farmer/dashboard" className="text-gray-700 hover:text-farm-600 transition-colors">
                      <BarChart3 className="h-4 w-4 mr-2 inline" />
                      Farmer Tools
                    </Link>
                  </>
                )}
              </>
            )}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={profile?.profile_image || ''} alt={profile?.name || ''} />
                      <AvatarFallback>
                        {profile?.name?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{profile?.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {profile?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="w-full">
                      <List className="mr-2 h-4 w-4" />
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/consumer/nutrition" className="w-full">
                      <Heart className="mr-2 h-4 w-4" />
                      Nutrition Info
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/consumer/calendar" className="w-full">
                      <Calendar className="mr-2 h-4 w-4" />
                      Crop Calendar
                    </Link>
                  </DropdownMenuItem>
                  {profile?.role === 'farmer' && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/post-crop" className="w-full">
                          <Package className="mr-2 h-4 w-4" />
                          Post Crop
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/farmer/dashboard" className="w-full">
                          <BarChart3 className="mr-2 h-4 w-4" />
                          Farmer Dashboard
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="w-full">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Sign Up</Link>
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
