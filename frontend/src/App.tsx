import React from 'react';
import {
  createRouter,
  createRoute,
  createRootRoute,
  RouterProvider,
} from '@tanstack/react-router';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Layout } from '@/components/Layout';
import { Home } from '@/pages/Home';
import { Profile } from '@/pages/Profile';
import { Notifications } from '@/pages/Notifications';
import { Search } from '@/pages/Search';
import { CreatePost } from '@/pages/CreatePost';

// Root route with layout
const rootRoute = createRootRoute({
  component: Layout,
});

// Child routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/search',
  component: Search,
});

const createRoute_ = createRoute({
  getParentRoute: () => rootRoute,
  path: '/create',
  component: CreatePost,
});

const notificationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/notifications',
  component: Notifications,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile/$userId',
  component: Profile,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  searchRoute,
  createRoute_,
  notificationsRoute,
  profileRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
