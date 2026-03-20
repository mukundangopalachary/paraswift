# Frontend Implementation Guide - Paraswift UI System

## Quick Start

### New Project Structure
The frontend has been reorganized with grouped routes for better organization:

```
frontend/app/
├── (auth)/              # Auth routes (no layout wrapper)
│   ├── login/          # Rider OTP signup (future)
│   └── layout.tsx
│
├── (rider)/            # Protected rider routes (with bottom nav)
│   ├── home/           # Dashboard
│   ├── claims/         # Claims history
│   ├── policy/         # Policy info
│   ├── profile/        # User profile
│   └── layout.tsx      # With BottomNav
│
├── (admin)/            # Protected admin routes (with topbar)
│   ├── login/          # Admin email/password login
│   ├── dashboard/      # Overview KPIs
│   ├── fraud/          # Fraud alerts
│   ├── analyst-queue/  # Analyst review
│   ├── triggers/       # Trigger management
│   ├── payouts/        # Payouts history
│   ├── riders/         # Riders database
│   ├── settings/       # Settings (placeholder)
│   └── layout.tsx      # With AdminTopbar
│
├── page.tsx            # Landing page (choose role: rider or admin)
└── layout.tsx          # Root layout
```

---

## User Flow Diagram

```
START
  │
  ├──→ "/" (Landing Page)
       ├──→ "Rider Dashboard" button → /rider/home
       │    ├──→ Auth check via ProtectedRoute
       │    ├──→ If no auth → /register (TODO)
       │    └──→ Display BottomNav (home, policy, claims, profile)
       │
       └──→ "Admin Panel" button → /admin/login
            ├──→ Email + Password form
            ├──→ Store adminToken + adminUser in localStorage
            └──→ Auth check via AdminProtectedRoute
                 ├──→ Display AdminTopbar (navigation)
                 └──→ Route to /admin/dashboard
```

---

## Authentication Implementation

### Rider Authentication (Firebase OTP)
**Status**: Partial (uses ProtectedRoute, but login screens not implemented yet)

1. User lands on `/` (landing page)
2. Clicks "Rider Dashboard"
3. Currently redirects to `/rider/home` (demo only)
4. **TODO**: Implement `/register` with Firebase OTP:
   - Phone entry
   - OTP verification
   - Profile setup (persona, KYC)
   - Redirect to `/rider/home`

**File**: `frontend/components/ProtectedRoute.tsx`

### Admin Authentication (Email/Password)
**Status**: Implemented (demo login enabled)

1. User lands on `/` (landing page)
2. Clicks "Admin Panel"
3. Redirected to `/admin/login`
4. **Demo Credentials**: `admin@paraswift.com` / `admin123`
5. Token stored in `localStorage.adminToken`
6. Redirects to `/admin/dashboard`
7. AdminProtectedRoute checks token on admin routes

**Files**: 
- `frontend/app/(admin)/login/page.tsx`
- `frontend/components/AdminProtectedRoute.tsx`

---

## Component Architecture

### Rider Components (`frontend/components/rider/`)
- `BottomNav.tsx` - 4-tab mobile navigation
- `CoverageStatusBadge.tsx` - Green/red coverage status
- `PremiumCard.tsx` - Weekly premium display
- `RiskForecastTimeline.tsx` - Weather timeline
- `ActiveTriggersAlert.tsx` - Current disruptions
- `EarningsSummary.tsx` - Year/month/baseline stats
- `ClaimCard.tsx` - Claim display card
- `ClaimBreakdownModal.tsx` - Detailed claim breakdown

### Admin Components (`frontend/components/admin/`)
- `AdminTopbar.tsx` - Header with alerts + user menu
- `KPICard.tsx` - Dashboard metric cards
- `PayoutsFeed.tsx` - Recent payouts table
- `TriggerSummary.tsx` - Active triggers summary
- `TriggerTable.tsx` - Full trigger management
- `SuspiciousClusterCard.tsx` - Fraud alert cards
- `FlaggedClaimsTable.tsx` - Analyst review table

