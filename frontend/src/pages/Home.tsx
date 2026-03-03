import React, { useState } from 'react';
import { Post, INITIAL_POSTS, STORIES, TRENDING_HASHTAGS } from '@/data/mockData';
import { StoriesBar } from '@/components/StoriesBar';
import { PostComposer } from '@/components/PostComposer';
import { PostCard } from '@/components/PostCard';
import { TrendingSidebar } from '@/components/TrendingSidebar';

export function Home() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);

  const handleNewPost = (post: Post) => {
    setPosts(prev => [post, ...prev]);
  };

  return (
    <div className="flex gap-6 max-w-5xl mx-auto">
      {/* Main Feed */}
      <div className="flex-1 min-w-0 space-y-4 pb-20 md:pb-6">
        <StoriesBar stories={STORIES} />
        <PostComposer onPost={handleNewPost} />
        <div className="space-y-4">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Right Sidebar - Desktop only */}
      <aside className="hidden lg:block w-72 flex-shrink-0">
        <div className="sticky top-6">
          <TrendingSidebar hashtags={TRENDING_HASHTAGS} />
        </div>
      </aside>
    </div>
  );
}
