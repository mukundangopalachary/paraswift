# Paraswift UI Architecture & Design System

## Overview
Complete UI system with Rider Mobile App + Admin Web Dashboard + Auth flows.

---

## 1. USER ROLES & ENTRY POINTS

### Rider (Gig Worker)
- **Entry**: `/rider/home` (after auth)
- **Auth**: Phone OTP via `/rider/register`
- **Navigation**: Bottom tab bar (Home, Policy, Claims, Profile)
- **Device**: Mobile-first (responsive to desktop)

### Admin (Insurer/Operations)
- **Entry**: `/admin/dashboard` (after admin auth)
- **Auth**: Email/Password via `/admin/login`
- **Navigation**: Horizontal topbar + sidebar
- **Device**: Desktop-first (responsive to mobile)

---

## 2. RIDER APPLICATION (MOBILE-FIRST)

### Screen 1: Home Dashboard
**Route**: `/rider/home`
```
┌─────────────────────────────┐
│ ☀️  Mar 20, 2026 | 09:30 AM │ (Header)
├─────────────────────────────┤
│ 👤 Rajesh K. | Tier Gold    │ (User Mini)
│ ₹2,450 earnings this week   │
├─────────────────────────────┤
│ 🟢 COVERAGE ACTIVE          │ (Status Badge - Green)
│ Protected until Mon Mar 27   │
├─────────────────────────────┤
│ 📊 WEEKLY PREMIUM           │ (Card)
│ ₹149 due Monday             │
│ [Plan Details] [Pay Now]    │
├─────────────────────────────┤
│ ⛈️  RISK FORECAST           │ (Timeline)
│ Tomorrow: 85% Rain 2-4PM    │
│ Friday: High AQI (299)      │
│ Next Week: Clear            │
├─────────────────────────────┤
│ 🚨 ACTIVE TRIGGERS          │ (Alert)
│ • Heavy Rain (20mm+)        │
│ • Air Quality Alert         │
│ • Curfew Hours (10PM-6AM)   │
├─────────────────────────────┤
│ 💰 EARNINGS SUMMARY         │ (Stats)
│ Year: ₹45,230 | Month: 8,450│
│ Baseline: ₹650/day          │
├─────────────────────────────┤
│ [Home] [Policy] [Claims][👤] │ (Bottom Nav)
└─────────────────────────────┘
```

**Components**:
- `UserHeaderMini`: Avatar, name, tier, date
- `CoverageStatusBadge`: Active/Expired/Pending
- `PremiumCard`: Amount, due date, CTA buttons
- `RiskForecastTimeline`: Weather events, AQI
- `ActiveTriggersAlert`: Current disruption conditions
- `EarningsSummary`: Year, month, baseline, trends

---

### Screen 2: Claims History & Details
**Route**: `/rider/claims`
```
┌─────────────────────────────┐
│ ← Claims                    │
├─────────────────────────────┤
│ 🔄 ACTIVE CLAIMS (1)        │
│ ┌─────────────────────────┐ │
│ │ Rain Disruption         │ │
│ │ Initiated: Mar 19, 2PM  │ │
│ │ Status: AI Approved ✓   │ │ (Card)
│ │ Est. Payout: ₹350       │ │
│ │ [View Breakdown]        │ │
│ └─────────────────────────┘ │
├─────────────────────────────┤
│ ✅ PAST CLAIMS              │
│ ┌─────────────────────────┐ │
│ │ Curfew Impact           │ │
│ │ Mar 15, 8:00 PM         │ │
│ │ ✓ PAID: ₹420            │ │ (Card)
│ │ Transaction: TXN-12345  │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ Pollution Alert         │ │
│ │ Mar 10, 6:00 AM         │ │
│ │ ✓ PAID: ₹280            │ │
│ │ Transaction: TXN-12344  │ │
│ └─────────────────────────┘ │
├─────────────────────────────┤
│ [Home] [Policy] [Claims][👤] │
└─────────────────────────────┘
```

