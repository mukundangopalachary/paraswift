import logging

logger = logging.getLogger(__name__)

def verify_payment_token(token: str, amount: float) -> bool:
    """
    Mock integration with Stripe/Razorpay to verify a payment token.
    """
    # In production, this would call the payment gateway's actual verification API
    if token and token.startswith("tok_"):
        logger.info(f"Payment of {amount} verified with token {token}")
        return True
    return False
