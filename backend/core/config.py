import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Paraswift API"
    FIREBASE_CREDENTIALS_PATH: str = os.getenv("FIREBASE_CREDENTIALS_PATH", "serviceAccountKey.json")
    OPENWEATHER_API_KEY: str | None = None  # To allow the API key from .env without extra validation error

    class Config:
        env_file = ".env"

settings = Settings()
