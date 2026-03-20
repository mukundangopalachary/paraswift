To build a professional, AI-powered parametric insurance platform using **Firebase (Firestore)**, you need a highly structured data model. [cite_start]Based on the project requirements for the **DEVTrails 2026 Hackathon**, here are the essential data entities and their specific attributes. [cite: 13, 14]

### 1. User / Delivery Partner Entity

[cite_start]This stores the profile and risk-related data for the gig worker. [cite: 14, 21]

- **UserUID:** Unique ID (Firebase Auth UID).
- [cite_start]**PersonaType:** Segment (Food, E-commerce, or Grocery). [cite: 21]
- **Phone:** Verified mobile number (for OTP login).
- **Aadhaar/KYC_Status:** Boolean for verification.
- **WorkLocation_Zone:** Primary geofence for monitoring disruptions.
- [cite_start]**DailyEarning_Baseline:** Average daily income used to calculate payouts. [cite: 20]
- [cite_start]**RiskScore:** AI-generated score based on historical reliability and location risk. [cite: 14]

### 2. Policy Entity

[cite_start]Managed on a strict **weekly cycle** as per the core constraints. [cite: 8, 24]

- **PolicyID:** Unique identifier.
- **UserUID:** Reference to the delivery partner.
- [cite_start]**StartDate / EndDate:** Defined 7-day window. [cite: 24]
- [cite_start]**PremiumAmount:** Dynamically calculated weekly cost. [cite: 14]
- **CoverageLimit:** Maximum payout for the week (e.g., 80% of weekly baseline).
- **Status:** (Active, Expired, Pending Payment).

### 3. Parametric Trigger Entity

[cite_start]Stores the environmental or social conditions that trigger claims. [cite: 14, 28]

- **TriggerID:** Unique identifier.
- [cite_start]**Type:** (Extreme Heat, Heavy Rain, Pollution, Curfew, Strike). [cite: 11]
- [cite_start]**ThresholdValue:** The limit that must be crossed (e.g., Rainfall > 20mm). [cite: 14]
- **LocationGeofence:** The specific coordinates/zone affected.
- **Timestamp:** When the disruption was detected.
- [cite_start]**DataSource:** The API or mock service providing the data. [cite: 14]

### 4. Claim Entity

[cite_start]Automated records created when a trigger matches a policy. [cite: 14, 18]

- **ClaimID:** Unique identifier.
- **PolicyID:** Reference to the active policy.
- **TriggerID:** Reference to the specific disruption.
- [cite_start]**LossDuration:** Hours or shifts lost due to the disruption. [cite: 20]
- **CalculatedPayout:** Final amount to be sent to the worker.
- [cite_start]**AI_FraudScore:** Probability of fraud (GPS spoofing, etc.). [cite: 14]
- [cite_start]**Status:** (Auto-Approved, Flagged for Review, Paid). [cite: 14]

### 5. Transaction / Payout Entity

[cite_start]Records the financial movement between the insurer and worker. [cite: 14]

- [cite_start]**TransactionID:** From mock gateway (Razorpay/Stripe). [cite: 14]
- **UserUID:** Recipient reference.
- **Amount:** Value of premium paid or claim received.
- **Type:** (Credit: Payout, Debit: Premium).
- **Timestamp:** Precise execution time.

### 6. AI Analytics & Fraud Entity

[cite_start]Used for the Admin/Insurer dashboard. [cite: 14, 19]

- [cite_start]**ActivityLog:** Recent GPS pings and "Online" status during disruptions. [cite: 14]
- [cite_start]**RegionalRiskStats:** Aggregated loss ratios per city/zone. [cite: 19]
- [cite_start]**PredictionLog:** Weekly forecast data used for dynamic pricing. [cite: 14]

### Summary of Data Relationships

- [cite_start]**One User** can have **Many Policies** (one per week). [cite: 24]
- **One Policy** can have **Many Claims** (if multiple disruptions occur in a week).
- [cite_start]**One Trigger** can link to **Many Claims** (affecting all workers in that zone). [cite: 14]
- [cite_start]**Claim Payouts** are strictly for **Loss of Income** and never for vehicle/medical costs. [cite: 22, 23]
