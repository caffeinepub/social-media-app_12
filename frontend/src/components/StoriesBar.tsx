import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Story, CURRENT_USER } from '@/data/mockData';
import { AvatarPlaceholder } from './AvatarPlaceholder';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface StoriesBarProps {
  stories: Story[];
}

export function StoriesBar({ stories }: StoriesBarProps) {
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [seenStories, setSeenStories] = useState<Set<string>>(
    new Set(stories.filter(s => s.seen).map(s => s.id))
  );

  const handleStoryClick = (story: Story) => {
    setActiveStory(story);
    setSeenStories(prev => new Set([...prev, story.id]));
  };

  const gradients = [
    'gradient-card-1',
    'gradient-card-2',
    'gradient-card-3',
    'gradient-card-4',
    'gradient-card-5',
  ];

  return (
    <>
      <div className="bg-card rounded-2xl shadow-card p-4">
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-1">
          {/* Add Story */}
          <div className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer group">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center border-2 border-dashed border-border group-hover:border-primary transition-colors">
                <Plus className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
            <span className="text-[11px] text-muted-foreground font-medium w-14 text-center truncate">Your Story</span>
          </div>

          {/* Story Items */}
          {stories.map((story, idx) => {
            const seen = seenStories.has(story.id);
            return (
              <div
                key={story.id}
                className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer"
                onClick={() => handleStoryClick(story)}
              >
                <div className={cn(
                  'w-14 h-14 rounded-full p-0.5 transition-all duration-200 hover:scale-105',
                  seen
                    ? 'bg-border'
                    : 'story-ring'
                )}>
                  <div className="w-full h-full rounded-full bg-card p-0.5">
                    <AvatarPlaceholder
                      initials={story.user.initials}
                      colorClass={story.user.avatarColor}
                      size="lg"
                      className="w-full h-full"
                    />
                  </div>
                </div>
                <span className="text-[11px] text-foreground font-medium w-14 text-center truncate">
                  {story.user.displayName.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Story Viewer Dialog */}
      <Dialog open={!!activeStory} onOpenChange={() => setActiveStory(null)}>
        <DialogContent className="max-w-sm p-0 overflow-hidden rounded-3xl">
          <div className={cn('w-full h-96 flex flex-col items-center justify-center relative', activeStory ? gradients[stories.findIndex(s => s.id === activeStory.id) % gradients.length] : '')}>
            {/* Progress bar */}
            <div className="absolute top-3 left-3 right-3 h-1 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full w-full animate-[progress_3s_linear_forwards]" />
            </div>
            {/* User info */}
            <div className="absolute top-6 left-4 flex items-center gap-2">
              {activeStory && (
                <>
                  <AvatarPlaceholder
                    initials={activeStory.user.initials}
                    colorClass={activeStory.user.avatarColor}
                    size="sm"
                  />
                  <div>
                    <p className="text-white text-sm font-semibold">{activeStory.user.displayName}</p>
                    <p className="text-white/70 text-xs">Just now</p>
                  </div>
                </>
              )}
            </div>
            {/* Story content */}
            <div className="text-center px-8">
              <p className="text-white text-lg font-semibold drop-shadow-lg">
                {activeStory?.user.displayName}'s Story
              </p>
              <p className="text-white/80 text-sm mt-2">
                {activeStory?.user.bio.slice(0, 80)}...
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