**Claim Breakdown Modal** (on "View Breakdown"):
```
┌─────────────────────────────┐
│ ✕ Claim Details             │
├─────────────────────────────┤
│ CALCULATION BREAKDOWN       │
├─────────────────────────────┤
│ Daily Baseline: ₹650        │
│ Loss Duration: 4 hours      │
│ Coverage %: 80%             │
│ Multiplier: 1.0x            │
├─────────────────────────────┤
│ (650 × 4÷8 × 0.80) = ₹260  │
├─────────────────────────────┤
│ Claims Timeline:            │
│ ┌──────────────────────────┐│
│ │ ✓ Trigger Detected 2:00PM││
│ │ ✓ GPS Verified   2:05PM  ││
│ │ ✓ AI Approved    2:15PM  ││
│ │ ✓ Payout Sent    2:20PM  ││
│ └──────────────────────────┘│
├─────────────────────────────┤
│ [Close] [Report Issue]      │
└─────────────────────────────┘
```

**Components**:
- `ActiveClaimCard`: Status, amount, breakdown CTA
- `PastClaimCard`: Status badge, amount, transaction ID
- `ClaimBreakdownModal`: Step-by-step calculation, timeline
- `ClaimTimeline`: Processing stages with timestamps

---

### Screen 3: Policy Rules & Triggers
**Route**: `/rider/policy`
```
┌─────────────────────────────┐
│ ← How Insurance Works       │
├─────────────────────────────┤
│ YOUR COVERAGE (Weekly)      │
│ ┌─────────────────────────┐ │
│ │ Premium: ₹149/week      │ │
│ │ Max Payout: ₹2,000/week │ │ (Info Card)
│ │ Coverage: 80% of income │ │
│ │ Valid: Mon-Sun          │ │
│ └─────────────────────────┘ │
├─────────────────────────────┤
│ WHAT TRIGGERS CLAIMS?       │
│ ┌─────────────────────────┐ │
│ │ 🌧️  HEAVY RAIN          │ │
│ │ Threshold: 20mm+ in 1hr │ │ (Block)
│ │ Your Zone: Delhi        │ │
│ │ Triggers: Auto Claim    │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ 💨 POOR AIR QUALITY     │ │
│ │ Threshold: AQI >300     │ │
│ │ Your Zone: Delhi        │ │
│ │ Triggers: Auto Claim    │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ 🚫 CURFEW/LOCKDOWN     │ │
│ │ Threshold: Alert issued │ │
│ │ Your Zone: All zones    │ │
│ │ Triggers: Auto Claim    │ │
│ └─────────────────────────┘ │
├─────────────────────────────┤
│ ⚡ AUTO-PROCESSED           │
│ Claims are verified by AI   │
│ in <5 minutes. No manual    │
│ forms needed!               │
├─────────────────────────────┤
│ [Home] [Policy] [Claims][👤] │
└─────────────────────────────┘
```

**Components**:
- `CoverageInfoCard`: Premium, max payout, dates
- `TriggerRuleBlock`: Icon, name, threshold, zone
- `InfoBanner`: Key messaging about auto-processing

---

### Screen 4: User Profile
**Route**: `/rider/profile`
```
┌─────────────────────────────┐
│ ← Profile                   │
├─────────────────────────────┤
│         👤 RAJESH K.        │ (Avatar)
│      Delivery Partner       │
│      Tier: Gold (⭐⭐⭐)    │
├─────────────────────────────┤
│ ACCOUNT INFO                │
│ Phone: +91 98765-43210      │ (Block)
│ Email: rajesh@mail.com      │
│ KYC: ✓ Verified             │
│ Zone: Delhi NCR             │
├─────────────────────────────┤
│ PAYMENT METHOD              │
│ UPI: raj...@okaxis          │ (Card)
│ [Change Method]             │
├─────────────────────────────┤
│ PREFERENCES                 │
│ Language: English ▼         │ (Dropdown)
│ Notifications: Enabled      │ (Toggle)
│ Dark Mode: Off              │ (Toggle)
├─────────────────────────────┤
│ COMMUNITY POOL              │
│ Your Contribution: ₹0       │ (Info)
│ Pool Balance: ₹45,230       │
│ [Learn More]                │
├─────────────────────────────┤
│ [Log Out]                   │ (Button)
├─────────────────────────────┤
│ [Home] [Policy] [Claims][👤] │
└─────────────────────────────┘
```

**Components**:
- `UserProfileHeader`: Avatar, name, tier
- `AccountInfoBlock`: Phone, email, KYC status, zone
- `PaymentMethodCard`: UPI masked, change CTA
- `PreferencesSection`: Language, notifications, theme
- `CommunityPoolCard`: Contribution, balance, info

