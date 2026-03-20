# Project File Reference Guide

## Quick Navigation

### 📄 Documentation Files (Read These First)
| File | Purpose | Priority | When to Read |
|------|---------|----------|--------------|
| [SETUP_GUIDE.md](SETUP_GUIDE.md) | Original project setup & Firebase config | ⭐⭐⭐ | First time setup |
| [UI_ARCHITECTURE.md](UI_ARCHITECTURE.md) | Complete UI specification (3800+ lines) | ⭐⭐⭐ | Understanding design system |
| [SYSTEM_ARCHITECTURE.md](SYSTEM_ARCHITECTURE.md) | Data flows, event sequences, integration patterns | ⭐⭐⭐ | Understanding system behavior |
| [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md) | Step-by-step implementation roadmap | ⭐⭐⭐ | Getting started with code |
| [LOCAL_DEV_GUIDE.md](LOCAL_DEV_GUIDE.md) | Local development setup & debugging | ⭐⭐ | Running project locally |
| [srs.md](docs/srs.md) | Software Requirements Specification | ⭐ | Understanding requirements |
| [data-entities.md](docs/data-entities.md) | Data model definitions | ⭐ | Understanding data structure |

---

## 📱 Frontend: Rider App

### Authentication & Protection
```
frontend/components/ProtectedRoute.tsx
├─ Purpose: Wrap rider routes with Firebase auth check
├─ Used in: app/(rider)/layout.tsx
└─ Status: ✅ COMPLETE
```

### Rider Pages (Mobile-First)
```
frontend/app/(rider)/home/page.tsx
├─ Dashboard showing: KPIs, premium, risk forecast
├─ Features: Trigger alerts, earnings summary
├─ Responsive: Mobile-first (pb-20 for bottom nav)
└─ Status: ✅ COMPLETE

frontend/app/(rider)/claims/page.tsx
├─ Active & past claims list with status badges
├─ Modal: Breakdown of claim calculation
├─ Timeline: Claim processing steps
└─ Status: ✅ COMPLETE

frontend/app/(rider)/policy/page.tsx
├─ Policy rules & coverage info
├─ Trigger explanations (Rain, AQI, Curfew)
├─ Auto-processing information banner
└─ Status: ✅ COMPLETE

frontend/app/(rider)/profile/page.tsx
├─ User profile & account info
├─ Payment methods (UPI mock)
├─ Settings: Language, notifications, dark mode
├─ Logout handler
└─ Status: ✅ COMPLETE
```

### Rider Components
```
frontend/components/rider/BottomNav.tsx
├─ 4-tab iOS-style navigation
├─ Tabs: Home, Policy, Claims, Profile
├─ Features: Active state detection, responsive
└─ Status: ✅ COMPLETE
```

### Rider Layout
```
frontend/app/(rider)/layout.tsx
├─ Wraps with ProtectedRoute (Firebase auth)
├─ Includes BottomNav component
├─ Responsive: pb-20 on mobile for nav height
└─ Status: ✅ COMPLETE
```

---

## 🔐 Frontend: Admin Dashboard

### Authentication & Protection
```
frontend/components/AdminProtectedRoute.tsx
├─ Purpose: Check localStorage.adminToken
├─ Redirects: To /admin/login if missing
├─ Features: Loading spinner during check
└─ Status: ✅ COMPLETE
```

### Admin Pages (Desktop-First)
```
frontend/app/(admin)/login/page.tsx
├─ Email/password form
├─ Demo credentials: admin@paraswift.com / admin123
├─ Features: localStorage token storage
├─ Redirect: To /admin/dashboard on success
└─ Status: ✅ COMPLETE

frontend/app/(admin)/dashboard/page.tsx
├─ Overview dashboard with KPI cards
├─ Cards: Users, Policies, Payouts, Fraud Alerts
├─ Features: Recharts data visualization
├─ Content: Recent payouts table, claims chart
└─ Status: ✅ COMPLETE

frontend/app/(admin)/fraud/page.tsx
├─ Fraud detection dashboard
├─ Suspicious clusters: Rain spike, device ring
├─ Modal: Investigation details
├─ Features: Risk level badges
└─ Status: ✅ COMPLETE

frontend/app/(admin)/analyst-queue/page.tsx
├─ Human-in-loop fraud review
├─ Table: Flagged claims with trust scores
├─ Modal: Detailed claim analysis
├─ Actions: Approve/Reject/Investigate
└─ Status: ✅ COMPLETE

frontend/app/(admin)/triggers/page.tsx
├─ Trigger management (Rain, AQI, Civic)
├─ Table with: Name, Status toggle, Zones
├─ Modal: Edit trigger thresholds
├─ Features: Inline status toggle
└─ Status: ✅ COMPLETE

frontend/app/(admin)/payouts/page.tsx
├─ Payout history & summary
├─ Filters: Date range, payment status
├─ Cards: Summary totals (approved, rejected, pending)
├─ Table: Payout transaction log
├─ Gateway status: Razorpay connection info
└─ Status: ✅ COMPLETE

frontend/app/(admin)/riders/page.tsx
├─ Riders database with full profiles
├─ Search & filter: By name, zone
├─ Table: User info, coverage, stats
├─ Modal: Rider detailed profile
└─ Status: ✅ COMPLETE

frontend/app/(admin)/settings/page.tsx
├─ Placeholder for admin settings
├─ Ready for: API keys, system config
└─ Status: ⏳ PLACEHOLDER
```

