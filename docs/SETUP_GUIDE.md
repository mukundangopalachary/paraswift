# 🛠️ Paraswift Setup Guide

## 1. Firebase Setup
**For the Backend (FastAPI):**
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Project Settings** \> **Service Accounts**.
3. Click **Generate New Private Key**. This downloads a `.json` file.
4. Rename this file to `serviceAccountKey.json` and place it inside the `backend/` directory.
5. In `backend/.env`, set `FIREBASE_CREDENTIALS_PATH=serviceAccountKey.json` (This tells FastAPI where to look).

**For the Frontend (Next.js):**
1. In the Firebase Console, go to **Project Settings** \> **General**.
2. Scroll down to "Your apps" and add a Web App `</>`.
3. Copy the `firebaseConfig` object provided.
4. We will create a `frontend/lib/firebase.ts` file shortly that will use these keys to initialize Client-side Auth.

## 2. Setting Up 3rd Party APIs
In `backend/.env`, you will eventually want to add real API keys once you transition from our mock services:
```env
# Weather API
OPENWEATHER_API_KEY="your-openweather-key-here"

# AI Model API
OPENAI_API_KEY="your-ai-apiKey"

# Payment Gateway (Mock/Sandbox)
RAZORPAY_KEY_ID="rzp_test_xxxxxx"
RAZORPAY_KEY_SECRET="your-secret-here"
```

*Note: For Phase 3, we implemented mock logic so you don't need these instantly. You can test the platform end-to-end on mock data first!*
