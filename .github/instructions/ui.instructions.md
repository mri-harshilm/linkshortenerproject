---
description: Read this before creating or modifying any UI components in the project.
---

# UI Components — shadcn/ui

All UI elements in this project are built exclusively with **shadcn/ui** components.

## Non-Negotiable Rules

1. **shadcn/ui only.** Never create custom UI components from scratch. Always use an existing shadcn/ui component.
2. **Never hand-edit `components/ui/`** — those files are managed by the shadcn CLI. Add new components via `npx shadcn@latest add <component>`.
3. **No custom component files** for things shadcn/ui already covers (buttons, inputs, dialogs, cards, badges, etc.).
4. **Use `cn()` for all class composition** when extending shadcn components with additional Tailwind classes.

## Implementation Guidelines

- Before building any UI, check if a suitable shadcn/ui component exists at [ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components).
- Add missing components with the CLI: `npx shadcn@latest add <component-name>`.
- Compose complex UI from multiple shadcn primitives rather than writing custom markup.
- Pass `className` props with `cn()` to layer additional Tailwind utilities on top of shadcn defaults.