### Admin Components
```
frontend/components/admin/AdminTopbar.tsx
├─ Header with: Logo, alerts, user menu
├─ Features: 3 high alerts badge
├─ Menu: Horizontal navigation to all pages
├─ User actions: Dropdown with logout
└─ Status: ✅ COMPLETE
```

### Admin Layout
```
frontend/app/(admin)/layout.tsx
├─ Wraps with AdminProtectedRoute
├─ Includes AdminTopbar component
├─ Features: Main content container
└─ Status: ✅ COMPLETE
```

---

## 🌐 Frontend: Core Files

### Authentication & Layouts
```
frontend/app/(auth)/layout.tsx
├─ Purpose: Auth group layout (passthrough)
└─ Status: ✅ COMPLETE

frontend/app/layout.tsx
├─ Root layout with: Tailwind, CSS global
├─ Theme: Dark mode support
└─ Status: ✅ EXISTING

frontend/app/page.tsx
├─ Landing page with role selection
├─ CTAs: Rider Dashboard, Admin Panel
├─ Features: Feature cards, flow diagram
└─ Status: ✅ UPDATED
```

### Utilities & API
```
frontend/lib/apiClient.ts
├─ Centralized API client
├─ Endpoints: All rider & admin APIs
├─ Methods: Typed, with error handling
├─ Status: ✅ COMPLETE
│
├─ riderAPI methods:
│   ├─ sendOTP(phone)
│   ├─ verifyOTP(phone, otp)
│   ├─ getProfile(token)
│   ├─ getPolicies(token)
│   ├─ getClaims(token)
│   └─ renewPolicy(token, policyId)
│
├─ adminAPI methods:
│   ├─ login(email, password)
│   ├─ getDashboard(token)
│   ├─ getFraudAlerts(token)
│   ├─ getAnalystQueue(token)
│   ├─ reviewClaim(token, claimId, decision)
│   ├─ getTriggers(token)
│   ├─ toggleTrigger(token, triggerId)
│   ├─ getPayouts(token)
│   └─ getRiders(token)
│
└─ webhookAPI methods:
    ├─ triggerCheck(data)
    └─ fraudAlert(data)

frontend/lib/firebase.ts
├─ Firebase configuration
├─ Status: ✅ EXISTING
└─ TODO: Connect to actual Firebase project
```

### Configuration Files
```
frontend/package.json
├─ Dependencies: Next.js 16.2, React 19.2
├─ Features: TypeScript, Tailwind 4
└─ Status: ✅ PRE-CONFIGURED

frontend/tsconfig.json
├─ TypeScript configuration
└─ Status: ✅ EXISTING

frontend/next.config.ts
├─ Next.js configuration
└─ Status: ✅ EXISTING

frontend/tailwind.config.mjs
├─ Tailwind CSS with dark mode
├─ Theme: Blue primary, custom colors
└─ Status: ✅ EXISTING

frontend/postcss.config.mjs
└─ Status: ✅ EXISTING
```

---

## 🐍 Backend: Core Files

### Entry Point
```
backend/main.py
├─ FastAPI application setup
├─ CORS middleware configuration
├─ Route registration (/api/v1/*)
├─ Metadata: Title, version, etc.
└─ Status: ✅ EXISTING
```

### Core Services
```
backend/core/config.py
├─ Environment configuration
├─ Firebase project ID, API keys
└─ Status: ✅ EXISTING

backend/core/firebase.py
├─ Firebase initialization
├─ Firestore client (db)
├─ Authentication setup
└─ Status: ✅ EXISTING

backend/core/security.py
├─ JWT token generation
├─ Password hashing utilities
├─ OTP verification logic
└─ Status: ✅ EXISTING
```

### Data Models
```
backend/models/user.py
├─ User (Rider) model
├─ Fields: UserUID, phone, persona, baseline_earnings
└─ Status: ✅ EXISTING

backend/models/policy.py
├─ Policy model
├─ Fields: Weekly cycle, premium, coverage_limit
└─ Status: ✅ EXISTING
```

