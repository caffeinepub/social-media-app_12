import React, { useState, useRef } from 'react';
import { Image, X, Smile } from 'lucide-react';
import { Post, CURRENT_USER } from '@/data/mockData';
import { AvatarPlaceholder } from './AvatarPlaceholder';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface PostComposerProps {
  onPost: (post: Post) => void;
}

const GRADIENT_OPTIONS = [
  { label: 'Sunset', class: 'gradient-card-1' },
  { label: 'Ocean', class: 'gradient-card-2' },
  { label: 'Forest', class: 'gradient-card-3' },
  { label: 'Dusk', class: 'gradient-card-4' },
  { label: 'Gold', class: 'gradient-card-5' },
];

export function PostComposer({ onPost }: PostComposerProps) {
  const [text, setText] = useState('');
  const [selectedGradient, setSelectedGradient] = useState<string | null>(null);
  const [showGradients, setShowGradients] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      userId: CURRENT_USER.id,
      user: CURRENT_USER,
      text: text.trim(),
      imageGradient: selectedGradient || undefined,
      imageAlt: selectedGradient ? 'Your image' : undefined,
      likes: 0,
      comments: [],
      shares: 0,
      timestamp: 'Just now',
    };

    onPost(newPost);
    setText('');
    setSelectedGradient(null);
    setShowGradients(false);
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    // Auto-resize
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="bg-card rounded-2xl shadow-card p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <AvatarPlaceholder
            initials={CURRENT_USER.initials}
            colorClass={CURRENT_USER.avatarColor}
            size="md"
          />
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleTextareaInput}
              placeholder="What's on your mind?"
              rows={2}
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none leading-relaxed"
            />

            {/* Gradient Preview */}
            {selectedGradient && (
              <div className={cn('relative rounded-xl h-32 mb-3 flex items-center justify-center', selectedGradient)}>
                <button
                  type="button"
                  onClick={() => setSelectedGradient(null)}
                  className="absolute top-2 right-2 w-6 h-6 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <p className="text-white/60 text-sm">Image preview</p>
              </div>
            )}

            {/* Gradient Picker */}
            {showGradients && !selectedGradient && (
              <div className="flex gap-2 mb-3 fade-in">
                {GRADIENT_OPTIONS.map(g => (
                  <button
                    key={g.class}
                    type="button"
                    onClick={() => { setSelectedGradient(g.class); setShowGradients(false); }}
                    className={cn('w-8 h-8 rounded-lg transition-transform hover:scale-110', g.class)}
                    title={g.label}
                  />
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-border mt-2">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setShowGradients(!showGradients)}
                  className={cn(
                    'p-2 rounded-lg transition-colors',
                    showGradients ? 'text-primary bg-accent' : 'text-muted-foreground hover:text-primary hover:bg-accent'
                  )}
                  title="Add image"
                >
                  <Image className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                  title="Add emoji"
                >
                  <Smile className="w-4 h-4" />
                </button>
              </div>
              <Button
                type="submit"
                disabled={!text.trim()}
                size="sm"
                className="gradient-coral text-white border-0 rounded-xl px-5 font-semibold shadow-coral hover:opacity-90 transition-opacity disabled:opacity-40"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
