
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ThumbsUp, ThumbsDown, User, Calendar } from 'lucide-react';
import { useCropReviews, useVoteReview } from '@/hooks/useReviews';
import { useAuth } from '@/contexts/AuthContext';

interface ReviewListProps {
  cropId: string;
}

const ReviewList = ({ cropId }: ReviewListProps) => {
  const { isAuthenticated } = useAuth();
  const { data: reviews = [] } = useCropReviews(cropId);
  const voteReview = useVoteReview();

  const handleVote = (reviewId: string, isHelpful: boolean) => {
    if (!isAuthenticated) return;
    voteReview.mutate({ review_id: reviewId, is_helpful: isHelpful });
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter(review => review.rating === rating).length / reviews.length) * 100 : 0
  }));

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="mr-2 h-5 w-5" />
            Customer Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-farm-600 mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(averageRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground">
                Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center space-x-2">
                  <span className="text-sm">{rating}</span>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-farm-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-farm-600" />
                  </div>
                  <div>
                    <div className="font-semibold">{review.user_name}</div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(review.created_at).toLocaleDateString()}</span>
                      {review.is_verified_purchase && (
                        <Badge variant="secondary">Verified Purchase</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold mb-2">{review.title}</h4>
              {review.content && (
                <p className="text-muted-foreground mb-4 whitespace-pre-wrap">
                  {review.content}
                </p>
              )}

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {review.helpful_count || 0} people found this helpful
                </div>
                {isAuthenticated && (
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleVote(review.id, true)}
                      disabled={voteReview.isPending}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleVote(review.id, false)}
                      disabled={voteReview.isPending}
                    >
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      Not Helpful
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        
        {reviews.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <Star className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No reviews yet. Be the first to review this crop!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ReviewList;
