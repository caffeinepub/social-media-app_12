import React from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { Home, Search, PlusSquare, Bell, User, Sun, Moon, Zap, LogIn, LogOut } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { MOCK_NOTIFICATIONS } from '@/data/mockData';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/search', icon: Search, label: 'Search' },
  { to: '/create', icon: PlusSquare, label: 'Create' },
  { to: '/notifications', icon: Bell, label: 'Notifications' },
  { to: '/profile/u1', icon: User, label: 'Profile' },
];

function truncatePrincipal(principal: string): string {
  if (principal.length <= 11) return principal;
  return `${principal.slice(0, 5)}...${principal.slice(-3)}`;
}

export function Navigation() {
  const { toggleTheme, isDark } = useTheme();
  const location = useLocation();
  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length;
  const { login, clear, loginStatus, identity } = useInternetIdentity();

  const isAuthenticated = loginStatus === 'success' && !!identity;
  const isLoggingIn = loginStatus === 'logging-in';
  const principalText = isAuthenticated
    ? truncatePrincipal(identity!.getPrincipal().toString())
    : null;

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-64 flex-col bg-card border-r border-border z-40 px-4 py-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 mb-8 px-2">
          <div className="w-9 h-9 gradient-coral rounded-xl flex items-center justify-center shadow-coral">
            <Zap className="w-5 h-5 text-white" fill="white" />
          </div>
          <span className="text-xl font-bold text-foreground tracking-tight">Pulse</span>
        </Link>

        {/* Nav Items */}
        <div className="flex flex-col gap-1 flex-1">
          {navItems.map(({ to, icon: Icon, label }) => {
            const active = isActive(to);
            const displayLabel =
              label === 'Profile' && isAuthenticated && principalText
                ? principalText
                : label;
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative',
                  active
                    ? 'bg-accent text-primary font-semibold'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
              >
                <div className="relative">
                  <Icon className={cn('w-5 h-5 transition-transform group-hover:scale-110', active && 'text-primary')} />
                  {label === 'Notifications' && unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-[10px] text-primary-foreground flex items-center justify-center font-bold">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium truncate">{displayLabel}</span>
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-200 mt-2"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          <span className="text-sm font-medium">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

        {/* Login / Logout */}
        {isAuthenticated ? (
          <div className="mt-2 flex flex-col gap-1">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-accent/50">
              <div className="w-6 h-6 rounded-full gradient-coral flex items-center justify-center flex-shrink-0">
                <User className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-xs font-mono text-foreground truncate">{principalText}</span>
            </div>
            <button
              onClick={clear}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Log Out</span>
            </button>
          </div>
        ) : (
          <button
            onClick={login}
            disabled={isLoggingIn}
            className="mt-2 flex items-center gap-3 px-3 py-2.5 rounded-xl gradient-coral text-white font-semibold shadow-coral hover:opacity-90 transition-all duration-200 disabled:opacity-60"
          >
            {isLoggingIn ? (
              <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <LogIn className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">{isLoggingIn ? 'Logging in…' : 'Log In'}</span>
          </button>
        )}
      </nav>

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40 px-2 pb-safe">
        <div className="flex items-center justify-around py-2">
          {navItems.map(({ to, icon: Icon, label }) => {
            const active = isActive(to);
            const displayLabel =
              label === 'Profile' && isAuthenticated && principalText
                ? 'You'
                : label;
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 relative',
                  active ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <div className="relative">
                  <Icon className={cn('w-5 h-5', active && 'fill-primary/20')} />
                  {label === 'Notifications' && unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-primary rounded-full text-[9px] text-primary-foreground flex items-center justify-center font-bold">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <span className={cn('text-[10px] font-medium', active ? 'text-primary' : 'text-muted-foreground')}>
                  {displayLabel}
                </span>
              </Link>
            );
          })}

          {/* Mobile Login/Logout */}
          {isAuthenticated ? (
            <button
              onClick={clear}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-muted-foreground hover:text-foreground transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-[10px] font-medium">Log Out</span>
            </button>
          ) : (
            <button
              onClick={login}
              disabled={isLoggingIn}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-primary transition-all duration-200 disabled:opacity-60"
            >
              {isLoggingIn ? (
                <span className="w-5 h-5 border-2 border-primary/40 border-t-primary rounded-full animate-spin" />
              ) : (
                <LogIn className="w-5 h-5" />
              )}
              <span className="text-[10px] font-medium">{isLoggingIn ? '…' : 'Log In'}</span>
            </button>
          )}

          <button
            onClick={toggleTheme}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-muted-foreground transition-all duration-200"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span className="text-[10px] font-medium">Theme</span>
          </button>
        </div>
      </nav>
    </>
  );
}
