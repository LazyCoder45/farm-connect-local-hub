
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Crop {
  id: string;
  farmer_id: string;
  title: string;
  description: string | null;
  quantity: number;
  unit: string;
  price_per_unit: number;
  category: string;
  harvest_date: string;
  expected_sale_date: string;
  is_organic: boolean | null;
  status: 'available' | 'sold' | 'reserved';
  district: string;
  upazila: string;
  union: string;
  images: string[] | null;
  videos: string[] | null;
  created_at: string;
  updated_at: string | null;
  profiles?: {
    name: string;
    phone: string;
    district: string;
    upazila: string;
    union: string;
  };
}

export const useCrops = () => {
  return useQuery({
    queryKey: ['crops'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('crops')
        .select(`
          *,
          profiles!crops_farmer_id_fkey (
            name,
            phone,
            district,
            upazila,
            union
          )
        `)
        .eq('status', 'available')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Crop[];
    },
  });
};

export const useFarmerCrops = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['farmer-crops', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('Not authenticated');
      
      const { data, error } = await supabase
        .from('crops')
        .select('*')
        .eq('farmer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Crop[];
    },
    enabled: !!user,
  });
};

export const useCreateCrop = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (cropData: Omit<Crop, 'id' | 'farmer_id' | 'created_at' | 'updated_at' | 'profiles'>) => {
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('crops')
        .insert({
          ...cropData,
          farmer_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crops'] });
      queryClient.invalidateQueries({ queryKey: ['farmer-crops'] });
      toast({
        title: "Crop Listed",
        description: "Your crop has been successfully listed.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to List Crop",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateCrop = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updateData }: Partial<Crop> & { id: string }) => {
      const { data, error } = await supabase
        .from('crops')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crops'] });
      queryClient.invalidateQueries({ queryKey: ['farmer-crops'] });
      toast({
        title: "Crop Updated",
        description: "Your crop has been successfully updated.",
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
