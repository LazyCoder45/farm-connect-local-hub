
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Star, MapPin, Package } from 'lucide-react';
import { useTopRatedFarmers } from '@/hooks/useTopRatedFarmers';
import { useLanguage } from '@/contexts/LanguageContext';

const TopRatedFarmers = () => {
  const navigate = useNavigate();
  const { data: farmers = [], isLoading } = useTopRatedFarmers();
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">{t('topFarmers.loading')}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/crops')}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t('crops.backToCrops')}
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-farm-800 mb-2">{t('topFarmers.title')}</h1>
        <p className="text-muted-foreground">{t('topFarmers.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {farmers.map((farmer, index) => (
          <Card key={farmer.farmer_id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="relative">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={farmer.farmer_image || ''} alt={farmer.farmer_name} />
                  <AvatarFallback className="text-lg">
                    {farmer.farmer_name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {index < 3 && (
                  <Badge 
                    className={`absolute -top-2 -right-2 ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                    }`}
                  >
                    #{index + 1}
                  </Badge>
                )}
              </div>
              <CardTitle className="text-xl">{farmer.farmer_name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-center gap-1">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="font-semibold">{farmer.avg_rating.toFixed(1)}</span>
                <span className="text-muted-foreground">{t('common.rating')}</span>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{farmer.district}, {farmer.upazila}</span>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Package className="h-4 w-4" />
                <span>{farmer.total_crops} {t('crops.cropsAvailable')}</span>
              </div>
              
              <Button 
                className="w-full bg-farm-600 hover:bg-farm-700"
                onClick={() => navigate('/crops')}
              >
                {t('topFarmers.viewCrops')}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {farmers.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">{t('topFarmers.noRatedFarmers')}</h3>
          <p className="text-muted-foreground">{t('topFarmers.noRatedFarmersDesc')}</p>
        </div>
      )}
    </div>
  );
};

export default TopRatedFarmers;
