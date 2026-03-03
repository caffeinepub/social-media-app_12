import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Post, INITIAL_POSTS } from '@/data/mockData';
import { PostComposer } from '@/components/PostComposer';
import { ArrowLeft } from 'lucide-react';

export function CreatePost() {
  const navigate = useNavigate();

  const handlePost = (_post: Post) => {
    navigate({ to: '/' });
  };

  return (
    <div className="max-w-2xl mx-auto pb-20 md:pb-6">
      <div className="bg-card rounded-2xl shadow-card p-4 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate({ to: '/' })}
            className="p-2 rounded-xl hover:bg-secondary transition-colors text-muted-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Create Post</h1>
        </div>
        <PostComposer onPost={handlePost} />
      </div>
    </div>
  );
}
