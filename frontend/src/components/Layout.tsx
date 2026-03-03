import React from 'react';
import { Outlet } from '@tanstack/react-router';
import { Navigation } from './Navigation';
import { Toaster } from '@/components/ui/sonner';

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Main Content */}
      <main className="md:ml-64 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>

      <Toaster position="top-center" richColors />
    </div>
  );
}
