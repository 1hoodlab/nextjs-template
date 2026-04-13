# FSD widgets + views migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the repository with `docs/superpowers/specs/2026-04-13-fsd-layers-views-design.md` by moving UI from `shared/widgets/` to root-level `widgets/`, introducing `views/` for screen-level composition, and making `app/page.tsx` a thin route that renders `HomeView`.

**Architecture:** Move existing widget files with `git mv` (no behavior change). Extract the current home UI from `app/page.tsx` into `views/home/home-view.tsx` (client component). Route file imports the view only. Update `docs/hierarchy-folder.docs` so the tree matches reality and documents `views/`.

**Tech Stack:** Next.js App Router, React 19, TypeScript, path alias `@/*` → project root, Redux (used inside `HomeView`).

---

## File map

| Path | Responsibility |
|------|----------------|
| `widgets/**` | FSD **widgets** layer (moved from `shared/widgets/`): layouts, composite UI |
| `views/home/home-view.tsx` | **Home** screen composition; `"use client"` because it uses Redux dispatch |
| `app/page.tsx` | Default route; server component that renders `<HomeView />` |
| `docs/hierarchy-folder.docs` | Reflect `widgets/`, `views/`, and remove `shared/widgets` if present |

---

### Task 1: Move `shared/widgets` → `widgets`

**Files:**
- Move: `shared/widgets/**` → `widgets/**`
- Delete: empty `shared/widgets` directories after move

- [ ] **Step 1: Move the tree**

Run from repository root (PowerShell):

```powershell
git mv shared/widgets widgets
```

If `git mv` fails because `widgets` exists, create `widgets` first or move in two steps (e.g. `git mv shared/widgets/ui widgets/ui` then layouts).

Expected: `git status` shows renames under `widgets/`.

- [ ] **Step 2: Verify no imports**

Search for old paths:

```powershell
rg "shared/widgets" -g "*.{ts,tsx,js,jsx,mjs}"
```

Expected: No matches in source (only possibly in docs; Task 3 updates docs).

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "refactor(fsd): move widgets from shared/ to widgets/"
```

---

### Task 2: Add `views/home/home-view.tsx` and thin `app/page.tsx`

**Files:**
- Create: `views/home/home-view.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `views/home/home-view.tsx`**

Create the file with this exact content (screen composition + client boundary for Redux):

```tsx
"use client";

import { loginRequest } from "@/features/auth/model/slice";
import { useAppDispatch } from "@/shared/hooks/use-store";
import Image from "next/image";

export function HomeView() {
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    console.log("Logging in...");
    dispatch(loginRequest({ email: "user@example.com", password: "password" }));
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-(family-name:--font-geist-sans)">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-(family-name:--font-geist-mono)">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/5 dark:bg-white/6 px-1 py-0.5 rounded-sm font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            type="button"
            onClick={handleLogin}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </button>
          <a
            className="rounded-full border border-solid border-black/8 dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
```

Note: `type="button"` added on the `<button>` to satisfy `react/button-has-type` if enabled; `rel` removed from `button` (invalid on button).

- [ ] **Step 2: Replace `app/page.tsx`**

Replace the entire file `app/page.tsx` with:

```tsx
import { HomeView } from "@/views/home/home-view";

export default function Home() {
  return <HomeView />;
}
```

- [ ] **Step 3: Run build and lint**

```bash
npm run build
npm run lint
```

Expected: Exit code 0 for both.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx views/home/home-view.tsx
git commit -m "feat(fsd): add HomeView and thin app home route"
```

---

### Task 3: Update `docs/hierarchy-folder.docs`

**Files:**
- Modify: `docs/hierarchy-folder.docs`

- [ ] **Step 1: Document `views/` and correct `widgets/` location**

Ensure the tree:

- Lists `views/` at the project root (e.g. `views/home/` for home screen).
- Lists `widgets/` at the project root (not under `shared/`).
- Does **not** list `shared/widgets`.

Add a short comment line under `views/` such as: `# Screen-level composition (FSD views layer)`.

- [ ] **Step 2: Commit**

```bash
git add docs/hierarchy-folder.docs
git commit -m "docs: align folders tree with FSD widgets and views"
```

---

## Spec coverage

| Spec requirement | Task |
|------------------|------|
| Widgets not under `shared` | Task 1 |
| `views` composes screen UI | Task 2 |
| `app` thin, imports view | Task 2 |
| Next: server route + client view child | Task 2 (`page.tsx` server, `HomeView` client) |
| Docs alignment | Task 3 |

---

## Self-review

- No TBD placeholders; all paths and commands are concrete.
- `HomeView` duplicates prior `page.tsx` behavior; `button` attributes adjusted for validity and ESLint.

---

## Execution handoff

**Plan saved to `docs/superpowers/plans/2026-04-13-fsd-widgets-views-migration.md`.**

**1. Subagent-driven (recommended)** — One task per subagent; review between tasks. **Sub-skill:** `superpowers:subagent-driven-development`.

**2. Inline execution** — Run tasks in this session with checkpoints. **Sub-skill:** `superpowers:executing-plans`.

**Which approach do you want?**
