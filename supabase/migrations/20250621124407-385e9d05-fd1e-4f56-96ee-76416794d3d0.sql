
-- Create forum categories table
CREATE TABLE public.forum_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create forum posts table
CREATE TABLE public.forum_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES public.forum_categories(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT FALSE,
  views_count INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create forum replies table
CREATE TABLE public.forum_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create crop reviews table (for rating system)
CREATE TABLE public.crop_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crop_id UUID NOT NULL REFERENCES public.crops(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT NOT NULL,
  content TEXT,
  is_verified_purchase BOOLEAN DEFAULT FALSE,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(crop_id, user_id)
);

-- Create review helpfulness votes table
CREATE TABLE public.review_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES public.crop_reviews(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  is_helpful BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(review_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE public.forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crop_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_votes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for forum categories
CREATE POLICY "Anyone can view forum categories" ON public.forum_categories FOR SELECT USING (true);

-- RLS Policies for forum posts
CREATE POLICY "Anyone can view forum posts" ON public.forum_posts FOR SELECT USING (true);
CREATE POLICY "Users can create forum posts" ON public.forum_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own posts" ON public.forum_posts FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for forum replies
CREATE POLICY "Anyone can view forum replies" ON public.forum_replies FOR SELECT USING (true);
CREATE POLICY "Users can create forum replies" ON public.forum_replies FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own replies" ON public.forum_replies FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for crop reviews
CREATE POLICY "Anyone can view crop reviews" ON public.crop_reviews FOR SELECT USING (true);
CREATE POLICY "Users can create crop reviews" ON public.crop_reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reviews" ON public.crop_reviews FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for review votes
CREATE POLICY "Users can view review votes" ON public.review_votes FOR SELECT USING (true);
CREATE POLICY "Users can create review votes" ON public.review_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own votes" ON public.review_votes FOR UPDATE USING (auth.uid() = user_id);

-- Insert default forum categories
INSERT INTO public.forum_categories (name, description, icon) VALUES
('General Discussion', 'General farming and agriculture discussions', 'MessageSquare'),
('Crop Advice', 'Ask questions about specific crops and farming techniques', 'Leaf'),
('Market Insights', 'Share market trends and pricing information', 'TrendingUp'),
('Equipment & Tools', 'Discuss farming equipment and tools', 'Wrench'),
('Success Stories', 'Share your farming success stories and experiences', 'Star'),
('Weather & Climate', 'Weather updates and climate-related discussions', 'Cloud');

-- Create triggers for updated_at
CREATE TRIGGER update_forum_posts_updated_at BEFORE UPDATE ON public.forum_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to update replies count
CREATE OR REPLACE FUNCTION public.update_forum_post_replies_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.forum_posts 
    SET replies_count = replies_count + 1 
    WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.forum_posts 
    SET replies_count = replies_count - 1 
    WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to update replies count
CREATE TRIGGER forum_replies_count_trigger
  AFTER INSERT OR DELETE ON public.forum_replies
  FOR EACH ROW EXECUTE FUNCTION public.update_forum_post_replies_count();

-- Create function to update helpful count for reviews
CREATE OR REPLACE FUNCTION public.update_review_helpful_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.is_helpful THEN
      UPDATE public.crop_reviews 
      SET helpful_count = helpful_count + 1 
      WHERE id = NEW.review_id;
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.is_helpful AND NOT NEW.is_helpful THEN
      UPDATE public.crop_reviews 
      SET helpful_count = helpful_count - 1 
      WHERE id = NEW.review_id;
    ELSIF NOT OLD.is_helpful AND NEW.is_helpful THEN
      UPDATE public.crop_reviews 
      SET helpful_count = helpful_count + 1 
      WHERE id = NEW.review_id;
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.is_helpful THEN
      UPDATE public.crop_reviews 
      SET helpful_count = helpful_count - 1 
      WHERE id = OLD.review_id;
    END IF;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to update helpful count
CREATE TRIGGER review_helpful_count_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.review_votes
  FOR EACH ROW EXECUTE FUNCTION public.update_review_helpful_count();
