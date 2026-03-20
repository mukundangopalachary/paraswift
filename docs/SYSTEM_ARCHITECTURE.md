# System Architecture & Integration Guide

## Complete Data Flow

### Request Flow Diagram

```
┌────────────────────────────────────────────────────────────────────┐
│                    PARASWIFT SYSTEM ARCHITECTURE                    │
└────────────────────────────────────────────────────────────────────┘

LAYER 1: USER INTERFACES
┌──────────────────────┐         ┌──────────────────────┐
│  RIDER APP           │         │  ADMIN WEB DASHBOARD │
│  (Next.js + React)   │         │  (Next.js + React)   │
├──────────────────────┤         ├──────────────────────┤
│ • Home Dashboard     │         │ • Overview KPIs      │
│ • Claims Tracker     │         │ • Fraud Detection    │
│ • Policy Rules       │         │ • Analyst Queue      │
│ • Profile            │         │ • Trigger Mgmt       │
│ • Bottom Nav         │         │ • Payouts            │
└──────────────────────┘         │ • Riders DB          │
         ↓                       └──────────────────────┘
         │                               ↓
         └───────────────┬───────────────┘
                         ↓
    ┌────────────────────────────────────────┐
    │  INTERNET                              │
    │  (HTTP/HTTPS, WebSockets, REST APIs)  │
    └────────────────────────────────────────┘
                         ↓
    ┌────────────────────────────────────────┐
    │  AUTHENTICATION & SESSION MGMT         │
    ├────────────────────────────────────────┤
    │ Rider: Firebase Auth (OTP)             │
    │ Admin: JWT (Email/Password)            │
    │ Token Storage: localStorage            │
    └────────────────────────────────────────┘
                         ↓
LAYER 2: API GATEWAY
┌────────────────────────────────────────┐
│  FastAPI Backend                       │
│  (Port: 8000)                         │
├────────────────────────────────────────┤
│ Routes:                                │
│  /api/v1/riders/*                     │
│  /api/v1/policies/*                   │
│  /api/v1/admin/*                      │
│  /api/v1/webhooks/*                   │
│  /health                              │
└────────────────────────────────────────┘
         ↓        ↓       ↓        ↓
      ┌──┴─────────┴───────┴────────┴---┐
      │                                  │
LAYER 3: MICROSERVICES
┌─────────────────────┐  ┌──────────────────────┐
│ User Service        │  │ Policy Service       │
├─────────────────────┤  ├──────────────────────┤
│ • Auth (OTP)        │  │ • Policy cycles      │
│ • Profile Mgmt      │  │ • Premium calc       │
│ • KYC verification  │  │ • Coverage status    │
└─────────────────────┘  └──────────────────────┘

┌─────────────────────┐  ┌──────────────────────┐
│ Claims Service      │  │ Fraud Detection      │
├─────────────────────┤  ├──────────────────────┤
│ • Auto-claim gen    │  │ • GPS analyze        │
│ • Claim tracking    │  │ • Device matching    │
│ • Payout calcs      │  │ • Behavior scoring   │
│ • Claim history     │  │ • Fraud alerts       │
└─────────────────────┘  └──────────────────────┘

┌─────────────────────┐  ┌──────────────────────┐
│ Trigger Service     │  │ Admin Service        │
├─────────────────────┤  ├──────────────────────┤
│ • Weather polling   │  │ • Analyst queue      │
│ • AQI monitoring    │  │ • Review/approve     │
│ • Trigger status    │  │ • Payout mgmt        │
│ • Zone management   │  │ • Reports            │
└─────────────────────┘  └──────────────────────┘
         │        │          │        │
         │        │          │        │
         └────────┼──────────┼────────┘
                  │          │
                  ↓          ↓
LAYER 4: DATA PERSISTENCE
┌──────────────────────────────────────────────┐
│         FIREBASE (Google Cloud)              │
├──────────────────────────────────────────────┤
│                                              │
│  Cloud Firestore (NoSQL Database)           │
│  ├── /users/{uid}                           │
│  │   ├── phone                              │
│  │   ├── persona (Food/E-com/Grocery)      │
│  │   ├── baseline_earnings                  │
│  │   ├── work_zone                          │
│  │   └── kyc_status                         │
│  │                                          │
│  ├── /policies/{policy_id}                  │
│  │   ├── user_id                            │
│  │   ├── start_date / end_date              │
│  │   ├── premium_amount                     │
│  │   ├── coverage_limit                     │
│  │   └── status (Active/Expired)            │
│  │                                          │
│  ├── /claims/{claim_id}                     │
│  │   ├── policy_id                          │
│  │   ├── trigger_id                         │
│  │   ├── calculated_payout                  │
│  │   ├── ai_fraud_score                     │
│  │   └── status (Auto-Approved/Flagged)     │
│  │                                          │
│  ├── /triggers/{trigger_id}                 │
│  │   ├── type (Rain/AQI/Curfew)            │
│  │   ├── threshold_value                    │
│  │   ├── location_geofence                  │
│  │   └── data_source (API/Mock)             │
│  │                                          │
│  ├── /transactions/{txn_id}                 │
│  │   ├── user_id                            │
│  │   ├── amount                             │
│  │   ├── type (Credit/Debit)                │
│  │   └── timestamp                          │
│  │                                          │
│  └── /analytics/*                           │
│      ├── fraud_logs                         │
│      ├── risk_stats (by city/zone)          │
│      └── prediction_logs                    │
│                                              │
│  Firebase Authentication                    │
│  ├── Phone OTP (Riders)                    │
│  ├── Email/Password (Admins - custom)      │
│  └── Session management                     │
│                                              │
│  Firebase Storage                           │
│  ├── User KYC documents                     │
│  └── Uploaded identification                │
│                                              │
│  Cloud Functions (Triggers)                 │
│  ├── /weather (15min poll)                 │
│  ├── /claim-auto-gen                        │
│  ├── /fraud-analysis                        │
│  ├── /payout-dispatch                       │
│  └── /analytics-compute                     │
│                                              │
└──────────────────────────────────────────────┘
         │              │              │
         ├──────────────┼──────────────┤
         ↓              ↓              ↓
LAYER 5: EXTERNAL APIS & SERVICES
┌─────────────────┐  ┌──────────────┐  ┌──────────────┐
│  OpenWeather    │  │ AQI API      │  │ Payment      │
│  • 15min polls  │  │ • Air quality│  │ Gateway      │
│  • Rainfall     │  │ • Thresholds │  │ • Razorpay   │
│  • Temperature  │  │ • Zones      │  │ • Payouts    │
│  • Wind speed   │  │ • Real-time  │  │ • Webhooks   │
└─────────────────┘  └──────────────┘  └──────────────┘

│  SMS Gateway        │  Analytics
│  • OTP delivery     │  • Google Analytics
│  • Notifications    │  • Retention
└─────────────────────┴──────────────┘

                         │
                         ↓
LAYER 6: MONITORING & LOGGING
┌──────────────────────────────────────┐
│  Cloud Logging & Monitoring          │
├──────────────────────────────────────┤
│ • API request logs                   │
│ • Fraud detection logs               │
│ • Payment transaction logs           │
│ • Error tracking                     │
│ • Performance metrics                │
│ • System health                      │
└──────────────────────────────────────┘
```

