import React, { useState } from 'react';
import { Heart, MessageCircle, UserPlus, AtSign, Bell } from 'lucide-react';
import { MOCK_NOTIFICATIONS, Notification } from '@/data/mockData';
import { AvatarPlaceholder } from '@/components/AvatarPlaceholder';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const typeConfig = {
  like: { icon: Heart, color: 'text-rose-500', bg: 'bg-rose-100 dark:bg-rose-900/30', label: 'Like' },
  comment: { icon: MessageCircle, color: 'text-sky-500', bg: 'bg-sky-100 dark:bg-sky-900/30', label: 'Comment' },
  follow: { icon: UserPlus, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30', label: 'Follow' },
  mention: { icon: AtSign, color: 'text-violet-500', bg: 'bg-violet-100 dark:bg-violet-900/30', label: 'Mention' },
};

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const filtered = filter === 'unread' ? notifications.filter(n => !n.read) : notifications;
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-2xl mx-auto pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-card rounded-2xl shadow-card p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold text-foreground">Notifications</h1>
            {unreadCount > 0 && (
              <Badge className="gradient-coral text-white border-0 text-xs px-2 py-0.5 rounded-full">
                {unreadCount} new
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-xs text-primary font-medium hover:underline"
            >
              Mark all read
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {(['all', 'unread'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-4 py-1.5 rounded-full text-xs font-semibold transition-all',
                filter === f
                  ? 'gradient-coral text-white shadow-coral'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              )}
            >
              {f === 'all' ? 'All' : `Unread (${unreadCount})`}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Bell className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
            <p className="text-muted-foreground text-sm">No notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map(notification => {
              const config = typeConfig[notification.type];
              const Icon = config.icon;
              return (
                <div
                  key={notification.id}
                  onClick={() => markRead(notification.id)}
                  className={cn(
                    'flex items-start gap-3 p-4 cursor-pointer transition-colors hover:bg-secondary/50',
                    !notification.read && 'bg-accent/30'
                  )}
                >
                  {/* Avatar with type icon */}
                  <div className="relative flex-shrink-0">
                    <AvatarPlaceholder
                      initials={notification.actor.initials}
                      colorClass={notification.actor.avatarColor}
                      size="md"
                    />
                    <div className={cn(
                      'absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center',
                      config.bg
                    )}>
                      <Icon className={cn('w-2.5 h-2.5', config.color)} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      <span className="font-semibold">{notification.actor.displayName}</span>
                      {' '}
                      <span className="text-muted-foreground">{notification.message}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{notification.timestamp}</p>
                  </div>

                  {/* Unread dot */}
                  {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
