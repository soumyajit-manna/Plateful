# Plateful Customer Web App

This React/Vite single-page app is the customer-facing Plateful experience. It provides the menu, category filters, cart, sign-in/sign-up popup, checkout form, Stripe return page, and order history.

## Local development

```powershell
npm install
npm run dev
```

The app's API base URL is defined in `src/context/StoreContext.jsx`. It currently points to the deployed backend. Configure it for a local API when developing against a local server.

## Source map

- `src/main.jsx` mounts the app, router, and shared store.
- `src/App.jsx` defines routes and the global navigation/footer/loading UI.
- `src/context/StoreContext.jsx` holds API access, menu/cart state, and login-token state.
- `src/pages/` contains the home, cart, checkout, payment verification, and order-history screens.
- `src/components/` contains reusable interface pieces; each feature folder pairs JSX with CSS.
- `src/assets/` contains imported food/product images and the menu/category data.

For the full architecture, backend/API, data model, deployment notes, and complete file catalog, see the root [Plateful Project Guide](../Plateful%20Project%20Guide.pdf) and [repository README](../README.md).

## Commands

- `npm run build` — create the production bundle in `dist/`.
- `npm run lint` — run ESLint.
- `npm run preview` — preview the production build locally.
