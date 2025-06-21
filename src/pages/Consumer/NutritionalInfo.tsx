
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Leaf, Zap, Heart, Eye } from 'lucide-react';

const NutritionalInfo = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const nutritionalData = [
    {
      id: 1,
      name: 'Rice (Basmati)',
      category: 'Grains',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300',
      nutrition: {
        calories: 130,
        protein: 2.7,
        carbs: 28,
        fiber: 0.4,
        fat: 0.3,
        vitamins: ['B1', 'B3', 'B6'],
        minerals: ['Iron', 'Magnesium', 'Selenium']
      },
      benefits: ['Energy source', 'Gluten-free', 'Easy to digest'],
      season: 'Boro: Dec-May, Aman: Jun-Dec'
    },
    {
      id: 2,
      name: 'Tomato',
      category: 'Vegetables',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300',
      nutrition: {
        calories: 18,
        protein: 0.9,
        carbs: 3.9,
        fiber: 1.2,
        fat: 0.2,
        vitamins: ['C', 'K', 'A', 'Folate'],
        minerals: ['Potassium', 'Manganese']
      },
      benefits: ['Rich in Lycopene', 'Heart healthy', 'Anti-inflammatory'],
      season: 'Winter: Nov-Mar, Summer: Mar-Jun'
    },
    {
      id: 3,
      name: 'Potato',
      category: 'Vegetables',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300',
      nutrition: {
        calories: 77,
        protein: 2,
        carbs: 17,
        fiber: 2.2,
        fat: 0.1,
        vitamins: ['C', 'B6', 'B3'],
        minerals: ['Potassium', 'Manganese', 'Phosphorus']
      },
      benefits: ['High in Potassium', 'Vitamin C source', 'Versatile cooking'],
      season: 'Winter: Dec-Mar'
    },
    {
      id: 4,
      name: 'Mango',
      category: 'Fruits',
      image: 'https://images.unsplash.com/photo-1605027990121-cbae9ca5c1ea?w=300',
      nutrition: {
        calories: 60,
        protein: 0.8,
        carbs: 15,
        fiber: 1.6,
        fat: 0.4,
        vitamins: ['A', 'C', 'E', 'K'],
        minerals: ['Potassium', 'Copper']
      },
      benefits: ['Rich in Vitamin A', 'Immune support', 'Eye health'],
      season: 'Summer: May-Jul'
    },
    {
      id: 5,
      name: 'Spinach (Palang Shak)',
      category: 'Vegetables',
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300',
      nutrition: {
        calories: 23,
        protein: 2.9,
        carbs: 3.6,
        fiber: 2.2,
        fat: 0.4,
        vitamins: ['K', 'A', 'C', 'Folate'],
        minerals: ['Iron', 'Calcium', 'Magnesium']
      },
      benefits: ['Iron rich', 'Bone health', 'Eye protection'],
      season: 'Winter: Nov-Feb'
    },
    {
      id: 6,
      name: 'Banana',
      category: 'Fruits',
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300',
      nutrition: {
        calories: 89,
        protein: 1.1,
        carbs: 23,
        fiber: 2.6,
        fat: 0.3,
        vitamins: ['B6', 'C', 'B2'],
        minerals: ['Potassium', 'Manganese', 'Magnesium']
      },
      benefits: ['Heart health', 'Digestive health', 'Energy boost'],
      season: 'Year-round'
    }
  ];

  const filteredCrops = nutritionalData.filter(crop =>
    crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crop.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Fruits': return '🍎';
      case 'Vegetables': return '🥬';
      case 'Grains': return '🌾';
      default: return '🌱';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Fruits': return 'bg-red-100 text-red-800';
      case 'Vegetables': return 'bg-green-100 text-green-800';
      case 'Grains': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-farm-800 mb-2">
          <Heart className="inline mr-2 h-8 w-8 text-red-500" />
          Nutritional Information
        </h1>
        <p className="text-lg text-muted-foreground">
          Discover the nutritional benefits of fresh crops available in Bangladesh
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          placeholder="Search for crops (e.g., rice, tomato, mango)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 py-3 text-lg"
        />
      </div>

      {/* Nutrition Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCrops.map((crop) => (
          <Card key={crop.id} className="border-farm-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-xl text-farm-800">{crop.name}</CardTitle>
                <Badge className={getCategoryColor(crop.category)}>
                  {getCategoryIcon(crop.category)} {crop.category}
                </Badge>
              </div>
              <img
                src={crop.image}
                alt={crop.name}
                className="w-full h-32 object-cover rounded-md"
              />
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Macronutrients */}
              <div className="bg-farm-50 p-4 rounded-lg">
                <h4 className="font-semibold text-farm-700 mb-2 flex items-center">
                  <Zap className="h-4 w-4 mr-1" />
                  Per 100g serving
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Calories: <span className="font-medium">{crop.nutrition.calories}</span></div>
                  <div>Protein: <span className="font-medium">{crop.nutrition.protein}g</span></div>
                  <div>Carbs: <span className="font-medium">{crop.nutrition.carbs}g</span></div>
                  <div>Fiber: <span className="font-medium">{crop.nutrition.fiber}g</span></div>
                </div>
              </div>

              {/* Vitamins & Minerals */}
              <div>
                <h4 className="font-semibold text-farm-700 mb-2 flex items-center">
                  <Leaf className="h-4 w-4 mr-1" />
                  Rich in
                </h4>
                <div className="flex flex-wrap gap-1 mb-2">
                  {crop.nutrition.vitamins.map((vitamin, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      Vitamin {vitamin}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {crop.nutrition.minerals.map((mineral, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-blue-50">
                      {mineral}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Health Benefits */}
              <div>
                <h4 className="font-semibold text-farm-700 mb-2 flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  Health Benefits
                </h4>
                <ul className="text-sm space-y-1">
                  {crop.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-green-500 mr-2">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Season Info */}
              <div className="pt-2 border-t">
                <p className="text-sm text-muted-foreground">
                  <strong>Best Season:</strong> {crop.season}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCrops.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No crops found</h3>
          <p className="text-gray-500">Try searching for different crops like rice, vegetables, or fruits</p>
        </div>
      )}
    </div>
  );
};

export default NutritionalInfo;