### Shared Components (`frontend/components/`)
- `ProtectedRoute.tsx` - Rider auth wrapper
- `AdminProtectedRoute.tsx` - Admin auth wrapper
- `Navbar.tsx` - (existing, can be refactored)

---

## API Integration

### Client Setup
**File**: `frontend/lib/apiClient.ts`

```typescript
// Import in your components
import { riderAPI, adminAPI } from "@/lib/apiClient";

// Usage in components:
const data = await riderAPI.getProfile(riderId, token);
const fraudAlerts = await adminAPI.getFraudAlerts(adminToken);
```

### Backend Integration Points

#### Rider APIs (to implement in backend)
```
POST /api/v1/riders/register         → Send OTP
POST /api/v1/riders/verify-otp       → Verify OTP
GET  /api/v1/riders/{id}/profile     → Get profile
GET  /api/v1/riders/{id}/policies    → Get active policies
GET  /api/v1/riders/{id}/claims      → Get claims
POST /api/v1/riders/{id}/policies/renew → Renew policy
```

#### Admin APIs (to implement in backend)
```
POST /api/v1/admin/login             → Email login
GET  /api/v1/admin/dashboard         → KPIs
GET  /api/v1/admin/fraud-alerts      → Fraud clusters
GET  /api/v1/admin/analyst-queue     → Flagged claims
POST /api/v1/admin/claims/{id}/review → Approve/reject
GET  /api/v1/admin/triggers          → All triggers
POST /api/v1/admin/triggers/{id}/toggle → Enable/disable
GET  /api/v1/admin/payouts           → Payout history
GET  /api/v1/admin/riders            → All riders
```

**Backend location**: `backend/routers/` - add routers as needed

---

## Environment Variables

