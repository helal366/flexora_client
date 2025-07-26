# Project Name: flexora
A Local Food Waste Reduction Platform

# Project Live Link: https://flexora-188f4.web.app/

# Profect Purpose:

## 📌 Project Overview:
**Flexora** is a community-driven food donation platform designed to connect **restaurants**, **charities**, and **users** in the effort to reduce local food waste. Restaurants can donate surplus food, charities can request and pick up donations, and users can browse and favorite food items. Admins manage the ecosystem with full control over users, donations, and requests.

## 🚀 Key Features

- 🔐 **Firebase Auth** (Email/Password & Google Login)
- 👤 **Role-based Access Control** (User / Charity / Restaurant / Admin)
- 🍱 **Donation Posting** (by Restaurants)
- 🙋 **Requesting Donations** (by Charities)
- 💖 **Save to Favorites** (by Users and Charities)
- 💳 **Stripe Payments** for Charity Role Requests
- 🧾 **Donation Request Management** with Accept/Reject Logic
- ✅ **Admin Dashboard** for User/Donation Control
- 🌐 **Fully Responsive Design**
- 📊 **Recharts** for data insights
- 🔔 **SweetAlert2** for confirmations & alerts

## 🛠️ Tech Stack

### Frontend:
- **React 19**
- **Tailwind CSS 4** + **DaisyUI 5**
- **React Router 7**
- **React Hook Form**
- **TanStack React Query v5**
- **Stripe React SDK**
- **Firebase Authentication**
- **SweetAlert2** & **React Toastify** for UI alerts
- **Recharts** for statistics
- **Lottie** for animations

### Dev Tools:
- **Vite 6**
- **ESLint** for linting
- **Headless UI** (for modals & transitions)

---

## 📦 Installed Packages

### Core:
- `react`, `react-dom`, `react-router`, `axios`, `tailwindcss`, `daisyui`

### UI & Animation:
- `@headlessui/react`, `aos`, `react-icons`, `lottie-react`, `react-responsive-carousel`, `sweetalert2`, `react-toastify`

### Forms & State:
- `react-hook-form`, `@tanstack/react-query`, `@tanstack/react-query-devtools`

### Auth & Payments:
- `firebase`, `@stripe/react-stripe-js`, `@stripe/stripe-js`

### Charts:
- `recharts`

---

### Backend:

- **Node.js**
- **Express.js**
- **MongoDB with Mongoose**
- **Firebase Admin SDK for token verification & role-based auth**
- **Stripe SDK for handling payments and webhooks**
- **dotenv for environment variable management**
- **CORS for secure frontend-backend communication**

### API Features:

- **RESTful API design**
- **Role-Based Access Control (RBAC): admin, charity, restaurant, user**
- **Secure Firebase Auth Middleware**
- **Modular Routing for users, donations, requests, reviews, and transactions**
- **Efficient Queries with filters and conditional logic**

## 📦 Installed Packages

### Core:
- **express** – Web framework for building the API

mongodb – Native MongoDB driver for Node.js

dotenv – For managing environment variables

cors – To enable Cross-Origin Resource Sharing

Authentication & Security:
firebase-admin – For verifying Firebase tokens and managing user roles

Payments:
stripe – Stripe SDK for handling payments, subscriptions, and webhooks













# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
