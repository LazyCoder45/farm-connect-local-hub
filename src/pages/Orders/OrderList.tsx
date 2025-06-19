
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Package, Calendar, MapPin, Phone, DollarSign, Clock } from 'lucide-react';
import { useOrders, useUpdateOrderStatus } from '@/hooks/useOrders';
import { useAuth } from '@/contexts/AuthContext';

const OrderList = () => {
  const { profile } = useAuth();
  const { data: orders = [], isLoading } = useOrders();
  const updateOrderStatus = useUpdateOrderStatus();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'confirmed': return 'bg-blue-500';
      case 'in_transit': return 'bg-purple-500';
      case 'delivered': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'advance_paid': return 'bg-orange-500';
      case 'full_paid': return 'bg-green-500';
      case 'refunded': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus.mutateAsync({
        orderId,
        status: newStatus as any,
      });
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  const handlePaymentUpdate = async (orderId: string, paymentStatus: string) => {
    try {
      await updateOrderStatus.mutateAsync({
        orderId,
        paymentStatus: paymentStatus as any,
      });
    } catch (error) {
      console.error('Failed to update payment status:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading orders...</div>
      </div>
    );
  }

  const myOrders = orders.filter(order => order.consumer_id === profile?.id);
  const farmOrders = orders.filter(order => order.farmer_id === profile?.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-farm-800 mb-8">My Orders</h1>

      {/* My Purchase Orders */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <Package className="mr-2 h-6 w-6" />
          My Purchases ({myOrders.length})
        </h2>
        
        {myOrders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">You haven't placed any orders yet.</p>
              <Button className="mt-4" onClick={() => window.location.href = '/crops'}>
                Browse Crops
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {myOrders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={order.crops?.images?.[0] || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=80'}
                        alt={order.crops?.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{order.crops?.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {order.quantity} {order.crops?.unit} × ৳{order.crops?.price_per_unit}
                        </p>
                        <div className="flex items-center mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex gap-2 mb-2">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <Badge className={getPaymentStatusColor(order.payment_status)}>
                          {order.payment_status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      <p className="font-bold text-lg">৳{order.total_amount}</p>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Farmer Details</h4>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={order.farmer_profile?.profile_image || ''} />
                          <AvatarFallback>
                            {order.farmer_profile?.name?.charAt(0) || 'F'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{order.farmer_profile?.name}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Phone className="h-3 w-3 mr-1" />
                            {order.farmer_profile?.phone}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            {order.farmer_profile?.district}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Payment Details</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Advance Paid:</span>
                          <span>৳{order.advance_payment}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Remaining:</span>
                          <span>৳{order.remaining_payment}</span>
                        </div>
                        {order.expected_delivery_date && (
                          <div className="flex justify-between">
                            <span>Expected Delivery:</span>
                            <span>{new Date(order.expected_delivery_date).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {order.payment_status === 'advance_paid' && order.status === 'delivered' && (
                    <div className="mt-4 pt-4 border-t">
                      <Button
                        onClick={() => handlePaymentUpdate(order.id, 'full_paid')}
                        className="bg-green-600 hover:bg-green-700"
                        disabled={updateOrderStatus.isPending}
                      >
                        <DollarSign className="h-4 w-4 mr-2" />
                        Complete Payment (৳{order.remaining_payment})
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Farm Orders (if user is a farmer) */}
      {profile?.role === 'farmer' && (
        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Clock className="mr-2 h-6 w-6" />
            Orders for My Crops ({farmOrders.length})
          </h2>
          
          {farmOrders.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No orders received yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {farmOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={order.crops?.images?.[0] || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=80'}
                          alt={order.crops?.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold text-lg">{order.crops?.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {order.quantity} {order.crops?.unit} × ৳{order.crops?.price_per_unit}
                          </p>
                          <div className="flex items-center mt-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span className="text-sm text-muted-foreground">
                              {new Date(order.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex gap-2 mb-2">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <Badge className={getPaymentStatusColor(order.payment_status)}>
                            {order.payment_status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        <p className="font-bold text-lg">৳{order.total_amount}</p>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Customer Details</h4>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={order.consumer_profile?.profile_image || ''} />
                            <AvatarFallback>
                              {order.consumer_profile?.name?.charAt(0) || 'C'}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{order.consumer_profile?.name}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Phone className="h-3 w-3 mr-1" />
                              {order.consumer_profile?.phone}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3 mr-1" />
                              {order.consumer_profile?.district}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Order Management</h4>
                        <div className="space-y-2">
                          {order.status === 'pending' && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleStatusUpdate(order.id, 'confirmed')}
                                disabled={updateOrderStatus.isPending}
                              >
                                Confirm Order
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                                disabled={updateOrderStatus.isPending}
                              >
                                Cancel
                              </Button>
                            </div>
                          )}
                          {order.status === 'confirmed' && (
                            <Button
                              size="sm"
                              onClick={() => handleStatusUpdate(order.id, 'in_transit')}
                              disabled={updateOrderStatus.isPending}
                            >
                              Mark as Shipped
                            </Button>
                          )}
                          {order.status === 'in_transit' && (
                            <Button
                              size="sm"
                              onClick={() => handleStatusUpdate(order.id, 'delivered')}
                              disabled={updateOrderStatus.isPending}
                            >
                              Mark as Delivered
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderList;
