import firebase_admin
from firebase_admin import credentials, firestore, auth
from .config import settings
import os
import logging

logger = logging.getLogger(__name__)

def initialize_firebase():
    if not firebase_admin._apps:
        try:
            if os.path.exists(settings.FIREBASE_CREDENTIALS_PATH):
                cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS_PATH)
                firebase_admin.initialize_app(cred)
                logger.info("Firebase initialized successfully using service account key.")
            else:
                # Fallback to application default credentials (useful in Google Cloud)
                firebase_admin.initialize_app()
                logger.warning("Service account key not found. Initialized with Default Credentials.")
        except Exception as e:
            logger.error(f"Failed to initialize Firebase: {e}")
            raise e

# Initialize immediately when this module is imported
initialize_firebase()

# Export common references for routers to use
db = firestore.client()
