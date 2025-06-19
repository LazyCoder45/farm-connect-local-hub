
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Eye, Leaf } from 'lucide-react';
import { useNearbyCrops } from '@/hooks/useNearbyCrops';
import { useNavigate } from 'react-router-dom';

const NearbyCrops = () => {
  const { data: nearbyCrops = [], isLoading } = useNearbyCrops();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-farm-50 to-green-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-farm-800 mb-4 flex items-center">
          <MapPin className="mr-2 h-6 w-6" />
          Neighbour Crops
        </h2>
        <div className="text-center">Loading nearby crops...</div>
      </div>
    );
  }

  if (nearbyCrops.length === 0) {
    return (
      <div className="bg-gradient-to-r from-farm-50 to-green-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-farm-800 mb-4 flex items-center">
          <MapPin className="mr-2 h-6 w-6" />
          Neighbour Crops
        </h2>
        <p className="text-muted-foreground text-center">No crops available in your area yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-farm-50 to-green-50 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-farm-800 mb-4 flex items-center">
        <MapPin className="mr-2 h-6 w-6" />
        Neighbour Crops
        <Badge className="ml-2 bg-farm-600">Featured</Badge>
      </h2>
      <p className="text-muted-foreground mb-6">Fresh crops available in your district</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nearbyCrops.slice(0, 6).map((crop) => (
          <Card key={crop.id} className="hover:shadow-md transition-shadow border-farm-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{crop.title}</CardTitle>
                {crop.is_organic && (
                  <Badge className="bg-green-600 text-white">
                    <Leaf className="h-3 w-3 mr-1" />
                    Organic
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-farm-600">৳{crop.price_per_unit}</span>
                  <span className="text-muted-foreground">/{crop.unit}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{crop.upazila}, {crop.union}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Farmer: {crop.profiles?.name}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-3"
                  onClick={() => navigate(`/crops/${crop.id}`)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NearbyCrops;
