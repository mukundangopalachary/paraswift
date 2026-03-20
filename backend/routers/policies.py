from fastapi import APIRouter, Depends, HTTPException
from core.security import verify_firebase_token
from core.firebase import db
from models.policy import PolicyQuoteResponse, PolicyPurchaseRequest, PolicyPurchaseResponse
from services.weather_service import get_7_day_forecast
from services.ai_service import calculate_dynamic_premium
from services.payment_service import verify_payment_token
from datetime import datetime, timedelta, timezone
import uuid

router = APIRouter()

@router.get("/quote", response_model=PolicyQuoteResponse)
def get_weekly_quote(decoded_token: dict = Depends(verify_firebase_token)):
    user_uid = decoded_token.get("uid")
    
    # Fetch user from Firestore to get baseline and zone
    user_doc = db.collection("Users").document(user_uid).get()
    if not user_doc.exists:
        raise HTTPException(status_code=404, detail="User not found")
        
    user_data = user_doc.to_dict()
    zone = user_data.get("WorkLocation_Zone", "Default_Zone")
    baseline = user_data.get("DailyEarning_Baseline", 500.0)
    risk_score = user_data.get("RiskScore", 0.1)
    
    # 1. Get Weather Forecast
    forecast = get_7_day_forecast(zone)
    
    # 2. Ask AI Model for Pricing
    premium = calculate_dynamic_premium(forecast, baseline, risk_score)
    
    # Coverage logic: Max payout is roughly 80% of weekly baseline (baseline * 7 * 0.8)
    coverage_limit = round(baseline * 7 * 0.8, 2)
    
    valid_until = datetime.now(timezone.utc) + timedelta(minutes=15)
    
    return PolicyQuoteResponse(
        premium_amount=premium,
        coverage_limit=coverage_limit,
        valid_until=valid_until.isoformat()
    )

@router.post("/purchase", response_model=PolicyPurchaseResponse, status_code=201)
def purchase_policy(request: PolicyPurchaseRequest, decoded_token: dict = Depends(verify_firebase_token)):
    user_uid = decoded_token.get("uid")
    
    # Verify Payment Mock
    if not verify_payment_token(request.payment_token, request.premium_amount):
        raise HTTPException(status_code=400, detail="Payment verification failed")
        
    user_doc = db.collection("Users").document(user_uid).get()
    if not user_doc.exists:
        raise HTTPException(status_code=404, detail="User not found")
        
    user_data = user_doc.to_dict()
    baseline = user_data.get("DailyEarning_Baseline", 500.0)
    coverage_limit = round(baseline * 7 * 0.8, 2)
    
    policy_id = f"pol_{uuid.uuid4().hex[:8]}"
    start_date = datetime.now(timezone.utc)
    end_date = start_date + timedelta(days=7) # Strict weekly cycle
    
    policy_data = {
        "PolicyID": policy_id,
        "UserUID": user_uid,
        "PremiumAmount": request.premium_amount,
        "CoverageLimit": coverage_limit,
        "StartDate": start_date,
        "EndDate": end_date,
        "Status": "Active"
    }
    
    # Save Policy Entity
    db.collection("Policies").document(policy_id).set(policy_data)
    
    # Save Transaction Entity
    tx_data = {
        "TransactionID": request.payment_token,
        "UserUID": user_uid,
        "Amount": request.premium_amount,
        "Type": "Debit_Premium",
        "Timestamp": datetime.now(timezone.utc)
    }
    db.collection("Transactions").document(request.payment_token).set(tx_data)
    
    return PolicyPurchaseResponse(
        policy_id=policy_id,
        status="Active",
        start_date=start_date.isoformat(),
        end_date=end_date.isoformat()
    )
