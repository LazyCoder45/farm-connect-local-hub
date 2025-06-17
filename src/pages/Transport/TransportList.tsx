
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Truck, MapPin, Calendar, Phone, Star, Search } from 'lucide-react';
import { Transport } from '@/types/transport';

const TransportList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedVehicleType, setSelectedVehicleType] = useState('');

  // Mock data - replace with actual API call
  const mockTransports: Transport[] = [
    {
      id: '1',
      providerId: 'provider1',
      providerName: 'Karim Transport',
      providerPhone: '+8801712345678',
      vehicleType: 'Truck',
      capacity: '5 tons',
      pricePerKm: 15,
      availableDate: new Date('2024-01-15'),
      availableDistricts: ['Dhaka', 'Chittagong', 'Sylhet'],
      isAvailable: true,
      rating: 4.5,
      completedTrips: 120,
      createdAt: new Date()
    },
    {
      id: '2',
      providerId: 'provider2',
      providerName: 'Rahim Pickup Service',
      providerPhone: '+8801898765432',
      vehicleType: 'Pickup',
      capacity: '1 ton',
      pricePerKm: 8,
      availableDate: new Date('2024-01-16'),
      availableDistricts: ['Dinajpur', 'Rangpur', 'Kurigram'],
      isAvailable: true,
      rating: 4.8,
      completedTrips: 85,
      createdAt: new Date()
    },
    {
      id: '3',
      providerId: 'provider3',
      providerName: 'Hasan Heavy Transport',
      providerPhone: '+8801556677889',
      vehicleType: 'Heavy Truck',
      capacity: '10 tons',
      pricePerKm: 25,
      availableDate: new Date('2024-01-17'),
      availableDistricts: ['Rajshahi', 'Jessore', 'Khulna'],
      isAvailable: true,
      rating: 4.2,
      completedTrips: 200,
      createdAt: new Date()
    }
  ];

  const districts = ['All Districts', 'Dhaka', 'Chittagong', 'Dinajpur', 'Jessore', 'Rajshahi', 'Sylhet', 'Rangpur'];
  const vehicleTypes = ['All Types', 'Truck', 'Pickup', 'Heavy Truck', 'Van', 'Mini Truck'];

  const filteredTransports = mockTransports.filter(transport => {
    const matchesSearch = transport.providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transport.vehicleType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = !selectedDistrict || selectedDistrict === 'All Districts' || 
                           transport.availableDistricts.includes(selectedDistrict);
    const matchesVehicleType = !selectedVehicleType || selectedVehicleType === 'All Types' || 
                              transport.vehicleType === selectedVehicleType;
    
    return matchesSearch && matchesDistrict && matchesVehicleType && transport.isAvailable;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filter Transport</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search providers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Available in District</label>
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
                <label className="text-sm font-medium">Vehicle Type</label>
                <Select value={selectedVehicleType} onValueChange={setSelectedVehicleType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transport Grid */}
        <div className="lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-farm-800">Available Transport</h1>
            <p className="text-muted-foreground">{filteredTransports.length} providers found</p>
          </div>
          
          <div className="space-y-4">
            {filteredTransports.map((transport) => (
              <Card key={transport.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Truck className="h-6 w-6 text-farm-600" />
                        <h3 className="text-xl font-semibold text-farm-800">
                          {transport.providerName}
                        </h3>
                        <Badge variant="secondary">{transport.vehicleType}</Badge>
                        {transport.isAvailable && (
                          <Badge className="bg-green-600">Available</Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-2" />
                            Capacity: {transport.capacity}
                          </div>
                          
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-2" />
                            Available: {transport.availableDate.toLocaleDateString()}
                          </div>
                          
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Phone className="h-4 w-4 mr-2" />
                            {transport.providerPhone}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Star className="h-4 w-4 mr-2 text-yellow-500 fill-current" />
                            {transport.rating.toFixed(1)} rating ({transport.completedTrips} trips)
                          </div>
                          
                          <div className="text-sm text-muted-foreground">
                            <strong>Price:</strong> ৳{transport.pricePerKm}/km
                          </div>
                          
                          <div className="text-sm text-muted-foreground">
                            <strong>Coverage:</strong> {transport.availableDistricts.join(', ')}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 md:w-48">
                      <Button className="bg-farm-600 hover:bg-farm-700">
                        Book Transport
                      </Button>
                      <Button variant="outline">
                        Contact Provider
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredTransports.length === 0 && (
            <div className="text-center py-12">
              <Truck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No transport providers found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransportList;
