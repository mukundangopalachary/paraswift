from fastapi import APIRouter, Depends, HTTPException
from core.security import verify_firebase_token
from core.firebase import db
from models.user import UserOnboardRequest, UserOnboardResponse, UserDashboardResponse
from datetime import datetime, timezone

router = APIRouter()

@router.post("/onboard", response_model=UserOnboardResponse, status_code=200)
def onboard_user(
    request: UserOnboardRequest,
    decoded_token: dict = Depends(verify_firebase_token)
):
    """
    Completes user registration after OTP login.
    Inserts or updates the user document in Firestore.
    """
    user_uid = decoded_token.get("uid")
    if not user_uid:
        raise HTTPException(status_code=400, detail="UID missing from token")

    # Business Logic: Calculate baseline based on persona segment
    baseline_map = {
        "Food": 500.0,
        "E-commerce": 650.0,
        "Grocery": 600.0
    }
    
    selected_persona = request.persona_type
    baseline = baseline_map.get(selected_persona, 400.0)

    # Initial Risk Score logic (this could be updated later via AI Model API)
    risk_score = 0.15 

    # Prepare Firestore Document based on data-entities.md
    user_data = {
        "UserUID": user_uid,
        "PersonaType": selected_persona,
        "Aadhaar_KYC_Status": False, # Requires async manual/AI verification
        "Aadhaar_Document_URL": request.aadhaar_url,
        "WorkLocation_Zone": request.primary_location_zone,
        "DailyEarning_Baseline": baseline,
        "RiskScore": risk_score,
        "Phone": decoded_token.get("phone_number", ""),
        "CreatedAt": datetime.now(timezone.utc)
    }

    try:
        # Save to Firestore -> Users Collection
        db.collection("Users").document(user_uid).set(user_data, merge=True)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

    return UserOnboardResponse(
        user_uid=user_uid,
        daily_earning_baseline=baseline,
        risk_score=risk_score,
        status="Onboarded"
    )

@router.get("/me/dashboard", response_model=UserDashboardResponse)
def get_user_dashboard(decoded_token: dict = Depends(verify_firebase_token)):
    user_uid = decoded_token.get("uid")
    if not user_uid:
        raise HTTPException(status_code=400, detail="UID missing from token")

    user_doc = db.collection("Users").document(user_uid).get()
    if not user_doc.exists:
        raise HTTPException(status_code=404, detail="User not found")

    user_data = user_doc.to_dict()

    # Get active policies
    policies_query = db.collection("Policies").where("UserUID", "==", user_uid).where("Status", "==", "Active").limit(1).get()

    active_policy_id = None
    policy_valid_until = None
    if policies_query:
        policy = policies_query[0].to_dict()
        active_policy_id = policy.get("PolicyID")
        end_date = policy.get("EndDate")
        if end_date:
            policy_valid_until = end_date.isoformat() if hasattr(end_date, 'isoformat') else str(end_date)

    return UserDashboardResponse(
        user_uid=user_uid,
        daily_earning_baseline=user_data.get("DailyEarning_Baseline", 0.0),
        risk_score=user_data.get("RiskScore", 0.0),
        zone=user_data.get("WorkLocation_Zone", "Unknown"),
        active_policy_id=active_policy_id,
        policy_valid_until=policy_valid_until
    )