---

## Event Flow: Claim Generation & Payout

```
TIME: 14:32 UTC | Event: Heavy Rain (25mm) Detected in Delhi

Step 1: TRIGGER DETECTION
┌─────────────────────┐
│ OpenWeather API     │ (15 min interval)
│ Reports: 25mm rain  │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ Backend Service     │
│ /webhooks/trigger   │
│ → Checks against    │
│   threshold (20mm)  │
│ → Match! Create     │
│   trigger event     │
└──────────┬──────────┘
           ↓
Firestore: /triggers/{trigger_001}
├── type: "Heavy Rain"
├── threshold: "20mm+"
├── location: "Delhi NCR"
├── timestamp: "2026-03-20 14:32:00"
└── active_policies_affected: [8,932]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 2: AUTO-CLAIM GENERATION (Cloud Function)
┌─────────────────────────┐
│ Trigger: Firestore     │
│ Event on /triggers     │
│ → Heavy_Rain_Detected  │
└──────────┬──────────────┘
           ↓
┌──────────────────────────────────────────┐
│ Cloud Function: auto_generate_claims()   │
├──────────────────────────────────────────┤
│ 1. Query all active policies in zone     │
│    → SELECT * FROM policies              │
│    WHERE zone = "Delhi" AND status = ... │
│    → Found: 8,932 active riders          │
│                                          │
│ 2. For each rider, create claim:         │
│    claim = {                             │
│      policy_id: xxx,                     │
│      trigger_id: trigger_001,            │
│      loss_duration: 4 hours,             │
│      calculated_payout: ?,               │
│      status: "pending_fraud_check",      │
│      timestamp: now                      │
│    }                                     │
│                                          │
│ 3. Calculate payout (in service):        │
│    baseline = ₹650/day                  │
│    hours_lost = 4                        │
│    coverage_pct = 80%                    │
│    multiplier = 1.0x                     │
│    payout = (650 × 4÷8) × 0.80 × 1.0   │
│           = ₹260                        │
│                                          │
│ 4. Store claim: Firestore                │
│    /claims/{claim_001}                   │
│                                          │
│ ✓ Generated 8,932 claims in < 5 sec     │
└──────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 3: FRAUD DETECTION & ANALYSIS (ML Pipeline)
┌─────────────────────────────────────┐
│ Trigger: New Claims Created         │
│ → Firestore listener on /claims     │
└──────────┬──────────────────────────┘
           ↓
┌──────────────────────────────────────────┐
│ Fraud Detection Service (AI/ML Model)    │
├──────────────────────────────────────────┤
│ For each claim, analyze:                 │
│                                          │
│ 1. GPS Analysis                          │
│    • User current location               │
│    • Disruption zone center              │
│    • Distance check (< 10km?)            │
│    • Recent location history             │
│    • GPS accuracy vs normal              │
│                                          │
│ 2. Behavior Analysis                    │
│    • Claim frequency (3-4/mo avg)        │
│    • Time patterns (typical work hours?) │
│    • Historical claim acceptance rate    │
│    • Similar to other riders             │
│                                          │
│ 3. Device Analysis                       │
│    • Device ID                           │
│    • Device matches other accounts?      │
│    • Location jumps (> 100km/hour?)      │
│    • Multiple devices per user?          │
│                                          │
│ 4. Cross-Check External Data             │
│    • Weather API confirmation            │
│    • AQI API confirmation                │
│    • Historical patterns                 │
│    • Peer data (any claims in same area?)│
│                                          │
│ Generates: ai_fraud_score (0-1.0)       │
│   Score < 0.2  → Low risk ✓ Auto-Approve│
│   Score 0.2-0.8 → Medium risk → Analyst│
│   Score > 0.8   → High risk ✗ Flag     │
│                                          │
│ Example Results:                         │
│   Claim_001: Score 0.12 (Approve)       │
│   Claim_002: Score 0.65 (Analyst)       │
│   Claim_003: Score 0.92 (Reject)        │
│                                          │
└──────────────────────────────────────────┘
           ↓
         Split
        /    \
       /      \
      ↓        ↓
┌─────────┐  ┌───────────────┐
│Auto-App │  │ Flag for      │
│rovable  │  │ Analyst       │
│(70%)    │  │ Review (30%)  │
└────┬────┘  └────────┬──────┘
     │               │

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 4A: AUTO-APPROVAL PATH (70%)
┌────────────────────────────────┐
│ Low-Risk Claims (score < 0.2)  │
├────────────────────────────────┤
│ Status → "auto_approved"       │
│ Next → Payout Dispatch         │
└────────┬───────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ Cloud Function: dispatch_payouts()     │
├────────────────────────────────────────┤
│ 1. Collect approved claims             │
│ 2. Call Payment Gateway API:           │
│    POST /razorpay/payout               │
│    {                                   │
│      user_id: "rider_001",             │
│      amount: 260.00,                   │
│      method: "UPI",                    │
│      reason: "Heavy Rain Claim"        │
│    }                                   │
│ 3. If success:                         │
│    • Update claim: status = "paid"     │
│    • Record transaction                │
│    • Firestore listener notifies app   │
│ 4. Update rider dashboard:             │
│    "Payout: ₹260 sent at 2:45 PM"     │
│                                        │
│ ✓ Rider sees in-app notification       │
│ ✓ Money hits UPI account within 60sec  │
│                                        │
└────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 4B: MANUAL REVIEW PATH (30%)
┌────────────────────────────────┐
│ Medium/High-Risk Claims        │
│ (score 0.2-1.0)               │
├────────────────────────────────┤
│ Status → "flagged_for_review"  │
│ Sent to → /admin/analyst-queue │
└────────┬───────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ Admin Analyst Reviews                  │
├────────────────────────────────────────┤
│ URL: /admin/analyst-queue             │
│                                        │
│ See:                                   │
│ • Rider info & history                │
│ • Claim details (amount, trigger)     │
│ • Fraud signals (GPS, device, behav)  │
│ • Risk score from AI model            │
│ • Full calculation breakdown          │
│                                        │
│ Actions:                               │
│ [✓ APPROVE] [✗ REJECT] [⏸ INVESTIGATE]│
│                                        │
│ Decision path:                         │
│ If approved:                           │
│   • Update DB: status = "approved"    │
│   • Trigger payout (same as Step 4A)  │
│                                        │
│ If rejected:                           │
│   • Update DB: status = "rejected"    │
│   • Log reason in audit trail         │
│   • May appeal (future)               │
│                                        │
│ If investigate:                        │
│   • Status → "under_investigation"   │
│   • Analyst flags as suspicious case  │
│   • May escalate to compliance team   │
│                                        │
└────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FINAL STATE: Rider Dashboard Updates

Firestore Listener on rider's device:
/claims/{claim_001} → Changed!

Received Update:
{
  status: "paid",
  payout: ₹260,
  paid_at: "2026-03-20 14:45:32"
}

Rider App Notification:
✅ "Payout Received: ₹260"
   Heavy Rain coverage claim paid
   New balance: ₹4,510
   [View claim details]

Timeline shown to rider:
✓ 2:32 PM - Rain detected
✓ 2:35 PM - GPS verified
✓ 2:42 PM - AI approved (low fraud risk)
✓ 2:45 PM - Payout sent
```

