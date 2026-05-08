This is a [Next.js](https://nextjs.org) project bootstrapped with
[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app),
organized with a [Feature-Sliced Design](https://feature-sliced.design)
folder structure (`app/`, `views/`, `widgets/`, `features/`, `entities/`,
`shared/`).

## Getting Started

```bash
pnpm install
pnpm dev
# or
npm install && npm run dev
# or
yarn && yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see
the result. Edit `views/home/home-view.tsx`; the page auto-updates.

## State management

This template **does not include** a global state-management library.
Add the one that fits your project, for example:

- [Zustand](https://github.com/pmndrs/zustand) — small, hook-based store
- [Redux Toolkit](https://redux-toolkit.js.org/) (optionally with
  [redux-saga](https://redux-saga.js.org/) or RTK Query) — opinionated,
  ecosystem-rich
- [Jotai](https://jotai.org/) — atomic state
- [TanStack Query](https://tanstack.com/query) — server state / caching
- [XState](https://stately.ai/docs/xstate) — state machines

Recommended placement:

- Library setup → `shared/lib/<library>/`
- React provider (if any) → `shared/providers/`, then mount in `app/layout.tsx`
- Per-feature state (slices, atoms, machines, queries) →
  `features/<feature>/model/`

## Production build

`next.config.ts` enables [`output: "standalone"`](https://nextjs.org/docs/app/api-reference/config/next-config-js/output)
and a multi-stage `Dockerfile` is provided. Build & run:

```bash
docker build -t nextjs-template .
docker run -p 3000:3000 nextjs-template
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## Deploy on Vercel

The easiest way to deploy is the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).
See the [deployment docs](https://nextjs.org/docs/app/building-your-application/deploying)
for other options.
