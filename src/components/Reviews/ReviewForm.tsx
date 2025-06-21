
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { useCreateCropReview } from '@/hooks/useReviews';
import { useAuth } from '@/contexts/AuthContext';

interface ReviewFormProps {
  cropId: string;
  cropTitle: string;
}

const ReviewForm = ({ cropId, cropTitle }: ReviewFormProps) => {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const createReview = useCreateCropReview();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !title.trim()) return;

    createReview.mutate(
      { crop_id: cropId, rating, title, content },
      {
        onSuccess: () => {
          setOpen(false);
          setRating(0);
          setTitle('');
          setContent('');
        }
      }
    );
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Write a Review</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Review {cropTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Rating</Label>
            <div className="flex space-x-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= (hoverRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="title">Review Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your review..."
              required
            />
          </div>

          <div>
            <Label htmlFor="content">Review Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your experience with this crop..."
              rows={4}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!rating || !title.trim() || createReview.isPending}
            >
              {createReview.isPending ? 'Submitting...' : 'Submit Review'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewForm;
