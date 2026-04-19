import firebase_admin
from firebase_admin import credentials, firestore, auth
import os
import json
import logging
from pathlib import Path
from dotenv import load_dotenv

logger = logging.getLogger(__name__)

# Ensure backend/.env is loaded for local development.
load_dotenv(Path(__file__).resolve().parents[1] / ".env")

def initialize_firebase():
    if not firebase_admin._apps:
        try:
            firebase_service_account_json = os.getenv("FIREBASE_SERVICE_ACCOUNT_JSON")

            if firebase_service_account_json:
                cred_dict = json.loads(firebase_service_account_json)
                cred = credentials.Certificate(cred_dict)
                firebase_admin.initialize_app(cred)
                logger.info("Firebase initialized successfully using FIREBASE_SERVICE_ACCOUNT_JSON.")
            else:
                # Fallback to application default credentials (useful in managed cloud runtimes)
                firebase_admin.initialize_app()
                logger.warning("FIREBASE_SERVICE_ACCOUNT_JSON not set. Initialized with Default Credentials.")
        except Exception as e:
            logger.error(f"Failed to initialize Firebase: {e}")
            raise e

# Initialize immediately when this module is imported
initialize_firebase()

# Export common references for routers to use
db = firestore.client()
