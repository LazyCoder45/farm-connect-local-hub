
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, MapPin, Calendar, Weight, Eye, Leaf, Star } from 'lucide-react';
import { useCrops } from '@/hooks/useCrops';
import { useNavigate } from 'react-router-dom';
import NearbyCrops from '@/components/NearbyCrops';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

const CropList = () => {
  const { data: crops = [], isLoading } = useCrops();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');

  // Filter crops based on search and filters
  const filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crop.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || crop.category === selectedCategory;
    const matchesDistrict = selectedDistrict === 'all' || crop.district === selectedDistrict;
    
    return matchesSearch && matchesCategory && matchesDistrict;
  });

  // Get unique categories and districts for filters
  const categories = [...new Set(crops.map(crop => crop.category))];
  const districts = [...new Set(crops.map(crop => crop.district))];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">{t('common.loading')}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Neighbour Crops Section - Only show if authenticated */}
      {isAuthenticated && (
        <div className="mb-8">
          <NearbyCrops />
        </div>
      )}

      {/* Search and Filters */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-farm-800 mb-6">{t('crops.title')}</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('crops.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder={t('common.filter')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('crops.allCategories')}</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder={t('auth.register.district')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('crops.allDistricts')}</SelectItem>
              {districts.map(district => (
                <SelectItem key={district} value={district}>{district}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Crops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCrops.map((crop) => (
          <Card key={crop.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{crop.title}</CardTitle>
                {crop.is_organic && (
                  <Badge className="bg-green-600">
                    <Leaf className="h-3 w-3 mr-1" />
                    {t('common.organic')}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Crop Image */}
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={crop.images?.[0] || "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400"}
                  alt={crop.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Farmer Info */}
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={crop.profiles?.profile_image || ''} alt={crop.profiles?.name} />
                  <AvatarFallback>
                    {crop.profiles?.name?.charAt(0).toUpperCase() || 'F'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{crop.profiles?.name || 'Unknown Farmer'}</p>
                  <p className="text-sm text-muted-foreground">{crop.profiles?.district}</p>
                </div>
              </div>

              {/* Crop Details */}
              <div className="space-y-2">
                <div className="flex items-center">
                  <Weight className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{crop.quantity} {crop.unit} {t('common.available')}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{crop.district}, {crop.upazila}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{t('common.until')} {new Date(crop.expected_sale_date).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Price and Action */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-2xl font-bold text-farm-600">৳{crop.price_per_unit}</span>
                  <span className="text-muted-foreground">/{crop.unit}</span>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => navigate(`/crops/${crop.id}`)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {t('common.viewDetails')}
                </Button>
              </div>

              {/* Category Badge */}
              <Badge variant="secondary">{crop.category}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCrops.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">{t('crops.noCropsFound')}</h3>
          <p className="text-muted-foreground">{t('crops.adjustFilters')}</p>
        </div>
      )}
    </div>
  );
};

export default CropList;
