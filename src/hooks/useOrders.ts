import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Order {
  id: string;
  crop_id: string;
  consumer_id: string;
  farmer_id: string;
  quantity: number;
  total_amount: number;
  advance_payment: number;
  remaining_payment: number;
  status: 'pending' | 'confirmed' | 'in_transit' | 'delivered' | 'cancelled';
  payment_status: 'advance_paid' | 'full_paid' | 'refunded';
  order_date: string | null;
  expected_delivery_date: string | null;
  created_at: string;
  updated_at: string | null;
  crops?: {
    title: string;
    price_per_unit: number;
    unit: string;
    images: string[] | null;
  };
  consumer_profile?: {
    name: string;
    phone: string;
    district: string;
    profile_image?: string;
  };
  farmer_profile?: {
    name: string;
    phone: string;
    district: string;
    profile_image?: string;
  };
}

export const useOrders = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['orders', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('Not authenticated');
      
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          crops!orders_crop_id_fkey (
            title,
            price_per_unit,
            unit,
            images
          ),
          consumer_profile:profiles!orders_consumer_id_fkey (
            name,
            phone,
            district,
            profile_image
          ),
          farmer_profile:profiles!orders_farmer_id_fkey (
            name,
            phone,
            district,
            profile_image
          )
        `)
        .or(`consumer_id.eq.${user.id},farmer_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Order[];
    },
    enabled: !!user,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (orderData: {
      crop_id: string;
      farmer_id: string;
      quantity: number;
      total_amount: number;
      advance_payment: number;
      expected_delivery_date?: string;
    }) => {
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('orders')
        .insert({
          ...orderData,
          consumer_id: user.id,
          remaining_payment: orderData.total_amount - orderData.advance_payment,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: "Order Placed",
        description: "Your order has been successfully placed.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Order Failed",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ 
      orderId, 
      status, 
      paymentStatus 
    }: { 
      orderId: string; 
      status?: Order['status']; 
      paymentStatus?: Order['payment_status']; 
    }) => {
      const updateData: any = {};
      if (status) updateData.status = status;
      if (paymentStatus) updateData.payment_status = paymentStatus;

      const { data, error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', orderId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: "Order Updated",
        description: "Order status has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    },
  });
};
