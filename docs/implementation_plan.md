# Development Workflow & Architecture Plan

## 1. Which should be built first?

**We strongly recommend building the Backend First (API-First Approach).**

Building the API first is the industry standard for scalable platforms because:
1. **Contract Establishment:** The FastAPI backend serves as the "Source of Truth". Once you build the endpoints and test them (e.g., via Postman or FastAPI's auto-generated Swagger UI at `/docs`), your frontend developers know exactly what data payloads to expect.
2. **Database Foundation:** You need your Firestore database schema and security rules locked down before connecting a UI.
3. **Independent UI Development:** By mocking the data early on the backend, you can work on the frontend completely independently without waiting for the business logic to finish.

## 2. The Ideal Development Workflow

Here is the step-by-step phased approach for building your Parametric Insurance Platform:

### Phase 1: Backend Setup & Core Auth (FastAPI)
- Initialize the Python FastAPI project and set up standard directories (`routers`, `models`, `services`, `utils`, `core`).
- Generate a Firebase Service Account key and initialize the **Firebase Admin SDK**.
- Build the `verify_firebase_token` middleware. This intercepts every incoming API request and ensures the user is securely logged in.
- Create the User Onboarding API (`/api/v1/users/onboard`).

### Phase 2: Integration layer (3rd Party APIs)
- **Weather/AQI Engine:** Build the logic to poll your 3rd party Weather APIs. Write the endpoint that simulates a trigger (`/api/v1/webhooks/poll-weather`).
- **AI/ML Layer:** Integrate your 3rd party Machine Learning Models via their external API keys (for dynamic pricing quotes and fraud anomaly detection).
- **Payment Sandbox:** Connect standard mock gateways (Stripe/Razorpay test-mode) to handle premium payments.

### Phase 3: Firebase Firestore Operations
- Build out the REST APIs that directly read/write your Data Entities from `docs/data-entities.md`, such as fetching Policy Quotes and Dashboard histories. Use Pydantic models to validate all data entering Firestore.

### Phase 4: Frontend Scaffolding (React/Next.js/etc)
- *Once the `/docs` UI of FastAPI is fully functioning and tested:*
- Initialize the Frontend framework.
- Configure Firebase Client Auth (Phone/OTP).

### Phase 5: Connecting the UI
- Link the Firebase Auth flow so the frontend securely attaches the `Authorization: Bearer <token>` to all HTTP requests pointing to your FastAPI backend.
- Build the Worker Dashboard to consume the backend data.
- Build the persona selection and policy checkout screens.
