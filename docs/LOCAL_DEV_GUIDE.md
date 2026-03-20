# Local Development Setup Guide

## Project Structure
```
paraswift/
├── frontend/              # Next.js React App
│   ├── app/              # App Router pages & layouts
│   ├── components/       # Reusable React components
│   ├── lib/              # Utilities & API client
│   ├── package.json
│   └── tsconfig.json
├── backend/              # FastAPI Python backend
│   ├── main.py           # Entry point
│   ├── core/             # Firebase, security, config
│   ├── models/           # Pydantic data models
│   ├── routers/          # API route handlers
│   ├── services/         # Business logic
│   ├── requirements.txt
│   └── serviceAccountKey.json
├── docs/                 # Documentation
├── SETUP_GUIDE.md        # Original setup instructions
└── SYSTEM_ARCHITECTURE.md # This document (new)
```

---

## Quick Start

### 1. Prerequisites
```bash
# Required:
- Node.js 18+ (npm 9+)
- Python 3.10+
- Firebase account
- Git

# Recommended:
- VSCode with Extensions:
  - Python
  - Thunder Client / Postman (API testing)
  - Tailwind CSS IntelliSense
```

### 2. Environment Setup

#### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Create .env.local
cat > .env.local << 'EOF'
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# API Backend URL
NEXT_PUBLIC_API_ROOT=http://localhost:8000/api/v1
EOF

# Start dev server
npm run dev
# Frontend: http://localhost:3000
```

#### Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cat > .env << 'EOF'
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CREDENTIALS_PATH=./serviceAccountKey.json
WEATHER_API_KEY=your_openweather_key
AQI_API_KEY=your_aqi_key
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
ENV=development
DEBUG=true
EOF

# Start backend server
python main.py
# Backend: http://localhost:8000
# API: http://localhost:8000/api/v1
# Docs: http://localhost:8000/docs
```

---

## Demo Credentials

### Rider Login
```
Method: OTP (Firebase)
Phone: +91-XXXXXXXXXX
(Use test phone configured in Firebase Console)
```

### Admin Login
```
Email: admin@paraswift.com
Password: admin123

Location: http://localhost:3000/admin/login
```

### Test Riders (Mock Data)
```
ID: rider_001 | Name: Raj Kumar | Phone: +91-9876543210
ID: rider_002 | Name: Priya Singh | Phone: +91-9876543211
ID: rider_003 | Name: Amit Patel | Phone: +91-9876543212
ID: rider_004 | Name: Sofia Khan | Phone: +91-9876543213
ID: rider_005 | Name: Deepak Roy | Phone: +91-9876543214
```

---

## API Testing

### Using Thunder Client (VSCode)
1. Install extension: Thunder Client
2. Create new request
3. Try these endpoints:

```
GET http://localhost:8000/api/v1/riders/rider_001/profile
Headers:
  Authorization: Bearer <firebase_token>

GET http://localhost:8000/api/v1/admin/dashboard
Headers:
  Authorization: Bearer <jwt_admin_token>

POST http://localhost:8000/api/v1/riders/verify-otp
Body:
  {
    "phone": "+91-9876543210",
    "otp": "123456"
  }

POST http://localhost:8000/api/v1/admin/login
Body:
  {
    "email": "admin@paraswift.com",
    "password": "admin123"
  }
```

### Using cURL
```bash
# Login (Admin)
curl -X POST http://localhost:8000/api/v1/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@paraswift.com",
    "password": "admin123"
  }'

# Get Dashboard
curl -X GET http://localhost:8000/api/v1/admin/dashboard \
  -H "Authorization: Bearer <your_jwt_token>"

# Get Rider Profile
curl -X GET http://localhost:8000/api/v1/riders/rider_001/profile \
  -H "Authorization: Bearer <firebase_token>"
```

---

## Workflow: From Rider to Payout

