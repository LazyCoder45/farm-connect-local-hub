
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cloud, Sprout, BookOpen, TrendingUp, Calendar, Thermometer } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

const FarmerDashboard = () => {
  const { profile } = useAuth();
  const { t } = useLanguage();

  const dashboardFeatures = [
    {
      title: 'Weather Forecast',
      description: 'Get real-time weather updates and forecasts for your area',
      icon: Cloud,
      link: '/farmer/weather',
      color: 'bg-blue-500',
    },
    {
      title: 'Crop Planting Guide',
      description: 'Seasonal recommendations for what to plant based on current conditions',
      icon: Sprout,
      link: '/farmer/crop-guide',
      color: 'bg-green-500',
    },
    {
      title: 'Farming Tips',
      description: 'Expert advice and best practices for successful farming',
      icon: BookOpen,
      link: '/farmer/tips',
      color: 'bg-orange-500',
    },
    {
      title: 'Market Trends',
      description: 'Stay updated with current market prices and trends',
      icon: TrendingUp,
      link: '/crops',
      color: 'bg-purple-500',
    },
  ];

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const currentSeason = getCurrentSeason();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-farm-800 mb-2">
          Welcome back, {profile?.name}! 🌾
        </h1>
        <p className="text-lg text-muted-foreground">
          Your farming companion for {currentMonth} - {currentSeason} season
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-farm-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Season</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-farm-600">{currentSeason}</div>
            <p className="text-xs text-muted-foreground">Best time for seasonal crops</p>
          </CardContent>
        </Card>

        <Card className="border-farm-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weather Status</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">28°C</div>
            <p className="text-xs text-muted-foreground">Ideal for planting</p>
          </CardContent>
        </Card>

        <Card className="border-farm-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Location</CardTitle>
            <Sprout className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{profile?.district}</div>
            <p className="text-xs text-muted-foreground">{profile?.upazila}</p>
          </CardContent>
        </Card>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardFeatures.map((feature, index) => (
          <Card key={index} className="border-farm-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl text-farm-800">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <Button asChild className="w-full">
                <Link to={feature.link}>Explore</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Tips Section */}
      <Card className="mt-8 border-farm-200">
        <CardHeader>
          <CardTitle className="text-2xl text-farm-800">Today's Quick Tip 💡</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-muted-foreground">
            {getSeasonalTip(currentSeason)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

function getCurrentSeason() {
  const month = new Date().getMonth() + 1;
  if (month >= 12 || month <= 2) return 'Winter (Rabi)';
  if (month >= 3 && month <= 5) return 'Summer (Pre-Kharif)';
  if (month >= 6 && month <= 11) return 'Monsoon (Kharif)';
  return 'Transition';
}

function getSeasonalTip(season: string) {
  const tips = {
    'Winter (Rabi)': 'Perfect time for wheat, mustard, and winter vegetables. Ensure proper irrigation as rainfall is minimal.',
    'Summer (Pre-Kharif)': 'Focus on heat-resistant crops like cucumber, okra, and summer squash. Mulching helps retain soil moisture.',
    'Monsoon (Kharif)': 'Ideal for rice, jute, and monsoon vegetables. Ensure proper drainage to prevent waterlogging.',
    'Transition': 'Prepare your soil and plan for the upcoming season. This is a great time for soil testing.',
  };
  return tips[season as keyof typeof tips] || 'Keep monitoring weather conditions for optimal planting decisions.';
}

export default FarmerDashboard;
