
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sprout, Calendar, Droplets, Thermometer, Clock, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const CropGuide = () => {
  const { profile } = useAuth();
  const currentMonth = new Date().getMonth() + 1;
  const currentSeason = getCurrentSeason();

  const cropRecommendations = {
    'Winter (Rabi)': [
      {
        name: 'Wheat',
        plantingTime: 'November - December',
        harvestTime: 'March - April',
        duration: '120-130 days',
        profit: 'High',
        difficulty: 'Medium',
        waterRequirement: 'Medium',
        temperature: '15-25°C',
        tips: 'Ensure proper soil preparation and timely irrigation. Use disease-resistant varieties.',
        marketDemand: 'Very High',
      },
      {
        name: 'Mustard',
        plantingTime: 'October - November',
        harvestTime: 'January - February',
        duration: '90-100 days',
        profit: 'Medium',
        difficulty: 'Easy',
        waterRequirement: 'Low',
        temperature: '18-25°C',
        tips: 'Good for beginners. Requires minimal water. Can be intercropped with other crops.',
        marketDemand: 'High',
      },
      {
        name: 'Potato',
        plantingTime: 'November - December',
        harvestTime: 'February - March',
        duration: '90-120 days',
        profit: 'High',
        difficulty: 'Medium',
        waterRequirement: 'Medium',
        temperature: '15-20°C',
        tips: 'Store in cool, dark places. Practice crop rotation to prevent diseases.',
        marketDemand: 'Very High',
      },
      {
        name: 'Cabbage',
        plantingTime: 'September - November',
        harvestTime: 'December - February',
        duration: '80-100 days',
        profit: 'Medium',
        difficulty: 'Easy',
        waterRequirement: 'Medium',
        temperature: '15-20°C',
        tips: 'Regular watering needed. Protect from pests using organic methods.',
        marketDemand: 'High',
      },
    ],
    'Summer (Pre-Kharif)': [
      {
        name: 'Cucumber',
        plantingTime: 'February - March',
        harvestTime: 'April - May',
        duration: '50-70 days',
        profit: 'Medium',
        difficulty: 'Easy',
        waterRequirement: 'High',
        temperature: '20-30°C',
        tips: 'Needs plenty of water. Provide support for climbing varieties.',
        marketDemand: 'High',
      },
      {
        name: 'Okra (Lady Finger)',
        plantingTime: 'March - April',
        harvestTime: 'May - July',
        duration: '60-90 days',
        profit: 'Medium',
        difficulty: 'Easy',
        waterRequirement: 'Medium',
        temperature: '25-35°C',
        tips: 'Heat-tolerant crop. Regular harvesting promotes continuous production.',
        marketDemand: 'High',
      },
      {
        name: 'Watermelon',
        plantingTime: 'February - March',
        harvestTime: 'May - June',
        duration: '90-120 days',
        profit: 'High',
        difficulty: 'Medium',
        waterRequirement: 'High',
        temperature: '25-35°C',
        tips: 'Requires large space. Mulching helps retain moisture.',
        marketDemand: 'Very High',
      },
    ],
    'Monsoon (Kharif)': [
      {
        name: 'Rice',
        plantingTime: 'June - July',
        harvestTime: 'November - December',
        duration: '120-150 days',
        profit: 'Medium',
        difficulty: 'Medium',
        waterRequirement: 'Very High',
        temperature: '25-35°C',
        tips: 'Main crop of Bangladesh. Ensure proper water management and pest control.',
        marketDemand: 'Very High',
      },
      {
        name: 'Jute',
        plantingTime: 'April - May',
        harvestTime: 'July - August',
        duration: '120-150 days',
        profit: 'Medium',
        difficulty: 'Medium',
        waterRequirement: 'High',
        temperature: '25-35°C',
        tips: 'Golden fiber of Bangladesh. Requires well-drained soil despite high water needs.',
        marketDemand: 'Medium',
      },
      {
        name: 'Eggplant',
        plantingTime: 'May - June',
        harvestTime: 'August - October',
        duration: '90-120 days',
        profit: 'High',
        difficulty: 'Easy',
        waterRequirement: 'Medium',
        temperature: '25-30°C',
        tips: 'Popular vegetable. Continuous harvesting possible. Watch for pest attacks.',
        marketDemand: 'Very High',
      },
    ],
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'default';
      case 'medium': return 'secondary';
      case 'hard': return 'destructive';
      default: return 'outline';
    }
  };

  const getProfitColor = (profit: string) => {
    switch (profit.toLowerCase()) {
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-farm-800 mb-2">Crop Planting Guide</h1>
        <p className="text-lg text-muted-foreground">
          Seasonal recommendations for {profile?.district} - Current: {currentSeason}
        </p>
      </div>

      {/* Current Season Highlight */}
      <Card className="mb-8 border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Calendar className="h-6 w-6" />
            Best Crops for Current Season
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-700 mb-4">
            Based on current weather conditions and season, here are your best options:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cropRecommendations[currentSeason as keyof typeof cropRecommendations]?.slice(0, 4).map((crop, index) => (
              <Card key={index} className="border-green-200">
                <CardContent className="p-4 text-center">
                  <Sprout className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-800">{crop.name}</h3>
                  <Badge variant={getProfitColor(crop.profit)} className="mt-2">
                    {crop.profit} Profit
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Seasonal Tabs */}
      <Tabs defaultValue="current" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="current">Current Season</TabsTrigger>
          <TabsTrigger value="winter">Winter (Rabi)</TabsTrigger>
          <TabsTrigger value="summer">Summer</TabsTrigger>
          <TabsTrigger value="monsoon">Monsoon (Kharif)</TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cropRecommendations[currentSeason as keyof typeof cropRecommendations]?.map((crop, index) => (
              <CropCard key={index} crop={crop} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="winter">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cropRecommendations['Winter (Rabi)'].map((crop, index) => (
              <CropCard key={index} crop={crop} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="summer">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cropRecommendations['Summer (Pre-Kharif)'].map((crop, index) => (
              <CropCard key={index} crop={crop} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="monsoon">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cropRecommendations['Monsoon (Kharif)'].map((crop, index) => (
              <CropCard key={index} crop={crop} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const CropCard = ({ crop }: { crop: any }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'default';
      case 'medium': return 'secondary';
      case 'hard': return 'destructive';
      default: return 'outline';
    }
  };

  const getProfitColor = (profit: string) => {
    switch (profit.toLowerCase()) {
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <Card className="border-farm-200 hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Sprout className="h-6 w-6 text-green-600" />
            {crop.name}
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant={getProfitColor(crop.profit)}>
              {crop.profit} Profit
            </Badge>
            <Badge variant={getDifficultyColor(crop.difficulty)}>
              {crop.difficulty}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs text-muted-foreground">Planting</p>
                <p className="text-sm font-medium">{crop.plantingTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="text-sm font-medium">{crop.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-400" />
              <div>
                <p className="text-xs text-muted-foreground">Water Need</p>
                <p className="text-sm font-medium">{crop.waterRequirement}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-red-400" />
              <div>
                <p className="text-xs text-muted-foreground">Temperature</p>
                <p className="text-sm font-medium">{crop.temperature}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-purple-500" />
            <div>
              <p className="text-xs text-muted-foreground">Market Demand</p>
              <Badge variant="outline" className="text-xs">
                {crop.marketDemand}
              </Badge>
            </div>
          </div>

          <div className="bg-farm-50 p-3 rounded-lg">
            <h4 className="font-semibold text-farm-800 mb-1">Expert Tips:</h4>
            <p className="text-sm text-farm-700">{crop.tips}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

function getCurrentSeason() {
  const month = new Date().getMonth() + 1;
  if (month >= 12 || month <= 2) return 'Winter (Rabi)';
  if (month >= 3 && month <= 5) return 'Summer (Pre-Kharif)';
  if (month >= 6 && month <= 11) return 'Monsoon (Kharif)';
  return 'Transition';
}

export default CropGuide;