Create `.env.local` in `frontend/`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_FIREBASE_API_KEY=<your-firebase-key>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your-project-id>
```

---

## Styling System

### Tailwind CSS (already configured)
- Colors: Use `slate`, `blue`, `green`, `red`, `amber` utilities
- Spacing: Use `px-4`, `py-2`, `gap-4` etc.
- Responsive: Use `md:` and `lg:` prefixes
- Dark mode: Use `dark:` prefix (e.g., `dark:bg-slate-800`)

### Design Tokens
```
Primary: Blue (#3B82F6)
Success: Green (#10B981)
Warning: Amber (#F59E0B)
Error: Red (#EF4444)
Neutral: Slate (#6B7280)
```

### Shadow System
```
Soft: shadow-sm
Medium: shadow-lg
Large: shadow-2xl
```

---

## Key Features Implemented

### ✅ Rider App (Mobile-First)
- [x] Home Dashboard with KPI cards
- [x] Claims screen with claim breakdown modal
- [x] Policy rules education screen
- [x] User profile with payment method
- [x] Bottom navigation (4 tabs)
- [ ] **TODO**: OTP login flow
- [ ] **TODO**: Onboarding (persona, KYC)
- [ ] **TODO**: Real-time Firestore listeners

### ✅ Admin Dashboard (Desktop-First)
- [x] Overview dashboard with KPIs
- [x] Fraud detection panel with suspicious clusters
- [x] Analyst review queue with claim details
- [x] Trigger management with toggle switches
- [x] Payouts history and gateway status
- [x] Riders database with full profiles
- [x] Admin topbar with alerts + user menu
- [x] Admin login (demo: admin@paraswift.com / admin123)
- [ ] **TODO**: Risk map visualization
- [ ] **TODO**: Analytics & reports
- [ ] **TODO**: Settings page implementation

### ✅ Cross-Platform
- [x] Landing page with dual CTAs (rider/admin)
- [x] Dark mode support (via Tailwind)
- [x] Responsive design (mobile, tablet, desktop)
- [x] Loading states and error handling
- [x] Modal flows for detailed views
- [x] Smooth transitions and animations

---

## Next Steps for Full Implementation

### Phase 1: Backend API Integration
1. Update `/backend/routers/users.py` → Add OTP flows
2. Update `/backend/routers/policies.py` → Add rider policy endpoints
3. Create `/backend/routers/admin_auth.py` → Email/password login
4. Create `/backend/routers/admin_dashboard.py` → KPIs, fraud, analyst queue
5. Create `/backend/routers/admin_management.py` → Triggers, payouts, riders

### Phase 2: Firebase Integration
1. Configure Firebase Authentication (OTP for riders, custom auth for admins)
2. Set up Firestore security rules
3. Implement real-time listeners for claims/payouts in rider app
4. Add Firestore queries in admin dashboards

### Phase 3: Enhancements
1. Add notifications (push + in-app)
2. Implement risk map (Google Maps + data visualization)
3. Add analytics dashboards
4. Enable multi-language support (rider app)
5. Implement payment gateway mock (Razorpay)

### Phase 4: Deployment
1. Deploy frontend to Vercel or AWS Amplify
2. Deploy backend to Cloud Run or EC2
3. Set up CI/CD pipelines
4. Configure CDN for assets
5. Enable monitoring & logging

---

## Testing Credentials

### Admin Login (Demo)
- Email: `admin@paraswift.com`
- Password: `admin123`

### Rider (Demo)
- Currently bypasses auth
- Use any name in profile
- Mock data in all screens

### Future: Firebase OTP
- Any Indian phone number (+91)
- OTP will be sent via Firebase

---

## File Reference

### Page Components
- `app/(admin)/login/page.tsx` - Admin login form
- `app/(admin)/dashboard/page.tsx` - KPI cards, recent payouts, triggers
- `app/(admin)/fraud/page.tsx` - Fraud clusters and metrics
- `app/(admin)/analyst-queue/page.tsx` - Flagged claims for review
- `app/(admin)/triggers/page.tsx` - Trigger management table
- `app/(admin)/payouts/page.tsx` - Payouts history
- `app/(admin)/riders/page.tsx` - Riders database
- `app/(rider)/home/page.tsx` - Rider home dashboard
- `app/(rider)/claims/page.tsx` - Claims history + breakdown
- `app/(rider)/policy/page.tsx` - Policy rules & triggers
- `app/(rider)/profile/page.tsx` - User profile & settings
- `app/page.tsx` - Landing page with role selection

### Layout Components
- `app/(admin)/layout.tsx` - Admin layout with topbar
- `app/(rider)/layout.tsx` - Rider layout with bottom nav
- `app/(auth)/layout.tsx` - Auth layout (no wrapper)

### Components
- `components/admin/AdminTopbar.tsx` - Admin header + nav
- `components/rider/BottomNav.tsx` - Rider 4-tab nav
- `components/AdminProtectedRoute.tsx` - Admin auth check
- `components/ProtectedRoute.tsx` - Rider auth check

### Libraries
- `lib/apiClient.ts` - API client with endpoints
- `lib/firebase.ts` - Firebase config

---

## Troubleshooting

### Landing page shows blank?
- Check if Next.js dev server is running
- `npm run dev` from `frontend/` directory

### Auth routes not protecting pages?
- Check localStorage for `adminToken` or Firebase user
- Clear browser cache if switching between roles

### Styling issues?
- Tailwind CSS might not be compiling
- Run `npm install` and restart dev server
- Check `tailwind.config.ts` is properly configured

### API calls failing?
- Ensure backend is running on `http://localhost:8000`
- Check `NEXT_PUBLIC_API_BASE_URL` in `.env.local`
- Verify backend CORS settings (should allow `http://localhost:3001`)

---

## Quick Commands

```bash
# Frontend setup
cd frontend
npm install
npm run dev              # Start dev server (port 3001)
npm run build            # Build for production
npm run lint             # Run ESLint

# Backend setup
cd backend
python -m venv venv
source venv/bin/activate    # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
python main.py              # Start FastAPI (port 8000)
```

---

## Documentation Files
- [`UI_ARCHITECTURE.md`](UI_ARCHITECTURE.md) - Complete UI/UX design system
- [`IMPLEMENTATION_GUIDE.md`](IMPLEMENTATION_GUIDE.md) - This file
- [`backend/docs/api-documentation.md`](../backend/docs/api-documentation.md) - API endpoints
