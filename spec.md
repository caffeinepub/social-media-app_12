# Specification

## Summary
**Goal:** Add Internet Identity login and logout functionality to the Pulse navigation UI.

**Planned changes:**
- Add a "Log In" button to the desktop sidebar and mobile bottom tab bar using the `useInternetIdentity` hook's `login` function when the user is unauthenticated.
- After successful login, replace the "Log In" button with a truncated principal display and a "Log Out" button that calls the `logout` function.
- Update the Profile navigation entry and Profile page header to show the authenticated user's truncated principal when logged in, falling back to mock data when unauthenticated.
- Style all new login/logout UI elements to match the existing coral/rose theme with dark/light mode support.

**User-visible outcome:** Users can log in via Internet Identity from both desktop and mobile navigation. Once authenticated, they see their principal in the nav and profile header, and can log out to return to the unauthenticated state.
