# Vingo — Food Delivery Website

> Full-stack food delivery web app (owner, user, delivery flow) — backend (Node.js/Express) + frontend (React + Vite).

## Table of Contents
- Project Overview
- Features
- Tech Stack
- Repo Structure
- Prerequisites
- Setup
  - Backend
  - Frontend
- Environment Variables
- Running Locally
- Useful Scripts
- API Routes (high-level)
- Real-time / Sockets
- Contributing
- License

## Project Overview

Vingo is a full-stack food delivery platform that includes owner/shop management, item listings, user ordering, and delivery assignment/tracking. The repository separates backend and frontend for clarity and independent development.

## Features
- Owners: create/edit shops and menu items.
- Users: browse shops by city, add to cart, checkout, view orders.
- Orders: owner and delivery assignment flows, order status updates.
- Delivery: delivery assignment model + basic tracking.
- Real-time updates (socket support) for order status.

## Tech Stack
- Backend: Node.js, Express
- Frontend: React, Vite
- Database: MongoDB (assumed from project structure)
- File uploads: Cloudinary (utility present)
- Realtime: Socket.io (socket.js present)

## Repo Structure

- `backend/` — Express API, controllers, models, middlewares, utils
  - `index.js` — app entry
  - `socket.js` — socket server
  - `controllers/` — route handlers
  - `models/` — Mongoose models (users, shops, items, orders, deliveryAssignment)
  - `routes/` — route definitions (auth, item, order, shop, user)

- `frontend/` — React app built with Vite
  - `src/` — components, pages, hooks, redux slices
  - `firebase.js` — firebase config (for client use)

## Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (Atlas or local)
- Cloudinary account (for image uploads) — optional but recommended

## Setup

Backend

1. Open a terminal in `backend/`.
2. Install dependencies:

```bash
cd backend
npm install
```

3. Create a `.env` file (see Environment Variables below) and populate values.

Frontend

1. Open a terminal in `frontend/`.
2. Install dependencies:

```bash
cd frontend
npm install
```

2. Update any frontend environment values if needed (e.g., API base URL, Firebase config).

## Environment Variables

Create a `.env` in `backend/` with at least these variables (names are suggestions based on code usage):

- `MONGO_URI` : MongoDB connection string
- `PORT` : Backend port (e.g. 5000)
- `JWT_SECRET` : Secret key for JWT tokens
- `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` : Cloudinary credentials
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS` : For outgoing email (mail utility)
- `FRONTEND_URL` : Frontend base URL (for links in emails)

Frontend may include a `firebase.js` file; if using Firebase, populate the config there or via environment vars depending on how it's set up.

## Running Locally

Start backend (example):

```bash
cd backend
npm run dev
```

Start frontend (example):

```bash
cd frontend
npm run dev
```

Open the frontend URL shown by Vite (usually `http://localhost:5173`) and ensure the backend URL in the client matches `backend` server port.

## Useful Scripts

Look in `backend/package.json` and `frontend/package.json` for exact scripts. Typical commands:

- `npm run dev` — start dev server
- `npm start` — start production server (if configured)
- `npm test` — run tests (if present)

## API Routes (high-level)

Routes are organized under `backend/routes/`:
- `auth.routes.js` — authentication endpoints (sign in / sign up / password reset)
- `item.routes.js` — item CRUD and listing
- `order.routes.js` — order creation, status updates
- `shop.routes.js` — shop creation and management
- `user.routes.js` — user profile and related endpoints

Refer to those files for exact route names and payload shapes.

## Real-time / Sockets

The backend includes `socket.js` for real-time features (order status updates, tracking). Ensure the frontend connects to the socket server when using live features.

## Contributing

1. Fork the repository and create a feature branch.
2. Open a PR describing your changes.
3. Keep changes focused and add documentation for major additions.

## License

This repository does not include a license file. Add a `LICENSE` if you want to make the project open-source.

---

If you'd like, I can:
- add example `.env.example` files for backend/frontend,
- add more detailed API documentation, or
- create a CONTRIBUTING.md and LICENSE file.

Enjoy developing with Vingo! 🎉
