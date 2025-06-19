
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Crop } from '@/hooks/useCrops';

export const useNearbyCrops = () => {
  const { profile } = useAuth();
  
  return useQuery({
    queryKey: ['nearby-crops', profile?.district, profile?.upazila],
    queryFn: async () => {
      if (!profile) return [];

      const { data, error } = await supabase
        .from('crops')
        .select(`
          *,
          profiles!crops_farmer_id_fkey (
            name,
            phone,
            district,
            upazila,
            union,
            profile_image
          )
        `)
        .eq('status', 'available')
        .eq('district', profile.district)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Crop[];
    },
    enabled: !!profile,
  });
};
