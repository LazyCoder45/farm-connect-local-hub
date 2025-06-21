
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Leaf, Sun, Cloud, Snowflake } from 'lucide-react';

const CropCalendar = () => {
  const currentMonth = new Date().getMonth();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const seasonalCrops = {
    winter: {
      name: 'Winter Season (Rabi)',
      period: 'November - February',
      icon: Snowflake,
      color: 'bg-blue-100 text-blue-800',
      crops: [
        { name: 'Wheat', months: [10, 11, 0, 1], peak: [11, 0] },
        { name: 'Mustard', months: [10, 11, 0, 1], peak: [11, 0] },
        { name: 'Potato', months: [11, 0, 1, 2], peak: [0, 1] },
        { name: 'Cabbage', months: [10, 11, 0, 1, 2], peak: [11, 0, 1] },
        { name: 'Cauliflower', months: [10, 11, 0, 1], peak: [11, 0] },
        { name: 'Carrot', months: [10, 11, 0, 1, 2], peak: [11, 0] },
        { name: 'Radish', months: [10, 11, 0, 1], peak: [11, 0] },
        { name: 'Spinach', months: [10, 11, 0, 1], peak: [11, 0] },
        { name: 'Lettuce', months: [10, 11, 0, 1, 2], peak: [0, 1] },
        { name: 'Peas', months: [11, 0, 1, 2], peak: [0, 1] }
      ]
    },
    summer: {
      name: 'Summer Season (Pre-Kharif)',
      period: 'March - May',
      icon: Sun,
      color: 'bg-orange-100 text-orange-800',
      crops: [
        { name: 'Cucumber', months: [2, 3, 4], peak: [3, 4] },
        { name: 'Bitter Gourd', months: [2, 3, 4, 5], peak: [3, 4] },
        { name: 'Bottle Gourd', months: [2, 3, 4], peak: [3, 4] },
        { name: 'Okra', months: [2, 3, 4, 5], peak: [3, 4] },
        { name: 'Eggplant', months: [2, 3, 4, 5], peak: [3, 4] },
        { name: 'Chili', months: [2, 3, 4, 5, 6], peak: [3, 4, 5] },
        { name: 'Watermelon', months: [2, 3, 4], peak: [3, 4] },
        { name: 'Muskmelon', months: [2, 3, 4], peak: [3, 4] },
        { name: 'Mango', months: [4, 5, 6], peak: [4, 5] },
        { name: 'Jackfruit', months: [4, 5, 6], peak: [4, 5] }
      ]
    },
    monsoon: {
      name: 'Monsoon Season (Kharif)',
      period: 'June - October',
      icon: Cloud,
      color: 'bg-green-100 text-green-800',
      crops: [
        { name: 'Rice (Aman)', months: [5, 6, 7, 8, 9, 10], peak: [7, 8, 9] },
        { name: 'Jute', months: [5, 6, 7, 8, 9], peak: [6, 7, 8] },
        { name: 'Sugarcane', months: [5, 6, 7, 8, 9, 10], peak: [7, 8, 9] },
        { name: 'Cotton', months: [5, 6, 7, 8, 9], peak: [7, 8] },
        { name: 'Sesame', months: [5, 6, 7, 8], peak: [6, 7] },
        { name: 'Sweet Potato', months: [6, 7, 8, 9], peak: [7, 8] },
        { name: 'Water Spinach', months: [5, 6, 7, 8, 9], peak: [6, 7, 8] },
        { name: 'Snake Gourd', months: [5, 6, 7, 8], peak: [6, 7] },
        { name: 'Ridge Gourd', months: [5, 6, 7, 8], peak: [6, 7] },
        { name: 'Indian Spinach', months: [5, 6, 7, 8, 9], peak: [6, 7, 8] }
      ]
    }
  };

  const yearRoundCrops = [
    { name: 'Banana', availability: 'Year-round', note: 'Peak varies by variety' },
    { name: 'Papaya', availability: 'Year-round', note: 'Better in dry season' },
    { name: 'Lemon', availability: 'Year-round', note: 'Peak in winter' },
    { name: 'Coconut', availability: 'Year-round', note: 'Consistent supply' },
    { name: 'Tomato', availability: 'Year-round', note: 'Best in winter' },
    { name: 'Onion', availability: 'Year-round', note: 'Stored from winter harvest' }
  ];

  const getMonthStatus = (crop: any, monthIndex: number) => {
    if (crop.peak.includes(monthIndex)) return 'peak';
    if (crop.months.includes(monthIndex)) return 'available';
    return 'unavailable';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'peak': return 'bg-green-500';
      case 'available': return 'bg-yellow-500';
      default: return 'bg-gray-200';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-farm-800 mb-2">
          <Calendar className="inline mr-2 h-8 w-8 text-green-600" />
          Crop Calendar
        </h1>
        <p className="text-lg text-muted-foreground">
          Plan your purchases with seasonal crop availability in Bangladesh
        </p>
      </div>

      <Tabs defaultValue="seasonal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="seasonal">Seasonal Calendar</TabsTrigger>
          <TabsTrigger value="monthly">Monthly View</TabsTrigger>
          <TabsTrigger value="yearround">Year-Round Crops</TabsTrigger>
        </TabsList>

        <TabsContent value="seasonal" className="space-y-6">
          {Object.entries(seasonalCrops).map(([season, data]) => {
            const IconComponent = data.icon;
            return (
              <Card key={season} className="border-farm-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl text-farm-800">
                    <IconComponent className="mr-2 h-6 w-6" />
                    {data.name}
                  </CardTitle>
                  <Badge className={data.color}>{data.period}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {data.crops.map((crop, index) => (
                      <div key={index} className="p-3 bg-farm-50 rounded-lg">
                        <h4 className="font-semibold text-farm-700 mb-2">{crop.name}</h4>
                        <div className="flex flex-wrap gap-1">
                          {monthNames.map((month, monthIndex) => {
                            const status = getMonthStatus(crop, monthIndex);
                            return (
                              <div
                                key={monthIndex}
                                className={`w-6 h-6 rounded-full ${getStatusColor(status)} text-xs flex items-center justify-center text-white font-bold`}
                                title={`${month}: ${status}`}
                              >
                                {month.charAt(0)}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span>Peak Season</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                      <span>Available</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                      <span>Not Available</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="monthly" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {monthNames.map((month, monthIndex) => (
              <Card key={monthIndex} className={`border-farm-200 ${monthIndex === currentMonth ? 'ring-2 ring-farm-500' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {month}
                    {monthIndex === currentMonth && (
                      <Badge className="ml-2 bg-farm-600">Current</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-700">Peak Season:</h4>
                    <ul className="text-sm space-y-1">
                      {Object.values(seasonalCrops).flatMap(season => 
                        season.crops.filter(crop => crop.peak.includes(monthIndex))
                          .map(crop => (
                            <li key={crop.name} className="flex items-center">
                              <Leaf className="h-3 w-3 mr-1 text-green-500" />
                              {crop.name}
                            </li>
                          ))
                      )}
                    </ul>
                    
                    <h4 className="font-semibold text-yellow-700 pt-2">Also Available:</h4>
                    <ul className="text-sm space-y-1">
                      {Object.values(seasonalCrops).flatMap(season => 
                        season.crops.filter(crop => crop.months.includes(monthIndex) && !crop.peak.includes(monthIndex))
                          .map(crop => (
                            <li key={crop.name} className="flex items-center">
                              <Leaf className="h-3 w-3 mr-1 text-yellow-500" />
                              {crop.name}
                            </li>
                          ))
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="yearround" className="space-y-6">
          <Card className="border-farm-200">
            <CardHeader>
              <CardTitle className="text-2xl text-farm-800">Year-Round Available Crops</CardTitle>
              <p className="text-muted-foreground">These crops are generally available throughout the year</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {yearRoundCrops.map((crop, index) => (
                  <div key={index} className="p-4 bg-farm-50 rounded-lg">
                    <h4 className="font-semibold text-farm-700 mb-1">{crop.name}</h4>
                    <p className="text-sm text-green-600 mb-1">{crop.availability}</p>
                    <p className="text-xs text-muted-foreground">{crop.note}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-farm-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-lg text-blue-800">💡 Pro Tips for Consumers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• <strong>Peak season</strong> crops are usually cheaper and fresher</p>
              <p>• <strong>Plan ahead</strong> for seasonal favorites like mangoes and winter vegetables</p>
              <p>• <strong>Store properly</strong> to extend shelf life of seasonal produce</p>
              <p>• <strong>Try new crops</strong> when they're in peak season for best taste</p>
              <p>• <strong>Support local farmers</strong> by buying seasonal, locally grown produce</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CropCalendar;