### 1. Rider Sees Trigger (Home Dashboard)
- URL: http://localhost:3000/rider/home
- Screen shows: "⚠️ Heavy Rain alert in your zone"
- Red alert banner

### 2. Backend Processes Trigger
```bash
# Backend receives trigger via webhook
POST /api/v1/webhooks/trigger
{
  "type": "Heavy Rain",
  "location": "Delhi",
  "severity": "HIGH"
}

# Backend:
# 1. Validates trigger
# 2. Queries active policies in zone
# 3. Creates claims batch
# 4. Runs fraud detection
# 5. Updates Firestore
```

### 3. Admin Reviews Queue (Optional)
- URL: http://localhost:3000/admin/analyst-queue
- Admin sees flagged claims
- Reviews data and makes decision
- Admin clicks [✓ APPROVE] or [✗ REJECT]

### 4. Payout Executed
```
Backend Cloud Function triggers:
- Validates claim (again)
- Calls Razorpay API OR Mock
- Sends payout to rider
- Updates Firestore: status = "paid"
```

### 5. Rider Sees Confirmation
- Real-time Firestore listener updates app
- Home page shows: "✅ Payout: ₹350 sent"
- Claim timeline shows: "Payout Sent - 2:45 PM"

---

## Common Development Tasks

### Add New Rider Screen
```bash
# 1. Create screen component
touch frontend/app/\(rider\)/[screen-name]/page.tsx

# 2. Update Bottom Navigation (if needed)
# File: frontend/components/rider/BottomNav.tsx
# Add tab to tabs array

# 3. Update API client (if needed)
# File: frontend/lib/apiClient.ts
# Add new endpoint method

# 4. Start using
# Browser auto-refreshes
```

### Add New Admin Page
```bash
# 1. Create page
touch frontend/app/\(admin\)/[page-name]/page.tsx

# 2. Update Admin Topbar menu (if needed)
# File: frontend/components/admin/AdminTopbar.tsx
# Add navigation link

# 3. Connect to API
# Import from lib/apiClient.ts
# Add useEffect with adminAPI call
```

### Add New Backend Endpoint
```bash
# 1. Create route in appropriate router
# Example: backend/routers/policies.py

# 2. Add Pydantic model (if needed)
# File: backend/models/

# 3. Register router in main.py
# app.include_router(router, prefix="/api/v1")

# 4. Test with Thunder Client
# The /docs endpoint auto-generates interactive API docs

# 5. Update lib/apiClient.ts on frontend
```

### Test Fraud Detection
```bash
# Manually trigger fraud check
curl -X POST http://localhost:8000/api/v1/admin/claims/CLM-001/analyze-fraud \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "rider_001",
    "claim_amount": 350,
    "trigger_type": "rain",
    "location": "Delhi"
  }'

# Response:
{
  "fraud_score": 0.15,
  "verdict": "low_risk",
  "signals": {
    "gps": "verified",
    "device": "normal",
    "behavior": "typical"
  }
}
```

---

## Debugging

### Frontend Issues

**Problem: Components not showing**
```bash
# Check if API client is working
# Browser DevTools → Network tab
# Look for http://localhost:8000/api/v1/* requests
# Check response status + body

# Check Firestore connection
# Browser DevTools → Console
# Search for Firebase warnings
```

**Problem: Authentication failing**
```bash
# Check localStorage
# DevTools → Application → Storage → localStorage
# Look for: riderToken, adminToken, firebase:authUser:...

# Check Firebase config
# frontend/.env.local has correct credentials?
# Firebase project still valid?
```

**Problem: Dark mode not working**
```bash
# Check if html has dark class
# DevTools → Elements
# Look for <html class="dark">

# Check Tailwind config
# frontend/tailwind.config.ts has darkMode: 'class'?
```

### Backend Issues

**Problem: CORS errors**
```python
# main.py should have CORS middleware:
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Problem: Firebase not connecting**
```python
# Check serviceAccountKey.json exists
# ls backend/serviceAccountKey.json

