
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Weight, Star, Search } from 'lucide-react';
import { Crop } from '@/types/crop';

const CropList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Mock data - replace with actual API call
  const mockCrops: Crop[] = [
    {
      id: '1',
      farmerId: 'farmer1',
      farmerName: 'Rahman Sheikh',
      farmerLocation: {
        district: 'Dinajpur',
        upazila: 'Birganj',
        union: 'Raniganj'
      },
      title: 'Premium Basmati Rice',
      description: 'Organically grown aromatic basmati rice, ready for harvest in 2 weeks.',
      quantity: 500,
      unit: 'kg',
      pricePerUnit: 65,
      images: ['https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500'],
      harvestDate: new Date('2024-01-15'),
      expectedSaleDate: new Date('2024-01-20'),
      category: 'Rice',
      isOrganic: true,
      status: 'available',
      ratings: [{ userId: '1', userName: 'Test', rating: 5, createdAt: new Date() }],
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      farmerId: 'farmer2',
      farmerName: 'Fatima Khatun',
      farmerLocation: {
        district: 'Jessore',
        upazila: 'Sharsha',
        union: 'Benapole'
      },
      title: 'Fresh Tomatoes',
      description: 'Juicy red tomatoes, perfect for cooking and salads.',
      quantity: 200,
      unit: 'kg',
      pricePerUnit: 45,
      images: ['https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=500'],
      harvestDate: new Date('2024-01-10'),
      expectedSaleDate: new Date('2024-01-15'),
      category: 'Vegetables',
      isOrganic: false,
      status: 'available',
      ratings: [{ userId: '1', userName: 'Test', rating: 4, createdAt: new Date() }],
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const districts = ['All Districts', 'Dhaka', 'Chittagong', 'Dinajpur', 'Jessore', 'Rajshahi'];
  const categories = ['All Categories', 'Rice', 'Vegetables', 'Fruits', 'Pulses', 'Spices'];

  const filteredCrops = mockCrops.filter(crop => {
    const matchesSearch = crop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crop.farmerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = !selectedDistrict || selectedDistrict === 'All Districts' || 
                           crop.farmerLocation.district === selectedDistrict;
    const matchesCategory = !selectedCategory || selectedCategory === 'All Categories' || 
                           crop.category === selectedCategory;
    
    return matchesSearch && matchesDistrict && matchesCategory;
  });

  const getAverageRating = (ratings: any[]) => {
    if (ratings.length === 0) return 0;
    return ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filter Crops</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search crops or farmers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">District</label>
                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map(district => (
                      <SelectItem key={district} value={district}>{district}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Crops Grid */}
        <div className="lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-farm-800">Available Crops</h1>
            <p className="text-muted-foreground">{filteredCrops.length} crops found</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCrops.map((crop) => (
              <Card key={crop.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <img
                    src={crop.images[0]}
                    alt={crop.title}
                    className="w-full h-full object-cover"
                  />
                  {crop.isOrganic && (
                    <Badge className="absolute top-2 left-2 bg-green-600">
                      Organic
                    </Badge>
                  )}
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg text-farm-800 mb-2">
                    {crop.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {crop.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {crop.farmerLocation.district}, {crop.farmerLocation.upazila}
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Weight className="h-4 w-4 mr-1" />
                      {crop.quantity} {crop.unit}
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      Available: {crop.expectedSaleDate.toLocaleDateString()}
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                      {getAverageRating(crop.ratings).toFixed(1)} ({crop.ratings.length} reviews)
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-farm-600">
                        ৳{crop.pricePerUnit}
                      </span>
                      <span className="text-sm text-muted-foreground">/{crop.unit}</span>
                    </div>
                    
                    <Button className="bg-farm-600 hover:bg-farm-700">
                      View Details
                    </Button>
                  </div>
                  
                  <div className="mt-3 text-sm text-muted-foreground">
                    By <span className="font-medium">{crop.farmerName}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredCrops.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No crops found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropList;
