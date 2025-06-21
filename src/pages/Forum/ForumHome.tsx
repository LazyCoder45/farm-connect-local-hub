
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Users, TrendingUp, Plus } from 'lucide-react';
import { useForumCategories, useForumPosts } from '@/hooks/useForum';
import { useAuth } from '@/contexts/AuthContext';

const ForumHome = () => {
  const { isAuthenticated } = useAuth();
  const { data: categories = [] } = useForumCategories();
  const { data: recentPosts = [] } = useForumPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-farm-800">Community Forum</h1>
          <p className="text-muted-foreground mt-2">
            Share experiences, ask questions, and exchange farming tips with the community
          </p>
        </div>
        {isAuthenticated && (
          <Button asChild>
            <Link to="/forum/create-post">
              <Plus className="mr-2 h-4 w-4" />
              Create Post
            </Link>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {categories.map((category) => (
          <Card key={category.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-farm-600" />
                {category.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{category.description}</p>
              <Button variant="outline" asChild className="w-full">
                <Link to={`/forum/category/${category.id}`}>
                  Browse Posts
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Recent Discussions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPosts.slice(0, 5).map((post) => (
              <div key={post.id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Link 
                      to={`/forum/post/${post.id}`}
                      className="text-lg font-semibold hover:text-farm-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                      <Users className="mr-1 h-4 w-4" />
                      <span>by {post.user_name}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      {post.forum_categories && (
                        <>
                          <span className="mx-2">•</span>
                          <Badge variant="secondary">{post.forum_categories.name}</Badge>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MessageSquare className="mr-1 h-4 w-4" />
                    <span>{post.replies_count || 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForumHome;
