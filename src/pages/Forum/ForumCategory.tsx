
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MessageSquare, Users, Plus, Pin } from 'lucide-react';
import { useForumPosts, useForumCategories } from '@/hooks/useForum';
import { useAuth } from '@/contexts/AuthContext';

const ForumCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { isAuthenticated } = useAuth();
  const { data: posts = [] } = useForumPosts(categoryId);
  const { data: categories = [] } = useForumCategories();
  
  const category = categories.find(c => c.id === categoryId);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Button variant="ghost" asChild className="mr-4">
            <Link to="/forum">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Forum
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-farm-800">
              {category?.name || 'Category'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {category?.description}
            </p>
          </div>
        </div>
        {isAuthenticated && (
          <Button asChild>
            <Link to={`/forum/create-post?category=${categoryId}`}>
              <Plus className="mr-2 h-4 w-4" />
              Create Post
            </Link>
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="mx-auto h-12 w-12 mb-4" />
                <p>No posts in this category yet. Be the first to start a discussion!</p>
              </div>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        {post.is_pinned && (
                          <Pin className="mr-2 h-4 w-4 text-farm-600" />
                        )}
                        <Link 
                          to={`/forum/post/${post.id}`}
                          className="text-lg font-semibold hover:text-farm-600 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="mr-1 h-4 w-4" />
                        <span>by {post.user_name}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <span>{post.views_count || 0} views</span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MessageSquare className="mr-1 h-4 w-4" />
                      <span>{post.replies_count || 0} replies</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForumCategory;
