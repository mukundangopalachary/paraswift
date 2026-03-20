import random

def get_7_day_forecast(location_zone: str) -> dict:
    """
    Mock implementation of a 3rd party Weather/AQI API.
    Returns simulated forecast data used by the AI model.
    """
    # In production, this would make an HTTP request to OpenWeatherMap or similar
    return {
        "zone": location_zone,
        "average_temp_c": random.uniform(25.0, 40.0),
        "rain_probability": random.uniform(0.0, 1.0),
        "aqi": random.randint(50, 400),
        "alerts": [] if random.random() > 0.2 else ["High Heat Advisory"]
    }

def check_current_conditions(location_zone: str) -> dict:
    """
    Simulates polling the current weather for parametric triggers.
    """
    return {
        "zone": location_zone,
        "current_rainfall_mm": random.uniform(0.0, 50.0), # >20mm is a trigger
        "current_aqi": random.randint(50, 500) # >300 is a trigger
    }
