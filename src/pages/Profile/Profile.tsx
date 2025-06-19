
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useFarmerCrops } from '@/hooks/useCrops';
import { User, Edit, MapPin, Phone, Mail, CheckCircle } from 'lucide-react';

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone is required'),
  district: z.string().min(1, 'District is required'),
  upazila: z.string().min(1, 'Upazila is required'),
  union: z.string().min(1, 'Union is required'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const Profile = () => {
  const { profile, updateProfile, isAuthenticated } = useAuth();
  const { data: farmerCrops } = useFarmerCrops();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile?.name || '',
      phone: profile?.phone || '',
      district: profile?.district || '',
      upazila: profile?.upazila || '',
      union: profile?.union || '',
    },
  });

  if (!isAuthenticated || !profile) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-farm-800 mb-4">Please Login</h1>
        <p className="text-farm-600">You need to be logged in to view your profile.</p>
        <Button asChild className="mt-4">
          <a href="/login">Go to Login</a>
        </Button>
      </div>
    );
  }

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile(data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader className="pb-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile.profile_image} alt={profile.name} />
                <AvatarFallback className="text-lg">
                  {profile.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold text-farm-800">{profile.name}</h1>
                  {profile.is_verified && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
                <div className="flex items-center space-x-4 mt-2 text-farm-600">
                  <Badge variant={profile.role === 'farmer' ? 'default' : 'secondary'}>
                    {profile.role === 'farmer' ? 'Farmer' : 'Consumer'}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.district}, {profile.upazila}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mt-1 text-farm-600">
                  <div className="flex items-center space-x-1">
                    <Mail className="h-4 w-4" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Phone className="h-4 w-4" />
                    <span>{profile.phone}</span>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2"
              >
                <Edit className="h-4 w-4" />
                <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
              </Button>
            </div>
          </CardHeader>

          {isEditing && (
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="district"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>District</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="upazila"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Upazila</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="union"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Union</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button type="submit" className="bg-farm-600 hover:bg-farm-700">
                      Save Changes
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          )}
        </Card>

        {profile.role === 'farmer' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>My Crops</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {farmerCrops && farmerCrops.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {farmerCrops.map((crop) => (
                    <Card key={crop.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-farm-800">{crop.title}</h3>
                          <Badge variant={crop.status === 'available' ? 'default' : 'secondary'}>
                            {crop.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-farm-600 mb-2">
                          {crop.quantity} {crop.unit} • ৳{crop.price_per_unit}/{crop.unit}
                        </p>
                        <p className="text-xs text-farm-500">
                          Expected sale: {formatDate(crop.expected_sale_date)}
                        </p>
                        {crop.is_organic && (
                          <Badge variant="outline" className="mt-2 text-xs">
                            Organic
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-farm-600 mb-4">You haven't posted any crops yet.</p>
                  <Button asChild className="bg-farm-600 hover:bg-farm-700">
                    <a href="/post-crop">Post Your First Crop</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Profile;