# Check environment variable
# echo $FIREBASE_PROJECT_ID

# Manually test Firebase
python -c "from core.firebase import db; print(db.collection('users').stream())"
```

**Problem: External APIs failing**
```bash
# Check API keys in .env
# Test endpoints directly
curl https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=YOUR_KEY

# Add logging to service files
# backend/services/weather_service.py
```

---

## Performance Optimization

### Frontend
```javascript
// In page.tsx, use dynamic imports for heavy components
const HeavyMap = dynamic(() => import('@/components/RiskMap'), {
  loading: () => <div>Loading map...</div>,
  ssr: false
});

// Use React.memo for expensive components
export const AdminTopbar = React.memo(AdminTopbarComponent);

// Debounce search filters
const [search, setSearch] = useDebounce('', 300);
```

### Backend
```python
# Add caching for trigger lists
from functools import lru_cache

@lru_cache(maxsize=100, ttl=300)
async def get_triggers():
    return db.collection('triggers').stream()

# Use batch operations
batch = db.batch()
for claim in claims:
    batch.set(doc_ref, claim_data)
batch.commit()

# Index frequently queried fields
# Firestore → Indexes tab
```

---

## Testing

### Frontend Unit Tests
```bash
cd frontend

# Install testing library
npm install --save-dev @testing-library/react @testing-library/jest-dom jest

# Create test file
# components/__tests__/BottomNav.test.tsx

# Run tests
npm test
```

### Backend Unit Tests
```bash
cd backend

# Install pytest
pip install pytest pytest-asyncio

# Create test file
# tests/test_riders.py

pytest tests/
pytest tests/ -v  # Verbose
pytest tests/ --cov  # Coverage report
```

### Integration Testing
```bash
# Create test scenario in Thunder Client
# 1. Admin login → Get JWT token
# 2. Get dashboard → Verify data
# 3. Create claim → Check Firestore
# 4. Review claim → Approve
# 5. Check payout log
# 6. Verify rider notification

# Export test collection for CI/CD
# Thunder Client → Export → GitHub Actions
```

---

## Deployment Readiness Checklist

### Before Production
- [ ] Firebase security rules deployed
- [ ] Environment variables configured
- [ ] Error handling in all endpoints
- [ ] Logging set up
- [ ] Rate limiting enabled
- [ ] HTTPS configured
- [ ] Database backups scheduled
- [ ] Monitoring alerts set up
- [ ] Load testing completed
- [ ] Security scan passed
- [ ] User acceptance testing done

### Frontend Deployment (Vercel)
```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys
# Set environment variables in Vercel dashboard
# NEXT_PUBLIC_API_ROOT=https://api.paraswift.in/api/v1
```

### Backend Deployment (Google Cloud Run)
```bash
# Build container
docker build -t paraswift-backend .

# Push to Container Registry
docker tag paraswift-backend gcr.io/project-id/paraswift-backend
docker push gcr.io/project-id/paraswift-backend

# Deploy to Cloud Run
gcloud run deploy paraswift-backend \
  --image gcr.io/project-id/paraswift-backend \
  --platform managed \
  --region asia-south1 \
  --set-env-vars FIREBASE_PROJECT_ID=$PROJECT_ID
```

---

## Useful Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Firebase Console](https://console.firebase.google.com)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React 19 Docs](https://react.dev)
- [Recharts Documentation](https://recharts.org)

---

## Support & Troubleshooting

**Need help?**
1. Check relevant logs (DevTools or terminal)
2. Search documentation files
3. Check API responses in Network tab
4. Review error stack traces
5. Check GitHub issues

**Report a bug:**
1. Minimal reproducible example
2. Environment details (Node/Python versions)
3. Error logs / screenshots
4. Expected vs actual behavior

---

**Last Updated**: March 20, 2026
**Maintained By**: Development Team
