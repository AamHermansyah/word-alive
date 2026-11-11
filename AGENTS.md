<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## WordAlive project rules

These rules come from the project owner. Follow them for every change.

### Source of truth
- The UI must match the HTML mockup pixel for pixel (desktop 1280×800, tablet 820×1100) *when it shows the mockup's data*. Do not "improve" spacing, sizes, or fonts on your own. If the owner asks for a deliberate deviation, make it and say so. Layout stays dynamic (see "Responsive" and "Code quality"): never freeze a mockup measurement into a fixed box to get pixel parity.
- When the owner shows how they styled a component or page, treat it as the reference pattern and apply it consistently everywhere else.
- The app must be a working multi-page website that looks like the mockup (UI only; no real backend or translation is required).

### Architecture: atomic design
- Structure: `components/ui` (shadcn core) → `components/atoms` → `components/molecules` → `components/organisms` → `components/templates` → pages in `app/(app)/*`.
- Providers live in `components/providers`, hooks in `hooks/`, mock data in `lib/data/`, shared types in `types/`.
- Pages stay thin: they render a template and set metadata. Put layout in templates, behaviour in organisms/hooks.
- Constants shared by server and client code must not live in a `"use client"` file (put them in `lib/`).

### Navigation
- **Single source of truth:** every page is registered once in `NAV_ITEMS` (`lib/data/navigation.ts`) with a `group` (category), a `surface` (which frame it renders in), a `shortLabel` and an icon in `NAV_ICONS` (`components/atoms/icons.tsx`, typed `Record<NavKey, …>` so a page cannot ship without one). The floating page switcher lists **every** page; the sidebar and phone tab bar show only the `primary` ones of the `app` surface, the admin sidebar shows the `adminNav` ones, and the shells read per-page extras (`parent`, `plan`, `trialHref`, `headerNote`) through `getPage()` / `getActiveKey()`. A new page added there appears everywhere. Never hard-code a page list in a component.
- **Surfaces = route groups, each with its own layout and `template.tsx`:** `(app)` customer app (sidebar / tab bar), `(auth)` sign-in, set-up, trial, payment and device flow (header only), `(audience)` the projector screen (no chrome), `(admin)` admin console (navy sidebar, drawer below `xl`), `(site)` public website (header + footer; `app/not-found.tsx` uses the same frame). Pages stay thin and render a template.
- **Page transitions:** every group's `template.tsx` wraps the page in `PageTransition` (React `<ViewTransition>`; keyframes in `globals.css`, off under `prefers-reduced-motion`). Content that appears after an interaction uses `FadeIn` (`components/atoms/fade-in.tsx`). Do not add per-page transition code.
- **Floating page switcher** (`components/organisms/page-switcher.tsx`, rendered once in the root layout through `AppProviders`, so it is on every surface):
  - One round brand-coloured button fixed at the bottom end of the screen (logical `inset-e-*`, so it moves to the left in RTL) on every page. It opens a dropdown (`side="top"`, `align="end"`, `w-64`) listing all pages grouped by category, each with its icon, label and path; the current page is marked with a check.
  - On phones it sits above the bottom tab bar (`bottom-[calc(5rem+env(safe-area-inset-bottom))]`) on `app` pages, never on top of it, and at `bottom-[calc(1rem+…)]` on surfaces without a tab bar; from `md` it is `bottom-6`. Every shell keeps extra bottom padding (`pb-[calc(9rem+…)]` on phones for the app, about `pb-24` elsewhere, `md:pb-20`) so the last block can always scroll clear of the tab bar and this button; never reduce it. It must stay above page content (`z-50`), keep a 48px touch target, work in light/dark and RTL, and never be removed or hidden unless the owner asks.
  - It is for quick page switching and flow checking; keep it independent from the sidebar and tab bar (it must still work if they change).
- **The top bar is NOT sticky.** `Topbar` scrolls away with the page. Do not add `sticky`/`fixed` to it unless the owner explicitly asks again.
- Width-based navigation (tab bar < `md`, 76px rail `md`–`xl`, 232px sidebar `xl`+) is described under "Responsive".

