
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MapPin, Calendar, Weight, Star, Search, User } from 'lucide-react';
import { useCrops } from '@/hooks/useCrops';
import { useNavigate } from 'react-router-dom';

const CropList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();
  
  const { data: crops = [], isLoading, error } = useCrops();

  const districts = ['All Districts', 'Dhaka', 'Chittagong', 'Dinajpur', 'Jessore', 'Rajshahi', 'Rangpur', 'Kushtia'];
  const categories = ['All Categories', 'Rice', 'Vegetables', 'Fruits', 'Pulses', 'Spices'];

  const filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crop.profiles?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = !selectedDistrict || selectedDistrict === 'All Districts' || 
                           crop.district === selectedDistrict;
    const matchesCategory = !selectedCategory || selectedCategory === 'All Categories' || 
                           crop.category === selectedCategory;
    
    return matchesSearch && matchesDistrict && matchesCategory;
  });

  // Mock best farmers data - in real app, this would come from API
  const bestFarmers = [
    { id: '1', name: 'Rahman Sheikh', rating: 4.8, totalCrops: 25, location: 'Dinajpur', avatar: null },
    { id: '2', name: 'Fatima Khatun', rating: 4.9, totalCrops: 18, location: 'Rangpur', avatar: null },
    { id: '3', name: 'Karim Miah', rating: 4.7, totalCrops: 32, location: 'Kushtia', avatar: null },
    { id: '4', name: 'Rashida Begum', rating: 4.6, totalCrops: 21, location: 'Jessore', avatar: null },
  ];

  const handleViewDetails = (cropId: string) => {
    navigate(`/crops/${cropId}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading crops...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">Error loading crops. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Best Farmers Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-farm-800 flex items-center">
            <Star className="mr-2 h-5 w-5 text-yellow-500" />
            Top Rated Farmers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Carousel className="w-full">
            <CarouselContent>
              {bestFarmers.map((farmer) => (
                <CarouselItem key={farmer.id} className="md:basis-1/2 lg:basis-1/4">
                  <Card className="h-full">
                    <CardContent className="p-4 text-center">
                      <div className="w-16 h-16 bg-farm-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <User className="h-8 w-8 text-farm-600" />
                      </div>
                      <h3 className="font-semibold text-farm-800">{farmer.name}</h3>
                      <p className="text-sm text-muted-foreground">{farmer.location}</p>
                      <div className="flex items-center justify-center mt-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="ml-1 text-sm font-medium">{farmer.rating}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {farmer.totalCrops} crops listed
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </CardContent>
      </Card>

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
                    src={crop.images?.[0] || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500'}
                    alt={crop.title}
                    className="w-full h-full object-cover"
                  />
                  {crop.is_organic && (
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
                      {crop.district}, {crop.upazila}
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Weight className="h-4 w-4 mr-1" />
                      {crop.quantity} {crop.unit}
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      Available: {new Date(crop.expected_sale_date).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-farm-600">
                        ৳{crop.price_per_unit}
                      </span>
                      <span className="text-sm text-muted-foreground">/{crop.unit}</span>
                    </div>
                    
                    <Button 
                      className="bg-farm-600 hover:bg-farm-700"
                      onClick={() => handleViewDetails(crop.id)}
                    >
                      View Details
                    </Button>
                  </div>
                  
                  <div className="mt-3 text-sm text-muted-foreground">
                    By <span className="font-medium">{crop.profiles?.name || 'Unknown Farmer'}</span>
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
