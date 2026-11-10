<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## WordAlive project rules

These rules come from the project owner. Follow them for every change.

### Source of truth
- The UI must match the HTML mockup pixel for pixel (desktop 1280×800, tablet 820×1100). Do not "improve" spacing, sizes, or fonts on your own. If the owner asks for a deliberate deviation, make it and say so.
- The app must be a working multi-page website that looks like the mockup (UI only; no real backend or translation is required).

### Architecture: atomic design
- Structure: `components/ui` (shadcn core) → `components/atoms` → `components/molecules` → `components/organisms` → `components/templates` → pages in `app/(app)/*`.
- Providers live in `components/providers`, hooks in `hooks/`, mock data in `lib/data/`, shared types in `types/`.
- Pages stay thin: they render a template and set metadata. Put layout in templates, behaviour in organisms/hooks.
- Constants shared by server and client code must not live in a `"use client"` file (put them in `lib/`).

### Components and libraries
- Prefer shadcn components for core UI. Use the project's shadcn style (`base-maia`, `@base-ui/react`).
- If a new library is needed, tell the owner before or when adding it.
- Do not call `buttonVariants()` directly on a non-button element: class conflicts are not merged. Use `<Button render={<Link … />} nativeButton={false}>` instead.

### Colors and theming
- Configure colors in `app/globals.css` so they match the mockup. Use shadcn semantic tokens (`bg-background`, `bg-card`, `text-muted-foreground`, `border-input`, `bg-brand`, `bg-success`, …). Raw hex/arbitrary colors are allowed only for rarely used one-off colors.
- Dark mode must work everywhere. Never use manual `dark:` color overrides where a token does the job. Dark mode is toggled from the topbar avatar menu.

### RTL
- RTL must work everywhere. Direction is toggled from the topbar avatar menu and stored in the `wa-dir` cookie; `<html dir>` is set on the server.
- Use logical utilities (`ms-/me-/ps-/pe-/start-/end-/text-start/border-s/border-e`), never physical `left/right` ones. Wrap mixed English/number text in `<bdi>` so it does not scramble in RTL.

### Font
- The font must be the same as the mockup (Plus Jakarta Sans, weights 400/500/600/700). Scripture text uses the serif stack.

### Tailwind classes
- Use canonical Tailwind v4 classes so the editor shows no suggestions or warnings (for example `size-30`, not `size-[120px]`; `h-8.5`, not `h-[34px]`; `inset-e-0`, not `end-0`).
- Arbitrary values are fine only when no scale equivalent exists (for example `text-[13px]`).
- Before finishing, check that `npm run lint` and `npx tsc --noEmit` pass and `npm run build` succeeds.

### Git
- The main branch is `main`, not `master`.
- Commit or push only when the owner asks. End commit messages with `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`.
- Never commit `.agents/`, `.claude/`, or `skills-lock.json`.
