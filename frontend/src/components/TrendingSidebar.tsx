import React from 'react';
import { TrendingUp, Hash } from 'lucide-react';
import { TrendingHashtag, MOCK_USERS, formatCount } from '@/data/mockData';
import { AvatarPlaceholder } from './AvatarPlaceholder';
import { Badge } from '@/components/ui/badge';

interface TrendingSidebarProps {
  hashtags: TrendingHashtag[];
  compact?: boolean;
}

export function TrendingSidebar({ hashtags, compact = false }: TrendingSidebarProps) {
  const suggestedUsers = MOCK_USERS.slice(1, 4);

  return (
    <div className="space-y-4">
      {/* Trending Hashtags */}
      <div className="bg-card rounded-2xl shadow-card p-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-sm text-foreground">Trending</h3>
        </div>
        <div className="space-y-1">
          {hashtags.slice(0, compact ? 5 : 10).map((tag, idx) => (
            <button
              key={tag.id}
              className="w-full flex items-center justify-between px-2 py-2 rounded-xl hover:bg-secondary transition-colors group text-left"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xs text-muted-foreground w-4 text-right">{idx + 1}</span>
                <div>
                  <div className="flex items-center gap-1">
                    <Hash className="w-3 h-3 text-primary" />
                    <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {tag.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{formatCount(tag.postCount)} posts</p>
                </div>
              </div>
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5 rounded-lg">
                {tag.category}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {/* Suggested Users */}
      {!compact && (
        <div className="bg-card rounded-2xl shadow-card p-4">
          <h3 className="font-semibold text-sm text-foreground mb-4">Suggested for you</h3>
          <div className="space-y-3">
            {suggestedUsers.map(user => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <AvatarPlaceholder
                    initials={user.initials}
                    colorClass={user.avatarColor}
                    size="sm"
                  />
                  <div>
                    <p className="text-xs font-semibold text-foreground">{user.displayName}</p>
                    <p className="text-[11px] text-muted-foreground">{formatCount(user.followers)} followers</p>
                  </div>
                </div>
                <button className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors px-3 py-1 rounded-full border border-primary/30 hover:bg-accent">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
