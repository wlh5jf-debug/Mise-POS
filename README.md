# Mise POS

A full-stack point-of-sale system for restaurants, built with React and Express.

## Overview

Mise POS lets servers manage tables and take orders from a menu, while managers get a dedicated admin panel to configure the restaurant. Staff authenticate with a numeric PIN.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router 7, Vite |
| Backend | Node.js (>=22), Express 5 |
| Database | PostgreSQL |
| Auth | JWT + bcrypt PIN hashing |

## Project Structure

```
Mise-POS/
├── backend/
│   ├── db/
│   │   ├── api/          # Express route handlers
│   │   ├── queries/      # SQL query functions
│   │   ├── schema.sql    # Database schema
│   │   └── seed.js       # Seed data
│   ├── middleware/       # Auth, role guards, body validation
│   ├── app.js            # Express app
│   └── server.js         # Entry point
└── frontend/Mise-POS/
    └── src/
        ├── api/          # Fetch wrappers for each resource
        ├── components/
        │   ├── auth/     # Login form, PIN pad
        │   ├── layout/   # Header, Sidebar, ProtectedRoute
        │   ├── pos/      # Order panel, menu grid, payment modal
        │   └── ui/       # Shared Button, Card, Input components
        ├── context/      # AuthContext, OrderContext
        ├── hooks/        # useMenu, useOrder, usePayment, useTables
        └── pages/        # Login, POS, Admin, EditMenuItem
```

## Getting Started

### Prerequisites

- Node.js >= 22
- PostgreSQL

### Database Setup

Create a PostgreSQL database named `misepos`, then run:

```bash
cd backend
npm run db:reset
```

This applies the schema and seeds demo data (users, tables, menu items, and sample orders).

### Backend

```bash
cd backend
cp .env.example .env   # fill in DATABASE_URL and JWT_SECRET
npm install
npm run dev
```

The API server starts on `http://localhost:3000` by default.

### Frontend

```bash
cd frontend/Mise-POS
npm install
npm run dev
```

The app starts on `http://localhost:5173` by default.

## Features

### Staff (Server role)
- PIN-based login
- View restaurant tables and open orders
- Browse menu by category, add/remove items from an order
- Process payments (cash or card)

### Manager (Admin role)
- All server capabilities
- **Menu Items** — create, edit, delete, toggle availability
- **Categories** — create and delete menu categories
- **Tables** — add and remove restaurant tables
- **Staff** — create new users with role and PIN, deactivate existing users

## API Routes

| Method | Path | Description |
|---|---|---|
| POST | `/api/users/login` | Authenticate and receive a JWT |
| GET | `/api/users` | List active users |
| GET/POST | `/api/menu-items` | List or create menu items |
| PATCH | `/api/menu-items/:id` | Update a menu item |
| DELETE | `/api/menu-items/:id` | Delete a menu item |
| GET/POST | `/api/categories` | List or create categories |
| DELETE | `/api/categories/:id` | Delete a category |
| GET/POST | `/api/tables` | List or create tables |
| DELETE | `/api/tables/:id` | Delete a table |
| GET/POST | `/api/orders` | List or create orders |
| POST | `/api/order-items` | Add an item to an order |
| DELETE | `/api/order-items/:id` | Remove an item from an order |
| POST | `/api/payments` | Record a payment for an order |

Admin-only routes require a JWT belonging to a user with the Admin role.

## Seed Data

The seed script creates the following demo accounts:

| Name | Role | PIN |
|---|---|---|
| Beth | Admin | 1234 |
| Tim | Server | 5678 |
| Nancy | Server | 9101 |

It also creates 5 tables, 4 menu categories, 7 menu items, and 2 sample orders with payments.

Thank you for taking the time to look at this project.
