# Design: FSD layers — entities, features, widgets, views (+ Next.js boundaries)

**Date:** 2026-04-13  
**Status:** Approved for reference and optional follow-up implementation planning  
**References:** [Feature-Sliced Design](https://feature-sliced.design/)

## Purpose

Document how this project applies **Feature-Sliced Design (FSD)** so that **entities**, **features**, **widgets**, and **views** have clear roles. **Widgets** belong to the **widgets** slice at the project root, **not** under `shared`. **Views** compose **widgets** (and selectively **features** / **entities**) into **screen-level UI** (e.g. login, home) while respecting **Next.js App Router** server and client boundaries.

## Layer definitions

### shared

- **Role:** Truly cross-cutting, **non-business** building blocks: primitives, utilities, API clients, config, theme tokens, generic UI kit without screen context.
- **Does not:** Own product use cases, route-specific composition, or domain models that belong to a single entity.

### entities

- **Role:** Business **nouns** (user, order, product): stable types, selectors, small presentational pieces tied to that entity (e.g. user card, avatar).
- **Does not:** Encode full user flows or page-level layout; avoid importing upward into features/widgets in ways that create cycles (follow FSD import rules: lower layers do not depend on higher layers).

### features

- **Role:** Business **verbs** / user actions: login, add-to-cart, toggle-favorite — state, side effects (sagas, mutations), and UI that implements **one** meaningful interaction, often with `"use client"` when using hooks or Redux.
- **Does not:** Assemble entire pages; may be reused inside widgets or views.

### widgets

- **Role:** **Large, contextual UI blocks** that combine **entities** and **features** (e.g. app header with auth actions, dashboard shell). This is the standard FSD **widgets** layer.
- **Placement:** **`widgets/`** at repository root (same level as `features/`, `entities/`), **not** `shared/widgets`.
- **Does not:** Replace `views`; widgets are reusable blocks, not full route screens.

### views

- **Role:** **Screen- or flow-level composition** for a concrete experience (e.g. `LoginView`, `HomeView`): arranges **widgets**, wires layout for that screen, and defines **where** server vs client components split for Next.js.
- **Does not:** Replace `app/` routing; **does not** duplicate routing — Next `app/*/page.tsx` stays thin and imports the appropriate view.

### app (Next.js)

- **Role:** **Routes**, `layout.tsx`, `loading.tsx`, `error.tsx`, metadata, route groups — minimal glue that renders a **view** (or passes server-fetched props into it).

## Import direction (target architecture)

Allowed dependency flow (high level):

`app` → `views` → `widgets` / `features` → `entities` → `shared`

Avoid importing “up” the stack (e.g. `entities` importing from `features`) and avoid `shared` depending on domain layers.

## Next.js: Server vs client

- Prefer **Server Components** in `app/` and in **view** files when the subtree is static (layout, headings, non-interactive structure).
- Put **`"use client"`** only where needed: interactive **features**, **widgets** that use hooks/store, or small client leaves — not necessarily on the whole **view**.
- **Redux / `useStore` / browser-only APIs** must sit under a **client** boundary (typically feature components, client widgets, or providers in `app/layout`).
- Anti-pattern: marking the entire **view** as client because one button needs interactivity — split that into a client **feature** or **widget** child instead.

## Non-goals (this document)

- Mandatory large-scale file moves in the same change as the doc (refactor can be a separate implementation plan).
- Replacing FSD terminology with Next-only naming (`page` as the only composition unit); **views** remain the explicit composition layer for UI.

## Relation to current repo

- Today some UI lives under `shared/widgets`; the **target** is **`widgets/`** at the root per FSD. Migration can be incremental and tracked in a separate plan.
