import React, { useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { Grid, List, CheckCircle, MapPin, Link as LinkIcon, Calendar } from 'lucide-react';
import { MOCK_USERS, INITIAL_POSTS, formatCount } from '@/data/mockData';
import { AvatarPlaceholder } from '@/components/AvatarPlaceholder';
import { PostCard } from '@/components/PostCard';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';

function truncatePrincipal(principal: string): string {
  if (principal.length <= 11) return principal;
  return `${principal.slice(0, 5)}...${principal.slice(-3)}`;
}

export function Profile() {
  const { userId } = useParams({ from: '/profile/$userId' });
  const [following, setFollowing] = useState(false);
  const { loginStatus, identity } = useInternetIdentity();

  const isAuthenticated = loginStatus === 'success' && !!identity;

  const user = MOCK_USERS.find(u => u.id === userId) || MOCK_USERS[0];
  const userPosts = INITIAL_POSTS.filter(p => p.userId === userId);

  // When viewing own profile (u1) and authenticated, show principal
  const isOwnProfile = userId === 'u1';
  const displayName =
    isOwnProfile && isAuthenticated && identity
      ? truncatePrincipal(identity.getPrincipal().toString())
      : user.displayName;
  const displayHandle =
    isOwnProfile && isAuthenticated && identity
      ? identity.getPrincipal().toString().slice(0, 20) + '…'
      : user.handle;

  return (
    <div className="max-w-2xl mx-auto pb-20 md:pb-6">
      {/* Profile Header Card */}
      <div className="bg-card rounded-2xl shadow-card overflow-hidden mb-4">
        {/* Cover */}
        <div
          className="h-32 w-full"
          style={{ background: 'linear-gradient(135deg, oklch(0.75 0.15 25 / 0.3), oklch(0.72 0.2 350 / 0.2))' }}
        />

        <div className="px-5 pb-5">
          {/* Avatar */}
          <div className="flex items-end justify-between -mt-8 mb-4">
            <div className="ring-4 ring-card rounded-full">
              <AvatarPlaceholder
                initials={user.initials}
                colorClass={user.avatarColor}
                size="xl"
              />
            </div>
            <div className="flex gap-2 mt-2">
              <Button
                variant={following ? 'outline' : 'default'}
                size="sm"
                onClick={() => setFollowing(!following)}
                className={cn(
                  'rounded-xl font-semibold text-sm px-5',
                  !following && 'gradient-coral text-white border-0 shadow-coral hover:opacity-90'
                )}
              >
                {following ? 'Following' : 'Follow'}
              </Button>
              <Button variant="outline" size="sm" className="rounded-xl font-semibold text-sm">
                Message
              </Button>
            </div>
          </div>

          {/* User Info */}
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-0.5">
              <h1 className="text-xl font-bold text-foreground">{displayName}</h1>
              {user.verified && !isAuthenticated && (
                <CheckCircle className="w-5 h-5 text-primary fill-primary/20" />
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-2">{displayHandle}</p>
            <p className="text-sm text-foreground leading-relaxed">{user.bio}</p>
          </div>

          {/* Stats */}
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{formatCount(user.postsCount)}</p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{formatCount(user.followers)}</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{formatCount(user.following)}</p>
              <p className="text-xs text-muted-foreground">Following</p>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <Tabs defaultValue="posts">
        <TabsList className="w-full bg-card rounded-2xl shadow-card mb-4 p-1">
          <TabsTrigger value="posts" className="flex-1 rounded-xl text-sm font-medium">Posts</TabsTrigger>
          <TabsTrigger value="media" className="flex-1 rounded-xl text-sm font-medium">Media</TabsTrigger>
          <TabsTrigger value="likes" className="flex-1 rounded-xl text-sm font-medium">Likes</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          {userPosts.length > 0 ? (
            userPosts.map(post => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="bg-card rounded-2xl shadow-card p-12 text-center">
              <p className="text-muted-foreground text-sm">No posts yet</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="media">
          <div className="bg-card rounded-2xl shadow-card p-4">
            <div className="grid grid-cols-3 gap-2">
              {userPosts.filter(p => p.imageGradient).map(post => (
                <div
                  key={post.id}
                  className={cn('aspect-square rounded-xl', post.imageGradient)}
                />
              ))}
              {userPosts.filter(p => p.imageGradient).length === 0 && (
                <div className="col-span-3 py-8 text-center text-muted-foreground text-sm">
                  No media posts yet
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="likes">
          <div className="bg-card rounded-2xl shadow-card p-12 text-center">
            <p className="text-muted-foreground text-sm">Liked posts are private</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