---

## Admin Dashboard Flow

```
ADMIN LOGIN → Authentication → Dashboard

Dashboard Stats:
┌──────────────────────────────────────────┐
│ • Active Users: 12,450                   │
│ • Active Policies: 8,932                 │
│ • Payouts Today: ₹2.3M (+12.3%)         │
│ • Fraud Alerts: 7 (3 High, 2 Medium)    │
└──────────────────────────────────────────┘

Navigation Options:
1. Overview → KPIs + Recent Payouts
2. Risk Map → Geofenced trigger visualization (TODO)
3. Fraud Alerts → Suspicious clusters
4. Analyst Queue → Claims flagged by AI
5. Payouts → Transaction history
6. Riders → Delivery partner database
7. Triggers → Weather/AQI/Civic event mgmt
8. Settings → System config (TODO)

Typical Admin Workflow:
┌──────────────────────────────────────────────┐
│ 1. Login → /admin/login                      │
│ 2. See Dashboard → 7 fraud alerts raised     │
│ 3. Go to Fraud Alerts → /admin/fraud        │
│ 4. See suspicious clusters:                  │
│    • Spike: Delhi rain (234 claims, 3x avg) │
│    • Device Ring: 12 accounts, same device  │
│    • Behavior: 5 claims < 30 sec apart      │
│ 5. Click "Investigate" on device ring       │
│ 6. Go to Analyst Queue → /admin/analyst-q  │
│ 7. Review 15 flagged claims                 │
│ 8. For each claim:                          │
│    • Read trust score                       │
│    • Check fraud signals                    │
│    • View rider history                     │
│    • [Approve/Reject/Investigate]           │
│ 9. Close window → Returns to queue list     │
│ 10. See Payouts → /admin/payouts           │
│ 11. View ₹2.3M processed, 324 approved      │
│ 12. Manage Triggers → /admin/triggers      │
│ 13. Toggle triggers on/off by city/zone    │
│ 14. Logout                                  │
└──────────────────────────────────────────────┘
```

