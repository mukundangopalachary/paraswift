import random

def calculate_dynamic_premium(forecast: dict, baseline_earning: float, risk_score: float) -> float:
    """
    Mock integration with a 3rd party AI Model API.
    Calculates the weekly premium based on weather forecast and user risk.
    """
    # Base premium is generally 5-8% of baseline earning
    base_premium = baseline_earning * 0.05
    
    # Increase if rain probability or heat advisory is high
    if forecast.get("rain_probability", 0) > 0.6:
        base_premium *= 1.5
    if "High Heat Advisory" in forecast.get("alerts", []):
        base_premium *= 1.2
        
    final_premium = base_premium * (1 + risk_score)
    return round(final_premium, 2)

def calculate_fraud_probability(location_data: dict, user_uid: str) -> float:
    """
    Mock integration with AI Model for GPS spoof detection.
    """
    # Returns a score between 0 and 1, >0.8 means likely fraud
    return round(random.uniform(0.0, 0.4), 2)
