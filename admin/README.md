# Plateful Admin Dashboard

This React/Vite single-page app is the operator interface for maintaining menu records and updating order statuses.

## Local development

```powershell
npm install
npm run dev
```

The app calls the backend configured in `src/App.jsx` and `src/assets/assets.js`.

## Source map

- `src/main.jsx` mounts React and the client-side router.
- `src/App.jsx` defines the dashboard shell and the Add, List, and Orders routes.
- `src/components/` contains the dashboard navigation and sidebar.
- `src/pages/Add/` submits a food record and image.
- `src/pages/List/` lists and removes food records.
- `src/pages/Orders/` lists orders and submits status changes.
- `src/assets/` holds logos and interface images.

**Access-control note:** this repository does not add admin authentication or role checks to the management API routes. Do not treat the dashboard as protected merely because it is a separate app.

For the complete architecture, API map, environment setup, and repository-wide file catalog, see the root [Plateful Project Guide](../Plateful%20Project%20Guide.pdf) and [repository README](../README.md).

## Commands

- `npm run build` — create the production bundle in `dist/`.
- `npm run lint` — run ESLint.
- `npm run preview` — preview the production build locally.