---

## API Response Examples

### Rider API: Get Claims
```json
GET /api/v1/riders/{id}/claims
Headers: Authorization: Bearer <firebase-token>

Response:
{
  "data": [
    {
      "claim_id": "CLM-001",
      "trigger": "Heavy Rain",
      "initiated": "2026-03-20 14:32",
      "amount": 350,
      "status": "paid",
      "timeline": [
        {"title": "Trigger Detected", "time": "14:32"},
        {"title": "GPS Verified", "time": "14:35"},
        {"title": "AI Approved", "time": "14:42"},
        {"title": "Payout Sent", "time": "14:45"}
      ]
    }
  ]
}
```

### Admin API: Get Fraud Alerts
```json
GET /api/v1/admin/fraud-alerts
Headers: Authorization: Bearer <jwt-token>

Response:
{
  "data": {
    "clusters": [
      {
        "id": "CLUSTER-001",
        "type": "SPIKE_ALERT",
        "title": "Delhi Rain Spike",
        "count": 234,
        "baseline": 78,
        "risk": "HIGH",
        "affected_claims": ["CLM-002", "CLM-003", ...]
      }
    ],
    "summary": {
      "flagged_today": 23,
      "auto_rejected": 8,
      "analyst_approved": 12,
      "analyst_rejected": 3
    }
  }
}
```

