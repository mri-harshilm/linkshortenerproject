---
description: Read this before implementing or modifying any data mutation flows, server actions, or write operations.
---

# Data Mutations — Server Actions

All data mutations in this app must be implemented through Server Actions.

## Non-Negotiable Rules

1. **Server Actions only for mutations.** Never perform create/update/delete operations directly in client components, route handlers, or elsewhere.
2. **Client components must call actions.** Mutation-triggering UI should invoke Server Actions from client components.
3. **Action file naming and location are required.** Server Action files must be named `actions.ts` and colocated with the component directory that calls them.
4. **No `FormData` typing.** All inputs passed to actions must use explicit TypeScript types (interfaces/types/schemas), never the `FormData` TypeScript type.
5. **Validate all action input with Zod.** Every Server Action must parse/validate incoming data with Zod before any business logic or writes.
6. **Require authentication before DB work.** Every Server Action must verify a logged-in user before continuing with database operations.
7. **Use data-layer helpers only.** Database writes must go through helper functions in `/data`. Server Actions must not contain direct Drizzle queries.
8. **Do not throw from Server Actions.** Server Actions must never throw errors. They must return a structured object with either an `error` property or a `success` property.

## Implementation Guidelines

- Keep Server Actions focused on orchestration: auth check, input validation, and calling `/data` helpers.
- Keep SQL/Drizzle logic inside `/data` helper functions so actions stay thin and reusable.
- Return typed, predictable results from actions using a consistent `{ success }` or `{ error }` shape so client-side handling is straightforward.