---

### Bottom Navigation (All Screens)
```
┌─────────────────────────────┐
│         4-Tab Bar           │
├─────────────────────────────┤
│ 🏠 Home | 📋 Policy |       │
│ 🎯 Claims | 👤 Profile     │
│         (iOS-style)         │
└─────────────────────────────┘
```

**Components**:
- `BottomNav`: Minimal 4-tab navigation, icons + labels
- Active state: Bold + highlighted
- Inactive state: Gray, lighter

---

## 3. ADMIN WEB DASHBOARD (DESKTOP-FIRST)

### Layout Structure
```
┌──────────────────────────────────────────────┐
│ Paraswift Admin | Trigger Alerts (🔴 3) | 👤 │ (Topbar)
├──────────────────────────────────────────────┤
│ Overview | Risk Map | Fraud Alerts | Queue   │ (Nav)
│ Payouts | Riders | Triggers | Settings      │
├──────────────────────────────────────────────┤
│                                              │
│  [Main Content Area]                         │
│                                              │
└──────────────────────────────────────────────┘
```

---

### Screen 1: Admin Overview Dashboard
**Route**: `/admin/dashboard`
```
┌──────────────────────────────────────────────┐
│ Overview                                     │
├──────────────────────────────────────────────┤
│
│ KPI CARDS (Row 1)
│ ┌──────────┐  ┌──────────┐  ┌──────────┐
│ │ Users    │  │ Active   │  │ Payouts  │
│ │ 12,450   │  │ Policies │  │ Today    │
│ │ ↑ 8.2%   │  │ 8,932    │  │ ₹2.3M    │
│ └──────────┘  └──────────┘  └──────────┘
│ ┌──────────┐
│ │ Fraud    │
│ │ Alerts   │
│ │ 7 (High) │
│ └──────────┘
│
│ RECENT PAYOUTS FEED (Row 2)
│ ┌─────────────────────────────────────┐
│ │ Timestamp| User  | Amount | Status  │
│ ├─────────────────────────────────────┤
│ │09:45 AM |Rajesh │₹350   | ✓ Sent  │
│ │09:32 AM |Priya  │₹420   | ✓ Sent  │
│ │09:15 AM |Kumar  │₹280   | ⏳ Pending│
│ │08:50 AM |Anita  │₹560   | ✓ Sent  │
│ └─────────────────────────────────────┘
│
│ TRIGGER SUMMARY (Row 3)
│ ┌────────────────────────────────────┐
│ │ Trigger     | Active | Claims Today│
│ ├────────────────────────────────────┤
│ │ Heavy Rain  │    5   │     234     │
│ │ High AQI    │    2   │      89     │
│ │ Curfew      │    0   │       0     │
│ │ Heat Wave   │    1   │      45     │
│ └────────────────────────────────────┘
│
└──────────────────────────────────────────────┘
```

**Components**:
- `KPICard`: Metric value, percentage change, trend
- `PayoutsFeed`: Paginated list, timestamp, status, amount
- `TriggerSummary`: Table with active count, daily claims

---

### Screen 2: Trigger Management
**Route**: `/admin/triggers`
```
┌──────────────────────────────────────────────┐
│ Trigger Management                           │
├──────────────────────────────────────────────┤
│ [Add New Trigger] | Filters: City ▼          │
│
│ TRIGGER TABLE
│ ┌────────────────────────────────────────────┐
│ │ Name      │ Category │ Status │ Zones │ Th │
│ ├────────────────────────────────────────────┤
│ │ Heavy Rain│ Weather  │ ✓ ON  │ 12   │20mm │
│ │ High AQI  │ Air      │ ✓ ON  │  8   │300 │
│ │ Curfew    │ Civic    │ ✗ OFF │  0   │-   │
│ │ Heat Wave │ Weather  │ ✓ ON  │  5   │45°C │
│ │ Strike    │ Civic    │ ✓ ON  │ 15   │-   │
│ └────────────────────────────────────────────┘
│
│ QUICK EDIT PANEL (On Row Click)
│ ┌────────────────────────────────────────────┐
│ │ Trigger: Heavy Rain                        │
│ │ Category: Weather                          │
│ │ Status: [✓ Enabled] [✗ Disabled]          │
│ │ Zones: Delhi(98.5%), Bangalore(87.3%)...  │
│ │ Threshold: 20mm/hour                      │
│ │ Data Source: OpenWeather API               │
│ │ Last Updated: 2 mins ago                   │
│ │ [Save] [Cancel]                            │
│ └────────────────────────────────────────────┘
│
└──────────────────────────────────────────────┘
```

