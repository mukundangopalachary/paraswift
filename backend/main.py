import importlib.util
import os
import sys

# Optional: Add backend root to sys path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users, policies, webhooks

app = FastAPI(
    title="Paraswift API",
    description="API for the AI-Powered Parametric Insurance Platform",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, lock this down
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(users.router, prefix="/api/v1/users", tags=["Users"])
app.include_router(policies.router, prefix="/api/v1/policies", tags=["Policies"])
app.include_router(webhooks.router, prefix="/api/v1/webhooks", tags=["Internal Webhooks"])

@app.get("/health")
def health_check():
    return {"status": "API is online and healthy"}
