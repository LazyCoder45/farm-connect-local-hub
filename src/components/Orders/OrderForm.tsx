
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Package, DollarSign } from 'lucide-react';
import { Crop } from '@/hooks/useCrops';
import { useCreateOrder } from '@/hooks/useOrders';

interface OrderFormProps {
  crop: Crop;
  onClose: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ crop, onClose }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState<string>('');
  
  const createOrderMutation = useCreateOrder();

  const totalAmount = quantity * crop.price_per_unit;
  const advancePayment = Math.round(totalAmount * 0.2); // 20% advance
  const remainingPayment = totalAmount - advancePayment;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createOrderMutation.mutateAsync({
        crop_id: crop.id,
        farmer_id: crop.farmer_id,
        quantity,
        total_amount: totalAmount,
        advance_payment: advancePayment,
        expected_delivery_date: expectedDeliveryDate || undefined,
      });
      onClose();
    } catch (error) {
      console.error('Order creation failed:', error);
    }
  };

  const maxQuantity = Math.min(crop.quantity, 100);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Place Order</span>
            <Button variant="ghost" onClick={onClose}>×</Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Crop Summary */}
          <div className="bg-farm-50 p-4 rounded-lg">
            <div className="flex items-start space-x-4">
              <img
                src={crop.images?.[0] || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100'}
                alt={crop.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{crop.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{crop.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {crop.district}, {crop.upazila}
                  </div>
                  <div className="flex items-center">
                    <Package className="h-4 w-4 mr-1" />
                    Available: {crop.quantity} {crop.unit}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-bold text-farm-600">৳{crop.price_per_unit}/{crop.unit}</span>
                  {crop.is_organic && (
                    <Badge className="bg-green-600">Organic</Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Quantity Selection */}
            <div>
              <Label htmlFor="quantity">Quantity ({crop.unit})</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max={maxQuantity}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="mt-1"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Available: {crop.quantity} {crop.unit}
              </p>
            </div>

            {/* Delivery Address */}
            <div>
              <Label htmlFor="address">Delivery Address</Label>
              <Textarea
                id="address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Enter your complete delivery address..."
                className="mt-1"
                rows={3}
                required
              />
            </div>

            {/* Expected Delivery Date */}
            <div>
              <Label htmlFor="deliveryDate">Expected Delivery Date (Optional)</Label>
              <Input
                id="deliveryDate"
                type="date"
                value={expectedDeliveryDate}
                onChange={(e) => setExpectedDeliveryDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="mt-1"
              />
            </div>

            {/* Payment Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Price per {crop.unit}:</span>
                  <span>৳{crop.price_per_unit}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span>{quantity} {crop.unit}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Total Amount:</span>
                  <span>৳{totalAmount}</span>
                </div>
                <div className="flex justify-between text-farm-600">
                  <span>Advance Payment (20%):</span>
                  <span>৳{advancePayment}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Remaining Payment:</span>
                  <span>৳{remainingPayment}</span>
                </div>
              </CardContent>
            </Card>

            {/* Farmer Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Farmer Information</h4>
              <div className="flex items-center space-x-3">
                <img
                  src={crop.profiles?.profile_image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face'}
                  alt={crop.profiles?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{crop.profiles?.name}</p>
                  <p className="text-sm text-muted-foreground">{crop.profiles?.phone}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-farm-600 hover:bg-farm-700"
                disabled={createOrderMutation.isPending}
              >
                {createOrderMutation.isPending ? 'Placing Order...' : 'Place Order'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderForm;