**Components**:
- `TriggerTable`: List, status toggle, quick edit
- `QuickEditPanel`: Inline form, zones, threshold
- `AddTriggerModal`: Form to create new triggers

---

### Screen 3: Fraud Detection Panel
**Route**: `/admin/fraud`
```
┌──────────────────────────────────────────────┐
│ Fraud Detection                              │
├──────────────────────────────────────────────┤
│
│ SUSPICIOUS CLUSTERS (Cards)
│ ┌──────────────────┐ ┌──────────────────┐
│ │ 🚨 SPIKE ALERT  │ │ 🚨 DEVICE RING  │
│ │ Delhi Rain      │ │ Same Device,     │
│ │ 234 claims in   │ │ 12 Accounts,     │
│ │ 2 hours (3x avg)│ │ Different Cities │
│ │ Risk: High      │ │ Risk: Very High  │
│ │ [Investigate]   │ │ [Investigate]    │
│ └──────────────────┘ └──────────────────┘
│ ┌──────────────────┐
│ │ 🔔 BEHAVIOR     │
│ │ Anomaly 5 claims│
│ │ < 30 sec apart  │
│ │ GPS jumps 50km  │
│ │ Risk: Medium    │
│ │ [Investigate]   │
│ └──────────────────┘
│
│ METRICS SUMMARY
│ ┌─────────────────────────────────────┐
│ │ Flagged Today  : 23                 │
│ │ Auto-Rejected  : 8                  │
│ │ Sent to Queue  : 15                 │
│ │ Analyst Approved: 12                │
│ │ Analyst Rejected: 3                 │
│ └─────────────────────────────────────┘
│
└──────────────────────────────────────────────┘
```

**Components**:
- `SuspiciousClusterCard`: Alert icon, title, details, CTA
- `MetricsSummary`: KPIs for fraud funnel
- `InvestigatePanel`: Deep dive into fraud case (modal)

---

### Screen 4: Analyst Review Queue
**Route**: `/admin/analyst-queue`
```
┌──────────────────────────────────────────────┐
│ Analyst Review Queue (15 pending)            │
├──────────────────────────────────────────────┤
│ Filters: Status ▼ | Priority ▼               │
│
│ FLAGGED CLAIMS TABLE
│ ┌────────────────────────────────────────────┐
│ │ User  │Trust│GPS  │Behavior│Priority│Actio│
│ ├────────────────────────────────────────────┤
│ │Rajesh │62%  │⚠️   │Normal │HIGH   │[👁]  │
│ │Priya  │45%  │✗    │Spike  │URGENT │[👁]  │
│ │Kumar  │71%  │✓    │Normal │MED    │[👁]  │
│ │Anita  │88%  │✓    │Normal │LOW    │[👁]  │
│ └────────────────────────────────────────────┘
│
│ DETAILED REVIEW PANEL (On Row Click)
│ ┌────────────────────────────────────────────┐
│ │ CLAIM DETAILS                              │
│ │ User: Rajesh Kumar                         │
│ │ Amount: ₹350 | Trigger: Heavy Rain         │
│ │ Trust Score: 62% ⚠️                        │
│ │                                            │
│ │ FRAUD SIGNALS                              │
│ │ • GPS: Outside disruption zone (50km away)│
│ │ • Device: Matches 2 other flagged accounts│
│ │ • Behavior: Normal (3-4 claims/month avg) │
│ │ • Weather: Confirmed via OpenWeather      │
│ │                                            │
│ │ RIDER HISTORY                              │
│ │ Total Claims: 8 | Paid: 7 | Rejected: 1   │
│ │ Avg Trust: 82% | Tier: Gold                │
│ │                                            │
│ │ [✓ APPROVE] [✗ REJECT] [⏸ INVESTIGATE]   │
│ └────────────────────────────────────────────┘
│
└──────────────────────────────────────────────┘
```