### API Routers
```
backend/routers/users.py
├─ Routes: OTP, verification, profile
├─ Endpoints: POST /riders/register, /verify-otp, GET /profile
└─ Status: ⏳ NEEDS IMPLEMENTATION

backend/routers/policies.py
├─ Routes: List, detail, renewal
├─ Endpoints: GET /policies, /policies/{id}, POST /renew
└─ Status: ⏳ NEEDS IMPLEMENTATION

backend/routers/webhooks.py
├─ Routes: External API webhooks
├─ Endpoints: POST /webhooks/trigger, /fraud-alert
└─ Status: ⏳ NEEDS IMPLEMENTATION

backend/routers/admin.py (NOT YET CREATED)
├─ Routes: Admin endpoints
├─ Endpoints: Login, dashboard, fraud alerts, queue, etc.
└─ Status: ❌ TODO
```

### Business Logic Services
```
backend/services/ai_service.py
├─ Fraud detection algorithms
├─ GPS analysis, device fingerprinting
├─ Behavior analysis, scoring
└─ Status: ⏳ NEEDS IMPLEMENTATION

backend/services/payment_service.py
├─ Payment gateway integration
├─ Razorpay API calls
├─ Payout processing
└─ Status: ⏳ NEEDS IMPLEMENTATION

backend/services/weather_service.py
├─ Weather data fetching
├─ OpenWeather & AQI API calls
├─ Trigger matching
└─ Status: ⏳ NEEDS IMPLEMENTATION
```

### Configuration Files
```
backend/requirements.txt
├─ Python dependencies
├─ Packages: fastapi, firebase-admin, pydantic
└─ Status: ✅ EXISTING

backend/serviceAccountKey.json
├─ Firebase authentication key
├─ IMPORTANT: Keep secure, don't commit
├─ TODO: Replace with your Firebase project key
└─ Status: ⏳ NEEDS CONFIGURATION

backend/.env (Local only, not committed)
├─ Environment variables
├─ API keys, Firebase config, JWT secret
└─ Status: ⏳ NEEDS CONFIGURATION
```

---

## 📚 Documentation Directory

```
docs/
├─ srs.md
│  └─ Complete Software Requirements Specification
│
├─ data-entities.md
│  └─ Data model definitions & entities
│
├─ implementation_plan.md
│  └─ Project implementation roadmap
│
└─ task.md
   └─ Task breakdown & progress tracking
```

---

## 🔑 Key Files by Use Case

