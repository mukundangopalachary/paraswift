from pydantic import BaseModel
from typing import Optional

class PolicyQuoteResponse(BaseModel):
    premium_amount: float
    coverage_limit: float
    valid_until: str

class PolicyPurchaseRequest(BaseModel):
    premium_amount: float
    payment_token: str

class PolicyPurchaseResponse(BaseModel):
    policy_id: str
    status: str
    start_date: str
    end_date: str
