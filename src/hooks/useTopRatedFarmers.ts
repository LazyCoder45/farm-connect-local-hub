
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface TopRatedFarmer {
  farmer_id: string;
  farmer_name: string;
  farmer_image: string | null;
  district: string;
  upazila: string;
  total_crops: number;
  avg_rating: number;
}

export const useTopRatedFarmers = () => {
  return useQuery({
    queryKey: ['top-rated-farmers'],
    queryFn: async () => {
      // Get farmers with their crops and ratings
      const { data, error } = await supabase
        .from('crops')
        .select(`
          farmer_id,
          profiles!crops_farmer_id_fkey (
            name,
            profile_image,
            district,
            upazila
          ),
          ratings (
            rating
          )
        `)
        .eq('status', 'available');

      if (error) throw error;

      // Process data to get top rated farmers
      const farmersMap = new Map<string, TopRatedFarmer>();

      data.forEach((crop: any) => {
        const farmerId = crop.farmer_id;
        const farmer = crop.profiles;
        
        if (!farmer) return;

        if (!farmersMap.has(farmerId)) {
          farmersMap.set(farmerId, {
            farmer_id: farmerId,
            farmer_name: farmer.name || 'Unknown Farmer',
            farmer_image: farmer.profile_image,
            district: farmer.district,
            upazila: farmer.upazila,
            total_crops: 0,
            avg_rating: 0,
          });
        }

        const farmerData = farmersMap.get(farmerId)!;
        farmerData.total_crops += 1;

        // Calculate average rating
        if (crop.ratings && crop.ratings.length > 0) {
          const totalRating = crop.ratings.reduce((sum: number, r: any) => sum + r.rating, 0);
          farmerData.avg_rating = totalRating / crop.ratings.length;
        }
      });

      // Convert to array and sort by rating
      return Array.from(farmersMap.values())
        .filter(farmer => farmer.avg_rating > 0)
        .sort((a, b) => b.avg_rating - a.avg_rating)
        .slice(0, 5);
    },
  });
};