**Components**:
- `FlaggedClaimsTable`: Claim info, signals, priority
- `DetailedReviewPanel`: Full claim + rider context + signals
- `ApproveRejectButtons`: Action buttons with states

---

### Screen 5: Payouts Management
**Route**: `/admin/payouts`
```
┌──────────────────────────────────────────────┐
│ Payouts                                      │
├──────────────────────────────────────────────┤
│ Date Range: [This Week ▼]                    │
│ Status Filter: [All ▼]                       │
│
│ PAYOUT SUMMARY
│ Total Approved: 324 claims | ₹98,560
│ Total Rejected: 18 claims  | ₹4,230
│ Total Pending:   8 claims  | ₹2,890
│
│ PAYOUT LOG TABLE
│ ┌────────────────────────────────────────────┐
│ │ Time    │ User   │Amount│Reason      │Statu│
│ ├────────────────────────────────────────────┤
│ │09:45 AM │Rajesh │₹350 │Rain        │✓Sent│
│ │09:32 AM │Priya  │₹420 │AQI Alert   │✓Sent│
│ │09:15 AM │Kumar  │₹280 │Curfew      │⏳Pnd│
│ │08:50 AM │Anita  │₹560 │Rain+AQI    │✓Sent│
│ │08:30 AM │Dev    │₹0   │Rejected    │✗Rej│
│ └────────────────────────────────────────────┘
│
│ PAYMENT GATEWAY STATUS
│ Razorpay: ✓ Connected | Last Sync: 3 mins ago
│ Success Rate: 99.8% | Failed Retries: 2
│
└──────────────────────────────────────────────┘
```

**Components**:
- `PayoutSummary`: Stats by status, total amounts
- `PayoutLogTable`: Full transaction history
- `PaymentGatewayStatus`: API connection status

---

### Screen 6: Riders Management
**Route**: `/admin/riders`
```
┌──────────────────────────────────────────────┐
│ Riders Database                              │
├──────────────────────────────────────────────┤
│ Search: [_______________] | Zone: [Delhi ▼] │
│
│ RIDERS TABLE
│ ┌────────────────────────────────────────────┐
│ │ Name   │ Phone │Coverage│Tier │Claims│Paid│
│ ├────────────────────────────────────────────┤
│ │Rajesh │9876543│ ✓ Active│Gold │8    │7   │
│ │Priya  │9876542│ ✓ Active│Silver│12   │11  │
│ │Kumar  │9876541│ ✗ Expired│Bronze│3   │3   │
│ │Anita  │9876540│ ✓ Active│Gold │15   │14  │
│ │Dev    │9876539│ ⏳Pending│-   │0    │0   │
│ └────────────────────────────────────────────┘
│
│ RIDER DETAIL VIEW (On Click)
│ ┌────────────────────────────────────────────┐
│ │ Rajesh Kumar | +91 98765-43210 | Gold Tier│
│ │                                            │
│ │ Coverage: ✓ Active (Mon-Sun)               │
│ │ Premium: ₹149/week | Last Paid: Mar 17    │
│ │ Baseline Earnings: ₹650/day                │
│ │ Work Zone: Delhi NCR                       │
│ │                                            │
│ │ CLAIM STATS                                │
│ │ Total Claims: 8 | Approved: 7 | Rejected:1│
│ │ Total Paid: ₹2,380 | Avg Claim: ₹340      │
│ │                                            │
│ │ TRUST INDICATORS                           │
│ │ Average Trust Score: 82%                   │
│ │ GPS Accuracy: 95%                          │
│ │ Claim Rate: 0.8 claims/week (Normal)      │
│ │                                            │
│ │ [Edit Profile] [Suspend] [KYC Verify]     │
│ └────────────────────────────────────────────┘
│
└──────────────────────────────────────────────┘
```

**Components**:
- `RidersTable`: Search, filter by zone, coverage status
- `RiderDetailView`: Full profile, stats, trust indicators

---

### Topbar Navigation
```
┌──────────────────────────────────────────────┐
│ Paraswift Admin | 🔴 3 High Alerts |  👤 Admin│
├──────────────────────────────────────────────┤
│ Overview | Risk Map | Fraud Alerts | Queue   │
│ Payouts | Riders | Triggers | Settings      │
└──────────────────────────────────────────────┘
```

