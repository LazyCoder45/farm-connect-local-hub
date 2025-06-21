
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface ForumCategory {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  created_at: string;
}

export interface ForumPost {
  id: string;
  category_id: string;
  user_id: string;
  user_name: string;
  title: string;
  content: string;
  is_pinned: boolean | null;
  views_count: number | null;
  replies_count: number | null;
  created_at: string;
  updated_at: string | null;
  forum_categories?: ForumCategory;
}

export interface ForumReply {
  id: string;
  post_id: string;
  user_id: string;
  user_name: string;
  content: string;
  created_at: string;
}

export const useForumCategories = () => {
  return useQuery({
    queryKey: ['forum-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('forum_categories')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as ForumCategory[];
    },
  });
};

export const useForumPosts = (categoryId?: string) => {
  return useQuery({
    queryKey: ['forum-posts', categoryId],
    queryFn: async () => {
      let query = supabase
        .from('forum_posts')
        .select(`
          *,
          forum_categories (
            name,
            icon
          )
        `)
        .order('is_pinned', { ascending: false })
        .order('updated_at', { ascending: false });

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as ForumPost[];
    },
  });
};

export const useForumPost = (postId: string) => {
  return useQuery({
    queryKey: ['forum-post', postId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('forum_posts')
        .select(`
          *,
          forum_categories (
            name,
            icon
          )
        `)
        .eq('id', postId)
        .single();

      if (error) throw error;
      return data as ForumPost;
    },
  });
};

export const useForumReplies = (postId: string) => {
  return useQuery({
    queryKey: ['forum-replies', postId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('forum_replies')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as ForumReply[];
    },
  });
};

export const useCreateForumPost = () => {
  const queryClient = useQueryClient();
  const { user, profile } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (postData: { category_id: string; title: string; content: string }) => {
      if (!user || !profile) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('forum_posts')
        .insert({
          ...postData,
          user_id: user.id,
          user_name: profile.name,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forum-posts'] });
      toast({
        title: "Post Created",
        description: "Your forum post has been created successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Create Post",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    },
  });
};

export const useCreateForumReply = () => {
  const queryClient = useQueryClient();
  const { user, profile } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (replyData: { post_id: string; content: string }) => {
      if (!user || !profile) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('forum_replies')
        .insert({
          ...replyData,
          user_id: user.id,
          user_name: profile.name,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['forum-replies', variables.post_id] });
      queryClient.invalidateQueries({ queryKey: ['forum-posts'] });
      toast({
        title: "Reply Added",
        description: "Your reply has been added successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Add Reply",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    },
  });
};
