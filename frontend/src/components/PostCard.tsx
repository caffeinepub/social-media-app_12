import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Send, CheckCircle } from 'lucide-react';
import { Post, Comment, CURRENT_USER, formatCount } from '@/data/mockData';
import { AvatarPlaceholder } from './AvatarPlaceholder';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>(post.comments);
  const [newComment, setNewComment] = useState('');
  const [likeAnimating, setLikeAnimating] = useState(false);

  const handleLike = () => {
    setLikeAnimating(true);
    setTimeout(() => setLikeAnimating(false), 300);
    if (liked) {
      setLiked(false);
      setLikeCount(prev => prev - 1);
    } else {
      setLiked(true);
      setLikeCount(prev => prev + 1);
    }
  };

  const handleShare = () => {
    toast.success('Link copied to clipboard!', {
      description: 'Share this post with your friends',
      duration: 2000,
    });
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: `new-${Date.now()}`,
      userId: CURRENT_USER.id,
      postId: post.id,
      text: newComment.trim(),
      timestamp: 'Just now',
      user: CURRENT_USER,
    };
    setComments(prev => [...prev, comment]);
    setNewComment('');
  };

  return (
    <article className="bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <Link to="/profile/$userId" params={{ userId: post.userId }}>
            <AvatarPlaceholder
              initials={post.user.initials}
              colorClass={post.user.avatarColor}
              size="md"
              className="hover:ring-2 hover:ring-primary/50 transition-all"
            />
          </Link>
          <div>
            <div className="flex items-center gap-1">
              <Link
                to="/profile/$userId"
                params={{ userId: post.userId }}
                className="font-semibold text-sm text-foreground hover:text-primary transition-colors"
              >
                {post.user.displayName}
              </Link>
              {post.user.verified && (
                <CheckCircle className="w-3.5 h-3.5 text-primary fill-primary/20" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">{post.user.handle} · {post.timestamp}</p>
          </div>
        </div>
        <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Post Text */}
      <div className="px-4 pb-3">
        <p className="text-sm text-foreground leading-relaxed">
          {post.text.split(' ').map((word, i) =>
            word.startsWith('#') ? (
              <span key={i} className="text-primary font-medium cursor-pointer hover:underline">{word} </span>
            ) : (
              <span key={i}>{word} </span>
            )
          )}
        </p>
      </div>

      {/* Post Image */}
      {post.imageGradient && (
        <div className={cn('mx-4 mb-3 rounded-xl h-56 flex items-center justify-center', post.imageGradient)}>
          <p className="text-white/60 text-sm font-medium">{post.imageAlt}</p>
        </div>
      )}

      {/* Action Bar */}
      <div className="px-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {/* Like */}
            <button
              onClick={handleLike}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl transition-all duration-200 group',
                liked
                  ? 'text-primary bg-accent'
                  : 'text-muted-foreground hover:text-primary hover:bg-accent'
              )}
            >
              <Heart
                className={cn(
                  'w-4 h-4 transition-all duration-200',
                  liked ? 'fill-primary text-primary' : 'group-hover:scale-110',
                  likeAnimating && 'like-animation'
                )}
              />
              <span className="text-xs font-medium">{formatCount(likeCount)}</span>
            </button>

            {/* Comment */}
            <button
              onClick={() => setShowComments(!showComments)}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl transition-all duration-200 group',
                showComments
                  ? 'text-primary bg-accent'
                  : 'text-muted-foreground hover:text-primary hover:bg-accent'
              )}
            >
              <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium">{formatCount(comments.length)}</span>
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-muted-foreground hover:text-primary hover:bg-accent transition-all duration-200 group"
            >
              <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium">{formatCount(post.shares)}</span>
            </button>
          </div>

          {/* Save */}
          <button
            onClick={() => setSaved(!saved)}
            className={cn(
              'p-1.5 rounded-xl transition-all duration-200',
              saved ? 'text-primary' : 'text-muted-foreground hover:text-primary hover:bg-accent'
            )}
          >
            <Bookmark className={cn('w-4 h-4', saved && 'fill-primary')} />
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-border px-4 py-3 fade-in">
          {/* Existing Comments */}
          {comments.length > 0 && (
            <div className="space-y-3 mb-3 max-h-48 overflow-y-auto">
              {comments.map(comment => (
                <div key={comment.id} className="flex gap-2.5">
                  <AvatarPlaceholder
                    initials={comment.user.initials}
                    colorClass={comment.user.avatarColor}
                    size="xs"
                    className="mt-0.5 flex-shrink-0"
                  />
                  <div className="flex-1 bg-secondary rounded-xl px-3 py-2">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-xs font-semibold text-foreground">{comment.user.displayName}</span>
                      <span className="text-[10px] text-muted-foreground">{comment.timestamp}</span>
                    </div>
                    <p className="text-xs text-foreground">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Comment */}
          <form onSubmit={handleComment} className="flex gap-2 items-center">
            <AvatarPlaceholder
              initials={CURRENT_USER.initials}
              colorClass={CURRENT_USER.avatarColor}
              size="xs"
            />
            <div className="flex-1 flex items-center gap-2 bg-secondary rounded-full px-3 py-1.5">
              <input
                type="text"
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="text-primary disabled:text-muted-foreground transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </article>
  );
}