---

## Integration Checklist

### Backend Integration
- [ ] Firebase Admin SDK configured
- [ ] OTP flow implemented (riders)
- [ ] JWT auth implemented (admins)
- [ ] All rider API endpoints working
- [ ] All admin API endpoints working
- [ ] Fraud detection AI model integrated
- [ ] Webhook endpoints for external APIs
- [ ] Error handling & logging
- [ ] Rate limiting configured

### Frontend Integration
- [ ] API client (` lib/apiClient.ts`) connected
- [ ] All pages fetching real data
- [ ] WebSocket/Firestore listeners for real-time
- [ ] Error states handled
- [ ] Loading states shown
- [ ] Session management working
- [ ] Dark mode toggle working
- [ ] Responsive on all breakpoints
- [ ] Accessibility checks

### Firebase Configuration
- [ ] Firestore collections created
- [ ] Security rules deployed
- [ ] Indexes created for queries
- [ ] Cloud Functions deployed
- [ ] Storage rules configured
- [ ] Analytics tracking enabled
- [ ] Backups scheduled

### External APIs
- [ ] OpenWeather API integrated
- [ ] AQI API integrated
- [ ] Payment gateway (Razorpay) connected
- [ ] SMS provider integrated (OTP)
- [ ] Webhook endpoints tested
- [ ] Rate limiting respected
- [ ] Error handling for API failures

---

## Monitoring & Observability

### Key Metrics to Track
1. **API Performance**
   - Request latency (< 500ms target)
   - Error rate (< 1%)
   - Throughput (requests/sec)

2. **Fraud Detection**
   - False positive rate
   - True positive rate
   - Claims flagged vs auto-approved ratio

3. **Business Metrics**
   - Active riders
   - Active policies
   - Claims processed/day
   - Average payout amount
   - Payout latency

4. **System Health**
   - Uptime (99.9% target)
   - Database query performance
   - API availability
   - Third-party API status

### Alerting
- API response time > 1000ms → Alert
- Error rate > 5% → Alert
- Fraud false positive spike → Alert
- Payment gateway failure → Critical Alert
- Database query timeout → Alert

---

## Future Enhancements

1. **Real-Time Maps**
   - Add Risk Map visualization (Google Maps)
   - Show live trigger zones
   - Rider heat maps

2. **Advanced Analytics**
   - Predictive claims forecasting
   - Risk maps for insurers
   - Segment analysis by persona

3. **Mobile App**
   - React Native for iOS/Android
   - Push notifications
   - Offline support

4. **Multi-Language**
   - Hindi, Tamil, Kannada support
   - Right-to-left text support

5. **Extended Features**
   - Community pool management
   - Referral programs
   - Premium tiers
   - Seasonal triggers

---

**Document Version**: 1.0
**Last Updated**: March 20, 2026
**Status**: Implementation Guide
