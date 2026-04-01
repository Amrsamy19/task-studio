# Task Studio

A lightweight internal task + client request tracker. Built for the Eng Techno Full-Stack Challenge.

---

## Setup

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
# Clone the repo
git clone <your-repo-url>
cd task-studio

# Install all workspace dependencies
npm install
```

### Database (API)

```bash
# Run migrations
npm run db:migrate

# Seed with sample data (10 tasks, 3 users, comments)
npm run db:seed
```

### Run

```bash
# Start both services concurrently (API on :3001, web on :3000)
npm run dev
```

Or separately:

```bash
# Terminal 1 — API
cd apps/api && npm run dev

# Terminal 2 — Web
cd apps/web && npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Architecture Decisions

- **Monorepo with npm workspaces** — single `npm install` at root installs both apps. `concurrently` runs both dev servers with one command. No Turborepo complexity for a two-app project of this size.

- **SQLite for persistence** — zero infrastructure to spin up locally, fully portable, Prisma migrations work identically to Postgres. Production migration path is a single `datasource` change.

- **Server Components by default, Client Components only at the boundary** — pages (`/tasks`, `/tasks/[id]`) are Server Components that fetch data directly. Only interactive pieces — filters (URL param sync), modals, comment form — are `"use client"`. This keeps the JS bundle small and avoids waterfalls.

- **URL search params as filter state** — all filter, sort, and pagination state lives in the URL. No client-side state store needed. Shareable links, browser back/forward, and SSR all work for free.

- **Server Actions for mutations** — `createTaskAction`, `updateTaskAction`, `archiveTaskAction`, `addCommentAction` run on the server, call the Express API, then `revalidatePath()` to invalidate the Next.js cache. The form `action` prop accepts these directly — no `fetch` boilerplate in components.

- **Layered backend** — routes → controllers → services → Prisma. Controllers are thin (parse req, call service, send res). All business logic and DB queries live in `taskService.ts`. Nothing bleeds across layers.

- **Zod on both sides** — API validates with Zod (server-side, returns 422 with structured field errors). Frontend validates the same schemas in Server Actions before hitting the API. Single source of truth for field rules.

- **Revalidation strategy** — task lists revalidate every 30 seconds (`next: { revalidate: 30 }`). Users list revalidates every 5 minutes (changes rarely). Mutations call `revalidatePath` immediately. For an internal tool with low traffic this is the right tradeoff — simpler than on-demand revalidation tags, fresher than no caching at all.

---

## Tradeoffs & What I'd Improve

**Given more time:**

- **Optimistic UI on comments** — currently the page revalidates after the Server Action resolves, so there's a brief delay. With `useOptimistic` I'd append the comment instantly and roll back on error.

- **Real-time activity feed** — the activity timeline is static (requires page refresh). Server-Sent Events or a polling hook on the detail page would make it feel live.

- **Authentication** — the assessment intentionally omits auth, but the structure is ready for it. The sidebar's user footer is hardcoded to "Sarah Chen." A real implementation would read from a JWT/session and thread `userId` through the Server Actions to associate comments with the current user.

- **Drag-and-drop status columns** — the Board view tab is a placeholder. `@dnd-kit` with `reorderTasks` would wire directly into `updateTask PATCH /tasks/:id`.

- **Postgres in production** — SQLite is fine locally. The only change required is swapping the `datasource` provider and `DATABASE_URL` in `schema.prisma`.

- **E2E tests** — one Playwright flow covering "create task → view in list → add comment → archive" would give high confidence in the critical path.

**Deliberate constraints I kept:**

- No Zustand or external state library — React state + URL params covered everything.
- No UI component library — all components are hand-rolled to match the Figma spec exactly.
- No auth complexity — kept the focus on the core product experience.

---

## Design Gap Decisions

The Figma left several states undefined. Here's how I filled them:

| Gap | Decision | Reasoning |
|-----|----------|-----------|
| **Blocked status treatment** | Red dot + red pill badge, same shape as other statuses | Consistent with the status system; the red color conveys urgency without needing a special layout |
| **Empty state** | Centered illustration with contextual message (different copy for "no results" vs "no tasks yet") | Standard pattern; copy changes based on whether filters are active |
| **Task creation success** | Modal closes, list revalidates and shows new task | Redirect felt disruptive; staying on the list lets the user immediately see their new task in context |
| **Overdue due dates** | Red text color matching the blocked/danger palette | Consistent with the semantic color system; immediately scannable |
| **Unassigned tasks** | Dashed circle with `+` icon | Communicates "slot available" without being noisy |
| **System events in activity** | Italicised muted text, clock icon instead of avatar | Visually separates user comments from automated events |

---

## Project Structure

```
task-studio/
├── apps/
│   ├── api/                     # Express + Prisma backend
│   │   ├── prisma/
│   │   │   ├── schema.prisma    # Data model
│   │   │   └── seed.ts          # Sample data
│   │   └── src/
│   │       ├── controllers/     # Thin req/res handlers
│   │       ├── services/        # Business logic + DB queries
│   │       ├── routes/          # Express routers
│   │       ├── middleware/      # Error handler
│   │       ├── lib/             # Prisma client, Zod schemas
│   │       └── index.ts         # App entry point
│   └── web/                     # Next.js 14 App Router frontend
│       ├── app/
│       │   ├── layout.tsx       # Root layout (sidebar + topbar)
│       │   ├── tasks/
│       │   │   ├── page.tsx     # Task list (Server Component)
│       │   │   ├── loading.tsx  # Skeleton
│       │   │   ├── error.tsx    # Error boundary
│       │   │   └── [id]/
│       │   │       ├── page.tsx      # Task detail (Server Component)
│       │   │       ├── loading.tsx
│       │   │       ├── error.tsx
│       │   │       └── edit/page.tsx
│       ├── components/
│       │   ├── layout/          # Sidebar, Topbar
│       │   ├── tasks/           # TasksTable, TaskDetail, TaskModal, CommentForm…
│       │   └── ui/              # Avatar, Badge, Skeleton, EmptyState, Button
│       └── lib/
│           ├── api.ts           # Typed fetch wrapper
│           ├── actions.ts       # Server Actions (mutations)
│           └── utils.ts         # Date formatting helpers
└── package.json                 # Workspaces root
```
