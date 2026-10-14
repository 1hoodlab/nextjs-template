Next.js 16 starter with [Feature-Sliced Design](https://feature-sliced.design)
(`app/`, `views/`, `widgets/`, `features/`, `entities/`, `shared/`).

## Requirements

- Node.js 22+ (see `.nvmrc`)
- [pnpm](https://pnpm.io/) (lockfile: `pnpm-lock.yaml`)

## Getting started

```bash
cp .env.example .env.local   # optional
pnpm install
pnpm dev
```

Edit `views/home/home-view.tsx` — [http://localhost:3000](http://localhost:3000).

## Scripts

| Command             | Description                        |
| ------------------- | ---------------------------------- |
| `pnpm dev`          | Dev server (Turbopack)             |
| `pnpm build`        | Production build                   |
| `pnpm start`        | Run production server              |
| `pnpm lint`         | ESLint (includes FSD import rules) |
| `pnpm format`       | Prettier write                     |
| `pnpm format:check` | Prettier check (CI)                |

Pre-commit: Husky runs `lint-staged` (ESLint + Prettier on staged files).

## FSD & ESLint

Layer boundaries are enforced with [eslint-plugin-import-fsd](https://www.npmjs.com/package/eslint-plugin-import-fsd).
See `docs/hierarchy-folder.docs` for the folder map and import rules.

## State management

No global state library is included. Add Zustand, Redux Toolkit, TanStack Query, etc.:

- Setup → `shared/lib/<library>/`
- Provider → `shared/providers/` + `app/layout.tsx`
- Feature state → `features/<name>/model/`

## Environment

- `APP_ENV` — deploy label (development, staging, production); not the same as `NODE_ENV`.
- `NEXT_PUBLIC_*` — inlined at **build** time; set in Docker build args when needed.

Copy `.env.example` to `.env.local` for local development.

## Docker

`next.config.ts` uses [`output: "standalone"`](https://nextjs.org/docs/app/api-reference/config/next-config-js/output).

```bash
docker build -t nextjs-template .
docker run -p 3000:3000 nextjs-template
```

## CI

GitHub Actions (`.github/workflows/ci.yml`): `lint`, `format:check`, `build`.
