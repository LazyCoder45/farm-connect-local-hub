
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface TransportProvider {
  id: string;
  provider_id: string;
  provider_name: string;
  provider_phone: string;
  vehicle_type: string;
  capacity: string;
  price_per_km: number;
  available_date: string;
  available_districts: string[] | null;
  is_available: boolean | null;
  rating: number | null;
  completed_trips: number | null;
  created_at: string;
  profiles?: {
    name: string;
    phone: string;
    district: string;
  };
}

export const useTransportProviders = () => {
  return useQuery({
    queryKey: ['transport-providers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transport_providers')
        .select(`
          *,
          profiles!transport_providers_provider_id_fkey (
            name,
            phone,
            district
          )
        `)
        .eq('is_available', true)
        .order('rating', { ascending: false });

      if (error) throw error;
      return data as TransportProvider[];
    },
  });
};

export const useMyTransportListings = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['my-transport-listings', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('Not authenticated');
      
      const { data, error } = await supabase
        .from('transport_providers')
        .select('*')
        .eq('provider_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as TransportProvider[];
    },
    enabled: !!user,
  });
};

export const useCreateTransportListing = () => {
  const queryClient = useQueryClient();
  const { user, profile } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (transportData: Omit<TransportProvider, 'id' | 'provider_id' | 'provider_name' | 'provider_phone' | 'created_at' | 'profiles'>) => {
      if (!user || !profile) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('transport_providers')
        .insert({
          ...transportData,
          provider_id: user.id,
          provider_name: profile.name,
          provider_phone: profile.phone,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transport-providers'] });
      queryClient.invalidateQueries({ queryKey: ['my-transport-listings'] });
      toast({
        title: "Transport Listed",
        description: "Your transport service has been successfully listed.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to List Transport",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateTransportListing = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updateData }: Partial<TransportProvider> & { id: string }) => {
      const { data, error } = await supabase
        .from('transport_providers')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transport-providers'] });
      queryClient.invalidateQueries({ queryKey: ['my-transport-listings'] });
      toast({
        title: "Transport Updated",
        description: "Your transport listing has been successfully updated.",
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
