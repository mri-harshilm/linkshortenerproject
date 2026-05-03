# Authentication — Clerk

All authentication in this project is handled exclusively by **Clerk**. No other auth method, library, or custom implementation should ever be used.

## Non-Negotiable Rules

1. **Clerk only.** Never use NextAuth, custom JWT, session cookies, or any other auth mechanism.
2. **`/dashboard` is a protected route.** It must require the user to be authenticated. Unauthenticated users must be redirected to sign-in.
3. **Redirect logged-in users away from `/`.** If an authenticated user visits the homepage, redirect them to `/dashboard`.
4. **Sign in and sign up always open as a modal.** Never navigate to a dedicated `/sign-in` or `/sign-up` page. Use Clerk's modal mode exclusively.

## Implementation Guidelines

- Use Clerk's `<SignInButton mode="modal">` and `<SignUpButton mode="modal">` for all auth triggers.
- Use `auth()` (server) or `useAuth()` (client) from `@clerk/nextjs` to read auth state — never roll your own.

- For the homepage redirect, check `auth()` in the page Server Component and call `redirect('/dashboard')` if the user is signed in.
- Never store or replicate Clerk user data in the database beyond what is strictly necessary (e.g. a `userId` foreign key).
