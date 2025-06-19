
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Upload, X } from 'lucide-react';
import { useCreateCrop } from '@/hooks/useCrops';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const PostCrop = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const createCropMutation = useCreateCrop();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: '',
    unit: 'kg',
    price_per_unit: '',
    category: '',
    harvest_date: undefined as Date | undefined,
    expected_sale_date: undefined as Date | undefined,
    is_organic: false,
    district: profile?.district || '',
    upazila: profile?.upazila || '',
    union: profile?.union || '',
  });

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');

  const categories = [
    'Rice', 'Vegetables', 'Fruits', 'Pulses', 'Spices', 'Grains', 'Others'
  ];

  const units = ['kg', 'ton', 'piece', 'dozen', 'bag', 'sack'];

  const districts = [
    'Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh',
    'Dinajpur', 'Kushtia', 'Jessore', 'Comilla', 'Bogra', 'Pabna', 'Sirajganj'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddImage = () => {
    if (newImageUrl.trim() && !imageUrls.includes(newImageUrl.trim())) {
      setImageUrls(prev => [...prev, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.harvest_date || !formData.expected_sale_date) {
      alert('Please select both harvest date and expected sale date');
      return;
    }

    const cropData = {
      ...formData,
      quantity: parseFloat(formData.quantity),
      price_per_unit: parseFloat(formData.price_per_unit),
      harvest_date: formData.harvest_date.toISOString().split('T')[0],
      expected_sale_date: formData.expected_sale_date.toISOString().split('T')[0],
      images: imageUrls.length > 0 ? imageUrls : null,
      videos: null,
      status: 'available' as const,
    };

    try {
      await createCropMutation.mutateAsync(cropData);
      navigate('/crops');
    } catch (error) {
      console.error('Error creating crop:', error);
    }
  };

  if (!profile || profile.role !== 'farmer') {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
              <p className="text-muted-foreground mb-4">Only farmers can post crops.</p>
              <Button onClick={() => navigate('/crops')}>Browse Crops</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-farm-800">Post Your Crop</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Crop Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Premium Basmati Rice"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your crop quality, growing methods, etc."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                    placeholder="e.g., 500"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Unit *</Label>
                  <Select value={formData.unit} onValueChange={(value) => handleInputChange('unit', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map(unit => (
                        <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price per Unit (৳) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price_per_unit}
                    onChange={(e) => handleInputChange('price_per_unit', e.target.value)}
                    placeholder="e.g., 85.00"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
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
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Harvest Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.harvest_date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.harvest_date ? format(formData.harvest_date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.harvest_date}
                      onSelect={(date) => handleInputChange('harvest_date', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Expected Sale Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.expected_sale_date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.expected_sale_date ? format(formData.expected_sale_date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.expected_sale_date}
                      onSelect={(date) => handleInputChange('expected_sale_date', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="district">District *</Label>
                <Select value={formData.district} onValueChange={(value) => handleInputChange('district', value)}>
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
              <div>
                <Label htmlFor="upazila">Upazila *</Label>
                <Input
                  id="upazila"
                  value={formData.upazila}
                  onChange={(e) => handleInputChange('upazila', e.target.value)}
                  placeholder="Upazila"
                  required
                />
              </div>
              <div>
                <Label htmlFor="union">Union *</Label>
                <Input
                  id="union"
                  value={formData.union}
                  onChange={(e) => handleInputChange('union', e.target.value)}
                  placeholder="Union"
                  required
                />
              </div>
            </div>

            {/* Images */}
            <div>
              <Label>Crop Images</Label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="Enter image URL (e.g., from Unsplash)"
                  />
                  <Button type="button" onClick={handleAddImage} variant="outline">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                {imageUrls.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {imageUrls.map((url, index) => (
                      <div key={index} className="relative">
                        <img src={url} alt={`Crop ${index + 1}`} className="w-full h-24 object-cover rounded" />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 h-6 w-6 p-0"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Organic Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="organic"
                checked={formData.is_organic}
                onCheckedChange={(checked) => handleInputChange('is_organic', checked)}
              />
              <Label htmlFor="organic">This is organically grown</Label>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-farm-600 hover:bg-farm-700"
              disabled={createCropMutation.isPending}
            >
              {createCropMutation.isPending ? 'Posting...' : 'Post Crop'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostCrop;
