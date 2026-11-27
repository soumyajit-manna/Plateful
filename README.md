# Plateful — Full-Stack Food Delivery Platform

Plateful is a JavaScript monorepo containing a customer food-ordering website, an admin dashboard, and an Express API backed by MongoDB.

> **Project guide:** [Open the illustrated Plateful Project Guide (PDF)](./Plateful%20Project%20Guide.pdf). Its first page is a clickable contents index and it includes architecture, workflows, stack, setup, and a source-file catalog.

## Live customer app

[https://plateful-food.vercel.app/](https://plateful-food.vercel.app/)

The customer and admin apps call the API at `https://plateful-ymms.onrender.com`, the current Render service hostname.

## What is in this repository?

There are **three application parts**:

| Part | Folder | Purpose |
| --- | --- | --- |
| Customer web app | `frontend/` | Browse menu categories, manage a cart, sign in, check out, and view order status |
| Admin dashboard | `admin/` | Add/remove food items, browse the menu records, and update order statuses |
| API and persistence | `backend/` | Express endpoints, MongoDB models, authentication, payment-session creation, email requests, and uploaded images |

Both web apps use React, Vite, React Router, Axios, and CSS. The backend uses Node.js, Express, Mongoose/MongoDB, JWT, bcrypt, Stripe, Multer, and EmailJS's HTTP API.

## Customer capabilities

- Browse food from MongoDB and filter it by category.
- Add and remove items from a persistent, account-specific cart.
- Register and sign in using a password hash and a JWT token.
- Enter delivery details and begin a Stripe Checkout session.
- View previous orders and manually refresh delivery-status information.
- Receive welcome, order-confirmation, and status-update emails through EmailJS when configured.

## Admin capabilities

- Add food records with a name, description, price, category, and uploaded image.
- List and remove food records.
- List orders and change their status to processing, out for delivery, or delivered.

**Important:** the current admin UI/API does not implement admin login or role-based authorization. Do not expose its management endpoints to an untrusted public audience without adding server-side access control.

## Technology and languages

- **Language:** JavaScript (ES modules), JSX for React, and CSS.
- **Customer/admin UI:** React 18, Vite 5, React Router 6, Axios, React Toastify.
- **Server:** Node.js, Express 4, Mongoose 8.
- **Database:** MongoDB.
- **Authentication:** JWT and bcrypt; `validator` is used during registration.
- **Payments:** Stripe Checkout.
- **Uploads:** Multer disk storage; images are served from `/images`.
- **Email:** EmailJS REST API (not Nodemailer).
- **Hosting configuration:** Vercel rewrite config for the customer SPA and a Render Blueprint for static frontend/admin sites. The API is configured as a separate Render service.

## Repository map

```text
.
├── admin/       React/Vite admin dashboard
├── backend/     Express API, MongoDB models, uploads, and email helper
├── frontend/    React/Vite customer application and food imagery
├── render.yaml  Render Blueprint for the two static web apps
├── README.md    Project overview and runbook
└── Plateful Project Guide.pdf
```

Each app has its own `package.json` and lockfile. Install dependencies from the app's own directory; there is no root application package manifest.

## Run locally

Use Node.js 18 or newer. In three separate terminals:

```powershell
# Terminal 1 — API
cd backend
npm install
npm run server

# Terminal 2 — customer app
cd frontend
npm install
npm run dev

# Terminal 3 — admin dashboard
cd admin
npm install
npm run dev
```

The backend listens on `PORT` or port `4000`. The frontend/admin currently point to the deployed Render API hostname; change their API base URL for a local backend when needed.

### Backend environment

Create `backend/.env` locally (never commit it) or configure the same values in the backend hosting service:

| Variable | Purpose |
| --- | --- |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign and verify login tokens |
| `STRIPE_SECRET_KEY` | Stripe server-side API key |
| `EMAILJS_SERVICE_ID` | EmailJS service identifier |
| `EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `EMAILJS_PRIVATE_KEY` | EmailJS private/access key |
| `EMAILJS_WELCOME_TEMPLATE_ID` | Welcome-email template |
| `EMAILJS_ORDER_TEMPLATE_ID` | Order and status email template |
| `FRONTEND_URL` | Optional customer-app URL for Stripe success/cancel redirects; defaults to the live Plateful site |
| `PORT` | Optional API port; defaults to `4000` |

The repository does not include a `.env` file. Keep all real credentials in local environment files or hosting-provider secret settings.

## API route overview

| Method and path | Role |
| --- | --- |
| `POST /api/user/register`, `/api/user/login` | Create an account or issue a login token |
| `GET /api/food/list` | Read menu items |
| `POST /api/food/add`, `/api/food/remove` | Create/remove menu items |
| `POST /api/cart/add`, `/remove`, `/get` | Read or change the signed-in user's cart |
| `POST /api/order/place` | Create an order and start Stripe Checkout |
| `POST /api/order/verify` | Process the payment-return result |
| `POST /api/order/userorders` | List the signed-in user's orders |
| `GET /api/order/list`, `POST /api/order/status` | Admin order listing/status update |

Cart and user-order routes use JWT middleware. The current food-management and admin-order routes do not.

## Current implementation notes

- The checkout return URL is configured with `FRONTEND_URL`; its default is the live Plateful Vercel site.
- `render.yaml` defines static-site services for `frontend/` and `admin/`; it does not define the backend service or its environment variables.
- The order-status screen fetches the latest status when opened/refreshed; there is no WebSocket/push tracking.
- Stripe Checkout is used, but the current verification endpoint is not a Stripe webhook and does not independently retrieve/validate a Checkout Session. The order record is created before checkout completes. Review this flow before relying on it for production payment reconciliation.
- The admin screens have no login/role protection in this codebase. Add server-side authorization before public use.
- The API hostname and Render Blueprint service identifiers preserve the old Tomato-era slug. The visible product name is **Plateful**; service hostnames and existing data/file names should only be renamed as a coordinated deployment/data migration.

## Build and lint

```powershell
cd frontend
npm run build
npm run lint

cd ..\admin
npm run build
npm run lint
```

The production build output is written to each app's `dist/` folder. Those generated files are build artifacts, not the editable source of truth.

## Deployment

- **Customer app:** Vercel, `frontend/`; `frontend/vercel.json` rewrites SPA paths to `index.html`.
- **Admin dashboard:** Render static site, `admin/`, as declared in `render.yaml`.
- **Backend:** separate Render Node web service running `backend/server.js`, with the environment variables above and a persistent MongoDB connection.
- **Uploaded images:** the backend currently writes images to `backend/uploads/`; confirm the hosting service's disk persistence strategy before relying on local uploads across redeploys.

The Render Blueprint uses legacy Tomato-named service identifiers. Keep those identifiers if they still refer to the live services; changing a service name can affect its URL and deployment configuration.
