# FlowTransit

FlowTransit is a smart transportation platform for commuters in Lagos, Nigeria, covering both **road** and **water** transport. It's a university software engineering capstone project focused on clean UI/UX, component architecture, and frontend engineering practice.

Built as a fully working frontend prototype against a realistic **mock backend** (no server required) — every feature is demoable end to end.

## Features

**Commuter app**
- Plan journeys across road (BRT/bus) and ferry routes
- Browse every route with fares, frequency and operators
- Interactive Lagos map (Leaflet + OpenStreetMap) with live incidents
- Report and track road/water incidents, with map pin-drop
- In-app notifications
- Save favourite locations
- Trip history
- Profile & settings management

**Admin dashboard**
- Analytics overview (user growth, incident trends, route usage)
- User management (search, view, deactivate/reactivate)
- Incident management (filter, update status)
- Route management (create, edit, delete)

## Tech stack

React · TypeScript · Vite · Tailwind CSS · React Router · Axios (+ axios-mock-adapter) · React Hook Form + Zod · Framer Motion · Leaflet / react-leaflet · Recharts · Lucide Icons

## Getting started

```bash
npm install
npm run dev
```

The app runs entirely against an in-browser mock backend (in-memory + `localStorage`), so no environment variables or external services are required.

### Demo accounts

| Role | Email | Password |
|---|---|---|
| Admin | `admin@flowtransit.ng` | `password123` |
| Commuter | `user@flowtransit.ng` | `password123` |

Registering a new account is also supported and always creates a commuter (non-admin) user.

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint

## Project structure

```
src/
  components/   # ui/ layout/ form/ map/ charts/ feedback primitives
  features/     # feature-specific composites (auth, trip-planner, incidents, admin, ...)
  pages/        # route-level page components (public, app, admin)
  layouts/      # AuthLayout, AppShellLayout, AdminLayout
  context/      # Auth, Notification and Toast providers
  services/     # Axios-based service layer talking to the mock backend
  mock/         # in-memory "database", seed data and Lagos geo data
  types/        # shared TypeScript types
```

## Data & architecture notes

- The service layer (`src/services`) makes real Axios requests; `axios-mock-adapter` intercepts them and resolves against an in-memory store (`src/mock/db.ts`) that persists to `localStorage`. Swapping in a real backend later only requires pointing `apiClient` at a live API and removing the mock adapter.
- Map data (stops, routes, landmarks) is hand-authored using real Lagos coordinates for a realistic demo, since no live Lagos transit data source exists.