**Components**:
- `AdminTopbar`: Logo, alert bell, user dropdown
- `AdminNavigation`: Horizontal menu with active state

---

## 4. AUTHENTICATION FLOWS

### Rider Flow
```
START
  ↓
[/] Landing Page
  ↓ (No Auth)
[/rider/register] Rider Phone OTP
  ↓ (Enter OTP)
[/rider/onboarding] Persona Selection + KYC
  ↓ (Complete)
[/rider/home] Home Dashboard (Protected)
```

### Admin Flow
```
START
  ↓
[/admin/login] Email + Password
  ↓ (Credentials verified via backend API)
[/admin/dashboard] Overview Dashboard (Protected)
  ↓ (Can navigate all admin routes)
```

---

## 5. COMPONENT DIRECTORY STRUCTURE

```
frontend/
├── app/
│   ├── (auth)/
│   │   ├── register/              # Rider OTP signup
│   │   ├── onboarding/            # Persona + KYC
│   │   └── layout.tsx
│   │
│   ├── (rider)/                   # Protected rider routes
│   │   ├── home/
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   ├── claims/
│   │   │   └── page.tsx
│   │   ├── policy/
│   │   │   └── page.tsx
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   └── layout.tsx             # Bottom nav layout
│   │
│   ├── (admin)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── triggers/
│   │   │   └── page.tsx
│   │   ├── fraud/
│   │   │   └── page.tsx
│   │   ├── analyst-queue/
│   │   │   └── page.tsx
│   │   ├── payouts/
│   │   │   └── page.tsx
│   │   ├── riders/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   └── layout.tsx             # Topbar nav layout
│   │
│   ├── page.tsx                   # Landing page
│   ├── layout.tsx                 # Root layout
│   └── globals.css
│
├── components/
│   ├── rider/
│   │   ├── HomeHeader.tsx
│   │   ├── CoverageStatusBadge.tsx
│   │   ├── PremiumCard.tsx
│   │   ├── RiskForecastTimeline.tsx
│   │   ├── ActiveTriggersAlert.tsx
│   │   ├── EarningsSummary.tsx
│   │   ├── ClaimCard.tsx
│   │   ├── ClaimBreakdownModal.tsx
│   │   ├── BottomNav.tsx
│   │   └── [other rider components]
│   │
│   ├── admin/
│   │   ├── AdminTopbar.tsx
│   │   ├── AdminNavigation.tsx
│   │   ├── KPICard.tsx
│   │   ├── PayoutsFeed.tsx
│   │   ├── TriggerSummary.tsx
│   │   ├── TriggerTable.tsx
│   │   ├── SuspiciousClusterCard.tsx
│   │   ├── FlaggedClaimsTable.tsx
│   │   ├── AdminLoginForm.tsx
│   │   └── [other admin components]
│   │
│   ├── shared/
│   │   ├── Navbar.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── AdminProtectedRoute.tsx
│   │   ├── Modal.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── [other shared components]
│   │
│   └── lib/
│       ├── firebase.ts
│       └── apiClient.ts
│
└── styles/
    ├── globals.css
    └── tailwind.config.ts
```

---

## 6. SYSTEM CONNECTIONS (DATA FLOW)

