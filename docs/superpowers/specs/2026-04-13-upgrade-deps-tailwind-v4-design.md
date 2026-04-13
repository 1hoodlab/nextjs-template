# Design: Upgrade dependencies (major) and migrate to Tailwind CSS v4

**Date:** 2026-04-13  
**Status:** Approved for implementation planning  
**Stack context:** Next.js App Router, React 19, Redux Toolkit + saga, Tailwind v3 today (`tailwind.config.ts`, `app/globals.css`).

## Goals

- Upgrade project dependencies to **current major versions** where available, using strategy **B** (accept breaking changes and follow upstream migration notes).
- Standardize runtime on **Node.js 22 (LTS)** for local development and CI.
- Migrate styling toolchain from **Tailwind CSS v3** to **Tailwind CSS v4** using the official PostCSS integration and CSS-first configuration patterns.

## Non-goals

- Refactors of business logic, Redux architecture, or routes except where a dependency bump requires minimal mechanical changes.
- Visual redesign or new design tokens beyond preserving existing light/dark behavior and class-based layout.

## Constraints (decisions)

| Decision | Choice |
|----------|--------|
| Upgrade aggressiveness | **B** — major bumps across the stack where majors exist |
| Node.js | **22** (LTS) |

## Recommended approach: phased migration

1. **Phase A — Node 22:** Add `engines` in `package.json`, add `.nvmrc` with `22`, update CI workflow files if present so `setup-node` uses Node 22.
2. **Phase B — Application/tooling majors:** Bump Next.js, React, TypeScript, ESLint + `eslint-config-next`, Redux-related packages, `lucide-react`, and `@types/*` to compatible latest majors; refresh the lockfile; fix breaking changes from those libraries only.
3. **Phase C — Tailwind v4:** Add `tailwindcss` v4 and `@tailwindcss/postcss`; update `postcss.config.mjs`; replace v3 `@tailwind` directives in `app/globals.css` with `@import "tailwindcss"`; map existing `theme.extend.colors` and content discovery to v4 patterns (`@theme`, `@source`, or `@config` / residual `tailwind.config` only as needed); verify build and UI parity.

**Alternatives considered:** single large PR (harder to bisect); Tailwind before framework bump (possible extra churn if Next/PostCSS expectations change).

## Architecture and file-level changes

### Node

- **`package.json`:** `"engines": { "node": ">=22 <23" }` (adjust upper bound if the team prefers a wider range).
- **`.nvmrc`:** `22`.

### Dependencies

- Update all direct dependencies and devDependencies to latest **compatible** major versions in one coherent set; regenerate the lockfile.
- Resolve peer dependency warnings by aligning versions (document any pinned exceptions with a one-line reason).

### Tailwind v4

- **`devDependencies`:** `tailwindcss@^4`, `@tailwindcss/postcss` (exact versions pinned at implementation time per lockfile).
- **`postcss.config.mjs`:** Use the `@tailwindcss/postcss` plugin per Tailwind v4 documentation (replacing the v3 `tailwindcss: {}` PostCSS entry).
- **`app/globals.css`:** Use `@import "tailwindcss"`; preserve `:root` and `prefers-color-scheme` rules for `--background` and `--foreground` unless migrated to `@theme` with verified parity.
- **Configuration:** Prefer CSS-first configuration (`@theme`, `@source` as required). Retain or slim `tailwind.config.ts` only if v4 still needs it for content paths or options not expressed in CSS.

### Data flow

- No intentional change to Redux or server/client data flow; changes are build-time and styling-related.

## Error handling and verification

- **Automated:** `npm run build` and `npm run lint` must pass after the migration (run after each phase or at minimum at the end of Phase C).
- **Manual:** Smoke-test the main page; confirm layout and typography; confirm light/dark appearance still follows `prefers-color-scheme` and existing CSS variables.

## Risks and rollback

| Risk | Mitigation |
|------|------------|
| Peer dependency gridlock | Choose one verified version matrix; adjust in a single commit if needed |
| ESLint / Next breaking rules | Follow migration guides; fix config and code in the same PR |
| Tailwind v4 class or plugin gaps | Prefer visual parity; replace deprecated v3-only patterns per v4 docs |
| **Rollback** | Revert the migration commit(s); keep a backup branch for large PRs |

## Open items for implementation (not ambiguous requirements)

- Exact version numbers are chosen at implementation time from the registry and peer constraints.
- CI files are updated only if they exist in the repository at implementation time.
