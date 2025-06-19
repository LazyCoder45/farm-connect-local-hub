
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, MapPin, Phone, Mail, Camera, Package, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useFarmerCrops } from '@/hooks/useCrops';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { profile, updateProfile } = useAuth();
  const { data: farmerCrops = [] } = useFarmerCrops();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: profile?.name || '',
    phone: profile?.phone || '',
    district: profile?.district || '',
    upazila: profile?.upazila || '',
    union: profile?.union || '',
    profile_image: profile?.profile_image || '',
  });

  const handleSave = async () => {
    try {
      await updateProfile(editForm);
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setEditForm({
      name: profile?.name || '',
      phone: profile?.phone || '',
      district: profile?.district || '',
      upazila: profile?.upazila || '',
      union: profile?.union || '',
      profile_image: profile?.profile_image || '',
    });
    setIsEditing(false);
  };

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile Information</TabsTrigger>
            {profile.role === 'farmer' && (
              <TabsTrigger value="crops">My Crops</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Profile Information</CardTitle>
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} variant="outline">
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="space-x-2">
                      <Button onClick={handleSave} size="sm">Save</Button>
                      <Button onClick={handleCancel} variant="outline" size="sm">Cancel</Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={isEditing ? editForm.profile_image : profile.profile_image} alt={profile.name} />
                      <AvatarFallback className="text-2xl">
                        {profile.name?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{profile.name}</h2>
                    <div className="flex items-center gap-2">
                      <Badge className={profile.role === 'farmer' ? 'bg-farm-600' : 'bg-blue-600'}>
                        {profile.role?.charAt(0).toUpperCase() + profile.role?.slice(1)}
                      </Badge>
                      {profile.is_verified && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div>
                    <Label htmlFor="profile_image">Profile Image URL</Label>
                    <Input
                      id="profile_image"
                      value={editForm.profile_image}
                      onChange={(e) => setEditForm(prev => ({ ...prev, profile_image: e.target.value }))}
                      placeholder="Enter image URL"
                    />
                  </div>
                )}

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={editForm.name}
                        onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      />
                    ) : (
                      <div className="flex items-center mt-2">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{profile.name}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center mt-2">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{profile.email}</span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editForm.phone}
                        onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    ) : (
                      <div className="flex items-center mt-2">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{profile.phone}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label>Role</Label>
                    <div className="flex items-center mt-2">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="capitalize">{profile.role}</span>
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Location
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="district">District</Label>
                      {isEditing ? (
                        <Input
                          id="district"
                          value={editForm.district}
                          onChange={(e) => setEditForm(prev => ({ ...prev, district: e.target.value }))}
                        />
                      ) : (
                        <p className="mt-1">{profile.district}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="upazila">Upazila</Label>
                      {isEditing ? (
                        <Input
                          id="upazila"
                          value={editForm.upazila}
                          onChange={(e) => setEditForm(prev => ({ ...prev, upazila: e.target.value }))}
                        />
                      ) : (
                        <p className="mt-1">{profile.upazila}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="union">Union</Label>
                      {isEditing ? (
                        <Input
                          id="union"
                          value={editForm.union}
                          onChange={(e) => setEditForm(prev => ({ ...prev, union: e.target.value }))}
                        />
                      ) : (
                        <p className="mt-1">{profile.union}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {profile.role === 'farmer' && (
            <TabsContent value="crops">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    My Posted Crops ({farmerCrops.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {farmerCrops.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {farmerCrops.map((crop) => (
                        <Card key={crop.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              <h3 className="font-semibold">{crop.title}</h3>
                              <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-farm-600">৳{crop.price_per_unit}</span>
                                <Badge 
                                  variant={crop.status === 'available' ? 'default' : 'secondary'}
                                  className={crop.status === 'available' ? 'bg-green-600' : ''}
                                >
                                  {crop.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{crop.quantity} {crop.unit}</p>
                              <p className="text-sm text-muted-foreground">
                                Category: {crop.category}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No crops posted yet</h3>
                      <p className="text-muted-foreground mb-4">Start posting your crops to reach more customers.</p>
                      <Button asChild className="bg-farm-600 hover:bg-farm-700">
                        <a href="/post-crop">Post Your First Crop</a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
