
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MapPin, Calendar, Weight, Star, Phone, ArrowLeft, ShoppingCart, Leaf } from 'lucide-react';
import { useCrops } from '@/hooks/useCrops';
import { useAuth } from '@/contexts/AuthContext';
import OrderForm from '@/components/Orders/OrderForm';

const CropDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, profile } = useAuth();
  const { data: crops = [] } = useCrops();
  const [showOrderForm, setShowOrderForm] = useState(false);
  
  const crop = crops.find(c => c.id === id);

  if (!crop) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Crop Not Found</h1>
          <Button onClick={() => navigate('/crops')}>Back to Crops</Button>
        </div>
      </div>
    );
  }

  const handleOrderNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (profile?.role !== 'consumer') {
      alert('Only consumers can place orders.');
      return;
    }
    
    setShowOrderForm(true);
  };

  const isOwnCrop = profile?.id === crop.farmer_id;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/crops')}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Crops
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {crop.images && crop.images.length > 0 ? (
                crop.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-square">
                      <img
                        src={image}
                        alt={`${crop.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem>
                  <div className="aspect-square">
                    <img
                      src="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600"
                      alt={crop.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
            {crop.images && crop.images.length > 1 && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}
          </Carousel>
        </div>

        {/* Crop Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-farm-800">{crop.title}</h1>
              {crop.is_organic && (
                <Badge className="bg-green-600">
                  <Leaf className="h-3 w-3 mr-1" />
                  Organic
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">{crop.description}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Crop Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center">
                <Weight className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>Quantity: {crop.quantity} {crop.unit}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>Location: {crop.district}, {crop.upazila}, {crop.union}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>Harvest Date: {new Date(crop.harvest_date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>Available Until: {new Date(crop.expected_sale_date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Badge variant="outline">{crop.category}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Farmer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={crop.profiles?.profile_image || ''} alt={crop.profiles?.name} />
                  <AvatarFallback className="text-lg">
                    {crop.profiles?.name?.charAt(0).toUpperCase() || 'F'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{crop.profiles?.name || 'Unknown Farmer'}</h3>
                  <p className="text-sm text-muted-foreground">
                    {crop.profiles?.district}, {crop.profiles?.upazila}
                  </p>
                  {crop.profiles?.phone && (
                    <div className="flex items-center mt-1">
                      <Phone className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm">{crop.profiles.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-farm-50 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-3xl font-bold text-farm-600">
                  ৳{crop.price_per_unit}
                </span>
                <span className="text-muted-foreground">/{crop.unit}</span>
              </div>
              <Badge 
                variant={crop.status === 'available' ? 'default' : 'secondary'}
                className={crop.status === 'available' ? 'bg-green-600' : ''}
              >
                {crop.status.charAt(0).toUpperCase() + crop.status.slice(1)}
              </Badge>
            </div>
            
            {crop.status === 'available' && !isOwnCrop && (
              <Button 
                className="w-full bg-farm-600 hover:bg-farm-700" 
                size="lg"
                onClick={handleOrderNow}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Order Now
              </Button>
            )}
            
            {isOwnCrop && (
              <div className="text-center py-4">
                <p className="text-muted-foreground">This is your crop listing</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Form Modal */}
      {showOrderForm && (
        <OrderForm
          crop={crop}
          onClose={() => setShowOrderForm(false)}
        />
      )}
    </div>
  );
};

export default CropDetail;
