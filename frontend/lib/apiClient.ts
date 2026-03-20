"use client";

// API client helper for communication with backend FastAPI
// Documentation: See /backend/main.py for available endpoints

export const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";

export async function apiCall(
  endpoint: string,
  options: RequestInit = {}
) {
  const url = `${apiBaseUrl}${endpoint}`;
  
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
}

// Rider APIs
export const riderAPI = {
  // POST /riders/register - Send OTP
  sendOTP: (phone: string) =>
    apiCall("/riders/register", {
      method: "POST",
      body: JSON.stringify({ phone }),
    }),

  // POST /riders/verify-otp - Verify OTP and get auth token
  verifyOTP: (phone: string, otp: string) =>
    apiCall("/riders/verify-otp", {
      method: "POST",
      body: JSON.stringify({ phone, otp }),
    }),

  // GET /riders/{id}/profile - Get rider profile
  getProfile: (riderId: string, token: string) =>
    apiCall(`/riders/${riderId}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // GET /riders/{id}/policies - Get active policies
  getPolicies: (riderId: string, token: string) =>
    apiCall(`/riders/${riderId}/policies`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // GET /riders/{id}/claims - Get claims history
  getClaims: (riderId: string, token: string) =>
    apiCall(`/riders/${riderId}/claims`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // POST /riders/{id}/policies/renew - Renew weekly policy
  renewPolicy: (riderId: string, token: string) =>
    apiCall(`/riders/${riderId}/policies/renew`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }),
};

// Admin APIs (requires admin token)
export const adminAPI = {
  // POST /admin/login - Admin email/password login
  login: (email: string, password: string) =>
    apiCall("/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  // GET /admin/dashboard - Dashboard KPIs
  getDashboard: (token: string) =>
    apiCall("/admin/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // GET /admin/fraud-alerts - Get fraud alerts
  getFraudAlerts: (token: string) =>
    apiCall("/admin/fraud-alerts", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // GET /admin/analyst-queue - Get flagged claims for review
  getAnalystQueue: (token: string) =>
    apiCall("/admin/analyst-queue", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // POST /admin/claims/{id}/review - Review and approve/reject claim
  reviewClaim: (claimId: string, decision: "approve" | "reject", token: string) =>
    apiCall(`/admin/claims/${claimId}/review`, {
      method: "POST",
      body: JSON.stringify({ decision }),
      headers: { Authorization: `Bearer ${token}` },
    }),

  // GET /admin/triggers - Get all triggers
  getTriggers: (token: string) =>
    apiCall("/admin/triggers", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // POST /admin/triggers/{id}/toggle - Enable/disable trigger
  toggleTrigger: (triggerId: string, enabled: boolean, token: string) =>
    apiCall(`/admin/triggers/${triggerId}/toggle`, {
      method: "POST",
      body: JSON.stringify({ enabled }),
      headers: { Authorization: `Bearer ${token}` },
    }),

  // GET /admin/payouts - Get payouts history
  getPayouts: (token: string) =>
    apiCall("/admin/payouts", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // GET /admin/riders - Get all riders
  getRiders: (token: string) =>
    apiCall("/admin/riders", {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

// Webhook (internal)
export const webhookAPI = {
  // POST /webhooks/trigger-check - Weather API polling (internal)
  triggerCheck: () =>
    apiCall("/webhooks/trigger-check", {
      method: "POST",
    }),

  // POST /webhooks/fraud-alert - Fraud detection alert (internal)
  fraudAlert: (claimId: string, fraudScore: number) =>
    apiCall("/webhooks/fraud-alert", {
      method: "POST",
      body: JSON.stringify({ claimId, fraudScore }),
    }),
};
