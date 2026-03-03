import React, { useState } from 'react';
import { Search as SearchIcon, X, TrendingUp, Users, Hash, CheckCircle } from 'lucide-react';
import { MOCK_USERS, INITIAL_POSTS, TRENDING_HASHTAGS, formatCount } from '@/data/mockData';
import { AvatarPlaceholder } from '@/components/AvatarPlaceholder';
import { TrendingSidebar } from '@/components/TrendingSidebar';
import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

export function Search() {
  const [query, setQuery] = useState('');

  const filteredUsers = query.trim()
    ? MOCK_USERS.filter(u =>
        u.displayName.toLowerCase().includes(query.toLowerCase()) ||
        u.handle.toLowerCase().includes(query.toLowerCase()) ||
        u.username.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredPosts = query.trim()
    ? INITIAL_POSTS.filter(p =>
        p.text.toLowerCase().includes(query.toLowerCase()) ||
        (p.hashtags || []).some(h => h.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const filteredHashtags = query.trim()
    ? TRENDING_HASHTAGS.filter(h =>
        h.tag.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const hasResults = filteredUsers.length > 0 || filteredPosts.length > 0 || filteredHashtags.length > 0;

  return (
    <div className="flex gap-6 max-w-5xl mx-auto pb-20 md:pb-6">
      <div className="flex-1 min-w-0 space-y-4">
        {/* Search Input */}
        <div className="bg-card rounded-2xl shadow-card p-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search users, posts, hashtags..."
              className="w-full bg-secondary rounded-xl pl-9 pr-9 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        {query.trim() ? (
          hasResults ? (
            <div className="space-y-4">
              {/* Users */}
              {filteredUsers.length > 0 && (
                <div className="bg-card rounded-2xl shadow-card overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                    <Users className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold text-sm text-foreground">People</h3>
                    <span className="text-xs text-muted-foreground">({filteredUsers.length})</span>
                  </div>
                  <div className="divide-y divide-border">
                    {filteredUsers.map(user => (
                      <Link
                        key={user.id}
                        to="/profile/$userId"
                        params={{ userId: user.id }}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors"
                      >
                        <AvatarPlaceholder
                          initials={user.initials}
                          colorClass={user.avatarColor}
                          size="md"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <p className="text-sm font-semibold text-foreground truncate">{user.displayName}</p>
                            {user.verified && <CheckCircle className="w-3.5 h-3.5 text-primary fill-primary/20 flex-shrink-0" />}
                          </div>
                          <p className="text-xs text-muted-foreground">{user.handle}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-medium text-foreground">{formatCount(user.followers)}</p>
                          <p className="text-[10px] text-muted-foreground">followers</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Hashtags */}
              {filteredHashtags.length > 0 && (
                <div className="bg-card rounded-2xl shadow-card overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                    <Hash className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold text-sm text-foreground">Hashtags</h3>
                  </div>
                  <div className="divide-y divide-border">
                    {filteredHashtags.map(tag => (
                      <div key={tag.id} className="flex items-center justify-between px-4 py-3 hover:bg-secondary/50 transition-colors cursor-pointer">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
                            <Hash className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">#{tag.tag}</p>
                            <p className="text-xs text-muted-foreground">{formatCount(tag.postCount)} posts</p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-lg">{tag.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Posts */}
              {filteredPosts.length > 0 && (
                <div className="bg-card rounded-2xl shadow-card overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold text-sm text-foreground">Posts</h3>
                    <span className="text-xs text-muted-foreground">({filteredPosts.length})</span>
                  </div>
                  <div className="divide-y divide-border">
                    {filteredPosts.slice(0, 5).map(post => (
                      <div key={post.id} className="flex items-start gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors cursor-pointer">
                        <AvatarPlaceholder
                          initials={post.user.initials}
                          colorClass={post.user.avatarColor}
                          size="sm"
                          className="mt-0.5"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1 mb-0.5">
                            <p className="text-xs font-semibold text-foreground">{post.user.displayName}</p>
                            <span className="text-[10px] text-muted-foreground">· {post.timestamp}</span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">{post.text}</p>
                        </div>
                        {post.imageGradient && (
                          <div className={cn('w-12 h-12 rounded-lg flex-shrink-0', post.imageGradient)} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-card rounded-2xl shadow-card p-12 text-center">
              <SearchIcon className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
              <p className="text-foreground font-medium mb-1">No results found</p>
              <p className="text-muted-foreground text-sm">Try searching for something else</p>
            </div>
          )
        ) : (
          /* Default: Show trending */
          <div className="lg:hidden">
            <TrendingSidebar hashtags={TRENDING_HASHTAGS} compact />
          </div>
        )}
      </div>

      {/* Right Sidebar - Desktop */}
      <aside className="hidden lg:block w-72 flex-shrink-0">
        <div className="sticky top-6">
          <TrendingSidebar hashtags={TRENDING_HASHTAGS} />
        </div>
      </aside>
    </div>
  );
}
