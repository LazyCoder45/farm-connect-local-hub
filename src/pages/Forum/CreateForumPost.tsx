
import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { useForumCategories, useCreateForumPost } from '@/hooks/useForum';
import { useAuth } from '@/contexts/AuthContext';

const CreateForumPost = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState(searchParams.get('category') || '');

  const { data: categories = [] } = useForumCategories();
  const createPost = useCreateForumPost();

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Please sign in to create forum posts
            </p>
            <Button asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !categoryId) return;

    createPost.mutate(
      { category_id: categoryId, title, content },
      {
        onSuccess: (data) => {
          navigate(`/forum/post/${data.id}`);
        }
      }
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/forum">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Forum
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title..."
                required
              />
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content..."
                rows={8}
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => navigate('/forum')}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={!title.trim() || !content.trim() || !categoryId || createPost.isPending}
              >
                {createPost.isPending ? 'Creating...' : 'Create Post'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateForumPost;
