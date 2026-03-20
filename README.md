# ⚡ Paraswift — Parametric Income Insurance for the Gig Economy

> **Instant. Automated. Fair.** — AI-driven income protection for delivery riders and gig workers.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?logo=fastapi)](https://fastapi.tiangolo.com)
[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%2B%20Firestore-orange?logo=firebase)](https://firebase.google.com)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)

---

## 🧠 What is Paraswift?

Traditional insurance fails gig workers — slow claims, opaque terms, and zero coverage for weather disruptions. **Paraswift** solves this with **parametric insurance**:

> When real-world trigger conditions are met (heavy rain, AQI spike, curfew), payouts fire **automatically** — no claim forms, no adjuster calls, no waiting.

### Problem Statement
Delivery riders in India lose income daily due to:
- 🌧️ Sudden heavy rainfall
- 💨 Dangerous air quality alerts (AQI > 300)
- 🚫 Government-issued curfews or lockdowns
- 🏥 Un-insured work disruptions

Traditional insurance doesn't cover these. Paraswift does — **within minutes**.

---

## 🏗️ Architecture Overview

```
paraswift/
├── frontend/          # Next.js 16 + Tailwind + GSAP
│   ├── app/
│   │   ├── page.tsx              # Public landing page
│   │   ├── about/                # How it Works
│   │   ├── purchase/             # Dynamic AI-priced checkout
│   │   ├── rider/                # Rider portal
│   │   │   ├── login/            # Google OAuth sign-in
│   │   │   ├── register/         # KYC onboarding
│   │   │   ├── dashboard/        # Main dashboard + graphs
│   │   │   ├── policy/           # Coverage details
│   │   │   ├── claims/           # Payouts history
│   │   │   └── profile/          # User settings
│   │   └── admin/                # Admin portal (separate auth)
│   │       ├── login/            # Admin login
│   │       └── (protected)/      # Dashboard, Fraud, Payouts, etc.
│   └── components/
│       ├── Navbar.tsx            # GSAP animated pill navbar (role-aware)
│       ├── ConditionalNavbar.tsx # Route-based guard + navbar
│       ├── ProtectedRoute.tsx    # Firebase auth guard
│       ├── rider/BottomNav.tsx   # Mobile bottom navigation
│       └── admin/AdminTopbar.tsx # Admin panel navigation
│
└── backend/           # FastAPI + Firebase Admin SDK
    ├── main.py
    ├── routers/
    │   ├── users.py    # /api/v1/users/onboard, /me/dashboard
    │   └── policies.py # /api/v1/policies/quote, /purchase
    └── models/
```

---

## 🚀 Key Features

### For Riders
| Feature | Description |
|---|---|
| **Google OAuth** | Sign in instantly with Google |
| **KYC Onboarding** | Set persona (Food/E-commerce/Grocery) & work zone |
| **Dynamic AI Pricing** | Premium adjusts in real-time based on rainfall & wind sliders |
| **Instant Payouts** | Parametric triggers auto-execute payouts |
| **Analytics Dashboard** | Recharts graph — Earned vs Protection saved this week |
| **Risk Forecast** | 3-day weather risk outlook with colour-coded alerts |
| **Payout Simulator** | Click "Simulate Crisis" to see instant ₹500 payout demo |
| **Claims History** | Full breakdown of past payouts with timeline |
| **Mobile Responsive** | BottomNav on mobile, full dashboard on desktop |

### For Admins
| Feature | Description |
|---|---|
| **Secure Admin Portal** | Separate login at `/admin/login` (demo: `admin@paraswift.com` / `admin123`) |
| **Dashboard & Analytics** | Overview of riders, payouts, and active triggers |
| **Fraud Queue** | AI-flagged suspicious claims for review |
| **Analyst Queue** | Manual review workflow for edge cases |
| **Trigger Management** | Set/adjust parametric trigger thresholds |
| **Rider Management** | View and manage all registered riders |

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** — App Router, file-based routing, server/client components
- **Tailwind CSS v4** — Utility-first styling with dark mode support
- **GSAP 3** — Animated pill navbar with smooth hover effects
- **Recharts** — Interactive area charts for earnings analytics
- **Lucide React** — Icon library
- **Firebase SDK** — Client-side authentication

### Backend
- **FastAPI** — High-performance Python API
- **Firebase Admin SDK** — Server-side token verification
- **Uvicorn** — ASGI server
- **Pydantic** — Request/response validation

### Infrastructure
- **Firebase Authentication** — Google OAuth + Email/Password
- **Firestore** — User profiles and policy data
- **Firebase Storage** — Document storage (KYC)

---

## ⚙️ Local Development Setup

### Prerequisites
- Node.js 18+
- Python 3.10+
- Firebase project with Auth + Firestore enabled

### 1. Clone & Install

```bash
git clone https://github.com/your-username/paraswift.git
cd paraswift
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv

# Windows
.\venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
```

Create `backend/.env`:
```env
FIREBASE_PROJECT_ID=your-project-id
OPENWEATHER_API_KEY=your-key
RAZORPAY_KEY_ID=your-key
RAZORPAY_KEY_SECRET=your-secret
```

Place your `serviceAccountKey.json` in `backend/` (download from Firebase Console → Project Settings → Service Accounts).

```bash
# Start backend
python -m uvicorn main:app --reload
# Runs on http://localhost:8000
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

```bash
npm run dev
# Runs on http://localhost:3001
```

---

## 🔐 Authentication Flows

### Rider (Firebase Google OAuth)
1. Visit `/rider/login`
2. Click **Sign in with Google**
3. First time? → Redirected to `/rider/register` for KYC setup
4. Returning user? → Redirected to `/rider/dashboard`

### Admin (Mock credentials)
1. Visit `/admin/login`
2. Email: `admin@paraswift.com` | Password: `admin123`
3. Token stored in `localStorage` — logout clears token and redirects to `/`

> **Note:** Admin authentication will be replaced with a production identity provider (e.g., Firebase Custom Claims or an enterprise IdP) before deployment.

---

## 🌍 Parametric Trigger Logic

```
IF   rainfall_mm_per_hour > threshold (configurable, default 20mm)
AND  rider_zone == affected_zone
THEN payout = daily_baseline * coverage_pct
```

Payout types:
- `HEAVY_RAIN` — Rainfall exceeds threshold
- `AIR_QUALITY` — AQI exceeds 300
- `CURFEW` — Government alert issued

All triggers are **verified by oracle data** (weather APIs, government feeds) and executed without any manual intervention.

---

## 📱 Route Reference

| Route | Access | Description |
|---|---|---|
| `/` | Public | Landing page |
| `/about` | Public | How Paraswift works |
| `/rider/login` | Public | Rider sign-in |
| `/rider/register` | Public (auth'd) | KYC onboarding |
| `/rider/dashboard` | Rider | Main dashboard |
| `/rider/policy` | Rider | Coverage details |
| `/rider/claims` | Rider | Claims history |
| `/rider/profile` | Rider | Profile & settings |
| `/purchase` | Rider | Buy/renew policy |
| `/admin/login` | Public | Admin portal login |
| `/admin/dashboard` | Admin | Overview |
| `/admin/fraud` | Admin | Fraud alerts |
| `/admin/payouts` | Admin | Payout management |
| `/admin/riders` | Admin | Rider management |
| `/admin/triggers` | Admin | Trigger configuration |

---

## 🧪 Demo

**Rider Demo:**
1. Go to `/rider/login` → Sign in with Google
2. Complete KYC at `/rider/register`
3. Visit `/rider/dashboard` → Click **⚡ Simulate Crisis**
4. Watch the amber alert appear, then ₹500 payout execute instantly

**Admin Demo:**
1. Go to `/admin/login` → `admin@paraswift.com` / `admin123`
2. Explore the full portal with fraud, payout, and trigger management

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">
  Built with ❤️ to protect the workers who keep India moving.
</div>
