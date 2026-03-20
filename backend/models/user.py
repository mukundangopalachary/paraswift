from pydantic import BaseModel
from typing import Optional

class UserOnboardRequest(BaseModel):
    persona_type: str
    aadhaar_url: str
    primary_location_zone: str

class UserOnboardResponse(BaseModel):
    user_uid: str
    daily_earning_baseline: float
    risk_score: float
    status: str

class UserDashboardResponse(BaseModel):
    user_uid: str
    daily_earning_baseline: float
    risk_score: float
    zone: str
    active_policy_id: Optional[str] = None
    policy_valid_until: Optional[str] = None
