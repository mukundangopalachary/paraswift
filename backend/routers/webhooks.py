from fastapi import APIRouter, Depends, HTTPException, Header
from core.firebase import db
from services.weather_service import check_current_conditions
from datetime import datetime, timezone
import uuid

router = APIRouter()

# Simple internal API Key for cron jobs
INTERNAL_CRON_KEY = "super-secret-cron-key-123"

def verify_cron_key(x_cron_key: str = Header(None)):
    if x_cron_key != INTERNAL_CRON_KEY:
        raise HTTPException(status_code=401, detail="Unauthorized Cron/Webhook call")

@router.post("/poll-weather", status_code=200)
def poll_weather(dependencies=Depends(verify_cron_key)):
    """
    Called every 15 mins by an external Cron Job. 
    Polls 3rd party Weather APIs and triggers auto-claims if threshold breached.
    """
    # Let's assess two dummy zones
    zones = ["Zone_A", "Zone_B"]
    trigger_breaches = []
    
    for zone in zones:
        conditions = check_current_conditions(zone)
        
        # Check Parametric Thresholds
        if conditions["current_rainfall_mm"] > 20.0:
            trigger_id = f"trg_{uuid.uuid4().hex[:8]}"
            trigger_data = {
                "TriggerID": trigger_id,
                "Type": "Heavy Rain",
                "ThresholdValue": conditions["current_rainfall_mm"],
                "LocationGeofence": zone,
                "Timestamp": datetime.now(timezone.utc),
                "DataSource": "WeatherService_Mock"
            }
            db.collection("Triggers").document(trigger_id).set(trigger_data)
            
            # Fire auto-claims for active policies in this zone
            # (In reality, would use Cloud PubSub or a background task)
            claims_initiated = initiate_claims_for_zone(zone, trigger_id)
            trigger_breaches.append({
                "trigger_id": trigger_id,
                "zone": zone,
                "claims_initiated": claims_initiated
            })
            
    return {"status": "polled", "breaches": trigger_breaches}

def initiate_claims_for_zone(zone: str, trigger_id: str) -> int:
    """Helper function to create Claims entities for active policyholders in the affected zone"""
    # 1. Fetch Users in the zone
    users_query = db.collection("Users").where("WorkLocation_Zone", "==", zone).stream()
    user_ids = [u.id for u in users_query]
    if not user_ids:
        return 0
        
    # 2. Fetch Active Policies
    policies_ref = db.collection("Policies")
    active_policies = policies_ref.where("Status", "==", "Active").stream()
    
    claims_count = 0
    now = datetime.now(timezone.utc)
    for pol_doc in active_policies:
        pol_data = pol_doc.to_dict()
        uid = pol_data.get("UserUID")
        
        if uid in user_ids:
            # Create a claim
            claim_id = f"clm_{uuid.uuid4().hex[:8]}"
            claim_data = {
                "ClaimID": claim_id,
                "PolicyID": pol_data.get("PolicyID"),
                "UserUID": uid,
                "TriggerID": trigger_id,
                "CalculatedPayout": pol_data.get("CoverageLimit", 0) * 0.1, # E.g., 10% for a partial shift loss
                "AI_FraudScore": 0.05, # Would compute logic via Location Pings
                "Status": "Auto-Approved",
                "Timestamp": now
            }
            db.collection("Claims").document(claim_id).set(claim_data)
            claims_count += 1
            
    return claims_count
