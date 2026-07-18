# Project Name: flexora
A Local Food Waste Reduction Platform

# Project Live Link: https://flexora-188f4.web.app/

# 🎯 Profect Purpose:
**flexora** is a full-stack web application designed to streamline and manage food donation and distribution between restaurants and charitable organizations. It provides an organized platform where restaurants can list surplus food donations, and charities can request, manage, and review donations efficiently. Flexora aims to reduce food waste and ensure timely distribution to those in need, with features like real-time role-based dashboards, secure authentication, payment integration for charity verification, and review systems to build trust and accountability between users.

## 📌 Project Overview:
**flexora** is a community-driven food donation platform designed to connect **restaurants**, **charities**, and **users** in the effort to reduce local food waste. Restaurants can donate surplus food, charities can request and pick up donations, and users can browse and favorite food items. Admins manage the ecosystem with full control over users, donations, and requests.

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

- **mongodb** – Native MongoDB driver for Node.js

- **dotenv** – For managing environment variables

- **cors** – To enable Cross-Origin Resource Sharing

### Authentication & Security:
- **firebase-admin** – For verifying Firebase tokens and managing user roles

- **Payments:**
stripe – Stripe SDK for handling payments, subscriptions, and webhooks


## Setup & Installation
#### 1. Clone the repo:

```
git clone https://github.com/helal366/flexora_client.git
cd flexora_client
```


#### 2. Install dependencies:
```
npm install
```

#### 3. Create a .env file with required environment variables (see below).
```
VITE_cloud_name="YOUR VITE CLOUD NAME"
VITE_upload_preset="YOUR VITE UPLOAD PRESET"
VITE_cloudinary_url="YOUR VITE CLOUDINARY URL"

VITE_apiKey="YOUR VITE API KEY"
VITE_authDomain="YOUR VITE AUTH DOMAIN"
VITE_projectId="YOUR VITE PROJECT ID"
VITE_storageBucket="YOUR VITE STORAGE BUCKET"
VITE_messagingSenderId="YOUR VITE MESSAGING SENDER"
VITE_appId="YOUR VITE APP ID"

VITE_STRIPE_PK="YOUR VITE STRIPE PK"

VITE_BASE_URL="YOUR VITE BASE URL"
```

#### 4. Run the server:
```
npm start
```