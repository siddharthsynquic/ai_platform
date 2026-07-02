# AI Platform Frontend

React 19 + Vite + TypeScript. Talks to `backend/` FastAPI service.

## Stack

- **React 19** + **Vite 6** + TypeScript 5.7 (strict)
- **TanStack Query v5** — server state
- **Redux Toolkit** — client state (auth, UI, theme, active project)
- **React Router v7** — routing + guards
- **Axios** — HTTP client with interceptors
- **React Hook Form** + **Zod** — forms + validation
- **Tailwind CSS 3** + `class-variance-authority` — styling (shadcn/ui pattern)
- **Radix UI** primitives — accessible components (Dialog, Toast, etc)
- **Sonner** — toast notifications
- **Lucide** — icons
- **@t3-oss/env-core** — type-safe env
- **Vitest** + Testing Library — tests

## Setup

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Dev: http://localhost:5173
Backend must be running on http://localhost:8000 (proxied via Vite).

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server (Vite) |
| `npm run build` | Typecheck + prod build |
| `npm run preview` | Preview prod build |
| `npm run typecheck` | TypeScript only |
| `npm run lint` | ESLint |
| `npm run test` | Vitest |
| `npm run format` | Prettier write |

## Folder layout

```
frontend/
├── src/
│   ├── main.tsx                          # entry
│   ├── App.tsx                           # <AppProviders> + <AppRouter>
│   ├── router.tsx                        # route table + guards
│   ├── env.ts                            # t3-env schema
│   ├── app/
│   │   ├── providers/                    # Redux → Query → Theme → Toaster
│   │   │   ├── index.tsx
│   │   │   ├── query-provider.tsx
│   │   │   ├── redux-provider.tsx
│   │   │   └── theme-provider.tsx
│   │   └── store/                        # Redux Toolkit
│   │       ├── index.ts                  # configureStore
│   │       ├── hooks.ts                  # typed useAppDispatch/Selector
│   │       └── slices/
│   │           ├── auth-slice.ts
│   │           └── ui-slice.ts
│   ├── features/                         # Domain features (self-contained)
│   │   ├── pdf/                          # ✅ implemented
│   │   │   ├── api/
│   │   │   │   ├── pdf-api.ts            # axios calls
│   │   │   │   └── pdf-queries.ts        # useQuery / useMutation hooks
│   │   │   ├── components/
│   │   │   │   ├── pdf-uploader.tsx
│   │   │   │   └── pdf-detail.tsx
│   │   │   ├── types.ts                  # mirrors backend schemas
│   │   │   └── schemas.ts                # Zod client-side validation
│   │   ├── validation/                   # 🔜 System 01 UI
│   │   ├── site/                         # 🔜 System 02 UI
│   │   │   ├── observations/
│   │   │   ├── reports/
│   │   │   └── chatbot/
│   │   └── auth/                         # 🔜 login + guards
│   ├── shared/
│   │   ├── api/
│   │   │   ├── client.ts                 # Axios instance + interceptors + unwrap()
│   │   │   ├── auth-refresh.ts           # ✅ queued 401 refresh flow
│   │   │   └── types.ts                  # ApiResponse envelope (mirrors backend)
│   │   ├── ws/
│   │   │   ├── client.ts                 # ✅ WebSocket + reconnect + pub/sub
│   │   │   └── use-ws-channel.ts         # ✅ React hook subscribe
│   │   ├── components/
│   │   │   ├── error-boundary.tsx        # ✅ crash catch (root + per-route)
│   │   │   ├── loading-fallback.tsx      # ✅ Suspense fallback
│   │   │   ├── pdf-viewer.tsx            # ✅ react-pdf + pin overlay hooks
│   │   │   ├── ui/                       # Button, Input, Card, Badge, Skeleton,
│   │   │   │                             # Label, Textarea, Checkbox, Select,
│   │   │   │                             # Dialog, ConfirmDialog, FormField,
│   │   │   │                             # DataTable, EmptyState
│   │   │   └── layout/                   # AppShell, Navbar, Sidebar
│   │   ├── hooks/                        # useDebounce, useLocalStorage, useMediaQuery
│   │   ├── lib/
│   │   │   ├── cn.ts                     # clsx + tailwind-merge
│   │   │   ├── format.ts                 # bytes / date / truncate
│   │   │   └── query-keys.ts             # centralized TanStack Query keys
│   │   └── config/
│   ├── pages/                            # Route views
│   │   ├── home.tsx
│   │   ├── pdf-library.tsx
│   │   ├── pdf-detail-page.tsx
│   │   ├── site/
│   │   ├── auth/
│   │   └── not-found.tsx
│   ├── styles/
│   │   └── globals.css                   # Tailwind + design tokens
│   └── test/                             # Vitest setup + helpers
├── index.html
├── vite.config.ts                        # aliases + /api proxy
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json                         # references app + node
├── tsconfig.app.json                     # strict + @/* alias
├── tsconfig.node.json
├── .env.example
└── package.json
```

Legend: ✅ working today · 🔜 scaffolded (stubs + TODO)

## Layer rules

```
pages → features → shared
        features/*/api  →  shared/api/client
        features/*/api  →  TanStack Query (via features/*/api/*-queries.ts)
        app/store       →  Redux Toolkit (client state only, not server data)
        app/providers   →  glue everything at root
```

**Do:**
- Server state → TanStack Query (never Redux)
- Client state → Redux slices (auth, theme, UI, active project)
- Every API call → returns unwrapped `data` (envelope stripped by `unwrap()`)
- Every query key → from `queryKeys` factory (never literal strings)
- Every form → React Hook Form + Zod
- Every component style → `cn()` for merging classes
- Colors → CSS variables (`hsl(var(--primary))`), never hardcoded

**Don't:**
- No `any` types
- No inline object/array props (breaks memo — use `useMemo`)
- No layout animation (only `transform` / `opacity`)
- No business logic in `pages/` — belongs in `features/*/`
- No direct axios calls in components — go through feature api

## API integration

Backend envelope stripped automatically. Feature functions return unwrapped data:

```ts
// features/pdf/api/pdf-api.ts
export const pdfApi = {
  upload: (file: File) => apiClient.post("/pdf/upload", ...).then(unwrap),
};

// features/pdf/api/pdf-queries.ts
export function useUploadPdf() {
  return useMutation({ mutationFn: pdfApi.upload });
}

// components
const upload = useUploadPdf();
upload.mutate(file);
```

Errors → `ApiClientError` with `.code`, `.status`, `.message`, `.requestId`.

## Auth flow (when backend endpoints land)

1. `POST /auth/login` → `setCredentials({ user, accessToken })` slice action
2. Axios interceptor attaches `Authorization: Bearer <token>`
3. On 401 → clear token (refresh flow TODO)
4. `ProtectedRoute` guard reads `state.auth.isAuthenticated`

## Test example

```ts
import { renderWithProviders, screen } from "@/test/test-utils";
import { PdfUploader } from "@/features/pdf/components/pdf-uploader";

test("shows drop zone", () => {
  renderWithProviders(<PdfUploader />);
  expect(screen.getByText(/drop a pdf/i)).toBeInTheDocument();
});
```

## Next up

- Login + refresh token flow (once `/auth` exists)
- PDF list view (once list endpoint added)
- Validation dashboard (System 01)
- Site observations map + list (System 02)
- Chatbot conversation UI
