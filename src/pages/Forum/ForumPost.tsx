
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, MessageSquare, Users, Calendar, Reply } from 'lucide-react';
import { useForumPost, useForumReplies, useCreateForumReply } from '@/hooks/useForum';
import { useAuth } from '@/contexts/AuthContext';

const ForumPost = () => {
  const { postId } = useParams<{ postId: string }>();
  const { isAuthenticated } = useAuth();
  const [replyContent, setReplyContent] = useState('');
  
  const { data: post } = useForumPost(postId!);
  const { data: replies = [] } = useForumReplies(postId!);
  const createReply = useCreateForumReply();

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || !postId) return;

    createReply.mutate(
      { post_id: postId, content: replyContent },
      {
        onSuccess: () => {
          setReplyContent('');
        }
      }
    );
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/forum">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Forum
        </Link>
      </Button>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl mb-2">{post.title}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="mr-1 h-4 w-4" />
                <span>by {post.user_name}</span>
                <span className="mx-2">•</span>
                <Calendar className="mr-1 h-4 w-4" />
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <span>{post.views_count || 0} views</span>
              </div>
            </div>
            {post.forum_categories && (
              <Badge>{post.forum_categories.name}</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap">{post.content}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            Replies ({replies.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {replies.map((reply) => (
              <div key={reply.id} className="border-l-4 border-farm-200 pl-4 py-2">
                <div className="flex items-center mb-2 text-sm text-muted-foreground">
                  <Users className="mr-1 h-4 w-4" />
                  <span className="font-medium">{reply.user_name}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(reply.created_at).toLocaleDateString()}</span>
                </div>
                <p className="whitespace-pre-wrap">{reply.content}</p>
              </div>
            ))}
            {replies.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                No replies yet. Be the first to reply!
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {isAuthenticated && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Reply className="mr-2 h-5 w-5" />
              Add Reply
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleReplySubmit}>
              <Textarea
                placeholder="Write your reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="mb-4"
                rows={4}
              />
              <Button 
                type="submit" 
                disabled={!replyContent.trim() || createReply.isPending}
              >
                {createReply.isPending ? 'Posting...' : 'Post Reply'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {!isAuthenticated && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Please sign in to participate in discussions
            </p>
            <Button asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ForumPost;
