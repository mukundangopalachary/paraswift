# Software Requirements Specification (SRS)
## Project: AI-Powered Parametric Insurance Platform

### 1. Introduction
This platform is an AI-driven, parametric insurance solution specifically designed for the Indian gig economy. It utilizes **Firebase** for its backend infrastructure to provide real-time responses and automated payouts for loss of income due to external disruptions (weather, pollution, social curfews).

### 2. System Architecture (Firebase Stack)
* **Identity:** Firebase Authentication (Phone/OTP & OAuth).
* **Database:** Cloud Firestore (NoSQL, Real-time Sync).
* **Logic:** Cloud Functions for Firebase (Trigger monitoring & AI Inference).
* **Storage:** Firebase Storage (User KYC & Documentation).
* **Analytics:** Google Analytics for Firebase (User behavior & Claim trends).

---

### 3. Functional Requirements (FR)

**User Management & Onboarding**
1.  **FR-1 (Auth):** The system shall authenticate users via Firebase OTP to align with the high mobile usage of delivery partners.
2.  **FR-2 (Persona Selection):** Users shall select a delivery persona (Food, E-commerce, or Grocery) which dictates their risk profile.
3.  **FR-3 (KYC Upload):** The system shall allow users to upload digital identification (Aadhaar/Driving License) to Firebase Storage.
4.  **FR-4 (Baseline Profile):** The system shall calculate a "Daily Earning Baseline" for each user based on self-reported or linked delivery app history.

**Policy & Premium Management**

5.  **FR-5 (Weekly Cycle):** The system shall enforce a strict 7-day policy lifecycle, resetting every Monday at 00:00.
6.  **FR-6 (AI Dynamic Pricing):** The AI engine shall calculate weekly premiums based on 7-day weather forecasts and historical disruption data.
7.  **FR-7 (Premium Payment):** The system shall integrate with a mock payment gateway (Razorpay/Stripe) for weekly premium collection.
8.  **FR-8 (Policy Status):** Users shall have a real-time view of their active/inactive coverage status via Firestore listeners.

**Parametric Triggering & Claims**

9.  **FR-9 (Trigger Integration):** The system shall poll Weather/AQI APIs every 15 minutes to identify parametric breaches (e.g., Rainfall >20mm).
10. **FR-10 (Auto-Claim Initiation):** The system shall automatically open a claim for all active policyholders in a geofenced disruption zone.
11. **FR-11 (Zero-Touch UX):** The system shall process claims without requiring the user to fill out a manual claim form.
12. **FR-12 (GPS Validation):** The system shall verify the user's presence in the disruption zone using Firestore-stored location pings.

**Fraud Detection (AI/ML)**

13. **FR-13 (Spoof Detection):** AI shall analyze location data to identify and flag GPS spoofing or simulated movements.
14. **FR-14 (Historical Cross-Check):** The system shall cross-reference claimed weather conditions against historical meteorological records to prevent "fake weather" fraud.
15. **FR-15 (Activity Verification):** The AI shall verify that the worker was actually "Online" or attempting to work during the disruption period.
16. **FR-16 (Anomaly Scoring):** Every claim shall be assigned a fraud probability score; scores above 0.8 shall require manual admin review.

**Payouts & Dashboards**

17. **FR-17 (Instant Payout):** Upon AI approval, Cloud Functions shall trigger an immediate API call to the payout gateway.
18. **FR-18 (Worker Dashboard):** The app shall display a "Total Earnings Protected" metric and a history of all payouts.
19. **FR-19 (Insurer Admin View):** Admins shall have a dashboard to view "Loss Ratios" per city and delivery segment.
20. **FR-20 (Predictive Analytics):** The system shall generate a "Next Week Risk Map" for insurers to anticipate high-claim volumes.

---

### 4. Non-Functional Requirements (NFR)

**Performance & Latency**

1.  **NFR-1:** The app shall update claim status via Firestore real-time streams in less than 2 seconds.
2.  **NFR-2:** Cloud Functions for trigger monitoring shall execute within a maximum timeout of 60 seconds.
3.  **NFR-3:** The UI shall be responsive on low-end Android devices commonly used by delivery partners.
4.  **NFR-4:** API response time for premium calculations shall not exceed 3 seconds.

**Scalability & Availability**

5.  **NFR-5:** The system shall support up to 50,000 concurrent users during a city-wide disruption.
6.  **NFR-6:** Firebase infrastructure shall guarantee 99.9% uptime for the database and authentication.
7.  **NFR-7:** The system shall be able to scale horizontally via Cloud Functions to handle sudden spikes in API polling.
8.  **NFR-8:** Database read/write operations shall be optimized using Firestore indexing for fast regional queries.

**Security & Privacy**

9.  **NFR-9:** All user data in Firestore must be protected by **Firebase Security Rules** (Allow read: if request.auth != null).
10. **NFR-10:** Personal Identifiable Information (PII) like Aadhaar numbers must be encrypted at rest.
11. **NFR-11:** The system shall implement Rate Limiting on the OTP login to prevent brute-force attacks.
12. **NFR-12:** Payment data must never be stored locally; all transactions must happen via PCI-DSS compliant gateways.

**Reliability & Recoverability**

13. **NFR-13:** The system shall implement a retry logic for failed payout API calls (Exponential Backoff).
14. **NFR-14:** Automatic backups of the Firestore database shall be scheduled daily.
15. **NFR-15:** The system shall maintain a secondary "Mock API" data source if the primary weather API fails.
16. **NFR-16:** Fault-tolerant logging using Cloud Logging to track every automated claim decision.

**Usability & Localizability**

17. **NFR-17:** The UI shall support at least three languages (English, Hindi, and one regional language like Kannada or Tamil).
18. **NFR-18:** The app must be operable with one hand, considering delivery partners are often on the move.
19. **NFR-19:** High-contrast UI elements must be used for visibility in bright outdoor sunlight.
20. **NFR-20:** Error messages must be non-technical and provide clear instructions for the worker (e.g., "Move to a better signal area").

---

### 5. Critical Constraints

* **Income Only:** Strictly no coverage for health, accident, or vehicle repair.
* **Weekly Basis:** All financial models must be weekly (no monthly/annual options).
* **Parametric Evidence:** No payout shall occur without objective 3rd party data validation.