```
┌─────────────────────────────────────────────┐
│  BACKEND API                                │
├─────────────────────────────────────────────┤
│ • POST /api/v1/riders/register    (OTP)     │
│ • POST /api/v1/riders/verify-otp           │
│ • GET  /api/v1/riders/{id}/profile         │
│ • GET  /api/v1/policies/active             │
│ • POST /api/v1/policies/renew              │
│ • GET  /api/v1/claims/{id}                 │
│ • GET  /api/v1/triggers/active             │
│ • POST /api/v1/admin/login        (Email)  │
│ • GET  /api/v1/admin/dashboard             │
│ • GET  /api/v1/admin/fraud-alerts          │
│ • POST /api/v1/admin/claims/{id}/review    │
│ • GET  /api/v1/admin/payouts               │
│ • GET  /api/v1/admin/triggers              │
│ • POST /api/v1/admin/triggers/{id}/toggle  │
└─────────────────────────────────────────────┘

FLOW:
┌──────────────┐
│ Rider App    │◄────────────────────┐
└──────────────┘                      │
      ↓ (Home/Claims/Profile)        │
   [Fetch Active Policies]            │   [Firebase Listeners]
      ↓                               │   [Real-time Updates]
┌──────────────┐                      │
│ NextJS       │                      │
│ Frontend     │                      │
└──────────────┘                      │
      ↓                               │
  [API Call]                          │
      ↓                               │
┌──────────────┐                      │
│ FastAPI      │                      │
│ Backend      │                      │
└──────────────┘                      │
      ↓                               │
  ┌─────────────────────┐             │
  │ Firebase/Firestore  │─────────────┤
  │ • Policies          │             │
  │ • Claims            │             │
  │ • Triggers          │             │
  │ • Users             │             │
  └─────────────────────┘             │
      ↓                               │
  ┌─────────────────────┐             │
  │ External APIs       │             │
  │ • Weather (15 min)  │             │
  │ • AQI               │             │
  │ • Payment Gateway   │             │
  └─────────────────────┘             │
      ↓                               │
   [Triggers Activated]               │
   [Auto-Claims Created]              │
   [AI Fraud Detection]               │
      ↓                               │
┌──────────────────────────────┐      │
│ Admin Fraud Detection Panel  │      │
│ • Suspicious Clusters       │      │
│ • Review Queue              │      │
│ • Payout Triggers           │      │
└──────────────────────────────┘      │
      ↓                               │
   [Admin Approves/Rejects]           │
      ↓                               │
   [Payout Initiated]                 │
      ↓                               │
   [Update Firestore]                 │
      └───────────────────────────────┘
   [Real-time Listener Notifies Client]
```

---

## 7. STYLING & DESIGN TOKENS

### Color Palette
```
Brand: #3B82F6 (Blue)
Success: #10B981 (Green)
Warning: #F59E0B (Amber)
Error: #EF4444 (Red)
Neutral: #6B7280 (Gray)
Background: #F9FAFB (Light) / #111827 (Dark)
```

### Typography
```
Font Family: Inter (Web), SF Pro (Mobile)
Headings: 600-700 weight, 24-32px
Body: 400-500 weight, 14-16px
Labels: 500 weight, 12-14px
```

### Spacing
```
xs: 4px
sm: 8px
md: 12px
lg: 16px
xl: 24px
2xl: 32px
```

### Shadows
```
Soft: 0 1px 3px rgba(0,0,0,0.1)
Medium: 0 4px 6px rgba(0,0,0,0.1)
Large: 0 10px 25px rgba(0,0,0,0.15)
```

---

## 8. RESPONSIVE DESIGN

### Breakpoints
```
Mobile: 320px - 639px
Tablet: 640px - 1023px
Desktop: 1024px+
```

### Rider App
- **Mobile**: Full-screen, bottom nav
- **Tablet**: Centered max-width (600px), bottom nav
- **Desktop**: Centered max-width (600px), option to expand

### Admin Dashboard
- **Mobile**: Horizontal scroll, collapsed nav
- **Tablet**: Side-by-side layout, collapsible sidebar
- **Desktop**: Full sidebar, multi-column grid

---

## 9. KEY INTERACTIONS

### Real-time Updates (Firestore Listeners)
- Rider sees claim status updates instantly
- Admin sees new fraud alerts as they trigger
- Payout status updates reflect immediately

### Modal Flows
- Claim breakdown (read-only deep-dive)
- Fraud investigation (detailed context + decision)
- Trigger edit panel (toggle + threshold adjustment)

### Toast Notifications
- "Policy renewed successfully"
- "Payout initiated"
- "Fraud alert flagged"
- "Admin action needed"

---

## 10. IMPLEMENTATION PRIORITY

### Phase 1 (MVP)
✅ Rider: Home, Claims, Profile screens
✅ Admin: Login, Dashboard, Fraud Panel
✅ Authentication (Rider OTP, Admin Email)
✅ Real-time Firestore listeners

### Phase 2
✅ Admin: Analyst Queue, Payouts, Triggers
✅ Rider: Policy screen
✅ Advanced fraud visualization

### Phase 3
✅ Analytics dashboards
✅ Admin reports + exports
✅ Multi-language support (Rider)
✅ Push notifications