### "I need to understand how X works"
1. **Rider onboarding** → [UI_ARCHITECTURE.md](UI_ARCHITECTURE.md#rider-onboarding-flow) + [LOCAL_DEV_GUIDE.md](LOCAL_DEV_GUIDE.md#workflow-from-rider-to-payout)
2. **Claim generation** → [SYSTEM_ARCHITECTURE.md](SYSTEM_ARCHITECTURE.md#event-flow-claim-generation--payout)
3. **Admin workflow** → [SYSTEM_ARCHITECTURE.md](SYSTEM_ARCHITECTURE.md#admin-dashboard-flow)
4. **Data models** → [docs/data-entities.md](docs/data-entities.md)
5. **API endpoints** → [frontend/lib/apiClient.ts](frontend/lib/apiClient.ts)

### "I need to run the project locally"
1. Start with → [LOCAL_DEV_GUIDE.md](LOCAL_DEV_GUIDE.md#quick-start)
2. Setup frontend → [LOCAL_DEV_GUIDE.md](LOCAL_DEV_GUIDE.md#frontend-setup)
3. Setup backend → [LOCAL_DEV_GUIDE.md](LOCAL_DEV_GUIDE.md#backend-setup)
4. Test with → [LOCAL_DEV_GUIDE.md](LOCAL_DEV_GUIDE.md#api-testing)

### "I need to add a new feature"
1. Design: Update docs (UI_ARCHITECTURE.md, SYSTEM_ARCHITECTURE.md)
2. Frontend: [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md#adding-features)
3. Backend: [LOCAL_DEV_GUIDE.md](LOCAL_DEV_GUIDE.md#common-development-tasks)
4. Test: Use [LOCAL_DEV_GUIDE.md](LOCAL_DEV_GUIDE.md#debugging)

### "Something is broken"
1. Check logs → [LOCAL_DEV_GUIDE.md](LOCAL_DEV_GUIDE.md#debugging)
2. Check API → [LOCAL_DEV_GUIDE.md](LOCAL_DEV_GUIDE.md#api-testing)
3. Check DB → [SYSTEM_ARCHITECTURE.md](SYSTEM_ARCHITECTURE.md) (data models)
4. Check config → [LOCAL_DEV_GUIDE.md](LOCAL_DEV_GUIDE.md#environment-setup)

### "I'm deploying to production"
1. Pre-flight checks → [LOCAL_DEV_GUIDE.md](LOCAL_DEV_GUIDE.md#deployment-readiness-checklist)
2. Deployment steps → [LOCAL_DEV_GUIDE.md](LOCAL_DEV_GUIDE.md#deployment-readiness-checklist)
3. Monitoring → [SYSTEM_ARCHITECTURE.md](SYSTEM_ARCHITECTURE.md#monitoring--observability)

---

## 📊 File Statistics

### Frontend Files
- **Total Components**: 9 (riders, admin, auth)
- **Total Pages**: 12 (rider, admin + landing)
- **Layouts**: 3 (auth, rider, admin)
- **Utilities**: 1 (apiClient.ts + firebase.ts)
- **Configuration**: 5 (package.json, tsconfig.json, tailwind, etc.)

### Backend Files
- **Core Modules**: 3 (config, firebase, security)
- **Data Models**: 2 (user, policy)
- **Route Modules**: 3 (users, policies, webhooks)
- **Services**: 3 (ai, payment, weather)
- **Configuration**: 2 (requirements.txt, serviceAccountKey.json)

### Documentation Files
- **Architecture Docs**: 3 (UI, System, Implementation)
- **Setup Guides**: 2 (Setup, Local Dev)
- **Requirements**: 2 (SRS, Data Entities)
- **Project Plan**: 2 (Implementation Plan, Task)
- **This Guide**: 1 (File Reference)

### Total: 40+ Files (22 newly created)

---

## 🔄 File Dependencies

### Frontend Page Dependencies
```
app/page.tsx (Landing)
├─ components/Navbar.tsx (existing)
└─ Links to: (rider), (admin) pages

app/(rider)/home/page.tsx
├─ components/rider/BottomNav.tsx
├─ components/ProtectedRoute.tsx
├─ lib/apiClient.ts (riderAPI.getProfile)
└─ lib/firebase.ts

app/(admin)/dashboard/page.tsx
├─ components/AdminProtectedRoute.tsx
├─ components/admin/AdminTopbar.tsx
├─ lib/apiClient.ts (adminAPI.getDashboard)
└─ recharts (charts)
```

### Backend Route Dependencies
```
main.py
├─ routers/users.py
├─ routers/policies.py
├─ routers/webhooks.py
├─ routers/admin.py (TODO)
├─ core/firebase.py (Firestore)
├─ core/security.py (Auth)
└─ core/config.py (Settings)

services/ai_service.py
├─ core/firebase.py (Firestore queries)
└─ models/user.py, policy.py

services/payment_service.py
├─ core/config.py (API keys)
└─ External: Razorpay API

services/weather_service.py
├─ core/config.py (API keys)
└─ External: OpenWeather, AQI APIs
```

---

## ✅ Implementation Checklist

### Phase 1: Setup (Complete ✅)
- [x] Frontend scaffolding (Next.js app)
- [x] Backend scaffolding (FastAPI)
- [x] All UI components created
- [x] Admin dashboard created
- [x] Authentication structure

### Phase 2: Backend Implementation (In Progress ⏳)
- [ ] Firebase Firestore collections setup
- [ ] User registration & OTP flow
- [ ] Policy management endpoints
- [ ] Claims processing & auto-generation
- [ ] Admin endpoints
- [ ] Payment gateway integration
- [ ] Weather/AQI API integration
- [ ] Fraud detection models
- [ ] Cloud Functions for triggers

### Phase 3: Frontend Integration (In Progress ⏳)
- [ ] Connect to real Firebase auth
- [ ] Fetch real data from backend
- [ ] Real-time Firestore listeners
- [ ] Handle loading & error states
- [ ] Form validation & submission
- [ ] Payment flow integration
- [ ] Notification system

### Phase 4: Testing & Optimization (Pending ❌)
- [ ] Unit tests (frontend)
- [ ] Unit tests (backend)
- [ ] Integration tests
- [ ] Load testing
- [ ] Security audit
- [ ] Performance optimization

### Phase 5: Deployment (Pending ❌)
- [ ] Production Firebase setup
- [ ] Production backend deployment
- [ ] Production frontend deployment
- [ ] Domain configuration
- [ ] SSL certificates
- [ ] Monitoring & logging

---

## 📞 When to Use Each Document

| Document | Best For | Reading Time |
|----------|----------|--------------|
| SETUP_GUIDE.md | Initial project setup | 15 min |
| UI_ARCHITECTURE.md | Understanding UI design | 45 min |
| SYSTEM_ARCHITECTURE.md | Understanding data flows | 30 min |
| IMPLEMENTATION_GUIDE.md | Step-by-step implementation | 20 min |
| LOCAL_DEV_GUIDE.md | Running locally, debugging | 25 min |
| FILE_REFERENCE.md (this) | Finding specific files | 10 min |

---

**Last Updated**: March 20, 2026
**Total Documentation**: 6 comprehensive guides
**Status**: Ready for implementation
