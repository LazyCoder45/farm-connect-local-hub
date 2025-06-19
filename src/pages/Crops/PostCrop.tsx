import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { useCreateCrop } from '@/hooks/useCrops';
import { useNavigate } from 'react-router-dom';
import { Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const postCropSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  unit: z.string().min(1, 'Unit is required'),
  price_per_unit: z.number().min(0.1, 'Price must be greater than 0'),
  category: z.string().min(1, 'Category is required'),
  harvest_date: z.string().min(1, 'Harvest date is required'),
  expected_sale_date: z.string().min(1, 'Expected sale date is required'),
  is_organic: z.boolean().default(false),
  district: z.string().min(1, 'District is required'),
  upazila: z.string().min(1, 'Upazila is required'),
  union: z.string().min(1, 'Union is required'),
});

type PostCropFormData = z.infer<typeof postCropSchema>;

const PostCrop = () => {
  const { profile, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const createCropMutation = useCreateCrop();
  const { toast } = useToast();
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const form = useForm<PostCropFormData>({
    resolver: zodResolver(postCropSchema),
    defaultValues: {
      title: '',
      description: '',
      quantity: 1,
      unit: 'kg',
      price_per_unit: 0,
      category: '',
      harvest_date: '',
      expected_sale_date: '',
      is_organic: false,
      district: profile?.district || '',
      upazila: profile?.upazila || '',
      union: profile?.union || '',
    },
  });

  if (!isAuthenticated || profile?.role !== 'farmer') {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-farm-800 mb-4">Access Denied</h1>
        <p className="text-farm-600">Only farmers can post crops. Please login as a farmer.</p>
        <Button asChild className="mt-4">
          <a href="/login">Go to Login</a>
        </Button>
      </div>
    );
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setUploadedImages(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: PostCropFormData) => {
    try {
      await createCropMutation.mutateAsync({
        title: data.title,
        description: data.description,
        quantity: data.quantity,
        unit: data.unit,
        price_per_unit: data.price_per_unit,
        category: data.category,
        harvest_date: data.harvest_date,
        expected_sale_date: data.expected_sale_date,
        is_organic: data.is_organic,
        district: data.district,
        upazila: data.upazila,
        union: data.union,
        status: 'available' as const,
        images: uploadedImages.length > 0 ? uploadedImages : null,
        videos: null,
      });
      toast({
        title: "Success",
        description: "Your crop has been posted successfully!",
      });
      navigate('/crops');
    } catch (error) {
      console.error('Error posting crop:', error);
      toast({
        title: "Error",
        description: "Failed to post crop. Please try again.",
        variant: "destructive",
      });
    }
  };

  const categories = [
    'Rice', 'Vegetables', 'Fruits', 'Pulses', 'Spices', 'Cash Crops', 'Other'
  ];

  const units = ['kg', 'ton', 'piece', 'bundle', 'bag'];

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-farm-800">Post Your Crop</CardTitle>
          <p className="text-farm-600">List your crops to connect with buyers directly</p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Crop Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Premium Basmati Rice" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your crop quality, growing conditions, etc."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image Upload Section */}
              <div className="space-y-4">
                <FormLabel>Crop Images</FormLabel>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Click to upload images or drag and drop
                    </p>
                  </label>
                </div>
                
                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {uploadedImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Crop image ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {units.map((unit) => (
                            <SelectItem key={unit} value={unit}>
                              {unit}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price_per_unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price per Unit (৳)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="harvest_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Harvest Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expected_sale_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Sale Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
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

              <FormField
                control={form.control}
                name="is_organic"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Organic Crop</FormLabel>
                      <div className="text-sm text-muted-foreground">
                        Is this crop grown organically without pesticides?
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-farm-600 hover:bg-farm-700"
                disabled={createCropMutation.isPending}
              >
                {createCropMutation.isPending ? 'Posting...' : 'Post Crop'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostCrop;
