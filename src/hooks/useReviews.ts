
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface CropReview {
  id: string;
  crop_id: string;
  user_id: string;
  user_name: string;
  rating: number;
  title: string;
  content: string | null;
  is_verified_purchase: boolean | null;
  helpful_count: number | null;
  created_at: string;
}

export interface ReviewVote {
  id: string;
  review_id: string;
  user_id: string;
  is_helpful: boolean;
  created_at: string;
}

export const useCropReviews = (cropId: string) => {
  return useQuery({
    queryKey: ['crop-reviews', cropId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('crop_reviews')
        .select('*')
        .eq('crop_id', cropId)
        .order('helpful_count', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as CropReview[];
    },
  });
};

export const useCreateCropReview = () => {
  const queryClient = useQueryClient();
  const { user, profile } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (reviewData: { 
      crop_id: string; 
      rating: number; 
      title: string; 
      content: string 
    }) => {
      if (!user || !profile) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('crop_reviews')
        .insert({
          ...reviewData,
          user_id: user.id,
          user_name: profile.name,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['crop-reviews', variables.crop_id] });
      toast({
        title: "Review Added",
        description: "Your review has been added successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Add Review",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    },
  });
};

export const useVoteReview = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (voteData: { review_id: string; is_helpful: boolean }) => {
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('review_votes')
        .upsert({
          ...voteData,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crop-reviews'] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Vote",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    },
  });
};