### Responsive (all devices)
- Mobile-first: unprefixed classes are phones (< 640px); `sm:` 640, `md:` 768, `xl:` 1280. The mockups are the `md` (tablet, 820) and `xl` (desktop, 1280) designs and must look identical there *with the mockup's data*; with other data the layout adapts (see Dynamic by default); phones and in-between widths are designed to match their look and feel. The site must work from 320px up, with no horizontal page scroll, no clipped text and no clipped or overlapping elements at any width.
- Navigation by width: phones (< `md`) = fixed bottom tab bar (icon + one-word `shortLabel`, safe-area padding); `md` to `xl` = 76px icon rail; `xl`+ = 232px sidebar. Never show the full sidebar below `xl`, and never let it take more than 76px of width below `xl`. The main content clears the tab bar with bottom padding.
- Page padding is `p-4` on phones, `p-6` at `md`, `p-7` at `xl`; the gap between blocks is `gap-4` on phones, `gap-5` from `md`.
- Phone typography is smaller than the mockups (page title 20px, card titles 14-15px, body 13px, secondary 12px, big numbers 22-28px, scripture preview 15px). Keep 12px as the smallest size and restore the mockup size from `md:` up with a `md:` prefix, for example `text-xl md:text-[26px]`.
- **Dynamic by default.** UI is driven by its content, never by a fixed box. Data can be short, long, or empty, and nothing may break, clip or overlap when it is.
  - No fixed `h-*` / `w-*` on cards, panels, rows, lists or text containers, and no `aspect-*` on anything that holds text or data. Use `min-h-*`, `flex-1`, `grid`, `basis-*`/`flex-<n>` proportions and `gap-*` so blocks grow with their content and siblings in a row stretch to the tallest one.
  - A mockup size is a *minimum* or a *proportion*, not a hard value. Keep minimums small and constant (for example `min-h-40`); never derive a `min-h` from the width (`cqw`, `vw`, `aspect-*`), because it grows without limit on wide screens and stretches the sibling next to it even when the content is short. Example: the audience-screen slide is just `min-h-40` and grows with the verse; its text size is a `clamp()` of `cqw` and steps down for long text.
  - Fixed sizes are only for things that are fixed by nature: icons, avatars, logo tile, switch, progress track, decorative waveform bars, nav rail/sidebar width, form control height (`h-10`). Never use `overflow-hidden`/`overflow-y-auto` plus a fixed height to hide the mismatch.
  - Every flex/grid child that holds text needs `min-w-0`. Long unbroken strings must wrap: use `wrap-break-word`.
  - Text that matters (titles, names, authors, verses, plan features, labels) wraps. Do not use `truncate`/`line-clamp` on it. `truncate` is allowed only on purely decorative or redundant text.
  - Labels inside buttons, tabs and segmented controls may wrap (`whitespace-normal`, `shrink`) so a longer translation or value cannot push the control out of its card.
  - Test with short, long and empty data (a 300-character verse, a 60-character song title, zero suggestions) before finishing a UI change.
- Wide tables become stacked rows/cards on phones (do not scroll sideways inside a card). Rows of buttons become a grid on phones. Action rows in the top bar wrap onto their own line below the title; the avatar stays beside the title.
- Touch targets on phones are at least 40px tall (`Button` `sm` is `h-10` on phones, `h-8.5` from `md`).
- Check every UI change at 320, 390, 640, 820, 1024 and 1280 wide, in light and dark, LTR and RTL, before finishing.

### Code quality (professional frontend)
- Build for any data, not for the one case on screen. Never patch a single example (a hard-coded height, a clipped string, a magic number) so it "looks right"; fix the cause so short, long and empty data all work.
- No hacks: no stacking `overflow-hidden`, negative margins, fixed heights or `!important`-style overrides to cover a layout mistake. If a layout needs one, the structure is wrong, so restructure it.
- One source of truth per property on an element: do not put two utilities that fight (for example `h-9` and `h-10` without a breakpoint), and write responsive classes in order base → `sm:` → `md:` → `xl:`.
- Do not nest the same wrapper inside itself (for example `CardContent` inside `CardContent`), which doubles the padding. Use a plain `div`/`p`.
- Reuse existing atoms/molecules and shadcn components instead of copy-pasting markup; extend a component with a prop when a new variant is needed.
- A change is done only when `npm run lint`, `npx tsc --noEmit` and `npm run build` pass **and** it was looked at in the browser at the widths above with short and long data. Say plainly what was not checked.

### Components and libraries
- Prefer shadcn components for core UI. Use the project's shadcn style (`base-maia`, `@base-ui/react`).
- Shared building blocks to reuse instead of rewriting: `DataTable` (`components/organisms/data-table.tsx`) for every table or record list (shadcn Table from `md`, stacked cards on phones), `OtpField` (6-digit codes), `AdminPageHeader`, `FadeIn`, `PageTransition`. Toasts use `sonner` (`import { toast } from "sonner"`, `Toaster` is mounted in `AppProviders`).
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
