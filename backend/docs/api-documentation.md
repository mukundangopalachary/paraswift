# FastAPI Endpoints Documentation

## Overview
This document outlines the REST APIs for the AI-Powered Parametric Insurance Platform. The backend is built using **FastAPI (Python)**. 

### Architecture Flow
1. **Frontend:** Logs in the user via Firebase UI (OTP). Receives a Firebase JWT.
2. **Frontend -> Backend:** Frontend sends requests to FastAPI endpoints with `Authorization: Bearer <Firebase_JWT>`.
3. **Backend Middleware:** FastAPI verifies the token securely using the **Firebase Admin SDK for Python**. Valid requests proceed.
4. **Data Layer:** FastAPI interacts directly with **Cloud Firestore** for all database operations and leverages external APIs for ML/Weather data.

---

## 1. User Management & Onboarding

### 1.1 Onboard User
**Endpoint:** `POST /api/v1/users/onboard`
**Description:** Completes user registration by setting their delivery persona, calculating their baseline profile, and linking KYC data.
**Requires Auth:** Yes (Firebase JWT)
**Request Body:**
```json
{
  "persona_type": "Food | E-commerce | Grocery",
  "aadhaar_url": "gs://...", 
  "primary_location_zone": "Zone_A"
}
```
**Response (200 OK):**
```json
{
  "user_uid": "uid_12345",
  "daily_earning_baseline": 500.00,
  "risk_score": 0.15,
  "status": "Onboarded"
}
```

---

## 2. Policy & Premium Management

### 2.1 Get Weekly Quote
**Endpoint:** `GET /api/v1/policies/quote`
**Description:** FastAPI calls a 3rd party AI Model API and Weather API to calculate the dynamic weekly premium based on 7-day forecasts.
**Requires Auth:** Yes (Firebase JWT)
**Response (200 OK):**
```json
{
  "premium_amount": 45.50,
  "coverage_limit": 3500.00,
  "valid_until": "2026-03-27T00:00:00Z"
}
```

### 2.2 Purchase Policy
**Endpoint:** `POST /api/v1/policies/purchase`
**Description:** Initiates the payment process. Validates the token from the mock payment gateway and creates a Policy entity in Firestore.
**Requires Auth:** Yes (Firebase JWT)
**Request Body:**
```json
{
  "premium_amount": 45.50,
  "payment_token": "tok_abc123" 
}
```
**Response (201 Created):**
```json
{
  "policy_id": "pol_987",
  "status": "Active",
  "start_date": "2026-03-20T00:00:00Z",
  "end_date": "2026-03-27T00:00:00Z"
}
```

---

## 3. Parametric Triggering & Location

### 3.1 Log Location Ping
**Endpoint:** `POST /api/v1/location/ping`
**Description:** Records user activity. FastAPI optionally sends this data to the 3rd Party AI Model for spoof detection.
**Requires Auth:** Yes (Firebase JWT)
**Request Body:**
```json
{
  "latitude": 12.9716,
  "longitude": 77.5946,
  "timestamp": "2026-03-20T12:00:00Z"
}
```
**Response (200 OK):**
```json
{
  "status": "Logged",
  "fraud_probability": 0.02
}
```

### 3.2 Poll Environment Triggers
**Endpoint:** `POST /api/v1/webhooks/poll-weather`
**Description:** An internal cron job (e.g., Google Cloud Scheduler or APScheduler) calls this endpoint every 15 mins. FastAPI queries the 3rd Party Weather/AQI APIs. If a breach is detected, it creates a Trigger entity and fires auto-claims.
**Requires Auth:** Internal (API Key or Service Account restricted)
**Response (200 OK):**
```json
{
  "trigger_id": "trg_456",
  "claims_initiated": 245
}
```

---

## 4. Worker Dashboard

### 4.1 Get Dashboard Summary
**Endpoint:** `GET /api/v1/dashboard/summary`
**Description:** Returns the user's "Total Earnings Protected", active policy status, and recent claims history from Firestore.
**Requires Auth:** Yes (Firebase JWT)
**Response (200 OK):**
```json
{
  "total_earnings_protected": 12500.00,
  "active_policy": {
    "policy_id": "pol_987",
    "status": "Active"
  },
  "recent_claims": [
    {
      "claim_id": "clm_111",
      "trigger_type": "Heavy Rain",
      "calculated_payout": 400.00,
      "status": "Paid"
    }
  ]
}
```
